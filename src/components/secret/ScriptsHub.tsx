import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { X, Search, Copy, Check, Smartphone, ChevronDown, ChevronUp, Grip, Shield, Zap } from "lucide-react";
import { ALL_SCRIPTS, SCRIPT_CATEGORIES, TOTAL_COUNT, type RobloxScript, type PhoneUI } from "@/data/scripts";

interface ScriptsHubProps {
  open: boolean;
  onClose: () => void;
}

// ─── Phone Mockup Preview ───
function PhonePreview({ ui, color }: { ui: PhoneUI; color: string }) {
  return (
    <div className="flex justify-center items-center py-2">
      {/* Phone frame */}
      <div
        className="relative rounded-[28px] overflow-hidden shadow-2xl"
        style={{
          width: 148,
          height: 270,
          background: "#0a0a0a",
          border: "3px solid #1a1a2e",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.8)",
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-b-2xl z-10" />
        {/* Screen content */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ background: color }}
        >
          {/* Status bar */}
          <div className="flex items-center justify-between px-3 pt-5 pb-1">
            <span className="text-[7px] text-white/40 font-mono">9:41</span>
            <div className="flex gap-0.5">
              {[1,2,3].map(i => (
                <div key={i} className="w-1 rounded-sm bg-white/30" style={{ height: 3 + i * 1.5 }} />
              ))}
              <div className="w-3 h-2 rounded-sm border border-white/30 ml-0.5">
                <div className="h-full w-2/3 bg-white/50 rounded-sm" />
              </div>
            </div>
          </div>

          {/* GUI title */}
          <div className="mx-2 mt-1 mb-2 px-2 py-1 rounded-lg" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="text-[8px] font-mono text-white/80 text-center font-bold tracking-wide">
              {ui.title}
            </div>
          </div>

          {/* Buttons */}
          <div className="px-2 space-y-1.5">
            {ui.buttons.map((btn, i) => (
              <div
                key={i}
                className="rounded-md flex items-center justify-center py-1"
                style={{ background: btn.color + "22", border: `1px solid ${btn.color}55` }}
              >
                <span className="text-[7px] font-mono font-bold" style={{ color: btn.color }}>
                  {btn.label}
                </span>
              </div>
            ))}

            {/* Sliders */}
            {ui.sliders?.map((s, i) => (
              <div key={i} className="space-y-0.5">
                <div className="flex justify-between">
                  <span className="text-[6px] text-white/40 font-mono">{s.label}</span>
                  <span className="text-[6px] text-white/50 font-mono">{s.value}%</span>
                </div>
                <div className="h-1 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${s.value}%`, background: "linear-gradient(90deg, #f59e0b, #ef4444)" }}
                  />
                </div>
              </div>
            ))}

            {/* Toggles */}
            {ui.toggles?.map((t, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-[6px] text-white/40 font-mono">{t.label}</span>
                <div
                  className="rounded-full flex items-center px-0.5"
                  style={{
                    width: 18, height: 9,
                    background: t.on ? "#22c55e44" : "#ffffff11",
                    border: `1px solid ${t.on ? "#22c55e" : "#ffffff22"}`,
                  }}
                >
                  <div
                    className="rounded-full transition-all"
                    style={{
                      width: 7, height: 7,
                      background: t.on ? "#22c55e" : "#ffffff33",
                      marginLeft: t.on ? "auto" : 0,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Status bar */}
          {ui.statusText && (
            <div className="absolute bottom-4 left-2 right-2">
              <div className="px-2 py-1 rounded-md text-center" style={{ background: "rgba(0,255,100,0.06)", border: "1px solid rgba(0,255,100,0.12)" }}>
                <span className="text-[6px] font-mono text-green-400/70">{ui.statusText}</span>
              </div>
            </div>
          )}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/20" />
      </div>
    </div>
  );
}

// ─── Script Card ───
function ScriptCard({ script }: { script: RobloxScript }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(script.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [script.code]);

  return (
    <div
      className="border rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:border-accent/40"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderColor: expanded ? "rgba(255,140,0,0.3)" : "rgba(255,255,255,0.06)",
      }}
      onClick={() => setExpanded((p) => !p)}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-[10px] text-white/80 font-semibold truncate leading-tight">
              {script.name}
            </span>
            {script.verified && (
              <span className="shrink-0 flex items-center gap-0.5 rounded px-1 py-0.5 text-[7px] font-mono font-bold" style={{ background: "#22c55e15", color: "#22c55e", border: "1px solid #22c55e30" }}>
                <Shield className="size-2" /> VERIFIED
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-mono text-[8px] text-white/30 truncate">{script.game}</span>
            <span className="font-mono text-[7px] px-1 rounded" style={{ background: "#6366f115", color: "#818cf8", border: "1px solid #6366f120" }}>
              DELTA
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={copy}
            className="flex items-center gap-1 rounded px-2 py-1 font-mono text-[8px] font-bold transition-all"
            style={{
              background: copied ? "#22c55e20" : "#f59e0b15",
              color: copied ? "#22c55e" : "#f59e0b",
              border: `1px solid ${copied ? "#22c55e40" : "#f59e0b30"}`,
            }}
          >
            {copied ? <Check className="size-2.5" /> : <Copy className="size-2.5" />}
            {copied ? "COPIED" : "COPY"}
          </button>
          {expanded ? <ChevronUp className="size-3 text-white/30" /> : <ChevronDown className="size-3 text-white/30" />}
        </div>
      </div>

      {/* Expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t px-3 py-2 space-y-3" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <p className="font-mono text-[9px] text-white/40 leading-relaxed">{script.description}</p>

              {/* Phone preview */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Smartphone className="size-3 text-white/30" />
                  <span className="font-mono text-[8px] text-white/30 uppercase tracking-wider">Phone Preview</span>
                </div>
                <PhonePreview ui={script.previewUI} color={script.previewColor} />
              </div>

              {/* Code preview */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[8px] text-white/30 uppercase tracking-wider">Script</span>
                  <button
                    onClick={copy}
                    className="flex items-center gap-1 font-mono text-[8px] transition-colors"
                    style={{ color: copied ? "#22c55e" : "#f59e0b" }}
                  >
                    {copied ? <Check className="size-2.5" /> : <Copy className="size-2.5" />}
                    {copied ? "Copied!" : "Copy to Delta"}
                  </button>
                </div>
                <pre
                  className="rounded-lg p-2.5 font-mono text-[8px] text-green-400/70 overflow-x-auto leading-relaxed"
                  style={{ background: "#0a0f0a", border: "1px solid rgba(34,197,94,0.1)", maxHeight: 100 }}
                >
                  {script.code}
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main ScriptsHub ───
export function ScriptsHub({ open, onClose }: ScriptsHubProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(0);
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);

  const PAGE_SIZE = 20;

  const filtered = useMemo(() => {
    let list = ALL_SCRIPTS;
    if (activeCategory !== "all") {
      list = list.filter((s) => s.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.game.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, activeCategory]);

  const paginated = useMemo(() => filtered.slice(0, (page + 1) * PAGE_SIZE), [filtered, page]);
  const hasMore = paginated.length < filtered.length;

  // reset page on filter change
  useEffect(() => { setPage(0); }, [search, activeCategory]);

  return (
    <>
      {/* Drag constraint layer */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[200]" />

      <AnimatePresence>
        {open && (
          <motion.div
            drag
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={constraintsRef}
            dragElastic={0.05}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 10 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed z-[210] flex flex-col overflow-hidden rounded-2xl shadow-2xl"
            style={{
              top: "12%",
              left: "50%",
              x: "-50%",
              width: 360,
              maxWidth: "calc(100vw - 24px)",
              height: 520,
              maxHeight: "calc(100vh - 80px)",
              background: "rgba(8,8,16,0.97)",
              border: "1px solid rgba(255,140,0,0.15)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.7), 0 0 80px rgba(255,140,0,0.04)",
            }}
          >
            {/* ─── Header (drag handle) ─── */}
            <div
              className="flex items-center justify-between px-4 py-3 shrink-0 cursor-grab active:cursor-grabbing select-none"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="flex items-center gap-2.5">
                <Grip className="size-3.5 text-white/20" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-white/80 uppercase tracking-widest">
                      Scripts Hub
                    </span>
                    <span className="font-mono text-[8px] px-1.5 py-0.5 rounded font-bold" style={{ background: "#f59e0b15", color: "#f59e0b", border: "1px solid #f59e0b30" }}>
                      {TOTAL_COUNT.toLocaleString()}+ SCRIPTS
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Smartphone className="size-2.5 text-white/25" />
                    <span className="font-mono text-[7px] text-white/25 uppercase tracking-wider">
                      Mobile & Delta Executor
                    </span>
                    <Zap className="size-2.5 text-accent/40" />
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/25 hover:text-white/60 transition-colors rounded-lg p-1 hover:bg-white/5"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* ─── Search ─── */}
            <div className="px-3 pt-3 pb-2 shrink-0">
              <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <Search className="size-3 text-white/25 shrink-0" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Qidirish... (Blox Fruits, fly, esp...)"
                  className="flex-1 bg-transparent font-mono text-[10px] text-white/70 placeholder:text-white/20 outline-none"
                  autoComplete="off"
                  spellCheck={false}
                />
                {search && (
                  <button onClick={() => setSearch("")} className="text-white/20 hover:text-white/50">
                    <X className="size-3" />
                  </button>
                )}
              </div>
            </div>

            {/* ─── Category Pills ─── */}
            <div
              className="px-3 pb-2 flex gap-1.5 overflow-x-auto shrink-0 scrollbar-hide"
              style={{ scrollbarWidth: "none" }}
            >
              {SCRIPT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="shrink-0 flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[8px] font-bold transition-all whitespace-nowrap"
                  style={{
                    background: activeCategory === cat.id ? "rgba(255,140,0,0.15)" : "rgba(255,255,255,0.04)",
                    color: activeCategory === cat.id ? "#f59e0b" : "rgba(255,255,255,0.3)",
                    border: activeCategory === cat.id ? "1px solid rgba(255,140,0,0.35)" : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* ─── Count bar ─── */}
            <div className="px-3 pb-2 shrink-0">
              <div className="flex items-center gap-2">
                <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.04)" }} />
                <span className="font-mono text-[8px] text-white/20">
                  {filtered.length.toLocaleString()} script topildi
                </span>
                <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.04)" }} />
              </div>
            </div>

            {/* ─── Script List ─── */}
            <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2">
              {paginated.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 gap-2">
                  <span className="text-2xl">🔍</span>
                  <span className="font-mono text-[9px] text-white/25">Script topilmadi</span>
                </div>
              ) : (
                <>
                  {paginated.map((script) => (
                    <ScriptCard key={script.id} script={script} />
                  ))}
                  {hasMore && (
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      className="w-full py-2 rounded-lg font-mono text-[9px] font-bold transition-all"
                      style={{
                        background: "rgba(255,140,0,0.06)",
                        color: "#f59e0b",
                        border: "1px solid rgba(255,140,0,0.15)",
                      }}
                    >
                      Ko'proq yuklash ({(filtered.length - paginated.length).toLocaleString()} qoldi)
                    </button>
                  )}
                </>
              )}
            </div>

            {/* ─── Footer ─── */}
            <div
              className="px-4 py-2 shrink-0 flex items-center justify-between"
              style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
            >
              <div className="flex items-center gap-1.5">
                <div className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-[7px] text-white/20 uppercase tracking-wider">
                  Delta v2.6.1 Compatible
                </span>
              </div>
              <span className="font-mono text-[7px] text-white/15">
                📱 Mobile Optimized
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
