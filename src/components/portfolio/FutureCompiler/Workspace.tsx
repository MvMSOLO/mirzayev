import { useState, useEffect, useRef } from "react";
import { compileWebsite } from "@/lib/compiler.functions";
import { CodeViewer } from "./CodeViewer";
import { useLang } from "@/lib/i18n";
import { useSound } from "@/hooks/useSound";
import { motion, AnimatePresence } from "framer-motion";

interface Bundle {
  title: string;
  html: string;
  css: string;
  js: string;
}

const STAGES = [
  { id: "PARSING", label: "Parsing intent", pct: 15 },
  { id: "THINKING", label: "Neural analysis", pct: 35 },
  { id: "BUILDING", label: "Generating structure", pct: 60 },
  { id: "COMPILING", label: "Compiling modules", pct: 80 },
  { id: "OPTIMIZING", label: "Optimizing output", pct: 95 },
] as const;

type Stage = (typeof STAGES)[number]["id"];

const SAMPLE_PROMPTS_EN = [
  "a dark portfolio for a music producer with waveform visualizers",
  "a futuristic crypto dashboard with glowing charts",
  "a minimal blog with serif typography and code blocks",
  "a landing page for an AI startup with neural animations",
];
const SAMPLE_PROMPTS_UZ = [
  "musiqa ishlab chiqaruvchi uchun to'lqin vizualizatori bilan qorong'i portfolio",
  "neon grafiklar bilan kriptovalyuta dashboard",
  "kod bloklari bilan minimal blog",
  "neyron animatsiyalar bilan AI startap sahifasi",
];

const STYLE_PRESETS_EN = ["Glassmorphic", "Brutalist", "Minimal", "Cyberpunk", "Editorial"];
const STYLE_PRESETS_UZ = ["Shishasimon", "Brutalist", "Minimal", "Kiberpank", "Jurnalistik"];

const TERMINAL_LINES_EN = [
  "◉ FUTURE COMPILER v2035 — ONLINE",
  "◉ Neural engine initialized",
  "◉ Vanilla JS runtime loaded",
  "◉ No frameworks. No libraries. Pure code.",
  "◉ Ready for compilation...",
];
const TERMINAL_LINES_UZ = [
  "◉ KELAJAK KOMPILYATORI v2035 — FAOL",
  "◉ Neyron dvigatel ishga tushdi",
  "◉ Vanilla JS runtime yuklandi",
  "◉ Freymvork yo'q. Kutubxona yo'q. Toza kod.",
  "◉ Kompilyatsiyaga tayyor...",
];

