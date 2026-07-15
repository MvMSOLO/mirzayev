import { cn } from "@/lib/utils";

/**
 * Rotating Snakes — Kitaoka-style peripheral drift illusion.
 * 100% static SVG. The perceptual rotation arises from the repeating
 * 4-tone (black → dark-grey → white → light-grey) luminance sawtooth
 * arranged around each ring, direction alternating per ring.
 */
export function RotatingSnakesIllusion({ className }: { className?: string }) {
  const cx = 50;
  const cy = 50;
  const rings: Array<{ r: number; segs: number; dir: number }> = [
    { r: 7, segs: 10, dir: 1 },
    { r: 14, segs: 20, dir: -1 },
    { r: 21, segs: 30, dir: 1 },
    { r: 28, segs: 40, dir: -1 },
    { r: 35, segs: 50, dir: 1 },
    { r: 42, segs: 60, dir: -1 },
  ];

  // Kitaoka 4-tone luminance sequence: black, dark-grey, white, light-grey
  const tones = ["#111111", "#555555", "#eeeeee", "#aaaaaa"];

  const paths: React.ReactElement[] = [];

  rings.forEach(({ r, segs, dir }, ri) => {
    const thickness = 5.5;
    const innerR = r - thickness / 2;
    const outerR = r + thickness / 2;
    const angleStep = (2 * Math.PI) / segs;

    for (let s = 0; s < segs; s++) {
      const toneIdx = (((dir === 1 ? s : segs - 1 - s) % 4) + 4) % 4;
      const fill = tones[toneIdx];
      const a1 = s * angleStep - Math.PI / 2;
      const a2 = (s + 1) * angleStep - Math.PI / 2;

      const xi1 = cx + innerR * Math.cos(a1);
      const yi1 = cy + innerR * Math.sin(a1);
      const xi2 = cx + innerR * Math.cos(a2);
      const yi2 = cy + innerR * Math.sin(a2);
      const xo1 = cx + outerR * Math.cos(a1);
      const yo1 = cy + outerR * Math.sin(a1);
      const xo2 = cx + outerR * Math.cos(a2);
      const yo2 = cy + outerR * Math.sin(a2);

      const d = `M${xi1} ${yi1} A${innerR} ${innerR} 0 0 1 ${xi2} ${yi2} L${xo2} ${yo2} A${outerR} ${outerR} 0 0 0 ${xo1} ${yo1}Z`;
      paths.push(<path key={`rs-${ri}-${s}`} d={d} fill={fill} />);
    }
  });

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-[#808080] flex items-center justify-center",
        className,
      )}
    >
      <svg
        viewBox="0 0 100 100"
        className="rotsnakes-svg aspect-square w-[90%] max-w-[520px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" fill="#808080" />
        {paths}
        <circle cx={cx} cy={cy} r="1.2" fill="#ff4500" />
      </svg>
      <style>{`
        .rotsnakes-svg { display: block; }
      `}</style>
    </div>
  );
}
