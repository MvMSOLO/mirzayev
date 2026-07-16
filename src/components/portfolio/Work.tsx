import neural from "@/assets/work-neural.jpg";
import dashboard from "@/assets/work-dashboard.jpg";
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
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.96, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="work"
      className="px-5 md:px-20 lg:px-32 py-28 md:py-40 border-b border-white/[0.06] relative overflow-hidden bg-atmosphere-dual"
    >
      {/* Corner label */}
      <div className="absolute top-8 right-8 p-4 font-mono text-[9px] text-[var(--cyan)]/20 hidden lg:block uppercase tracking-[0.25em] font-bold">
        SEC_WORK // ARCHIVE.DB
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-20 gap-6 md:gap-8">
        <RevealBox>
          <div className="mb-6 flex gap-4 items-center">
            <div className="h-1 w-12 bg-gradient-to-r from-accent to-transparent rounded-full" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold text-accent drop-shadow-[0_0_8px_rgba(255,69,0,0.6)]">
              {t("work.tag")}
            </span>
          </div>
          <h2 className="heading-hover font-display text-5xl sm:text-7xl md:text-9xl uppercase tracking-tighter leading-[0.85] cursor-default">
            <WordReveal text={t("work.title_a")} sound /> <br />
            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <WordReveal text={t("work.title_b")} delay={0.18} />
            </span>
          </h2>
        </RevealBox>
        <BlurReveal className="font-mono text-[11px] text-[var(--cyan)]/40 font-bold hidden md:block border border-[var(--cyan)]/20 px-4 py-2 glass-card">
          [01 — 05]
        </BlurReveal>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="grid grid-cols-6 gap-6 md:gap-8"
      >
        {/* Hero card */}
        <motion.a
          variants={itemVariants}
          whileHover={{
            y: -20,
            scale: 1.02,
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          }}
          href="https://github.com/MvMSOLO"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-6 md:col-span-4 md:row-span-2 group relative glass-dark border-gradient-cyan aspect-[4/5] md:aspect-auto overflow-hidden shadow-glow-cyan block rounded-2xl"
          onMouseEnter={playHover}
        >
          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[var(--cyan)] opacity-0 group-hover:opacity-100 transition-all duration-500 z-20" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[var(--cyan)] opacity-0 group-hover:opacity-100 transition-all duration-500 z-20" />

          {/* Scan line */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent opacity-0 group-hover:opacity-100 animate-[scan-y_2.5s_linear_infinite] z-10 shadow-[0_0_20px_var(--cyan)]" />

          <img
            src={neural}
            alt="Neural Flow"
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out-expo"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a090c] via-[#0a090c]/80 to-transparent group-hover:via-[#0a090c]/40 transition-all duration-700" />
          <div className="absolute inset-0 bg-[var(--cyan)]/0 group-hover:bg-[var(--cyan)]/[0.08] transition-all duration-500" />

          <div className="relative z-10 p-6 md:p-10 h-full flex flex-col justify-between min-h-[340px] md:min-h-[500px]">
            <div className="flex justify-between items-start">
              <span className="font-mono text-[10px] text-[var(--cyan)] font-bold px-3 py-2 bg-[var(--cyan)]/10 border border-[var(--cyan)]/30 uppercase tracking-[0.2em] backdrop-blur-md rounded shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                {t("work.tag.ai")}
              </span>
              <span className="font-mono text-[11px] text-white/50 tabular-nums font-bold bg-black/40 px-3 py-1.5 rounded backdrop-blur-md border border-white/10">2025</span>
            </div>
            <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out-expo">
              <h3 className="font-display text-4xl md:text-7xl uppercase mb-4 tracking-tighter text-white drop-shadow-lg">
                Neural Flow
              </h3>
              <p className="text-base text-white/70 group-hover:text-white/95 transition-colors duration-500 max-w-[45ch] leading-relaxed font-sans">
                {t("work.neural.sub")}
              </p>
              <div className="flex items-center gap-3 mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="h-px w-8 bg-[var(--cyan)]" />
                <span className="font-mono text-[11px] text-[var(--cyan)] uppercase tracking-widest font-bold">
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
            y: -12,
            scale: 1.03,
            transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          }}
          href="https://www.youtube.com/@mvmsolo"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-6 md:col-span-2 group relative glass-card border-gradient-accent overflow-hidden shadow-glow-orange block rounded-xl"
          onMouseEnter={playHover}
        >
          <img
            src={youtube}
            alt="MvMSOLO YouTube"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a090c] via-[#0a090c]/60 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 shadow-[0_0_15px_#ff4500]" />

          <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between min-h-[200px] md:min-h-[260px]">
            <span className="font-mono text-[10px] text-accent font-bold self-start px-3 py-1.5 bg-accent/15 border border-accent/30 uppercase tracking-[0.2em] backdrop-blur-md rounded shadow-[0_0_15px_rgba(255,69,0,0.2)]">
              {t("work.tag.yt")}
            </span>
            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out-expo">
              <h3 className="font-display text-4xl uppercase leading-none drop-shadow-md">MvMSOLO</h3>
              <p className="font-mono text-[11px] text-white/50 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400 uppercase tracking-[0.2em] font-bold text-accent">
                {t("work.yt.sub")} ↗
              </p>
            </div>
          </div>
        </motion.a>

        {/* Dashboard card */}
        <motion.a
          variants={itemVariants}
          whileHover={{
            y: -12,
            scale: 1.03,
            transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          }}
          href="https://github.com/MvMSOLO"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-6 md:col-span-4 group relative glass-card border-gradient-cyan h-72 md:h-auto overflow-hidden shadow-glow-cyan block rounded-xl"
          onMouseEnter={playHover}
        >
          <img
            src={dashboard}
            alt="Synthetix Dashboard"
            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a090c]/95 via-[#0a090c]/60 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 shadow-[0_0_15px_var(--cyan)]" />

          <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between w-full md:w-2/3">
            <span className="font-mono text-[10px] text-[var(--cyan)] font-bold self-start px-3 py-1.5 bg-[var(--cyan)]/15 border border-[var(--cyan)]/30 uppercase tracking-[0.2em] backdrop-blur-md rounded shadow-[0_0_15px_rgba(0,212,255,0.2)]">
              {t("work.tag.fin")}
            </span>
            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out-expo">
              <h3 className="font-display text-4xl md:text-5xl uppercase leading-tight drop-shadow-md">Synthetix Dashboard</h3>
              <p className="font-mono text-[11px] text-white/50 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400 uppercase tracking-[0.2em] font-bold text-[var(--cyan)]">
                {t("work.fin.sub")} ↗
              </p>
            </div>
          </div>
        </motion.a>

        {/* CTA card */}
        <motion.a
          variants={itemVariants}
          href="#contact"
          className="col-span-6 md:col-span-2 group glass-dark border border-accent/40 p-10 flex flex-col justify-center items-center text-center hover:bg-accent hover:border-accent hover:shadow-[0_0_40px_rgba(255,69,0,0.5)] transition-all duration-500 block relative overflow-hidden rounded-xl"
          onMouseEnter={playHover}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent to-[#ff7700] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-out-expo" />
          
          <div className="relative z-10 flex flex-col items-center">
            <span className="font-display text-4xl uppercase leading-tight group-hover:text-[#0a090c] transition-colors duration-300">
              {t("work.cta.a")}
              <br />
              {t("work.cta.b")}
            </span>
            <motion.span
              className="font-mono text-4xl mt-4 group-hover:text-[#0a090c] transition-colors duration-300"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
});