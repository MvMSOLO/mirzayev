import { useEffect, useRef } from "react";
import { useUniverse } from "@/lib/universe";

export function UniverseTransition() {
  const { phase, mode } = useUniverse();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (phase !== "flash") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const dots = Array.from({ length: 40 }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      r: Math.random() * 1.4 + 0.3,
      vy: 0.1 + Math.random() * 0.3,
    }));
    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      for (const d of dots) {
        d.y += d.vy;
        if (d.y > rect.height) d.y = 0;
        ctx.beginPath();
        ctx.fillStyle = "rgba(17,17,17,0.35)";
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  if (phase === "idle") return null;

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none" aria-hidden>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="liquify">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="4">
              <animate
                attributeName="baseFrequency"
                from="0.005"
                to="0.04"
                dur="1s"
                fill="freeze"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="0">
              <animate attributeName="scale" from="0" to="120" dur="1s" fill="freeze" />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      {/* Phase 1: Deconstruct — dark screen with radial shatter */}
      {phase === "deconstruct" && (
        <div
          className="absolute inset-0 overflow-hidden animate-uni-deconstruct"
          style={{ background: mode === "kinetic" ? "#0D0C10" : "#F9F6F0" }}
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="absolute font-display uppercase text-[10vw] leading-none animate-uni-shatter"
              style={{
                color: mode === "kinetic" ? "#FF4500" : "#111",
                left: `${(i % 6) * 18 + Math.random() * 6}%`,
                top: `${Math.floor(i / 6) * 25 + Math.random() * 10}%`,
                animationDelay: `${i * 20}ms`,
                transform: `rotate(${(Math.random() - 0.5) * 40}deg)`,
              }}
            >
              {"AVAZBEK MIRZAYEV"[i % 16]}
            </span>
          ))}
        </div>
      )}

      {/* Phase 2: Liquid — SVG displacement melt */}
      {phase === "liquid" && (
        <div
          className="absolute inset-0 animate-uni-liquid"
          style={{
            background: mode === "kinetic" ? "#0D0C10" : "#F9F6F0",
            filter: "url(#liquify)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-display uppercase text-[18vw] tracking-tighter"
              style={{ color: mode === "kinetic" ? "#FF4500" : "#C7D9C1" }}
            >
              MELT
            </span>
          </div>
        </div>
      )}

      {/* Phase 3: White flash + reconstructing text */}
      {phase === "flash" && (
        <div
          className="absolute inset-0 flex items-center justify-center animate-uni-flash"
          style={{ background: "#F9F6F0" }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          <div className="relative z-10 text-center">
            <div className="text-[10px] uppercase tracking-[0.4em] text-black/60 mb-3 font-mono">
              40.8447° N · 69.5986° E
            </div>
            <div
              className="italic text-2xl md:text-4xl text-black animate-uni-typewriter"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              reconstructing universe
            </div>
          </div>
        </div>
      )}

      {/* Phase 4: Rebuild — final layer fades out */}
      {phase === "rebuild" && (
        <div
          className="absolute inset-0 animate-uni-rebuild"
          style={{ background: mode === "creative" ? "#F9F6F0" : "#0D0C10" }}
        />
      )}
    </div>
  );
}
