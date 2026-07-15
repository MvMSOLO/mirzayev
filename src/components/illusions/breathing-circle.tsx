import { cn } from "@/lib/utils";

export function BreathingCircleIllusion({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-white flex items-center justify-center",
        className,
      )}
    >
      <div style={{ position: "relative", width: "min(88%, 420px)", aspectRatio: "1" }}>
        {/* Sunburst rays — these pulse, creating the illusion the center circle breathes */}
        <div className="breathingcircle-burst" aria-hidden="true" />

        {/* Center circle — size NEVER changes, only the surrounding rays pulse */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "26%",
            height: "26%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: "white",
            zIndex: 2,
            border: "2.5px solid #222",
            boxSizing: "border-box",
          }}
        />

        {/* Tiny fixation dot at exact center */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 8,
            height: 8,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: "#ff4500",
            zIndex: 3,
          }}
        />
      </div>

      <style>{`
        .breathingcircle-burst {
          position: absolute;
          inset: 0;
          background: conic-gradient(
            from 0deg,
            #222 0deg 5deg, white 5deg 13deg,
            #222 13deg 18deg, white 18deg 26deg,
            #222 26deg 31deg, white 31deg 39deg,
            #222 39deg 44deg, white 44deg 52deg,
            #222 52deg 57deg, white 57deg 65deg,
            #222 65deg 70deg, white 70deg 78deg,
            #222 78deg 83deg, white 83deg 91deg,
            #222 91deg 96deg, white 96deg 104deg,
            #222 104deg 109deg, white 109deg 117deg,
            #222 117deg 122deg, white 122deg 130deg,
            #222 130deg 135deg, white 135deg 143deg,
            #222 143deg 148deg, white 148deg 156deg,
            #222 156deg 161deg, white 161deg 169deg,
            #222 169deg 174deg, white 174deg 182deg,
            #222 182deg 187deg, white 187deg 195deg,
            #222 195deg 200deg, white 200deg 208deg,
            #222 208deg 213deg, white 213deg 221deg,
            #222 221deg 226deg, white 226deg 234deg,
            #222 234deg 239deg, white 239deg 247deg,
            #222 247deg 252deg, white 252deg 260deg,
            #222 260deg 265deg, white 265deg 273deg,
            #222 273deg 278deg, white 278deg 286deg,
            #222 286deg 291deg, white 291deg 299deg,
            #222 299deg 304deg, white 304deg 312deg,
            #222 312deg 317deg, white 317deg 325deg,
            #222 325deg 330deg, white 330deg 338deg,
            #222 338deg 343deg, white 343deg 351deg,
            #222 351deg 356deg, white 356deg 360deg
          );
          border-radius: 50%;
          animation: breathingcircle-pulse 2.4s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes breathingcircle-pulse {
          0%, 100% { opacity: 0.55; transform: scale(0.82); }
          50%       { opacity: 1;    transform: scale(1.0);  }
        }
      `}</style>
    </div>
  );
}
