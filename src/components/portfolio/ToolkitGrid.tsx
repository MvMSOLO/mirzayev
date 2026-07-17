import { useLang } from "@/lib/i18n";
import { motion, type Variants } from "framer-motion";
import { RevealBox, WordReveal } from "./TextReveal";
import { useSound } from "@/hooks/useSound";
import { memo } from "react";
import { Wrench } from "lucide-react";

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
      transition: { staggerChildren: 0.03 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -15, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 18 },
    },
  };

  return (
    <section className="px-5 md:px-20 lg:px-32 py-16 md:py-40 border-t border-white/[0.06] relative overflow-hidden bg-atmosphere-cyan">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-60 bg-[var(--cyan)]/[0.05] blur-[100px] pointer-events-none" />

      <RevealBox className="mb-14 flex gap-4 items-center">
        <div className="h-1 w-12 bg-gradient-to-r from-[var(--cyan)] to-transparent rounded-full" />
        <Wrench className="w-3.5 h-3.5 text-[var(--cyan)] opacity-80" />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold text-[var(--cyan)] drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]">
          // TOOLKIT · {tools.length} MODULES
        </span>
      </RevealBox>

      <h2 className="heading-hover font-display text-5xl sm:text-7xl md:text-9xl uppercase leading-[0.85] tracking-tighter mb-12 md:mb-20 cursor-default text-white">
        <WordReveal text={lang === "uz" ? "Ishlash arsenali" : "Working arsenal"} sound />
        <span className="text-[var(--cyan)] drop-shadow-[0_0_20px_rgba(0,212,255,0.4)]">.</span>
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 [perspective:1200px]"
      >
        {tools.map((tool, i) => (
          <motion.div
            key={tool.name}
            variants={itemVariants}
            whileHover={{
              scale: 1.15,
              zIndex: 20,
              rotateY: 15,
              rotateX: -10,
              transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
            }}
            className="aspect-square glass-card-strong border-gradient-cyan flex flex-col items-center justify-center relative group hover:bg-[var(--cyan)] hover:border-[var(--cyan)] transition-colors duration-300 cursor-default rounded-xl shadow-md hover:shadow-[0_0_40px_rgba(0,212,255,0.5),0_15px_30px_rgba(0,0,0,0.8)]"
            onMouseEnter={playHover}
          >
            {/* Icon */}
            <span className="text-3xl text-white/30 group-hover:text-[#0a090c]/70 group-hover:scale-125 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] mb-2 leading-none select-none drop-shadow-sm group-hover:drop-shadow-none"
              style={{ transform: "var(--tw-transform)" }}
            >
              {tool.icon}
            </span>

            {/* Name */}
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold group-hover:text-[#0a090c] transition-colors duration-300 text-center px-2 text-white/42 leading-tight">
              {tool.name}
            </span>

            {/* Index */}
            <span className="absolute top-2 left-2 font-mono text-[8px] text-[var(--cyan)]/40 group-hover:text-[#0a090c]/40 font-bold transition-colors duration-300">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Corner accents */}
            <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[var(--cyan)]/20 group-hover:border-[#0a090c]/40 transition-colors duration-300" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[var(--cyan)]/20 group-hover:border-[#0a090c]/40 transition-colors duration-300" />
          </motion.div>
        ))}
      </motion.div>

      {/* Footer label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-12 flex items-center justify-between font-mono text-[11px] text-white/40 uppercase tracking-[0.25em] font-bold glass-card border border-white/10 px-6 py-4 rounded-lg shadow-md"
      >
        <span>{lang === "uz" ? "Texnologiyalar steki" : "Technology stack"}</span>
        <span className="text-[var(--cyan)] drop-shadow-[0_0_5px_rgba(0,212,255,0.4)]">
          {tools.length} {lang === "uz" ? "vosita" : "tools"}
        </span>
      </motion.div>
    </section>
  );
});