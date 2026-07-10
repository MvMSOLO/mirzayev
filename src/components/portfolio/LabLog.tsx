import { useLang } from "@/lib/i18n";
import { motion, type Variants } from "framer-motion";
import { RevealBox, WordReveal } from "./TextReveal";

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

export function LabLog() {
  const { t, lang } = useLang();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 30, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="lab" className="px-5 md:px-20 lg:px-32 py-16 md:py-24 border-t border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-accent/20 via-transparent to-transparent pointer-events-none" />

      <RevealBox className="mb-10 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">// LAB LOG</span>
      </RevealBox>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10">
        <div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter">
            <WordReveal text={lang === "uz" ? "Ishlab chiqarish jurnal" : "Build log"} sound />
            <span className="text-accent">.</span>
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 uppercase tracking-widest">
              <div className="w-2 h-2 bg-accent animate-pulse" />
              <span>
                {lang === "uz" ? "Faol rivojlanishda" : "Actively developing"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-white/20 uppercase tracking-widest">
              <div className="w-2 h-2 border border-white/20" />
              <span>{entries.length} {lang === "uz" ? "ta yangilanish" : "releases logged"}</span>
            </div>
          </motion.div>
        </div>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="border-t border-border font-mono text-xs"
        >
          {entries.map((e, i) => (
            <motion.li
              key={e.v}
              variants={itemVariants}
              whileHover={{ x: 12, backgroundColor: "rgba(255, 69, 0, 0.05)" }}
              className="grid grid-cols-[80px_1fr_auto] gap-4 py-3 border-b border-border items-center group transition-all px-2 cursor-default relative overflow-hidden"
            >
              {/* Hover line */}
              <div className="absolute left-0 top-0 bottom-0 w-0 bg-accent group-hover:w-[2px] transition-all duration-300" />

              <span className="text-accent relative z-10">
                <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                {e.v}
              </span>
              <span className="uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity group-hover:text-white relative z-10">
                {lang === "uz" ? e.uz : e.en}
              </span>
              <span className="text-white/30 group-hover:text-accent transition-colors relative z-10 text-right">
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
        transition={{ delay: 0.5 }}
        className="mt-6 text-[10px] text-white/30 uppercase tracking-widest font-mono"
      >
        {t("nav.status")} · {lang === "uz" ? "Uzluksiz iteratsiya" : "Continuous iteration"} · v6.0.0
      </motion.p>
    </section>
  );
}
