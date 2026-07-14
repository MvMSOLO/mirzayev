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
      className="px-5 md:px-20 lg:px-32 py-16 md:py-24 border-t border-border relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 -translate-y-1/2 bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-8 right-8 font-mono text-[8px] text-white/10 hidden lg:block">
        SYS_LOG // NEURAL_TIMELINE.DB // AGE_11-16
      </div>

      <RevealBox className="mb-10 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">{t("nt.tag")}</span>
      </RevealBox>

      <div className="mb-16">
        <h2
          id="neural-timeline-heading"
          className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter"
        >
          <WordReveal text={t("nt.title_a")} sound />
          <br />
          <span className="text-accent">
            <WordReveal text={t("nt.title_b")} delay={0.2} />
          </span>
        </h2>
        <BlurReveal delay={0.4} className="mt-6">
          <p className="text-sm text-white/50 max-w-[42ch] leading-relaxed">{t("nt.sub")}</p>
        </BlurReveal>
      </div>

      <RevealBox delay={0.15}>
        <div className="overflow-x-auto pb-2 -mx-1 px-1">
          <div
            role="tablist"
            aria-label={t("nt.tag")}
            aria-orientation="horizontal"
            className="relative grid gap-1 min-w-[460px] md:min-w-0"
            style={{ gridTemplateColumns: `repeat(${timeline.length}, 1fr)` }}
          >
            {/* base rail */}
            <div
              className="absolute left-0 right-0 top-4 md:top-5 h-px bg-border"
              aria-hidden="true"
            />
            {/* traveled signal */}
            <motion.div
              className="absolute left-0 top-4 md:top-5 h-px bg-accent"
              initial={false}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.5, ease: EXPO }}
              aria-hidden="true"
            />
            {/* traveling pulse */}
            <motion.div
              className="absolute top-4 md:top-5 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(255,69,0,0.55)]"
              initial={false}
              animate={{ left: `${pct}%` }}
              transition={{ duration: 0.5, ease: EXPO }}
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
                  className="group relative z-10 flex flex-col items-center gap-2.5 pt-6 outline-none rounded-lg focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {isLast && (
                    <span className="absolute top-0 text-[8px] uppercase tracking-widest text-accent font-mono">
                      {t("nt.now")}
                    </span>
                  )}
                  <span
                    className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border font-mono text-[10px] md:text-xs transition-all duration-300 ${
                      isActive
                        ? "bg-accent border-accent text-background scale-110"
                        : "bg-background border-border text-white/40 group-hover:border-accent/60 group-hover:text-accent"
                    }`}
                  >
                    {item.age}
                  </span>
                  <span
                    className={`text-[8px] md:text-[9px] font-mono uppercase tracking-widest transition-colors ${
                      isActive ? "text-accent" : "text-white/30"
                    }`}
                  >
                    {item.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-4 text-[10px] uppercase tracking-widest text-white/20 font-mono hidden md:block">
          {t("nt.hint")}
        </p>

        <div className="mt-10 relative min-h-[176px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeYear.age}
              id={`nt-panel-${activeYear.age}`}
              role="tabpanel"
              aria-labelledby={`nt-tab-${activeYear.age}`}
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: EXPO }}
              className="border border-border bg-background/50 backdrop-blur p-6 md:p-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-accent text-sm font-bold">
                      {activeYear.age} {t("nt.age")}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest border border-border px-2 py-0.5 font-mono text-white/40">
                      {activeYear.year}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight mb-3 text-foreground">
                    {activeYear.title[lang]}
                  </h3>
                  <p className="text-sm text-white/60 max-w-[54ch] leading-relaxed">
                    {activeYear.desc[lang]}
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-mono text-accent/80 border border-accent/30 px-3 py-1.5 whitespace-nowrap">
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
