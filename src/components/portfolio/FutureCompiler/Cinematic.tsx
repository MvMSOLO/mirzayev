import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLang } from "@/lib/i18n";
import { useSound } from "@/hooks/useSound";

export function Cinematic({ onDone, onSkip }: { onDone: () => void; onSkip: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();
  const { play } = useSound();
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const [textLogs, setTextLogs] = useState<string[]>([]);
  const [showCrosshair, setShowCrosshair] = useState(false);
  const [showRadar, setShowRadar] = useState(false);
  const [showCmd, setShowCmd] = useState(false);
  const [cmdText, setCmdText] = useState("");
  const [showStream, setShowStream] = useState(false);
  const [showNetwork, setShowNetwork] = useState(false);
  const [showWireframes, setShowWireframes] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onDone,
      });
      tlRef.current = tl;

      if (reduced) {
        tl.to({}, { duration: 1.2 });
        return;
      }

      // 0.0s - Boot
      tl.add(() => {
        setTextLogs((prev) => [...prev, "SYSTEM BOOT... OK", "INITIALIZING NEURAL LINK..."]);
        play("boot");
      }, 0);

      // 0.5s - Crosshair appears
      tl.add(() => {
        setShowCrosshair(true);
        play("scan");
      }, 0.5);

      // 2.5s - Radar sweep
      tl.add(() => {
        setShowRadar(true);
        setTextLogs((prev) => [...prev, "SCANNING ENVIRONMENT..."]);
        play("scan");
      }, 2.5);

      // 5.5s - Command Line appears
      tl.add(() => {
        setShowCmd(true);
        setShowCrosshair(false);
        setShowRadar(false);
      }, 5.5);

      // Type command
      const cmd = "future realistic";
      for (let i = 1; i <= cmd.length; i++) {
        tl.add(
          () => {
            setCmdText(cmd.slice(0, i));
            if (i % 3 === 0) play("type");
          },
          5.5 + i * 0.1,
        );
      }

      // 7.5s - Stream starts
      tl.add(() => {
        setShowStream(true);
        setTextLogs((prev) => [...prev, "HTML STREAM ONLINE", "CSS ARCHITECTURE MAPPED"]);
        play("scan");

        // Glitch effect on container
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            x: () => gsap.utils.random(-10, 10),
            y: () => gsap.utils.random(-10, 10),
            opacity: () => gsap.utils.random(0.5, 1),
            duration: 0.1,
            repeat: 10,
            yoyo: true,
            onComplete: () => gsap.set(containerRef.current, { x: 0, y: 0, opacity: 1 }),
          });
        }
      }, 7.5);

      // 9.5s - Network
      tl.add(() => {
        setShowNetwork(true);
        setTextLogs((prev) => [...prev, "JS LOGIC WOVEN", "COMPONENTS MATERIALIZED"]);
        play("scan");
      }, 9.5);

      // 12.5s - Wireframes
      tl.add(() => {
        setShowWireframes(true);
        setTextLogs((prev) => [...prev, "PREVIEW ENGINE ACTIVE"]);
        play("success");
      }, 12.5);

      // 15.5s - Flash
      tl.add(() => {
        setShowFlash(true);
        play("boot");
      }, 15.5);

      // 16.5s - End
      tl.add(() => {}, 16.5);

      // Continuous camera shake
      if (rootRef.current) {
        gsap.to(rootRef.current, {
          x: () => gsap.utils.random(-2, 2),
          y: () => gsap.utils.random(-2, 2),
          duration: 0.08,
          repeat: -1,
          yoyo: true,
          ease: "none",
        });
      }
    }, rootRef);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onSkip();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      ctx.revert();
      window.removeEventListener("keydown", onKey);
    };
  }, [onDone, onSkip, play]);

  const handleSkip = () => {
    if (tlRef.current) {
      tlRef.current.kill();
    }
    onSkip();
  };

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[95] bg-black text-accent font-mono overflow-hidden"
      style={{ filter: "contrast(1.1)" }}
    >
      <div ref={containerRef} className="w-full h-full relative">
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

        {/* Status text */}
        <div className="absolute top-8 left-8 text-[10px] uppercase tracking-widest space-y-2 text-accent/80 z-10 flex flex-col">
          <div className="mb-4">◉ FUTURE COMPILER v2.35</div>
          {textLogs.map((log, i) => (
            <div
              key={i}
              className="animate-uni-typewriter overflow-hidden whitespace-nowrap text-white/80"
            >
              {log}
            </div>
          ))}
        </div>

        {/* Crosshair */}
        {showCrosshair && (
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 transition-all duration-1000"
            viewBox="0 0 100 100"
            fill="none"
            stroke="#FF4500"
            strokeWidth="0.5"
          >
            <circle
              cx="50"
              cy="50"
              r="30"
              strokeDasharray="4 4"
              className="animate-spin"
              style={{ animationDuration: "8s" }}
            />
            <circle cx="50" cy="50" r="15" />
            <line x1="0" y1="50" x2="35" y2="50" />
            <line x1="65" y1="50" x2="100" y2="50" />
            <line x1="50" y1="0" x2="50" y2="35" />
            <line x1="50" y1="65" x2="50" y2="100" />
          </svg>
        )}

        {/* Radar sweep */}
        {showRadar && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-accent/30 overflow-hidden">
            <div
              className="absolute inset-0 origin-center"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0%, #FF4500 15%, transparent 30%, transparent 100%)",
                animation: "spin 3s linear infinite",
              }}
            />
          </div>
        )}

        {/* Command line */}
        {showCmd && !showStream && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-4 flex items-center gap-3 text-2xl md:text-4xl font-display">
            <span className="text-accent">›</span>
            <span className="tracking-tight text-white">{cmdText}</span>
            <span className="w-3 h-8 bg-accent animate-pulse" />
          </div>
        )}

        {/* HTML tag stream */}
        {showStream && (
          <div className="absolute inset-0 pointer-events-none opacity-60 overflow-hidden">
            {Array.from({ length: 12 }).map((_, col) => (
              <div
                key={col}
                className="absolute top-0 flex flex-col text-[10px] leading-tight"
                style={{
                  left: `${(col + 1) * 8}%`,
                  animation: `scan-y ${1.5 + Math.random() * 2}s linear infinite`,
                  opacity: Math.random() * 0.8 + 0.2,
                }}
              >
                {[
                  "<div>",
                  "<span>",
                  "<h1>",
                  "<p>",
                  "<section>",
                  "</div>",
                  "<a>",
                  "<img/>",
                  "<nav>",
                  "</section>",
                  "<main>",
                  "<footer>",
                  "useEffect",
                  "useState",
                  "function",
                  "return",
                ]
                  .sort(() => Math.random() - 0.5)
                  .slice(0, 10)
                  .map((tag, i) => (
                    <span key={i} className="text-accent/70 my-4">
                      {tag}
                    </span>
                  ))}
              </div>
            ))}
          </div>
        )}

        {/* CSS map / JS network */}
        {showNetwork && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
            viewBox="0 0 1000 600"
            fill="none"
            stroke="#FF4500"
            strokeWidth="0.5"
          >
            {Array.from({ length: 30 }).map((_, i) => {
              const x1 = Math.random() * 1000;
              const y1 = Math.random() * 600;
              const x2 = Math.random() * 1000;
              const y2 = Math.random() * 600;
              return (
                <g key={i}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    strokeDasharray="4 4"
                    className="opacity-30"
                  />
                  <circle
                    cx={x1}
                    cy={y1}
                    r="2"
                    fill="#FF4500"
                    className="animate-pulse"
                    style={{ animationDuration: `${Math.random() * 2 + 1}s` }}
                  />
                  <circle
                    cx={x2}
                    cy={y2}
                    r="2"
                    fill="#FF4500"
                    className="animate-pulse"
                    style={{ animationDuration: `${Math.random() * 2 + 1}s` }}
                  />
                </g>
              );
            })}
          </svg>
        )}

        {/* Wireframes forming */}
        {showWireframes && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="grid grid-cols-4 gap-4 w-[80%] max-w-4xl opacity-80 mix-blend-screen">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="border border-accent/40 bg-accent/5"
                  style={{
                    height: 40 + Math.random() * 100,
                    animation: `uni-deconstruct 0.5s ease-out forwards ${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Final flash */}
        {showFlash && (
          <div
            className="absolute inset-0 bg-white z-50 pointer-events-none opacity-0"
            style={{ animation: "uni-flash 1s ease-out forwards" }}
          />
        )}

        {/* Skip */}
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 text-[10px] uppercase tracking-widest border border-accent/40 px-4 py-2 hover:bg-accent hover:text-background transition-colors font-mono z-50"
        >
          [ESC] {lang === "uz" ? "O'tkazib yuborish" : "Skip experience"}
        </button>
      </div>
    </div>
  );
}
