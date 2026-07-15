import { cn } from "@/lib/utils";

export function BarberpoleIllusionIllusion({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-[#1a1a2e] flex items-center justify-center",
        className,
      )}
    >
      {/* Cylindrical tube: rounded rect with radial gradient shading */}
      <div
        className="barberpole-tube"
        style={{
          width: "28%",
          aspectRatio: "0.38",
          borderRadius: "50%/8%",
          overflow: "hidden",
          position: "relative",
          boxShadow:
            "inset -12px 0 24px rgba(0,0,0,0.7), inset 6px 0 16px rgba(255,255,255,0.15), 4px 0 20px rgba(0,0,0,0.6)",
        }}
      >
        {/* Animated diagonal stripes inside the tube */}
        <div className="barberpole-stripes" />
        {/* Cylindrical highlight overlay — non-interactive */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(255,255,255,0.18) 0%, transparent 35%, transparent 70%, rgba(0,0,0,0.35) 100%)",
            pointerEvents: "none",
            borderRadius: "inherit",
          }}
        />
      </div>

      <style>{`
        .barberpole-stripes {
          position: absolute;
          inset: -10%;
          width: 120%;
          height: 120%;
          background: repeating-linear-gradient(
            -45deg,
            #cc1111 0px,
            #cc1111 18px,
            #ffffff 18px,
            #ffffff 36px,
            #1133cc 36px,
            #1133cc 54px,
            #ffffff 54px,
            #ffffff 72px
          );
          background-size: 102px 102px;
          animation: barberpole-scroll 1.4s linear infinite;
        }
        @keyframes barberpole-scroll {
          from { background-position: 0 0; }
          to   { background-position: 0 -102px; }
        }
      `}</style>
    </div>
  );
}
