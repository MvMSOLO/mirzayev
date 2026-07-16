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
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <footer
      id="contact"
      className="px-5 md:px-20 lg:px-32 pt-28 pb-16 md:pt-40 md:pb-24 relative overflow-hidden border-t border-white/[0.06] bg-[#0a090c]"
    >
      {/* Glow atmosphere */}
      <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-accent/[0.08] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--cyan)]/40 to-transparent pointer-events-none" />

      {/* Background marquee */}
      <div className="absolute -bottom-24 left-0 whitespace-nowrap flex pointer-events-none select-none">
        <div className="flex animate-marquee-slow shrink-0">
          {[0, 1, 2].map((k) => (
            <span
              key={k}
              className="font-display text-[160px] md:text-[250px] leading-none uppercase pr-10 opacity-[0.02]"
            >
              AVAZBEK MIRZAYEV ·
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <RevealBox>
          <div className="mb-14 flex gap-4 items-center">
            <div className="h-1 w-12 bg-gradient-to-r from-accent to-transparent rounded-full" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold text-accent drop-shadow-[0_0_8px_rgba(255,69,0,0.6)]">
              {t("contact.tag")}
            </span>
          </div>

          <h2 className="heading-hover font-display text-7xl md:text-9xl uppercase leading-[0.85] mb-8 tracking-tighter cursor-default text-white">
            <WordReveal text={t("contact.title_a")} sound /> <br />
            <span className="text-accent drop-shadow-[0_0_20px_rgba(255,69,0,0.4)]">
              <WordReveal text={t("contact.title_b")} delay={0.2} />
            </span>
          </h2>

          <p className="font-mono text-sm text-white/50 max-w-[55ch] mb-20 leading-[1.9] uppercase tracking-[0.2em] font-bold">
            {t("contact.note")}
          </p>
        </RevealBox>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-28">
          {/* Social links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            <span className="font-mono text-[11px] uppercase text-[var(--cyan)] font-bold tracking-[0.25em] mb-6 block border-b border-[var(--cyan)]/20 pb-3">
              {t("contact.social")}
            </span>
            <div className="grid gap-3">
              {social.map((s) => (
                <motion.li key={s.k} variants={itemVariants} className="list-none">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between px-6 py-5 group items-center relative overflow-hidden glass-dark border border-white/10 rounded-lg hover:border-accent/50 hover:shadow-glow-orange transition-all duration-400"
                    onMouseEnter={playHover}
                  >
                    {/* Background sweep */}
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 ease-out-expo" />
                    {/* Left bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-accent translate-x-[-4px] group-hover:translate-x-0 transition-transform duration-400 shadow-[0_0_10px_#ff4500]" />

                    <span className="font-display text-2xl uppercase tracking-tight text-white group-hover:text-accent transition-colors duration-300 relative z-10 group-hover:translate-x-4 transition-transform drop-shadow-md">
                      {s.k}
                    </span>
                    <span className="font-mono text-[12px] text-white/50 font-bold group-hover:text-white transition-colors duration-300 flex items-center gap-3 relative z-10 group-hover:-translate-x-2 transition-transform">
                      {s.v}
                      <motion.span
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-accent font-bold text-lg"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        ↗
                      </motion.span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </div>
          </motion.div>

          {/* Direct links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            <span className="font-mono text-[11px] uppercase text-[var(--cyan)] font-bold tracking-[0.25em] mb-6 block border-b border-[var(--cyan)]/20 pb-3">
              {t("contact.direct")}
            </span>
            <div className="grid gap-3">
              {direct.map((s) => (
                <motion.li key={s.k} variants={itemVariants} className="list-none">
                  <a
                    href={s.href}
                    target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex justify-between px-6 py-5 group items-center relative overflow-hidden glass-dark border border-white/10 rounded-lg hover:border-[var(--cyan)]/50 hover:shadow-glow-cyan transition-all duration-400"
                    onMouseEnter={playHover}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--cyan)]/10 to-transparent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 ease-out-expo" />
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[var(--cyan)] translate-x-[-4px] group-hover:translate-x-0 transition-transform duration-400 shadow-[0_0_10px_var(--cyan)]" />
                    <span className="font-display text-2xl uppercase tracking-tight text-white group-hover:text-[var(--cyan)] transition-colors duration-300 relative z-10 group-hover:translate-x-4 transition-transform drop-shadow-md">
                      {s.k}
                    </span>
                    <span className="font-mono text-[12px] text-white/50 font-bold group-hover:text-white transition-colors duration-300 flex items-center gap-3 truncate max-w-[60%] relative z-10 group-hover:-translate-x-2 transition-transform">
                      {s.v}
                      <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-400 ease-out-expo inline-block text-[var(--cyan)] font-bold text-lg">
                        ↗
                      </span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </div>

            {/* Status card */}
            <BlurReveal
              delay={0.4}
              className="mt-10 p-7 glass-card border-gradient-cyan relative overflow-hidden group hover:border-[var(--cyan)]/50 transition-all duration-500 rounded-xl shadow-md hover:shadow-glow-cyan"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyan)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 h-[2px] w-0 bg-[var(--cyan)] group-hover:w-full transition-all duration-700 shadow-[0_0_10px_var(--cyan)]" />

              <div className="flex items-center gap-5 relative z-10">
                <div className="relative shrink-0">
                  <div className="w-3 h-3 bg-[var(--cyan)] rounded-full shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
                  <div className="absolute inset-0 bg-[var(--cyan)] rounded-full animate-ping opacity-60" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--cyan)]/60 font-bold">
                    {t("nav.status")}
                  </p>
                  <p className="font-mono text-[12px] text-white font-bold uppercase tracking-widest mt-1 drop-shadow-sm">
                    {t("nav.handle")} · Olmaliq, UZ
                  </p>
                </div>
              </div>
            </BlurReveal>
          </motion.div>
        </div>

        {/* Footer bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-white/[0.08] pt-10 flex flex-wrap justify-between items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] font-bold"
        >
          <span className="text-white/40 glass-card px-4 py-2 rounded border border-white/10">© 2026 LABS-AM</span>
          <span className="text-[var(--cyan)]/50 hidden md:block">Olmaliq · 40.9926° N, 69.5986° E</span>
          <div className="flex items-center gap-3">
            <span className="text-white/40">v6.0.0 · Kinetic Lab</span>
            <span className="text-white/20">·</span>
            <span className="text-accent drop-shadow-[0_0_5px_rgba(255,69,0,0.4)]">Designed & Built by Avazbek Mirzayev</span>
          </div>
        </motion.div>

        <RevealBox className="mt-20 flex justify-center">
          <div className="scale-125">
            <KineticButton onClick={enter} primary>
              {t("uni.enter")}
              <span className="text-2xl font-bold ml-2">↗</span>
            </KineticButton>
          </div>
        </RevealBox>
      </div>
    </footer>
  );
});