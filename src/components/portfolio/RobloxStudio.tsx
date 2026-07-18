import { memo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealBox, WordReveal } from "./TextReveal";
import { useSound } from "@/hooks/useSound";
import { Highlight, themes } from "prism-react-renderer";

// ─── Luau Code Sample ───────────────────────────────────────────────────────
const LUAU_CODE = `-- NeuralCombat Engine v3.0  //  AVAZBEK / 16
local Players    = game:GetService("Players")
local RunService = game:GetService("RunService")
local TweenSvc   = game:GetService("TweenService")

type Config = { WalkSpeed: number; JumpHeight: number;
                AIEnabled: boolean; ParticleMode: string }

local CONFIG: Config = {
  WalkSpeed   = 24,    JumpHeight  = 75,
  AIEnabled   = true,  ParticleMode = "neural",
}

local function spawnAura(root: BasePart)
  local emitter         = Instance.new("ParticleEmitter")
  emitter.Color         = ColorSequence.new(Color3.fromHex("#00D4FF"))
  emitter.Rate          = 80
  emitter.LightEmission = 0.9
  emitter.SpreadAngle   = Vector2.new(360, 0)
  emitter.Parent        = root
end

local function onPlayerAdded(player: Player)
  local char = player.Character or player.CharacterAdded:Wait()
  local hum  = char:WaitForChild("Humanoid") :: Humanoid
  hum.WalkSpeed  = CONFIG.WalkSpeed
  hum.JumpHeight = CONFIG.JumpHeight
  if CONFIG.AIEnabled then
    spawnAura(char:WaitForChild("HumanoidRootPart") :: BasePart)
  end
end

Players.PlayerAdded:Connect(onPlayerAdded)
print("[NEURAL_ENGINE] :: Combat system initialized ✓")`;

// ─── Explorer Tree ───────────────────────────────────────────────────────────
type TreeNode = { id: string; label: string; icon: string; children?: TreeNode[] };

const TREE: TreeNode[] = [
  {
    id: "ws", label: "Workspace", icon: "🌐",
    children: [
      { id: "bp", label: "Baseplate", icon: "◼" },
      {
        id: "p", label: "NeuralPlayer", icon: "🎮",
        children: [
          { id: "hrp", label: "HumanoidRootPart", icon: "⬡" },
          { id: "hum", label: "Humanoid", icon: "◈" },
          { id: "aura", label: "AuraEmitter", icon: "✦" },
        ],
      },
      { id: "cam", label: "Camera", icon: "📷" },
    ],
  },
  {
    id: "sss", label: "ServerScriptService", icon: "⚙️",
    children: [
      { id: "main", label: "NeuralCombat.lua", icon: "📄" },
      { id: "ai",   label: "AIController.lua", icon: "📄" },
    ],
  },
  { id: "rep", label: "ReplicatedStorage", icon: "📦",
    children: [
      { id: "assets", label: "Assets", icon: "🗂️" },
      { id: "mods",   label: "Modules", icon: "🗂️" },
    ],
  },
  { id: "light", label: "Lighting", icon: "💡" },
  { id: "sg",    label: "StarterGui", icon: "🖼️" },
];

