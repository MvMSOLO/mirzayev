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
      className="px-5 md:px-20 lg:px-32 py-20 md:py-32 relative border-b border-white/[0.06] overflow-hidden"
    >
      {/* Background atmosphere */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[200px] bg-accent/[0.025] blur-[80px] pointer-events-none" />

      {/* Vertical side label */}
      <div className="absolute top-12 left-4 font-mono text-[7px] text-white/[0.08] hidden lg:block vertical-text uppercase tracking-[0.3em] h-40 border-l border-white/[0.06] pl-2">
        BIO_METRICS // SCAN_01
      </div>

      {/* Section tag */}
      <RevealBox className="mb-14 flex gap-3 items-center">
        <div className="h-px w-10 bg-accent" />
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-accent">{t("about.tag")}</span>
      </RevealBox>

      <div className="grid md:grid-cols-2 gap-16 items-start relative">
        {/* Portrait column */}
        <RevealBox>
          <div className="relative inline-block">
            {/* Portrait frame */}
            <div className="relative w-52 md:w-72 aspect-[3/4] bg-neutral-900 border border-white/[0.08] overflow-hidden animate-float shadow-[0_0_80px_rgba(255,69,0,0.1),0_40px_80px_rgba(0,0,0,0.8)] group">
              <img
                src={portrait}
                alt="Avazbek Mirzayev portrait"
                width={800}
                height={1000}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                loading="lazy"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/8 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />

              {/* Scan line on hover */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_12px_#ff4500] animate-[scan-y_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-5 h-5 border-t border-l border-accent/0 group-hover:border-accent/70 transition-all duration-500" />
              <div className="absolute top-2 right-2 w-5 h-5 border-t border-r border-accent/0 group-hover:border-accent/70 transition-all duration-500" />
              <div className="absolute bottom-2 left-2 w-5 h-5 border-b border-l border-accent/0 group-hover:border-accent/70 transition-all duration-500" />
              <div className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-accent/0 group-hover:border-accent/70 transition-all duration-500" />

              {/* Status label */}
              <div className="absolute bottom-3 left-3 font-mono text-[7px] text-white/0 group-hover:text-white/50 transition-colors duration-500 uppercase tracking-widest">
                IDENT_SCANNING...
              </div>

              {/* Inset glow border */}
              <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,69,0,0)] group-hover:shadow-[inset_0_0_0_1px_rgba(255,69,0,0.2)] transition-all duration-700" />
            </div>

            {/* Age badge */}
            <motion.div
              initial={{ scale: 0, rotate: -20, opacity: 0 }}
              whileInView={{ scale: 1, rotate: -4, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 20 }}
              whileHover={{ rotate: 4, scale: 1.08 }}
              className="absolute -bottom-5 -right-4 md:-right-8 bg-accent px-5 py-3 z-30 cursor-default shadow-[0_8px_30px_rgba(255,69,0,0.4)]"
              onMouseEnter={playHover}
            >
              <span className="text-xs font-bold leading-none block uppercase text-background tracking-wider">
                {t("about.badge")}
              </span>
            </motion.div>

            {/* Portrait label */}
            <div className="absolute -top-3 -left-3 bg-background border border-white/15 px-2 py-1 text-[8px] uppercase tracking-widest font-mono text-white/40">
              Portrait_01
            </div>
          </div>
        </RevealBox>

        {/* Text content */}
        <div className="space-y-7">
          <h3 className="text-lg md:text-xl leading-snug font-display tracking-tight text-white/90">
            <WordReveal text={t("about.p1_pre")} sound />
            <span className="text-accent inline-block mx-1">
              <WordReveal text="Avazbek Mirzayev" delay={0.2} />
            </span>
            <WordReveal text={t("about.p1_post")} delay={0.4} />
          </h3>

          <p className="text-sm text-white/55 leading-[1.9]">
            <WordReveal text={t("about.p2")} delay={0.6} />
          </p>

          {/* Tech tags */}
          <RevealBox delay={0.8} className="flex flex-wrap gap-2 pt-2">
            {["React/TS", "Next.js", "Python", "Node.js", "AI", "UI/UX"].map((tag) => (
              <motion.span
                key={tag}
                whileHover={{
                  scale: 1.06,
                  borderColor: "rgba(255,69,0,0.6)",
                  color: "#ff4500",
                  boxShadow: "0 0 16px rgba(255,69,0,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 border border-white/[0.1] text-[9px] uppercase tracking-[0.18em] font-mono transition-colors cursor-default relative overflow-hidden group"
                onMouseEnter={playHover}
              >
                <span className="relative z-10">{tag}</span>
                <span className="absolute inset-0 bg-accent/8 translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
              </motion.span>
            ))}
          </RevealBox>

          {/* Ecosystem schematic */}
          <div className="pt-6 border-t border-white/[0.06]">
            <span className="font-mono text-[9px] uppercase text-accent/50 tracking-[0.2em] block mb-5">
              // ECOSYSTEM_SCHEMATIC
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 relative">
              {/* Cross lines */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-accent/0 via-accent/15 to-accent/0 pointer-events-none hidden sm:block" />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-accent/0 via-accent/15 to-accent/0 pointer-events-none hidden sm:block" />

              {ecosystemNodes.map((node) => (
                <motion.div
                  key={node.id}
                  whileHover={{ borderColor: "rgba(255,69,0,0.3)", backgroundColor: "rgba(255,69,0,0.025)" }}
                  transition={{ duration: 0.2 }}
                  className="p-4 border border-white/[0.06] bg-white/[0.015] relative group overflow-hidden cursor-default"
                >
                  {/* Top-left accent corner */}
                  <div className="absolute top-0 left-0 w-3 h-px bg-accent/0 group-hover:bg-accent/60 transition-colors duration-300" />
                  <div className="absolute top-0 left-0 h-3 w-px bg-accent/0 group-hover:bg-accent/60 transition-colors duration-300" />

                  <div className="flex justify-between items-start mb-2.5">
                    <span className="font-mono text-[9px] text-accent/50 group-hover:text-accent transition-colors font-bold">
                      [{node.num}]
                    </span>
                    <span className="font-mono text-[7px] text-white/15 group-hover:text-white/30 transition-colors uppercase tracking-widest">
                      ACTIVE
                    </span>
                  </div>
                  <h4 className="font-display text-sm uppercase tracking-wider text-white/85 group-hover:text-accent transition-colors duration-300 mb-1">
                    {node.title[lang]}
                  </h4>
                  <p className="font-mono text-[9px] text-white/35 mb-2">{node.subtitle[lang]}</p>
                  <p className="text-[11px] text-white/45 leading-relaxed group-hover:text-white/65 transition-colors duration-300">
                    {node.desc[lang]}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-20">
        {[
          { k: t("about.age.k"), v: 16, suffix: "" },
          { k: t("about.projects.k"), v: 50, suffix: "+" },
          { k: t("about.years.k"), v: 5, suffix: "" },
          { k: t("about.location.k"), raw: "UZ" },
        ].map((s, i) => (
          <RevealBox
            key={s.k}
            delay={0.07 * i}
            className="border border-white/[0.07] p-6 group hover:border-accent/50 transition-all duration-300 relative overflow-hidden cursor-default bg-white/[0.01] backdrop-blur-sm"
          >
            {/* Hover fill */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.06] to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[14px] border-l-transparent border-t-[14px] border-t-accent/15 group-hover:border-t-accent/40 transition-colors duration-300" />

            <p
              className="font-display text-5xl md:text-6xl leading-none text-accent relative z-10 mb-1"
              style={{ textShadow: "0 0 40px rgba(255,69,0,0.25)" }}
            >
              {s.raw ? s.raw : <CountUp end={s.v!} suffix={s.suffix} />}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35 relative z-10 group-hover:text-white/70 transition-colors duration-300">
              {s.k}
            </p>
          </RevealBox>
        ))}
      </div>
    </section>
  );
});
