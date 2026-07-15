import { cn } from "@/lib/utils";

/**
 * Chubb / Simultaneous Contrast illusion — two identical mid-grey squares,
 * one on a dark textured field (looks lighter), one on a light textured field
 * (looks darker). The center patches are pixel-identical (#888888).
 */
export function ChubbIllusionIllusion({ className }: { className?: string }) {
  const patchColor = "#888888";

  // We build two panels side by side in a single SVG.
  // Left panel: dark surround (#222) with subtle noise pattern
  // Right panel: light surround (#ccc) with subtle noise pattern
  // Both center patches: same #888

  const panelW = 180;
  const panelH = 220;
  const patchSize = 72;
  const gap = 40;
  const totalW = panelW * 2 + gap;
  const totalH = panelH;

  const leftPatchX = (panelW - patchSize) / 2;
  const patchY = (panelH - patchSize) / 2;
  const rightPatchX = panelW + gap + (panelW - patchSize) / 2;

  // Build a simple hatching pattern for texture (subtle, doesn't compete with patch)
  const makeHatch = (id: string, dark: boolean) => {
    const fg = dark ? "#444" : "#aaa";
    const bg = dark ? "#1a1a1a" : "#e0e0e0";
    return (
      <pattern id={id} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill={bg} />
        <line x1="0" y1="8" x2="8" y2="0" stroke={fg} strokeWidth="1.2" opacity="0.6" />
      </pattern>
    );
  };

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-[#555] flex items-center justify-center",
        className,
      )}
    >
      <svg
        viewBox={`0 0 ${totalW} ${totalH}`}
        className="chubb-root w-[88%] max-w-[500px]"
        style={{ display: "block" }}
      >
        <defs>
          {makeHatch("chubb-dark-hatch", true)}
          {makeHatch("chubb-light-hatch", false)}
        </defs>

        {/* Left panel — dark surround */}
        <rect x={0} y={0} width={panelW} height={panelH} fill="url(#chubb-dark-hatch)" rx="4" />
        {/* Left center patch */}
        <rect x={leftPatchX} y={patchY} width={patchSize} height={patchSize} fill={patchColor} />

        {/* Right panel — light surround */}
        <rect
          x={panelW + gap}
          y={0}
          width={panelW}
          height={panelH}
          fill="url(#chubb-light-hatch)"
          rx="4"
        />
        {/* Right center patch */}
        <rect x={rightPatchX} y={patchY} width={patchSize} height={patchSize} fill={patchColor} />

        {/* Thin orange border on both patches to invite comparison */}
        <rect
          x={leftPatchX}
          y={patchY}
          width={patchSize}
          height={patchSize}
          fill="none"
          stroke="#ff4500"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <rect
          x={rightPatchX}
          y={patchY}
          width={patchSize}
          height={patchSize}
          fill="none"
          stroke="#ff4500"
          strokeWidth="1.5"
          opacity="0.6"
        />
      </svg>
      <style>{`
        .chubb-root { aspect-ratio: ${totalW} / ${totalH}; }
      `}</style>
    </div>
  );
}
