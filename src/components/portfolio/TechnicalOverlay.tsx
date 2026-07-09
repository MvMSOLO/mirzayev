import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function TechnicalOverlay() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [dynamicData, setDynamicData] = useState<{
    year: number;
    streamId: string;
    hexBlocks: string[];
  }>({
    year: 2024,
    streamId: "00000000",
    hexBlocks: Array(6).fill("0000"),
  });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    // Initialize dynamic data on client side to avoid hydration mismatch
    setDynamicData({
      year: new Date().getFullYear(),
      streamId: Math.random().toString(16).slice(2, 10).toUpperCase(),
      hexBlocks: Array.from({ length: 6 }).map(() =>
        Math.random().toString(16).slice(2, 6).toUpperCase(),
      ),
    });

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 hidden lg:block overflow-hidden">
      {/* Corner Brackets */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-accent/30" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-accent/30" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-accent/30" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-accent/30" />

      {/* Coordinate Readout */}
      <div className="absolute bottom-12 left-12 font-mono text-[10px] text-accent/40 flex flex-col gap-1">
        <div className="flex gap-2">
          <span className="opacity-60">LOC:</span>
          <span>
            {coords.x.toString().padStart(4, "0")} / {coords.y.toString().padStart(4, "0")}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="opacity-60">SYS:</span>
          <span className="animate-pulse">ACTIVE.KINETIC_LAB.v4</span>
        </div>
      </div>

      {/* Side Metadata */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 vertical-text font-mono text-[8px] tracking-[0.2em] text-white/20 uppercase whitespace-nowrap">
        Neural Interface // Processed: {dynamicData.year} // Core.01
      </div>

      <div className="absolute top-1/2 right-8 -translate-y-1/2 vertical-text font-mono text-[8px] tracking-[0.2em] text-white/20 uppercase whitespace-nowrap rotate-180">
        Experimental Lab // Data Stream: 0x{dynamicData.streamId}
      </div>

      {/* Vertical Scanning Line */}
      <motion.div
        animate={{ x: ["0vw", "100vw"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-accent/20 to-transparent shadow-[0_0_15px_rgba(255,69,0,0.1)]"
      />

      {/* Horizontal Scanning Line */}
      <motion.div
        animate={{ y: ["0vh", "100vh"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/10 to-transparent"
      />

      {/* Margin Content - Random Hex Blocks */}
      <div className="absolute top-1/4 right-12 flex flex-col gap-1 opacity-20">
        {dynamicData.hexBlocks.map((hex, i) => (
          <div key={i} className="font-mono text-[8px] text-white">
            0x{hex}
          </div>
        ))}
      </div>
    </div>
  );
}
