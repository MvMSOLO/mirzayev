import { useLang } from "@/lib/i18n";
import { motion, type Variants } from "framer-motion";
import { RevealBox, WordReveal } from "./TextReveal";
import { useSound } from "@/hooks/useSound";

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

export function WhatIDo() {
  const { t } = useLang();
  const { playHover, playClick } = useSound();
  const items = [
    "wid.1", "wid.2", "wid.3",
    "wid.4", "wid.5", "wid.6",
    "wid.7", "wid.8", "wid.9",
  ] as const;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.042 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.88, rotateX: 14, y: 18, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="services"
      className="px-5 md:px-20 lg:px-32 py-16 md:py-24 border-b border-border relative overflow-hidden bg-[radial-gradient(ellipse_at_0%_50%,rgba(255,69,0,0.04)_0%,transparent_60%)]"
    >
      {/* Background grid accent */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>

      <RevealBox className="mb-10 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">{t("wid.tag")}</span>
      </RevealBox>

      <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-12 leading-[0.9]">
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
        viewport={{ once: true, margin: "-10%" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] [perspective:1000px] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
      >
        {items.map((k, i) => (
          <motion.div
            key={k}
            variants={itemVariants}
            whileHover={{
              z: 20,
              transition: { duration: 0.1 },
            }}
            className="group relative bg-[#0c0b0f] border-white/[0.04] p-6 flex flex-col justify-between overflow-hidden cursor-default min-h-[180px]"
            onMouseEnter={playHover}
          >
            {/* Hover Background Expansion */}
            <div className="absolute inset-0 bg-accent scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />

            {/* Scan line on hover */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-10" />

            {/* Number */}
            <div className="flex justify-between items-start relative z-10">
              <motion.span
                className="font-mono text-3xl text-accent/20 group-hover:text-background/20 transition-colors duration-300 leading-none"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
              >
                {serviceIcons[k]}
              </motion.span>
              <span className="font-mono text-[10px] opacity-30 group-hover:opacity-70 relative z-10 group-hover:text-background transition-colors duration-300">
                0{i + 1}
              </span>
            </div>

            {/* Title */}
            <div className="relative z-10">
              <span className="font-display text-2xl md:text-3xl uppercase tracking-tight group-hover:text-background transition-colors duration-300 block">
                {t(k)}
              </span>
              {/* Underline on hover */}
              <div className="h-[1px] w-0 bg-background/40 group-hover:w-full transition-all duration-500 mt-2" />
            </div>

            {/* Corner arrow */}
            <motion.span
              className="absolute bottom-3 right-3 text-background/0 group-hover:text-background/40 transition-all duration-300 font-mono text-xs"
              initial={{ opacity: 0, x: -5 }}
              whileHover={{ opacity: 1, x: 0 }}
            >
              ↗
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