export function Workspace() {
  const { lang, t } = useLang();
  const { play } = useSound();
  const [prompt, setPrompt] = useState("");
  const [activeStyle, setActiveStyle] = useState<string | null>(null);
  const [stageIndex, setStageIndex] = useState(-1);
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [lineCount, setLineCount] = useState(1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const isRunning = stageIndex >= 0 && stageIndex < STAGES.length;

  const bootLines = lang === "uz" ? TERMINAL_LINES_UZ : TERMINAL_LINES_EN;

  // Boot terminal animation
  useEffect(() => {
    let cancelled = false;
    setTerminalLines([]);
    const addLine = async (i: number) => {
      if (cancelled || i >= bootLines.length) return;
      await new Promise((r) => setTimeout(r, 300 + i * 200));
      if (!cancelled) {
        setTerminalLines((prev) => [...prev, bootLines[i]]);
        play("type");
        addLine(i + 1);
      }
    };
    addLine(0);
    return () => {
      cancelled = true;
    };
  }, [lang]);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  // Track line count
  useEffect(() => {
    setLineCount(prompt.split("\n").length);
  }, [prompt]);

  const addTerminalLine = (line: string) => {
    setTerminalLines((prev) => [...prev, line]);
    play("type");
  };

  const generate = async () => {
    if (!prompt.trim() || isRunning) return;
    play("submit");
    setErr(null);
    setBundle(null);
    setStageIndex(0);

    const runLines =
      lang === "uz"
        ? [
            `> Prompt qabul qilindi: "${prompt.slice(0, 40)}${prompt.length > 40 ? "..." : ""}"`,
            "> Neyron tarmoq tahlil qilmoqda...",
            "> HTML/CSS/JS strukturasi yaratilmoqda...",
            "> Vanilla kompilyatsiyasi...",
            "> Optimizatsiya qilinmoqda...",
          ]
        : [
            `> Received: "${prompt.slice(0, 40)}${prompt.length > 40 ? "..." : ""}"`,
            "> Neural network analyzing...",
            "> Generating HTML/CSS/JS structure...",
            "> Vanilla compilation pass...",
            "> Optimizing output...",
          ];

    for (let i = 0; i < STAGES.length; i++) {
      setStageIndex(i);
      play("scan");
      addTerminalLine(runLines[i]);
      await new Promise((r) => setTimeout(r, 900));
    }

    try {
      const finalPrompt = activeStyle ? `${prompt}\n\nVisual style: ${activeStyle}.` : prompt;
      const result = await compileWebsite({ data: { prompt: finalPrompt } });
      setBundle(result);
      setStageIndex(-1);
      play("success");
      addTerminalLine(
        lang === "uz" ? "✓ Kompilyatsiya muvaffaqiyatli yakunlandi" : "✓ Compilation successful",
      );
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Compile failed");
      setStageIndex(-1);
      play("error");
      addTerminalLine(
        lang === "uz"
          ? "✗ Xato yuz berdi"
          : `✗ Error: ${e instanceof Error ? e.message : "Compile failed"}`,
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isRunning && prompt.trim()) generate();
    } else {
      play("type");
    }
  };

  const samples = lang === "uz" ? SAMPLE_PROMPTS_UZ : SAMPLE_PROMPTS_EN;
  const stylePresets = lang === "uz" ? STYLE_PRESETS_UZ : STYLE_PRESETS_EN;
  const currentStage = stageIndex >= 0 ? STAGES[stageIndex] : null;

  return (
    <div className="space-y-6">
      {/* IDE Window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="border border-accent/30 bg-black/90 backdrop-blur-xl shadow-[0_0_60px_rgba(255,69,0,0.08)] overflow-hidden"
      >
        {/* Title bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-accent/20 bg-black/60">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors cursor-default" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition-colors cursor-default" />
            <div className="w-3 h-3 rounded-full bg-green-500/70 hover:bg-green-500 transition-colors cursor-default" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
              FUTURE_COMPILER.exe — {lang === "uz" ? "Loyiha Muharriri" : "Project Editor"} — v2035
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            <span className="text-[9px] font-mono text-accent/60 uppercase tracking-widest">
              LIVE
            </span>
          </div>
        </div>

        {/* IDE Body */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] divide-y lg:divide-y-0 lg:divide-x divide-accent/10">
          {/* Sidebar */}
          <div className="bg-black/40 p-4 hidden lg:block">
            <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-3">
              EXPLORER
            </div>
            <div className="space-y-1">
              {[
                { name: "prompt.txt", icon: "◎", active: true },
                { name: "output.html", icon: "◻", active: false },
                { name: "styles.css", icon: "◈", active: false },
                { name: "script.js", icon: "◆", active: false },
                { name: "README.md", icon: "▷", active: false },
              ].map((f) => (
                <div
                  key={f.name}
                  className={`flex items-center gap-2 px-2 py-1.5 text-[10px] font-mono rounded cursor-default transition-colors ${
                    f.active
                      ? "bg-accent/20 text-accent border-l-2 border-accent"
                      : "text-white/30 hover:text-white/50 hover:bg-white/5"
                  }`}
                >
                  <span>{f.icon}</span>
                  <span>{f.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-2">
                OUTLINE
              </div>
              <div className="space-y-1 text-[9px] font-mono text-white/20">
                <div> ▸ &lt;html&gt;</div>
                <div> ▸ &lt;head&gt;</div>
                <div> ▸ &lt;body&gt;</div>
                <div> ▸ styles</div>
                <div> ▸ scripts</div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
                ENGINE: NEURAL v2035
              </div>
              <div className="mt-1 h-1 bg-white/10 rounded overflow-hidden">
                <motion.div
                  className="h-full bg-accent/60"
                  animate={{ width: isRunning ? `${currentStage?.pct ?? 0}%` : "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Editor pane */}
          <div className="flex flex-col min-h-[360px]">
            {/* Tab bar */}
            <div className="flex items-center border-b border-accent/10 bg-black/30 overflow-x-auto">
              {["prompt.txt", "∴ neural.config"].map((tab, i) => (
                <div
                  key={tab}
                  className={`px-4 py-2.5 text-[10px] font-mono border-r border-accent/10 whitespace-nowrap cursor-default ${
                    i === 0 ? "bg-black/40 text-accent border-b-2 border-b-accent" : "text-white/30"
                  }`}
                >
                  {tab}
                </div>
              ))}
            </div>

            {/* Editor area with line numbers */}
            <div className="flex flex-1 relative">
              {/* Line numbers */}
              <div className="hidden sm:flex flex-col py-4 bg-black/20 border-r border-white/5 select-none">
                {Array.from({ length: Math.max(lineCount, 8) }).map((_, i) => (
                  <div
                    key={i}
                    className={`ide-line-number py-0 px-3 leading-7 text-[11px] ${
                      i === 0 && isFocused ? "ide-gutter-active" : ""
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Textarea */}
              <div className="flex-1 relative">
                <div className="absolute left-3 top-4 flex items-center gap-2 text-[10px] font-mono text-accent/60 pointer-events-none z-10">
                  <span className="animate-pulse">›</span>
                </div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder={
                    lang === "uz"
                      ? "// G'oyangizni tasvirlab bering...\n// Misol: minimalist portfolio site"
                      : "// Describe your idea...\n// Example: a dark portfolio for a music producer"
                  }
                  disabled={isRunning}
                  rows={6}
                  className="w-full h-full min-h-[200px] bg-transparent text-white/90 font-mono text-sm leading-7 py-4 pl-8 pr-4 resize-none outline-none placeholder:text-white/15 disabled:opacity-50"
                />

                {/* Focus border glow */}
                {isFocused && (
                  <div className="absolute inset-0 pointer-events-none border border-accent/20 shadow-[inset_0_0_30px_rgba(255,69,0,0.03)]" />
                )}
              </div>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-accent/10 bg-black/40">
              <div className="flex items-center gap-4 text-[9px] font-mono text-white/25">
                <span>UTF-8</span>
                <span>PLAINTEXT</span>
                <span>{prompt.length} chars</span>
              </div>
              <div className="flex items-center gap-2 text-[9px] font-mono text-white/25">
                {isFocused && <span className="text-accent/60 animate-pulse">● EDITING</span>}
                <span>
                  Ln {lineCount}, Col {prompt.split("\n").pop()?.length ?? 0 + 1}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Style presets */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-t border-accent/10 bg-black/30 flex-wrap">
          <span className="text-[9px] font-mono text-white/25 uppercase tracking-widest mr-1">
            {lang === "uz" ? "Uslub:" : "Style:"}
          </span>
          {stylePresets.map((s) => (
            <button
              key={s}
              onClick={() => {
                setActiveStyle((prev) => (prev === s ? null : s));
                play("type");
              }}
              disabled={isRunning}
              className={`text-[9px] font-mono px-2.5 py-1 border uppercase tracking-widest transition-colors disabled:opacity-30 ${
                activeStyle === s
                  ? "border-accent bg-accent/20 text-accent"
                  : "border-white/10 text-white/30 hover:border-accent/40 hover:text-accent/60"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Bottom action bar */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 border-t border-accent/20 bg-black/60 flex-wrap">
          {/* Sample chips */}
          <div className="flex flex-wrap gap-2">
            {samples.slice(0, 2).map((s) => (
              <button
                key={s}
                onClick={() => {
                  setPrompt(s);
                  play("type");
                }}
                disabled={isRunning}
                className="text-[9px] font-mono text-white/30 border border-white/10 px-2 py-1 hover:border-accent/40 hover:text-accent/60 transition-colors uppercase tracking-widest truncate max-w-[160px] disabled:opacity-30"
              >
                {s.slice(0, 24)}...
              </button>
            ))}
          </div>

          {/* Run button */}
          <motion.button
            onClick={generate}
            disabled={isRunning || !prompt.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative font-mono text-[11px] uppercase tracking-widest border border-accent px-6 py-2.5 bg-accent/10 text-accent hover:bg-accent hover:text-background transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-3 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              {isRunning ? (
                <>
                  <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                  {currentStage?.label ?? "Running"}
                </>
              ) : (
                <>
                  <span>▶</span>
                  {lang === "uz" ? "ISHGA TUSHIR" : "COMPILE"}
                </>
              )}
            </span>
          </motion.button>
        </div>

        {/* Progress bar */}
        <AnimatePresence>
          {isRunning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 py-3 border-t border-accent/20 bg-black/40"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-accent font-mono text-[10px] uppercase tracking-widest">
                  <div className="w-3 h-3 border border-accent border-t-transparent rounded-full animate-spin" />
                  <span>{currentStage?.label}</span>
                </div>
                <span className="text-[10px] font-mono text-accent/60">{currentStage?.pct}%</span>
              </div>
              <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent shadow-[0_0_10px_rgba(255,69,0,0.8)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${currentStage?.pct ?? 0}%` }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Shimmer */}
                <div className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="border border-white/10 bg-black/80 backdrop-blur overflow-hidden animate-terminal-flicker"
      >
        {/* Terminal title bar */}
        <div className="flex items-center gap-3 px-4 py-2 border-b border-white/5 bg-black/40">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>
          <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
            TERMINAL — neural_compiler@2035
          </span>
          <div className="ml-auto flex items-center gap-1">
            <div className="w-1 h-1 bg-green-500/60 rounded-full animate-pulse" />
            <span className="text-[8px] font-mono text-white/20">ACTIVE</span>
          </div>
        </div>

        {/* Terminal content */}
        <div
          ref={terminalRef}
          className="p-4 font-mono text-[11px] text-green-400/70 max-h-40 overflow-y-auto space-y-1 leading-relaxed"
        >
          {terminalLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {line}
            </motion.div>
          ))}
          {/* Cursor */}
          <div className="flex items-center gap-1 text-green-400/50">
            <span>›</span>
            <span
              className="inline-block w-2 h-4 bg-green-400/60"
              style={{ opacity: cursorVisible ? 1 : 0 }}
            />
          </div>

          {err && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400/80 flex items-center gap-2 mt-2"
            >
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              ERROR: {err}
            </motion.div>
          )}
        </div>
      </motion.div>

      {bundle && <CodeViewer bundle={bundle} />}
    </div>
  );
}
