import { useEffect, useState, memo } from "react";
import { useLang } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useMagnetic } from "@/hooks/useMagnetic";
import { MusicPlayer } from "./MusicPlayer";
import { Volume2, VolumeX } from "lucide-react";

export const Nav = memo(function Nav() {
  const { lang, setLang, t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { playHover, playClick, playOpen, playClose, isMuted, toggleMute } = useSoundEffects();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleToggle = () => {
    if (isOpen) {
      playClose();
      setIsOpen(false);
    } else {
      playOpen();
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        playClose();
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, playClose]);

  const navItems = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.work"), href: "#work" },
    { label: "CYBER PLAYGROUND", href: "#cyber-lab" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.lab"), href: "#lab" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      <nav
        className={`fixed top-0 w-full z-50 px-5 md:px-12 lg:px-32 flex justify-between items-center pointer-events-none transition-all duration-700 ${
          scrolled
            ? "py-4 bg-[#08070b]/80 backdrop-blur-3xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)]"
            : "py-8 mix-blend-difference"
        }`}
      >
        <motion.a
          href="#top"
          className="font-mono text-[12px] font-bold tracking-[0.25em] text-white pointer-events-auto uppercase drop-shadow-md"
          whileHover={{ scale: 1.06, x: 2 }}
          whileTap={{ scale: 0.93 }}
          transition={{ type: "spring", stiffness: 420, damping: 14 }}
          onMouseEnter={playHover}
          onClick={playClick}
        >
          {t("nav.handle")}
        </motion.a>

        <div className="flex gap-4 items-center pointer-events-auto">
          {/* Language toggle */}
          <motion.button
            onClick={() => {
              playClick();
              setLang(lang === "uz" ? "en" : "uz");
            }}
            onMouseEnter={playHover}
            aria-label="Toggle language"
            className="relative flex items-center gap-1 glass-card border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.2em] font-bold text-white hover:border-[var(--cyan)]/60 transition-all duration-300 cursor-pointer overflow-hidden group rounded-md shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 420, damping: 14 }}
          >
            <div className="absolute inset-0 bg-[var(--cyan)]/0 group-hover:bg-[var(--cyan)]/10 transition-colors duration-300" />
            <span className={`relative z-10 transition-colors duration-200 ${lang === "uz" ? "text-[var(--cyan)] drop-shadow-[0_0_5px_rgba(0,212,255,0.6)]" : "opacity-40"}`}>UZ</span>
            <span className="relative z-10 opacity-20 mx-0.5">/</span>
            <span className={`relative z-10 transition-colors duration-200 ${lang === "en" ? "text-[var(--cyan)] drop-shadow-[0_0_5px_rgba(0,212,255,0.6)]" : "opacity-40"}`}>EN</span>
          </motion.button>

          {/* Status pill */}
          <div className="hidden sm:flex items-center gap-2.5 text-white glass-card px-3 py-2 border border-white/10 rounded-md">
            <div className="relative">
              <div className="size-2 bg-accent rounded-full" />
              <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-60" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-80 font-mono font-bold">{t("nav.status")}</span>
          </div>

          <MenuButton
            isOpen={isOpen}
            onClick={handleToggle}
            onHover={playHover}
            controls="kinetic-nav-menu"
          />
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div
            id="kinetic-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t("nav.handle")}
            className="fixed inset-0 z-40"
          >
            {/* Kinetic Strip Background */}
            <div className="absolute inset-0 flex">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{
                    scaleY: 0,
                    transition: { delay: (4 - i) * 0.04, duration: 0.4, ease: [0.76, 0, 0.24, 1] },
                  }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: i * 0.05 }}
                  className="flex-1 bg-[#08070b] origin-top border-r border-white/[0.02]"
                />
              ))}
            </div>

            {/* Accent grid overlay */}
            <div className="absolute inset-0 bg-grid-blueprint opacity-[0.03] pointer-events-none" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="absolute inset-0 text-white flex flex-col justify-center overflow-y-auto px-6 md:px-[10vw] py-24"
            >
              {/* Ambient glow */}
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[50vw] h-[50vw] bg-accent/[0.05] blur-[120px] rounded-full pointer-events-none" />

              {/* Top corner label */}
              <div className="absolute top-8 left-6 md:left-[10vw] font-mono text-[10px] text-[var(--cyan)]/40 uppercase tracking-[0.25em] font-bold">
                {t("nav.handle")} // NAV_MATRIX
              </div>

              <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-16">
                <ul className="space-y-4 md:space-y-6">
                  {navItems.map((item, idx) => (
                    <MagneticNavItem
                      key={item.label}
                      item={item}
                      idx={idx}
                      onClick={() => {
                        playClick();
                        setIsOpen(false);
                      }}
                      onHover={playHover}
                    />
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-6 md:gap-10 max-w-sm w-full md:w-auto"
                >
                  {/* Status panel */}
                  <div className="glass-dark border-gradient-cyan p-5 md:p-7 rounded-xl shadow-glow-cyan">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <div className="w-2 h-2 bg-[var(--cyan)] rounded-full" />
                        <div className="absolute inset-0 bg-[var(--cyan)] rounded-full animate-ping opacity-60" />
                      </div>
                      <span className="font-mono text-[10px] text-[var(--cyan)] uppercase tracking-[0.25em] font-bold">
                        {t("nav.status")}
                      </span>
                    </div>
                    <p className="text-sm text-white/70 leading-[1.8] font-sans font-light">
                      Currently available for freelance projects & full-time roles starting 2026. Let's build the future together.
                    </p>
                  </div>

                  {/* Social links */}
                  <div className="space-y-3">
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.25em] block mb-4 font-bold">// Social</span>
                    {[
                      { label: "Github", href: "https://github.com/MvMSOLO" },
                      { label: "LinkedIn", href: "https://linkedin.com/in/avazbek-mirzayev" },
                      { label: "YouTube", href: "https://youtube.com/@mvmsolo" },
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        onMouseEnter={playHover}
                        className="flex items-center justify-between group text-[12px] uppercase tracking-widest text-white/50 hover:text-accent transition-all duration-300 py-2 border-b border-white/10 hover:border-accent/40"
                      >
                        <span className="group-hover:translate-x-2 transition-transform duration-300 font-bold">{link.label}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-lg">↗</span>
                      </a>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      playClick();
                      toggleMute();
                    }}
                    onMouseEnter={playHover}
                    className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-accent transition-colors self-start cursor-pointer font-bold border border-white/10 glass-card px-4 py-2 rounded-md hover:border-accent/40"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    {isMuted ? t("sound.off") : t("sound.on")}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <MusicPlayer isMenuOpen={isOpen} />
    </>
  );
});

