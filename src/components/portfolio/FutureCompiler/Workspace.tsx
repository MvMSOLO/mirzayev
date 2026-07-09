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

const STAGES = ["THINKING", "BUILDING", "COMPILING", "OPTIMIZING"] as const;

export function Workspace() {
  const { lang, t } = useLang();
  const { play } = useSound();
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState<(typeof STAGES)[number] | null>(null);
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const placeholders = [
    t("fc.prompt.placeholder.1"),
    t("fc.prompt.placeholder.2"),
    t("fc.prompt.placeholder.3"),
  ];

  const chips = [t("fc.prompt.chip.1"), t("fc.prompt.chip.2"), t("fc.prompt.chip.3")];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  const generate = async () => {
    if (!prompt.trim()) return;
    play("submit");
    setErr(null);
    setBundle(null);
    for (let i = 0; i < STAGES.length; i++) {
      setStatus(STAGES[i]);
      play("scan");
      await new Promise((r) => setTimeout(r, 900));
    }
    try {
      const result = await compileWebsite({ data: { prompt } });
      setBundle(result);
      setStatus(null);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Compile failed");
      setStatus(null);
      play("error");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!status && prompt.trim()) generate();
    } else {
      play("type");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative group"
      >
        <div
          className={`absolute -inset-[1px] bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 opacity-0 transition-opacity duration-1000 blur-sm pointer-events-none ${isFocused ? "opacity-100" : "group-hover:opacity-50"}`}
        />

        <div className="relative border border-accent/40 bg-black/80 backdrop-blur-xl p-6 md:p-10 shadow-2xl overflow-hidden">
          {/* Background scanline effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:100%_4px]" />

          <div className="flex justify-between items-start mb-6">
            <label className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-accent font-mono flex items-center gap-2">
              <span className="w-2 h-2 bg-accent inline-block animate-pulse" />
              {t("fc.prompt.label")}
            </label>
            <div className="text-[9px] uppercase tracking-widest text-white/30 font-mono hidden sm:block">
              // NO LIBRARIES · NO FRAMEWORKS
            </div>
          </div>

          <div className="relative">
            <span className="absolute left-0 top-4 text-accent/50 font-display text-2xl md:text-4xl select-none">
              ›
            </span>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              rows={3}
              disabled={status !== null}
              className="w-full bg-transparent pl-8 md:pl-12 py-4 font-mono text-base md:text-xl text-white focus:outline-none resize-none disabled:opacity-50 relative z-10"
            />
            {!prompt && !status && (
              <div className="absolute left-8 md:left-12 top-4 pointer-events-none text-white/20 font-mono text-base md:text-xl overflow-hidden flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={placeholderIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {placeholders[placeholderIndex]}
                  </motion.span>
                </AnimatePresence>
                <span className="ml-1 w-2 h-6 bg-accent/50 animate-pulse inline-block" />
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex gap-2 flex-wrap">
              {chips.map((chip, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPrompt(chip);
                    play("type");
                  }}
                  disabled={status !== null}
                  className="px-3 py-1.5 border border-white/10 hover:border-accent/40 bg-white/5 hover:bg-accent/10 text-white/60 hover:text-accent transition-colors text-[10px] font-mono uppercase tracking-widest disabled:opacity-40"
                >
                  {chip}
                </button>
              ))}
            </div>

            <button
              onClick={generate}
              disabled={status !== null || !prompt.trim()}
              className="group/btn relative px-8 py-4 bg-accent text-background text-xs uppercase tracking-[0.3em] font-bold overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center justify-center gap-3">
                {status ? (
                  <>
                    <span
                      className="w-1.5 h-1.5 bg-background rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-background rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-background rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </>
                ) : (
                  <>
                    {t("fc.prompt.submit")}{" "}
                    <span className="font-display text-lg leading-none">→</span>
                  </>
                )}
              </span>
            </button>
          </div>

          {err && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 p-4 border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-[10px] uppercase tracking-widest flex items-center gap-3"
            >
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              {err}
            </motion.div>
          )}

          <AnimatePresence>
            {status && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-accent/20"
              >
                <div className="flex items-center gap-4 text-accent font-mono text-[10px] uppercase tracking-[0.2em]">
                  <div className="w-4 h-4 border border-accent border-t-transparent rounded-full animate-spin" />
                  <span>
                    {t("fc.prompt.thinking")} · {status}
                  </span>
                </div>
                {/* Progress visualization */}
                <div className="mt-4 h-[1px] w-full bg-white/10 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-accent shadow-[0_0_10px_rgba(255,69,0,0.8)]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((STAGES.indexOf(status) + 1) / STAGES.length) * 100}%` }}
                    transition={{ duration: 0.9, ease: "linear" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {bundle && <CodeViewer bundle={bundle} />}
    </div>
  );
}
