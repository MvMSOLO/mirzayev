import { cn } from "@/lib/utils";

/**
 * Ponzo illusion — two strongly converging lines (like railway tracks) with
 * two horizontal bars of EXACTLY equal length placed across them. The upper
 * bar (nearer the vanishing point) appears longer due to linear perspective
 * depth cues. Pure static SVG.
 */
export function PonzoIllusion({ className }: { className?: string }) {
  // Vanishing point at top center
  const vpX = 400;
  const vpY = 80;

  // Track rails spread wide at bottom
  const railBottomLeftX = 80;
  const railBottomRightX = 720;
  const railBottomY = 760;

  // Two comparison bars — identical pixel width
  const barWidth = 180;
  const barThickness = 8;

  // Upper bar position (near vanishing point — tracks are close together here)
  const upperBarY = 270;
  // Lower bar position (tracks far apart)
  const lowerBarY = 580;

  // Helper: x position of left rail at given y
  const railX = (y: number, side: "left" | "right") => {
    const t = (y - vpY) / (railBottomY - vpY);
    if (side === "left") return vpX + t * (railBottomLeftX - vpX);
    return vpX + t * (railBottomRightX - vpX);
  };

  const upperCenterX = (railX(upperBarY, "left") + railX(upperBarY, "right")) / 2;
  const lowerCenterX = (railX(lowerBarY, "left") + railX(lowerBarY, "right")) / 2;

  // Cross-tie lines for railway atmosphere
  const numTies = 12;

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-[#f5f0e8] flex items-center justify-center",
        className,
      )}
    >
      <div className="relative w-[88%] max-w-[500px]" style={{ aspectRatio: "800/820" }}>
        <svg
          viewBox="0 0 800 820"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <rect width="800" height="820" fill="#f5f0e8" />

          {/* Railway cross-ties */}
          {Array.from({ length: numTies }, (_, i) => {
            const t = i / (numTies - 1);
            const y = vpY + t * (railBottomY - vpY);
            const lx = railX(y, "left");
            const rx = railX(y, "right");
            return (
              <line
                key={`tie${i}`}
                x1={lx}
                y1={y}
                x2={rx}
                y2={y}
                stroke="#b5a899"
                strokeWidth={3 + t * 7}
              />
            );
          })}

          {/* Left rail */}
          <line
            x1={vpX}
            y1={vpY}
            x2={railBottomLeftX}
            y2={railBottomY}
            stroke="#5a4a3a"
            strokeWidth="5"
          />

          {/* Right rail */}
          <line
            x1={vpX}
            y1={vpY}
            x2={railBottomRightX}
            y2={railBottomY}
            stroke="#5a4a3a"
            strokeWidth="5"
          />

          {/* Upper comparison bar (appears longer) */}
          <rect
            x={upperCenterX - barWidth / 2}
            y={upperBarY - barThickness / 2}
            width={barWidth}
            height={barThickness}
            fill="#c0392b"
            rx="2"
          />

          {/* Lower comparison bar (appears shorter — same pixel width!) */}
          <rect
            x={lowerCenterX - barWidth / 2}
            y={lowerBarY - barThickness / 2}
            width={barWidth}
            height={barThickness}
            fill="#c0392b"
            rx="2"
          />
        </svg>
      </div>
    </div>
  );
}
