import { Play, Square, Sparkles, Terminal, X, Maximize2, Minimize2 } from 'lucide-react';
import type { RunState } from './types';

interface Props {
  runState: RunState;
  onRun: () => void;
  onStop: () => void;
  showAI: boolean;
  onToggleAI: () => void;
  showOutput: boolean;
  onToggleOutput: () => void;
  onClose: () => void;
  pendingCount: number;
  scriptCount: number;
}

export function StudioToolbar({
  runState, onRun, onStop,
  showAI, onToggleAI,
  showOutput, onToggleOutput,
  onClose, pendingCount, scriptCount,
}: Props) {
  const isRunning = runState === 'running';

  return (
    <div className="h-10 bg-[#007acc] flex items-center gap-0 shrink-0 select-none">
      {/* Logo / branding */}
      <div className="flex items-center gap-2 px-3 border-r border-white/20 h-full">
        {/* Roblox-style R icon */}
        <div className="w-5 h-5 rounded-sm bg-white/90 flex items-center justify-center shrink-0">
          <span className="text-[11px] font-black text-[#e02020] leading-none">R</span>
        </div>
        <span className="text-white text-[11px] font-bold tracking-tight whitespace-nowrap hidden sm:block">
          Roblox Studio
        </span>
        <span className="text-white/40 text-[9px] hidden md:block">SIMULATOR</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* CENTER: Run / Stop controls */}
      <div className="flex items-center gap-1 px-3">
        <button
          onClick={isRunning ? onStop : onRun}
          disabled={scriptCount === 0 && !isRunning}
          title={isRunning ? 'Stop (End Game)' : scriptCount === 0 ? 'Add a Script first' : 'Play (Open Game)'}
          className={`flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wide transition-all
            ${isRunning
              ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/40'
              : scriptCount === 0
              ? 'bg-green-800/40 text-green-300/40 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/40'}`}
        >
          {isRunning
            ? <><Square className="size-3 fill-current" /> Stop</>
            : <><Play className="size-3 fill-current" /> Play</>}
        </button>

        {isRunning && (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-green-900/40 rounded border border-green-600/40">
            <span className="size-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-300 text-[9px] font-mono uppercase">Running</span>
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* RIGHT: Panel toggles */}
      <div className="flex items-center gap-1 px-2 border-l border-white/20 h-full">
        {/* AI toggle */}
        <button
          onClick={onToggleAI}
          title="Toggle AI Chat"
          className={`relative flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono transition-all
            ${showAI ? 'bg-purple-600/70 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
        >
          <Sparkles className="size-3" />
          <span className="hidden sm:block">AI</span>
          {pendingCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 size-3 bg-yellow-500 text-[7px] font-bold text-black rounded-full flex items-center justify-center">
              {pendingCount}
            </span>
          )}
        </button>

        {/* Output toggle */}
        <button
          onClick={onToggleOutput}
          title="Toggle Output console"
          className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono transition-all
            ${showOutput ? 'bg-[#1e1e1e]/60 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
        >
          <Terminal className="size-3" />
          <span className="hidden sm:block">Output</span>
        </button>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        title="Close Studio"
        className="flex items-center justify-center w-10 h-full text-white/60 hover:text-white hover:bg-red-600 transition-all"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
