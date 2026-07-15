import { cn } from "@/lib/utils";

/**
 * Penrose Triangle (impossible tribar) — classic flat 2D SVG line-art
 * rendering of the impossible triangle, three trapezoidal beams shaded
 * light/mid/dark per face to sell the 3D bevel look.
 */
export function PenroseTriangleIllusion({ className }: { className?: string }) {
  // Classic Penrose triangle built from three beams meeting at impossible corners.
  // Coordinates derived from the standard isometric construction.
  // The triangle is oriented with one vertex at the top.

  const s = 200; // scale: half-side

  // Three outer vertices of the big equilateral triangle (top, bottom-right, bottom-left)
  const vTop = { x: 250, y: 60 };
  const vBR = { x: 420, y: 354 };
  const vBL = { x: 80, y: 354 };

  // Beam thickness in the inward direction (perpendicular, scaled)
  const t = 52;

  // Helper: interpolate
  const lerp = (a: { x: number; y: number }, b: { x: number; y: number }, r: number) => ({
    x: a.x + (b.x - a.x) * r,
    y: a.y + (b.y - a.y) * r,
  });

  // Inward normal for each outer edge
  // Edge top->BR: inward offset points left/BL direction
  const norm = (ax: number, ay: number, bx: number, by: number, len: number) => {
    const ex = bx - ax;
    const ey = by - ay;
    const mag = Math.sqrt(ex * ex + ey * ey);
    // 90° inward (clockwise for top->BR = inward to triangle)
    return { nx: (ey / mag) * len, ny: (-ex / mag) * len };
  };

  // Top beam: along edge top -> BR
  const n1 = norm(vTop.x, vTop.y, vBR.x, vBR.y, t);
  // Inner vertices for beam 1 (top→BR)
  const t1_TL = vTop;
  const t1_TR = lerp(vTop, vBR, 0.42);
  const t1_IR = { x: t1_TR.x + n1.nx, y: t1_TR.y + n1.ny };
  const t1_IL = { x: vTop.x + n1.nx, y: vTop.y + n1.ny };

  // BR beam: along edge BR -> BL
  const n2 = norm(vBR.x, vBR.y, vBL.x, vBL.y, t);
  const t2_TL = vBR;
  const t2_TR = lerp(vBR, vBL, 0.42);
  const t2_IR = { x: t2_TR.x + n2.nx, y: t2_TR.y + n2.ny };
  const t2_IL = { x: vBR.x + n2.nx, y: vBR.y + n2.ny };

  // BL beam: along edge BL -> top
  const n3 = norm(vBL.x, vBL.y, vTop.x, vTop.y, t);
  const t3_TL = vBL;
  const t3_TR = lerp(vBL, vTop, 0.42);
  const t3_IR = { x: t3_TR.x + n3.nx, y: t3_TR.y + n3.ny };
  const t3_IL = { x: vBL.x + n3.nx, y: vBL.y + n3.ny };

  const pt = (p: { x: number; y: number }) => `${p.x},${p.y}`;
  const poly = (...pts: Array<{ x: number; y: number }>) => pts.map(pt).join(" ");

  // Three shades for three faces: light top, mid right, dark left (isometric lighting)
  const cLight = "#e8e8e8";
  const cMid = "#b0b0b0";
  const cDark = "#686868";
  const cStroke = "#222";

  // Each "beam" is a parallelogram; at corners we add the impossible overlap.
  // We draw three full beams with correct z-order to create the impossible loop.

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-[#0d0c10] flex items-center justify-center",
        className,
      )}
    >
      <svg
        viewBox="30 40 440 340"
        className="penrosetriangle-root w-[82%] max-w-[480px]"
        style={{ display: "block" }}
      >
        {/* ── Beam 1: top-right edge (light face) ── */}
        <polygon
          points={poly(t1_TL, t1_TR, t1_IR, t1_IL)}
          fill={cLight}
          stroke={cStroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* ── Beam 2: bottom edge (mid face) ── */}
        <polygon
          points={poly(t2_TL, t2_TR, t2_IR, t2_IL)}
          fill={cMid}
          stroke={cStroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* ── Beam 3: left edge (dark face) ── */}
        <polygon
          points={poly(t3_TL, t3_TR, t3_IR, t3_IL)}
          fill={cDark}
          stroke={cStroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* ── Corner joints — the impossible overlaps ── */}
        {/* Corner at vTop: beam3 end overlaps beam1 start */}
        <polygon
          points={poly(
            vTop,
            { x: vTop.x + n1.nx, y: vTop.y + n1.ny },
            { x: vTop.x + n3.nx, y: vTop.y + n3.ny },
          )}
          fill={cMid}
          stroke={cStroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Corner at vBR: beam1 end overlaps beam2 start */}
        <polygon
          points={poly(
            vBR,
            { x: vBR.x + n2.nx, y: vBR.y + n2.ny },
            { x: vBR.x + n1.nx, y: vBR.y + n1.ny },
          )}
          fill={cDark}
          stroke={cStroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Corner at vBL: beam2 end overlaps beam3 start */}
        <polygon
          points={poly(
            vBL,
            { x: vBL.x + n3.nx, y: vBL.y + n3.ny },
            { x: vBL.x + n2.nx, y: vBL.y + n2.ny },
          )}
          fill={cLight}
          stroke={cStroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Re-draw outer edges cleanly */}
        <polyline
          points={poly(vTop, vBR, vBL)}
          fill="none"
          stroke={cStroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <style>{`
        .penrosetriangle-root { aspect-ratio: 440 / 340; }
      `}</style>
    </div>
  );
}
