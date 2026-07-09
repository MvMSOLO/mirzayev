import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";

export function Philosophy() {
  const { t } = useLang();
  const steps = [
    { t: t("phi.1.t"), d: t("phi.1.d") },
    { t: t("phi.2.t"), d: t("phi.2.d") },
    { t: t("phi.3.t"), d: t("phi.3.d") },
    { t: t("phi.4.t"), d: t("phi.4.d") },
    { t: t("phi.5.t"), d: t("phi.5.d") },
  ];

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="philosophy"
      className="px-5 md:px-20 lg:px-32 py-24 border-b border-border relative overflow-hidden"
    >
      <div className="mb-10 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">{t("phi.tag")}</span>
      </div>
      <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-16 leading-[0.9]">
        {t("phi.title_a")} <br />
        <span className="text-accent">{t("phi.title_b")}</span>
      </h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-10 md:space-y-14 max-w-3xl"
      >
        {steps.map((s, i) => (
          <motion.div
            key={s.t}
            variants={itemVariants}
            className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-start border-t border-border pt-8"
          >
            <span className="font-display text-5xl md:text-7xl text-accent leading-none">
              0{i + 1}
            </span>
            <div>
              <h4 className="font-display text-2xl md:text-3xl uppercase tracking-tight mb-3">
                {s.t}
              </h4>
              <p className="text-sm text-white/60 leading-relaxed max-w-[50ch]">{s.d}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
