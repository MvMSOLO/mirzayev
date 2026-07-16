import portrait from "@/assets/portrait.jpg";
import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";
import { WordReveal, RevealBox, CountUp, BlurReveal } from "./TextReveal";
import { useSound } from "@/hooks/useSound";
import { memo } from "react";

const ecosystemNodes = [
  {
    id: "design",
    num: "01",
    title: { uz: "UI/UX DIZAYN", en: "UI/UX CRAFT" },
    subtitle: { uz: "Interfeyslarni mukammal o'rganish", en: "Mastering interactive flows" },
    desc: {
      uz: "O'zaro bog'liqliklar, vizual xarakter va foydalanuvchi tajribasini (UX) chuqur tahlil qilish.",
      en: "Analyzing user behaviors, wireframes, style guides, and crafting visual identities.",
    },
  },
  {
    id: "dev",
    num: "02",
    title: { uz: "SYSTEMS DEV", en: "SYSTEMS DEV" },
    subtitle: { uz: "Tezkor va xavfsiz tizimlar", en: "Fast and reliable backends" },
    desc: {
      uz: "React 19, TypeScript, TanStack va Node.js platformalarida toza kod yozish madaniyati.",
      en: "Structuring type-safe scalable client applications and high performance APIs.",
    },
  },
  {
    id: "ai",
    num: "03",
    title: { uz: "SUN'IY INTELLEKT", en: "AI INTEGRATIONS" },
    subtitle: { uz: "Kelajak kompilyatorlari", en: "Next-gen intelligent apps" },
    desc: {
      uz: "Katta til modellari (LLMs), prompt muhandisligi va avtomatlashtirish tizimlari integratsiyasi.",
      en: "Harnessing deep neural models, context vector DBs, and prompt engineering.",
    },
  },
  {
    id: "content",
    num: "04",
    title: { uz: "KONTENT LABORATORIYA", en: "CONTENT LAB" },
    subtitle: { uz: "Bilim va hamjamiyat", en: "Knowledge sharing" },
    desc: {
      uz: "MvMSOLO YouTube kanali va IT hamjamiyatlari orqali yoshlarga texnologiyani o'rgatish.",
      en: "Sharing engineering knowledge through video & community via MvMSOLO YouTube hub.",
    },
  },
];

