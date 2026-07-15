import { useLang } from "@/lib/i18n";
import { motion, type Variants } from "framer-motion";
import { RevealBox, WordReveal } from "./TextReveal";
import { useSound } from "@/hooks/useSound";
import { memo } from "react";

const tools = [
  { name: "REACT", icon: "⚛", category: "frontend" },
  { name: "NEXT", icon: "▲", category: "frontend" },
  { name: "TS", icon: "◈", category: "frontend" },
  { name: "TAILWIND", icon: "◉", category: "frontend" },
  { name: "GSAP", icon: "◆", category: "frontend" },
  { name: "MOTION", icon: "◎", category: "frontend" },
  { name: "NODE", icon: "⬡", category: "backend" },
  { name: "POSTGRES", icon: "◻", category: "backend" },
  { name: "SUPABASE", icon: "▷", category: "backend" },
  { name: "PRISMA", icon: "◌", category: "backend" },
  { name: "REDIS", icon: "◈", category: "backend" },
  { name: "DOCKER", icon: "⬡", category: "backend" },
  { name: "FIGMA", icon: "◉", category: "design" },
  { name: "BLENDER", icon: "◆", category: "design" },
  { name: "AFTER FX", icon: "◎", category: "design" },
  { name: "PREMIERE", icon: "▷", category: "design" },
  { name: "OBS", icon: "◌", category: "design" },
  { name: "CAPCUT", icon: "◻", category: "design" },
  { name: "OPENAI", icon: "◈", category: "ai" },
  { name: "GEMINI", icon: "✦", category: "ai" },
  { name: "CLAUDE", icon: "◎", category: "ai" },
  { name: "LLAMA", icon: "◆", category: "ai" },
  { name: "PY", icon: "⬡", category: "ai" },
  { name: "SHELL", icon: "▷", category: "ai" },
];

export const ToolkitGrid = memo(function ToolkitGrid() {
  const { lang } = useLang();
  const { playHover } = useSound();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.022 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.55, rotate: -10, y: 14 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: { type: "spring", stiffness: 420, damping: 17 },
    },
  };

  return (
    <section className="px-5 md:px-20 lg:px-32 py-20 md:py-32 border-t border-white/[0.06] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-40 bg-accent/[0.04] blur-[80px] pointer-events-none" />

      <RevealBox className="mb-12 flex gap-3 items-center">
        <div className="h-px w-10 bg-accent" />
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-accent">
          // TOOLKIT · {tools.length} MODULES
        </span>
      </RevealBox>

      <h2 className="heading-hover font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter mb-14 cursor-default">
        <WordReveal text={lang === "uz" ? "Ishlash arsenali" : "Working arsenal"} sound />
        <span className="text-accent">.</span>
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-5%" }}
        className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-px bg-white/[0.04] [perspective:1200px]"
      >
        {tools.map((tool, i) => (
          <motion.div
            key={tool.name}
            variants={itemVariants}
            whileHover={{
              scale: 1.16,
              zIndex: 10,
              rotateY: 12,
              rotateX: -8,
              boxShadow: "0 0 32px rgba(255,69,0,0.45), 0 8px 24px rgba(0,0,0,0.6)",
              transition: { duration: 0.22, ease: [0.34, 1.56, 0.64, 1] },
            }}
            className="aspect-square bg-[#0c0b0f] flex flex-col items-center justify-center relative group hover:bg-accent hover:border-accent transition-colors duration-250 cursor-default"
            onMouseEnter={playHover}
          >
            {/* Icon */}
            <span className="text-base text-white/20 group-hover:text-background/50 group-hover:scale-130 transition-all duration-250 ease-[cubic-bezier(0.34,1.56,0.64,1)] mb-1 leading-none select-none"
              style={{ transform: "var(--tw-transform)" }}
            >
              {tool.icon}
            </span>

            {/* Name */}
            <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.12em] group-hover:text-background transition-colors duration-250 text-center px-1 text-white/40 leading-tight">
              {tool.name}
            </span>

            {/* Index */}
            <span className="absolute top-1.5 left-1.5 font-mono text-[6px] text-white/15 group-hover:text-background/40 transition-colors duration-250">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Corner accents */}
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-t border-r border-white/0 group-hover:border-background/35 transition-colors duration-250" />
            <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 border-b border-l border-white/0 group-hover:border-background/35 transition-colors duration-250" />
          </motion.div>
        ))}
      </motion.div>

      {/* Footer label */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-5 flex items-center justify-between font-mono text-[9px] text-white/18 uppercase tracking-[0.2em]"
      >
        <span>{lang === "uz" ? "Texnologiyalar steki" : "Technology stack"}</span>
        <span>
          {tools.length} {lang === "uz" ? "vosita" : "tools"}
        </span>
      </motion.div>
    </section>
  );
});
