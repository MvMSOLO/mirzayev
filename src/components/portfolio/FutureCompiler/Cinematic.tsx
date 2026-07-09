import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLang } from "@/lib/i18n";

export function Cinematic({ onDone, onSkip }: { onDone: () => void; onSkip: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const { lang } = useLang();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduced ? 1200 : 22000;
    const marks = [0, 500, 2500, 5500, 7500, 9500, 12500, 15500, 17500, 19500, 20500, 21500];
    const timers = marks.map((m, i) =>
      window.setTimeout(() => setStep(i), reduced ? (m / total) * 1200 : m),
    );
    const done = window.setTimeout(onDone, total);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onSkip();
    };
    window.addEventListener("keydown", onKey);

    // Camera shake
    if (!reduced && rootRef.current) {
      gsap.to(rootRef.current, {
        x: () => gsap.utils.random(-2, 2),
        y: () => gsap.utils.random(-2, 2),
        duration: 0.08,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });
    }
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
      window.removeEventListener("keydown", onKey);
      gsap.killTweensOf(rootRef.current);
    };
  }, [onDone, onSkip]);

  const cmd = "future realistic";
  const cmdShown = step >= 4 ? cmd.slice(0, Math.min(cmd.length, (step - 3) * 5)) : "";

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[95] bg-black text-accent font-mono overflow-hidden"
      style={{ filter: "contrast(1.1)" }}
    >
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* Chromatic aberration */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen opacity-20"
        style={{ boxShadow: "inset 0 0 200px rgba(255,69,0,0.4)" }}
      />

      {/* Crosshair */}
      {step >= 1 && (
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 transition-all duration-1000"
          style={{
            opacity: step >= 3 ? 0.2 : 1,
            transform: step >= 3 ? "translate(-50%, calc(-50% + 100px)) scale(0.5)" : undefined,
          }}
          viewBox="0 0 100 100"
          fill="none"
          stroke="#FF4500"
          strokeWidth="0.5"
        >
          <circle cx="50" cy="50" r="30" strokeDasharray="4 4" className="animate-spin" style={{ animationDuration: "8s" }} />
          <circle cx="50" cy="50" r="15" />
          <line x1="0" y1="50" x2="35" y2="50" />
          <line x1="65" y1="50" x2="100" y2="50" />
          <line x1="50" y1="0" x2="50" y2="35" />
          <line x1="50" y1="65" x2="50" y2="100" />
        </svg>
      )}

      {/* Radar sweep */}
      {step >= 2 && step < 4 && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-accent/30 overflow-hidden">
          <div
            className="absolute inset-0 origin-center"
            style={{
              background: "conic-gradient(from 0deg, transparent 0%, #FF4500 15%, transparent 30%, transparent 100%)",
              animation: "spin 3s linear infinite",
            }}
          />
        </div>
      )}

      {/* Status text */}
      <div className="absolute top-8 left-8 text-[10px] uppercase tracking-widest space-y-2 text-accent/80">
        <div>◉ FUTURE COMPILER v2.35</div>
        {step >= 2 && <div className="animate-uni-typewriter overflow-hidden whitespace-nowrap">SCANNING ENVIRONMENT…</div>}
        {step >= 6 && <div className="animate-uni-typewriter">HTML STREAM · ONLINE</div>}
        {step >= 7 && <div className="animate-uni-typewriter">CSS ARCHITECTURE · MAPPED</div>}
        {step >= 8 && <div className="animate-uni-typewriter">JS LOGIC · WOVEN</div>}
        {step >= 9 && <div className="animate-uni-typewriter">COMPONENTS · MATERIALIZED</div>}
        {step >= 10 && <div className="animate-uni-typewriter text-white">PREVIEW ENGINE · ACTIVE</div>}
      </div>

      {/* Command line */}
      {step >= 3 && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-4 flex items-center gap-3 text-2xl md:text-4xl font-display">
          <span className="text-accent">›</span>
          <span className="tracking-tight">{cmdShown}</span>
          <span className="w-3 h-8 bg-accent animate-pulse" />
        </div>
      )}

      {/* HTML tag stream */}
      {step >= 6 && step < 8 && (
        <div className="absolute inset-0 pointer-events-none opacity-60 overflow-hidden">
          {Array.from({ length: 8 }).map((_, col) => (
            <div
              key={col}
              className="absolute top-0 flex flex-col text-[10px] leading-tight"
              style={{
                left: `${(col + 1) * 11}%`,
                animation: `scan-y ${2 + col * 0.3}s linear infinite`,
              }}
            >
              {["<div>", "<span>", "<h1>", "<p>", "<section>", "</div>", "<a>", "<img/>", "<nav>", "</section>", "<main>", "<footer>"].map((tag, i) => (
                <span key={i} className="text-accent/70">{tag}</span>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* CSS map / JS network */}
      {step >= 7 && step < 10 && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" viewBox="0 0 1000 600" fill="none" stroke="#FF4500" strokeWidth="0.5">
          {Array.from({ length: 20 }).map((_, i) => {
            const x1 = (i * 71) % 1000;
            const y1 = (i * 137) % 600;
            const x2 = ((i + 3) * 53) % 1000;
            const y2 = ((i + 5) * 191) % 600;
            return (
              <g key={i}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray="4 4" />
                <circle cx={x1} cy={y1} r="2" fill="#FF4500" />
              </g>
            );
          })}
        </svg>
      )}

      {/* Wireframes forming */}
      {step >= 9 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="grid grid-cols-4 gap-2 w-[70%] max-w-3xl">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="border border-accent/40 bg-accent/10 animate-uni-deconstruct"
                style={{ height: 60 + (i % 4) * 20, animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Final flash */}
      {step >= 11 && <div className="absolute inset-0 bg-white animate-uni-flash pointer-events-none" />}

      {/* Skip */}
      <button
        onClick={onSkip}
        className="absolute bottom-8 right-8 text-[10px] uppercase tracking-widest border border-accent/40 px-4 py-2 hover:bg-accent hover:text-background transition-colors font-mono"
      >
        [ESC] {lang === "uz" ? "O'tkazib yuborish" : "Skip experience"}
      </button>
    </div>
  );
}
