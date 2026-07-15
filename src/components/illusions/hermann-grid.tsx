import { cn } from "@/lib/utils";

/**
 * Hermann Grid illusion — a lattice of black squares on a white ground.
 * Ghostly grey blobs seem to flicker at the white intersections, visible
 * only in peripheral vision (they vanish wherever you directly fixate).
 */
export function HermannGridIllusion({ className }: { className?: string }) {
  const cols = 7;
  const rows = 7;
  const cells = Array.from({ length: cols * rows });

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-white flex items-center justify-center",
        className,
      )}
    >
      <div
        className="grid aspect-square w-[86%] max-w-[520px]"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: "18%",
        }}
      >
        {cells.map((_, i) => (
          <div key={i} className="hg-cell-xk9 bg-black" />
        ))}
      </div>
      <div className="hg-dot-xk9 absolute h-3 w-3 rounded-full bg-red-600" />
      <style>{`
        .hg-cell-xk9 { width: 100%; height: 100%; }
        .hg-dot-xk9 { box-shadow: 0 0 6px rgba(220,38,38,0.7); }
      `}</style>
    </div>
  );
}
