import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

/**
 * Autokinetic Effect — a single dim dot in darkness appears to wander
 * when stared at, due to involuntary micro-saccades and absence of
 * visual reference frame. We add an imperceptibly slow sine-based drift
 * to simulate / reinforce the perceptual wandering.
 */
export function AutokineticDotIllusion({ className }: { className?: string }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let t = 0;
    const animate = () => {
      t += 0.004; // very slow
      // Two independent low-frequency sine waves for x and y
      const x = Math.sin(t * 0.7) * 6 + Math.sin(t * 1.3 + 1.2) * 3;
      const y = Math.cos(t * 0.9 + 0.5) * 5 + Math.cos(t * 1.1 + 2.4) * 3.5;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-black flex items-center justify-center",
        className,
      )}
    >
      {/* Deep vignette to remove all peripheral reference */}
      <div className="autok-vignette absolute inset-0" />

      {/* The wandering dot */}
      <div ref={dotRef} className="autok-dot" />

      <style>{`
        .autok-vignette {
          background: radial-gradient(
            ellipse 60% 60% at 50% 50%,
            transparent 20%,
            rgba(0,0,0,0.55) 55%,
            rgba(0,0,0,0.92) 80%,
            #000 100%
          );
          pointer-events: none;
          z-index: 2;
        }
        .autok-dot {
          position: relative;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(220, 220, 210, 0.82);
          box-shadow:
            0 0 6px 3px rgba(200,200,190,0.35),
            0 0 14px 6px rgba(180,180,170,0.12);
          z-index: 3;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
