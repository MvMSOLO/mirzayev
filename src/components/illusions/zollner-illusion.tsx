import { cn } from "@/lib/utils";

/**
 * Zöllner illusion — parallel long diagonal lines crossed by short hatch
 * lines all tilted the same way, making the parallel long lines appear to
 * diverge or converge. Pure static SVG.
 */
export function ZollnerIllusion({ className }: { className?: string }) {
  // 6 long parallel lines running diagonally across an 800x800 canvas
  // spaced 110px apart (y-intercepts), each at 20° from horizontal
  // Hatch lines cross each long line at ~60° to it (so ~80° from horizontal)

  const numLines = 6;
  const spacing = 110;
  const startY = 95;

  // Long line: from x=0 to x=800, slope = tan(20°)
  const longSlope = Math.tan((20 * Math.PI) / 180);

  // Hatch lines: perpendicular-ish to long lines, ~60° cross angle
  // Alternate rows get opposite hatch tilt to make illusion stronger
  const hatchCount = 14;
  const hatchLength = 30;

  const lines = Array.from({ length: numLines }, (_, i) => {
    const yOff = startY + i * spacing;
    const x1 = 0;
    const y1 = yOff;
    const x2 = 800;
    const y2 = yOff + longSlope * 800;

    // Alternate hatch tilt per line: +45° and -45° to the long-line direction
    const hatchAngleDeg = i % 2 === 0 ? 65 : 115;
    const hatchAngleRad = (hatchAngleDeg * Math.PI) / 180;
    const dx = Math.cos(hatchAngleRad) * hatchLength;
    const dy = Math.sin(hatchAngleRad) * hatchLength;

    const hatches = Array.from({ length: hatchCount }, (__, h) => {
      const t = (h + 0.5) / hatchCount;
      const hx = x1 + t * (x2 - x1);
      const hy = y1 + t * (y2 - y1);
      return { hx, hy, dx, dy };
    });

    return { x1, y1, x2, y2, hatches };
  });

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-white flex items-center justify-center",
        className,
      )}
    >
      <div className="relative aspect-square w-[90%] max-w-[520px]">
        <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="800" height="800" fill="#fff" />

          {lines.map((ln, i) => (
            <g key={`ln${i}`}>
              {/* Long line */}
              <line x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2} stroke="#111" strokeWidth="2.5" />
              {/* Hatch lines */}
              {ln.hatches.map((h, j) => (
                <line
                  key={`h${i}-${j}`}
                  x1={h.hx - h.dx}
                  y1={h.hy - h.dy}
                  x2={h.hx + h.dx}
                  y2={h.hy + h.dy}
                  stroke="#111"
                  strokeWidth="1.8"
                />
              ))}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
