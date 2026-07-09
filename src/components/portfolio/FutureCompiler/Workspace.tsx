import { useState } from "react";
import { compileWebsite } from "@/lib/compiler.functions";
import { CodeViewer } from "./CodeViewer";
import { useLang } from "@/lib/i18n";

interface Bundle {
  title: string;
  html: string;
  css: string;
  js: string;
}

const STAGES = ["THINKING", "BUILDING", "COMPILING", "OPTIMIZING"] as const;

export function Workspace() {
  const { lang } = useLang();
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState<(typeof STAGES)[number] | null>(null);
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const generate = async () => {
    if (!prompt.trim()) return;
    setErr(null);
    setBundle(null);
    for (let i = 0; i < STAGES.length; i++) {
      setStatus(STAGES[i]);
      await new Promise((r) => setTimeout(r, 900));
    }
    try {
      const result = await compileWebsite({ data: { prompt } });
      setBundle(result);
      setStatus(null);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Compile failed");
      setStatus(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="border border-accent/40 bg-black/60 backdrop-blur p-5 md:p-8">
        <label className="text-[10px] uppercase tracking-widest text-accent/70 font-mono block mb-3">
          ◉ {lang === "uz" ? "SAYT G'OYASINI YOZING" : "DESCRIBE YOUR WEBSITE IDEA"}
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={lang === "uz" ? "Masalan: mahalliy qahvaxona uchun landing sahifa..." : "e.g. landing page for a local coffee roastery..."}
          rows={4}
          disabled={status !== null}
          className="w-full bg-background/60 border border-accent/30 p-4 font-mono text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent resize-none disabled:opacity-50"
        />
        <div className="flex items-center justify-between mt-4 gap-4 flex-wrap">
          <div className="text-[10px] font-mono uppercase tracking-widest text-accent/60">
            {status ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-accent animate-pulse" />
                {status}…
              </span>
            ) : (
              <span>◇ VANILLA · HTML · CSS · JS · NO FRAMEWORKS</span>
            )}
          </div>
          <button
            onClick={generate}
            disabled={status !== null || !prompt.trim()}
            className="px-6 py-3 border border-accent bg-accent text-background text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-transparent hover:text-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {status ? "COMPILING…" : lang === "uz" ? "→ QURISH" : "→ COMPILE"}
          </button>
        </div>
        {err && <p className="mt-3 text-[10px] uppercase tracking-widest text-red-500 font-mono">✕ {err}</p>}
      </div>

      {bundle && <CodeViewer bundle={bundle} />}
    </div>
  );
}
