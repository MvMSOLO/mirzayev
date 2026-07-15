import { cn } from "@/lib/utils";

/**
 * Müller-Lyer illusion — three horizontal line segments of identical length.
 * Outward fins (>---<) make the shaft look longer; inward fins (<--->) shorter.
 */
export function MullerLyerIllusion({ className }: { className?: string }) {
  const shaftLen = 160;
  const finLen = 38;
  const finAngle = 35;
  const rad = (finAngle * Math.PI) / 180;
  const dx = finLen * Math.cos(rad);
  const dy = finLen * Math.sin(rad);

  const cx = 200;
  const x1 = cx - shaftLen / 2;
  const x2 = cx + shaftLen / 2;

  function makeFins(x: number, y: number, outward: boolean, isLeft: boolean): string {
    const side = isLeft ? -1 : 1;
    const sign = outward ? side : -side;
    return `M ${x} ${y} L ${x + sign * dx} ${y - dy} ` + `M ${x} ${y} L ${x + sign * dx} ${y + dy}`;
  }

  const rows: Array<{ y: number; outward: boolean }> = [
    { y: 80, outward: true },
    { y: 175, outward: false },
    { y: 270, outward: true },
  ];

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-white flex items-center justify-center",
        className,
      )}
    >
      <svg
        viewBox="0 0 400 350"
        className="mullerlyer-root w-[88%] max-w-[500px]"
        style={{ display: "block", overflow: "visible" }}
      >
        {rows.map(({ y, outward }, i) => (
          <g key={i} stroke="#111" strokeWidth="2.8" fill="none" strokeLinecap="round">
            <line x1={x1} y1={y} x2={x2} y2={y} />
            <path d={makeFins(x1, y, outward, true)} />
            <path d={makeFins(x2, y, outward, false)} />
          </g>
        ))}
        {rows.map(({ y }, i) => (
          <g key={`t${i}`} stroke="#ff4500" strokeWidth="1.5" opacity="0.5">
            <line x1={x1} y1={y - 10} x2={x1} y2={y + 10} />
            <line x1={x2} y1={y - 10} x2={x2} y2={y + 10} />
          </g>
        ))}
      </svg>
      <style>{`
        .mullerlyer-root { aspect-ratio: 400 / 350; }
      `}</style>
    </div>
  );
}
