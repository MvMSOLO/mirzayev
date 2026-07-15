import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

/**
 * Motion Aftereffect (Waterfall Illusion) — concentric rings continuously
 * flow inward. After staring for ~20s then looking away at a static scene,
 * the static scene appears to expand outward.
 */
export function MotionAftereffectIllusion({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const speed = reduced ? 0.4 : 1.6;

    let offset = 0;

    const draw = () => {
      const size = canvas.offsetWidth;
      if (canvas.width !== size || canvas.height !== size) {
        canvas.width = size;
        canvas.height = size;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const cx = size / 2;
      const cy = size / 2;
      const maxR = Math.hypot(cx, cy) * 1.05;

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, size, size);

      // Draw concentric rings flowing inward
      // Ring spacing = bandWidth, offset scrolls inward
      const bandWidth = size * 0.045;
      const numBands = Math.ceil(maxR / bandWidth) + 2;

      for (let i = 0; i < numBands; i++) {
        // radius shrinks by offset over time
        const r = maxR - (i * bandWidth + (offset % bandWidth));
        if (r < 0) continue;

        const alpha = Math.min(1, r / (size * 0.15)); // fade near center
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        // alternate white and dark rings
        if (i % 2 === 0) {
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        } else {
          ctx.strokeStyle = `rgba(60,60,60,${alpha})`;
        }
        ctx.lineWidth = bandWidth * 0.9;
        ctx.stroke();
      }

      // Radial gradient overlay to soften edges
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(0.7, "rgba(0,0,0,0)");
      grad.addColorStop(1, "rgba(0,0,0,0.85)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      // Fixation dot
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.013, 0, Math.PI * 2);
      ctx.fillStyle = "#ff4500";
      ctx.fill();

      offset += speed;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-black flex items-center justify-center",
        className,
      )}
    >
      <canvas ref={canvasRef} className="mae-canvas w-full h-full" style={{ display: "block" }} />
      <style>{`
        .mae-canvas { aspect-ratio: 1/1; max-width: 100%; max-height: 100%; }
      `}</style>
    </div>
  );
}
