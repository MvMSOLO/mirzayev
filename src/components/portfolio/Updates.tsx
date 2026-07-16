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
  major: "text-accent border-accent/50 bg-accent/10 shadow-[0_0_10px_rgba(255,69,0,0.2)]",
  feature: "text-[var(--cyan)] border-[var(--cyan)]/50 bg-[var(--cyan)]/10 shadow-[0_0_10px_rgba(0,212,255,0.2)]",
  minor: "text-blue-400 border-blue-400/50 bg-blue-400/10 shadow-[0_0_10px_rgba(96,165,250,0.2)]",
  fix: "text-amber-400 border-amber-400/50 bg-amber-400/10 shadow-[0_0_10px_rgba(251,191,36,0.2)]",
};

export const Updates = memo(function Updates() {
  const { lang } = useLang();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: -40, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="updates"
      className="px-5 md:px-20 lg:px-32 py-28 md:py-40 border-t border-white/[0.06] relative overflow-hidden bg-atmosphere-cyan"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--cyan)]/[0.04] rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[120px]" />
      </div>

      {/* Corner label */}
      <div className="absolute top-10 right-10 font-mono text-[9px] text-[var(--cyan)]/40 font-bold hidden lg:block uppercase tracking-[0.25em] glass-card border border-[var(--cyan)]/20 px-3 py-1.5 rounded">
        SYS_LOG // CHANGELOG.DB
      </div>

      <RevealBox className="mb-16 flex gap-4 items-center">
        <div className="h-1 w-12 bg-gradient-to-r from-[var(--cyan)] to-transparent rounded-full" />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold text-[var(--cyan)] drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]">// UPDATES</span>
      </RevealBox>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.9fr] gap-16 lg:gap-24 mb-20">
        <div>
          <h2 className="font-display text-7xl md:text-9xl uppercase leading-[0.85] tracking-tighter text-white">
            <WordReveal text={lang === "uz" ? "Versiya" : "Build"} sound />
            <br />
            <span className="text-[var(--cyan)] drop-shadow-[0_0_20px_rgba(0,212,255,0.4)]">
              <WordReveal text={lang === "uz" ? "jurnali." : "log."} delay={0.2} />
            </span>
          </h2>
          <BlurReveal delay={0.4} className="mt-8">
            <p className="text-base md:text-lg text-white/70 max-w-[34ch] leading-[1.8] font-sans font-light">
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
          viewport={{ once: true, margin: "-10%" }}
          className="space-y-6"
        >
          {updates.map((update, i) => (
            <motion.div
              key={update.version}
              variants={cardVariants}
              className="group relative glass-dark border border-white/10 rounded-xl p-8 hover:border-[var(--cyan)]/50 transition-all duration-500 overflow-hidden cursor-default shadow-md hover:shadow-glow-cyan"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyan)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Top line sweep */}
              <div className="absolute top-0 left-0 h-[2px] w-0 bg-[var(--cyan)] group-hover:w-full transition-all duration-700 shadow-[0_0_10px_var(--cyan)]" />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[var(--cyan)] text-lg font-bold drop-shadow-[0_0_5px_rgba(0,212,255,0.6)]">{update.version}</span>
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.2em] border px-3 py-1 rounded font-bold ${tagStyles[update.tag]}`}
                    >
                      {update.tag}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-white/40 tabular-nums font-bold bg-black/40 px-3 py-1.5 rounded-md border border-white/10">{update.date}</span>
                </div>

                <h4 className="font-display text-3xl md:text-4xl uppercase tracking-tight mb-6 text-white group-hover:text-[var(--cyan)] transition-colors duration-400 drop-shadow-md">
                  {update.title[lang]}
                </h4>

                <ul className="space-y-3">
                  {update.items.map((item, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                      className="flex items-start gap-4 font-sans text-sm text-white/60 group-hover:text-white/90 transition-colors duration-300 leading-[1.7]"
                    >
                      <span className="w-1.5 h-1.5 bg-[var(--cyan)]/50 group-hover:bg-[var(--cyan)] flex-shrink-0 transition-colors duration-300 rounded-full mt-1.5 shadow-[0_0_5px_rgba(0,212,255,0.4)]" />
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
      <RevealBox delay={0.4}>
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-6 glass-card px-6 py-4 rounded-xl border border-white/10 hover:border-accent/40 transition-colors duration-300 group shadow-md hover:shadow-glow-orange cursor-default">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-[#ff7700] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,69,0,0.6)] z-10 relative">
                <span className="text-[#0a090c] font-display text-xl tracking-wider">AM</span>
              </div>
              <div className="absolute inset-0 bg-accent/40 rounded-full animate-ping-lg z-0" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold mb-1 group-hover:text-accent transition-colors">
                {lang === "uz" ? "Muallif" : "Creator"}
              </p>
              <p className="text-base font-bold tracking-tight">
                <span className="text-white drop-shadow-md">Avazbek Mirzayev</span>
                <span className="text-white/40"> · Portfolio Labs</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 md:gap-6 font-mono text-[10px] text-[var(--cyan)]/70 font-bold uppercase tracking-[0.2em] bg-black/40 px-6 py-4 rounded-lg border border-white/5">
            <span>React 19 · Vite · Tailwind v4</span>
            <span className="hidden md:block w-1 h-1 bg-[var(--cyan)]/50 rounded-full" />
            <span className="hidden md:block">Bun · TanStack · Supabase</span>
          </div>
        </div>
      </RevealBox>
    </section>
  );
});