import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";
import { RevealBox, WordReveal, ClipReveal } from "./TextReveal";
import { useSound } from "@/hooks/useSound";

export function Philosophy() {
  const { t } = useLang();
  const { playHover } = useSound();

  const steps = [
    { t: t("phi.1.t"), d: t("phi.1.d") },
    { t: t("phi.2.t"), d: t("phi.2.d") },
    { t: t("phi.3.t"), d: t("phi.3.d") },
    { t: t("phi.4.t"), d: t("phi.4.d") },
    { t: t("phi.5.t"), d: t("phi.5.d") },
  ];

  return (
    <section
      id="philosophy"
      className="px-5 md:px-20 lg:px-32 py-24 border-b border-border relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute -bottom-24 right-0 w-80 h-80 bg-accent/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent pointer-events-none hidden lg:block" />

      <RevealBox className="mb-10 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">{t("phi.tag")}</span>
      </RevealBox>

      <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-16 leading-[0.9]">
        <WordReveal text={t("phi.title_a")} sound /> <br />
        <span className="text-accent">
          <WordReveal text={t("phi.title_b")} delay={0.2} />
        </span>
      </h2>

      <div className="space-y-0 max-w-3xl">
        {steps.map((s, i) => (
          <ClipReveal key={s.t} delay={i * 0.08}>
            <motion.div
              className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-start border-t border-border pt-8 pb-8 group cursor-default relative overflow-hidden"
              whileHover={{ x: 6 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={playHover}
            >
              {/* Background fill on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Accent left border */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />

              {/* Number */}
              <div className="relative z-10">
                <span className="font-display text-5xl md:text-7xl text-accent/15 group-hover:text-accent/60 transition-colors duration-500 leading-none block">
                  0{i + 1}
                </span>
                {/* Animated underline under number */}
                <div className="h-px w-0 bg-accent/40 group-hover:w-full transition-all duration-500 mt-1" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h4 className="font-display text-2xl md:text-3xl uppercase tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">
                  {s.t}
                </h4>
                <p className="text-sm text-white/60 leading-relaxed max-w-[50ch] group-hover:text-white/90 transition-colors duration-300">
                  {s.d}
                </p>

                {/* Arrow indicator */}
                <motion.span
                  className="inline-block mt-3 text-accent/0 group-hover:text-accent/60 text-xs font-mono uppercase tracking-widest transition-all duration-300"
                  style={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  ◉ PRINCIPLE {String(i + 1).padStart(2, "0")}
                </motion.span>
              </div>
            </motion.div>
          </ClipReveal>
        ))}
      </div>
    </section>
  );
}
