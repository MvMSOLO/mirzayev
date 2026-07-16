import { useRef, useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { useSound } from "@/hooks/useSound";
import { RevealBox, WordReveal, BlurReveal } from "./TextReveal";

interface TimelineYear {
  age: number;
  year: string;
  tech: string;
  title: { uz: string; en: string };
  desc: { uz: string; en: string };
}

const EXPO = [0.16, 1, 0.3, 1] as const;

const timeline: TimelineYear[] = [
  {
    age: 11,
    year: "2021",
    tech: "Python",
    title: { uz: "Birinchi qatorlar", en: "First lines of code" },
    desc: {
      uz: "Python tilini o'rgandi va birinchi Telegram botlarini ishga tushirdi.",
      en: "Learned Python and shipped the first Telegram bots.",
    },
  },
  {
    age: 12,
    year: "2022",
    tech: "HTML · CSS · JS",
    title: { uz: "Veb olamiga qadam", en: "Stepping into the web" },
    desc: {
      uz: "HTML/CSS/JS bilan veb-texnologiyalarni o'zlashtirdi va dastlabki dizayn instinktini shakllantirdi.",
      en: "Picked up HTML/CSS/JS and started developing an early instinct for design.",
    },
  },
  {
    age: 13,
    year: "2023",
    tech: "React",
    title: { uz: "MvMSOLO tug'ildi", en: "MvMSOLO is born" },
    desc: {
      uz: "React freymvorkini o'zlashtirdi, MvMSOLO YouTube kanalini ochdi va IT ta'lim berishni boshladi.",
      en: "Mastered React, launched the MvMSOLO YouTube channel, and started teaching IT.",
    },
  },
  {
    age: 14,
    year: "2024",
    tech: "AI · LLMs",
    title: { uz: "Sun'iy intellekt davri", en: "The AI era" },
    desc: {
      uz: "AI va LLM integratsiyalarini o'rgandi va birinchi murakkab full-stack loyihalarini qurdi.",
      en: "Dove into AI & LLM integrations, shipping the first complex full-stack projects.",
    },
  },
  {
    age: 15,
    year: "2025",
    tech: "TanStack · WebGL",
    title: { uz: "Harakat va hajm", en: "Motion & depth" },
    desc: {
      uz: "TanStack Start/Router, yuqori darajali animatsiyalar va 3D WebGL bilan professional hamkorlik loyihalarida ishladi.",
      en: "Worked with TanStack Start/Router, advanced animation, 3D WebGL, and professional collaborations.",
    },
  },
  {
    age: 16,
    year: "2026",
    tech: "Dual-Mode",
    title: { uz: "Kinetik / Olam", en: "Kinetic / Universe" },
    desc: {
      uz: "Premium Dual-Mode tizimini to'liq yaratdi — dunyo miqyosidagi raqamli tajribalar.",
      en: "Built the full Premium Dual-Mode system — world-class digital experiences.",
    },
  },
];

export function NeuralTimeline() {
  const { lang, t } = useLang();
  const { playHover, playClick } = useSound();
  const [active, setActive] = useState(timeline.length - 1);
  const nodeRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (i: number, { sound = true }: { sound?: boolean } = {}) => {
    setActive(i);
    if (sound) playClick();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(i + 1, timeline.length - 1);
      select(next);
      nodeRefs.current[next]?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = Math.max(i - 1, 0);
      select(prev);
      nodeRefs.current[prev]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      select(0);
      nodeRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      const last = timeline.length - 1;
      select(last);
      nodeRefs.current[last]?.focus();
    }
  };

  const activeYear = timeline[active];
  const pct = ((active + 0.5) / timeline.length) * 100;

  return (
    <section
      id="neural-timeline"
      aria-labelledby="neural-timeline-heading"
      className="px-5 md:px-20 lg:px-32 py-24 md:py-32 border-t border-white/[0.06] relative overflow-hidden bg-atmosphere-dual"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 bg-[var(--cyan)]/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="absolute top-10 right-10 font-mono text-[10px] text-[var(--cyan)]/40 font-bold hidden lg:block border border-[var(--cyan)]/20 px-4 py-2 glass-card rounded-md shadow-glow-cyan">
        SYS_LOG // NEURAL_TIMELINE.DB // AGE_11-16
      </div>

      <RevealBox className="mb-16 flex gap-4 items-center">
        <div className="h-1 w-12 bg-gradient-to-r from-[var(--cyan)] to-transparent rounded-full" />
        <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--cyan)] font-bold drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]">{t("nt.tag")}</span>
      </RevealBox>

      <div className="mb-24">
        <h2
          id="neural-timeline-heading"
          className="font-display text-6xl md:text-8xl uppercase leading-[0.85] tracking-tighter text-white"
        >
          <WordReveal text={t("nt.title_a")} sound />
          <br />
          <span className="text-accent drop-shadow-[0_0_20px_rgba(255,69,0,0.4)]">
            <WordReveal text={t("nt.title_b")} delay={0.2} />
          </span>
        </h2>
        <BlurReveal delay={0.4} className="mt-8">
          <p className="text-base md:text-lg text-white/70 max-w-[50ch] leading-[1.8] font-sans font-light">{t("nt.sub")}</p>
        </BlurReveal>
      </div>

      <RevealBox delay={0.2}>
        <div className="overflow-x-auto pb-6 -mx-2 px-2">
          <div
            role="tablist"
            aria-label={t("nt.tag")}
            aria-orientation="horizontal"
            className="relative grid gap-2 min-w-[700px] md:min-w-0"
            style={{ gridTemplateColumns: `repeat(${timeline.length}, 1fr)` }}
          >
            {/* base rail */}
            <div
              className="absolute left-0 right-0 top-8 md:top-10 h-[2px] bg-white/10 rounded-full"
              aria-hidden="true"
            />
            {/* traveled signal */}
            <motion.div
              className="absolute left-0 top-8 md:top-10 h-[2px] bg-gradient-to-r from-accent to-[var(--cyan)] rounded-full shadow-[0_0_15px_var(--cyan)]"
              initial={false}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: EXPO }}
              aria-hidden="true"
            />
            {/* traveling pulse */}
            <motion.div
              className="absolute top-8 md:top-10 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--cyan)] shadow-[0_0_20px_rgba(0,212,255,0.8)] border-2 border-[#0a090c]"
              initial={false}
              animate={{ left: `${pct}%` }}
              transition={{ duration: 0.6, ease: EXPO }}
              aria-hidden="true"
            />

            {timeline.map((item, i) => {
              const isActive = i === active;
              const isLast = i === timeline.length - 1;
              return (
                <button
                  key={item.age}
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`nt-tab-${item.age}`}
                  aria-selected={isActive}
                  aria-controls={`nt-panel-${item.age}`}
                  tabIndex={isActive ? 0 : -1}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onMouseEnter={() => playHover()}
                  onClick={() => select(i)}
                  className="group relative z-10 flex flex-col items-center gap-4 pt-10 outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-[var(--cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a090c]"
                >
                  {isLast && (
                    <span className="absolute top-0 text-[10px] uppercase tracking-widest text-accent font-mono font-bold drop-shadow-[0_0_5px_rgba(255,69,0,0.6)] bg-accent/10 px-2 py-1 border border-accent/20 rounded">
                      {t("nt.now")}
                    </span>
                  )}
                  <span
                    className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border-2 font-mono text-[14px] md:text-base font-bold transition-all duration-400 shadow-md ${
                      isActive
                        ? "bg-[var(--cyan)] border-[var(--cyan)] text-[#0a090c] scale-110 shadow-[0_0_20px_rgba(0,212,255,0.5)]"
                        : "bg-[#0a090c] border-white/20 text-white/50 group-hover:border-[var(--cyan)]/60 group-hover:text-[var(--cyan)] group-hover:shadow-[0_0_15px_rgba(0,212,255,0.2)]"
                    }`}
                  >
                    {item.age}
                  </span>
                  <span
                    className={`text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em] font-bold transition-colors duration-400 ${
                      isActive ? "text-[var(--cyan)] drop-shadow-[0_0_5px_rgba(0,212,255,0.4)]" : "text-white/40"
                    }`}
                  >
                    {item.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-8 text-[11px] uppercase tracking-[0.25em] text-white/30 font-mono hidden md:block text-center font-bold">
          {t("nt.hint")}
        </p>

        <div className="mt-14 relative min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeYear.age}
              id={`nt-panel-${activeYear.age}`}
              role="tabpanel"
              aria-labelledby={`nt-tab-${activeYear.age}`}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: EXPO }}
              className="glass-card border-gradient-cyan p-8 md:p-10 relative overflow-hidden rounded-2xl shadow-glow-cyan"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyan)]/[0.05] to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <span className="font-mono text-[var(--cyan)] text-lg font-bold drop-shadow-[0_0_5px_rgba(0,212,255,0.4)]">
                      {activeYear.age} {t("nt.age")}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 font-mono text-white/60 bg-black/40 rounded-md font-bold">
                      {activeYear.year}
                    </span>
                  </div>
                  <h3 className="font-display text-4xl md:text-5xl uppercase tracking-tight mb-4 text-white drop-shadow-md">
                    {activeYear.title[lang]}
                  </h3>
                  <p className="text-base md:text-lg text-white/75 max-w-[60ch] leading-[1.8] font-sans font-light">
                    {activeYear.desc[lang]}
                  </p>
                </div>
                <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-accent font-bold glass-dark border border-accent/40 px-5 py-2.5 whitespace-nowrap rounded-md shadow-[0_0_15px_rgba(255,69,0,0.2)] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                  {activeYear.tech}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </RevealBox>
    </section>
  );
}