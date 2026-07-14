import { useLang } from "@/lib/i18n";
import { useUniverse } from "@/lib/universe";
import { motion, type Variants } from "framer-motion";
import { RevealBox, WordReveal, BlurReveal } from "./TextReveal";
import { KineticButton } from "./KineticButton";
import { useSound } from "@/hooks/useSound";

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

export function Contact() {
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
    hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <footer id="contact" className="px-5 md:px-20 lg:px-32 pt-16 pb-12 md:pt-24 md:pb-16 relative overflow-hidden border-t border-border">
      {/* Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent pointer-events-none" />

      {/* Background marquee */}
      <div className="absolute -bottom-16 left-0 whitespace-nowrap flex pointer-events-none select-none">
        <div className="flex animate-marquee-slow shrink-0">
          {[0, 1, 2].map((k) => (
            <span
              key={k}
              className="font-display text-[140px] md:text-[220px] leading-none uppercase pr-10 opacity-[0.04]"
            >
              AVAZBEK MIRZAYEV ·
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <RevealBox>
          <div className="mb-10 flex gap-2 items-center">
            <div className="h-[1px] w-8 bg-accent" />
            <span className="text-[10px] uppercase tracking-widest text-accent">
              {t("contact.tag")}
            </span>
          </div>

          <h2 className="font-display text-6xl md:text-9xl uppercase leading-[0.85] mb-6 tracking-tighter">
            <WordReveal text={t("contact.title_a")} sound /> <br />
            <span className="text-accent">
              <WordReveal text={t("contact.title_b")} delay={0.2} />
            </span>
          </h2>

          <p className="text-xs md:text-sm text-white/50 max-w-[52ch] mb-14">{t("contact.note")}</p>
        </RevealBox>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          {/* Social links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            <span className="text-[10px] uppercase text-white/40 tracking-widest mb-4 block">
              {t("contact.social")}
            </span>
            <ul className="divide-y divide-border">
              {social.map((s) => (
                <motion.li key={s.k} variants={itemVariants}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between py-4 group items-center relative overflow-hidden"
                    onMouseEnter={playHover}
                  >
                    <div className="absolute inset-0 bg-accent/5 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                    {/* Left accent bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-0 bg-accent group-hover:w-[2px] transition-all duration-300" />
                    <span className="text-sm uppercase font-bold group-hover:text-accent transition-colors relative z-10 group-hover:translate-x-3 duration-300">
                      {s.k}
                    </span>
                    <span className="text-sm text-white/50 group-hover:text-accent transition-colors flex items-center gap-2 relative z-10 group-hover:-translate-x-2 duration-300">
                      {s.v}
                      <motion.span
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{ x: [0, 2, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
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
            viewport={{ once: true, margin: "-10%" }}
          >
            <span className="text-[10px] uppercase text-white/40 tracking-widest mb-4 block">
              {t("contact.direct")}
            </span>
            <ul className="divide-y divide-border">
              {direct.map((s) => (
                <motion.li key={s.k} variants={itemVariants}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex justify-between py-4 group items-center relative overflow-hidden"
                    onMouseEnter={playHover}
                  >
                    <div className="absolute inset-0 bg-accent/5 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                    <div className="absolute left-0 top-0 bottom-0 w-0 bg-accent group-hover:w-[2px] transition-all duration-300" />
                    <span className="text-sm uppercase font-bold group-hover:text-accent transition-colors relative z-10 group-hover:translate-x-3 duration-300">
                      {s.k}
                    </span>
                    <span className="text-sm text-white/50 group-hover:text-accent transition-colors flex items-center gap-2 truncate max-w-[60%] relative z-10 group-hover:-translate-x-2 duration-300">
                      {s.v}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Status indicator */}
            <BlurReveal delay={0.3} className="mt-8 p-4 border border-border relative overflow-hidden group hover:border-accent/40 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-60" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
                    {t("nav.status")}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wide">
                    {t("nav.handle")} · Olmaliq, UZ
                  </p>
                </div>
              </div>
            </BlurReveal>
          </motion.div>
        </div>

        {/* Footer bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-border pt-8 flex flex-wrap justify-between items-center gap-4 text-[10px] uppercase tracking-widest font-mono"
        >
          <span className="opacity-40">© 2026 LABS-AM</span>
          <span className="opacity-40">Olmaliq · 40.9926° N, 69.5986° E</span>
          <div className="flex items-center gap-2">
            <span className="opacity-40">v6.0.0 · Kinetic Lab</span>
            <span className="text-white/20">·</span>
            <span className="text-accent/60">Designed & Built by Avazbek Mirzayev</span>
          </div>
        </motion.div>

        <RevealBox className="mt-14 flex justify-center">
          <KineticButton onClick={enter} primary>
            {t("uni.enter")}
            <span className="text-xl">↗</span>
          </KineticButton>
        </RevealBox>
      </div>
    </footer>
  );
}
