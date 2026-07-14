// ProjectShowroom — premium glass card showcase
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { RevealBox, WordReveal } from "./TextReveal";
import { useSound } from "@/hooks/useSound";
import { Laptop, Tablet, Smartphone, CheckCircle, Flame, ShieldCheck, Zap } from "lucide-react";

interface ShowcaseProject {
  id: string;
  name: string;
  tag: { uz: string; en: string };
  desc: { uz: string; en: string };
  metrics: {
    perf: number;
    code: number;
    ux: number;
    seo: number;
  };
  features: Array<{
    title: { uz: string; en: string };
    desc: { uz: string; en: string };
    x: number; // percentage coordinate for visual hotspot
    y: number;
  }>;
  simulatedUI: {
    titleBar: string;
    heroText: string;
    accentColor: string;
    bgPattern: string;
  };
}

const showcaseProjects: ShowcaseProject[] = [
  {
    id: "neural-flow",
    name: "Neural Flow",
    tag: { uz: "SUNT'IY INTELLEKT AGENTI", en: "AI AUTONOMOUS AGENT" },
    desc: {
      uz: "Dasturchilar uchun takrorlanuvchi ishlarni va quvurlarni avtomatlashtiruvchi to'liq avtonom agentlik tizimi. Next.js, OpenAI, va Postgres.",
      en: "A fully autonomous agentic workflow manager that orchestrates repetitive coding tasks and pipeline processes. Built with Next.js, OpenAI, and Postgres.",
    },
    metrics: { perf: 98, code: 96, ux: 95, seo: 94 },
    features: [
      {
        title: { uz: "Neyron Rejalashtiruvchi", en: "Neural Planner" },
        desc: { uz: "Topshiriqlarni mustaqil ravishda kichik modullarga ajratadi.", en: "Decomposes complex requests into executable micro-tasks." },
        x: 20,
        y: 35,
      },
      {
        title: { uz: "Avtomatik Sinov", en: "Auto-Testing Engine" },
        desc: { uz: "Yozilgan kodni sandbox muhitida sinab ko'radi.", en: "Runs compiled code within secure sandbox environments automatically." },
        x: 75,
        y: 45,
      },
      {
        title: { uz: "Realtaym Panel", en: "Realtime Console" },
        desc: { uz: "Agent amallarini real vaqt rejimida kuzatib borish oqimi.", en: "Pulsing logs showing raw thoughts, decisions, and execution status." },
        x: 50,
        y: 78,
      },
    ],
    simulatedUI: {
      titleBar: "neuralflow.ai // active_session",
      heroText: "AVTONOM ISH OQIMLARI",
      accentColor: "#ff4500",
      bgPattern: "bg-grid-blueprint",
    },
  },
  {
    id: "synthetix",
    name: "Synthetix Dash",
    tag: { uz: "FINTECH ANALITIKA", en: "FINTECH REALTIME ANALYTICS" },
    desc: {
      uz: "Kriptovalyutalar va moliyaviy aktivlar uchun signal tizimlari va yuqori tezlikdagi realtaym grafiklar dashboard platformasi. React, Tailwind, Recharts.",
      en: "High-frequency dashboard displaying multi-asset financial feeds, realtime price alerts, and advanced predictive charts. Built with React and Recharts.",
    },
    metrics: { perf: 99, code: 94, ux: 98, seo: 92 },
    features: [
      {
        title: { uz: "Tezkor Grafik", en: "Sub-millisecond Charts" },
        desc: { uz: "Ma'lumotlarni kechikishlarsiz vizuallashtiradi.", en: "Renders thousands of points with smooth animation updates." },
        x: 65,
        y: 30,
      },
      {
        title: { uz: "Sun'iy Intellekt Signali", en: "AI Signals Integration" },
        desc: { uz: "Bozor anomaliyalarini aniqlovchi neyron signallari.", en: "Neural layers monitoring feeds for anomalies and trends." },
        x: 25,
        y: 55,
      },
      {
        title: { uz: "Xavfsiz Tranzaksiya", en: "Secure Ledger" },
        desc: { uz: "Tranzaksiyalarni real vaqtda tekshirish va yozish.", en: "End-to-end type-safe logs guaranteeing execution audit." },
        x: 48,
        y: 82,
      },
    ],
    simulatedUI: {
      titleBar: "synthetix.net // core_terminal",
      heroText: "REALTAYM ANALITIKA",
      accentColor: "#DFFF00",
      bgPattern: "bg-grid-dots",
    },
  },
  {
    id: "mvmsolo",
    name: "MvMSOLO Hub",
    tag: { uz: "TEXNIK KONTENT PLATFORMASI", en: "TECHNICAL VIDEOGRAPHY HUB" },
    desc: {
      uz: "Dasturlash va zamonaviy texnologiyalarni interaktiv darslar va video laboratoriyalar orqali o'rgatuvchi YouTube ekotizimi.",
      en: "Interactive video streaming & documentation platform backing the MvMSOLO YouTube educational engineering community.",
    },
    metrics: { perf: 95, code: 98, ux: 96, seo: 99 },
    features: [
      {
        title: { uz: "Interaktiv Pleyer", en: "Interactive Player" },
        desc: { uz: "Video darslikka biriktirilgan realtaym kod muharriri.", en: "Integrated code workspace synced directly with timestamps." },
        x: 35,
        y: 40,
      },
      {
        title: { uz: "Hamjamiyat Quvvati", en: "Community Metrics" },
        desc: { uz: "Foydalanuvchilar orasida reyting tizimi va yutuqlar.", en: "Badges, rankings, and gamified roadmap pathways." },
        x: 72,
        y: 28,
      },
      {
        title: { uz: "Avtomatlashgan Darsliklar", en: "Automated Roadmaps" },
        desc: { uz: "Har bir dasturchi uchun AI tomonidan yaratilgan reja.", en: "Curated learning structures generated by student profile." },
        x: 50,
        y: 70,
      },
    ],
    simulatedUI: {
      titleBar: "mvmsolo.dev // video_workspace",
      heroText: "BILIMLAR LABARATORIYASI",
      accentColor: "#ff2244",
      bgPattern: "bg-[#0e0d11]",
    },
  },
];

