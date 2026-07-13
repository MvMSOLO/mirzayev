import { useState, useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { RevealBox, WordReveal } from "./TextReveal";
import { useSound } from "@/hooks/useSound";
import { Play, RotateCcw, ShieldCheck, Terminal, Cpu, FileCode2, Globe, Heart, CheckCircle2, ChevronRight, Activity, Search } from "lucide-react";

export function Philosophy() {
  const { t, lang } = useLang();
  const { playHover, playClick, play } = useSound();
  const [activeStep, setActiveStep] = useState(0);
  const [coords, setCoords] = useState({ x: 120, y: 350 });
  const [simulatedProgress, setSimulatedProgress] = useState(100);
  const [typedCode, setTypedCode] = useState("");
  const [launchSequence, setLaunchSequence] = useState(false);
  const [launchProgress, setLaunchProgress] = useState(0);
  const [testLogOffset, setTestLogOffset] = useState(0);

  // Generate dynamic coordinates and simulator progression on step switch
  useEffect(() => {
    setSimulatedProgress(0);
    const interval = setInterval(() => {
      setSimulatedProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [activeStep]);

  // Handle cursor / coordinate tracking inside the canvas
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCoords({ x, y });
  };

  // Typwriter simulator for coding phase
  const codeSnippet = `// Active Developer Matrix\ninterface DevStack {\n  engine: "React 19";\n  state: "TanStack Router";\n  speed: "Satisfying";\n}\n\nexport function Build() {\n  const [pixel, setPixel] = useState("Poem");\n  return <Core state={pixel} />;\n}`;

  useEffect(() => {
    if (activeStep !== 1) {
      setTypedCode("");
      return;
    }
    let cur = 0;
    const interval = setInterval(() => {
      setTypedCode(codeSnippet.slice(0, cur));
      cur += 3;
      if (cur > codeSnippet.length) {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [activeStep]);

  // Simulated live tests updating
  useEffect(() => {
    if (activeStep !== 2) return;
    const interval = setInterval(() => {
      setTestLogOffset((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, [activeStep]);

  // Launch trigger simulation
  const triggerLaunch = () => {
    if (launchSequence) return;
    play("boot");
    setLaunchSequence(true);
    setLaunchProgress(0);
    const interval = setInterval(() => {
      setLaunchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          play("success");
          return 100;
        }
        if (prev % 10 === 0) {
          play("type");
        }
        return prev + 4;
      });
    }, 60);
  };

  const resetLaunch = () => {
    setLaunchSequence(false);
    setLaunchProgress(0);
    play("click");
  };

  const stepsData = [
    {
      num: "01",
      tag: "PHASE_01 // THINK",
      title: t("phi.1.t"),
      desc: t("phi.1.d"),
      checklist: [
        { uz: "Muammo modelini chizish", en: "Frame challenge model" },
        { uz: "Foydalanuvchi yo'lini tahlil qilish", en: "Analyze user behaviors" },
        { uz: "Texnik arxitekturani rejalashtirish", en: "Design system architecture" },
        { uz: "Ma'lumotlar oqimini loyihalash", en: "Draft custom schema flows" }
      ],
      color: "from-orange-500 to-red-600",
      accentHex: "#FF4500",
    },
    {
      num: "02",
      tag: "PHASE_02 // CODE",
      title: t("phi.2.t"),
      desc: t("phi.2.d"),
      checklist: [
        { uz: "Type-safe TypeScript tili", en: "TypeScript logic implementation" },
        { uz: "React 19 komponentlar bazasi", en: "React 19 component ecosystem" },
        { uz: "TanStack router va sahifalar", en: "TanStack client page routing" },
        { uz: "Mikro-animatsiyalarni integratsiya qilish", en: "Polish custom micro-interactions" }
      ],
      color: "from-amber-400 to-yellow-500",
      accentHex: "#EAB308",
    },
    {
      num: "03",
      tag: "PHASE_03 // TEST",
      title: t("phi.3.t"),
      desc: t("phi.3.d"),
      checklist: [
        { uz: "Playwright e2e testdan o'tkazish", en: "Playwright functional test suite" },
        { uz: "Tezkorlik va yuklanish tahlili", en: "Measure client-side response times" },
        { uz: "SEO va toza kross-brauzerlik", en: "Cross-browser accessibility check" },
        { uz: "Hydration va reaktiv holatlarni tekshirish", en: "Inspect React 19 hydration cycles" }
      ],
      color: "from-emerald-400 to-teal-500",
      accentHex: "#10B981",
    },
    {
      num: "04",
      tag: "PHASE_04 // SHIP",
      title: t("phi.4.t"),
      desc: t("phi.4.d"),
      checklist: [
        { uz: "Loyiha kompilyatsiyasini optimallashtirish", en: "Bundle compilation optimizations" },
        { uz: "Global Edge va CDN yuklash", en: "Global edge CDN assets caching" },
        { uz: "SEO / Meta ma'lumotlar tahlili", en: "SEO compliance & search indexing" },
        { uz: "Mualliflik tekshiruvi: Yakun", en: "Author verification & complete launch" }
      ],
      color: "from-cyan-500 to-blue-600",
      accentHex: "#06B6D4",
    },
  ];

  const currentStepData = stepsData[activeStep];

  return (
    <section
      id="philosophy"
      className="px-5 md:px-20 lg:px-32 py-16 md:py-24 border-b border-border relative overflow-hidden"
    >
      {/* Visual blueprint overlay decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,69,0,0.03),transparent_50%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Coordinate & scanner header info */}
      <div className="absolute top-4 right-8 font-mono text-[8px] text-white/20 hidden xl:flex items-center gap-6">
        <span>X_COORD: {coords.x}PX // Y_COORD: {coords.y}PX</span>
        <span>LAB_METRIC: BUILD_PHASE_0{activeStep + 1}</span>
        <span>SYS_STATUS: ACTIVE</span>
      </div>

      <RevealBox className="mb-8 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent font-mono">{t("phi.tag")}</span>
      </RevealBox>

      {/* Main Title */}
      <div className="mb-14">
        <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.85]">
          <WordReveal text={t("phi.title_a")} sound /> <br />
          <span className="text-accent">
            <WordReveal text={t("phi.title_b")} delay={0.2} />
          </span>
        </h2>
        <p className="text-xs md:text-sm text-white/40 mt-4 max-w-md uppercase tracking-wider font-mono">
          // INTERACTIVE SCHEMATIC LAB: {lang === "uz" ? "QURILISH BOSQICHLARI" : "STEP-BY-STEP RENDERER"}
        </p>
      </div>

      {/* Interactive Blueprint Split Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] gap-10 items-stretch">

        {/* Left Column: Interactive Steps & Task list */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            {stepsData.map((step, i) => {
              const isActive = i === activeStep;
              return (
                <button
                  key={step.num}
                  onClick={() => {
                    playClick();
                    setActiveStep(i);
                  }}
                  onMouseEnter={() => playHover()}
                  className={`w-full text-left p-4 border transition-all duration-300 relative overflow-hidden flex items-center gap-4 group ${
                    isActive
                      ? "bg-secondary/40 border-accent/40 shadow-[0_0_30px_rgba(255,69,0,0.04)]"
                      : "bg-transparent border-white/5 hover:border-white/20 hover:bg-white/1"
                  }`}
                >
                  {/* Left accent bar on active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeStepIndicator"
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Micro grid indicator inside card */}
                  <div className="absolute right-2 top-2 font-mono text-[8px] text-white/5 group-hover:text-white/10 transition-colors">
                    [{step.tag}]
                  </div>

                  {/* Step Num Circular Marker */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm border transition-all duration-300 shrink-0 ${
                      isActive
                        ? "border-accent text-accent bg-accent/10 font-bold"
                        : "border-white/10 text-white/30"
                    }`}
                  >
                    {step.num}
                  </div>

                  {/* Step Text details */}
                  <div className="flex-1">
                    <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase block">
                      {step.tag}
                    </span>
                    <h4 className="font-display text-lg md:text-xl uppercase tracking-tight text-white/90 group-hover:text-white transition-colors">
                      {step.title}
                    </h4>
                  </div>

                  {/* Chevron helper */}
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isActive ? "text-accent translate-x-0" : "text-white/25 group-hover:translate-x-1"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Checklist & Desc for Active Step */}
          <div className="border border-white/5 bg-black/40 p-5 relative overflow-hidden transition-all duration-500">
            {/* Shifting background laser line */}
            <div className="absolute top-0 left-0 w-24 h-[1px] bg-accent" />
            <div className="absolute top-0 left-0 w-[1px] h-12 bg-accent" />

            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-mono text-accent uppercase tracking-widest">
                // {currentStepData.tag} METRICS
              </span>
              <span className="text-[9px] font-mono text-white/30">
                PROG_INDEX: {simulatedProgress}%
              </span>
            </div>

            <p className="text-sm text-white/70 leading-relaxed mb-5">
              {currentStepData.desc}
            </p>

            {/* Simulated Live Checklist */}
            <div className="space-y-2">
              <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block mb-2">
                Required Milestones:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentStepData.checklist.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-[11px] text-white/60 font-mono"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent/60 shrink-0" />
                    <span className="truncate">{lang === "uz" ? item.uz : item.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visualizer Canvas Dashboard */}
        <div
          onMouseMove={handleMouseMove}
          className="border border-white/10 bg-secondary/20 relative rounded-lg overflow-hidden flex flex-col min-h-[420px] shadow-[inset_0_0_30px_rgba(255,255,255,0.01)] group"
        >
          {/* Visual Canvas Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-white/5 font-mono text-[9px] select-none text-white/40">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent/40 animate-pulse" />
              <span className="uppercase tracking-widest text-white/60">
                BLUEPRINT_BOARD // SIM_O0{activeStep + 1}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span>SCANNER: ACTIVE</span>
              <span>GPS: {coords.x},{coords.y}</span>
            </div>
          </div>

          {/* Internal Visualizer Body */}
          <div className="flex-1 p-6 relative flex flex-col justify-center items-center overflow-hidden">
            {/* Grid blueprint background for the scanner */}
            <div className="absolute inset-0 bg-grid-blueprint opacity-[0.02] pointer-events-none" />

            {/* Sweeping scanlaser line */}
            <div className="absolute inset-x-0 h-px bg-accent/15 animate-scan-y top-0 pointer-events-none" />

            <AnimatePresence mode="wait">
              {/* STEP 1: THINKING & RESEARCHING (Animated Node Connection Graph) */}
              {activeStep === 0 && (
                <motion.div
                  key="think-visual"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full relative flex flex-col justify-between"
                >
                  <div className="text-center mb-2">
                    <span className="text-[10px] font-mono text-accent/60 uppercase tracking-widest bg-accent/5 border border-accent/10 px-2 py-0.5">
                      Neural Brainstorm Mapping
                    </span>
                  </div>

                  {/* SVG Map of interconnected nodes */}
                  <div className="flex-1 relative min-h-[220px]">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 220">
                      {/* Connected Laser Lines */}
                      <motion.line
                        x1="80" y1="50" x2="200" y2="110"
                        stroke={currentStepData.accentHex}
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: -20 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
                      />
                      <motion.line
                        x1="320" y1="50" x2="200" y2="110"
                        stroke={currentStepData.accentHex}
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: 20 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 1.2 }}
                      />
                      <motion.line
                        x1="200" y1="110" x2="110" y2="180"
                        stroke={currentStepData.accentHex}
                        strokeWidth="1.5"
                        initial={{ strokeDasharray: "200", strokeDashoffset: 200 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                      <motion.line
                        x1="200" y1="110" x2="290" y2="180"
                        stroke={currentStepData.accentHex}
                        strokeWidth="1.5"
                        initial={{ strokeDasharray: "200", strokeDashoffset: 200 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 1.8, ease: "easeInOut" }}
                      />

                      {/* Nodes */}
                      {/* Node A: Challenge */}
                      <g className="cursor-pointer group/node" onClick={() => play("type")}>
                        <circle cx="80" cy="50" r="14" fill="#16151a" stroke={currentStepData.accentHex} strokeWidth="2" />
                        <circle cx="80" cy="50" r="6" fill={currentStepData.accentHex} className="animate-pulse" />
                        <text x="80" y="30" fill="white" fontSize="9" fontFamily="monospace" textAnchor="middle" className="opacity-80">CHALLENGE</text>
                      </g>

                      {/* Node B: Audience */}
                      <g className="cursor-pointer group/node" onClick={() => play("type")}>
                        <circle cx="320" cy="50" r="14" fill="#16151a" stroke={currentStepData.accentHex} strokeWidth="2" />
                        <circle cx="320" cy="50" r="6" fill={currentStepData.accentHex} />
                        <text x="320" y="30" fill="white" fontSize="9" fontFamily="monospace" textAnchor="middle" className="opacity-80">USER_FLOW</text>
                      </g>

                      {/* Node C: Core Idea (Central) */}
                      <g className="cursor-pointer group/node" onClick={() => play("submit")}>
                        <circle cx="200" cy="110" r="18" fill="#16151a" stroke={currentStepData.accentHex} strokeWidth="2.5" />
                        <circle cx="200" cy="110" r="10" fill={currentStepData.accentHex} className="animate-ping" style={{ animationDuration: "2s" }} />
                        <text x="200" y="85" fill="white" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">IDEA_CORE</text>
                      </g>

                      {/* Node D: Architecture */}
                      <g className="cursor-pointer group/node" onClick={() => play("type")}>
                        <circle cx="110" cy="180" r="14" fill="#16151a" stroke={currentStepData.accentHex} strokeWidth="2" />
                        <circle cx="110" cy="180" r="5" fill={currentStepData.accentHex} />
                        <text x="110" y="202" fill="white" fontSize="9" fontFamily="monospace" textAnchor="middle" className="opacity-80">ARCH_STACK</text>
                      </g>

                      {/* Node E: Layout Scope */}
                      <g className="cursor-pointer group/node" onClick={() => play("type")}>
                        <circle cx="290" cy="180" r="14" fill="#16151a" stroke={currentStepData.accentHex} strokeWidth="2" />
                        <circle cx="290" cy="180" r="5" fill={currentStepData.accentHex} />
                        <text x="290" y="202" fill="white" fontSize="9" fontFamily="monospace" textAnchor="middle" className="opacity-80">WIREFRAMES</text>
                      </g>
                    </svg>

                    {/* Interactive coordinate scanner hover panel */}
                    <div className="absolute bottom-1 right-2 font-mono text-[8px] text-white/30 border border-white/5 px-2 py-1 bg-black/60">
                      SYS_LINK_MUTUAL: READY
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: UNDERSTANDING & CODING (Live AST & Type typing IDE) */}
              {activeStep === 1 && (
                <motion.div
                  key="code-visual"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full flex flex-col justify-between"
                >
                  <div className="flex justify-between items-center bg-black/40 px-3 py-1.5 border border-white/5 font-mono text-[9px] text-white/40 mb-3">
                    <span>STRUCTURE: src/components/Philosophy.tsx</span>
                    <span className="text-yellow-500 animate-pulse">● AUTOCOMPILING</span>
                  </div>

                  {/* Typing Code Display */}
                  <div className="flex-1 bg-black/80 rounded p-4 font-mono text-[11px] leading-relaxed text-yellow-500/80 overflow-y-auto max-h-[200px] border border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.03)] text-left">
                    <pre className="whitespace-pre-wrap">
                      {typedCode}
                      <span className="inline-block w-1.5 h-3.5 bg-yellow-500 animate-blink ml-0.5" />
                    </pre>
                  </div>

                  <div className="mt-3 flex justify-between items-center font-mono text-[9px] text-white/30">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-yellow-500" />
                      TYPES_STATUS: 100% SECURE
                    </span>
                    <span>144ms PARSE TIME</span>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: TESTING & VERIFICATION (Unit-Tests & Active Load Charts) */}
              {activeStep === 2 && (
                <motion.div
                  key="test-visual"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full flex flex-col justify-between"
                >
                  <div className="grid grid-cols-3 gap-2 text-center mb-4">
                    {[
                      { label: "PLAYWRIGHT", status: "PASS", val: "100%", color: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5" },
                      { label: "HYDRATION", status: "PASS", val: "0.08ms", color: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5" },
                      { label: "MEM_LEAKS", status: "0 LEAKS", val: "OK", color: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5" },
                    ].map((m, idx) => (
                      <div key={idx} className={`p-2 border font-mono text-[9px] ${m.color}`}>
                        <div className="text-[7px] text-white/30 uppercase tracking-widest">{m.label}</div>
                        <div className="font-bold text-xs mt-0.5">{m.status}</div>
                        <div className="text-[7px] opacity-70 mt-0.5">{m.val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Simulated Terminal Output for tests */}
                  <div className="flex-1 bg-black/70 rounded p-3 font-mono text-[10px] text-left text-emerald-400/80 space-y-1.5 overflow-hidden max-h-[140px] border border-emerald-500/20 relative">
                    <div className="absolute top-1 right-2 text-[8px] text-white/20 animate-pulse">RUNNING</div>

                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span className="text-white/70">Test: Navigation transition flow...</span>
                      <span className="ml-auto text-emerald-400">PASSED</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span className="text-white/70">Test: Universe SSR hydration check...</span>
                      <span className="ml-auto text-emerald-400">PASSED</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span className="text-white/70">Test: Audio assets loading latency...</span>
                      <span className="ml-auto text-emerald-400">PASSED</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span className="text-white/70">Test: Framer-motion v12 timelines...</span>
                      <span className="ml-auto text-emerald-400">PASSED</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-40">
                      <span>⚙</span>
                      <span>Benchmarking frame updates (120 FPS)...</span>
                    </div>
                  </div>

                  {/* SVG line graph simulator */}
                  <div className="mt-4 h-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-emerald-500/5" />
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 50">
                      <path
                        d="M 0 40 Q 50 10, 100 35 T 200 15 T 300 45 T 400 20"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                      <path
                        d="M 0 40 Q 50 10, 100 35 T 200 15 T 300 45 T 400 20 L 400 50 L 0 50 Z"
                        fill="url(#emerald-gradient)"
                        className="opacity-20"
                      />
                      <defs>
                        <linearGradient id="emerald-gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10B981" />
                          <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: DELIVERING & FINALIZING (Edge networks & launch toggle) */}
              {activeStep === 3 && (
                <motion.div
                  key="ship-visual"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full flex flex-col justify-between"
                >
                  <div className="text-center mb-3">
                    <span className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded">
                      Production Edge Deployment
                    </span>
                  </div>

                  {/* Score circle meter */}
                  <div className="flex-1 flex justify-center items-center gap-6 relative">
                    {/* Lighthouse score meter */}
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      {/* Circle track */}
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="56" cy="56" r="48" stroke="rgba(6,182,212,0.1)" strokeWidth="6" fill="transparent" />
                        <motion.circle
                          cx="56"
                          cy="56"
                          r="48"
                          stroke="#06B6D4"
                          strokeWidth="6"
                          fill="transparent"
                          strokeDasharray={301.6}
                          initial={{ strokeDashoffset: 301.6 }}
                          animate={{ strokeDashoffset: launchSequence ? 0 : 30.16 }}
                          transition={{ duration: 2, ease: "easeOut" }}
                        />
                      </svg>
                      {/* Score percentage text */}
                      <div className="absolute flex flex-col items-center">
                        <span className="font-display text-3xl text-cyan-400 leading-none">
                          {launchSequence ? "100" : "99"}
                        </span>
                        <span className="text-[7px] font-mono text-white/30 uppercase tracking-widest mt-0.5">SPEED</span>
                      </div>
                    </div>

                    {/* Edge network logs list */}
                    <div className="font-mono text-[9px] text-left text-white/60 space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        <span>EDGE: FR_PARIS_01 (10ms)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>EDGE: US_VIRGINIA_02 (18ms)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>EDGE: AS_TOKYO_04 (22ms)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>SEO_INDEX: INDEXED</span>
                      </div>
                    </div>
                  </div>

                  {/* Launcher Interactive Switch */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex flex-col gap-2">
                    {launchSequence ? (
                      <div className="space-y-1">
                        <div className="flex justify-between font-mono text-[9px] text-cyan-400">
                          <span>DEPLOYING ASSETS...</span>
                          <span>{launchProgress}%</span>
                        </div>
                        <div className="h-2 w-full bg-cyan-950/50 rounded overflow-hidden relative">
                          <motion.div
                            className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"
                            initial={{ width: "0%" }}
                            animate={{ width: `${launchProgress}%` }}
                          />
                        </div>
                        {launchProgress === 100 && (
                          <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={resetLaunch}
                            className="w-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 py-1.5 rounded font-mono text-[10px] uppercase tracking-widest mt-1 hover:bg-cyan-500/20 transition-colors"
                          >
                            Reset Live Launcher
                          </motion.button>
                        )}
                      </div>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={triggerLaunch}
                        className="w-full bg-cyan-500 text-black py-2.5 rounded font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2"
                      >
                        <Globe className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "5s" }} />
                        <span>LAUNCH PRODUCTION BUILD</span>
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Visual Canvas Terminal Footer info */}
          <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex justify-between items-center font-mono text-[8px] text-white/30 select-none">
            <span>ENGINE: HYBRID_V2035</span>
            <span className="animate-pulse">CPU_CORES: OPTIMIZED</span>
          </div>
        </div>
      </div>
    </section>
  );
}
