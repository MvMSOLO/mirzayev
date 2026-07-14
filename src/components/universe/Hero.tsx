import etherea from "@/assets/universe/etherea.jpg";
import { useLang } from "@/lib/i18n";
import { LiquidButton } from "./LiquidButton";
import { Blob } from "./Blob";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export function UniverseHero() {
  const { t } = useLang();

  // Dynamic interactive cursor ripples for light mode Universe Hero!
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMove);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMove);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative min-h-[100svh] w-full overflow-hidden pt-24 md:pt-32"
    >
      {/* Dynamic interactive cursor-following glow ripple in Universe mode */}
      {hovered && (
        <motion.div
          animate={{
            x: mousePos.x - 150,
            y: mousePos.y - 150,
          }}
          transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.6 }}
          className="absolute w-[300px] h-[300px] rounded-full bg-[#DFFF00]/12 blur-3xl pointer-events-none z-0"
        />
      )}

      {/* Center blob image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none px-4"
      >
        <div className="relative w-full max-w-[880px] aspect-square">
          <Blob
            variant="a"
            src={etherea}
            alt="avazbek mirzayev creative universe"
            className="w-full h-full animate-uni-drift"
          />
        </div>
      </motion.div>

      {/* Asymmetric typography */}
      <div className="relative z-10 pointer-events-none select-none px-6 md:px-[4vw]">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          className="font-serif italic leading-[0.85] text-[#111]"
          style={{
            fontFamily: '"Instrument Serif", "Cormorant Garamond", serif',
            fontSize: "clamp(60px, 18vw, 280px)",
            marginTop: "10vh",
            fontWeight: 400,
          }}
        >
          avazbek
        </motion.h1>
        <div className="flex justify-end">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
            className="font-serif italic leading-[0.85] text-[#111] -mt-[2vw] md:-mt-[4vw]"
            style={{
              fontFamily: '"Instrument Serif", "Cormorant Garamond", serif',
              fontSize: "clamp(50px, 15vw, 240px)",
              fontWeight: 400,
            }}
          >
            mirzayev
          </motion.span>
        </div>
      </div>

      {/* Manifesto snippet */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
        className="absolute bottom-12 md:bottom-24 left-6 md:left-[8vw] max-w-[32ch] z-20"
      >
        <p
          className="text-base md:text-xl text-[#111] leading-relaxed mb-8"
          style={{ fontFamily: '"Instrument Serif", serif' }}
        >
          {t("uni.hero.desc")}
        </p>
        <div>
          <LiquidButton href="#uni-works">{t("uni.hero.cta")}</LiquidButton>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-12 right-6 md:right-[8vw] z-20 hidden md:block"
      >
        <div className="text-[10px] uppercase tracking-[0.4em] text-[#111]/40 font-mono rotate-90 origin-right translate-y-full">
          scroll to explore
        </div>
      </motion.div>
    </section>
  );
}
