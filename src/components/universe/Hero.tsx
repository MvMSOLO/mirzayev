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
      {/* Warm ambient background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-[#F4F1E8] to-[#F9F6F0] pointer-events-none" />

      {/* Dynamic interactive cursor-following glow ripple in Universe mode */}
      <motion.div
        animate={{
          x: mousePos.x - 200,
          y: mousePos.y - 200,
          opacity: hovered ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 30, mass: 0.8 }}
        className="absolute w-[400px] h-[400px] rounded-full bg-[#DFFF00]/20 blur-[80px] pointer-events-none z-0"
      />

      {/* Secondary ambient ripple — offset for depth */}
      <motion.div
        animate={{
          x: mousePos.x - 100,
          y: mousePos.y - 100,
          opacity: hovered ? 0.5 : 0,
        }}
        transition={{ type: "spring", stiffness: 140, damping: 24, mass: 1 }}
        className="absolute w-[200px] h-[200px] rounded-full bg-[#111]/5 blur-[40px] pointer-events-none z-0"
      />

      {/* Center blob image — enhanced with multi-layer effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, filter: "blur(30px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none px-4"
      >
        <div className="relative w-full max-w-[920px] aspect-square">
          {/* Outer glow ring */}
          <motion.div
            animate={{ scale: [1, 1.03, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[-5%] rounded-full bg-[#DFFF00]/15 blur-3xl"
          />
          <Blob
            variant="a"
            src={etherea}
            alt="avazbek mirzayev creative universe"
            className="w-full h-full animate-uni-drift"
          />
        </div>
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[15%] right-[8%] hidden lg:block z-10 pointer-events-none"
      >
        <div className="text-[9px] uppercase tracking-[0.4em] text-[#111]/20 font-mono flex flex-col gap-1 text-right">
          <span>Creative Universe</span>
          <span className="text-[#111]/10">v2026.∞</span>
        </div>
      </motion.div>

      {/* Asymmetric typography with enhanced entrance */}
      <div className="relative z-10 pointer-events-none select-none px-6 md:px-[4vw]">
        <div className="overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 80, skewY: 3 }}
            animate={{ opacity: 1, y: 0, skewY: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
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
        </div>
        <div className="flex justify-end overflow-hidden">
          <motion.span
            initial={{ opacity: 0, y: 80, skewY: -3 }}
            animate={{ opacity: 1, y: 0, skewY: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
            className="font-serif italic leading-[0.85] text-[#111] -mt-[2vw] md:-mt-[4vw] inline-block"
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
        initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="absolute bottom-12 md:bottom-24 left-6 md:left-[8vw] max-w-[36ch] z-20"
      >
        <div className="w-8 h-px bg-[#111]/20 mb-5" />
        <p
          className="text-base md:text-xl text-[#111]/80 leading-[1.8] mb-10"
          style={{ fontFamily: '"Instrument Serif", serif' }}
        >
          {t("uni.hero.desc")}
        </p>
        <LiquidButton href="#uni-works">{t("uni.hero.cta")}</LiquidButton>
      </motion.div>

      {/* Scroll indicator — right side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-12 right-6 md:right-[8vw] z-20 hidden md:block"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="text-[9px] uppercase tracking-[0.4em] text-[#111]/30 font-mono">
            scroll
          </div>
          <div className="w-px h-12 bg-[#111]/10 relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-0 h-6 bg-gradient-to-b from-transparent via-[#111]/40 to-transparent"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
