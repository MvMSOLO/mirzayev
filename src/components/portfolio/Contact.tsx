import { useLang } from "@/lib/i18n";
import { useUniverse } from "@/lib/universe";
import { motion, type Variants } from "framer-motion";
import { RevealBox, WordReveal, BlurReveal } from "./TextReveal";
import { KineticButton } from "./KineticButton";
import { useSound } from "@/hooks/useSound";
import { memo } from "react";

const social = [
  { k: "Telegram", v: "@axz_foto", href: "https://t.me/axz_foto" },
  { k: "Instagram", v: "@mvmsolo", href: "https://www.instagram.com/mvmsolo" },
  { k: "YouTube", v: "@mvmsolo", href: "https://www.youtube.com/@mvmsolo" },
  { k: "TikTok", v: "@mvmsolo", href: "https://www.tiktok.com/@mvmsolo" },
  { k: "X", v: "@mvmsolo", href: "https://x.com/mvmsolo" },
  { k: "Discord", v: "@mvmsolo", href: "https://discord.com/users/mvmsolo" },
];

const direct = [
  { k: "Email", v: "mirzayevavazbek15@gmail.com", href: "mailto:mirzayevavazbek15@gmail.com" },
  { k: "GitHub", v: "MvMSOLO", href: "https://github.com/MvMSOLO" },
];

export const Contact = memo(function Contact() {
  const { t } = useLang();
  const { enter } = useUniverse();
  const { playHover } = useSound();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.055 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <footer
      id="contact"
      className="px-5 md:px-20 lg:px-32 pt-20 pb-14 md:pt-32 md:pb-20 relative overflow-hidden border-t border-white/[0.06]"
    >
      {/* Glow atmosphere */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-accent/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent pointer-events-none" />

      {/* Background marquee */}
      <div className="absolute -bottom-20 left-0 whitespace-nowrap flex pointer-events-none select-none">
        <div className="flex animate-marquee-slow shrink-0">
          {[0, 1, 2].map((k) => (
            <span
              key={k}
              className="font-display text-[130px] md:text-[200px] leading-none uppercase pr-10 opacity-[0.035]"
            >
              AVAZBEK MIRZAYEV ·
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <RevealBox>
          <div className="mb-12 flex gap-3 items-center">
            <div className="h-px w-10 bg-accent" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-accent">
              {t("contact.tag")}
            </span>
          </div>

          <h2 className="heading-hover font-display text-6xl md:text-9xl uppercase leading-[0.85] mb-7 tracking-tighter cursor-default">
            <WordReveal text={t("contact.title_a")} sound /> <br />
            <span className="text-accent">
              <WordReveal text={t("contact.title_b")} delay={0.2} />
            </span>
          </h2>

          <p className="font-mono text-xs text-white/40 max-w-[52ch] mb-16 leading-[1.9] uppercase tracking-wide">
            {t("contact.note")}
          </p>
        </RevealBox>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          {/* Social links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-8%" }}
          >
            <span className="font-mono text-[9px] uppercase text-white/30 tracking-[0.2em] mb-5 block">
              {t("contact.social")}
            </span>
            <ul className="divide-y divide-white/[0.06]">
              {social.map((s) => (
                <motion.li key={s.k} variants={itemVariants}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between py-4 group items-center relative overflow-hidden"
                    onMouseEnter={playHover}
                  >
                    {/* Background sweep */}
                    <div className="absolute inset-0 bg-accent/[0.04] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-250" />
                    {/* Left bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-0 bg-accent group-hover:w-[2px] transition-all duration-250" />

                    <span className="font-display text-sm uppercase font-bold tracking-tight group-hover:text-accent transition-colors duration-200 relative z-10 group-hover:translate-x-3 transition-transform duration-250">
                      {s.k}
                    </span>
                    <span className="font-mono text-[11px] text-white/40 group-hover:text-accent transition-colors duration-200 flex items-center gap-2 relative z-10 group-hover:-translate-x-2 transition-transform duration-250">
                      {s.v}
                      <motion.span
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        animate={{ x: [0, 2, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                      >
                        ↗
                      </motion.span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Direct links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-8%" }}
          >
            <span className="font-mono text-[9px] uppercase text-white/30 tracking-[0.2em] mb-5 block">
              {t("contact.direct")}
            </span>
            <ul className="divide-y divide-white/[0.06]">
              {direct.map((s) => (
                <motion.li key={s.k} variants={itemVariants}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex justify-between py-4 group items-center relative overflow-hidden"
                    onMouseEnter={playHover}
                  >
                    <div className="absolute inset-0 bg-accent/[0.04] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-250" />
                    <div className="absolute left-0 top-0 bottom-0 w-0 bg-accent group-hover:w-[2px] transition-all duration-250" />
                    <span className="font-display text-sm uppercase font-bold tracking-tight group-hover:text-accent transition-colors duration-200 relative z-10 group-hover:translate-x-3 transition-transform duration-250">
                      {s.k}
                    </span>
                    <span className="font-mono text-[11px] text-white/40 group-hover:text-accent transition-colors duration-200 flex items-center gap-2 truncate max-w-[60%] relative z-10 group-hover:-translate-x-2 transition-transform duration-250">
                      {s.v}
                      <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-250 ease-[cubic-bezier(0.34,1.56,0.64,1)] inline-block">
                        ↗
                      </span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Status card */}
            <BlurReveal
              delay={0.3}
              className="mt-8 p-5 border border-white/[0.07] relative overflow-hidden group hover:border-accent/35 transition-all duration-350"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
              <div className="absolute top-0 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-500" />

              <div className="flex items-center gap-4 relative z-10">
                <div className="relative shrink-0">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-55" />
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                    {t("nav.status")}
                  </p>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-wide mt-0.5">
                    {t("nav.handle")} · Olmaliq, UZ
                  </p>
                </div>
              </div>
            </BlurReveal>
          </motion.div>
        </div>

        {/* Footer bottom */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-white/[0.07] pt-8 flex flex-wrap justify-between items-center gap-4 font-mono text-[9px] uppercase tracking-[0.18em]"
        >
          <span className="text-white/25">© 2026 LABS-AM</span>
          <span className="text-white/20 hidden md:block">Olmaliq · 40.9926° N, 69.5986° E</span>
          <div className="flex items-center gap-2.5">
            <span className="text-white/25">v6.0.0 · Kinetic Lab</span>
            <span className="text-white/15">·</span>
            <span className="text-accent/55">Designed & Built by Avazbek Mirzayev</span>
          </div>
        </motion.div>

        <RevealBox className="mt-16 flex justify-center">
          <KineticButton onClick={enter} primary>
            {t("uni.enter")}
            <span className="text-xl">↗</span>
          </KineticButton>
        </RevealBox>
      </div>
    </footer>
  );
});
