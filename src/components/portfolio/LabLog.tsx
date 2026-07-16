import { useLang } from "@/lib/i18n";
import { motion, type Variants } from "framer-motion";
import { RevealBox, WordReveal } from "./TextReveal";
import { memo } from "react";

const entries = [
  { v: "v6.0.0", uz: "500+ animatsiya, IDE qayta qurildi", en: "500+ animations, IDE rebuilt" },
  { v: "v5.2.0", uz: "Parallel Universe kontakt portallari", en: "Parallel Universe contact portals" },
  { v: "v5.1.0", uz: "AI tizimlari va IDE dvigateli optimallashtirildi", en: "AI engines and IDE core optimized" },
  { v: "v5.0.0", uz: "Kreativ olam qo'shildi", en: "Creative universe shipped" },
  { v: "v4.1.0", uz: "Kelajak Kompilyatori ishga tushdi", en: "Future Compiler launched" },
  { v: "v4.0.0", uz: "Dizayn arxeologiyasi ochildi", en: "Design archaeology unveiled" },
  { v: "v3.4.0", uz: "Kinetik marquee kalibrlandi", en: "Kinetic marquee calibrated" },
  { v: "v3.2.0", uz: "Aether Flow oqimi ochildi", en: "Aether Flow stream opened" },
  { v: "v3.1.0", uz: "Zarrachalar maydoni yoqildi", en: "Particle field activated" },
  { v: "v3.0.0", uz: "Ikki tilli tizim ishga tushdi", en: "Bilingual system online" },
];

export const LabLog = memo(function LabLog() {
  const { t, lang } = useLang();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 40, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="lab"
      className="px-5 md:px-20 lg:px-32 py-28 md:py-40 border-t border-white/[0.06] relative overflow-hidden bg-atmosphere-orange"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,rgba(255,69,0,0.05)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-accent/30 via-transparent to-transparent pointer-events-none" />

      <RevealBox className="mb-16 flex gap-4 items-center">
        <div className="h-1 w-12 bg-gradient-to-r from-accent to-transparent rounded-full" />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold text-accent drop-shadow-[0_0_8px_rgba(255,69,0,0.6)]">// LAB LOG</span>
      </RevealBox>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24">
        {/* Left: title */}
        <div>
          <h2 className="font-display text-7xl md:text-9xl uppercase leading-[0.85] tracking-tighter text-white">
            <WordReveal text={lang === "uz" ? "Ishlab" : "Build"} sound />
            <br />
            <WordReveal text={lang === "uz" ? "chiqarish" : "log"} delay={0.1} />
            <span className="text-accent drop-shadow-[0_0_20px_rgba(255,69,0,0.4)]">.</span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 space-y-5"
          >
            <div className="flex items-center gap-4 font-mono text-[11px] text-white/50 font-bold uppercase tracking-[0.25em]">
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-accent rounded-full shadow-[0_0_8px_rgba(255,69,0,0.8)]" />
                <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-60" />
              </div>
              <span>{lang === "uz" ? "Faol rivojlanishda" : "Actively developing"}</span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px] text-white/40 font-bold uppercase tracking-[0.25em]">
              <div className="w-2.5 h-2.5 border-2 border-white/40 rounded-sm" />
              <span>
                {entries.length} {lang === "uz" ? "ta yangilanish" : "releases logged"}
              </span>
            </div>

            {/* Version badge */}
            <div className="mt-8 inline-flex items-center gap-3 glass-card border border-accent/40 bg-accent/[0.08] px-5 py-3 rounded-lg shadow-glow-orange">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_5px_rgba(255,69,0,0.8)]" />
              <span className="font-mono text-[11px] text-accent font-bold uppercase tracking-[0.25em]">v6.0.0 · LATEST</span>
            </div>
          </motion.div>
        </div>

        {/* Right: log entries */}
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="font-mono text-sm border-t border-white/10"
        >
          {entries.map((e, i) => (
            <motion.li
              key={e.v}
              variants={itemVariants}
              whileHover={{ x: 12, backgroundColor: "rgba(255, 69, 0, 0.08)" }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-[100px_1fr_auto] gap-6 py-6 border-b border-white/[0.08] items-center group px-4 cursor-default relative overflow-hidden rounded-md"
            >
              {/* Left accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-0 bg-gradient-to-b from-accent to-[#ff7700] group-hover:w-[3px] transition-all duration-400 shadow-[0_0_10px_#ff4500]" />

              <span className="text-accent font-bold relative z-10 text-base drop-shadow-[0_0_5px_rgba(255,69,0,0.4)]">{e.v}</span>
              <span className="uppercase tracking-widest text-white/60 group-hover:text-white transition-colors duration-400 relative z-10 text-[12px] font-bold">
                {lang === "uz" ? e.uz : e.en}
              </span>
              <span className="text-white/40 group-hover:text-accent transition-colors duration-400 relative z-10 text-right tabular-nums font-bold bg-[#0a090c] px-2 py-1 rounded">
                {String(2026 - Math.floor(i / 4)).slice(-2)}.{String(12 - (i % 4) * 3).padStart(2, "0")}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-12 font-mono text-[10px] text-white/30 uppercase tracking-[0.25em] font-bold text-center border-t border-white/10 pt-8"
      >
        {t("nav.status")} · {lang === "uz" ? "Uzluksiz iteratsiya" : "Continuous iteration"} · v6.0.0
      </motion.p>
    </section>
  );
});