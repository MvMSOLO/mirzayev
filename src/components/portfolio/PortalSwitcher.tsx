import { useEffect, useRef, useState } from "react";
import { useUniverse } from "@/lib/universe";
import { useLang } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/hooks/useSound";
import { Orbit, Sparkles, Binary, Compass } from "lucide-react";

export function PortalSwitcher() {
  const { mode, enter, exit, phase } = useUniverse();
  const { t } = useLang();
  const { playHover, playClick } = useSound();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLButtonElement>(null);

  // Magnetic state offsets
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Draw the miniature dimensional preview in the lens
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 72;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    let rafId = 0;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, size, size);
      const cx = size / 2;
      const cy = size / 2;
      const radius = size / 2 - 4;

      // Draw outer rotating coordinate ring
      ctx.strokeStyle = mode === "kinetic" ? "rgba(17,17,17,0.15)" : "rgba(255,69,0,0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      angle += 0.02;

      if (mode === "kinetic") {
        // PREVIEWING THE UNIVERSE (Creative Cream/Green organic theme)
        // Draw organic morphing blobs with bezier math
        ctx.fillStyle = "rgba(199, 217, 193, 0.4)"; // Cream green
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 2; a += 0.1) {
          const offset = Math.sin(a * 5 + angle * 2) * 4 + Math.cos(a * 3 - angle) * 3;
          const r = radius * 0.6 + offset;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();

        // Pulsing core light
        const pulse = 4 + Math.sin(angle * 4) * 2;
        ctx.fillStyle = "rgba(17, 17, 17, 0.7)";
        ctx.beginPath();
        ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
        ctx.fill();

        // Orbiting particles
        for (let i = 0; i < 3; i++) {
          const pAngle = angle + (i * Math.PI * 2) / 3;
          const px = cx + Math.cos(pAngle) * (radius * 0.8);
          const py = cy + Math.sin(pAngle) * (radius * 0.8);
          ctx.fillStyle = "rgba(17, 17, 17, 0.6)";
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // PREVIEWING KINETIC (Dark technological orange grid)
        // Draw micro crosshairs
        ctx.strokeStyle = "rgba(255, 69, 0, 0.4)";
        ctx.beginPath();
        ctx.moveTo(cx - 8, cy); ctx.lineTo(cx + 8, cy);
        ctx.moveTo(cx, cy - 8); ctx.lineTo(cx, cy + 8);
        ctx.stroke();

        // Draw scanning radar wave
        ctx.strokeStyle = "rgba(255, 69, 0, 0.15)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, (radius * (angle % 1)) * 0.9, 0, Math.PI * 2);
        ctx.stroke();

        // Binary signal points
        ctx.fillStyle = "rgba(255, 69, 0, 0.8)";
        const count = 4;
        for (let i = 0; i < count; i++) {
          const dAngle = (i * Math.PI * 2) / count + angle * 0.5;
          const dist = radius * 0.5;
          const dx = cx + Math.cos(dAngle) * dist;
          const dy = cy + Math.sin(dAngle) * dist;
          ctx.fillRect(dx - 1, dy - 1, 2, 2);
        }
      }

      rafId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(rafId);
  }, [mode]);

  // Magnetic gravity pull calculation on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const distanceX = e.clientX - cx;
    const distanceY = e.clientY - cy;

    // Pull factor (dampen the movement to keep it contained)
    setCoords({
      x: distanceX * 0.35,
      y: distanceY * 0.35,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const handleTrigger = () => {
    playClick();
    if (mode === "kinetic") {
      enter();
    } else {
      exit();
    }
  };

  if (phase !== "idle") return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] pointer-events-auto">
      <motion.button
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          setIsHovered(true);
          playHover();
        }}
        onMouseLeave={handleMouseLeave}
        onClick={handleTrigger}
        className="group relative flex items-center justify-center p-0 bg-transparent border-none outline-none cursor-pointer"
        animate={{
          x: coords.x,
          y: coords.y,
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 20,
          mass: 0.6,
        }}
        aria-label={
          mode === "kinetic"
            ? "Enter Creative Universe Mode"
            : "Return to Technical Kinetic Mode"
        }
      >
        {/* Tech glowing radar background rings for Kinetic, organic ripples for Creative */}
        <div
          className={`absolute inset-[-12px] rounded-full blur-[10px] opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none ${
            mode === "kinetic" ? "bg-accent/15 scale-110" : "bg-[#C7D9C1]/30 scale-110"
          }`}
        />

        {/* Orbiting Ring */}
        <svg
          className={`absolute w-24 h-24 pointer-events-none transition-all duration-700 ${
            isHovered ? "rotate-[180deg] scale-110" : "rotate-0 scale-100"
          }`}
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke={mode === "kinetic" ? "rgba(255, 69, 0, 0.4)" : "rgba(17, 17, 17, 0.3)"}
            strokeWidth="1"
            strokeDasharray="4 8 16 8"
          />
        </svg>

        {/* Core Glass Portal Spherical Button */}
        <div
          className={`relative size-16 rounded-full border flex items-center justify-center overflow-hidden transition-all duration-500 shadow-2xl backdrop-blur-md ${
            mode === "kinetic"
              ? "bg-secondary/40 border-white/20 hover:border-accent"
              : "bg-[#F4F1EA]/80 border-[#111]/10 hover:border-[#111]"
          }`}
        >
          {/* Miniature view rendering canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 size-full pointer-events-none" />

          {/* Glowing central orb */}
          <div
            className={`absolute size-4 rounded-full mix-blend-screen pointer-events-none blur-[2px] transition-all duration-500 ${
              isHovered ? "scale-150" : "scale-100"
            } ${mode === "kinetic" ? "bg-[#DFFF00]" : "bg-accent"}`}
          />
        </div>

        {/* Holographic Expandable Text Tag on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: -20, scale: 1 }}
              exit={{ opacity: 0, x: -5, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`absolute right-full mr-2 py-1.5 px-3 rounded-sm border backdrop-blur-md font-mono text-[9px] uppercase tracking-widest pointer-events-none whitespace-nowrap shadow-lg flex items-center gap-2 ${
                mode === "kinetic"
                  ? "bg-black/90 border-white/10 text-white"
                  : "bg-[#F9F6F0]/95 border-[#111]/15 text-[#111]"
              }`}
            >
              {mode === "kinetic" ? (
                <>
                  <Sparkles className="w-3 h-3 text-[#DFFF00] animate-pulse" />
                  <span>{t("uni.enter")}</span>
                </>
              ) : (
                <>
                  <Binary className="w-3 h-3 text-accent animate-spin" style={{ animationDuration: '4s' }} />
                  <span>{t("uni.exit")}</span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
export default PortalSwitcher;
