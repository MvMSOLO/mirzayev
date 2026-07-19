import { useState } from 'react';
import {
  Play, Square, Sparkles, Terminal, X, Home, Compass, Sliders, PlayCircle,
  Settings, HelpCircle, Layers, Eye, Code2, Plus, Type, Activity
} from 'lucide-react';
import type { RunState, StudioTheme, TransformTool } from './types';

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

  // New upgraded toolbar options
  theme: StudioTheme;
  setTheme: (t: StudioTheme) => void;
  activeTool: TransformTool;
  setActiveTool: (tool: TransformTool) => void;
  timeOfDay: number;
  setTimeOfDay: (t: number) => void;
  onResetScene: () => void;
}

export function StudioToolbar({
  runState, onRun, onStop,
  showAI, onToggleAI,
  showOutput, onToggleOutput,
  onClose, pendingCount, scriptCount,

  theme, setTheme,
  activeTool, setActiveTool,
  timeOfDay, setTimeOfDay,
  onResetScene
}: Props) {
  const isRunning = runState === 'running';
  const [activeTab, setActiveTab] = useState<'home' | 'model' | 'test' | 'view'>('home');

  return (
    <div className={`flex flex-col shrink-0 select-none border-b ${
      theme === 'dark' ? 'bg-[#2d2d30] border-[#3c3c3c] text-white' : 'bg-[#f3f3f3] border-[#cccccc] text-black'
    }`}>
      {/* 1. Upper Quick Menu Title Bar */}
      <div className={`h-8 px-3 flex items-center justify-between border-b ${
        theme === 'dark' ? 'bg-[#1e1e1e] border-[#3c3c3c]' : 'bg-[#e1e1e1] border-[#cccccc]'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center shrink-0">
            <span className="text-[9px] font-black text-white leading-none">R</span>
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>
            Roblox Studio <span className="text-[8px] font-mono opacity-50">v7.0 PRO</span>
          </span>
        </div>

        {/* Start info */}
        <div className="flex items-center gap-4 text-[9px] font-mono opacity-60">
          <span>Scripts: {scriptCount}</span>
          <span>Time: {Math.floor(timeOfDay)}:00</span>
          <span>Active: {activeTool.toUpperCase()}</span>
        </div>

        <button
          onClick={onClose}
          title="Exit Roblox Studio"
          className={`h-full px-3 flex items-center justify-center transition-colors hover:bg-red-600 hover:text-white ${
            theme === 'dark' ? 'text-white/50' : 'text-black/50'
          }`}
        >
          <X className="size-3.5" />
        </button>
      </div>

      {/* 2. Ribbon Tabs */}
      <div className={`flex items-center px-1 h-7 overflow-x-auto scrollbar-none touch-pan-x whitespace-nowrap ${
        theme === 'dark' ? 'bg-[#252526]' : 'bg-[#eaeaea]'
      }`}>
        {[
          { id: 'home', label: 'Home', icon: <Home className="size-3" /> },
          { id: 'model', label: 'Model', icon: <Sliders className="size-3" /> },
          { id: 'test', label: 'Test', icon: <PlayCircle className="size-3" /> },
          { id: 'view', label: 'View', icon: <Eye className="size-3" /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 h-full inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wide font-mono transition-all rounded-t border-t-2 shrink-0 ${
              activeTab === tab.id
                ? theme === 'dark'
                  ? 'bg-[#2d2d30] text-cyan-400 border-cyan-500'
                  : 'bg-[#f3f3f3] text-blue-600 border-blue-600'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Upgraded Ribbon Bar Panel Tools */}
      <div className={`p-1.5 h-14 flex items-center gap-4 overflow-x-auto scrollbar-none touch-pan-x whitespace-nowrap min-w-0 ${
        theme === 'dark' ? 'bg-[#2d2d30]' : 'bg-[#f3f3f3]'
      }`}>
        {/* TABS CONTENT: HOME */}
        {activeTab === 'home' && (
          <>
            {/* Tools group */}
            <div className={`inline-flex items-center gap-1 border-r pr-3 shrink-0 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
              <div className="flex flex-col text-[8px] font-mono uppercase tracking-widest opacity-40 justify-center h-full mr-1">Tools</div>
              {[
                { id: 'select', label: 'Select', icon: '🎯' },
                { id: 'move', label: 'Move', icon: '↕️' },
                { id: 'scale', label: 'Scale', icon: '↔️' },
                { id: 'rotate', label: 'Rotate', icon: '🔄' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTool(t.id as any)}
                  className={`px-2 py-1 rounded text-[10px] font-mono inline-flex items-center gap-1 transition-all shrink-0 ${
                    activeTool === t.id
                      ? 'bg-cyan-500/25 border border-cyan-500/60 text-cyan-400 font-bold'
                      : 'hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <span>{t.icon}</span>
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              ))}
            </div>

            {/* Run state controls */}
            <div className={`inline-flex items-center gap-1.5 border-r pr-3 shrink-0 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
              <button
                onClick={isRunning ? onStop : onRun}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all shadow-md shrink-0 ${
                  isRunning
                    ? 'bg-red-600 text-white hover:bg-red-500 shadow-red-900/20'
                    : 'bg-green-600 text-white hover:bg-green-500 shadow-green-900/20'
                }`}
              >
                {isRunning ? <Square className="size-3 fill-current" /> : <Play className="size-3 fill-current" />}
                {isRunning ? 'Stop' : 'Play'}
              </button>

              <button
                onClick={onResetScene}
                title="Restore default level template scene"
                className="px-2 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded text-[10px] font-mono transition-colors shrink-0"
              >
                Reset Scene
              </button>
            </div>

            {/* Environment lighting */}
            <div className="inline-flex items-center gap-2 shrink-0">
              <span className="text-[9px] font-mono opacity-60 uppercase whitespace-nowrap">Time of Day</span>
              <input
                type="range"
                min={0}
                max={24}
                step={0.5}
                value={timeOfDay}
                onChange={e => setTimeOfDay(parseFloat(e.target.value))}
                className="w-24 accent-cyan-500"
              />
            </div>
          </>
        )}

        {/* TABS CONTENT: MODEL */}
        {activeTab === 'model' && (
          <>
            <div className={`inline-flex items-center gap-2 border-r pr-3 shrink-0 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
              <div className="text-[9px] font-mono opacity-60 uppercase">Snapping</div>
              <button className={`px-2 py-1 rounded text-[9px] font-mono border shrink-0 ${
                theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'
              }`}>Grid: 1 Stud</button>
              <button className={`px-2 py-1 rounded text-[9px] font-mono border shrink-0 ${
                theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'
              }`}>Rotate: 15°</button>
            </div>

            <div className="inline-flex items-center gap-2 shrink-0">
              <span className="text-[9px] font-mono opacity-60 uppercase">Instance Shape modifiers</span>
              <span className="text-[10px] font-mono italic opacity-40">Use properties panel for custom shapes and physical behaviors</span>
            </div>
          </>
        )}

        {/* TABS CONTENT: TEST */}
        {activeTab === 'test' && (
          <>
            <div className="inline-flex items-center gap-2 shrink-0">
              <button
                onClick={onRun}
                disabled={isRunning}
                className="px-3 py-1 bg-green-700/40 text-green-300 hover:bg-green-700/60 rounded text-[10px] font-mono inline-flex items-center gap-1.5 transition-colors disabled:opacity-40 shrink-0"
              >
                <Play className="size-3" /> Run Scripting Engine
              </button>
              <button
                onClick={onStop}
                disabled={!isRunning}
                className="px-3 py-1 bg-red-700/40 text-red-300 hover:bg-red-700/60 rounded text-[10px] font-mono inline-flex items-center gap-1.5 transition-colors disabled:opacity-40 shrink-0"
              >
                <Square className="size-3" /> Stop Execution
              </button>
            </div>
          </>
        )}

        {/* TABS CONTENT: VIEW */}
        {activeTab === 'view' && (
          <>
            {/* Window panels toggles */}
            <div className={`inline-flex items-center gap-1 border-r pr-3 shrink-0 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
              <button
                onClick={onToggleAI}
                className={`px-2 py-1 rounded text-[10px] font-mono inline-flex items-center gap-1 transition-all shrink-0 ${
                  showAI ? 'bg-purple-600/30 border border-purple-500/50 text-purple-400' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Sparkles className="size-3" />
                AI Assistant
              </button>

              <button
                onClick={onToggleOutput}
                className={`px-2 py-1 rounded text-[10px] font-mono inline-flex items-center gap-1 transition-all shrink-0 ${
                  showOutput ? 'bg-[#007acc]/30 border border-[#007acc]/50 text-blue-400' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Terminal className="size-3" />
                Output Console
              </button>
            </div>

            {/* Theme switcher */}
            <div className="inline-flex items-center gap-2 shrink-0">
              <span className="text-[9px] font-mono opacity-60 uppercase font-bold">Theme</span>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`px-2 py-1 text-[10px] font-mono rounded border shrink-0 ${
                  theme === 'dark'
                    ? 'bg-[#1e1e1e] border-[#3c3c3c] text-white hover:bg-white/5'
                    : 'bg-[#ffffff] border-[#cccccc] text-black hover:bg-black/5'
                }`}
              >
                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'} Mode
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
