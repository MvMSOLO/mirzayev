import { useLang } from "@/lib/i18n";
import { motion, type Variants } from "framer-motion";
import { RevealBox, WordReveal } from "./TextReveal";

const entries = [
  { v: "v3.4.0", uz: "Kreativ olam qo'shildi", en: "Creative universe shipped" },
  { v: "v3.3.1", uz: "Kinetik marquee kalibrlandi", en: "Kinetic marquee calibrated" },
  { v: "v3.2.0", uz: "Aether Flow oqimi ochildi", en: "Aether Flow stream opened" },
  { v: "v3.1.0", uz: "Zarrachalar maydoni yoqildi", en: "Particle field activated" },
  { v: "v3.0.0", uz: "Ikki tilli tizim ishga tushdi", en: "Bilingual system online" },
  {
    v: "v2.4.0",
    uz: "Portfolio arxitekturasi qayta qurildi",
    en: "Portfolio architecture rebuilt",
  },
];

export function LabLog() {
  const { t, lang } = useLang();

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
    hidden: { opacity: 0, x: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="px-5 md:px-20 lg:px-32 py-24 border-t border-border">
      <RevealBox className="mb-10 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">// LAB LOG</span>
      </RevealBox>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10">
        <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter">
          <WordReveal text={lang === "uz" ? "Ishlab chiqarish jurnal" : "Build log"} sound />
          <span className="text-accent">.</span>
        </h2>
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
              whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              className="grid grid-cols-[80px_1fr_auto] gap-4 py-3 border-b border-border items-center group transition-colors px-2 cursor-default"
            >
              <span className="text-accent relative">
                <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                {e.v}
              </span>
              <span className="uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                {lang === "uz" ? e.uz : e.en}
              </span>
              <span className="text-white/40 group-hover:text-accent transition-colors">
                {String(2026 - Math.floor(i / 3)).slice(-2)}.{String(12 - i).padStart(2, "0")}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <p className="mt-6 text-[10px] text-white/40 uppercase tracking-widest">
        {t("nav.status")} · {lang === "uz" ? "Uzluksiz iteratsiya" : "Continuous iteration"}
      </p>
    </section>
  );
}
