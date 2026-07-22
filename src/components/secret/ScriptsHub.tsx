import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import {
  X, Search, Copy, Check, Smartphone,
  ChevronDown, ChevronUp, Grip, Shield, Zap,
} from "lucide-react";
import {
  ALL_SCRIPTS, SCRIPT_CATEGORIES, TOTAL_COUNT,
  type RobloxScript, type PhoneUI,
} from "@/data/scripts";

interface ScriptsHubProps {
  open: boolean;
  onClose: () => void;
}

// ─── Phone Mockup Preview ────────────────────────────────────────────────────
function PhonePreview({ ui, color }: { ui: PhoneUI; color: string }) {
  return (
    <div className="flex justify-center py-1">
      <div
        className="relative rounded-[22px] overflow-hidden"
        style={{
          width: 130, height: 240,
          background: "#080808",
          border: "2.5px solid #1a1a2e",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 12px 40px rgba(0,0,0,0.8)",
        }}
      >
        {/* notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-3 bg-black rounded-b-xl z-10" />
        {/* screen */}
        <div className="absolute inset-0 overflow-hidden" style={{ background: color }}>
          {/* status bar */}
          <div className="flex items-center justify-between px-2.5 pt-4 pb-0.5">
            <span className="text-[6px] text-white/35 font-mono">9:41</span>
            <div className="flex gap-0.5 items-end">
              {[1,2,3].map(i=>(
                <div key={i} className="w-0.5 bg-white/25 rounded-sm" style={{height:2+i}}/>
              ))}
              <div className="w-2.5 h-1.5 rounded-sm border border-white/25 ml-0.5">
                <div className="h-full w-2/3 bg-white/40 rounded-sm"/>
              </div>
            </div>
          </div>
          {/* title bar */}
          <div className="mx-1.5 mt-0.5 mb-1.5 px-1.5 py-0.5 rounded-md text-center"
            style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.07)"}}>
            <span className="text-[7px] font-mono font-bold text-white/75">{ui.title}</span>
          </div>
          {/* buttons */}
          <div className="px-1.5 space-y-1">
            {ui.buttons.map((btn,i)=>(
              <div key={i} className="rounded py-0.5 flex items-center justify-center"
                style={{background:btn.color+"1a",border:`1px solid ${btn.color}44`}}>
                <span className="text-[6px] font-mono font-bold" style={{color:btn.color}}>
                  {btn.label}
                </span>
              </div>
            ))}
            {ui.sliders?.map((s,i)=>(
              <div key={i} className="space-y-0.5">
                <div className="flex justify-between">
                  <span className="text-[5.5px] text-white/35 font-mono">{s.label}</span>
                  <span className="text-[5.5px] text-white/40 font-mono">{s.value}%</span>
                </div>
                <div className="h-0.5 rounded-full bg-white/10">
                  <div className="h-full rounded-full"
                    style={{width:`${s.value}%`,background:"linear-gradient(90deg,#f59e0b,#ef4444)"}}/>
                </div>
              </div>
            ))}
            {ui.toggles?.map((t,i)=>(
              <div key={i} className="flex items-center justify-between">
                <span className="text-[5.5px] text-white/35 font-mono">{t.label}</span>
                <div className="rounded-full flex items-center px-0.5"
                  style={{width:16,height:8,
                    background:t.on?"#22c55e33":"#ffffff0d",
                    border:`1px solid ${t.on?"#22c55e":"#ffffff1a"}`}}>
                  <div className="rounded-full"
                    style={{width:6,height:6,
                      background:t.on?"#22c55e":"#ffffff22",
                      marginLeft:t.on?"auto":0}}/>
                </div>
              </div>
            ))}
          </div>
          {/* status */}
          {ui.statusText && (
            <div className="absolute bottom-3 left-1.5 right-1.5">
              <div className="px-1.5 py-0.5 rounded text-center"
                style={{background:"rgba(0,255,100,0.05)",border:"1px solid rgba(0,255,100,0.1)"}}>
                <span className="text-[5.5px] font-mono text-green-400/60 leading-tight">{ui.statusText}</span>
              </div>
            </div>
          )}
        </div>
        {/* home bar */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-white/15"/>
      </div>
    </div>
  );
}

