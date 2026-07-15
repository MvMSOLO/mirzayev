import { useState, memo } from "react";
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

export const SkillsDetail = memo(function SkillsDetail() {
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
    <section
      id="skills"
      className="px-5 md:px-20 lg:px-32 py-20 md:py-32 border-b border-white/[0.06] relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,69,0,0.045)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-dots opacity-[0.025] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-28 h-px bg-accent/15 hidden lg:block" />
      <div className="absolute bottom-1/4 right-0 w-28 h-px bg-accent/15 hidden lg:block" />

      <RevealBox className="mb-12 flex gap-3 items-center">
        <div className="h-px w-10 bg-accent" />
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-accent">{t("skills.tag")}</span>
      </RevealBox>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 mb-16 items-start">
        <div>
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-6 leading-[0.88]">
            <WordReveal text={t("skills.title_a")} sound /> <br />
            <span className="text-accent">
              <WordReveal text={t("skills.title_b")} delay={0.1} />
            </span>
          </h2>
          <p className="text-sm text-white/45 max-w-[48ch] leading-[1.9]">
            {lang === "uz"
              ? "Loyiha talablariga mos keladigan eng ishonchli va zamonaviy texnologiyalardan foydalangan holda muhandislik."
              : "Engineering with modern, performant, and reliable technologies tailored for project success. Select a module below to inspect full diagnostic metrics."}
          </p>
        </div>

        {/* Diagnostic panel */}
        <div className="border border-white/[0.07] bg-white/[0.015] backdrop-blur-sm p-5 relative font-mono text-[10px] uppercase tracking-[0.15em] text-white/35 space-y-3 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 right-0 px-2 py-0.5 bg-accent/8 border-b border-l border-accent/20 text-accent font-bold text-[8px] tracking-widest">
            SYS_HEALTH: OK
          </div>
          <div className="text-accent font-bold mb-2 text-[9px]">// COGNITIVE_DIAGNOSTICS</div>
          {[
            { label: "FULLSTACK CORE INTENSITY", val: "93.2%" },
            { label: "COMPLEX COMPILATION READY", val: "TRUE" },
            { label: "AI CO-PILOT SYNC", val: "ACTIVE" },
            { label: "CURRENT ACTIVE FOCUS", val: groups[activeGroup].title, accent: true },
          ].map((row) => (
            <div key={row.label} className="flex justify-between border-b border-white/[0.04] pb-2 last:border-0 last:pb-0">
              <span>{row.label}</span>
              <span className={row.accent ? "text-accent" : "text-white/70"}>{row.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Group tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
        {groups.map((g, i) => (
          <button
            key={g.id}
            onClick={() => { playClick(); setActiveGroup(i); }}
            onMouseEnter={playHover}
            className={`border p-4 text-left transition-all duration-300 relative overflow-hidden group ${
              activeGroup === i
                ? "border-accent/50 bg-accent/[0.06]"
                : "border-white/[0.07] bg-transparent hover:border-white/15"
            }`}
          >
            {activeGroup === i && (
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
            )}
            <div className="font-mono text-[9px] text-white/25 mb-2 group-hover:text-accent/60 transition-colors tracking-widest">
              0{i + 1} // MODULE
            </div>
            <div className="font-display text-xl uppercase tracking-tight text-white group-hover:translate-x-1 transition-transform duration-300">
              {g.title}
            </div>
            <div className="mt-3.5 h-px bg-white/[0.04] relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                initial={{ width: 0 }}
                animate={{ width: activeGroup === i ? `${g.percentage}%` : "12%" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Main showcase */}
      <div className="border border-white/[0.06] bg-[#0b0a0e]/95 backdrop-blur-2xl p-6 md:p-8 relative min-h-[400px] shadow-[0_16px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.03)]">
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent/50" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent/50" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent/50" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent/50" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 items-center">
          {/* Circular gauge */}
          <div className="flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-white/[0.05] pb-8 lg:pb-0 lg:pr-8">
            <div className="relative size-48 md:size-52">
              <svg className="w-full h-full transform -rotate-90 select-none pointer-events-none">
                <circle cx="50%" cy="50%" r="45%" className="stroke-white/[0.04] fill-none" strokeWidth="8" />
                <circle
                  cx="50%" cy="50%" r="45%"
                  className="stroke-accent/15 fill-none"
                  strokeWidth="3"
                  strokeDasharray="6 8"
                />
                <motion.circle
                  cx="50%" cy="50%" r="45%"
                  className="stroke-accent fill-none"
                  strokeWidth="7"
                  strokeDasharray="283"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * groups[activeGroup].percentage) / 100 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 8px rgba(255,69,0,0.4))" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.18em]">STABILITY</span>
                <motion.span
                  className="font-display text-5xl text-white leading-none mt-1"
                  key={activeGroup}
                  initial={{ scale: 0.75, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {groups[activeGroup].percentage}%
                </motion.span>
                <span className="font-mono text-[9px] text-accent tracking-widest font-bold mt-1">
                  {groups[activeGroup].status}
                </span>
              </div>
            </div>

            <div className="mt-6 text-center font-mono text-[9px] space-y-1">
              <div className="text-white/50">{groups[activeGroup].metric}</div>
              <div className="text-white/20 uppercase tracking-widest">MODULE // INTEGRITY_OK</div>
            </div>
          </div>

          {/* Skills list */}
          <div className="space-y-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent mb-5 border-b border-white/[0.05] pb-2.5 flex justify-between items-center">
              <span>// CAPABILITIES MATRIX</span>
              <span className="text-white/25 hidden md:block">HOVER FOR SYNAPSES</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <AnimatePresence mode="popLayout">
                {groups[activeGroup].items.map((it, idx) => (
                  <motion.div
                    key={it.name + activeGroup}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.24, delay: idx * 0.025 }}
                    onMouseEnter={() => { playHover(); setHoveredSkill(it.name); }}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`border p-3.5 transition-all duration-200 relative overflow-hidden cursor-default group ${
                      hoveredSkill === it.name
                        ? "border-accent/40 bg-accent/[0.04] shadow-[0_0_20px_rgba(255,69,0,0.04)]"
                        : "border-white/[0.05] bg-black/20"
                    }`}
                  >
                    <div className="flex justify-between items-baseline mb-2.5">
                      <span className="font-mono text-xs text-white/85 font-bold group-hover:text-accent transition-colors duration-200">
                        {it.name}
                      </span>
                      <span className="font-mono text-[9px] text-white/30 tabular-nums">{it.level}%</span>
                    </div>
                    <div className="h-1 bg-white/[0.05] rounded-full relative overflow-hidden mb-2.5">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          background: "linear-gradient(90deg, #ff4500, #ff7700)",
                          boxShadow: "0 0 8px rgba(255,69,0,0.45)",
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${it.level}%` }}
                        transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1], delay: 0.04 + idx * 0.025 }}
                      />
                    </div>
                    <p className="font-mono text-[10px] text-white/40 leading-relaxed group-hover:text-white/72 transition-colors duration-200">
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
});
