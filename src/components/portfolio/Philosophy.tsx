import { useState, useEffect, useRef, memo } from "react";
import { useLang } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { RevealBox, WordReveal } from "./TextReveal";
import { useSound } from "@/hooks/useSound";
import { Play, RotateCcw, ShieldCheck, Terminal, Cpu, FileCode2, Globe, Heart, CheckCircle2, ChevronRight, Activity, Search } from "lucide-react";

export const Philosophy = memo(function Philosophy() {
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
      color: "from-[#00d4ff] to-blue-500",
      accentHex: "#00d4ff",
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
      className="px-5 md:px-20 lg:px-32 py-28 md:py-40 border-b border-white/[0.06] relative overflow-hidden bg-atmosphere-orange"
    >
      {/* Visual blueprint overlay decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,69,0,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* Coordinate & scanner header info */}
      <div className="absolute top-8 right-12 font-mono text-[9px] text-[var(--cyan)]/30 font-bold hidden xl:flex items-center gap-8 glass-card border border-[var(--cyan)]/20 px-4 py-2 rounded-md">
        <span>X_COORD: {coords.x}PX // Y_COORD: {coords.y}PX</span>
        <span>LAB_METRIC: BUILD_PHASE_0{activeStep + 1}</span>
        <span>SYS_STATUS: ACTIVE</span>
      </div>

      <RevealBox className="mb-14 flex gap-4 items-center">
        <div className="h-1 w-12 bg-gradient-to-r from-accent to-transparent rounded-full" />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold text-accent drop-shadow-[0_0_8px_rgba(255,69,0,0.6)]">{t("phi.tag")}</span>
      </RevealBox>

      {/* Main Title */}
      <div className="mb-20">
        <h2 className="font-display text-7xl md:text-9xl uppercase tracking-tighter leading-[0.85] text-white">
          <WordReveal text={t("phi.title_a")} sound /> <br />
          <span className="text-accent drop-shadow-[0_0_20px_rgba(255,69,0,0.4)]">
            <WordReveal text={t("phi.title_b")} delay={0.2} />
          </span>
        </h2>
        <p className="font-mono text-[11px] text-white/50 font-bold mt-6 max-w-lg uppercase tracking-[0.25em]">
          // INTERACTIVE SCHEMATIC LAB: {lang === "uz" ? "QURILISH BOSQICHLARI" : "STEP-BY-STEP RENDERER"}
        </p>
      </div>

      {/* Interactive Blueprint Split Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] gap-12 items-stretch">

        {/* Left Column: Interactive Steps & Task list */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
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
                  className={`w-full text-left p-5 border transition-all duration-400 relative overflow-hidden flex items-center gap-5 group rounded-xl ${
                    isActive
                      ? "bg-accent/[0.08] border-accent/60 shadow-[0_0_30px_rgba(255,69,0,0.15)]"
                      : "glass-card border-white/10 hover:border-accent/40 hover:bg-white/[0.03]"
                  }`}
                >
                  {/* Left accent bar on active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeStepIndicator"
                      className="absolute left-0 top-0 bottom-0 w-[4px] bg-accent shadow-[0_0_10px_#ff4500]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Micro grid indicator inside card */}
                  <div className="absolute right-3 top-3 font-mono text-[9px] text-white/20 group-hover:text-[var(--cyan)]/40 font-bold transition-colors">
                    [{step.tag}]
                  </div>

                  {/* Step Num Circular Marker */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-mono text-base border transition-all duration-400 shrink-0 shadow-lg ${
                      isActive
                        ? "border-accent text-accent bg-accent/20 font-bold shadow-[0_0_15px_rgba(255,69,0,0.4)]"
                        : "border-white/20 text-white/50 group-hover:border-[var(--cyan)]/50 group-hover:text-[var(--cyan)]"
                    }`}
                  >
                    {step.num}
                  </div>

                  {/* Step Text details */}
                  <div className="flex-1">
                    <span className="text-[10px] font-mono tracking-widest text-white/40 font-bold uppercase block mb-1">
                      {step.tag}
                    </span>
                    <h4 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-white group-hover:text-accent transition-colors">
                      {step.title}
                    </h4>
                  </div>

                  {/* Chevron helper */}
                  <ChevronRight
                    className={`w-5 h-5 transition-transform duration-400 ${
                      isActive ? "text-accent translate-x-0" : "text-white/40 group-hover:translate-x-2 group-hover:text-accent"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Checklist & Desc for Active Step */}
          <div className="glass-dark border-gradient-accent p-7 relative overflow-hidden transition-all duration-500 rounded-xl shadow-glow-orange">
            {/* Shifting background laser line */}
            <div className="absolute top-0 left-0 w-32 h-[2px] bg-accent shadow-[0_0_10px_#ff4500]" />
            <div className="absolute top-0 left-0 w-[2px] h-16 bg-accent shadow-[0_0_10px_#ff4500]" />

            <div className="flex justify-between items-start mb-5">
              <span className="text-[11px] font-mono text-accent uppercase tracking-widest font-bold">
                // {currentStepData.tag} METRICS
              </span>
              <span className="text-[10px] font-mono text-[var(--cyan)] font-bold bg-[var(--cyan)]/10 px-2 py-1 border border-[var(--cyan)]/30 rounded">
                PROG_INDEX: {simulatedProgress}%
              </span>
            </div>

            <p className="text-base text-white/80 leading-[1.8] font-sans font-light mb-6">
              {currentStepData.desc}
            </p>

            {/* Simulated Live Checklist */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em] font-bold block mb-3">
                Required Milestones:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentStepData.checklist.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-[12px] text-white/70 font-mono bg-black/40 px-3 py-2 rounded border border-white/10"
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent drop-shadow-[0_0_5px_rgba(255,69,0,0.6)] shrink-0" />
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
          className="glass-dark border-gradient-cyan relative rounded-xl overflow-hidden flex flex-col min-h-[500px] shadow-glow-cyan group"
        >
          {/* Visual Canvas Terminal Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-black/80 border-b border-[var(--cyan)]/20 font-mono text-[10px] select-none text-white/60">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--cyan)] animate-pulse shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
              <span className="uppercase tracking-widest text-[var(--cyan)] font-bold">
                BLUEPRINT_BOARD // SIM_O0{activeStep + 1}
              </span>
            </div>
            <div className="flex items-center gap-5 font-bold">
              <span>SCANNER: ACTIVE</span>
              <span className="text-[var(--cyan)]">GPS: {coords.x},{coords.y}</span>
            </div>
          </div>

          {/* Internal Visualizer Body */}
          <div className="flex-1 p-8 relative flex flex-col justify-center items-center overflow-hidden bg-[#08070b]">
            {/* Grid blueprint background for the scanner */}
            <div className="absolute inset-0 bg-grid-blueprint opacity-[0.05] pointer-events-none" />

            {/* Sweeping scanlaser line */}
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--cyan)]/40 to-transparent shadow-[0_0_15px_var(--cyan)] animate-scan-y top-0 pointer-events-none" />

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
                  <div className="text-center mb-4">
                    <span className="text-[11px] font-mono text-[var(--cyan)] font-bold uppercase tracking-[0.2em] glass-card px-4 py-1.5 rounded-md border border-[var(--cyan)]/30 shadow-[0_0_10px_rgba(0,212,255,0.2)]">
                      Neural Brainstorm Mapping
                    </span>
                  </div>

                  {/* SVG Map of interconnected nodes */}
                  <div className="flex-1 relative min-h-[300px]">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250">
                      {/* Connected Laser Lines */}
                      <motion.line
                        x1="80" y1="60" x2="200" y2="130"
                        stroke={currentStepData.accentHex}
                        strokeWidth="2"
                        strokeDasharray="6 6"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: -30 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 1.5 }}
                        style={{ filter: `drop-shadow(0 0 4px ${currentStepData.accentHex})` }}
                      />
                      <motion.line
                        x1="320" y1="60" x2="200" y2="130"
                        stroke={currentStepData.accentHex}
                        strokeWidth="2"
                        strokeDasharray="6 6"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: 30 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 1.8 }}
                        style={{ filter: `drop-shadow(0 0 4px ${currentStepData.accentHex})` }}
                      />
                      <motion.line
                        x1="200" y1="130" x2="110" y2="210"
                        stroke={currentStepData.accentHex}
                        strokeWidth="2.5"
                        initial={{ strokeDasharray: "250", strokeDashoffset: 250 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 1.8, ease: "easeInOut" }}
                        style={{ filter: `drop-shadow(0 0 5px ${currentStepData.accentHex})` }}
                      />
                      <motion.line
                        x1="200" y1="130" x2="290" y2="210"
                        stroke={currentStepData.accentHex}
                        strokeWidth="2.5"
                        initial={{ strokeDasharray: "250", strokeDashoffset: 250 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 2.1, ease: "easeInOut" }}
                        style={{ filter: `drop-shadow(0 0 5px ${currentStepData.accentHex})` }}
                      />

                      {/* Nodes */}
                      {/* Node A: Challenge */}
                      <g className="cursor-pointer group/node" onClick={() => play("type")}>
                        <circle cx="80" cy="60" r="18" fill="#111015" stroke={currentStepData.accentHex} strokeWidth="3" />
                        <circle cx="80" cy="60" r="8" fill={currentStepData.accentHex} className="animate-pulse" />
                        <text x="80" y="35" fill="white" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">CHALLENGE</text>
                      </g>

                      {/* Node B: Audience */}
                      <g className="cursor-pointer group/node" onClick={() => play("type")}>
                        <circle cx="320" cy="60" r="18" fill="#111015" stroke={currentStepData.accentHex} strokeWidth="3" />
                        <circle cx="320" cy="60" r="8" fill={currentStepData.accentHex} />
                        <text x="320" y="35" fill="white" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">USER_FLOW</text>
                      </g>

                      {/* Node C: Core Idea (Central) */}
                      <g className="cursor-pointer group/node" onClick={() => play("submit")}>
                        <circle cx="200" cy="130" r="24" fill="#111015" stroke={currentStepData.accentHex} strokeWidth="4" style={{ filter: `drop-shadow(0 0 10px ${currentStepData.accentHex})` }}/>
                        <circle cx="200" cy="130" r="12" fill={currentStepData.accentHex} className="animate-ping" style={{ animationDuration: "2s" }} />
                        <text x="200" y="98" fill="white" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">IDEA_CORE</text>
                      </g>

                      {/* Node D: Architecture */}
                      <g className="cursor-pointer group/node" onClick={() => play("type")}>
                        <circle cx="110" cy="210" r="18" fill="#111015" stroke={currentStepData.accentHex} strokeWidth="3" />
                        <circle cx="110" cy="210" r="7" fill={currentStepData.accentHex} />
                        <text x="110" y="240" fill="white" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">ARCH_STACK</text>
                      </g>

                      {/* Node E: Layout Scope */}
                      <g className="cursor-pointer group/node" onClick={() => play("type")}>
                        <circle cx="290" cy="210" r="18" fill="#111015" stroke={currentStepData.accentHex} strokeWidth="3" />
                        <circle cx="290" cy="210" r="7" fill={currentStepData.accentHex} />
                        <text x="290" y="240" fill="white" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">WIREFRAMES</text>
                      </g>
                    </svg>

                    {/* Interactive coordinate scanner hover panel */}
                    <div className="absolute bottom-2 right-4 font-mono text-[9px] text-[var(--cyan)] font-bold border border-[var(--cyan)]/30 px-3 py-1.5 glass-dark rounded">
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
                  <div className="flex justify-between items-center bg-black/60 px-4 py-2 border border-[var(--cyan)]/20 font-mono text-[10px] font-bold text-white/60 mb-4 rounded-t-lg">
                    <span>STRUCTURE: src/components/Philosophy.tsx</span>
                    <span className="text-[var(--cyan)] animate-pulse drop-shadow-[0_0_5px_rgba(0,212,255,0.8)]">● AUTOCOMPILING</span>
                  </div>

                  {/* Typing Code Display */}
                  <div className="flex-1 bg-[#0a090c] rounded-b-lg p-5 font-mono text-[13px] leading-loose text-[var(--cyan)] overflow-y-auto max-h-[300px] border border-[var(--cyan)]/20 shadow-[inset_0_0_30px_rgba(0,212,255,0.05)] text-left">
                    <pre className="whitespace-pre-wrap font-bold">
                      {typedCode}
                      <span className="inline-block w-2 h-4 bg-[var(--cyan)] animate-blink ml-1 align-middle shadow-[0_0_8px_var(--cyan)]" />
                    </pre>
                  </div>

                  <div className="mt-4 flex justify-between items-center font-mono text-[10px] text-white/50 font-bold px-2">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[var(--cyan)]" />
                      TYPES_STATUS: 100% SECURE
                    </span>
                    <span className="text-[var(--cyan)]">144ms PARSE TIME</span>
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
                  <div className="grid grid-cols-3 gap-3 text-center mb-6">
                    {[
                      { label: "PLAYWRIGHT", status: "PASS", val: "100%", color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]" },
                      { label: "HYDRATION", status: "PASS", val: "0.08ms", color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]" },
                      { label: "MEM_LEAKS", status: "0 LEAKS", val: "OK", color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]" },
                    ].map((m, idx) => (
                      <div key={idx} className={`p-4 border font-mono text-[10px] rounded-lg ${m.color}`}>
                        <div className="text-[9px] text-white/50 uppercase tracking-[0.2em] font-bold mb-1">{m.label}</div>
                        <div className="font-display text-2xl mt-1">{m.status}</div>
                        <div className="text-[10px] opacity-80 mt-1 font-bold">{m.val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Simulated Terminal Output for tests */}
                  <div className="flex-1 bg-[#0a090c] rounded-lg p-5 font-mono text-[12px] text-left text-emerald-400 space-y-2 overflow-hidden max-h-[180px] border border-emerald-500/30 relative shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]">
                    <div className="absolute top-2 right-4 text-[9px] font-bold text-white/40 animate-pulse bg-emerald-500/20 px-2 py-1 rounded">RUNNING</div>

                    <div className="flex items-center gap-3 font-bold">
                      <span className="text-emerald-500 text-lg">✓</span>
                      <span className="text-white/80">Test: Navigation transition flow...</span>
                      <span className="ml-auto text-emerald-400 drop-shadow-[0_0_4px_rgba(16,185,129,0.8)]">PASSED</span>
                    </div>
                    <div className="flex items-center gap-3 font-bold">
                      <span className="text-emerald-500 text-lg">✓</span>
                      <span className="text-white/80">Test: Universe SSR hydration check...</span>
                      <span className="ml-auto text-emerald-400 drop-shadow-[0_0_4px_rgba(16,185,129,0.8)]">PASSED</span>
                    </div>
                    <div className="flex items-center gap-3 font-bold">
                      <span className="text-emerald-500 text-lg">✓</span>
                      <span className="text-white/80">Test: Audio assets loading latency...</span>
                      <span className="ml-auto text-emerald-400 drop-shadow-[0_0_4px_rgba(16,185,129,0.8)]">PASSED</span>
                    </div>
                    <div className="flex items-center gap-3 font-bold">
                      <span className="text-emerald-500 text-lg">✓</span>
                      <span className="text-white/80">Test: Framer-motion v12 timelines...</span>
                      <span className="ml-auto text-emerald-400 drop-shadow-[0_0_4px_rgba(16,185,129,0.8)]">PASSED</span>
                    </div>
                    <div className="flex items-center gap-3 opacity-50 font-bold mt-2 pt-2 border-t border-emerald-500/20">
                      <span className="text-lg">⚙</span>
                      <span>Benchmarking frame updates (120 FPS)...</span>
                    </div>
                  </div>

                  {/* SVG line graph simulator */}
                  <div className="mt-6 h-20 relative overflow-hidden rounded-lg border border-emerald-500/10">
                    <div className="absolute inset-0 bg-emerald-500/5" />
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 50">
                      <path
                        d="M 0 40 Q 50 10, 100 35 T 200 15 T 300 45 T 400 20"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="3"
                        className="animate-pulse"
                        style={{ filter: "drop-shadow(0 0 6px rgba(16,185,129,0.8))" }}
                      />
                      <path
                        d="M 0 40 Q 50 10, 100 35 T 200 15 T 300 45 T 400 20 L 400 50 L 0 50 Z"
                        fill="url(#emerald-gradient)"
                        className="opacity-30"
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
                  <div className="text-center mb-5">
                    <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-[0.2em] bg-cyan-950/60 border border-cyan-500/50 px-4 py-1.5 rounded shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                      Production Edge Deployment
                    </span>
                  </div>

                  {/* Score circle meter */}
                  <div className="flex-1 flex justify-center items-center gap-10 relative">
                    {/* Lighthouse score meter */}
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      {/* Circle track */}
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="72" cy="72" r="64" stroke="rgba(6,182,212,0.15)" strokeWidth="8" fill="transparent" />
                        <motion.circle
                          cx="72"
                          cy="72"
                          r="64"
                          stroke="#06B6D4"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={402}
                          initial={{ strokeDashoffset: 402 }}
                          animate={{ strokeDashoffset: launchSequence ? 0 : 40.2 }}
                          transition={{ duration: 2, ease: "easeOut" }}
                          style={{ filter: "drop-shadow(0 0 8px rgba(6,182,212,0.6))" }}
                        />
                      </svg>
                      {/* Score percentage text */}
                      <div className="absolute flex flex-col items-center">
                        <span className="font-display text-5xl text-cyan-400 leading-none drop-shadow-md">
                          {launchSequence ? "100" : "99"}
                        </span>
                        <span className="text-[9px] font-mono text-white/50 font-bold uppercase tracking-[0.25em] mt-1">SPEED</span>
                      </div>
                    </div>

                    {/* Edge network logs list */}
                    <div className="font-mono text-[11px] text-left text-white/70 space-y-2.5 font-bold">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                        <span>EDGE: FR_PARIS_01 (10ms)</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(6,182,212,0.5)]" />
                        <span>EDGE: US_VIRGINIA_02 (18ms)</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(6,182,212,0.5)]" />
                        <span>EDGE: AS_TOKYO_04 (22ms)</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(6,182,212,0.5)]" />
                        <span>EDGE: EU_FRANKFURT_01 (12ms)</span>
                      </div>
                    </div>
                  </div>

                  {/* Launch Simulator Trigger */}
                  <div className="mt-8 border-t border-white/10 pt-6">
                    <button
                      onClick={launchSequence ? resetLaunch : triggerLaunch}
                      onMouseEnter={playHover}
                      className="w-full relative group bg-cyan-950/30 border border-cyan-500/30 overflow-hidden rounded-lg hover:border-cyan-400/80 transition-colors py-4 flex items-center justify-center cursor-pointer shadow-[inset_0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                    >
                      {/* Interactive fill bar */}
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-cyan-500/20"
                        initial={{ width: "0%" }}
                        animate={{ width: `${launchProgress}%` }}
                        transition={{ ease: "linear", duration: 0.1 }}
                      />

                      <div className="relative z-10 flex items-center gap-3 font-mono text-[12px] uppercase tracking-widest text-cyan-400 font-bold">
                        {launchSequence ? (
                          launchProgress >= 100 ? (
                            <>
                              <RotateCcw className="w-5 h-5" />
                              RESET SEQUENCE
                            </>
                          ) : (
                            <>
                              <Activity className="w-5 h-5 animate-spin" />
                              DEPLOYING... {launchProgress}%
                            </>
                          )
                        ) : (
                          <>
                            <Play className="w-5 h-5 group-hover:text-cyan-300 fill-cyan-500/20 group-hover:fill-cyan-400" />
                            <span className="group-hover:text-cyan-300">TRIGGER LIVE DEPLOY</span>
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
});