export const About = memo(function About() {
  const { t, lang } = useLang();
  const { playHover } = useSound();

  return (
    <section
      id="about"
      className="px-5 md:px-20 lg:px-32 py-28 md:py-40 relative border-b border-white/[0.06] overflow-hidden bg-atmosphere-cyan"
    >
      {/* Background atmosphere */}
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--cyan)]/20 to-transparent pointer-events-none" />

      {/* Vertical side label */}
      <div className="absolute top-20 left-6 font-mono text-[9px] text-[var(--cyan)]/20 hidden lg:block vertical-text uppercase tracking-[0.3em] h-48 border-l border-[var(--cyan)]/20 pl-3 font-bold">
        BIO_METRICS // SCAN_01
      </div>

      {/* Section tag */}
      <RevealBox className="mb-16 flex gap-4 items-center">
        <div className="h-1 w-12 bg-gradient-to-r from-[var(--cyan)] to-transparent rounded-full" />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold text-[var(--cyan)] drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]">{t("about.tag")}</span>
      </RevealBox>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center relative">
        {/* Portrait column */}
        <RevealBox className="flex justify-center lg:justify-start">
          <div className="relative inline-block">
            {/* Portrait frame */}
            <div className="relative w-64 md:w-80 aspect-[3/4] glass-dark border-gradient-cyan overflow-hidden animate-float shadow-glow-cyan group rounded-lg">
              <img
                src={portrait}
                alt="Avazbek Mirzayev portrait"
                width={800}
                height={1000}
                className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-80 group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
                loading="eager"
                fetchPriority="high"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--cyan)]/20 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />

              {/* Scan line on hover */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent shadow-[0_0_15px_var(--cyan)] animate-[scan-y_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Corner brackets */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[var(--cyan)]/0 group-hover:border-[var(--cyan)]/80 transition-all duration-500" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[var(--cyan)]/0 group-hover:border-[var(--cyan)]/80 transition-all duration-500" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[var(--cyan)]/0 group-hover:border-[var(--cyan)]/80 transition-all duration-500" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[var(--cyan)]/0 group-hover:border-[var(--cyan)]/80 transition-all duration-500" />

              {/* Status label */}
              <div className="absolute bottom-4 left-4 font-mono text-[9px] text-white/0 group-hover:text-[var(--cyan)] transition-colors duration-500 uppercase tracking-widest font-bold drop-shadow-[0_0_4px_rgba(0,212,255,0.8)]">
                IDENT_SCANNING...
              </div>
            </div>

            {/* Age badge */}
            <motion.div
              initial={{ scale: 0, rotate: -20, opacity: 0 }}
              whileInView={{ scale: 1, rotate: -4, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 400, damping: 20 }}
              whileHover={{ rotate: 4, scale: 1.08 }}
              className="absolute -bottom-6 -right-6 md:-right-10 bg-accent px-6 py-4 z-30 cursor-default shadow-glow-orange border border-white/20 rounded-sm"
              onMouseEnter={playHover}
            >
              <span className="text-sm font-bold leading-none block uppercase text-white tracking-widest drop-shadow-md">
                {t("about.badge")}
              </span>
            </motion.div>

            {/* Portrait label */}
            <div className="absolute -top-4 -left-4 glass-card border-gradient-cyan px-3 py-1.5 text-[9px] uppercase tracking-widest font-mono text-[var(--cyan)] font-bold shadow-lg">
              Portrait_01
            </div>
          </div>
        </RevealBox>

        {/* Text content */}
        <div className="space-y-8 relative z-10">
          <h3 className="text-2xl md:text-3xl lg:text-4xl leading-snug font-display tracking-tight text-white drop-shadow-md">
            <WordReveal text={t("about.p1_pre")} sound />
            <span className="text-accent inline-block mx-2 drop-shadow-[0_0_15px_rgba(255,69,0,0.6)]">
              <WordReveal text="Avazbek Mirzayev" delay={0.2} />
            </span>
            <WordReveal text={t("about.p1_post")} delay={0.4} />
          </h3>

          <p className="text-base md:text-lg text-white/75 leading-[1.8] font-sans font-light">
            <WordReveal text={t("about.p2")} delay={0.6} />
          </p>

          {/* Tech tags */}
          <RevealBox delay={0.8} className="flex flex-wrap gap-3 pt-3">
            {["React/TS", "Next.js", "Python", "Node.js", "AI", "UI/UX"].map((tag) => (
              <motion.span
                key={tag}
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(0, 212, 255, 0.6)",
                  color: "var(--cyan)",
                  boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 glass-card border border-white/10 text-[10px] uppercase tracking-[0.2em] font-mono font-bold text-white/80 transition-all cursor-default relative overflow-hidden group rounded-md shadow-md"
                onMouseEnter={playHover}
              >
                <span className="relative z-10">{tag}</span>
                <span className="absolute inset-0 bg-gradient-to-t from-[var(--cyan)]/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.span>
            ))}
          </RevealBox>

          {/* Ecosystem schematic */}
          <div className="pt-8 mt-4 border-t border-white/[0.08]">
            <span className="font-mono text-[10px] uppercase text-[var(--cyan)]/80 tracking-[0.25em] font-bold block mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[var(--cyan)] rounded-full animate-pulse" />
              // ECOSYSTEM_SCHEMATIC
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
              {/* Cross lines */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--cyan)]/0 via-[var(--cyan)]/20 to-[var(--cyan)]/0 pointer-events-none hidden sm:block" />
              <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-gradient-to-b from-[var(--cyan)]/0 via-[var(--cyan)]/20 to-[var(--cyan)]/0 pointer-events-none hidden sm:block" />

              {ecosystemNodes.map((node) => (
                <motion.div
                  key={node.id}
                  whileHover={{ borderColor: "rgba(0, 212, 255, 0.4)", backgroundColor: "rgba(0, 212, 255, 0.05)" }}
                  transition={{ duration: 0.3 }}
                  className="p-5 glass-card border border-white/10 relative group overflow-hidden cursor-default rounded-xl shadow-lg hover:shadow-[0_10px_30px_rgba(0,212,255,0.15)]"
                  onMouseEnter={playHover}
                >
                  {/* Top-left accent corner */}
                  <div className="absolute top-0 left-0 w-6 h-[2px] bg-[var(--cyan)]/0 group-hover:bg-[var(--cyan)] transition-colors duration-400" />
                  <div className="absolute top-0 left-0 h-6 w-[2px] bg-[var(--cyan)]/0 group-hover:bg-[var(--cyan)] transition-colors duration-400" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyan)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  <div className="flex justify-between items-start mb-3 relative z-10">
                    <span className="font-mono text-[11px] text-[var(--cyan)]/60 group-hover:text-[var(--cyan)] transition-colors font-bold">
                      [{node.num}]
                    </span>
                    <span className="font-mono text-[8px] text-white/20 group-hover:text-[var(--cyan)]/80 transition-colors uppercase tracking-[0.2em] font-bold">
                      ACTIVE
                    </span>
                  </div>
                  <h4 className="font-display text-lg uppercase tracking-wider text-white group-hover:text-[var(--cyan)] transition-colors duration-300 mb-1.5 relative z-10">
                    {node.title[lang]}
                  </h4>
                  <p className="font-mono text-[10px] text-white/50 mb-3 font-semibold relative z-10">{node.subtitle[lang]}</p>
                  <p className="text-xs text-white/60 leading-[1.7] group-hover:text-white/90 transition-colors duration-300 relative z-10 font-sans">
                    {node.desc[lang]}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 md:mt-28 relative z-10">
        {[
          { k: t("about.age.k"), v: 16, suffix: "" },
          { k: t("about.projects.k"), v: 50, suffix: "+" },
          { k: t("about.years.k"), v: 5, suffix: "" },
          { k: t("about.location.k"), raw: "UZ" },
        ].map((s, i) => (
          <RevealBox
            key={s.k}
            delay={0.1 * i}
            className="glass-dark border-gradient-accent p-5 md:p-8 group hover:border-[rgba(255,69,0,0.6)] transition-all duration-400 relative overflow-hidden cursor-default rounded-xl hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,69,0,0.2)]"
            onMouseEnter={playHover}
          >
            {/* Hover fill */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.12] to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out-expo" />
            
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[24px] border-l-transparent border-t-[24px] border-t-accent/20 group-hover:border-t-accent/70 transition-colors duration-400" />

            <p
              className="font-display text-7xl md:text-8xl leading-none text-accent relative z-10 mb-3 drop-shadow-[0_0_30px_rgba(255,69,0,0.4)]"
            >
              {s.raw ? s.raw : <CountUp end={s.v!} suffix={s.suffix} />}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50 font-bold relative z-10 group-hover:text-white transition-colors duration-400">
              {s.k}
            </p>
          </RevealBox>
        ))}
      </div>
    </section>
  );
});