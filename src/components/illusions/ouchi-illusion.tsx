import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

/**
 * Ouchi Illusion — outer field of horizontal stripes, inner circular
 * region of vertical stripes. The inner disc appears to float/slide
 * independently when the eyes move. A subtle pointer-driven parallax
 * reinforces the retinal-motion artifact.
 */
export function OuchiIllusionIllusion({ className }: { className?: string }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width - 0.5;
      const my = (e.clientY - rect.top) / rect.height - 0.5;
      // Very small parallax — the illusion does most of the work
      inner.style.transform = `translate(${mx * -6}px, ${my * -6}px)`;
    };

    const onLeave = () => {
      inner.style.transform = "translate(0px, 0px)";
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Stripe tile size (percentage of container)
  const stripeH = 4; // percent height per stripe pair

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden bg-white flex items-center justify-center",
        className,
      )}
    >
      {/* Outer field — horizontal stripes */}
      <div
        className="ouchi-outer absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            #000 0%,
            #000 50%,
            #fff 50%,
            #fff 100%
          )`,
          backgroundSize: `100% ${stripeH}%`,
        }}
      />

      {/* Inner disc — vertical stripes, clips to circle */}
      <div
        ref={innerRef}
        className="ouchi-inner"
        style={{
          position: "absolute",
          width: "38%",
          aspectRatio: "1/1",
          borderRadius: "50%",
          overflow: "hidden",
          backgroundImage: `repeating-linear-gradient(
            90deg,
            #000 0%,
            #000 50%,
            #fff 50%,
            #fff 100%
          )`,
          backgroundSize: `${stripeH}% 100%`,
          transition: "transform 0.08s linear",
          zIndex: 2,
          willChange: "transform",
        }}
      />

      <style>{`
        .ouchi-outer { z-index: 1; }
      `}</style>
    </div>
  );
}
