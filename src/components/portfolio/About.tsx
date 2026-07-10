import portrait from "@/assets/portrait.jpg";
import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";
import { WordReveal, RevealBox, CountUp, BlurReveal } from "./TextReveal";
import { useSound } from "@/hooks/useSound";

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

export function About() {
  const { t, lang } = useLang();
  const { playHover } = useSound();

  return (
    <section
      id="about"
      className="px-5 md:px-20 lg:px-32 py-16 md:py-24 relative border-b border-border overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Decor */}
      <div className="absolute top-8 left-8 font-mono text-[8px] text-white/10 hidden lg:block vertical-text uppercase tracking-widest h-32 border-l border-white/10 pl-2">
        DATA_SCAN // BIO_METRICS // CORE_01
      </div>

      <RevealBox className="mb-12 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">{t("about.tag")}</span>
      </RevealBox>

      <div className="grid md:grid-cols-2 gap-12 items-start relative">
        {/* Portrait */}
        <RevealBox>
          <div className="relative w-56 md:w-80 aspect-[3/4] bg-neutral-900 border border-white/10 overflow-hidden animate-float shadow-[0_0_50px_rgba(255,69,0,0.05)] group">
            <img
              src={portrait}
              alt="Avazbek Mirzayev portrait"
              width={800}
              height={1000}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent pointer-events-none" />

            {/* Scanning effect */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_15px_#ff4500] animate-[scan-y_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Corner brackets on hover */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute bottom-2 left-2 font-mono text-[8px] text-white/40 opacity-0 group-hover:opacity-100 transition-opacity">
              STATUS: SCANNING_IDENT...
            </div>

            {/* Glowing border on hover */}
            <div className="absolute inset-0 border border-accent/0 group-hover:border-accent/30 transition-all duration-500 shadow-[inset_0_0_20px_rgba(255,69,0,0)] group-hover:shadow-[inset_0_0_20px_rgba(255,69,0,0.1)]" />
          </div>

          {/* Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
            whileHover={{ rotate: 3, scale: 1.05 }}
            className="absolute -bottom-4 -right-2 md:-right-6 bg-accent p-4 z-30 cursor-default"
            onMouseEnter={playHover}
          >
            <span className="text-xs font-bold leading-none block uppercase text-background">
              {t("about.badge")}
            </span>
          </motion.div>

          <div className="absolute -top-3 -left-3 bg-background border border-white/20 px-2 py-1 text-[9px] uppercase tracking-widest">
            Portrait_01
          </div>
        </RevealBox>

        {/* Text content */}
        <div className="space-y-6">
          <h3 className="text-lg md:text-xl leading-snug font-display tracking-tight text-white/90">
            <WordReveal text={t("about.p1_pre")} sound />
            <span className="text-accent inline-block mx-1">
              <WordReveal text="Avazbek Mirzayev" delay={0.2} />
            </span>
            <WordReveal text={t("about.p1_post")} delay={0.4} />
          </h3>
          <p className="text-sm text-white/60 leading-relaxed">
            <WordReveal text={t("about.p2")} delay={0.6} />
          </p>

          {/* Tags */}
          <RevealBox delay={0.8} className="flex flex-wrap gap-2 pt-4">
            {["React/TS", "Next.js", "Python", "Node.js", "AI", "UI/UX"].map((tag) => (
              <motion.span
                key={tag}
                whileHover={{
                  scale: 1.08,
                  borderColor: "var(--accent)",
                  color: "var(--accent)",
                  boxShadow: "0 0 15px rgba(255,69,0,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-2 py-1 border border-border text-[10px] uppercase tracking-widest transition-colors cursor-default relative overflow-hidden group"
                onMouseEnter={playHover}
              >
                <span className="relative z-10">{tag}</span>
                <span className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.span>
            ))}
          </RevealBox>

          {/* Ecosystem Matrix Diagram */}
          <div className="pt-6 border-t border-white/5">
            <span className="text-[10px] uppercase text-accent/60 tracking-widest block mb-4 font-mono">
              // ECOSYSTEM SCHEMATIC (VISUAL FLOW)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
              {/* Central laser cross lines for styling */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 pointer-events-none hidden sm:block" />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-accent/0 via-accent/20 to-accent/0 pointer-events-none hidden sm:block" />

              {ecosystemNodes.map((node) => (
                <div
                  key={node.id}
                  className="p-4 border border-border bg-background/50 hover:border-accent/40 hover:bg-accent/2 transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-mono text-accent/60 group-hover:text-accent font-bold">
                      [{node.num}]
                    </span>
                    <span className="text-[8px] font-mono text-white/20 group-hover:text-white/40 transition-colors uppercase tracking-widest animate-pulse">
                      flow_active
                    </span>
                  </div>
                  <h4 className="font-display text-sm uppercase tracking-wider text-white/90 group-hover:text-accent transition-colors">
                    {node.title[lang]}
                  </h4>
                  <p className="text-[10px] font-mono text-white/40 mb-2">
                    {node.subtitle[lang]}
                  </p>
                  <p className="text-[11px] text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                    {node.desc[lang]}
                  </p>

                  {/* Glowing accent border top-left */}
                  <div className="absolute top-0 left-0 w-2 h-[1px] bg-accent/0 group-hover:bg-accent transition-colors" />
                  <div className="absolute top-0 left-0 h-2 w-[1px] bg-accent/0 group-hover:bg-accent transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats with CountUp */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-16">
        {[
          { k: t("about.age.k"), v: 16, suffix: "" },
          { k: t("about.projects.k"), v: 50, suffix: "+" },
          { k: t("about.years.k"), v: 5, suffix: "" },
          { k: t("about.location.k"), raw: "UZ" },
        ].map((s, i) => (
          <RevealBox
            key={s.k}
            delay={0.2 * i}
            className="border border-border p-4 group hover:border-accent transition-colors relative overflow-hidden cursor-default"
          >
            {/* Hover fill */}
            <div className="absolute inset-0 bg-accent/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[16px] border-l-transparent border-t-[16px] border-t-accent/20 group-hover:border-t-accent/50 transition-colors" />

            <p className="font-display text-4xl md:text-5xl leading-none text-accent relative z-10">
              {s.raw ? (
                s.raw
              ) : (
                <CountUp end={s.v!} suffix={s.suffix} />
              )}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mt-3 relative z-10 group-hover:text-white/80 transition-colors">
              {s.k}
            </p>

            {/* Glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_20px_rgba(255,69,0,0.05)]" />
          </RevealBox>
        ))}
      </div>
    </section>
  );
}
