import { motion, type Variants } from "framer-motion";
import { RevealBox, WordReveal, BlurReveal } from "./TextReveal";
import { useLang } from "@/lib/i18n";
import { memo } from "react";

interface Update {
  version: string;
  date: string;
  title: { uz: string; en: string };
  items: { uz: string; en: string }[];
  tag: "major" | "minor" | "fix" | "feature";
}

const updates: Update[] = [
  {
    version: "v6.0.0",
    date: "2026.07",
    tag: "major",
    title: { uz: "V6 — Kinetik Laboratoriya", en: "V6 — Kinetic Laboratory" },
    items: [
      { uz: "500+ zamonaviy animatsiya qo'shildi", en: "500+ modern animations added across all sections" },
      { uz: "Studio AI IDE to'liq qayta qurildi", en: "Studio AI IDE completely rebuilt" },
      { uz: "Scroll satisfying Lenis bilan yangilandi", en: "Scroll experience upgraded with Lenis" },
      { uz: "Ovoz effektlari hamma joyga qo'shildi", en: "Sound effects integrated everywhere" },
      { uz: "Avazbek Mirzayev tomonidan to'liq loyihalashtirildi va ishlab chiqildi", en: "Fully designed and engineered by Avazbek Mirzayev" },
    ],
  },
  {
    version: "v5.2.0",
    date: "2026.05",
    tag: "feature",
    title: { uz: "Parallel Universe Contact", en: "Parallel Universe Contact" },
    items: [
      { uz: "Parallel Universe kontakt portallari", en: "Parallel Universe contact portals added" },
      { uz: "4 ta turli portal (Startap, Agentlik, Brend, Maxfiy)", en: "4 distinct portals (Startup, Agency, Brand, Secret)" },
      { uz: "Supabase integratsiyasi", en: "Supabase real-time integration" },
    ],
  },
  {
    version: "v5.0.0",
    date: "2026.03",
    tag: "major",
    title: { uz: "Kreativ Olam", en: "Creative Universe" },
    items: [
      { uz: "Ikki rejim: Kinetik va Kreativ", en: "Dual mode: Kinetic & Creative Universe" },
      { uz: "Suyuq o'tish animatsiyalari", en: "Liquid transition animations" },
      { uz: "Ikki tilli tizim (UZ/EN)", en: "Bilingual system (UZ/EN)" },
    ],
  },
  {
    version: "v4.1.0",
    date: "2026.01",
    tag: "feature",
    title: { uz: "Kelajak Kompilyatori", en: "Future Compiler" },
    items: [
      { uz: "AI asosidagi kod generatori", en: "AI-powered code generator" },
      { uz: "Vanilla HTML/CSS/JS chiqish", en: "Vanilla HTML/CSS/JS output" },
      { uz: "Kinetik IDE interfeysi", en: "Kinetic IDE interface" },
    ],
  },
];

const tagStyles: Record<string, string> = {
  major: "text-accent border-accent/50 bg-accent/8",
  feature: "text-emerald-400 border-emerald-400/35 bg-emerald-400/8",
  minor: "text-blue-400 border-blue-400/35 bg-blue-400/8",
  fix: "text-amber-400 border-amber-400/35 bg-amber-400/8",
};

export const Updates = memo(function Updates() {
  const { lang } = useLang();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: -28, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="updates"
      className="px-5 md:px-20 lg:px-32 py-20 md:py-32 border-t border-white/[0.06] relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/[0.02] rounded-full blur-[80px]" />
      </div>

      {/* Corner label */}
      <div className="absolute top-6 right-6 font-mono text-[8px] text-white/[0.08] hidden lg:block uppercase tracking-widest">
        SYS_LOG // CHANGELOG.DB
      </div>

      <RevealBox className="mb-14 flex gap-3 items-center">
        <div className="h-px w-10 bg-accent" />
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-accent">// UPDATES</span>
      </RevealBox>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.9fr] gap-14 mb-16">
        <div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter">
            <WordReveal text={lang === "uz" ? "Versiya" : "Build"} sound />
            <br />
            <span className="text-accent">
              <WordReveal text={lang === "uz" ? "jurnali." : "log."} delay={0.2} />
            </span>
          </h2>
          <BlurReveal delay={0.4} className="mt-7">
            <p className="text-sm text-white/45 max-w-[34ch] leading-[1.9]">
              {lang === "uz"
                ? "Portfolio doimiy rivojlanib boradi. Har bir versiyada yangi imkoniyatlar, dizayn va texnologiyalar."
                : "The portfolio evolves constantly. Every version brings new capabilities, design refinements, and technologies."}
            </p>
          </BlurReveal>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          className="space-y-3"
        >
          {updates.map((update, i) => (
            <motion.div
              key={update.version}
              variants={cardVariants}
              className="group relative border border-white/[0.07] bg-white/[0.01] backdrop-blur-sm p-6 hover:border-accent/40 transition-all duration-400 overflow-hidden cursor-default"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              {/* Top line sweep */}
              <div className="absolute top-0 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-600" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-accent text-sm font-bold">{update.version}</span>
                    <span
                      className={`font-mono text-[8px] uppercase tracking-[0.18em] border px-2 py-0.5 ${tagStyles[update.tag]}`}
                    >
                      {update.tag}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-white/25 tabular-nums">{update.date}</span>
                </div>

                <h4 className="font-display text-xl uppercase tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
                  {update.title[lang]}
                </h4>

                <ul className="space-y-2">
                  {update.items.map((item, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + j * 0.04 }}
                      className="flex items-center gap-2.5 font-mono text-[11px] text-white/40 group-hover:text-white/65 transition-colors duration-250"
                    >
                      <span className="w-1 h-1 bg-accent/40 group-hover:bg-accent flex-shrink-0 transition-colors duration-250" />
                      {item[lang]}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Author badge */}
      <RevealBox delay={0.3}>
        <div className="border-t border-white/[0.07] pt-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-9 h-9 bg-accent flex items-center justify-center shadow-[0_0_20px_rgba(255,69,0,0.4)]">
                <span className="text-background font-bold text-xs tracking-wider">AM</span>
              </div>
              <div className="absolute -inset-1 bg-accent/20 rounded animate-ping-lg" />
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                {lang === "uz" ? "Muallif" : "Creator"}
              </p>
              <p className="text-sm font-bold tracking-tight mt-0.5">
                <span className="text-accent">Avazbek Mirzayev</span>
                <span className="text-white/45"> · Portfolio Labs</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 font-mono text-[9px] text-white/22 uppercase tracking-[0.15em]">
            <span>React 19 · Vite · Tailwind v4</span>
            <span className="hidden md:block">Bun · TanStack · Supabase</span>
          </div>
        </div>
      </RevealBox>
    </section>
  );
});
