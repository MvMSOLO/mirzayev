import { createFileRoute, Link } from "@tanstack/react-router";
import { RobloxStudioIDE } from "@/components/studio";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const STATS = [
  { label: "Games Built",     value: "12+", unit: "projects",    color: "text-cyan-400" },
  { label: "Scripts Written", value: "150+", unit: "Luau files", color: "text-orange-400" },
  { label: "Playtests",       value: "10K+", unit: "plays",      color: "text-emerald-400" },
  { label: "Studio Hours",    value: "2K+",  unit: "hours",      color: "text-purple-400" },
];

function StudioPage() {
  const [showSplash, setShowSplash] = useState(true);

  // ── Splash ───────────────────────────────────────────────────────
  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#0a090c] overflow-y-auto">
        {/* Grid bg */}
        <div className="fixed inset-0 bg-grid-blueprint opacity-[0.025] pointer-events-none" />
        <div className="fixed inset-0 bg-grid-dots opacity-[0.08] pointer-events-none" />
        <div className="fixed top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none" />
        <div className="fixed top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-500/10 to-transparent pointer-events-none" />

        {/* Back */}
        <Link
          to="/"
          className="fixed top-6 left-6 z-20 flex items-center gap-2 font-mono text-[11px] text-white/40 hover:text-orange-400 uppercase tracking-widest transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>

        {/* Corner brackets */}
        <div className="fixed top-20 left-12 w-16 h-16 border-t-2 border-l-2 border-cyan-500/20 hidden md:block" />
        <div className="fixed top-20 right-12 w-16 h-16 border-t-2 border-r-2 border-cyan-500/20 hidden md:block" />
        <div className="fixed bottom-20 left-12 w-16 h-16 border-b-2 border-l-2 border-cyan-500/20 hidden md:block" />
        <div className="fixed bottom-20 right-12 w-16 h-16 border-b-2 border-r-2 border-cyan-500/20 hidden md:block" />

        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative">
          {/* R Logo */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-orange-500/20 border border-cyan-500/30 flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(0,212,255,0.15)]">
            <span className="text-6xl md:text-7xl font-black text-white drop-shadow-[0_0_30px_rgba(0,212,255,0.5)]">R</span>
          </div>

          <h1 className="font-display text-6xl md:text-8xl uppercase tracking-tighter text-white text-center leading-[0.9]">
            Roblox
            <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(0,212,255,0.4)]"> Studio</span>
          </h1>

          <p className="font-mono text-[11px] text-white/40 mt-4 uppercase tracking-[0.3em]">
            Game Development Environment
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 w-full max-w-2xl">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className={`font-display text-3xl md:text-4xl uppercase tracking-tighter ${s.color} drop-shadow-[0_0_15px_currentColor]`}>
                  {s.value}
                </div>
                <div className="font-mono text-[10px] text-white/40 mt-1 uppercase tracking-[0.2em] font-bold">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-2 mt-10 max-w-xl">
            {[
              ["Luau / Lua 5.1", "border-cyan-500/30 bg-cyan-500/6 text-cyan-400"],
              ["Roblox Studio",  "border-orange-500/30 bg-orange-500/6 text-orange-400"],
              ["Game Architecture", "border-emerald-500/30 bg-emerald-500/6 text-emerald-400"],
              ["AI NPCs",        "border-purple-500/30 bg-purple-500/6 text-purple-400"],
              ["Physics Engine", "border-cyan-500/30 bg-cyan-500/6 text-cyan-400"],
              ["DataStore v2",   "border-orange-500/30 bg-orange-500/6 text-orange-400"],
              ["RemoteEvents",   "border-emerald-500/30 bg-emerald-500/6 text-emerald-400"],
              ["3D World-Building", "border-purple-500/30 bg-purple-500/6 text-purple-400"],
            ].map(([label, cls]) => (
              <span key={label} className={`font-mono text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1.5 rounded-lg border ${cls}`}>
                {label}
              </span>
            ))}
          </div>

          {/* Launch */}
          <button
            onClick={() => setShowSplash(false)}
            className="mt-14 px-10 py-4 bg-gradient-to-r from-cyan-500 to-orange-500 text-black font-mono text-[13px] font-bold uppercase tracking-[0.3em] rounded-xl shadow-[0_0_40px_rgba(0,212,255,0.3)] hover:shadow-[0_0_60px_rgba(0,212,255,0.5)] transition-shadow"
          >
            Launch Studio
          </button>
        </div>

        <div className="pb-8 text-center font-mono text-[9px] text-white/20 uppercase tracking-widest">
          Press ` backtick · type &quot;robloxstudio&quot; · or click Launch
        </div>
      </div>
    );
  }

  // ── IDE ──────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a090c] flex flex-col">
      <RobloxStudioIDE onClose={() => setShowSplash(true)} />
    </div>
  );
}

export const Route = createFileRoute("/studio")({
  component: StudioPage,
});
