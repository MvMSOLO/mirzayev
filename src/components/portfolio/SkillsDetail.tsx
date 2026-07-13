import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { RevealBox, WordReveal } from "./TextReveal";
import { useSound } from "@/hooks/useSound";

interface SkillGroup {
  id: string;
  title: string;
  percentage: number;
  metric: string;
  status: string;
  color: string;
  items: Array<{ name: string; level: number; info: { uz: string; en: string } }>;
}

export function SkillsDetail() {
  const { t, lang } = useLang();
  const { playHover, playClick } = useSound();
  const [activeGroup, setActiveGroup] = useState<number>(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const groups: SkillGroup[] = [
    {
      id: "frontend",
      title: t("skills.g1"),
      percentage: 95,
      metric: "RENDER_SPEED: 0.12s",
      status: "OPTIMIZED",
      color: "from-[#ff4500] to-[#ff7700]",
      items: [
        { name: "React 19", level: 95, info: { uz: "Sinxron render va server komponentlar", en: "Concurrent features & Server Components" } },
        { name: "Next.js", level: 92, info: { uz: "Ruter, SSR optimizatsiyalari va statik generatsiya", en: "App Router, SSR, and Static Generation" } },
        { name: "TypeScript", level: 90, info: { uz: "Xavfsiz turlar va strukturaviy arxitektura", en: "Type-safe robust component architecture" } },
        { name: "Tailwind CSS v4", level: 98, info: { uz: "Semantik klasslar va yuqori tezkor CSS", en: "Semantic classes & lightning fast compilation" } },
        { name: "Framer Motion", level: 92, info: { uz: "Murakkab interaktiv ssenariylar va animatsiyalar", en: "Complex staggered reveals & fluid spring physics" } },
        { name: "Three.js / Fiber", level: 75, info: { uz: "WebGL sahnalar, kursor gravity va 3D rendering", en: "3D scene construction, interactive models & gravity" } },
      ],
    },
    {
      id: "backend",
      title: t("skills.g2"),
      percentage: 88,
      metric: "LATENCY: 42ms",
      status: "SECURE",
      color: "from-blue-500 to-indigo-600",
      items: [
        { name: "Node.js", level: 90, info: { uz: "Tezkor API xizmatlar va asinxron I/O tizimlar", en: "Event-driven asynchronous backend services" } },
        { name: "Python", level: 85, info: { uz: "Ma'lumotlar tahlili va neyron tarmoqlar integratsiyasi", en: "Data pipelines & machine learning models" } },
        { name: "PostgreSQL", level: 88, info: { uz: "Murakkab so'rovlar, indeksatsiya va tranzaksiyalar", en: "Relational modeling, indexing, and indexing speed" } },
        { name: "Supabase", level: 92, info: { uz: "Realtaym ma'lumotlar, Postgres funksiyalar va auth", en: "Realtime subscription engines, Auth, and Edge Functions" } },
        { name: "REST / GraphQL", level: 90, info: { uz: "Tizimli va xavfsiz aloqa protokollari", en: "Scalable API endpoints with high security integrity" } },
        { name: "Docker", level: 78, info: { uz: "Ilovalarni konteynerlashtirish va integratsiya", en: "Encapsulating isolated service micro-environments" } },
      ],
    },
    {
      id: "design",
      title: t("skills.g3"),
      percentage: 92,
      metric: "UX_INDEX: 9.8/10",
      status: "CREATIVE",
      color: "from-[#DFFF00] to-[#99cc00]",
      items: [
        { name: "User Experience (UX)", level: 95, info: { uz: "Foydalanuvchi yo'llari xaritalari va wireframe", en: "Frictionless user flow mapping & wireframing" } },
        { name: "Interface Design", level: 92, info: { uz: "Kinetik va minimalist interfeys arxitekturasi", en: "High-fidelity responsive interface layouts" } },
        { name: "Design Systems", level: 90, info: { uz: "Komponentlar, tokenlar va moslashuvchan maketlar", en: "Atomic UI frameworks, global tokens & variables" } },
        { name: "Figma Mastery", level: 95, info: { uz: "Avtolayout, o'zgaruvchilar va interaktiv prototiplar", en: "Auto-layouts, responsive frames & variable components" } },
        { name: "Motion Graphic", level: 80, info: { uz: "Dinamik visual effektlar va video kesish", en: "Kinetic interface micro-feedback & sound integration" } },
        { name: "Responsive Layouts", level: 98, info: { uz: "Mobil-birinchi, toza va moslashuvchan karkas", en: "Strict mobile-first engineering guidelines" } },
      ],
    },
    {
      id: "ai_tools",
      title: t("skills.g4"),
      percentage: 90,
      metric: "AI_EFFICIENCY: +300%",
      status: "AUTOMATED",
      color: "from-[#ff2244] to-[#ff5500]",
      items: [
        { name: "AI Integrations", level: 92, info: { uz: "GPT, Claude API va neyron tarmoqlar ulanishi", en: "Connecting large models directly to web services" } },
        { name: "Prompt Eng.", level: 95, info: { uz: "Kontekst muhandisligi va maxsus tizim ko'rsatmalari", en: "Advanced context assembly & system role prompting" } },
        { name: "Workflow Auto.", level: 88, info: { uz: "Takroriy ishlarni AI yordamida avtomatlashtirish", en: "Automating manual pipeline tasks via neural triggers" } },
        { name: "Git / GitHub", level: 90, info: { uz: "Versiyalar nazorati, CI/CD integratsiyalari", en: "Advanced branching workflows & repository history" } },
        { name: "VS Code / Bun", level: 95, info: { uz: "Tezkor rivojlanish muhiti va optimizatsiya", en: "Leveraging Bun runtimes & optimized debug cycles" } },
        { name: "Agentic Systems", level: 85, info: { uz: "Sun'iy intellekt agentlarini yaratish va boshqarish", en: "Formulating multi-agent environments & memory loops" } },
      ],
    },
  ];

  return (
    <section id="skills" className="px-5 md:px-20 lg:px-32 py-16 md:py-24 border-b border-border relative overflow-hidden bg-background">
      {/* Interactive holographic scanlines background */}
      <div className="absolute inset-0 bg-grid-dots opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-32 h-px bg-accent/20 hidden lg:block" />
      <div className="absolute bottom-1/4 right-0 w-32 h-px bg-accent/20 hidden lg:block" />

      <RevealBox className="mb-10 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent font-mono">{t("skills.tag")}</span>
      </RevealBox>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 mb-16 items-start">
        <div>
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-6 leading-[0.9]">
            <WordReveal text={t("skills.title_a")} sound /> <br />
            <span className="text-accent">
              <WordReveal text={t("skills.title_b")} delay={0.1} />
            </span>
          </h2>
          <p className="text-sm text-white/50 max-w-[50ch]">
            {lang === "uz"
              ? "Loyiha talablariga mos keladigan eng ishonchli va zamonaviy texnologiyalardan foydalangan holda muhandislik. To'plamni tahlil qilish uchun quyidagi bo'limlardan birini tanlang."
              : "Engineering with modern, performant, and reliable technologies tailored for project success. Select a module below to inspect full diagnostic metrics."}
          </p>
        </div>

        {/* Global diagnostic core */}
        <div className="border border-white/10 bg-secondary/30 p-5 rounded-sm relative font-mono text-[10px] uppercase tracking-wider text-white/40 space-y-3">
          <div className="absolute top-0 right-0 px-2 py-0.5 bg-accent/10 border-b border-l border-white/10 text-accent font-bold text-[8px]">
            SYS_HEALTH: OK
          </div>
          <div className="text-accent font-bold mb-1">// COGNITIVE_DIAGNOSTICS</div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span>FULLSTACK CORE INTENSITY</span>
            <span className="text-white">93.2%</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span>COMPLEX COMPILATION READY</span>
            <span className="text-white">TRUE</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span>AI CO-PILOT SYNC</span>
            <span className="text-white">ACTIVE (CLAUDE-3.5)</span>
          </div>
          <div className="flex justify-between">
            <span>CURRENT ACTIVE FOCUS</span>
            <span className="text-accent">{groups[activeGroup].title}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
        {groups.map((g, i) => (
          <button
            key={g.id}
            onClick={() => {
              playClick();
              setActiveGroup(i);
            }}
            onMouseEnter={playHover}
            className={`border p-4 text-left transition-all relative overflow-hidden group ${
              activeGroup === i
                ? "border-accent bg-accent/5"
                : "border-border bg-background hover:border-white/20"
            }`}
          >
            {/* Pulsing indicator when active */}
            {activeGroup === i && (
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
            )}
            <div className="text-[10px] text-white/30 font-mono mb-2 group-hover:text-accent transition-colors">
              0{i + 1} // MODULE
            </div>
            <div className="font-display text-xl uppercase tracking-tight text-white group-hover:translate-x-1 transition-transform duration-300">
              {g.title}
            </div>
            {/* Mini progress bar on tab */}
            <div className="mt-4 h-[2px] bg-white/5 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                initial={{ width: 0 }}
                animate={{ width: activeGroup === i ? `${g.percentage}%` : "15%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Interactive Core Showcase */}
      <div className="border border-border bg-[#0e0d11]/80 backdrop-blur p-6 md:p-8 relative min-h-[400px]">
        {/* Animated corner aesthetics */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 items-center">
          {/* Circular SVG Gauge for the active stack */}
          <div className="flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-white/5 pb-8 lg:pb-0 lg:pr-8">
            <div className="relative size-48 md:size-56">
              {/* Outer circular blueprint mesh */}
              <svg className="w-full h-full transform -rotate-90 select-none pointer-events-none">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  className="stroke-white/5 fill-none"
                  strokeWidth="8"
                />
                {/* Visual grid ticks */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  className="stroke-accent fill-none opacity-20"
                  strokeWidth="4"
                  strokeDasharray="6 8"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  className="stroke-accent fill-none"
                  strokeWidth="8"
                  strokeDasharray="283"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * groups[activeGroup].percentage) / 100 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>

              {/* Central readout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-mono">
                <span className="text-white/30 text-[10px] tracking-widest uppercase">STABILITY</span>
                <motion.span
                  className="text-4xl md:text-5xl font-display text-white"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  key={activeGroup}
                >
                  {groups[activeGroup].percentage}%
                </motion.span>
                <span className="text-accent text-[9px] font-mono tracking-widest font-bold">
                  {groups[activeGroup].status}
                </span>
              </div>
            </div>

            <div className="mt-6 text-center font-mono text-[10px] space-y-1">
              <div className="text-white/60 font-bold">{groups[activeGroup].metric}</div>
              <div className="text-white/30">MODULE // INTEGRITY_CHECKED // OK</div>
            </div>
          </div>

          {/* Details list with live feedback */}
          <div className="space-y-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-accent mb-4 border-b border-white/5 pb-2 flex justify-between items-center">
              <span>// CAPABILITIES MATRIX</span>
              <span className="text-white/40">HOVER ITEMS FOR DETAILED SYNAPSES</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {groups[activeGroup].items.map((it, idx) => (
                  <motion.div
                    key={it.name + activeGroup}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    onMouseEnter={() => {
                      playHover();
                      setHoveredSkill(it.name);
                    }}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`border p-3 rounded-sm transition-all relative overflow-hidden group cursor-default ${
                      hoveredSkill === it.name
                        ? "border-accent bg-accent/5 shadow-[0_0_20px_rgba(255,69,0,0.05)]"
                        : "border-white/5 bg-black/20"
                    }`}
                  >
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="font-mono text-xs text-white/90 font-bold group-hover:text-accent transition-colors">
                        {it.name}
                      </span>
                      <span className="font-mono text-[9px] text-white/40">
                        {it.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1 bg-white/5 relative overflow-hidden mb-2">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${it.level}%` }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 + idx * 0.05 }}
                      />
                    </div>

                    <p className="text-[10px] text-white/50 leading-relaxed group-hover:text-white/80 transition-colors">
                      {lang === "uz" ? it.info.uz : it.info.en}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