export function ProjectShowroom() {
  const { lang } = useLang();
  const { playHover, playClick } = useSound();
  const [activeProjIdx, setActiveProjIdx] = useState(0);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null);

  const activeProj = showcaseProjects[activeProjIdx];

  const handleProjChange = (idx: number) => {
    playClick();
    setActiveProjIdx(idx);
    setSelectedHotspot(null);
  };

  const handleViewportChange = (vp: typeof viewport) => {
    playClick();
    setViewport(vp);
    setSelectedHotspot(null);
  };

  return (
    <section id="project-showroom" className="px-5 md:px-20 lg:px-32 py-16 md:py-24 border-t border-border bg-[radial-gradient(ellipse_at_100%_100%,rgba(255,69,0,0.05)_0%,transparent_55%)] relative overflow-hidden">
      {/* Visual blueprint overlay */}
      <div className="absolute inset-0 bg-grid-dots opacity-[0.05] pointer-events-none" />

      <RevealBox className="mb-10 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent font-mono">
          // INTERACTIVE SHOWROOM · SIMULATION SANDBOX
        </span>
      </RevealBox>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 mb-12">
        <div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter mb-4">
            {lang === "uz" ? "Loyiha" : "Interactive"}
            <br />
            <span className="text-accent">{lang === "uz" ? "ko'rgazmasi" : "Showroom"}</span>
          </h2>
          <p className="text-sm text-white/50 max-w-[44ch]">
            {lang === "uz"
              ? "Ishlab chiqilgan loyihalarning interaktiv simulyatori. Ularni turli ekranlarda tekshiring va texnik ko'rsatkichlarni tahlil qiling."
              : "Live responsive device sandbox. Swap between simulated viewports, inspect actual code hotspots, and check core performance specs."}
          </p>
        </div>

        {/* Diagnostic Technical Meters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 self-end bg-white/[0.02] border border-white/[0.07] backdrop-blur-sm p-4 rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          {[
            { label: "PERFORMANCE", val: activeProj.metrics.perf, icon: <Flame className="w-4 h-4 text-orange-500" /> },
            { label: "CLEAN CODE", val: activeProj.metrics.code, icon: <ShieldCheck className="w-4 h-4 text-green-500" /> },
            { label: "SYSTEM UX", val: activeProj.metrics.ux, icon: <Zap className="w-4 h-4 text-yellow-500" /> },
            { label: "SEO OPTIMIZED", val: activeProj.metrics.seo, icon: <CheckCircle className="w-4 h-4 text-blue-500" /> },
          ].map((m) => (
            <div key={m.label} className="font-mono text-[10px] uppercase space-y-2">
              <div className="flex items-center gap-1 text-white/40">
                {m.icon}
                <span className="truncate">{m.label}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-white font-display">{m.val}</span>
                <span className="text-[8px] text-white/30">/100</span>
              </div>
              <div className="h-1 bg-white/5 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${m.val}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs / Project selection */}
      <div className="flex gap-2 mb-8 border-b border-white/5 pb-4 overflow-x-auto">
        {showcaseProjects.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => handleProjChange(idx)}
            onMouseEnter={playHover}
            className={`px-4 py-2 text-[10px] uppercase font-mono tracking-widest border transition-all whitespace-nowrap rounded-sm ${
              activeProjIdx === idx
                ? "border-accent bg-accent/10 text-accent font-bold"
                : "border-border text-white/50 hover:border-white/20 hover:text-white"
            }`}
          >
            ◉ {p.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-8 items-start">
        {/* Responsive Virtual Device Box */}
        <div className="space-y-4">
          {/* Device switcher toolbar */}
          <div className="flex items-center justify-between px-4 py-2 border border-white/[0.08] bg-[#0b0a0e]/90 backdrop-blur-xl rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <span className="font-mono text-[9px] uppercase text-white/40 tracking-wider">
              VIEWPORT_SIMULATION: {viewport.toUpperCase()}
            </span>

            <div className="flex gap-2">
              {[
                { id: "desktop", icon: <Laptop className="w-4 h-4" /> },
                { id: "tablet", icon: <Tablet className="w-4 h-4" /> },
                { id: "mobile", icon: <Smartphone className="w-4 h-4" /> },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => handleViewportChange(btn.id as any)}
                  onMouseEnter={playHover}
                  className={`p-1.5 border rounded-sm transition-all ${
                    viewport === btn.id
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-white/5 text-white/40 hover:text-white"
                  }`}
                  aria-label={`Switch viewport to ${btn.id}`}
                >
                  {btn.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Device Frame */}
          <div className="flex justify-center items-center bg-black/40 border border-white/5 p-4 md:p-8 rounded-sm min-h-[460px] relative overflow-hidden">
            {/* Shimmer and Grid effects */}
            <div className="absolute inset-0 bg-grid-dots opacity-[0.03] pointer-events-none" />

            <motion.div
              layout
              transition={{ type: "spring", stiffness: 180, damping: 25 }}
              className={`border border-white/20 bg-background shadow-2xl relative overflow-hidden transition-all ${
                viewport === "desktop"
                  ? "w-full max-w-2xl aspect-[16/10] rounded-md"
                  : viewport === "tablet"
                    ? "w-[380px] h-[500px] rounded-lg"
                    : "w-[240px] h-[450px] rounded-[2rem] border-4 border-white/10"
              }`}
            >
              {/* Desktop Browser top bar */}
              {viewport === "desktop" && (
                <div className="flex items-center gap-2 px-3 py-2 bg-secondary/50 border-b border-white/10 select-none">
                  <div className="flex gap-1">
                    <div className="size-2 rounded-full bg-red-500/50" />
                    <div className="size-2 rounded-full bg-yellow-500/50" />
                    <div className="size-2 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 bg-black/40 rounded-sm text-center py-0.5 text-[8px] font-mono text-white/30 truncate max-w-xs mx-auto">
                    {activeProj.simulatedUI.titleBar}
                  </div>
                </div>
              )}

              {/* Mobile top speaker/camera notch */}
              {viewport === "mobile" && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/60 rounded-b-xl z-20 flex justify-center items-center">
                  <div className="w-8 h-1 bg-white/20 rounded-full" />
                </div>
              )}

              {/* Live Mock UI Screen Area */}
              <div className={`w-full h-full relative p-6 flex flex-col justify-between overflow-hidden ${activeProj.simulatedUI.bgPattern} bg-black/90`}>
                <div className="flex justify-between items-start pt-3">
                  <span className="text-[7px] font-mono tracking-widest uppercase text-accent font-bold px-1.5 py-0.5 bg-accent/10 border border-accent/20">
                    {viewport === "mobile" ? "LIVE" : activeProj.tag[lang]}
                  </span>
                  <span className="text-[7px] font-mono text-white/30">SYS_REV: v2025</span>
                </div>

                <div className="my-auto space-y-3 py-4 text-center">
                  <motion.h3
                    key={activeProj.id + viewport}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-display uppercase tracking-tighter text-white select-none"
                    style={{
                      fontSize: viewport === "desktop" ? "2.2rem" : viewport === "tablet" ? "1.8rem" : "1.2rem",
                      color: activeProj.simulatedUI.accentColor,
                    }}
                  >
                    {activeProj.simulatedUI.heroText}
                  </motion.h3>
                  <p className="font-mono text-white/40 mx-auto max-w-[28ch] select-none" style={{ fontSize: viewport === "desktop" ? "9px" : "8px" }}>
                    VANILLA CODE INTEGRITY // NO FRAMEWORKS // PURE SPEED
                  </p>
                </div>

                <div className="flex justify-between items-center text-[7px] font-mono text-white/20 pt-2 border-t border-white/5">
                  <span>DASHBOARD: COMPILED</span>
                  <span>99.9% SECURE</span>
                </div>

                {/* Simulated Interactivity Hotspots */}
                <AnimatePresence>
                  {activeProj.features.map((f, i) => {
                    // Coordinates might need a minor scale based on viewport size
                    const isSelected = selectedHotspot === i;
                    return (
                      <div
                        key={i}
                        className="absolute"
                        style={{ left: `${f.x}%`, top: `${f.y}%` }}
                      >
                        <button
                          onClick={() => {
                            playClick();
                            setSelectedHotspot(isSelected ? null : i);
                          }}
                          onMouseEnter={playHover}
                          className="relative size-6 flex items-center justify-center group z-10"
                          aria-label={`View feature: ${f.title[lang]}`}
                        >
                          <span
                            className="absolute inset-0 rounded-full animate-ping opacity-60"
                            style={{ backgroundColor: activeProj.simulatedUI.accentColor }}
                          />
                          <span
                            className={`size-3.5 rounded-full border border-white transition-transform duration-300 flex items-center justify-center text-[8px] font-bold text-background font-mono ${
                              isSelected ? "scale-110" : "scale-100"
                            }`}
                            style={{ backgroundColor: activeProj.simulatedUI.accentColor }}
                          >
                            +
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Diagnostic Panel & Details */}
        <div className="space-y-6">
          <div className="border border-white/10 bg-secondary/20 p-5 rounded-sm space-y-4">
            <span className="text-[10px] font-mono uppercase text-accent tracking-widest block border-b border-white/5 pb-2">
              // SPECIFICATION REPORT
            </span>

            <div className="space-y-3">
              <h3 className="font-display text-3xl uppercase tracking-tight text-white">
                {activeProj.name}
              </h3>
              <p className="text-xs text-white/60 leading-relaxed">
                {activeProj.desc[lang]}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
              {["TypeScript", "HTML5", "CSS3", "Vanilla JS", "Supabase", "OpenAI API"].map((badge) => (
                <span
                  key={badge}
                  className="px-2 py-1 bg-white/5 border border-white/5 text-[9px] font-mono uppercase text-white/40"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Feature hotspot detail display */}
          <div className="border border-white/10 bg-[#0e0d11]/90 p-5 rounded-sm min-h-[160px] relative overflow-hidden flex flex-col justify-center">
            {/* Holographic background wireframe details */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/2 rounded-bl-full translate-x-8 -translate-y-8" />

            <AnimatePresence mode="wait">
              {selectedHotspot !== null ? (
                <motion.div
                  key={selectedHotspot}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="size-2 bg-accent rounded-full animate-pulse" />
                    <span className="font-mono text-[9px] uppercase text-accent tracking-widest">
                      HOTSPOT FEATURE // 0{selectedHotspot + 1}
                    </span>
                  </div>
                  <h4 className="font-display text-2xl uppercase tracking-tight text-white">
                    {activeProj.features[selectedHotspot].title[lang]}
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed">
                    {activeProj.features[selectedHotspot].desc[lang]}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-6 space-y-2 font-mono text-[10px] text-white/30 uppercase tracking-widest"
                >
                  <div>◉ INTERACT WITH THE DEVICE WORKSPACE</div>
                  <div>CLICK THE GLOWING HOTSPOTS TO DRILL DOWN</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
