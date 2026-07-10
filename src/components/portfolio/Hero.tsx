import { useLang } from "@/lib/i18n";
import { ParticleField } from "./ParticleField";
import { HeroRails } from "./HeroRails";
import { motion, type Variants } from "framer-motion";
import { WordReveal, RevealBox, BlurReveal } from "./TextReveal";
import { useSound } from "@/hooks/useSound";

export function Hero() {
  const { t } = useLang();
  const { playHover } = useSound();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
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

  return (
    <section
      id="top"
      className="relative pt-32 pb-24 overflow-hidden border-b border-border min-h-[92vh] flex flex-col justify-center"
    >
      <ParticleField className="opacity-80" />
      <HeroRails />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background pointer-events-none" />

      {/* Top marquee */}
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

      {/* Bottom marquee */}
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

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [-8, 8, -8], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-12 hidden lg:flex flex-col items-center gap-1 text-[8px] font-mono text-accent/30 uppercase tracking-widest pointer-events-none"
      >
        <span>SYS</span>
        <div className="w-px h-8 bg-accent/20" />
        <span>ONLINE</span>
      </motion.div>

      <motion.div
        animate={{ y: [6, -6, 6], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/3 right-24 hidden lg:block text-[8px] font-mono text-white/20 uppercase tracking-widest pointer-events-none"
      >
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-accent/40 rounded-full animate-pulse" />
          <span>AI READY</span>
        </div>
      </motion.div>

      {/* Corner accent elements */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute top-32 right-8 md:right-16 lg:right-32 pointer-events-none"
      >
        <div className="relative w-16 h-16">
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent/40" />
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-1 right-1 w-2 h-2 bg-accent/30 rounded-full"
          />
        </div>
      </motion.div>

      <motion.div
        className="px-5 md:px-20 lg:px-32 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Chip */}
        <motion.div
          variants={itemVariants}
          className="inline-block bg-accent px-2 py-1 mb-6 relative group cursor-default"
          onMouseEnter={playHover}
        >
          <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white/40" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white/40" />
          {/* Shimmer effect */}
          <div className="absolute inset-0 animate-shimmer opacity-50 pointer-events-none" />
          <span className="text-[10px] font-bold uppercase tracking-widest relative z-10">
            {t("hero.chip")}
          </span>
        </motion.div>

        {/* Name */}
        <h1 className="font-display text-7xl md:text-9xl uppercase leading-[0.85] tracking-tighter mb-8">
          <span className="relative group inline-block">
            <WordReveal text={t("hero.first")} sound />
            {/* Glitch layers on hover */}
            <span
              className="absolute inset-0 font-display text-7xl md:text-9xl uppercase leading-[0.85] tracking-tighter text-accent opacity-0 group-hover:opacity-100 pointer-events-none select-none"
              style={{
                animation: "glitch-1 0.4s linear infinite",
                clipPath: "inset(0 0 90% 0)",
              }}
            >
              {t("hero.first")}
            </span>
          </span>{" "}
          <br />
          <span className="text-accent relative group inline-block">
            <WordReveal text={t("hero.last")} delay={0.2} />
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="max-w-[36ch] text-sm md:text-base text-white/70 leading-relaxed mb-10"
        >
          {t("hero.sub")}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-white/40"
        >
          <span>{t("hero.scroll")}</span>
          <div className="relative h-8 w-px bg-white/20 overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-0 h-4 bg-gradient-to-b from-transparent via-accent to-transparent"
            />
          </div>
          <span>{t("hero.est")}</span>
        </motion.div>
      </motion.div>

      {/* Animated corner brackets that appear on load */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-5 md:left-20 lg:left-32 pointer-events-none"
      >
        <motion.div
          animate={{ width: ["0%", "100%"] }}
          transition={{ delay: 2.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] bg-accent/20 w-24"
        />
      </motion.div>
    </section>
  );
}
