import { useState } from "react";
import { cn } from "@/lib/utils";

export function NeckerCubeIllusion({ className }: { className?: string }) {
  const [flipped, setFlipped] = useState(false);

  const transform = flipped ? "rotateY(-28deg) rotateX(22deg)" : "rotateY(28deg) rotateX(-22deg)";

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-[#0d0c10] flex items-center justify-center cursor-pointer",
        className,
      )}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="neckercube-pulse" />
      </div>

      <div
        style={{
          transition: "transform 0.65s cubic-bezier(0.4,0,0.2,1)",
          transform,
          width: "min(62%, 280px)",
          aspectRatio: "1",
        }}
      >
        <svg
          viewBox="0 0 200 200"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Back face */}
          <rect
            x="80"
            y="20"
            width="100"
            height="100"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
          />
          {/* Front face */}
          <rect
            x="20"
            y="80"
            width="100"
            height="100"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
          />
          {/* Connecting edges — all same weight/style = zero depth cue */}
          <line x1="20" y1="80" x2="80" y2="20" stroke="white" strokeWidth="2.5" />
          <line x1="120" y1="80" x2="180" y2="20" stroke="white" strokeWidth="2.5" />
          <line x1="120" y1="180" x2="180" y2="120" stroke="white" strokeWidth="2.5" />
          <line x1="20" y1="180" x2="80" y2="120" stroke="white" strokeWidth="2.5" />
        </svg>
      </div>

      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 8, height: 8, background: "#ff4500", opacity: 0.8 }}
      />

      <style>{`
        .neckercube-pulse {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%);
          animation: neckercube-breathe 2.8s ease-in-out infinite;
        }
        @keyframes neckercube-breathe {
          0%, 100% { opacity: 0.2; transform: scale(0.82); }
          50%       { opacity: 0.9; transform: scale(1.18); }
        }
      `}</style>
    </div>
  );
}
