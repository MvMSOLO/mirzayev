import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function TechnicalOverlay() {
  // Coords updated directly via DOM ref — zero re-renders on mousemove
  const coordXRef = useRef<HTMLSpanElement>(null);
  const coordYRef = useRef<HTMLSpanElement>(null);

  const [dynamicData] = useState(() => ({
    year: new Date().getFullYear(),
    streamId: Math.random().toString(16).slice(2, 10).toUpperCase(),
    hexBlocks: Array.from({ length: 6 }, () =>
      Math.random().toString(16).slice(2, 6).toUpperCase()
    ),
  }));

  // Ticking metrics — slowed to 1.5s cadence (was 800ms), display via refs
  const cpuRef = useRef<HTMLSpanElement>(null);
  const ramRef = useRef<HTMLSpanElement>(null);
  const orbRef = useRef<HTMLSpanElement>(null);
  const cpuVal = useRef(5.42);
  const ramVal = useRef(11.45);
  const orbVal = useRef(140.23);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (coordXRef.current) coordXRef.current.textContent = e.clientX.toString().padStart(4, "0");
      if (coordYRef.current) coordYRef.current.textContent = e.clientY.toString().padStart(4, "0");
    };
    window.addEventListener("mousemove", handleMove, { passive: true });

    const interval = setInterval(() => {
      cpuVal.current = +(cpuVal.current + (Math.random() * 0.1 - 0.05)).toFixed(2);
      ramVal.current = +Math.max(10.0, Math.min(14.8, ramVal.current + (Math.random() * 0.04 - 0.02))).toFixed(2);
      orbVal.current = +(orbVal.current + 0.02).toFixed(2);
      if (cpuRef.current) cpuRef.current.textContent = `${cpuVal.current.toFixed(2)} GHz`;
      if (ramRef.current) ramRef.current.textContent = `${ramVal.current.toFixed(2)} / 16.0 GB`;
      if (orbRef.current) orbRef.current.textContent = `${orbVal.current.toFixed(2)}° N`;
    }, 1500);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 hidden lg:block overflow-hidden">
      {/* Corner Brackets */}
      <motion.div
        initial={{ opacity: 0, scale: 1.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute top-8 left-8 w-12 h-12 border-t border-l border-accent/30"
      />
      <motion.div
        initial={{ opacity: 0, scale: 1.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute top-8 right-8 w-12 h-12 border-t border-r border-accent/30"
      />
      <motion.div
        initial={{ opacity: 0, scale: 1.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-accent/30"
      />
      <motion.div
        initial={{ opacity: 0, scale: 1.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-accent/30"
      />

      {/* Coordinate Readout — spans updated directly, no re-renders */}
      <div className="absolute bottom-12 left-12 font-mono text-[10px] text-accent/40 flex flex-col gap-1">
        <div className="flex gap-2">
          <span className="opacity-60">LOC:</span>
          <span>
            <span ref={coordXRef}>0000</span>
            {" / "}
            <span ref={coordYRef}>0000</span>
          </span>
        </div>
        <div className="flex gap-2">
          <span className="opacity-60">SYS:</span>
          <span className="animate-pulse">ACTIVE.KINETIC_LAB.v6</span>
        </div>
        <div className="flex gap-2 text-white/20">
          <span className="opacity-60">VER:</span>
          <span>6.0.0-RELEASE</span>
        </div>
      </div>

      {/* Real-time Status Terminal — spans updated via refs, no re-renders */}
      <div className="absolute top-12 right-24 font-mono text-[9px] text-[#00ff22]/60 flex flex-col gap-1.5 p-3.5 bg-black/40 border border-[#00ff22]/10 rounded shadow-md pointer-events-none select-none max-w-[200px]">
        <div className="flex items-center gap-2 border-b border-[#00ff22]/15 pb-1">
          <span className="size-1.5 bg-[#00ff22] rounded-full animate-ping" />
          <span className="font-bold tracking-widest text-[#00ff22] uppercase">SYS_MON_ACTIVE</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-50">CPU_CLK:</span>
          <span ref={cpuRef}>5.42 GHz</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-50">RAM_BUF:</span>
          <span ref={ramRef}>11.45 / 16.0 GB</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-50">OLM_ORB:</span>
          <span ref={orbRef}>140.23° N</span>
        </div>
        <div className="flex justify-between border-t border-[#00ff22]/15 pt-1 text-[8px] text-white/30">
          <span>LATENCY: 12ms</span>
          <span>UP: 99.98%</span>
        </div>
      </div>

      {/* Side Metadata */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 vertical-text font-mono text-[8px] tracking-[0.2em] text-white/20 uppercase whitespace-nowrap">
        Neural Interface // Processed: {dynamicData.year} // Core.01
      </div>
      <div className="absolute top-1/2 right-8 -translate-y-1/2 vertical-text font-mono text-[8px] tracking-[0.2em] text-white/20 uppercase whitespace-nowrap rotate-180">
        Experimental Lab // Data Stream: 0x{dynamicData.streamId}
      </div>

      {/* Scanning lines */}
      <motion.div
        animate={{ x: ["0vw", "100vw"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-accent/15 to-transparent shadow-[0_0_15px_rgba(255,69,0,0.08)]"
      />
      <motion.div
        animate={{ y: ["0vh", "100vh"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 3 }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/8 to-transparent"
      />

      {/* Margin Hex Blocks */}
      <div className="absolute top-1/4 right-12 flex flex-col gap-1 opacity-15">
        {dynamicData.hexBlocks.map((hex, i) => (
          <div key={i} className="font-mono text-[8px] text-white">
            0x{hex}
          </div>
        ))}
      </div>
    </div>
  );
}
