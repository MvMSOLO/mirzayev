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
      transition: { staggerChildren: 0.055 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 28, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="lab"
      className="px-5 md:px-20 lg:px-32 py-20 md:py-32 border-t border-white/[0.06] relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,rgba(255,69,0,0.03)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-accent/15 via-transparent to-transparent pointer-events-none" />

      <RevealBox className="mb-14 flex gap-3 items-center">
        <div className="h-px w-10 bg-accent" />
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-accent">// LAB LOG</span>
      </RevealBox>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-14">
        {/* Left: title */}
        <div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter">
            <WordReveal text={lang === "uz" ? "Ishlab chiqarish jurnal" : "Build log"} sound />
            <span className="text-accent">.</span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 space-y-3"
          >
            <div className="flex items-center gap-3 font-mono text-[9px] text-white/35 uppercase tracking-[0.2em]">
              <div className="relative">
                <div className="w-2 h-2 bg-accent" />
                <div className="absolute inset-0 bg-accent animate-ping opacity-50" />
              </div>
              <span>{lang === "uz" ? "Faol rivojlanishda" : "Actively developing"}</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[9px] text-white/20 uppercase tracking-[0.2em]">
              <div className="w-2 h-2 border border-white/20" />
              <span>
                {entries.length} {lang === "uz" ? "ta yangilanish" : "releases logged"}
              </span>
            </div>

            {/* Version badge */}
            <div className="mt-6 inline-flex items-center gap-2 border border-accent/25 bg-accent/[0.04] px-3 py-2">
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              <span className="font-mono text-[9px] text-accent uppercase tracking-widest">v6.0.0 · LATEST</span>
            </div>
          </motion.div>
        </div>

        {/* Right: log entries */}
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
          className="border-t border-white/[0.07] font-mono text-xs"
        >
          {entries.map((e, i) => (
            <motion.li
              key={e.v}
              variants={itemVariants}
              whileHover={{ x: 10, backgroundColor: "rgba(255, 69, 0, 0.04)" }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-[80px_1fr_auto] gap-5 py-4 border-b border-white/[0.05] items-center group px-3 cursor-default relative overflow-hidden"
            >
              {/* Left accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-0 bg-accent group-hover:w-[2px] transition-all duration-250" />

              <span className="text-accent font-bold relative z-10">{e.v}</span>
              <span className="uppercase tracking-wider text-white/45 group-hover:text-white/85 transition-colors duration-250 relative z-10 text-[11px]">
                {lang === "uz" ? e.uz : e.en}
              </span>
              <span className="text-white/25 group-hover:text-accent/70 transition-colors duration-250 relative z-10 text-right tabular-nums">
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
        transition={{ delay: 0.6 }}
        className="mt-8 font-mono text-[9px] text-white/20 uppercase tracking-[0.2em]"
      >
        {t("nav.status")} · {lang === "uz" ? "Uzluksiz iteratsiya" : "Continuous iteration"} · v6.0.0
      </motion.p>
    </section>
  );
});
