import portrait from "@/assets/portrait.jpg";
import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";
import { WordReveal, RevealBox } from "./TextReveal";

export function About() {
  const { t } = useLang();

  return (
    <section
      id="about"
      className="px-5 md:px-20 lg:px-32 py-24 relative border-b border-border overflow-hidden"
    >
      {/* Section Decor */}
      <div className="absolute top-8 left-8 font-mono text-[8px] text-white/10 hidden lg:block vertical-text uppercase tracking-widest h-32 border-l border-white/10 pl-2">
        DATA_SCAN // BIO_METRICS // CORE_01
      </div>

      <RevealBox className="mb-12 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">{t("about.tag")}</span>
      </RevealBox>

      <div className="grid md:grid-cols-2 gap-12 items-start relative">
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

            {/* Portrait Scanning Effect */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-accent/50 shadow-[0_0_10px_#ff4500] animate-[scan-y_4s_linear_infinite] opacity-0 group-hover:opacity-100" />

            <div className="absolute bottom-2 left-2 font-mono text-[8px] text-white/40 opacity-0 group-hover:opacity-100 transition-opacity">
              STATUS: SCANNING_IDENT...
            </div>
          </div>
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
            className="absolute -bottom-4 -right-2 md:-right-6 bg-accent p-4 z-30"
          >
            <span className="text-xs font-bold leading-none block uppercase text-background">
              {t("about.badge")}
            </span>
          </motion.div>
          <div className="absolute -top-3 -left-3 bg-background border border-white/20 px-2 py-1 text-[9px] uppercase tracking-widest">
            Portrait_01
          </div>
        </RevealBox>

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
          <RevealBox delay={0.8} className="flex flex-wrap gap-2 pt-4">
            {["React/TS", "Next.js", "Python", "Node.js", "AI", "UI/UX"].map((tag, i) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05, borderColor: "var(--accent)", color: "var(--accent)" }}
                className="px-2 py-1 border border-border text-[10px] uppercase tracking-widest transition-colors cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </RevealBox>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-16">
        {[
          { k: t("about.age.k"), v: "16" },
          { k: t("about.projects.k"), v: "50+" },
          { k: t("about.years.k"), v: "05" },
          { k: t("about.location.k"), v: "UZ" },
        ].map((s, i) => (
          <RevealBox
            key={s.k}
            delay={0.2 * i}
            className="border border-border p-4 group hover:border-accent transition-colors relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-accent/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <p className="font-display text-4xl md:text-5xl leading-none text-accent relative z-10">
              {s.v}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mt-3 relative z-10 group-hover:text-white/80 transition-colors">
              {s.k}
            </p>
          </RevealBox>
        ))}
      </div>
    </section>
  );
}