const MenuButton = memo(function MenuButton({
  isOpen,
  onClick,
  onHover,
  controls,
}: {
  isOpen: boolean;
  onClick: () => void;
  onHover: () => void;
  controls: string;
}) {
  const ref = useMagnetic<HTMLButtonElement>(0.4);

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseEnter={onHover}
      aria-expanded={isOpen}
      aria-controls={controls}
      aria-label="Toggle menu"
      className="relative w-12 h-12 flex items-center justify-center glass-card border border-white/15 hover:border-accent/80 transition-all duration-300 cursor-pointer pointer-events-auto group overflow-hidden rounded-md shadow-md"
    >
      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/15 transition-colors duration-300" />
      <div className="relative w-5 h-5 flex flex-col justify-center items-center gap-[6px] z-10">
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 7 : 0,
            backgroundColor: isOpen ? "#ff4500" : "#ffffff",
            width: isOpen ? "100%" : "100%",
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="block h-[2px] w-full bg-white origin-center rounded-full"
        />
        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -7 : 0,
            backgroundColor: isOpen ? "#ff4500" : "#ffffff",
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="block h-[2px] w-full bg-white origin-center rounded-full"
        />
      </div>
    </button>
  );
});

const MagneticNavItem = memo(function MagneticNavItem({
  item,
  idx,
  onClick,
  onHover,
}: {
  item: { label: string; href: string };
  idx: number;
  onClick: () => void;
  onHover: () => void;
}) {
  const ref = useMagnetic<HTMLAnchorElement>(0.2);

  return (
    <li className="overflow-hidden p-2 -m-2">
      <motion.a
        ref={ref}
        initial={{ y: "110%", rotateZ: 4, opacity: 0 }}
        animate={{ y: 0, rotateZ: 0, opacity: 1 }}
        exit={{ y: "-110%", rotateZ: -4, opacity: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.1 + idx * 0.06,
        }}
        href={item.href}
        onClick={onClick}
        onMouseEnter={onHover}
        className="group flex items-center gap-4 md:gap-8 font-display text-4xl sm:text-5xl md:text-8xl lg:text-[8vw] font-bold uppercase tracking-tighter leading-none hover:text-accent transition-colors duration-300 cursor-pointer drop-shadow-lg"
      >
        <span className="text-[12px] font-mono tracking-[0.25em] font-bold text-[var(--cyan)]/40 group-hover:text-[var(--cyan)] transition-all duration-300 group-hover:translate-x-3 shrink-0">
          0{idx + 1}
        </span>
        <span className="relative overflow-hidden inline-flex">
          {item.label.split("").map((char: string, charIdx: number) => (
            <motion.span
              key={charIdx}
              className="inline-block"
              whileHover={{
                y: -20,
                scale: 1.15,
                color: "#ff4500",
                transition: { type: "spring", stiffness: 500, damping: 10 },
              }}
              style={{
                minWidth: char === " " ? "0.3em" : "auto",
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      </motion.a>
    </li>
  );
});