import { createFileRoute, Link } from "@tanstack/react-router";
import { RobloxStudioIDE } from "@/components/studio";
import { TEMPLATES } from "@/components/studio/presets";
import { ArrowLeft, Play, Sparkles, BookOpen, Layers, Laptop, Award } from "lucide-react";
import { useState } from "react";

const STATS = [
  { label: "Games Built",     value: "12+", unit: "projects",    color: "text-cyan-400" },
  { label: "Scripts Written", value: "150+", unit: "Luau files", color: "text-orange-400" },
  { label: "Playtests",       value: "10K+", unit: "plays",      color: "text-emerald-400" },
  { label: "Studio Hours",    value: "2K+",  unit: "hours",      color: "text-purple-400" },
];

function StudioPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState("t-classic");

  // ── Splash Screen ────────────────────────────────────────────────
  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#0c0a12] overflow-y-auto select-none">
        {/* Futuristic grids and flares */}
        <div className="fixed inset-0 bg-grid-blueprint opacity-[0.035] pointer-events-none" />
        <div className="fixed inset-0 bg-grid-dots opacity-[0.1] pointer-events-none" />
        <div className="fixed top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none" />
        <div className="fixed top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-500/10 to-transparent pointer-events-none" />

        {/* Back navigation */}
        <Link
          to="/"
          className="fixed top-6 left-6 z-20 flex items-center gap-2 font-mono text-[11px] text-white/50 hover:text-cyan-400 uppercase tracking-widest transition-all hover:translate-x-1"
        >
          <ArrowLeft className="size-4" />
          Back to Portfolio
        </Link>

        {/* Main page bounds */}
        <div className="min-h-screen flex flex-col items-center px-6 py-20 relative max-w-6xl mx-auto">

          {/* Main Title Header */}
          <div className="flex flex-col items-center text-center mt-6">
            <div className="w-20 h-24 bg-gradient-to-br from-cyan-500/30 to-orange-500/30 border border-cyan-400/40 flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(6,182,212,0.25)] rounded-xl relative group">
              <div className="absolute inset-0 bg-cyan-400/10 blur rounded-xl group-hover:scale-110 transition-transform" />
              <span className="text-5xl font-black text-white drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]">R</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl uppercase tracking-tighter text-white leading-tight font-extrabold">
              Roblox
              <span className="text-cyan-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]"> Studio</span>
            </h1>
            <p className="font-mono text-[10px] text-white/50 tracking-[0.35em] mt-1.5 uppercase font-bold">
              Professional Cloud Game IDE Simulation
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 w-full max-w-4xl bg-black/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
            {STATS.map(s => (
              <div key={s.label} className="text-center group border-r border-white/5 last:border-0 pr-2">
                <div className={`font-display text-2xl md:text-3xl uppercase tracking-tighter ${s.color} drop-shadow-[0_0_15px_currentColor] group-hover:scale-105 transition-transform`}>
                  {s.value}
                </div>
                <div className="font-mono text-[9px] text-white/40 mt-1 uppercase tracking-[0.2em] font-bold">{s.label}</div>
                <div className="font-mono text-[8px] text-white/20 mt-0.5 uppercase tracking-wider">{s.unit}</div>
              </div>
            ))}
          </div>

          {/* TEMPLATE CARDS SELECTOR */}
          <div className="mt-14 w-full">
            <h2 className="font-mono text-[11px] text-cyan-400 uppercase tracking-[0.25em] font-bold mb-6 text-center">// Choose Studio Project Template</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
              {TEMPLATES.map(t => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id)}
                  className={`relative cursor-pointer group border rounded-2xl p-5 flex flex-col justify-between transition-all duration-400 select-none ${
                    selectedTemplate === t.id
                      ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.15)] scale-[1.02]'
                      : 'bg-black/40 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="text-4xl mb-4">{t.icon}</div>
                    <h3 className="text-white text-base font-bold font-sans tracking-tight mb-2 group-hover:text-cyan-400 transition-colors">
                      {t.name}
                    </h3>
                    <p className="text-white/60 text-[11px] leading-relaxed font-sans font-light">
                      {t.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider opacity-40">Template ID</span>
                    <span className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded ${
                      selectedTemplate === t.id ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'bg-white/5 text-white/50'
                    }`}>
                      {selectedTemplate === t.id ? 'Selected' : 'Select'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LAUNCH BAR ACTION */}
          <div className="mt-14 w-full max-w-md flex flex-col items-center gap-4">
            <button
              onClick={() => setShowSplash(false)}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-orange-500 text-black font-mono text-[13px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.35)] hover:shadow-[0_0_70px_rgba(6,182,212,0.55)] transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Play className="size-4 fill-current" /> Launch Studio Engine
            </button>

            <div className="text-[10px] text-white/30 font-mono tracking-widest uppercase text-center">
              Active Template: <span className="text-cyan-400 font-bold">{selectedTemplate.slice(2).toUpperCase()}</span>
            </div>
          </div>

          {/* Quick Learning & documentation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-16 pt-10 border-t border-white/5">
            <div className="flex gap-3">
              <BookOpen className="size-5 text-cyan-400 shrink-0" />
              <div>
                <h4 className="text-white text-[11px] font-mono uppercase tracking-widest mb-1.5">Luau Scripting</h4>
                <p className="text-white/50 text-[11px] leading-relaxed font-sans font-light">Full simulated 5.1 sandboxed compiler with arithmetic, variables, Vector3, and Color3.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Layers className="size-5 text-orange-400 shrink-0" />
              <div>
                <h4 className="text-white text-[11px] font-mono uppercase tracking-widest mb-1.5">Instance Creation</h4>
                <p className="text-white/50 text-[11px] leading-relaxed font-sans font-light">Dynamically instantiate custom Parts, Lighting, and Models via raw command code streams.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Laptop className="size-5 text-emerald-400 shrink-0" />
              <div>
                <h4 className="text-white text-[11px] font-mono uppercase tracking-widest mb-1.5">Advanced Engine</h4>
                <p className="text-white/50 text-[11px] leading-relaxed font-sans font-light">Simulated physics with gravity calculations, restitution bounces, and soft-shadow render maps.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-10 text-center font-mono text-[9px] text-white/20 uppercase tracking-widest">
          Press ` backtick · Type &quot;robloxstudio&quot; anytime
        </div>
      </div>
    );
  }

  // ── IDE Viewport ─────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[9999] bg-[#0c0a12] flex flex-col">
      <RobloxStudioIDE onClose={() => setShowSplash(true)} initialTemplate={selectedTemplate} />
    </div>
  );
}

export const Route = createFileRoute("/studio")({
  component: StudioPage,
});