// ─── Script Card ─────────────────────────────────────────────────────────────
function ScriptCard({ script }: { script: RobloxScript }) {
  const [expanded, setExpanded] = useState(false);
  const [copied,   setCopied  ] = useState(false);

  const copy = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(script.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [script.code]);

  return (
    <div
      onClick={() => setExpanded(p => !p)}
      className="border rounded-lg overflow-hidden cursor-pointer transition-all duration-150 hover:border-accent/30 active:scale-[0.99]"
      style={{
        background: "rgba(255,255,255,0.018)",
        borderColor: expanded ? "rgba(255,140,0,0.28)" : "rgba(255,255,255,0.055)",
      }}
    >
      {/* header row */}
      <div className="flex items-center gap-2 px-2.5 py-1.5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="font-mono text-[9.5px] text-white/75 font-semibold truncate">
              {script.name}
            </span>
            {script.verified && (
              <span className="shrink-0 flex items-center gap-0.5 rounded px-1 py-0.5 text-[6px] font-mono font-bold"
                style={{background:"#22c55e12",color:"#22c55e",border:"1px solid #22c55e28"}}>
                <Shield className="size-1.5"/> VER
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="font-mono text-[7px] text-white/25 truncate max-w-[110px]">{script.game}</span>
            <span className="font-mono text-[6px] px-1 rounded shrink-0"
              style={{background:"#6366f112",color:"#818cf8",border:"1px solid #6366f11a"}}>
              Δ DELTA
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={copy}
            className="flex items-center gap-0.5 rounded px-1.5 py-1 font-mono text-[7px] font-bold transition-all"
            style={{
              background: copied ? "#22c55e1a" : "#f59e0b12",
              color:       copied ? "#22c55e"   : "#f59e0b",
              border:     `1px solid ${copied ? "#22c55e35" : "#f59e0b28"}`,
            }}
          >
            {copied ? <Check className="size-2"/> : <Copy className="size-2"/>}
            {copied ? "OK" : "COPY"}
          </button>
          {expanded
            ? <ChevronUp className="size-2.5 text-white/25"/>
            : <ChevronDown className="size-2.5 text-white/25"/>
          }
        </div>
      </div>

      {/* expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="border-t px-2.5 py-2 space-y-2"
              style={{ borderColor: "rgba(255,255,255,0.045)" }}>
              <p className="font-mono text-[8px] text-white/35 leading-relaxed">{script.description}</p>

              {/* phone preview */}
              <div>
                <div className="flex items-center gap-1 mb-1.5">
                  <Smartphone className="size-2.5 text-white/25"/>
                  <span className="font-mono text-[7px] text-white/25 uppercase tracking-wider">Phone Preview</span>
                </div>
                <PhonePreview ui={script.previewUI} color={script.previewColor}/>
              </div>

              {/* code */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[7px] text-white/25 uppercase tracking-wider">Script Code</span>
                  <button onClick={copy} className="flex items-center gap-0.5 font-mono text-[7px] transition-colors"
                    style={{ color: copied ? "#22c55e" : "#f59e0b" }}>
                    {copied ? <Check className="size-2"/> : <Copy className="size-2"/>}
                    {copied ? "Copied!" : "Copy to Delta"}
                  </button>
                </div>
                <pre
                  className="rounded p-2 font-mono text-[7px] text-green-400/60 overflow-x-auto leading-relaxed"
                  style={{background:"#060f06",border:"1px solid rgba(34,197,94,0.09)",maxHeight:80}}
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

// ─── Main ScriptsHub ──────────────────────────────────────────────────────────
export function ScriptsHub({ open, onClose }: ScriptsHubProps) {
  const [search,         setSearch        ] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [page,           setPage          ] = useState(0);
  const dragControls  = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);

  const PAGE_SIZE = 15;

  const filtered = useMemo(() => {
    let list = ALL_SCRIPTS;
    if (activeCategory !== "all") list = list.filter(s => s.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.game.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, activeCategory]);

  const paginated = useMemo(() => filtered.slice(0, (page+1)*PAGE_SIZE), [filtered, page]);
  const hasMore   = paginated.length < filtered.length;

  // reset page on filter
  const handleCat = (id: string) => { setActiveCategory(id); setPage(0); };
  const handleSearch = (v: string) => { setSearch(v); setPage(0); };

  return (
    <>
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[200]"/>

      <AnimatePresence>
        {open && (
          <motion.div
            drag
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={constraintsRef}
            dragElastic={0.04}
            initial={{ opacity: 0, scale: 0.90, y: 16 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.86, y: 8  }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="fixed z-[210] flex flex-col overflow-hidden rounded-xl shadow-2xl"
            style={{
              /* compact size – won't cover full phone screen */
              bottom: 80, right: 12,
              width: 300,
              height: 440,
              maxWidth:  "calc(100vw - 20px)",
              maxHeight: "calc(100vh - 100px)",
              background: "rgba(7,7,14,0.97)",
              border: "1px solid rgba(255,140,0,0.13)",
              backdropFilter: "blur(18px)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.03),0 24px 60px rgba(0,0,0,0.75)",
            }}
          >
            {/* ── Header / drag handle ── */}
            <div
              className="flex items-center justify-between px-3 py-2 shrink-0 cursor-grab active:cursor-grabbing select-none"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.045)" }}
              onPointerDown={e => dragControls.start(e)}
            >
              <div className="flex items-center gap-2">
                <Grip className="size-3 text-white/15"/>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold text-white/75 uppercase tracking-widest">
                      Scripts Hub
                    </span>
                    <span className="font-mono text-[7px] px-1.5 py-0.5 rounded font-bold"
                      style={{background:"#f59e0b12",color:"#f59e0b",border:"1px solid #f59e0b28"}}>
                      {TOTAL_COUNT.toLocaleString()}+
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Smartphone className="size-2 text-white/20"/>
                    <span className="font-mono text-[6px] text-white/20 uppercase tracking-wider">
                      Mobile & Delta
                    </span>
                    <Zap className="size-2 text-accent/35"/>
                  </div>
                </div>
              </div>
              <button onClick={onClose}
                className="text-white/20 hover:text-white/55 transition-colors rounded p-1 hover:bg-white/5">
                <X className="size-3.5"/>
              </button>
            </div>

            {/* ── Search ── */}
            <div className="px-2.5 pt-2 pb-1.5 shrink-0">
              <div className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
                style={{background:"rgba(255,255,255,0.035)",border:"1px solid rgba(255,255,255,0.06)"}}>
                <Search className="size-2.5 text-white/20 shrink-0"/>
                <input
                  value={search}
                  onChange={e => handleSearch(e.target.value)}
                  placeholder="Qidirish: fly, esp, blox..."
                  className="flex-1 bg-transparent font-mono text-[9px] text-white/65 placeholder:text-white/18 outline-none"
                  autoComplete="off" spellCheck={false}
                />
                {search && (
                  <button onClick={() => handleSearch("")} className="text-white/18 hover:text-white/45">
                    <X className="size-2.5"/>
                  </button>
                )}
              </div>
            </div>

            {/* ── Category pills (horizontal scroll) ── */}
            <div className="px-2.5 pb-1.5 flex gap-1 overflow-x-auto shrink-0"
              style={{ scrollbarWidth:"none" }}>
              {SCRIPT_CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => handleCat(cat.id)}
                  className="shrink-0 flex items-center gap-0.5 rounded-full px-2 py-0.5 font-mono text-[7px] font-bold transition-all whitespace-nowrap"
                  style={{
                    background: activeCategory===cat.id ? "rgba(255,140,0,0.12)" : "rgba(255,255,255,0.035)",
                    color:      activeCategory===cat.id ? "#f59e0b"               : "rgba(255,255,255,0.28)",
                    border:    `1px solid ${activeCategory===cat.id ? "rgba(255,140,0,0.32)" : "rgba(255,255,255,0.055)"}`,
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* ── Count line ── */}
            <div className="px-2.5 pb-1 shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="h-px flex-1" style={{background:"rgba(255,255,255,0.035)"}}/>
                <span className="font-mono text-[6.5px] text-white/18">
                  {filtered.length.toLocaleString()} script
                </span>
                <div className="h-px flex-1" style={{background:"rgba(255,255,255,0.035)"}}/>
              </div>
            </div>

            {/* ── List ── */}
            <div className="flex-1 overflow-y-auto px-2.5 pb-2 space-y-1.5">
              {paginated.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-24 gap-1.5">
                  <span className="text-xl">🔍</span>
                  <span className="font-mono text-[8px] text-white/20">Script topilmadi</span>
                </div>
              ) : (
                <>
                  {paginated.map(s => <ScriptCard key={s.id} script={s}/>)}
                  {hasMore && (
                    <button onClick={() => setPage(p => p+1)}
                      className="w-full py-1.5 rounded font-mono text-[8px] font-bold transition-all"
                      style={{background:"rgba(255,140,0,0.05)",color:"#f59e0b",border:"1px solid rgba(255,140,0,0.13)"}}>
                      Ko'proq ({(filtered.length - paginated.length).toLocaleString()} qoldi)
                    </button>
                  )}
                </>
              )}
            </div>

            {/* ── Footer ── */}
            <div className="px-3 py-1.5 shrink-0 flex items-center justify-between"
              style={{ borderTop: "1px solid rgba(255,255,255,0.035)" }}>
              <div className="flex items-center gap-1">
                <div className="size-1 rounded-full bg-green-500 animate-pulse"/>
                <span className="font-mono text-[6px] text-white/18 uppercase tracking-wider">
                  Delta v2.6.1
                </span>
              </div>
              <span className="font-mono text-[6px] text-white/12">📱 Mobile Ready</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
