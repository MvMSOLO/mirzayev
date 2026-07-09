import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";

export function UniverseManifesto() {
  const { t } = useLang();
  return (
    <section className="px-6 md:px-[12vw] py-[20vh] relative overflow-hidden bg-[#111]">
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-[11px] uppercase tracking-[0.4em] text-white/30 mb-10 font-mono"
        >
          — manifesto
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="italic text-[#F9F6F0] leading-[1.1] max-w-[18ch] md:max-w-[25ch]"
          style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(36px, 6vw, 90px)" }}
        >
          {t("uni.manifesto")}
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 h-[1px] w-48 bg-[#C7D9C1]/30 origin-left"
        />
      </div>

      {/* Decorative text */}
      <motion.div
        initial={{ opacity: 0, x: "50%" }}
        whileInView={{ opacity: 0.03, x: "33%" }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="absolute top-1/2 right-0 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none hidden lg:block"
      >
        <span
          className="italic text-[40vw] text-white leading-none"
          style={{ fontFamily: '"Instrument Serif", serif' }}
        >
          Alchemist
        </span>
      </motion.div>
    </section>
  );
}
