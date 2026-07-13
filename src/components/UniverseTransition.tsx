import { useEffect, useRef, useState } from "react";
import { useUniverse, type Phase } from "@/lib/universe";
import { FluidSimulation } from "@/lib/animations/fluidSolver";
import { Spring2D } from "@/lib/animations/spring";
import { transitionSynth } from "@/lib/animations/synthesizer";

interface CanvasParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

interface LetterPhysics {
  char: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  angle: number;
  vAngle: number;
  color: string;
  size: number;
}

export function UniverseTransition() {
  const { phase, mode } = useUniverse();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Keep track of internal state for pointer interactivity
  const pointerPos = useRef({ x: 0, y: 0, px: 0, py: 0, isDown: false, moved: false });
  const [coordsText, setCoordsText] = useState("40.8447° N · 69.5986° E");

  // Keep references to our physics simulations
  const fluidSim = useRef<FluidSimulation | null>(null);
  const letterParticles = useRef<LetterPhysics[]>([]);
  const crystals = useRef<Array<{ x: number; y: number; size: number; angle: number; speed: number; alpha: number }>>([]);

  // Setup sound synthesis and initialization for each phase
  useEffect(() => {
    if (phase === "idle") {
      transitionSynth.stopAmbientHum();
      return;
    }

    // Phase transitions audio trigger
    if (phase === "deconstruct") {
      transitionSynth.playDeconstructRumble();
      transitionSynth.startAmbientHum(110); // Low tech hum
    } else if (phase === "liquid") {
      transitionSynth.startAmbientHum(165); // Swirling higher-pitched hum
    } else if (phase === "flash") {
      transitionSynth.playWormholeSweep();
    } else if (phase === "rebuild") {
      transitionSynth.stopAmbientHum();
      transitionSynth.playCrystallizeSparkles();
    }
  }, [phase]);

  // Main Canvas animation and render loop
  useEffect(() => {
    if (phase === "idle") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let isDestroyed = false;
    let rafId = 0;
    let time = 0;

    // Handle high DPI screens
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);

    // Initialize Navier-Stokes Fluid simulation for Phase 2
    if (!fluidSim.current) {
      fluidSim.current = new FluidSimulation(64, 0.0001, 0.0001, 0.1);
    }

    // Initialize letter particles for Phase 1 (Deconstruct)
    const initLetterParticles = () => {
      const text = mode === "kinetic" ? "CONSTRUCTING CREATIVE..." : "DECONSTRUCTING LABS...";
      const chars = text.split("");
      const fontS = Math.max(16, Math.min(width * 0.04, 48));
      ctx.font = `900 ${fontS}px var(--font-mono, monospace)`;
      const totalWidth = ctx.measureText(text).width;

      const startX = (width - totalWidth) / 2;
      const startY = height / 2;

      let currentX = startX;
      letterParticles.current = chars.map((char, index) => {
        const charW = ctx.measureText(char).width;
        const targetX = currentX + charW / 2;
        currentX += charW;

        return {
          char,
          x: targetX + (Math.random() - 0.5) * 200,
          y: startY + (Math.random() - 0.5) * 200,
          targetX,
          targetY: startY,
          vx: 0,
          vy: 0,
          angle: (Math.random() - 0.5) * 0.5,
          vAngle: (Math.random() - 0.5) * 0.05,
          color: mode === "kinetic" ? "#DFFF00" : "#ff4500",
          size: fontS,
        };
      });
    };

    // Initialize crystal sweeps for Phase 4 (Rebuild)
    const initCrystals = () => {
      crystals.current = Array.from({ length: 60 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 15 + Math.random() * 45,
        angle: Math.random() * Math.PI * 2,
        speed: 2 + Math.random() * 6,
        alpha: 0.8 + Math.random() * 0.2,
      }));
    };

    if (phase === "deconstruct") {
      initLetterParticles();
    } else if (phase === "rebuild") {
      initCrystals();
    }

    // Main animation step
    const loop = () => {
      if (isDestroyed) return;
      time += 0.016;

      // Draw background color (matching transition phases)
      if (phase === "deconstruct") {
        ctx.fillStyle = mode === "kinetic" ? "#0d0c10" : "#F9F6F0";
      } else if (phase === "liquid") {
        ctx.fillStyle = mode === "kinetic" ? "#0D0C10" : "#F9F6F0";
      } else if (phase === "flash") {
        ctx.fillStyle = "#ffffff";
      } else if (phase === "rebuild") {
        ctx.fillStyle = mode === "creative" ? "#F9F6F0" : "#0d0c10";
      }
      ctx.fillRect(0, 0, width, height);

      // Render each transition stage elegantly on the Canvas
      if (phase === "deconstruct") {
        renderDeconstructPhase(ctx, width, height, time);
      } else if (phase === "liquid") {
        renderLiquidPhase(ctx, width, height);
      } else if (phase === "flash") {
        renderFlashPhase(ctx, width, height, time);
      } else if (phase === "rebuild") {
        renderRebuildPhase(ctx, width, height);
      }

      // Display technical grid overlay during deconstruct/liquid/flash
      if (phase !== "rebuild" && phase !== "flash") {
        renderHUDCoordinates(ctx, width, height, time);
      }

      rafId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [phase, mode]);

  /**
   * PHASE 1: Deconstruction
   * Physically simulation of text decomposing under a dynamic gravitational forcefield.
   */
  const renderDeconstructPhase = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const letters = letterParticles.current;
    const mx = pointerPos.current.x;
    const my = pointerPos.current.y;

    ctx.font = `900 ${letters[0]?.size || 24}px var(--font-mono, monospace)`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    for (const p of letters) {
      // Direct spring pull to targets
      const springK = 0.08;
      const ax = (p.targetX - p.x) * springK;
      const ay = (p.targetY - p.y) * springK;

      p.vx = (p.vx + ax) * 0.88;
      p.vy = (p.vy + ay) * 0.88;

      // Magnetic mouse repulsion
      const dx = mx - p.x;
      const dy = my - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        const force = (150 - dist) * 0.15;
        const angle = Math.atan2(dy, dx);
        p.vx -= Math.cos(angle) * force;
        p.vy -= Math.sin(angle) * force;
        p.vAngle += (Math.random() - 0.5) * 0.1; // swirl letters
      }

      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.vAngle;
      p.vAngle *= 0.95; // dampen rotation

      // Render letter in its own transform stack
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      // Glitch color aberration
      if (Math.random() > 0.97) {
        ctx.fillStyle = "#ff4500";
        ctx.fillText(p.char, Math.sin(time * 50) * 4, 0);
      } else {
        ctx.fillStyle = p.color;
      }

      ctx.fillText(p.char, 0, 0);
      ctx.restore();
    }

    // Ambient tech dots floating in gravity field
    ctx.fillStyle = mode === "kinetic" ? "rgba(255, 69, 0, 0.15)" : "rgba(17,17,17,0.15)";
    for (let i = 0; i < 20; i++) {
      const rx = (Math.sin(time + i * 200) * 0.5 + 0.5) * width;
      const ry = (Math.cos(time * 0.5 + i * 150) * 0.5 + 0.5) * height;
      ctx.beginPath();
      ctx.arc(rx, ry, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  /**
   * PHASE 2: Navier-Stokes Fluid Interactivity
   * Runs real-time fluid dynamic sweeps across the screen.
   */
  const renderLiquidPhase = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const sim = fluidSim.current;
    if (!sim) return;

    const mx = pointerPos.current.x;
    const my = pointerPos.current.y;
    const px = pointerPos.current.px;
    const py = pointerPos.current.py;

    const nx = mx / width;
    const ny = my / height;

    // Inject pointer force when moving mouse or touching
    if (pointerPos.current.moved) {
      const speedX = (mx - px) * 0.55;
      const speedY = (my - py) * 0.55;
      const speed = Math.sqrt(speedX * speedX + speedY * speedY);

      const cellX = Math.floor(nx * 62) + 1;
      const cellY = Math.floor(ny * 62) + 1;

      sim.addVelocity(cellX, cellY, speedX, speedY);
      sim.addDensity(cellX, cellY, speed * 2.5);

      // Play bubble sound depending on drag speed and position
      if (Math.random() > 0.85) {
        transitionSynth.playBubbleChirp(nx, ny);
      }

      // Modulate low-frequency synth hum
      transitionSynth.modulateHum(Math.min(1.0, speed / 40));

      // Spawn stardust flow particles
      const particleColor = mode === "kinetic" ? "rgba(223, 255, 0, 0.8)" : "rgba(255, 69, 0, 0.8)";
      for (let i = 0; i < 6; i++) {
        sim.spawnParticle(
          nx + (Math.random() - 0.5) * 0.05,
          ny + (Math.random() - 0.5) * 0.05,
          particleColor,
          60
        );
      }

      pointerPos.current.px = mx;
      pointerPos.current.py = my;
      pointerPos.current.moved = false;
    }

    // Step Navier-Stokes physics solver
    sim.step();

    // Render fluid grid
    const primaryColor = mode === "kinetic" ? { r: 255, g: 69, b: 0 } : { r: 199, g: 217, b: 193 };
    const secondaryColor = mode === "kinetic" ? { r: 223, g: 255, b: 0 } : { r: 17, g: 17, b: 17 };
    sim.draw(ctx, width, height, primaryColor, secondaryColor);

    // Overlay text showing Liquid Fluid solver active
    ctx.fillStyle = mode === "kinetic" ? "rgba(255,255,255,0.15)" : "rgba(17,17,17,0.15)";
    ctx.font = "italic uppercase 11vw var(--font-display, sans-serif)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("FLUIDITY", width / 2, height / 2);
  };

  /**
   * PHASE 3: White / High energy cosmic flash
   * Renders high-tech rotating concentric HUD rings and volumetric stargate wormhole.
   */
  const renderFlashPhase = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const cx = width / 2;
    const cy = height / 2;
    const maxRadius = Math.max(width, height);

    // Soft flashing starfield streaks
    ctx.strokeStyle = "rgba(17, 17, 17, 0.12)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 30; i++) {
      const angle = (i * Math.PI * 2) / 30 + time * 0.15;
      const startDist = (time * 600 + i * 20) % maxRadius;
      const endDist = startDist + 150;

      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * startDist, cy + Math.sin(angle) * startDist);
      ctx.lineTo(cx + Math.cos(angle) * endDist, cy + Math.sin(angle) * endDist);
      ctx.stroke();
    }

    // Rotating holographic tech rings
    ctx.lineWidth = 1.5;
    for (let j = 1; j <= 5; j++) {
      const radius = j * 80 * (1 + Math.sin(time * 2 + j) * 0.1);
      ctx.strokeStyle = `rgba(17, 17, 17, ${0.45 - j * 0.08})`;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * (j % 2 === 0 ? 0.6 : -0.6));

      // Draw segmented circular arc
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 0.65);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, radius, Math.PI * 0.9, Math.PI * 1.4);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, radius, Math.PI * 1.6, Math.PI * 1.95);
      ctx.stroke();

      ctx.restore();
    }

    // Center focal volumetric flare
    const flareR = 120 + Math.sin(time * 35) * 20;
    const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, flareR);
    grad.addColorStop(0, "rgba(255, 255, 255, 1.0)");
    grad.addColorStop(0.3, "rgba(17, 17, 17, 0.9)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, flareR, 0, Math.PI * 2);
    ctx.fill();

    // Reconstructing status label
    ctx.fillStyle = "#111111";
    ctx.font = "bold 9px var(--font-mono, monospace)";
    ctx.textAlign = "center";
    ctx.fillText("SYNCHRONIZING DIMENSIONAL DATA...", cx, cy + 180);
  };

  /**
   * PHASE 4: Crystallization Sweep
   * Sweeping shards that reveal the targeted universe theme.
   */
  const renderRebuildPhase = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const shardList = crystals.current;

    ctx.strokeStyle = mode === "creative" ? "rgba(17, 17, 17, 0.06)" : "rgba(255, 69, 0, 0.06)";
    ctx.fillStyle = mode === "creative" ? "rgba(199, 217, 193, 0.15)" : "rgba(255, 69, 0, 0.08)";
    ctx.lineWidth = 1;

    for (const c of shardList) {
      // Shards orbit and slide downwards
      c.x += Math.cos(c.angle) * c.speed * 0.5;
      c.y += c.speed;
      c.angle += 0.01;
      c.alpha *= 0.975; // dissolve slowly

      if (c.y > height) {
        c.y = 0;
        c.alpha = 1;
      }

      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.angle);
      ctx.globalAlpha = c.alpha;

      // Draw beautiful faceted triangle cristal
      ctx.beginPath();
      ctx.moveTo(0, -c.size / 2);
      ctx.lineTo(c.size / 2, c.size / 2);
      ctx.lineTo(-c.size / 2, c.size / 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Center facet line
      ctx.beginPath();
      ctx.moveTo(0, -c.size / 2);
      ctx.lineTo(0, c.size / 2);
      ctx.stroke();

      ctx.restore();
    }
    ctx.globalAlpha = 1.0;
  };

  /**
   * Sub-system HUD coordinate details overlay.
   */
  const renderHUDCoordinates = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    ctx.fillStyle = mode === "kinetic" ? "rgba(255, 255, 255, 0.45)" : "rgba(17, 17, 17, 0.45)";
    ctx.font = "8px var(--font-mono, monospace)";
    ctx.textBaseline = "top";

    // Top Right HUD
    ctx.textAlign = "right";
    ctx.fillText(`TRANSITION_STATE: ${phase.toUpperCase()}`, width - 32, 32);
    ctx.fillText(`FPS: 60.0 // SYSTEM: COMPILING`, width - 32, 45);

    // Top Left HUD
    ctx.textAlign = "left";
    ctx.fillText("40.8447° N · 69.5986° E", 32, 32);
    ctx.fillText("ENGINE_RECON_VER: v6.12.0", 32, 45);

    // Dynamic scanning horizontal bar
    const scanY = (time * 160) % height;
    ctx.strokeStyle = mode === "kinetic" ? "rgba(255, 69, 0, 0.05)" : "rgba(17, 17, 17, 0.05)";
    ctx.beginPath();
    ctx.moveTo(0, scanY);
    ctx.lineTo(width, scanY);
    ctx.stroke();
  };

  // Capture pointer movements to pass as velocities to the fluid solver
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    pointerPos.current.x = mx;
    pointerPos.current.y = my;
    pointerPos.current.moved = true;
  };

  const handlePointerDown = () => {
    pointerPos.current.isDown = true;
  };

  const handlePointerUp = () => {
    pointerPos.current.isDown = false;
  };

  if (phase === "idle") return null;

  return (
    <div
      className="fixed inset-0 z-[200] select-none touch-none overflow-hidden"
      style={{
        cursor: phase === "liquid" ? "grab" : "default",
        pointerEvents: phase === "liquid" || phase === "deconstruct" ? "auto" : "none",
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="absolute inset-0 size-full block"
      />
    </div>
  );
}
export default UniverseTransition;
