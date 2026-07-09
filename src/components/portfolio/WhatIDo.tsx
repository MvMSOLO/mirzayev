import { useLang } from "@/lib/i18n";
import { motion, type Variants } from "framer-motion";
import { RevealBox, WordReveal } from "./TextReveal";

export function WhatIDo() {
  const { t } = useLang();
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
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, rotateX: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="services"
      className="px-5 md:px-20 lg:px-32 py-24 border-b border-border relative overflow-hidden"
    >
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
        className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border [perspective:1000px]"
      >
        {items.map((k, i) => (
          <motion.div
            key={k}
            variants={itemVariants}
            className="group relative bg-background p-6 flex items-baseline justify-between overflow-hidden cursor-default min-h-[140px]"
          >
            {/* Hover Background Expansion */}
            <div className="absolute inset-0 bg-accent scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />

            <span className="font-display text-2xl md:text-3xl uppercase tracking-tight relative z-10 group-hover:text-background transition-colors duration-300">
              {t(k)}
            </span>
            <span className="font-mono text-[10px] opacity-40 group-hover:opacity-100 relative z-10 group-hover:text-background transition-colors duration-300">
              0{i + 1}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
