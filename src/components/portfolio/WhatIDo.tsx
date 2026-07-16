import { useLang } from "@/lib/i18n";
import { motion, type Variants } from "framer-motion";
import { RevealBox, WordReveal } from "./TextReveal";
import { useSound } from "@/hooks/useSound";
import { memo } from "react";

const serviceIcons: Record<string, string> = {
  "wid.1": "⬡",
  "wid.2": "◈",
  "wid.3": "◎",
  "wid.4": "◻",
  "wid.5": "▷",
  "wid.6": "⊞",
  "wid.7": "◌",
  "wid.8": "⟳",
  "wid.9": "◆",
};

export const WhatIDo = memo(function WhatIDo() {
  const { t } = useLang();
  const { playHover } = useSound();
  const items = [
    "wid.1",
    "wid.2",
    "wid.3",
    "wid.4",
    "wid.5",
    "wid.6",
    "wid.7",
    "wid.8",
    "wid.9",
  ] as const;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.94, rotateX: 12, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="services"
      className="px-5 md:px-20 lg:px-32 py-28 md:py-40 border-b border-white/[0.06] relative overflow-hidden bg-atmosphere-orange"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_60%,rgba(255,69,0,0.08)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <RevealBox className="mb-14 flex gap-4 items-center">
        <div className="h-1 w-12 bg-gradient-to-r from-accent to-transparent rounded-full" />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent font-bold drop-shadow-[0_0_8px_rgba(255,69,0,0.6)]">{t("wid.tag")}</span>
      </RevealBox>

      <h2 className="heading-hover font-display text-7xl md:text-9xl uppercase tracking-tighter mb-20 leading-[0.85] cursor-default text-white">
        <WordReveal text={t("wid.title_a")} sound />
        <span className="text-accent ml-3 mr-3 drop-shadow-[0_0_20px_rgba(255,69,0,0.4)]">
          <WordReveal text={t("wid.title_i")} delay={0.1} />
        </span>
        <WordReveal text={t("wid.title_b")} delay={0.2} />
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 [perspective:1200px]"
      >
        {items.map((k, i) => (
          <motion.div
            key={k}
            variants={itemVariants}
            whileHover={{
              z: 30,
              y: -10,
              scale: 1.02,
              transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
            }}
            className="group relative glass-dark border-gradient-accent rounded-xl p-8 flex flex-col justify-between overflow-hidden cursor-default min-h-[240px] shadow-glow-orange"
            onMouseEnter={playHover}
          >
            {/* Hover fill — accent gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent to-[#ff7700] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-out-expo z-0" />

            {/* Top scan line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-[var(--cyan)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-10 shadow-[0_0_15px_var(--cyan)]" />

            {/* Corner accent — top right */}
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[var(--cyan)]/40 group-hover:border-[#0a090c]/60 transition-colors duration-400 z-10" />

            {/* Number + icon row */}
            <div className="flex justify-between items-start relative z-10 mb-8">
              <span className="font-mono text-5xl text-accent/30 group-hover:text-[#0a090c]/30 transition-colors duration-400 leading-none select-none drop-shadow-md group-hover:drop-shadow-none">
                {serviceIcons[k]}
              </span>
              <span className="font-mono text-[11px] text-[var(--cyan)]/40 group-hover:text-[#0a090c]/60 transition-colors duration-400 font-bold tracking-[0.2em]">
                0{i + 1}
              </span>
            </div>

            {/* Title */}
            <div className="relative z-10 mt-auto">
              <span className="font-display text-3xl md:text-4xl uppercase tracking-tight text-white group-hover:text-[#0a090c] transition-colors duration-400 block leading-[1.1] drop-shadow-md group-hover:drop-shadow-none">
                {t(k)}
              </span>
              <div className="h-[2px] w-0 bg-[#0a090c]/40 group-hover:w-full transition-all duration-600 mt-4" />
            </div>

            {/* Arrow */}
            <span className="absolute bottom-5 right-5 text-[#0a090c]/0 group-hover:text-[#0a090c]/60 transition-all duration-400 font-mono text-lg font-bold z-10">
              ↗
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
});