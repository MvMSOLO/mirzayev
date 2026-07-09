import { useLang } from "@/lib/i18n";
import { motion, type Variants } from "framer-motion";
import { RevealBox, WordReveal } from "./TextReveal";

const tools = [
  "REACT",
  "NEXT",
  "TS",
  "TAILWIND",
  "GSAP",
  "MOTION",
  "NODE",
  "POSTGRES",
  "SUPABASE",
  "PRISMA",
  "REDIS",
  "DOCKER",
  "FIGMA",
  "BLENDER",
  "AFTER FX",
  "PREMIERE",
  "OBS",
  "CAPCUT",
  "OPENAI",
  "GEMINI",
  "CLAUDE",
  "LLAMA",
  "PY",
  "SHELL",
];

export function ToolkitGrid() {
  const { lang } = useLang();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
  };

  return (
    <section className="px-5 md:px-20 lg:px-32 py-24 border-t border-border relative overflow-hidden">
      <RevealBox className="mb-10 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">
          // TOOLKIT · 24 CH
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
            key={tool}
            variants={itemVariants}
            whileHover={{ scale: 1.05, zIndex: 10, rotateY: 10, rotateX: -10 }}
            className="aspect-square bg-background flex items-center justify-center relative group hover:bg-accent transition-colors duration-300 cursor-default shadow-sm hover:shadow-[0_0_20px_rgba(255,69,0,0.3)]"
          >
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest group-hover:text-background transition-colors group-hover:scale-110 duration-300">
              {tool}
            </span>
            <span className="absolute top-1 left-1 text-[8px] text-white/30 group-hover:text-background/70 font-mono">
              {String(i + 1).padStart(2, "0")}
            </span>
            {/* Technical corners on hover */}
            <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-background opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-background opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
