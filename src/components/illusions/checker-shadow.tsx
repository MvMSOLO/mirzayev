import { cn } from "@/lib/utils";

/**
 * Checker Shadow illusion (Adelson) — flat 8×8 checkerboard with a radial
 * shadow gradient cast over part of it. Square A (light square, in shadow)
 * and square B (dark square, outside shadow) are rendered at the SAME actual
 * RGB value (#787878) even though A looks lighter and B looks darker due to
 * perceptual context. Both are marked with a thin orange outline.
 */
export function CheckerShadowIllusion({ className }: { className?: string }) {
  const cols = 8;
  const rows = 8;
  const sq = 44; // cell size in SVG units
  const W = cols * sq;
  const H = rows * sq;

  // The two "identical" squares — A is at col=2, row=6 (light square in shadow)
  // B is at col=4, row=2 (dark square outside shadow)
  const aCol = 2;
  const aRow = 6;
  const bCol = 4;
  const bRow = 2;

  // Base checkerboard: light = #d4d4d4, dark = #404040
  // We adjust A and B specifically to both land on #787878.
  // The shadow darkens light squares and lightens… actually we just set those
  // two cells explicitly to the target grey and let the gradient shadow create
  // the perceptual context. The shadow makes A appear to be a light square
  // in shadow and B appear to be a dark square in light.
  const TARGET = "#787878";
  const LIGHT = "#d4d4d4";
  const DARK = "#404040";

  function cellColor(col: number, row: number): string {
    if (col === aCol && row === aRow) return TARGET;
    if (col === bCol && row === bRow) return TARGET;
    const isLight = (col + row) % 2 === 0;
    return isLight ? LIGHT : DARK;
  }

  const cells: Array<{ col: number; row: number; color: string }> = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({ col: c, row: r, color: cellColor(c, r) });
    }
  }

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-[#1a1a1a] flex items-center justify-center",
        className,
      )}
    >
      <svg
        viewBox={`-10 -10 ${W + 20} ${H + 20}`}
        className="checkershadow-root w-[88%] max-w-[500px]"
        style={{ display: "block" }}
      >
        <defs>
          {/* Cylinder-like shadow: radial gradient offset to simulate a round occluder */}
          <radialGradient id="cs-shadow" cx="38%" cy="30%" r="52%" fx="38%" fy="28%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#000" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Checkerboard cells */}
        {cells.map(({ col, row, color }) => (
          <rect
            key={`${col}-${row}`}
            x={col * sq}
            y={row * sq}
            width={sq}
            height={sq}
            fill={color}
          />
        ))}

        {/* Shadow overlay */}
        <rect x={0} y={0} width={W} height={H} fill="url(#cs-shadow)" />

        {/* Orange outlines on the two identical-grey target squares */}
        <rect
          x={aCol * sq + 1}
          y={aRow * sq + 1}
          width={sq - 2}
          height={sq - 2}
          fill="none"
          stroke="#ff4500"
          strokeWidth="2"
          opacity="0.85"
        />
        <rect
          x={bCol * sq + 1}
          y={bRow * sq + 1}
          width={sq - 2}
          height={sq - 2}
          fill="none"
          stroke="#ff4500"
          strokeWidth="2"
          opacity="0.85"
        />
      </svg>
      <style>{`
        .checkershadow-root { aspect-ratio: 1 / 1; }
      `}</style>
    </div>
  );
}
