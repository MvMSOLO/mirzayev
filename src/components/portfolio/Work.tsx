import neural from "@/assets/work-neural.jpg";
import dashboard from "@/assets/work-dashboard.jpg";
import vortex from "@/assets/work-vortex.jpg";
import youtube from "@/assets/work-youtube.jpg";
import { useLang } from "@/lib/i18n";
import { motion, type Variants } from "framer-motion";
import { RevealBox, WordReveal, BlurReveal } from "./TextReveal";
import { useSound } from "@/hooks/useSound";

export function Work() {
  const { t } = useLang();
  const { playHover } = useSound();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.93, y: 22, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="work"
      className="px-5 md:px-20 lg:px-32 py-16 md:py-24 border-b border-border relative overflow-hidden bg-[radial-gradient(ellipse_at_100%_0%,rgba(255,69,0,0.05)_0%,transparent_55%)]"
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-white/10 hidden lg:block">
        SEC_WORK // ARCHIVE.DB // ACCESS_GRANTED
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent pointer-events-none" />

      <div className="flex justify-between items-end mb-12">
        <RevealBox>
          <div className="mb-4 flex gap-2 items-center">
            <div className="h-[1px] w-8 bg-accent" />
            <span className="text-[10px] uppercase tracking-widest text-accent">{t("work.tag")}</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9]">
            <WordReveal text={t("work.title_a")} sound /> <br />
            <WordReveal text={t("work.title_b")} delay={0.2} />
          </h2>
        </RevealBox>
        <BlurReveal className="text-[10px] text-white/40 mb-2 font-mono">[01 — 05]</BlurReveal>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="grid grid-cols-6 gap-4"
      >
        {/* Hero project card */}
        <motion.a
          variants={itemVariants}
          whileHover={{
            y: -10,
            boxShadow: "0 32px 64px -12px rgba(255, 69, 0, 0.35)",
            transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
          }}
          href="https://github.com/MvMSOLO"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-6 md:col-span-4 md:row-span-2 group relative border border-white/[0.08] bg-neutral-900/40 aspect-[4/5] md:aspect-auto overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)] block"
          onMouseEnter={playHover}
        >
          {/* Technical corners */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-accent opacity-0 group-hover:opacity-100 transition-all duration-300 z-20" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-accent opacity-0 group-hover:opacity-100 transition-all duration-300 z-20" />

          {/* Scan line on hover */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 animate-[scan-y_2s_linear_infinite] z-10 shadow-[0_0_15px_#ff4500]" />

          <img
            src={neural}
            alt="Neural Flow"
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-95 group-hover:scale-108 transition-all duration-700"
            style={{ scale: 1 }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent group-hover:via-background/30 transition-all duration-500" />

          {/* Overlay tint on hover */}
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-all duration-500" />

          <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[500px]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] text-accent font-bold px-2 py-1 bg-accent/10 border border-accent/20 backdrop-blur-sm">
                {t("work.tag.ai")}
              </span>
              <span className="text-[10px] opacity-40 font-mono">2025</span>
            </div>
            <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="font-display text-4xl md:text-5xl uppercase mb-3 tracking-tight">
                Neural Flow
              </h3>
              <p className="text-sm text-white/60 group-hover:text-white/90 transition-colors duration-300 max-w-[40ch]">
                {t("work.neural.sub")}
              </p>
              <div className="flex items-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest">View Project ↗</span>
              </div>
            </div>
          </div>
        </motion.a>

        {/* YouTube card */}
        <motion.a
          variants={itemVariants}
          whileHover={{ y: -4, boxShadow: "0 15px 40px rgba(255, 69, 0, 0.2)", transition: { duration: 0.2 } }}
          href="https://www.youtube.com/@mvmsolo"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-6 md:col-span-2 group relative border border-white/[0.07] bg-neutral-900/40 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] block"
          onMouseEnter={playHover}
        >
          <img
            src={youtube}
            alt="MvMSOLO YouTube"
            className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
            loading="lazy"
          />
          <div className="relative z-10 p-5 h-full flex flex-col justify-between min-h-[200px]">
            <span className="text-[10px] text-accent font-bold self-start px-2 py-1 bg-accent/10 border border-accent/20">
              {t("work.tag.yt")}
            </span>
            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-display text-3xl uppercase leading-none">MvMSOLO</h3>
              <p className="text-xs text-white/50 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {t("work.yt.sub")}
              </p>
            </div>
          </div>
        </motion.a>

        {/* Dashboard card */}
        <motion.a
          variants={itemVariants}
          whileHover={{ y: -4, boxShadow: "0 15px 40px rgba(255, 69, 0, 0.15)", transition: { duration: 0.2 } }}
          href="https://github.com/MvMSOLO"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-6 md:col-span-4 group relative border border-white/[0.07] bg-neutral-900/40 h-64 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] block"
          onMouseEnter={playHover}
        >
          <img
            src={dashboard}
            alt="Synthetix Dashboard"
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
          <div className="relative z-10 p-5 h-full flex flex-col justify-between">
            <span className="text-[10px] text-accent font-bold self-start px-2 py-1 bg-accent/10 border border-accent/20">
              {t("work.tag.fin")}
            </span>
            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-display text-3xl uppercase leading-none">Synthetix Dashboard</h3>
              <p className="text-xs text-white/50 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {t("work.fin.sub")}
              </p>
            </div>
          </div>
        </motion.a>

        {/* CTA card */}
        <motion.a
          variants={itemVariants}
          whileHover={{ scale: 0.97, transition: { duration: 0.2 } }}
          href="#contact"
          className="col-span-6 md:col-span-2 group border border-accent/40 bg-accent/5 p-6 flex items-center justify-between hover:bg-accent hover:text-background transition-colors duration-300 block relative overflow-hidden"
          onMouseEnter={playHover}
        >
          <div className="absolute inset-0 bg-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
          <span className="font-display text-2xl uppercase leading-none relative z-10">
            {t("work.cta.a")}
            <br />
            {t("work.cta.b")}
          </span>
          <motion.span
            className="text-3xl relative z-10"
            animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ↗
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}
