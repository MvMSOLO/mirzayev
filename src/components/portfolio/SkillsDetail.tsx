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
      color: "from-accent to-[#ff7700]",
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
      color: "from-[var(--cyan)] to-blue-500",
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
      color: "from-emerald-400 to-teal-500",
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
      color: "from-pink-500 to-rose-500",
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
      className="px-5 md:px-20 lg:px-32 py-16 md:py-40 border-b border-white/[0.06] relative overflow-hidden bg-atmosphere-orange"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-blueprint opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-40 h-[2px] bg-accent/30 hidden lg:block shadow-[0_0_15px_#ff4500]" />
      <div className="absolute bottom-1/3 right-0 w-40 h-[2px] bg-[var(--cyan)]/30 hidden lg:block shadow-[0_0_15px_var(--cyan)]" />

      <RevealBox className="mb-14 flex gap-4 items-center">
        <div className="h-1 w-12 bg-gradient-to-r from-accent to-transparent rounded-full" />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent font-bold drop-shadow-[0_0_8px_rgba(255,69,0,0.6)]">{t("skills.tag")}</span>
      </RevealBox>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-24 mb-10 md:mb-20 items-start">
        <div>
          <h2 className="font-display text-5xl sm:text-7xl md:text-9xl uppercase tracking-tighter mb-8 leading-[0.85] text-white">
            <WordReveal text={t("skills.title_a")} sound /> <br />
            <span className="text-accent drop-shadow-[0_0_20px_rgba(255,69,0,0.4)]">
              <WordReveal text={t("skills.title_b")} delay={0.1} />
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-[50ch] leading-[1.8] font-sans font-light">
            {lang === "uz"
              ? "Loyiha talablariga mos keladigan eng ishonchli va zamonaviy texnologiyalardan foydalangan holda muhandislik."
              : "Engineering with modern, performant, and reliable technologies tailored for project success. Select a module below to inspect full diagnostic metrics."}
          </p>
        </div>

        {/* Diagnostic panel */}
        <div className="glass-card border-gradient-cyan p-8 relative font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 space-y-4 shadow-glow-cyan rounded-xl">
          <div className="absolute top-0 right-0 px-4 py-1.5 bg-[var(--cyan)]/10 border-b border-l border-[var(--cyan)]/30 text-[var(--cyan)] font-bold text-[9px] tracking-[0.25em] rounded-bl-lg shadow-[0_0_10px_rgba(0,212,255,0.2)]">
            SYS_HEALTH: OK
          </div>
          <div className="text-[var(--cyan)] font-bold mb-4 text-[10px] drop-shadow-[0_0_5px_rgba(0,212,255,0.6)]">// COGNITIVE_DIAGNOSTICS</div>
          {[
            { label: "FULLSTACK CORE INTENSITY", val: "93.2%" },
            { label: "COMPLEX COMPILATION READY", val: "TRUE" },
            { label: "AI CO-PILOT SYNC", val: "ACTIVE" },
            { label: "CURRENT ACTIVE FOCUS", val: groups[activeGroup].title, accent: true },
          ].map((row) => (
            <div key={row.label} className="flex justify-between border-b border-white/[0.08] pb-3 last:border-0 last:pb-0 font-bold">
              <span className="text-white/80">{row.label}</span>
              <span className={row.accent ? "text-accent drop-shadow-[0_0_5px_rgba(255,69,0,0.6)]" : "text-white"}>{row.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Group tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 relative z-10">
        {groups.map((g, i) => (
          <button
            key={g.id}
            onClick={() => { playClick(); setActiveGroup(i); }}
            onMouseEnter={playHover}
            className={`p-6 text-left transition-all duration-400 relative overflow-hidden group rounded-xl border ${
              activeGroup === i
                ? "border-accent/60 bg-accent/[0.08] shadow-[0_0_20px_rgba(255,69,0,0.15)]"
                : "glass-dark border-white/10 hover:border-accent/40 hover:bg-white/[0.04]"
            }`}
          >
            {activeGroup === i && (
              <span className="absolute top-4 right-4 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent shadow-[0_0_8px_rgba(255,69,0,0.8)]" />
              </span>
            )}
            <div className={`font-mono text-[10px] mb-3 transition-colors tracking-[0.25em] font-bold ${activeGroup === i ? "text-accent" : "text-white/40 group-hover:text-accent/60"}`}>
              0{i + 1} // MODULE
            </div>
            <div className={`font-display text-3xl uppercase tracking-tight transition-transform duration-400 drop-shadow-md ${activeGroup === i ? "text-white" : "text-white/80 group-hover:translate-x-2 group-hover:text-white"}`}>
              {g.title}
            </div>
            <div className="mt-5 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
              <motion.div
                className={`absolute inset-y-0 left-0 bg-gradient-to-r ${g.color}`}
                initial={{ width: 0 }}
                animate={{ width: activeGroup === i ? `${g.percentage}%` : "15%" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Main showcase */}
      <div className="glass-card border-gradient-accent p-6 md:p-12 relative shadow-glow-orange rounded-2xl overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-14 items-center relative z-10">
          {/* Circular gauge */}
          <div className="flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10 pb-10 lg:pb-0 lg:pr-10">
            <div className="relative size-56 md:size-64">
              <svg className="w-full h-full transform -rotate-90 select-none pointer-events-none">
                <circle cx="50%" cy="50%" r="45%" className="stroke-[#0a090c]" strokeWidth="12" fill="none" />
                <circle
                  cx="50%" cy="50%" r="45%"
                  className="stroke-white/10 fill-none"
                  strokeWidth="4"
                  strokeDasharray="8 10"
                />
                <motion.circle
                  cx="50%" cy="50%" r="45%"
                  className="stroke-accent fill-none"
                  strokeWidth="10"
                  strokeDasharray="283"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * groups[activeGroup].percentage) / 100 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 10px rgba(255,69,0,0.6))" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.25em] font-bold mb-2">STABILITY</span>
                <motion.span
                  className="font-display text-7xl text-white leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  key={activeGroup}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {groups[activeGroup].percentage}%
                </motion.span>
                <span className="font-mono text-[11px] text-accent tracking-[0.2em] font-bold mt-2 bg-accent/10 px-3 py-1 rounded border border-accent/20">
                  {groups[activeGroup].status}
                </span>
              </div>
            </div>

            <div className="mt-8 text-center font-mono text-[11px] space-y-2 font-bold">
              <div className="text-white/80">{groups[activeGroup].metric}</div>
              <div className="text-[var(--cyan)] uppercase tracking-[0.25em]">MODULE // INTEGRITY_OK</div>
            </div>
          </div>

          {/* Skills list */}
          <div className="space-y-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent mb-6 border-b border-white/10 pb-4 flex justify-between items-center font-bold">
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                // CAPABILITIES MATRIX
              </span>
              <span className="text-white/40 hidden md:block">HOVER FOR SYNAPSES</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {groups[activeGroup].items.map((it, idx) => (
                  <motion.div
                    key={it.name + activeGroup}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                    onMouseEnter={() => { playHover(); setHoveredSkill(it.name); }}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`p-5 transition-all duration-300 relative overflow-hidden cursor-default group rounded-xl border ${
                      hoveredSkill === it.name
                        ? "border-accent/60 bg-accent/[0.08] shadow-[0_0_25px_rgba(255,69,0,0.15)]"
                        : "border-white/10 glass-dark"
                    }`}
                  >
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="font-mono text-sm text-white font-bold group-hover:text-accent transition-colors duration-300 drop-shadow-sm">
                        {it.name}
                      </span>
                      <span className="font-mono text-[10px] text-white/50 font-bold tabular-nums bg-[#0a090c] px-2 py-1 rounded">
                        {it.level}%
                      </span>
                    </div>
                    <div className="h-[3px] bg-[#0a090c] rounded-full relative overflow-hidden mb-4 shadow-inner">
                      <motion.div
                        className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${groups[activeGroup].color}`}
                        style={{
                          boxShadow: "0 0 10px rgba(255,255,255,0.4)",
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${it.level}%` }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 + idx * 0.03 }}
                      />
                    </div>
                    <p className="font-sans text-xs text-white/60 leading-[1.7] group-hover:text-white/90 transition-colors duration-300">
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