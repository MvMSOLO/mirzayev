import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="px-5 md:px-20 lg:px-32 py-24 border-t border-border relative overflow-hidden">
      <div className="mb-10 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">
          // TOOLKIT · 24 CH
        </span>
      </div>
      <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter mb-12">
        {lang === "uz" ? "Ishlash arsenali" : "Working arsenal"}
        <span className="text-accent">.</span>
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-px bg-border"
      >
        {tools.map((tool, i) => (
          <motion.div
            key={tool}
            variants={itemVariants}
            className="aspect-square bg-background flex items-center justify-center relative group hover:bg-accent transition-colors duration-300 cursor-default"
          >
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest group-hover:text-background transition-colors">
              {tool}
            </span>
            <span className="absolute top-1 left-1 text-[8px] text-white/30 group-hover:text-background/70 font-mono">
              {String(i + 1).padStart(2, "0")}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
