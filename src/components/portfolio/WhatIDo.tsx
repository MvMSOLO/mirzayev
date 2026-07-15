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
      transition: { staggerChildren: 0.055 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.90, rotateX: 12, y: 22, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="services"
      className="px-5 md:px-20 lg:px-32 py-20 md:py-32 border-b border-white/[0.06] relative overflow-hidden"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_60%,rgba(255,69,0,0.05)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" />

      <RevealBox className="mb-12 flex gap-3 items-center">
        <div className="h-px w-10 bg-accent" />
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-accent">{t("wid.tag")}</span>
      </RevealBox>

      <h2 className="heading-hover font-display text-5xl md:text-7xl uppercase tracking-tighter mb-14 leading-[0.88] cursor-default">
        <WordReveal text={t("wid.title_a")} sound />
        <span className="text-accent ml-2 mr-2">
          <WordReveal text={t("wid.title_i")} delay={0.1} />
        </span>
        <WordReveal text={t("wid.title_b")} delay={0.2} />
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-8%" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.05] [perspective:1200px] shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
      >
        {items.map((k, i) => (
          <motion.div
            key={k}
            variants={itemVariants}
            whileHover={{
              z: 24,
              transition: { duration: 0.22, ease: [0.34, 1.56, 0.64, 1] },
            }}
            className="group relative bg-[#0c0b0f] p-7 flex flex-col justify-between overflow-hidden cursor-default min-h-[200px]"
            onMouseEnter={playHover}
          >
            {/* Hover fill — accent color */}
            <div className="absolute inset-0 bg-accent scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />

            {/* Top scan line */}
            <div className="absolute inset-x-0 top-0 h-px bg-white/15 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-350 z-10" />

            {/* Corner accent — top right */}
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-accent/20 group-hover:border-background/30 transition-colors duration-300 z-10" />

            {/* Number + icon row */}
            <div className="flex justify-between items-start relative z-10">
              <span className="font-mono text-4xl text-accent/15 group-hover:text-background/15 transition-colors duration-300 leading-none select-none">
                {serviceIcons[k]}
              </span>
              <span className="font-mono text-[9px] text-white/25 group-hover:text-background/40 transition-colors duration-300">
                0{i + 1}
              </span>
            </div>

            {/* Title */}
            <div className="relative z-10 mt-auto">
              <span className="font-display text-2xl md:text-[1.6rem] uppercase tracking-tight group-hover:text-background transition-colors duration-300 block leading-tight">
                {t(k)}
              </span>
              <div className="h-px w-0 bg-background/35 group-hover:w-full transition-all duration-500 mt-2.5" />
            </div>

            {/* Arrow */}
            <span className="absolute bottom-4 right-4 text-background/0 group-hover:text-background/45 transition-all duration-300 font-mono text-xs z-10">
              ↗
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
});