function TreeItem({ node, depth = 0, selected, onSelect }: {
  node: TreeNode; depth?: number; selected: string; onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(depth < 1);
  const isSelected = selected === node.id;
  const hasChildren = !!node.children?.length;

  return (
    <div>
      <div
        onClick={() => { onSelect(node.id); if (hasChildren) setOpen(o => !o); }}
        className={`flex items-center gap-1.5 px-2 py-[3px] cursor-pointer rounded transition-colors duration-100 group select-none
          ${isSelected ? "bg-[var(--cyan)]/15 text-[var(--cyan)]" : "hover:bg-white/[0.06] text-white/70 hover:text-white/90"}`}
        style={{ paddingLeft: `${8 + depth * 14}px` }}
      >
        {hasChildren && (
          <span className={`text-[8px] opacity-50 transition-transform duration-200 ${open ? "rotate-90" : ""}`}>▶</span>
        )}
        {!hasChildren && <span className="w-2" />}
        <span className="text-[11px]">{node.icon}</span>
        <span className="font-mono text-[10px] truncate">{node.label}</span>
      </div>
      {hasChildren && open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          {node.children!.map(child => (
            <TreeItem key={child.id} node={child} depth={depth + 1} selected={selected} onSelect={onSelect} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

// ─── Properties Panel ────────────────────────────────────────────────────────
const PROPS: Record<string, Array<{ k: string; v: string; color?: string }>> = {
  bp: [
    { k: "Name",     v: "Baseplate" },
    { k: "Size",     v: "512, 20, 512" },
    { k: "Material", v: "SmoothPlastic" },
    { k: "Color",    v: "#1A2A1A",      color: "#1A2A1A" },
    { k: "Anchored", v: "true",         color: "#00D4FF" },
    { k: "CastShadow", v: "true" },
  ],
  hrp: [
    { k: "Name",   v: "HumanoidRootPart" },
    { k: "Size",   v: "2, 2, 1" },
    { k: "Color",  v: "#00D4FF", color: "#00D4FF" },
    { k: "CanCollide", v: "false" },
  ],
  hum: [
    { k: "WalkSpeed",  v: "24",  color: "#FF4500" },
    { k: "JumpHeight", v: "75",  color: "#FF4500" },
    { k: "MaxHealth",  v: "100" },
    { k: "Health",     v: "100", color: "#00D4FF" },
  ],
  aura: [
    { k: "Rate",          v: "80" },
    { k: "LightEmission", v: "0.9", color: "#00D4FF" },
    { k: "SpreadAngle",   v: "360, 0" },
    { k: "Color",         v: "#00D4FF", color: "#00D4FF" },
  ],
  main: [
    { k: "Name",    v: "NeuralCombat.lua" },
    { k: "Enabled", v: "true",  color: "#00D4FF" },
    { k: "RunContext", v: "Server" },
  ],
  default: [
    { k: "Name",       v: "Workspace" },
    { k: "Gravity",    v: "196.2" },
    { k: "StreamingEnabled", v: "true", color: "#00D4FF" },
  ],
};

// ─── Isometric Viewport ──────────────────────────────────────────────────────
const ISO_W = 320, ISO_H = 220;
const BW = 28, BH = 14; // block face width & height

function isoProject(col: number, row: number, h: number) {
  const cx = ISO_W / 2;
  const cy = ISO_H / 2 + 30;
  const x = cx + (col - row) * (BW / 2);
  const y = cy + (col + row) * (BH / 2) - h * BH;
  return { x, y };
}

type Block = { c: number; r: number; h: number; top: string; left: string; right: string; label?: string };

const BLOCKS: Block[] = [
  // Baseplate 7×7
  ...Array.from({ length: 7 }, (_, r) =>
    Array.from({ length: 7 }, (_, c) => ({
      c, r, h: 0,
      top:   "rgba(28,68,28,0.95)",
      left:  "rgba(18,48,18,0.95)",
      right: "rgba(14,40,14,0.95)",
    }))
  ).flat(),
  // Tower center
  { c: 3, r: 3, h: 4, top: "#00D4FF", left: "#006a80", right: "#004d5c", label: "TOWER" },
  // Buildings
  { c: 1, r: 1, h: 2, top: "#ff4500", left: "#802200", right: "#5c1800" },
  { c: 5, r: 1, h: 3, top: "#a855f7", left: "#5b21b6", right: "#3b0764" },
  { c: 1, r: 5, h: 2, top: "#f59e0b", left: "#92400e", right: "#78350f" },
  { c: 5, r: 5, h: 2, top: "#10b981", left: "#064e3b", right: "#022c22" },
  // Extra details
  { c: 2, r: 0, h: 1, top: "#334155", left: "#1e293b", right: "#0f172a" },
  { c: 4, r: 6, h: 1, top: "#334155", left: "#1e293b", right: "#0f172a" },
  { c: 0, r: 3, h: 1, top: "#334155", left: "#1e293b", right: "#0f172a" },
  { c: 6, r: 3, h: 1, top: "#334155", left: "#1e293b", right: "#0f172a" },
];

// Sort back-to-front
const SORTED_BLOCKS = [...BLOCKS].sort((a, b) => (a.c + a.r) - (b.c + b.r) || a.h - b.h);

function IsometricViewport({ running }: { running: boolean }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick(t => t + 1), 800);
    return () => clearInterval(id);
  }, [running]);

  return (
    <svg width={ISO_W} height={ISO_H} className="overflow-visible">
      {/* Grid atmosphere */}
      <defs>
        <radialGradient id="vp-glow" cx="50%" cy="60%" r="55%">
          <stop offset="0%"   stopColor="#00D4FF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
        </radialGradient>
        <filter id="vp-blur">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>
      <rect width={ISO_W} height={ISO_H} fill="url(#vp-glow)" />

      {SORTED_BLOCKS.map((block, i) => {
        const o = isoProject(block.c, block.r, block.h);
        // Top face
        const topPath = [
          `M ${o.x} ${o.y}`,
          `l ${BW / 2} ${BH / 2}`,
          `l ${BW / 2} ${-BH / 2}`,
          `l ${-BW / 2} ${-BH / 2}`,
          "Z",
        ].join(" ");
        // Left face
        const leftPath = [
          `M ${o.x} ${o.y}`,
          `l ${-BW / 2} ${BH / 2}`,
          `l 0 ${BH}`,
          `l ${BW / 2} ${-BH / 2}`,
          "Z",
        ].join(" ");
        // Right face
        const rightPath = [
          `M ${o.x} ${o.y}`,
          `l ${BW / 2} ${BH / 2}`,
          `l 0 ${BH}`,
          `l ${-BW / 2} ${-BH / 2}`,
          "Z",
        ].join(" ");

        const isTower = block.label === "TOWER";
        const glowPulse = isTower && running ? Math.sin(tick * 0.8) * 0.3 + 0.7 : 1;

        return (
          <g key={i} style={{ opacity: glowPulse }}>
            <path d={leftPath}  fill={block.left}  />
            <path d={rightPath} fill={block.right} />
            <path d={topPath}   fill={block.top}   />
            {isTower && running && (
              <path d={topPath} fill="#00D4FF" opacity="0.3" filter="url(#vp-blur)" />
            )}
          </g>
        );
      })}

      {/* Scan line overlay when running */}
      {running && (
        <motion.line
          x1={0} y1={0} x2={ISO_W} y2={0}
          stroke="#00D4FF" strokeWidth="1" opacity={0.4}
          animate={{ y1: [0, ISO_H, 0], y2: [0, ISO_H, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Player character — cyan block that moves */}
      {running && (
        <motion.g
          animate={{
            x: [0, 12, 0, -12, 0],
            y: [0, -6, 0, -6, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {(() => {
            const pos = isoProject(3, 3, 5);
            return (
              <>
                <ellipse cx={pos.x} cy={pos.y + 6} rx={8} ry={4} fill="#00D4FF" opacity="0.3" />
                <rect x={pos.x - 5} y={pos.y - 8} width={10} height={14}
                  fill="#00D4FF" opacity="0.9" rx={1}
                  style={{ filter: "drop-shadow(0 0 6px #00D4FF)" }}
                />
                {/* Aura particles */}
                {[0, 1, 2].map(p => (
                  <motion.circle
                    key={p}
                    cx={pos.x}
                    cy={pos.y - 4}
                    r={2}
                    fill="#00D4FF"
                    opacity={0.7}
                    animate={{
                      cx: [pos.x, pos.x + Math.cos(p * 2.1) * 12, pos.x],
                      cy: [pos.y - 4, pos.y - 20 - p * 4, pos.y - 4],
                      opacity: [0.7, 0, 0.7],
                    }}
                    transition={{ duration: 1.5 + p * 0.4, repeat: Infinity, delay: p * 0.5 }}
                  />
                ))}
              </>
            );
          })()}
        </motion.g>
      )}
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export const RobloxStudio = memo(function RobloxStudio() {
  const { playHover, playClick } = useSound();
  const [running, setRunning] = useState(false);
  const [selected, setSelected] = useState("bp");
  const [activeTab, setActiveTab] = useState<"script" | "output">("script");
  const [outputLines, setOutputLines] = useState<string[]>([
    '> Studio: Loading workspace...',
    '> Assets: All packages loaded.',
    '> [NEURAL_ENGINE] :: Waiting for run...',
  ]);
  const outputRef = useRef<HTMLDivElement>(null);
  const [typedLines, setTypedLines] = useState(0);

  const codeLines = LUAU_CODE.split('\n');

  // Animate code line-by-line on mount
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < codeLines.length) {
        setTypedLines(++i);
      } else {
        clearInterval(id);
      }
    }, 80);
    return () => clearInterval(id);
  }, []);

  // Output log when running
  useEffect(() => {
    if (!running) return;
    const logs = [
      '> [NEURAL_ENGINE] :: System initialized ✓',
      '> [PLAYER] :: "Avazbek" joined the game.',
      '> [AURA] :: Particle emitter spawned @ HumanoidRootPart',
      '> [CONFIG] :: WalkSpeed=24, JumpHeight=75 applied.',
      '> [COMBAT] :: AI module online. Neural sync: 98.4%',
      '> [SERVER] :: Tick rate 60hz — all systems nominal.',
    ];
    let i = 0;
    const id = setInterval(() => {
      if (i < logs.length) {
        setOutputLines(prev => [...prev, logs[i++]]);
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
      } else {
        clearInterval(id);
      }
    }, 600);
    return () => clearInterval(id);
  }, [running]);

  const props = PROPS[selected] ?? PROPS.default;

  const stats = [
    { label: "Games Built",     value: "12+", unit: "projects",    color: "text-[var(--cyan)]" },
    { label: "Scripts Written", value: "150+", unit: "Luau files", color: "text-accent" },
    { label: "Playtests",       value: "10K+", unit: "plays",      color: "text-emerald-400" },
    { label: "Studio Hours",    value: "2K+",  unit: "hours",      color: "text-purple-400" },
  ];

  return (
    <section
      id="roblox"
      className="px-5 md:px-20 lg:px-32 py-28 md:py-40 border-b border-white/[0.06] relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-blueprint opacity-[0.025] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[var(--cyan)]/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent/10 to-transparent pointer-events-none" />

      {/* Corner label */}
      <div className="absolute top-8 right-8 font-mono text-[9px] text-[var(--cyan)]/20 hidden lg:block uppercase tracking-[0.25em] font-bold">
        SEC_RBLX // STUDIO.IDE
      </div>

      {/* ── Header ── */}
      <RevealBox className="mb-6 flex gap-4 items-center">
        <div className="h-1 w-12 bg-gradient-to-r from-[var(--cyan)] to-transparent rounded-full" />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold text-[var(--cyan)] drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]">
          // Game Development
        </span>
      </RevealBox>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
        <h2 className="font-display text-5xl sm:text-7xl md:text-9xl uppercase tracking-tighter leading-[0.85]">
          <WordReveal text="Roblox" sound />
          <br />
          <span className="text-[var(--cyan)] drop-shadow-[0_0_20px_rgba(0,212,255,0.4)]">
            <WordReveal text="Studio" delay={0.15} />
          </span>
        </h2>
        <div className="glass-card border-gradient-cyan px-6 py-4 font-mono text-[11px] text-white/60 max-w-[38ch] leading-relaxed font-bold rounded-xl">
          Luau scripting · Game architecture · Physics simulation · 3D world-building · AI NPCs
        </div>
      </div>

      {/* ── Stats ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
      >
        {stats.map(s => (
          <motion.div
            key={s.label}
            variants={{
              hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            onMouseEnter={playHover}
            className="glass-dark border border-white/[0.08] rounded-xl p-5 hover:border-[var(--cyan)]/30 transition-colors duration-300 cursor-default"
          >
            <div className={`font-display text-4xl md:text-5xl uppercase tracking-tighter ${s.color} drop-shadow-[0_0_15px_currentColor]`}>
              {s.value}
            </div>
            <div className="font-mono text-[10px] text-white/40 mt-1 uppercase tracking-[0.2em] font-bold">{s.label}</div>
            <div className="font-mono text-[9px] text-white/20 uppercase tracking-[0.15em]">{s.unit}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Studio IDE ── */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_0_60px_rgba(0,212,255,0.08)] bg-[#0d1117]"
      >
        {/* Title bar */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-[#161b22] border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-[11px] text-white/40 ml-2 font-bold tracking-widest uppercase">
            Roblox Studio — NeuralCombat.rbxl
          </span>
          <div className="ml-auto font-mono text-[9px] text-[var(--cyan)]/40 uppercase tracking-[0.2em]">
            {running ? "● RUNNING" : "○ STOPPED"}
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1 px-3 py-2 bg-[#161b22]/80 border-b border-white/[0.06] overflow-x-auto">
          {/* Run control */}
          <button
            onClick={() => { playClick(); setRunning(r => !r); setActiveTab("output"); }}
            onMouseEnter={playHover}
            className={`flex items-center gap-2 px-4 py-1.5 rounded font-mono text-[11px] font-bold uppercase tracking-widest transition-all duration-300
              ${running
                ? "bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30"
                : "bg-[var(--cyan)]/15 border border-[var(--cyan)]/40 text-[var(--cyan)] hover:bg-[var(--cyan)]/25 shadow-[0_0_15px_rgba(0,212,255,0.2)]"
              }`}
          >
            {running ? "⏹ Stop" : "▶ Play"}
          </button>

          <div className="w-px h-5 bg-white/10 mx-1" />

          {["Build", "Model", "Terrain", "Test", "View", "Plugins"].map(tab => (
            <button
              key={tab}
              onMouseEnter={playHover}
              className="px-3 py-1.5 font-mono text-[10px] text-white/40 hover:text-white/70 hover:bg-white/[0.06] rounded transition-all duration-200 uppercase tracking-[0.1em] font-bold"
            >
              {tab}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <div className={`flex items-center gap-1.5 font-mono text-[10px] font-bold px-3 py-1 rounded border
              ${running
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-white/10 text-white/20"}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${running ? "bg-emerald-400 animate-pulse" : "bg-white/20"}`} />
              {running ? "60 FPS" : "IDLE"}
            </div>
          </div>
        </div>

        {/* Three-panel layout */}
        <div className="grid grid-cols-[160px_1fr_160px] min-h-[300px]" style={{ gridTemplateColumns: "160px 1fr 160px" }}>
          {/* ── Explorer ── */}
          <div className="border-r border-white/[0.06] bg-[#0d1117] overflow-hidden">
            <div className="px-3 py-2 border-b border-white/[0.06] flex items-center justify-between">
              <span className="font-mono text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold">Explorer</span>
              <span className="font-mono text-[9px] text-[var(--cyan)]/40">⊞</span>
            </div>
            <div className="py-1 text-[10px]">
              {TREE.map(node => (
                <TreeItem key={node.id} node={node} selected={selected} onSelect={(id) => { playClick(); setSelected(id); }} />
              ))}
            </div>
          </div>

          {/* ── Viewport ── */}
          <div className="relative bg-[#0a0f14] flex flex-col items-center justify-center overflow-hidden">
            {/* Viewport grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            {/* Atmospheric glow */}
            <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none
              bg-[radial-gradient(ellipse_at_50%_70%,rgba(0,212,255,0.06),transparent_70%)]
              ${running ? "opacity-100" : "opacity-30"}`}
            />

            <IsometricViewport running={running} />

            {/* Coordinate overlay */}
            <div className="absolute top-3 left-3 font-mono text-[8px] text-[var(--cyan)]/30 font-bold leading-relaxed">
              {running ? (
                <>
                  <div>CAM: 45°, 65°, 120m</div>
                  <div className="text-emerald-400/40">PLAYER: ACTIVE</div>
                </>
              ) : (
                <>
                  <div>CAM: 45°, 65°, 120m</div>
                  <div>PLAYER: READY</div>
                </>
              )}
            </div>

            {/* Press Play hint */}
            {!running && (
              <motion.div
                className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[var(--cyan)]/30 uppercase tracking-widest font-bold"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Press ▶ to run
              </motion.div>
            )}
          </div>

          {/* ── Properties ── */}
          <div className="border-l border-white/[0.06] bg-[#0d1117] overflow-hidden">
            <div className="px-3 py-2 border-b border-white/[0.06]">
              <span className="font-mono text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold">Properties</span>
            </div>
            <div className="p-2 space-y-px">
              <AnimatePresence mode="popLayout">
                {props.map((row, i) => (
                  <motion.div
                    key={row.k + selected}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    className="flex justify-between items-center px-1.5 py-1 rounded hover:bg-white/[0.04] group"
                  >
                    <span className="font-mono text-[9px] text-white/40 truncate font-bold">{row.k}</span>
                    <span
                      className="font-mono text-[9px] font-bold truncate max-w-[70px] text-right"
                      style={{ color: row.color ?? "rgba(255,255,255,0.7)" }}
                    >
                      {row.v}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Script/Output Tabs ── */}
        <div className="border-t border-white/[0.06]">
          <div className="flex items-center gap-0 border-b border-white/[0.06] bg-[#161b22]/60">
            {(["script", "output"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => { playClick(); setActiveTab(tab); }}
                onMouseEnter={playHover}
                className={`px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] font-bold border-b-2 transition-all duration-200
                  ${activeTab === tab
                    ? "border-[var(--cyan)] text-[var(--cyan)]"
                    : "border-transparent text-white/30 hover:text-white/60"
                  }`}
              >
                {tab === "script" ? "📄 NeuralCombat.lua" : "📟 Output"}
              </button>
            ))}
            {running && (
              <motion.div
                className="ml-auto mr-4 flex items-center gap-1.5 font-mono text-[9px] text-emerald-400 font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Server running
              </motion.div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "script" ? (
              <motion.div
                key="script"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="relative overflow-auto max-h-56 bg-[#0d1117]"
              >
                {/* Line numbers + code */}
                <div className="flex min-w-0">
                  {/* Line numbers */}
                  <div className="select-none min-w-[40px] px-2 py-4 text-right font-mono text-[11px] text-white/15 leading-[1.7] border-r border-white/[0.06] font-bold bg-[#0d1117]">
                    {codeLines.slice(0, typedLines).map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  {/* Syntax-highlighted code */}
                  <div className="flex-1 overflow-x-auto">
                    <Highlight
                      theme={{
                        ...themes.vsDark,
                        plain: { color: "#c9d1d9", backgroundColor: "transparent" },
                      }}
                      code={codeLines.slice(0, typedLines).join('\n')}
                      language="lua"
                    >
                      {({ tokens, getLineProps, getTokenProps }) => (
                        <pre className="px-4 py-4 text-[11px] leading-[1.7] font-mono m-0 bg-transparent">
                          {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line })}>
                              {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token })} />
                              ))}
                            </div>
                          ))}
                          {/* Blinking cursor */}
                          {typedLines < codeLines.length && (
                            <motion.span
                              className="inline-block w-[7px] h-[13px] bg-[var(--cyan)] align-middle"
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ duration: 0.8, repeat: Infinity }}
                            />
                          )}
                        </pre>
                      )}
                    </Highlight>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="output"
                ref={outputRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="max-h-56 overflow-y-auto bg-[#0d1117] p-4 font-mono text-[11px] leading-[1.8] space-y-0.5"
              >
                {outputLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={
                      line.includes("✓") ? "text-emerald-400"
                      : line.includes("NEURAL") ? "text-[var(--cyan)]"
                      : line.includes("AURA") || line.includes("PARTICLE") ? "text-purple-400"
                      : line.includes("CONFIG") ? "text-accent"
                      : "text-white/40"
                    }
                  >
                    {line}
                  </motion.div>
                ))}
                {running && (
                  <motion.span
                    className="inline-block w-2 h-[13px] bg-white/40 align-middle"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Skill badges ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap gap-3 mt-10"
      >
        {[
          { label: "Luau / Lua 5.1", color: "cyan"   },
          { label: "Roblox Studio",  color: "accent"  },
          { label: "Game Architecture", color: "emerald" },
          { label: "AI NPCs",        color: "purple"  },
          { label: "Physics Engine", color: "cyan"    },
          { label: "UI / ScreenGui", color: "accent"  },
          { label: "DataStore v2",   color: "emerald" },
          { label: "RemoteEvents",   color: "purple"  },
        ].map(badge => (
          <motion.span
            key={badge.label}
            onMouseEnter={playHover}
            whileHover={{ y: -3, scale: 1.05 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`font-mono text-[10px] uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-lg border cursor-default
              ${badge.color === "cyan"    ? "border-[var(--cyan)]/30 bg-[var(--cyan)]/[0.06] text-[var(--cyan)]"
              : badge.color === "accent"  ? "border-accent/30 bg-accent/[0.06] text-accent"
              : badge.color === "emerald" ? "border-emerald-500/30 bg-emerald-500/[0.06] text-emerald-400"
              :                             "border-purple-500/30 bg-purple-500/[0.06] text-purple-400"
              }`}
          >
            {badge.label}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
});
