import { useLang } from "@/lib/i18n";
import { useUniverse } from "@/lib/universe";
import { LiquidButton } from "./LiquidButton";
import { motion, type Variants } from "framer-motion";

const socials = [
  { k: "Telegram", href: "https://t.me/axz_foto" },
  { k: "Instagram", href: "https://www.instagram.com/mvmsolo" },
  { k: "YouTube", href: "https://www.youtube.com/@mvmsolo" },
  { k: "GitHub", href: "https://github.com/MvMSOLO" },
  { k: "Email", href: "mailto:mirzayevavazbek15@gmail.com" },
];

export function UniverseFooter() {
  const { t } = useLang();
  const { exit } = useUniverse();

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <footer id="uni-contact" className="px-6 md:px-[8vw] py-[15vh] border-t border-[#111]/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="text-[11px] uppercase tracking-[0.4em] text-[#111]/50 mb-8 font-mono">
            — {t("contact.tag")}
          </div>
          <h2
            className="italic text-[#111] leading-[0.85] mb-12"
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontSize: "clamp(56px, 10vw, 160px)",
            }}
          >
            let's create <br /> something <br /> legendary.
          </h2>
          <p
            className="max-w-[40ch] text-[#111]/70 text-lg md:text-xl leading-relaxed mb-12"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            {t("uni.footer.note")}
          </p>
          <LiquidButton primary href="mailto:mirzayevavazbek15@gmail.com">
            {t("contact.title_a")} {t("contact.title_b")}
          </LiquidButton>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:justify-self-end"
        >
          <div className="text-[11px] uppercase tracking-[0.4em] text-[#111]/50 mb-8 font-mono">
            — {t("contact.social")}
          </div>
          <ul className="space-y-4">
            {socials.map((s) => (
              <motion.li key={s.k} variants={itemVariants}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline gap-4 italic text-4xl md:text-6xl text-[#111]/40 hover:text-[#111] transition-all duration-500"
                  style={{ fontFamily: '"Instrument Serif", serif' }}
                >
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#C7D9C1] opacity-0 group-hover:opacity-100 transition-opacity">
                    connect_
                  </span>
                  {s.k}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-32 flex flex-col md:flex-row items-center justify-between gap-10 border-t border-[#111]/10 pt-12"
      >
        <div className="text-[10px] uppercase tracking-[0.3em] text-[#111]/40 font-mono text-center md:text-left leading-relaxed">
          © 2026 avazbek mirzayev · all rights reserved <br className="md:hidden" /> · olmaliq
          40.9926° N, 69.7431° E
        </div>
        <div className="flex items-center gap-8">
          <button
            onClick={exit}
            className="text-[11px] uppercase tracking-[0.4em] text-[#111]/60 hover:text-[#111] border-b border-[#111]/20 pb-1 cursor-pointer transition-colors"
          >
            {t("uni.exit")}
          </button>
        </div>
      </motion.div>
    </footer>
  );
}
