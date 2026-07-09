import { useLang } from "@/lib/i18n";
import { ParticleField } from "./ParticleField";
import { HeroRails } from "./HeroRails";
import { motion } from "framer-motion";

export function Hero() {
  const { t } = useLang();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="top"
      className="relative pt-32 pb-24 overflow-hidden border-b border-border min-h-[92vh] flex flex-col justify-center"
    >
      <ParticleField className="opacity-80" />
      <HeroRails />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background pointer-events-none" />

      <div className="absolute -top-6 left-0 whitespace-nowrap flex pointer-events-none select-none">
        <div className="flex animate-marquee shrink-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-[110px] md:text-[180px] leading-none uppercase pr-10 opacity-[0.07]"
            >
              {t("hero.marquee")}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-8 left-0 whitespace-nowrap flex pointer-events-none select-none">
        <div className="flex animate-marquee-reverse shrink-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-[80px] md:text-[140px] leading-none uppercase pr-10 opacity-[0.05] text-accent"
            >
              KINETIC LAB · KINETIC LAB · KINETIC LAB ·
            </span>
          ))}
        </div>
      </div>

      <motion.div
        className="px-5 md:px-20 lg:px-32 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="inline-block bg-accent px-2 py-1 mb-6 relative"
        >
          <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white/40" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white/40" />
          <span className="text-[10px] font-bold uppercase tracking-widest">{t("hero.chip")}</span>
        </motion.div>
        <motion.h1
          variants={titleVariants}
          className="font-display text-7xl md:text-9xl uppercase leading-[0.85] tracking-tighter mb-8"
        >
          {t("hero.first")} <br /> <span className="text-accent">{t("hero.last")}</span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="max-w-[36ch] text-sm md:text-base text-white/70 leading-relaxed mb-10"
        >
          {t("hero.sub")}
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-white/40"
        >
          <span>{t("hero.scroll")}</span>
          <div className="h-[1px] w-12 bg-white/20" />
          <span>{t("hero.est")}</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
