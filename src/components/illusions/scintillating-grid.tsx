import { cn } from "@/lib/utils";

/**
 * Scintillating Grid illusion — grey discs at intersections of a grey line
 * lattice on black. Illusory dark dots flicker at intersections in peripheral
 * vision. Subtle staggered SVG animate pulse enhances on-screen scintillation.
 */
export function ScintillatingGridIllusion({ className }: { className?: string }) {
  const cols = 8;
  const rows = 8;
  const dotCols = cols - 1;
  const dotRows = rows - 1;

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-black flex items-center justify-center",
        className,
      )}
    >
      <div className="relative aspect-square w-[88%] max-w-[520px]">
        <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="800" height="800" fill="#000" />

          {Array.from({ length: rows + 1 }, (_, row) => (
            <line
              key={`h${row}`}
              x1="0"
              y1={(row / rows) * 800}
              x2="800"
              y2={(row / rows) * 800}
              stroke="#808080"
              strokeWidth="10"
            />
          ))}

          {Array.from({ length: cols + 1 }, (_, col) => (
            <line
              key={`v${col}`}
              x1={(col / cols) * 800}
              y1="0"
              x2={(col / cols) * 800}
              y2="800"
              stroke="#808080"
              strokeWidth="10"
            />
          ))}

          {Array.from({ length: dotRows }, (_, row) =>
            Array.from({ length: dotCols }, (_, col) => {
              const cx = ((col + 1) / cols) * 800;
              const cy = ((row + 1) / rows) * 800;
              const delay = ((row * dotCols + col) * 0.19) % 3.5;
              return (
                <circle key={`d${row}-${col}`} cx={cx} cy={cy} r="17" fill="#d4d4d4">
                  <animate
                    attributeName="opacity"
                    values="1;0.52;1"
                    dur="3.4s"
                    begin={`${delay.toFixed(2)}s`}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
                  />
                </circle>
              );
            }),
          )}
        </svg>
      </div>
    </div>
  );
}
