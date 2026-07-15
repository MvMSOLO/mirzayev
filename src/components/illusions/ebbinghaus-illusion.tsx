import { cn } from "@/lib/utils";

/**
 * Ebbinghaus illusion — two identical central circles surrounded by rings
 * of large vs. small circles. The center surrounded by large circles looks
 * smaller; the one surrounded by small circles looks larger.
 */
export function EbbinghausIllusionIllusion({ className }: { className?: string }) {
  const centerR = 28;
  const centerColor = "#a0a0a0";

  // Large surrounding circles
  const largeR = 44;
  const largeCount = 6;
  const largeOrbit = centerR + largeR + 10;

  // Small surrounding circles
  const smallR = 10;
  const smallCount = 10;
  const smallOrbit = centerR + smallR + 8;

  function ring(cx: number, cy: number, r: number, orbit: number, count: number) {
    return Array.from({ length: count }, (_, i) => {
      const angle = (2 * Math.PI * i) / count - Math.PI / 2;
      return {
        x: cx + orbit * Math.cos(angle),
        y: cy + orbit * Math.sin(angle),
        r,
      };
    });
  }

  const leftCx = 120;
  const rightCx = 330;
  const cy = 160;

  const largeSurrounds = ring(leftCx, cy, largeR, largeOrbit, largeCount);
  const smallSurrounds = ring(rightCx, cy, smallR, smallOrbit, smallCount);

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-[#f5f5f5] flex items-center justify-center",
        className,
      )}
    >
      <svg
        viewBox="0 0 450 320"
        className="ebbinghaus-root w-[92%] max-w-[540px]"
        style={{ display: "block" }}
      >
        {/* Large surrounds group */}
        {largeSurrounds.map((c, i) => (
          <circle key={`l${i}`} cx={c.x} cy={c.y} r={c.r} fill="#666" />
        ))}
        {/* Small surrounds group */}
        {smallSurrounds.map((c, i) => (
          <circle key={`s${i}`} cx={c.x} cy={c.y} r={c.r} fill="#666" />
        ))}
        {/* Two identical center circles */}
        <circle cx={leftCx} cy={cy} r={centerR} fill={centerColor} />
        <circle cx={rightCx} cy={cy} r={centerR} fill={centerColor} />
        {/* Thin orange dot at each center for fixation reference */}
        <circle cx={leftCx} cy={cy} r={2.5} fill="#ff4500" opacity="0.7" />
        <circle cx={rightCx} cy={cy} r={2.5} fill="#ff4500" opacity="0.7" />
      </svg>
      <style>{`
        .ebbinghaus-root { aspect-ratio: 450 / 320; }
      `}</style>
    </div>
  );
}
