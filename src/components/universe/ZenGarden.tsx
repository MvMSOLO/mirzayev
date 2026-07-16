import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { useSound } from "@/hooks/useSound";
import { Sparkles, RotateCcw } from "lucide-react";

interface Stone {
  id: number;
  x: number; // normalized coordinate (0 to 1)
  y: number; // normalized coordinate (0 to 1)
  size: number;
  color: string;
  shadowOffset: { x: number; y: number };
}

interface ActiveRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

export function UniverseZenGarden() {
  const { t } = useLang();
  const { playSynthesis } = useSound();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Default stones list
  const initialStones: Stone[] = [
    { id: 1, x: 0.3, y: 0.35, size: 32, color: "#3C3A36", shadowOffset: { x: 4, y: 6 } },
    { id: 2, x: 0.7, y: 0.6, size: 40, color: "#2B2A27", shadowOffset: { x: 5, y: 8 } },
    { id: 3, x: 0.52, y: 0.75, size: 24, color: "#4E4B46", shadowOffset: { x: 3, y: 5 } },
  ];

  // We keep React state for UI rendering and refs for high-frequency Canvas rendering
  const [stones, setStones] = useState<Stone[]>(initialStones);
  const stonesRef = useRef<Stone[]>(initialStones);

  // Ripples are fully visual and handled directly in the render loop via Ref for performance
  const activeRipplesRef = useRef<ActiveRipple[]>([]);

  const [activePreset, setActivePreset] = useState<string>("silent-stream");
  const [isRaking, setIsRaking] = useState(false);

  const isVisibleRef = useRef(true);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Keep stonesRef synchronized with React state
  const updateStones = (nextStones: Stone[]) => {
    setStones(nextStones);
    stonesRef.current = nextStones;
  };

  // Intersection Observer to prevent CPU usage when offscreen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          // Restart animation loop if visible
          renderLoop();
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Initialize and resize canvas
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      const nextWidth = Math.floor(rect.width);
      const nextHeight = Math.floor(rect.height);

      if (canvas.width !== nextWidth * dpr || canvas.height !== nextHeight * dpr) {
        canvas.width = nextWidth * dpr;
        canvas.height = nextHeight * dpr;

        // Initialize offscreen canvas for persistent sand grooves
        if (!offscreenCanvasRef.current) {
          offscreenCanvasRef.current = document.createElement("canvas");
        }
        const offscreen = offscreenCanvasRef.current;
        offscreen.width = canvas.width;
        offscreen.height = canvas.height;

        // Initialize the sand on resize/startup
        clearSandCanvas(offscreen.width, offscreen.height);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Draw/initialize persistent sand background and grooves
  const clearSandCanvas = (width: number, height: number, presetType = activePreset) => {
    const offscreen = offscreenCanvasRef.current;
    if (!offscreen) return;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return;

    // Fill with sand base color
    ctx.fillStyle = "#F5F2EC"; // Soft warm paper/sand color
    ctx.fillRect(0, 0, width, height);

    // Draw granular sand texture
    ctx.fillStyle = "rgba(17, 11, 0, 0.015)";
    for (let i = 0; i < width * height * 0.005; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const rSize = Math.random() * 1.5;
      ctx.fillRect(rx, ry, rSize, rSize);
    }

    // Apply selected presets
    if (presetType === "silent-stream") {
      drawStreamPreset(ctx, width, height);
    } else if (presetType === "quantum-waves") {
      drawQuantumWavesPreset(ctx, width, height);
    } else if (presetType === "eternal-spiral") {
      drawSpiralPreset(ctx, width, height);
    }
  };

  // Preset 1: Silent Stream (Wavy flow lines)
  const drawStreamPreset = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.strokeStyle = "rgba(17, 11, 0, 0.045)"; // Very subtle shadow line
    ctx.lineWidth = 1.8;

    const lineCount = Math.floor(h / 24);
    for (let i = 0; i <= lineCount; i++) {
      const yBase = i * 24;
      ctx.beginPath();
      for (let x = 0; x <= w + 10; x += 15) {
        // Parallel multi-tine look
        const yOffset = Math.sin(x * 0.006 + (i * 0.2)) * 14;
        if (x === 0) {
          ctx.moveTo(x, yBase + yOffset);
        } else {
          ctx.lineTo(x, yBase + yOffset);
        }
      }
      ctx.stroke();

      // Parallel secondary tines for realism
      ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
      ctx.beginPath();
      for (let x = 0; x <= w + 10; x += 15) {
        const yOffset = Math.sin(x * 0.006 + (i * 0.2)) * 14;
        if (x === 0) {
          ctx.moveTo(x, yBase + yOffset - 1);
        } else {
          ctx.lineTo(x, yBase + yOffset - 1);
        }
      }
      ctx.stroke();
      ctx.strokeStyle = "rgba(17, 11, 0, 0.045)";
    }
  };

  // Preset 2: Quantum Waves (Concentric rings centered around each stone)
  const drawQuantumWavesPreset = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    stonesRef.current.forEach((stone) => {
      const sx = stone.x * w;
      const sy = stone.y * h;
      const maxRadius = Math.max(w, h);

      for (let r = stone.size + 15; r < maxRadius; r += 16) {
        // Draw dark outline
        ctx.strokeStyle = "rgba(17, 11, 0, 0.045)";
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.stroke();

        // Draw light highlights
        ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
        ctx.beginPath();
        ctx.arc(sx, sy, r - 1, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
  };

  // Preset 3: Eternal Spiral (Continuous spiral from center outward)
  const drawSpiralPreset = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const cx = w / 2;
    const cy = h / 2;
    const maxRadius = Math.max(w, h) * 0.8;

    ctx.strokeStyle = "rgba(17, 11, 0, 0.045)";
    ctx.lineWidth = 1.8;

    ctx.beginPath();
    let theta = 0;
    let r = 10;
    const step = 0.05;

    while (r < maxRadius) {
      const x = cx + r * Math.cos(theta);
      const y = cy + r * Math.sin(theta);
      if (theta === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      theta += step;
      r += 0.12; // Controls spiral density
    }
    ctx.stroke();

    // Re-draw with highlight
    ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
    ctx.beginPath();
    theta = 0;
    r = 10;
    while (r < maxRadius) {
      const x = cx + r * Math.cos(theta);
      const y = cy + (r * Math.sin(theta)) - 1;
      if (theta === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      theta += step;
      r += 0.12;
    }
    ctx.stroke();
  };

  // Animation rendering loop - completely ref-driven to avoid stale React closures
  const renderLoop = () => {
    if (!isVisibleRef.current) return;

    const canvas = canvasRef.current;
    const offscreen = offscreenCanvasRef.current;
    if (!canvas || !offscreen) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Draw persistent sand state from offscreen canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(offscreen, 0, 0);

    // 2. Update and draw active ripples
    const ripples = activeRipplesRef.current;
    if (ripples.length > 0) {
      activeRipplesRef.current = ripples
        .map((ripple) => {
          const nextRadius = ripple.radius + ripple.speed;
          const nextOpacity = Math.max(0, 1 - nextRadius / ripple.maxRadius);

          // Draw dark ripple line
          ctx.strokeStyle = `rgba(17, 11, 0, ${nextOpacity * 0.08})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, nextRadius, 0, Math.PI * 2);
          ctx.stroke();

          // Draw white ripple highlight
          ctx.strokeStyle = `rgba(255, 255, 255, ${nextOpacity * 0.7})`;
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, nextRadius - 1, 0, Math.PI * 2);
          ctx.stroke();

          return { ...ripple, radius: nextRadius, opacity: nextOpacity };
        })
        .filter((ripple) => ripple.radius < ripple.maxRadius);
    }

    // 3. Draw beautiful stones with organic shadows using stonesRef (always holds latest)
    stonesRef.current.forEach((stone) => {
      const sx = stone.x * canvas.width;
      const sy = stone.y * canvas.height;

      // Draw soft organic floor ambient occlusion
      ctx.fillStyle = "rgba(17, 11, 0, 0.08)";
      ctx.beginPath();
      ctx.ellipse(
        sx + stone.shadowOffset.x,
        sy + stone.shadowOffset.y,
        stone.size * 1.1,
        stone.size * 0.6,
        Math.PI / 12,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Stone core gradient
      const grad = ctx.createRadialGradient(
        sx - stone.size * 0.2,
        sy - stone.size * 0.3,
        stone.size * 0.1,
        sx,
        sy,
        stone.size
      );
      grad.addColorStop(0, "#5A5853");
      grad.addColorStop(0.4, stone.color);
      grad.addColorStop(1, "#181716");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(sx, sy, stone.size, 0, Math.PI * 2);
      ctx.fill();

      // Light dust highlight on top edge
      ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(sx, sy, stone.size - 0.5, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();
    });

    animationFrameRef.current = requestAnimationFrame(renderLoop);
  };

  // Interactive Sand Raking (Pointer move)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsRaking(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    lastPosRef.current = { x, y };

    // Satisfying sound trigger for initial touch
    playSynthesis(44); // Soft bubble pop
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isRaking || !lastPosRef.current) return;

    const canvas = canvasRef.current;
    const offscreen = offscreenCanvasRef.current;
    if (!canvas || !offscreen) return;

    const offscreenCtx = offscreen.getContext("2d");
    if (!offscreenCtx) return;

    const rect = canvas.getBoundingClientRect();
    const currentX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const currentY = (e.clientY - rect.top) * (canvas.height / rect.height);
    const lastPos = lastPosRef.current;

    // Draw multi-tine rake groove persistent in the offscreen sand canvas
    const rakeSpacing = 5; // spacing between tines
    const tineCount = 5; // 5 tines for a professional rake look

    // Calculate normal vector to drawing direction for parallel lines
    const dx = currentX - lastPos.x;
    const dy = currentY - lastPos.y;
    const len = Math.sqrt(dx * dx + dy * dy);

    if (len < 2) return; // avoid drawing when basically stationary

    const nx = -dy / len;
    const ny = dx / len;

    // Draw tines
    for (let t = 0; t < tineCount; t++) {
      const offset = (t - (tineCount - 1) / 2) * rakeSpacing;

      // Dark grooves shadows
      offscreenCtx.strokeStyle = "rgba(17, 11, 0, 0.045)";
      offscreenCtx.lineWidth = 1.8;
      offscreenCtx.beginPath();
      offscreenCtx.moveTo(lastPos.x + nx * offset, lastPos.y + ny * offset);
      offscreenCtx.lineTo(currentX + nx * offset, currentY + ny * offset);
      offscreenCtx.stroke();

      // White highlights
      offscreenCtx.strokeStyle = "rgba(255, 255, 255, 0.55)";
      offscreenCtx.beginPath();
      offscreenCtx.moveTo(lastPos.x + nx * offset, lastPos.y + ny * offset - 1);
      offscreenCtx.lineTo(currentX + nx * offset, currentY + ny * offset - 1);
      offscreenCtx.stroke();
    }

    lastPosRef.current = { x: currentX, y: currentY };

    // Occasionally trigger low-pitch micro sound during raking to feel material
    if (Math.random() < 0.06) {
      playSynthesis(45); // Woody tock texture
    }
  };

  const handlePointerUp = () => {
    setIsRaking(false);
    lastPosRef.current = null;
  };

  // Tap to Place Stone & Generate Ripple
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // Only place a stone if we weren't just dragging/raking a significant path
    if (lastPosRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const normX = clickX / rect.width;
    const normY = clickY / rect.height;

    // 1. Play beautiful meditative bell
    const dynamicChimes = [34, 36, 44, 48, 51];
    const randomIndex = dynamicChimes[Math.floor(Math.random() * dynamicChimes.length)];
    playSynthesis(randomIndex);

    // 2. Add concentric persistent ripple in sand around new stone spot
    const offscreen = offscreenCanvasRef.current;
    if (offscreen) {
      const oCtx = offscreen.getContext("2d");
      if (oCtx) {
        const sx = normX * offscreen.width;
        const sy = normY * offscreen.height;

        // Permanent concentric ripples in the sand before placing stone
        for (let r = 24; r <= 88; r += 16) {
          oCtx.strokeStyle = "rgba(17, 11, 0, 0.045)";
          oCtx.lineWidth = 1.8;
          oCtx.beginPath();
          oCtx.arc(sx, sy, r, 0, Math.PI * 2);
          oCtx.stroke();

          oCtx.strokeStyle = "rgba(255, 255, 255, 0.55)";
          oCtx.beginPath();
          oCtx.arc(sx, sy, r - 1, 0, Math.PI * 2);
          oCtx.stroke();
        }
      }
    }

    // 3. Trigger dynamic temporary expansion ripple
    const dpr = window.devicePixelRatio || 1;
    const canvasClickX = clickX * (canvas.width / rect.width);
    const canvasClickY = clickY * (canvas.height / rect.height);

    activeRipplesRef.current.push({
      x: canvasClickX,
      y: canvasClickY,
      radius: 10,
      maxRadius: 180 * dpr,
      opacity: 1,
      speed: 3 * dpr,
    });

    // 4. Update stones list (cycle old stone if > 5)
    const stoneColors = ["#3C3A36", "#2B2A27", "#4E4B46", "#585550", "#232220"];
    const newStone: Stone = {
      id: Date.now(),
      x: normX,
      y: normY,
      size: Math.floor(Math.random() * 16) + 24, // Size between 24 and 40
      color: stoneColors[Math.floor(Math.random() * stoneColors.length)],
      shadowOffset: {
        x: Math.floor(Math.random() * 3) + 3,
        y: Math.floor(Math.random() * 4) + 5,
      },
    };

    const nextStones = stonesRef.current.length >= 5
      ? [...stonesRef.current.slice(1), newStone]
      : [...stonesRef.current, newStone];

    updateStones(nextStones);
  };

  // Change preset sand pattern
  const selectPreset = (presetName: string) => {
    setActivePreset(presetName);
    const canvas = canvasRef.current;
    if (canvas) {
      clearSandCanvas(canvas.width, canvas.height, presetName);
    }
    playSynthesis(34); // satisfy bell sound
  };

  // Completely clear all stones and sand lines
  const resetGarden = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      updateStones(initialStones);
      setActivePreset("silent-stream");
      clearSandCanvas(canvas.width, canvas.height, "silent-stream");
      activeRipplesRef.current = [];
    }
    playSynthesis(38); // descending clear sounds
  };

  return (
    <section
      ref={containerRef}
      id="uni-zen"
      className="px-6 md:px-[8vw] py-[15vh] border-t border-[#111]/10 bg-[#F9F6F0] relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
        <div className="lg:col-span-5">
          <div className="text-[11px] uppercase tracking-[0.4em] text-[#111]/50 mb-6 font-mono">
            — {t("uni.zen.tag")}
          </div>
          <h2
            className="italic text-[#111] leading-[0.85] mb-8"
            style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(48px, 6vw, 110px)" }}
          >
            {t("uni.zen.title")}
          </h2>
          <p
            className="text-lg md:text-xl text-[#111]/70 leading-relaxed mb-10 max-w-[44ch]"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            {t("uni.zen.desc")}
          </p>

          {/* Controls Panel */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#111]/40 font-mono mb-3">
                {t("uni.zen.preset.title")}
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "silent-stream", label: t("uni.zen.preset.1") },
                  { key: "quantum-waves", label: t("uni.zen.preset.2") },
                  { key: "eternal-spiral", label: t("uni.zen.preset.3") },
                ].map((preset) => (
                  <button
                    key={preset.key}
                    onClick={() => selectPreset(preset.key)}
                    className={`px-4 py-2 text-xs uppercase tracking-widest rounded-full border transition-all duration-300 font-mono ${
                      activePreset === preset.key
                        ? "bg-[#111] text-white border-transparent"
                        : "bg-transparent text-[#111]/60 border-[#111]/20 hover:border-[#111] hover:text-[#111]"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={resetGarden}
                className="flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest rounded-sm border border-[#111]/20 text-[#111] hover:bg-[#111] hover:text-white hover:border-transparent transition-all duration-300 font-mono cursor-pointer animate-fade-in-up"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {t("uni.zen.clear")}
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Canvas Sandbox */}
        <div className="lg:col-span-7">
          <div className="relative w-full aspect-[4/3] bg-[#F5F2EC] rounded-md shadow-lg border border-[#111]/10 overflow-hidden cursor-crosshair">
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onClick={handleCanvasClick}
              className="absolute inset-0 w-full h-full touch-none"
              style={{ backfaceVisibility: "hidden" }}
            />

            {/* Micro details overlay */}
            <div className="absolute top-4 right-4 pointer-events-none select-none flex items-center gap-2 bg-[#F9F6F0]/80 backdrop-blur-xs border border-[#111]/15 px-3 py-1.5 rounded-sm">
              <Sparkles className="w-3 h-3 text-[#111]/45 animate-pulse" />
              <span className="text-[9px] uppercase tracking-widest text-[#111]/60 font-mono">
                interactive_sandbox
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
