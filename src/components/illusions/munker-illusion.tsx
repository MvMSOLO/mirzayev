import { cn } from "@/lib/utils";

/**
 * Munker (color assimilation) illusion — two groups of circles, ALL filled
 * with the identical orange hue (#ff8c00). Left group has yellow stripes
 * overlaid; right group has purple/violet stripes overlaid. The left circles
 * appear more yellow-orange and the right circles appear more red/purple,
 * even though every circle fill is bit-identical.
 */
export function MunkerIllusion({ className }: { className?: string }) {
  const circleColor = "#ff8c00";
  const yellowStripe = "#ffe000";
  const purpleStripe = "#8b00cc";

  // Two groups of 3 rows × 3 cols circles separated by a gap
  const groupCols = 3;
  const groupRows = 3;
  const cx0 = 140; // center x of first group top-left circle
  const cx1 = 530; // center x of second group top-left circle
  const cy0 = 180;
  const spacingX = 120;
  const spacingY = 120;
  const r = 44;
  const stripeW = 10;
  const stripeGap = 20;

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-[#1a1a1a] flex items-center justify-center",
        className,
      )}
    >
      <div className="relative w-[92%] max-w-[540px]" style={{ aspectRatio: "760/580" }}>
        <svg viewBox="0 0 760 580" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            {/* Yellow horizontal stripes pattern */}
            <pattern
              id="munker-yellow-stripes"
              x="0"
              y="0"
              width={stripeGap}
              height={stripeGap}
              patternUnits="userSpaceOnUse"
            >
              <rect width={stripeGap} height={stripeGap} fill="transparent" />
              <rect y="0" width={stripeGap} height={stripeW} fill={yellowStripe} opacity="0.85" />
            </pattern>
            {/* Purple horizontal stripes pattern */}
            <pattern
              id="munker-purple-stripes"
              x="0"
              y="0"
              width={stripeGap}
              height={stripeGap}
              patternUnits="userSpaceOnUse"
            >
              <rect width={stripeGap} height={stripeGap} fill="transparent" />
              <rect y="0" width={stripeGap} height={stripeW} fill={purpleStripe} opacity="0.85" />
            </pattern>
          </defs>

          <rect width="760" height="580" fill="#1a1a1a" />

          {/* Left group — yellow stripes */}
          {Array.from({ length: groupRows }, (_, row) =>
            Array.from({ length: groupCols }, (__, col) => {
              const cx = cx0 + col * spacingX;
              const cy = cy0 + row * spacingY;
              return (
                <g key={`ly${row}-${col}`}>
                  <circle cx={cx} cy={cy} r={r} fill={circleColor} />
                  <circle cx={cx} cy={cy} r={r} fill="url(#munker-yellow-stripes)" />
                </g>
              );
            }),
          )}

          {/* Right group — purple stripes */}
          {Array.from({ length: groupRows }, (_, row) =>
            Array.from({ length: groupCols }, (__, col) => {
              const cx = cx1 + col * spacingX;
              const cy = cy0 + row * spacingY;
              return (
                <g key={`rp${row}-${col}`}>
                  <circle cx={cx} cy={cy} r={r} fill={circleColor} />
                  <circle cx={cx} cy={cy} r={r} fill="url(#munker-purple-stripes)" />
                </g>
              );
            }),
          )}

          {/* Divider line */}
          <line
            x1="380"
            y1="80"
            x2="380"
            y2="500"
            stroke="#444"
            strokeWidth="1"
            strokeDasharray="6 4"
          />
        </svg>
      </div>
    </div>
  );
}
