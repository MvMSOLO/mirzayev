import { cn } from "@/lib/utils";

/**
 * Café Wall illusion — alternating black/white bricks in rows, each row
 * offset by half a brick width, separated by thin grey mortar lines. The
 * perfectly parallel horizontal mortar lines appear to tilt/wedge due to
 * the staggered high-contrast brick edges. Pure static SVG — no animation.
 */
export function CafeWallIllusion({ className }: { className?: string }) {
  const numRows = 10;
  const bricksPerRow = 6;
  const brickW = 800 / bricksPerRow;
  const brickH = 60;
  const mortar = 6;
  const totalH = numRows * (brickH + mortar) + mortar;

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-[#888] flex items-center justify-center",
        className,
      )}
    >
      <div className="relative w-[90%] max-w-[540px]" style={{ aspectRatio: `800/${totalH}` }}>
        <svg
          viewBox={`0 0 800 ${totalH}`}
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grey background (mortar) */}
          <rect width="800" height={totalH} fill="#888" />

          {Array.from({ length: numRows }, (_, row) => {
            const isOdd = row % 2 === 1;
            const offsetX = isOdd ? brickW / 2 : 0;
            const y = mortar + row * (brickH + mortar);

            return Array.from({ length: bricksPerRow + 1 }, (__, col) => {
              const x = offsetX + col * brickW - brickW;
              const isBlack = (col + row) % 2 === 0;
              // clip bricks to canvas
              const clipX = Math.max(0, x);
              const clipW = Math.min(x + brickW, 800) - clipX;
              if (clipW <= 0) return null;
              return (
                <rect
                  key={`r${row}c${col}`}
                  x={clipX}
                  y={y}
                  width={clipW}
                  height={brickH}
                  fill={isBlack ? "#000" : "#fff"}
                />
              );
            });
          })}
        </svg>
      </div>
    </div>
  );
}
