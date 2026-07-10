import { motion, type Variants } from "framer-motion";
import { RevealBox, WordReveal, BlurReveal } from "./TextReveal";
import { useLang } from "@/lib/i18n";

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
      {
        uz: "500+ zamonaviy animatsiya qo'shildi",
        en: "500+ modern animations added across all sections",
      },
      { uz: "Studio AI IDE to'liq qayta qurildi", en: "Studio AI IDE completely rebuilt" },
      { uz: "Scroll satisfying Lenis bilan yangilandi", en: "Scroll experience upgraded with Lenis" },
      { uz: "Ovoz effektlari hamma joyga qo'shildi", en: "Sound effects integrated everywhere" },
      { uz: "Replit tomonidan qurildi", en: "Built with Replit" },
    ],
  },
  {
    version: "v5.2.0",
    date: "2026.05",
    tag: "feature",
    title: { uz: "Parallel Universe Contact", en: "Parallel Universe Contact" },
    items: [
      {
        uz: "Parallel Universe kontakt portallari",
        en: "Parallel Universe contact portals added",
      },
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

const tagColors: Record<string, string> = {
  major: "text-accent border-accent bg-accent/10",
  feature: "text-green-400 border-green-400/40 bg-green-400/10",
  minor: "text-blue-400 border-blue-400/40 bg-blue-400/10",
  fix: "text-yellow-400 border-yellow-400/40 bg-yellow-400/10",
};

export function Updates() {
  const { lang } = useLang();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: -30, filter: "blur(4px)" },
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
      className="px-5 md:px-20 lg:px-32 py-24 border-t border-border relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/2 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-8 right-8 font-mono text-[8px] text-white/10 hidden lg:block">
        SYS_LOG // CHANGELOG.DB // V6.0.0
      </div>

      <RevealBox className="mb-10 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">// UPDATES</span>
      </RevealBox>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-12 mb-16">
        <div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter">
            <WordReveal text={lang === "uz" ? "Versiya" : "Build"} sound />
            <br />
            <span className="text-accent">
              <WordReveal text={lang === "uz" ? "jurnali." : "log."} delay={0.2} />
            </span>
          </h2>
          <BlurReveal delay={0.4} className="mt-6">
            <p className="text-sm text-white/50 max-w-[36ch] leading-relaxed">
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
          className="space-y-4"
        >
          {updates.map((update, i) => (
            <motion.div
              key={update.version}
              variants={cardVariants}
              className="group relative border border-border bg-background/50 backdrop-blur p-5 hover:border-accent/50 transition-all duration-500 overflow-hidden cursor-default"
            >
              {/* Hover background */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Top line decoration on hover */}
              <div className="absolute top-0 left-0 h-[1px] w-0 bg-accent group-hover:w-full transition-all duration-700" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-accent text-sm font-bold">{update.version}</span>
                    <span
                      className={`text-[9px] uppercase tracking-widest border px-2 py-0.5 font-mono ${tagColors[update.tag]}`}
                    >
                      {update.tag}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/30 font-mono">{update.date}</span>
                </div>

                <h4 className="font-display text-xl uppercase tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">
                  {update.title[lang]}
                </h4>

                <ul className="space-y-1.5">
                  {update.items.map((item, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                      className="text-[11px] text-white/50 flex items-center gap-2 group-hover:text-white/70 transition-colors"
                    >
                      <span className="w-1 h-1 bg-accent/50 group-hover:bg-accent transition-colors flex-shrink-0" />
                      {item[lang]}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Made by Replit badge */}
      <RevealBox delay={0.3}>
        <div className="border-t border-border pt-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-8 h-8 bg-accent flex items-center justify-center">
                <span className="text-background font-bold text-xs">R</span>
              </div>
              <div className="absolute -inset-1 bg-accent/20 rounded animate-ping-lg" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
                {lang === "uz" ? "Qurildi" : "Made with"}
              </p>
              <p className="text-sm font-bold tracking-tight">
                <span className="text-accent">Replit</span>
                <span className="text-white/60"> · AI-Assisted</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[10px] font-mono text-white/30 uppercase tracking-widest">
            <span>Stack: React 19 · Vite · Tailwind v4</span>
            <span className="hidden md:block">Bun · TanStack · Supabase</span>
          </div>
        </div>
      </RevealBox>
    </section>
  );
}
