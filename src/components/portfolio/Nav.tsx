import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useMagnetic } from "@/hooks/useMagnetic";
import { MusicPlayer } from "./MusicPlayer";
import { Volume2, VolumeX } from "lucide-react";

export function Nav() {
  const { lang, setLang, t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const { playHover, playClick, playOpen, playClose, isMuted, toggleMute } = useSoundEffects();

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
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.lab"), href: "#lab" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      <nav className="fixed top-0 w-full z-50 mix-blend-difference px-5 md:px-12 lg:px-32 py-6 flex justify-between items-center pointer-events-none">
        <motion.a
          href="#top"
          className="text-xs font-bold tracking-tighter text-white pointer-events-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={playHover}
          onClick={playClick}
        >
          {t("nav.handle")}
        </motion.a>

        <div className="flex gap-4 items-center pointer-events-auto">
          <motion.button
            onClick={() => {
              playClick();
              setLang(lang === "uz" ? "en" : "uz");
            }}
            onMouseEnter={playHover}
            aria-label="Toggle language"
            className="flex items-center gap-1 border border-white/30 px-2 py-1 text-[10px] uppercase tracking-widest font-bold text-white hover:bg-accent hover:border-accent transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={lang === "uz" ? "text-accent" : "opacity-40"}>UZ</span>
            <span className="opacity-30">/</span>
            <span className={lang === "en" ? "text-accent" : "opacity-40"}>EN</span>
          </motion.button>
          <div className="flex gap-2 items-center text-white hidden sm:flex">
            <div className="size-2 bg-accent animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest">{t("nav.status")}</span>
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
            {/* Kinetic Strips Background */}
            <div className="absolute inset-0 flex">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{
                    scaleY: 0,
                    transition: { delay: (4 - i) * 0.05, duration: 0.6, ease: [0.76, 0, 0.24, 1] },
                  }}
                  transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i * 0.07 }}
                  className="flex-1 bg-[#0a0a0a] origin-top border-r border-white/5 last:border-r-0"
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="absolute inset-0 text-white flex flex-col justify-center px-6 md:px-[10vw]"
            >
              {/* Ambient Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

              <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
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
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex flex-col gap-8 max-w-sm"
                >
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-white/50 mb-4 font-mono">
                      {t("nav.status")}
                    </h4>
                    <p className="text-sm text-white/80 leading-relaxed font-mono">
                      Currently available for freelance projects & full-time roles starting 2026.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <a
                      href="https://github.com/MvMSOLO"
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={playHover}
                      className="text-xs uppercase tracking-widest hover:text-accent transition-colors"
                    >
                      Github
                    </a>
                    <a
                      href="https://linkedin.com/in/avazbek-mirzayev"
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={playHover}
                      className="text-xs uppercase tracking-widest hover:text-accent transition-colors"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://youtube.com/@mvmsolo"
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={playHover}
                      className="text-xs uppercase tracking-widest hover:text-accent transition-colors"
                    >
                      YouTube
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      playClick();
                      toggleMute();
                    }}
                    onMouseEnter={playHover}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/50 hover:text-accent transition-colors self-start cursor-pointer"
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
}

function MenuButton({
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
      className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-accent transition-colors cursor-pointer pointer-events-auto"
    >
      <div className="relative w-5 h-5 flex flex-col justify-center items-center gap-[4px]">
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 5 : 0,
            backgroundColor: isOpen ? "var(--color-accent, #ea580c)" : "#ffffff",
          }}
          transition={{ duration: 0.4, ease: "backOut" }}
          className="block h-[2px] w-full bg-white origin-center"
        />
        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -5 : 0,
            backgroundColor: isOpen ? "var(--color-accent, #ea580c)" : "#ffffff",
          }}
          transition={{ duration: 0.4, ease: "backOut" }}
          className="block h-[2px] w-full bg-white origin-center"
        />
      </div>
    </button>
  );
}

function MagneticNavItem({
  item,
  idx,
  onClick,
  onHover,
}: {
  item: any;
  idx: number;
  onClick: () => void;
  onHover: () => void;
}) {
  const ref = useMagnetic<HTMLAnchorElement>(0.2);

  return (
    <li className="overflow-hidden p-2 -m-2">
      <motion.a
        ref={ref}
        initial={{ y: "110%", rotateZ: 8, opacity: 0 }}
        animate={{ y: 0, rotateZ: 0, opacity: 1 }}
        exit={{ y: "-110%", rotateZ: -8, opacity: 0 }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.15 + idx * 0.06,
        }}
        href={item.href}
        onClick={onClick}
        onMouseEnter={onHover}
        className="group flex items-center gap-6 text-5xl md:text-7xl lg:text-[7vw] font-bold uppercase tracking-tighter leading-none hover:text-accent transition-colors cursor-pointer"
        style={{ fontFamily: "var(--font-display, inherit)" }}
      >
        <span className="text-sm font-mono tracking-widest text-white/30 group-hover:text-accent/50 transition-colors group-hover:translate-x-2 duration-300">
          0{idx + 1}
        </span>

        {/* Dynamic letter splitting for bouncy spring wave hover effect */}
        <span className="relative overflow-hidden inline-flex">
          {item.label.split("").map((char: string, charIdx: number) => (
            <motion.span
              key={charIdx}
              className="inline-block"
              whileHover={{
                y: -12,
                scale: 1.12,
                color: "var(--color-accent, #ea580c)",
                transition: { type: "spring", stiffness: 400, damping: 8 }
              }}
              style={{ display: char === " " ? "inline-block" : "inline-block", minWidth: char === " " ? "0.25em" : "auto" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      </motion.a>
    </li>
  );
}
