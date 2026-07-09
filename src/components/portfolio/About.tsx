import portrait from "@/assets/portrait.jpg";
import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";

export function About() {
  const { t } = useLang();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="px-5 md:px-20 lg:px-32 py-24 relative border-b border-border overflow-hidden"
    >
      {/* Section Decor */}
      <div className="absolute top-8 left-8 font-mono text-[8px] text-white/10 hidden lg:block vertical-text uppercase tracking-widest h-32 border-l border-white/10 pl-2">
        DATA_SCAN // BIO_METRICS // CORE_01
      </div>

      <div className="mb-12 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">{t("about.tag")}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative w-56 md:w-80 aspect-[3/4] bg-neutral-900 border border-white/10 overflow-hidden animate-float shadow-[0_0_50px_rgba(255,69,0,0.05)] group">
            <img
              src={portrait}
              alt="Avazbek Mirzayev portrait"
              width={800}
              height={1000}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent pointer-events-none" />

            {/* Portrait Scanning Effect */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-accent/50 shadow-[0_0_10px_#ff4500] animate-[scan-y_4s_linear_infinite] opacity-0 group-hover:opacity-100" />

            <div className="absolute bottom-2 left-2 font-mono text-[8px] text-white/40 opacity-0 group-hover:opacity-100 transition-opacity">
              STATUS: SCANNING_IDENT...
            </div>
          </div>
          <div className="absolute -bottom-4 -right-2 md:-right-6 bg-accent p-4 z-30 rotate-[-3deg]">
            <span className="text-xs font-bold leading-none block uppercase">
              {t("about.badge")}
            </span>
          </div>
          <div className="absolute -top-3 -left-3 bg-background border border-white/20 px-2 py-1 text-[9px] uppercase tracking-widest">
            Portrait_01
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.p variants={itemVariants} className="text-lg md:text-xl leading-snug">
            {t("about.p1_pre")}
            <span className="text-accent">Avazbek Mirzayev</span>
            {t("about.p1_post")}
          </motion.p>
          <motion.p variants={itemVariants} className="text-sm text-white/60 leading-relaxed">
            {t("about.p2")}
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-4">
            {["React/TS", "Next.js", "Python", "Node.js", "AI", "UI/UX"].map((t) => (
              <span
                key={t}
                className="px-2 py-1 border border-border text-[10px] uppercase tracking-widest"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-16"
      >
        {[
          { k: t("about.age.k"), v: "16" },
          { k: t("about.projects.k"), v: "50+" },
          { k: t("about.years.k"), v: "05" },
          { k: t("about.location.k"), v: "UZ" },
        ].map((s) => (
          <motion.div key={s.k} variants={itemVariants} className="border border-border p-4">
            <p className="font-display text-4xl md:text-5xl leading-none text-accent">{s.v}</p>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mt-3">{s.k}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
