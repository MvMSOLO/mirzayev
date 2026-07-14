import { useLang } from "@/lib/i18n";
import { motion, type Variants } from "framer-motion";
import { RevealBox, WordReveal } from "./TextReveal";
import { useSound } from "@/hooks/useSound";

const tools = [
  { name: "REACT", icon: "⚛" },
  { name: "NEXT", icon: "▲" },
  { name: "TS", icon: "◈" },
  { name: "TAILWIND", icon: "◉" },
  { name: "GSAP", icon: "◆" },
  { name: "MOTION", icon: "◎" },
  { name: "NODE", icon: "⬡" },
  { name: "POSTGRES", icon: "◻" },
  { name: "SUPABASE", icon: "▷" },
  { name: "PRISMA", icon: "◌" },
  { name: "REDIS", icon: "◈" },
  { name: "DOCKER", icon: "⬡" },
  { name: "FIGMA", icon: "◉" },
  { name: "BLENDER", icon: "◆" },
  { name: "AFTER FX", icon: "◎" },
  { name: "PREMIERE", icon: "▷" },
  { name: "OBS", icon: "◌" },
  { name: "CAPCUT", icon: "◻" },
  { name: "OPENAI", icon: "◈" },
  { name: "GEMINI", icon: "✦" },
  { name: "CLAUDE", icon: "◎" },
  { name: "LLAMA", icon: "◆" },
  { name: "PY", icon: "⬡" },
  { name: "SHELL", icon: "▷" },
];

export function ToolkitGrid() {
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
    hidden: { opacity: 0, scale: 0.7, rotate: -8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 18 },
    },
  };

  return (
    <section className="px-5 md:px-20 lg:px-32 py-16 md:py-24 border-t border-border relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-accent/5 blur-3xl pointer-events-none" />

      <RevealBox className="mb-10 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">
          // TOOLKIT · {tools.length} CH
        </span>
      </RevealBox>

      <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter mb-12">
        <WordReveal text={lang === "uz" ? "Ishlash arsenali" : "Working arsenal"} sound />
        <span className="text-accent">.</span>
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-5%" }}
        className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-px bg-border [perspective:1000px]"
      >
        {tools.map((tool, i) => (
          <motion.div
            key={tool.name}
            variants={itemVariants}
            whileHover={{
              scale: 1.08,
              zIndex: 10,
              rotateY: 12,
              rotateX: -8,
              boxShadow: "0 0 30px rgba(255,69,0,0.4)",
              transition: { duration: 0.2 },
            }}
            className="aspect-square bg-white/[0.015] border border-white/[0.05] flex flex-col items-center justify-center relative group hover:bg-accent hover:border-accent transition-all duration-300 cursor-default shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
            onMouseEnter={playHover}
          >
            {/* Icon */}
            <span className="text-lg text-white/20 group-hover:text-background/40 transition-colors mb-1 leading-none">
              {tool.icon}
            </span>

            {/* Name */}
            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest group-hover:text-background transition-colors group-hover:scale-105 duration-300 text-center px-1">
              {tool.name}
            </span>

            {/* Index */}
            <span className="absolute top-1 left-1 text-[7px] text-white/20 group-hover:text-background/50 font-mono">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Corner accents on hover */}
            <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-background/0 group-hover:border-background/40 transition-colors" />
            <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-background/0 group-hover:border-background/40 transition-colors" />

            {/* Glow on hover */}
            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/100 transition-colors duration-300" style={{ zIndex: -1 }} />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom label */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-6 flex items-center justify-between text-[10px] font-mono text-white/20 uppercase tracking-widest"
      >
        <span>{lang === "uz" ? "Texnologiyalar steki" : "Technology stack"}</span>
        <span>{tools.length} {lang === "uz" ? "vosita" : "tools"}</span>
      </motion.div>
    </section>
  );
}
