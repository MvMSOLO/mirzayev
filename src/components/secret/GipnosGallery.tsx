import { useEffect, useMemo, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Shuffle, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { useSound } from "@/hooks/useSound";
import { ILLUSIONS } from "@/components/illusions/registry";

interface GipnosGalleryProps {
  open: boolean;
  onClose: () => void;
}

const COPY = {
  title: { uz: "GIPNOZ", en: "GIPNOS" },
  subtitle: {
    uz: "22+ optik illyuziya. Har biri boshqacha ishlaydi — bir xil natija yo'q.",
    en: "22+ optical illusions. Each one works differently — no two outcomes alike.",
  },
  warn: {
    uz: "Agar bosh aylanish yoki harakat kasalligiga moyil bo'lsangiz, ehtiyot bo'ling.",
    en: "If you're sensitive to motion or dizziness, proceed with care.",
  },
  reduced: {
    uz: "Tizimingiz 'kam harakat' rejimida — animatsiyalar sekinlashtirilgan.",
    en: "Your system prefers reduced motion — animations are toned down.",
  },
  back: { uz: "Galereyaga qaytish", en: "Back to gallery" },
  random: { uz: "Tasodifiy", en: "Random" },
  esc: { uz: "ESC — chiqish", en: "ESC — exit" },
} as const;

export function GipnosGallery({ open, onClose }: GipnosGalleryProps) {
  const { lang } = useLang();
  const { playOpen, playClose, playClick, playHover } = useSound();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (open) {
      playOpen();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setActiveIndex(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const openViewer = useCallback(
    (i: number) => {
      playClick();
      setActiveIndex(i);
      setElapsed(0);
    },
    [playClick],
  );

  const closeViewer = useCallback(() => {
    playClick();
    setActiveIndex(null);
  }, [playClick]);

  const goto = useCallback(
    (dir: 1 | -1) => {
      playClick();
      setActiveIndex((prev) => {
        if (prev === null) return prev;
        const next = (prev + dir + ILLUSIONS.length) % ILLUSIONS.length;
        setElapsed(0);
        return next;
      });
    },
    [playClick],
  );

  const random = useCallback(() => {
    playClick();
    setActiveIndex((prev) => {
      if (ILLUSIONS.length <= 1) return prev;
      let next = Math.floor(Math.random() * ILLUSIONS.length);
      while (next === prev) next = Math.floor(Math.random() * ILLUSIONS.length);
      setElapsed(0);
      return next;
    });
  }, [playClick]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeIndex !== null) closeViewer();
        else {
          playClose();
          onClose();
        }
      } else if (activeIndex !== null) {
        if (e.key === "ArrowRight") goto(1);
        else if (e.key === "ArrowLeft") goto(-1);
        else if (e.key.toLowerCase() === "r") random();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, activeIndex, closeViewer, goto, random, onClose, playClose]);

  // Fixation countdown ring for the active illusion.
  useEffect(() => {
    if (activeIndex === null) return;
    const id = window.setInterval(() => setElapsed((e) => e + 0.1), 100);
    return () => window.clearInterval(id);
  }, [activeIndex]);

  const active = activeIndex !== null ? ILLUSIONS[activeIndex] : null;
  const progress = active ? Math.min(1, elapsed / active.duration) : 0;

  const orderedIndices = useMemo(() => ILLUSIONS.map((_, i) => i), []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[300] bg-[#050308] text-white overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Gipnos"
    >
      <div className="fixed inset-0 bg-grid-dots opacity-[0.06] pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,69,0,0.10)_0%,transparent_55%)]" />

      <AnimatePresence mode="wait">
        {activeIndex === null ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 px-5 md:px-12 lg:px-20 py-10 md:py-16 max-w-6xl mx-auto"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="font-mono text-[10px] tracking-[0.3em] text-accent/70 uppercase mb-2">
                  // {ILLUSIONS.length} PROTOCOLS LOADED
                </div>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter animate-glow-flicker">
                  {COPY.title[lang]}
                </h1>
              </div>
              <button
                onClick={() => {
                  playClose();
                  onClose();
                }}
                onMouseEnter={playHover}
                aria-label="Close"
                className="shrink-0 rounded-full border border-border p-2.5 hover:border-accent/50 hover:bg-accent/10 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
            <p className="font-mono text-sm text-muted-foreground max-w-xl mb-1.5">
              {COPY.subtitle[lang]}
            </p>
            <p className="font-mono text-xs text-accent/60 mb-8">⚠ {COPY.warn[lang]}</p>
            {reducedMotion && (
              <div className="mb-8 -mt-4 font-mono text-[11px] text-white/40 border border-white/10 rounded px-3 py-2 inline-block">
                {COPY.reduced[lang]}
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {orderedIndices.map((i) => {
                const def = ILLUSIONS[i];
                const Comp = def.Component;
                return (
                  <button
                    key={def.id}
                    onClick={() => openViewer(i)}
                    onMouseEnter={playHover}
                    className="group relative aspect-square rounded-lg overflow-hidden border border-border hover:border-accent/60 transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                  >
                    <div className="absolute inset-0">
                      <Comp className="w-full h-full" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
                    <div className="absolute top-1.5 left-1.5 font-mono text-[9px] text-white/50 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-2">
                      <div className="font-mono text-[10px] sm:text-[11px] leading-tight text-white drop-shadow-sm">
                        {def.title[lang]}
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                      <Eye className="size-5 text-accent" />
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 min-h-screen flex flex-col"
          >
            <div className="flex items-center justify-between px-5 md:px-10 py-4 md:py-6 shrink-0">
              <button
                onClick={closeViewer}
                onMouseEnter={playHover}
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
              >
                <ChevronLeft className="size-4" /> {COPY.back[lang]}
              </button>
              <div className="font-mono text-xs text-white/40 tabular-nums">
                {String((activeIndex ?? 0) + 1).padStart(2, "0")} / {ILLUSIONS.length}
              </div>
              <button
                onClick={() => {
                  playClose();
                  onClose();
                }}
                onMouseEnter={playHover}
                aria-label="Close"
                className="rounded-full border border-border p-2 hover:border-accent/50 hover:bg-accent/10 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center px-4 md:px-10 pb-4">
              <div className="relative w-full max-w-3xl aspect-square rounded-2xl overflow-hidden border border-border shadow-premium">
                {active && <active.Component className="w-full h-full" />}
                <svg
                  className="absolute top-3 right-3 size-9 -rotate-90 pointer-events-none"
                  viewBox="0 0 36 36"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="15.5"
                    fill="none"
                    stroke="rgba(0,0,0,0.35)"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.5"
                    fill="none"
                    stroke="#ff4500"
                    strokeWidth="3"
                    strokeDasharray={2 * Math.PI * 15.5}
                    strokeDashoffset={2 * Math.PI * 15.5 * (1 - progress)}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="px-5 md:px-10 pb-8 md:pb-10 max-w-3xl mx-auto w-full text-center">
              <h2 className="font-display text-2xl md:text-3xl uppercase tracking-tight mb-2">
                {active?.title[lang]}
              </h2>
              <p className="font-mono text-xs md:text-sm text-accent/80 mb-1.5">
                {active?.instruction[lang]}
              </p>
              <p className="font-mono text-xs md:text-sm text-muted-foreground">
                {active?.effect[lang]}
              </p>

              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => goto(-1)}
                  onMouseEnter={playHover}
                  aria-label="Previous"
                  className="rounded-full border border-border p-2.5 hover:border-accent/50 hover:bg-accent/10 transition-colors"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={random}
                  onMouseEnter={playHover}
                  className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest hover:border-accent/50 hover:bg-accent/10 transition-colors"
                >
                  <Shuffle className="size-3.5" /> {COPY.random[lang]}
                </button>
                <button
                  onClick={() => goto(1)}
                  onMouseEnter={playHover}
                  aria-label="Next"
                  className="rounded-full border border-border p-2.5 hover:border-accent/50 hover:bg-accent/10 transition-colors"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
              <div className="mt-4 font-mono text-[10px] text-white/25 uppercase tracking-widest">
                {COPY.esc[lang]}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
