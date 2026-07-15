import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

/**
 * Hypno Spiral — classic Archimedean spiral continuously rotating inward.
 * Canvas-based for crisp rendering at any size.
 */
export function HypnoSpiralIllusion({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const speed = reduced ? 0.003 : 0.012;

    let angle = 0;

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
      const maxR = Math.hypot(cx, cy);

      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, size, size);

      // Draw Archimedean spiral as filled alternating sectors
      // We trace the spiral as a thick polyline with alternating black/white
      const turns = 7;
      const steps = 900;
      const dr = maxR / ((turns * steps) / turns);

      ctx.lineWidth = 0;

      // Build spiral path pairs for black and white bands
      // Each "band" is half a turn wide
      const points: Array<{ x: number; y: number; r: number; a: number }> = [];
      for (let i = 0; i <= steps; i++) {
        const t = i / steps; // 0..1
        const r = t * maxR;
        const a = t * turns * 2 * Math.PI + angle;
        points.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), r, a });
      }

      // Render as a filled Archimedean spiral using wedge method
      // Each half-turn alternates black / white
      const halfTurnSteps = Math.floor(steps / (turns * 2));
      for (let band = 0; band < turns * 2; band++) {
        const start = band * halfTurnSteps;
        const end = Math.min(start + halfTurnSteps, steps);
        if (start >= points.length) break;

        ctx.beginPath();
        // outer arc forward
        for (let i = start; i <= end; i++) {
          const p = points[i];
          if (!p) break;
          const bandWidth = (maxR / (turns * 2)) * 1.05;
          const ro = Math.min(p.r + bandWidth, maxR);
          const xo = cx + ro * Math.cos(p.a);
          const yo = cy + ro * Math.sin(p.a);
          if (i === start) ctx.moveTo(xo, yo);
          else ctx.lineTo(xo, yo);
        }
        // inner arc backward
        for (let i = end; i >= start; i--) {
          const p = points[i];
          if (!p) break;
          ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.fillStyle = band % 2 === 0 ? "#000000" : "#ffffff";
        ctx.fill();
      }

      // Center fixation mark
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.012, 0, Math.PI * 2);
      ctx.fillStyle = "#ff4500";
      ctx.fill();

      angle -= speed;
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
      <canvas
        ref={canvasRef}
        className="hypno-canvas aspect-square w-full h-full"
        style={{ display: "block" }}
      />
      <style>{`
        .hypno-canvas { max-width: 100%; max-height: 100%; object-fit: contain; }
      `}</style>
    </div>
  );
}
