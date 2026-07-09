import { useEffect, useState } from "react";
import { Cinematic } from "./Cinematic";
import { Workspace } from "./Workspace";
import { useLang } from "@/lib/i18n";
import { useMagnetic } from "@/hooks/useMagnetic";

const KEY = "future-compiler-played";

export function FutureCompiler() {
  const { lang } = useLang();
  const [phase, setPhase] = useState<"intro" | "cinematic" | "workspace">("intro");
  const magnet = useMagnetic<HTMLButtonElement>(0.4);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "1") setPhase("workspace");
    } catch {}
  }, []);

  const play = () => setPhase("cinematic");
  const finish = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setPhase("workspace");
  };

  return (
    <section className="px-5 md:px-20 lg:px-32 py-24 border-t border-border relative">
      <div className="mb-10 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">
          // FUTURE COMPILER · IDE 2035
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 mb-14">
        <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter">
          {lang === "uz" ? "Kelajak" : "Compile"}
          <br />
          <span className="text-accent">{lang === "uz" ? "kompilyatori" : "the future"}</span>
        </h2>
        <p className="text-sm text-white/60 max-w-[52ch] self-end">
          {lang === "uz"
            ? "Vanilla HTML, CSS va JavaScript. Freymvorklar yo'q. Kutubxonalar yo'q. G'oyangizni yozing va sun'iy intellekt uni haqiqiy koddga aylantiradi."
            : "Vanilla HTML, CSS and JavaScript. No frameworks. No libraries. Describe your idea and watch AI compile it into real code."}
        </p>
      </div>

      {phase === "intro" && (
        <div className="border border-accent/40 bg-gradient-to-br from-black/60 via-secondary/40 to-black/80 py-24 flex flex-col items-center justify-center gap-6 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(180deg, rgba(255,69,0,0.15) 0, rgba(255,69,0,0.15) 1px, transparent 1px, transparent 6px)",
            }}
          />
          <span className="text-[10px] uppercase tracking-[0.4em] text-accent/70 font-mono">
            ◉ ONE-TIME EXPERIENCE · 22s
          </span>
          <button
            ref={magnet}
            onClick={play}
            className="font-display text-4xl md:text-6xl tracking-tighter uppercase border-2 border-accent px-10 py-6 bg-transparent text-accent hover:bg-accent hover:text-background transition-all duration-500 relative"
          >
            ▶ PLAY EXPERIENCE
          </button>
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
            {lang === "uz" ? "har bir brauzerda faqat bir marta" : "plays once per browser"}
          </span>
        </div>
      )}

      {phase === "cinematic" && <Cinematic onDone={finish} onSkip={finish} />}
      {phase === "workspace" && <Workspace />}
    </section>
  );
}
