import neural from "@/assets/work-neural.jpg";
import dashboard from "@/assets/work-dashboard.jpg";
import vortex from "@/assets/work-vortex.jpg";
import youtube from "@/assets/work-youtube.jpg";
import { useLang } from "@/lib/i18n";
import { motion, type Variants } from "framer-motion";
import { RevealBox, WordReveal, BlurReveal } from "./TextReveal";
import { useSound } from "@/hooks/useSound";
import { memo } from "react";

export const Work = memo(function Work() {
  const { t } = useLang();
  const { playHover } = useSound();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.09 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.94, y: 26, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="work"
      className="px-5 md:px-20 lg:px-32 py-20 md:py-32 border-b border-white/[0.06] relative overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-accent/[0.04] blur-[120px] pointer-events-none" />

      {/* Corner label */}
      <div className="absolute top-0 right-0 p-4 font-mono text-[7px] text-white/[0.07] hidden lg:block uppercase tracking-widest">
        SEC_WORK // ARCHIVE.DB
      </div>

      <div className="flex justify-between items-end mb-14">
        <RevealBox>
          <div className="mb-4 flex gap-3 items-center">
            <div className="h-px w-10 bg-accent" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-accent">
              {t("work.tag")}
            </span>
          </div>
          <h2 className="heading-hover font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.88] cursor-default">
            <WordReveal text={t("work.title_a")} sound /> <br />
            <WordReveal text={t("work.title_b")} delay={0.18} />
          </h2>
        </RevealBox>
        <BlurReveal className="font-mono text-[9px] text-white/25 mb-1 hidden md:block">[01 — 05]</BlurReveal>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-8%" }}
        className="grid grid-cols-6 gap-3"
      >
        {/* Hero card */}
        <motion.a
          variants={itemVariants}
          whileHover={{
            y: -16,
            boxShadow: "0 40px 80px -16px rgba(255, 69, 0, 0.3)",
            transition: { duration: 0.32, ease: [0.34, 1.56, 0.64, 1] },
          }}
          href="https://github.com/MvMSOLO"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-6 md:col-span-4 md:row-span-2 group relative border border-white/[0.07] bg-neutral-900/50 aspect-[4/5] md:aspect-auto overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.03)] block"
          onMouseEnter={playHover}
        >
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-accent opacity-0 group-hover:opacity-100 transition-all duration-400 z-20" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-accent opacity-0 group-hover:opacity-100 transition-all duration-400 z-20" />

          {/* Scan line */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 animate-[scan-y_2.2s_linear_infinite] z-10 shadow-[0_0_12px_#ff4500]" />

          <img
            src={neural}
            alt="Neural Flow"
            className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent group-hover:via-background/25 transition-all duration-600" />
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.04] transition-all duration-500" />

          <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[480px]">
            <div className="flex justify-between items-start">
              <span className="font-mono text-[9px] text-accent font-bold px-2.5 py-1.5 bg-accent/10 border border-accent/20 uppercase tracking-widest">
                {t("work.tag.ai")}
              </span>
              <span className="font-mono text-[9px] text-white/30 tabular-nums">2025</span>
            </div>
            <div className="translate-y-5 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <h3 className="font-display text-4xl md:text-5xl uppercase mb-2.5 tracking-tight">
                Neural Flow
              </h3>
              <p className="text-sm text-white/55 group-hover:text-white/85 transition-colors duration-400 max-w-[40ch] leading-relaxed">
                {t("work.neural.sub")}
              </p>
              <div className="flex items-center gap-3 mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-mono text-[9px] text-accent uppercase tracking-widest">
                  View Project ↗
                </span>
              </div>
            </div>
          </div>
        </motion.a>

        {/* YouTube card */}
        <motion.a
          variants={itemVariants}
          whileHover={{
            y: -8,
            boxShadow: "0 20px 50px rgba(255, 69, 0, 0.18)",
            transition: { duration: 0.28, ease: [0.34, 1.56, 0.64, 1] },
          }}
          href="https://www.youtube.com/@mvmsolo"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-6 md:col-span-2 group relative border border-white/[0.06] bg-neutral-900/50 overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.6)] block"
          onMouseEnter={playHover}
        >
          <img
            src={youtube}
            alt="MvMSOLO YouTube"
            className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-65 group-hover:scale-106 transition-all duration-600"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          {/* Top scan */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />

          <div className="relative z-10 p-5 h-full flex flex-col justify-between min-h-[200px]">
            <span className="font-mono text-[9px] text-accent font-bold self-start px-2 py-1 bg-accent/10 border border-accent/20 uppercase tracking-widest">
              {t("work.tag.yt")}
            </span>
            <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-350">
              <h3 className="font-display text-3xl uppercase leading-none">MvMSOLO</h3>
              <p className="font-mono text-[10px] text-white/40 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-widest">
                {t("work.yt.sub")} ↗
              </p>
            </div>
          </div>
        </motion.a>

        {/* Dashboard card */}
        <motion.a
          variants={itemVariants}
          whileHover={{
            y: -8,
            boxShadow: "0 20px 50px rgba(255, 69, 0, 0.12)",
            transition: { duration: 0.28, ease: [0.34, 1.56, 0.64, 1] },
          }}
          href="https://github.com/MvMSOLO"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-6 md:col-span-4 group relative border border-white/[0.06] bg-neutral-900/50 h-64 overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.6)] block"
          onMouseEnter={playHover}
        >
          <img
            src={dashboard}
            alt="Synthetix Dashboard"
            className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-75 group-hover:scale-104 transition-all duration-600"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />

          <div className="relative z-10 p-5 h-full flex flex-col justify-between">
            <span className="font-mono text-[9px] text-accent font-bold self-start px-2 py-1 bg-accent/10 border border-accent/20 uppercase tracking-widest">
              {t("work.tag.fin")}
            </span>
            <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-350">
              <h3 className="font-display text-3xl uppercase leading-none">Synthetix Dashboard</h3>
              <p className="font-mono text-[10px] text-white/40 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-widest">
                {t("work.fin.sub")} ↗
              </p>
            </div>
          </div>
        </motion.a>

        {/* CTA card */}
        <motion.a
          variants={itemVariants}
          href="#contact"
          className="col-span-6 md:col-span-2 group border border-accent/30 bg-accent/[0.04] p-7 flex items-center justify-between hover:bg-accent hover:text-background transition-colors duration-350 block relative overflow-hidden"
          onMouseEnter={playHover}
        >
          <div className="absolute inset-0 bg-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-450 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          {/* Hover scan */}
          <div className="absolute inset-y-0 left-0 w-px bg-accent group-hover:w-full transition-all duration-450 opacity-0 group-hover:opacity-10" />

          <span className="font-display text-2xl uppercase leading-tight relative z-10">
            {t("work.cta.a")}
            <br />
            {t("work.cta.b")}
          </span>
          <motion.span
            className="font-mono text-3xl relative z-10"
            animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            ↗
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
});
