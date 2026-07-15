import { cn } from "@/lib/utils";

/**
 * Troxler Fading — stare at the center dot; the blurry coloured blobs
 * in the periphery slowly fade from conscious awareness.
 */
export function TroxlerFadeIllusion({ className }: { className?: string }) {
  const blobs = [
    "rgba(180,100,210,0.55)",
    "rgba(210,100,160,0.55)",
    "rgba(130,100,220,0.55)",
    "rgba(210,130,180,0.55)",
    "rgba(160,80,200,0.55)",
    "rgba(220,100,140,0.55)",
    "rgba(140,100,230,0.55)",
    "rgba(200,120,170,0.55)",
  ];
  const count = blobs.length;

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-white flex items-center justify-center",
        className,
      )}
    >
      <div className="troxler-orbit-wrap absolute inset-0 flex items-center justify-center">
        <div className="troxler-orbit" style={{ width: "68%", aspectRatio: "1/1" }}>
          {blobs.map((color, i) => (
            <div
              key={i}
              className="troxler-blob"
              style={
                {
                  "--trox-angle": `${(i / count) * 360}deg`,
                  background: color,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>
      <div className="troxler-fixdot" />
      <style>{`
        .troxler-orbit {
          position: relative;
          animation: troxler-rotate 28s linear infinite;
        }
        @keyframes troxler-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .troxler-blob {
          position: absolute;
          width: 22%;
          aspect-ratio: 1/1;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          filter: blur(9px);
          transform: rotate(var(--trox-angle)) translateX(90%) translateY(-50%);
        }
        .troxler-fixdot {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ff4500;
          box-shadow: 0 0 0 2px #fff, 0 0 0 3.5px #ff4500;
          z-index: 10;
        }
      `}</style>
    </div>
  );
}
