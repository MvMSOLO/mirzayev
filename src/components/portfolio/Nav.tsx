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
        className={`fixed top-0 w-full z-50 px-5 md:px-12 lg:px-32 flex justify-between items-center pointer-events-none transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#0d0c10]/90 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_0_rgba(255,69,0,0.08),0_8px_40px_rgba(0,0,0,0.6)]"
            : "py-6 mix-blend-difference"
        }`}
      >
        <motion.a
          href="#top"
          className="font-mono text-[11px] font-bold tracking-[0.2em] text-white pointer-events-auto uppercase"
          whileHover={{ scale: 1.06, x: 2 }}
          whileTap={{ scale: 0.93 }}
          transition={{ type: "spring", stiffness: 420, damping: 14 }}
          onMouseEnter={playHover}
          onClick={playClick}
        >
          {t("nav.handle")}
        </motion.a>

        <div className="flex gap-3 items-center pointer-events-auto">
          {/* Language toggle */}
          <motion.button
            onClick={() => {
              playClick();
              setLang(lang === "uz" ? "en" : "uz");
            }}
            onMouseEnter={playHover}
            aria-label="Toggle language"
            className="relative flex items-center gap-0.5 border border-white/20 px-2.5 py-1.5 text-[9px] uppercase tracking-[0.2em] font-bold text-white hover:border-accent/60 transition-all duration-300 cursor-pointer overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 420, damping: 14 }}
          >
            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/8 transition-colors duration-300" />
            <span className={`relative z-10 transition-colors duration-200 ${lang === "uz" ? "text-accent" : "opacity-35"}`}>UZ</span>
            <span className="relative z-10 opacity-20 mx-0.5">/</span>
            <span className={`relative z-10 transition-colors duration-200 ${lang === "en" ? "text-accent" : "opacity-35"}`}>EN</span>
          </motion.button>

          {/* Status pill */}
          <div className="hidden sm:flex items-center gap-2 text-white">
            <div className="relative">
              <div className="size-1.5 bg-accent rounded-full" />
              <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-60" />
            </div>
            <span className="text-[9px] uppercase tracking-[0.18em] opacity-60">{t("nav.status")}</span>
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
                    transition: { delay: (4 - i) * 0.04, duration: 0.38, ease: [0.76, 0, 0.24, 1] },
                  }}
                  transition={{ duration: 0.48, ease: [0.76, 0, 0.24, 1], delay: i * 0.055 }}
                  className="flex-1 bg-[#09080d] origin-top"
                />
              ))}
            </div>

            {/* Accent grid overlay */}
            <div className="absolute inset-0 bg-grid-blueprint opacity-[0.025] pointer-events-none" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, delay: 0.18 }}
              className="absolute inset-0 text-white flex flex-col justify-center px-6 md:px-[10vw]"
            >
              {/* Ambient glow */}
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40vw] h-[40vw] bg-accent/[0.04] blur-[100px] rounded-full pointer-events-none" />

              {/* Top corner label */}
              <div className="absolute top-6 left-6 md:left-[10vw] font-mono text-[9px] text-white/20 uppercase tracking-widest">
                {t("nav.handle")} // NAV_MATRIX
              </div>

              <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
                <ul className="space-y-3 md:space-y-5">
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
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.24, duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-8 max-w-xs"
                >
                  {/* Status panel */}
                  <div className="border border-white/[0.07] bg-white/[0.02] p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="relative">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-50" />
                      </div>
                      <span className="font-mono text-[9px] text-accent uppercase tracking-widest">
                        {t("nav.status")}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed font-mono">
                      Currently available for freelance projects & full-time roles starting 2026.
                    </p>
                  </div>

                  {/* Social links */}
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] text-white/25 uppercase tracking-widest block mb-3">// Social</span>
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
                        className="flex items-center justify-between group text-[10px] uppercase tracking-widest text-white/40 hover:text-accent transition-all duration-200 py-1"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                      </a>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      playClick();
                      toggleMute();
                    }}
                    onMouseEnter={playHover}
                    className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/35 hover:text-accent transition-colors self-start cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
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
      className="relative w-10 h-10 flex items-center justify-center border border-white/15 hover:border-accent/60 transition-all duration-300 cursor-pointer pointer-events-auto group overflow-hidden"
    >
      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/8 transition-colors duration-300" />
      <div className="relative w-4 h-4 flex flex-col justify-center items-center gap-[5px] z-10">
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 6 : 0,
            backgroundColor: isOpen ? "#ff4500" : "#ffffff",
            width: isOpen ? "100%" : "100%",
          }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="block h-[1.5px] w-full bg-white origin-center"
        />
        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -6 : 0,
            backgroundColor: isOpen ? "#ff4500" : "#ffffff",
          }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="block h-[1.5px] w-full bg-white origin-center"
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
        initial={{ y: "110%", rotateZ: 6, opacity: 0 }}
        animate={{ y: 0, rotateZ: 0, opacity: 1 }}
        exit={{ y: "-110%", rotateZ: -6, opacity: 0 }}
        transition={{
          duration: 0.58,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.08 + idx * 0.055,
        }}
        href={item.href}
        onClick={onClick}
        onMouseEnter={onHover}
        className="group flex items-center gap-6 font-display text-5xl md:text-7xl lg:text-[7vw] font-bold uppercase tracking-tighter leading-none hover:text-accent transition-colors duration-200 cursor-pointer"
      >
        <span className="text-[10px] font-mono tracking-widest text-white/25 group-hover:text-accent/50 transition-all duration-300 group-hover:translate-x-1 shrink-0">
          0{idx + 1}
        </span>
        <span className="relative overflow-hidden inline-flex">
          {item.label.split("").map((char: string, charIdx: number) => (
            <motion.span
              key={charIdx}
              className="inline-block"
              whileHover={{
                y: -16,
                scale: 1.15,
                color: "#ff4500",
                transition: { type: "spring", stiffness: 500, damping: 10 },
              }}
              style={{
                minWidth: char === " " ? "0.25em" : "auto",
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
