import { cn } from "@/lib/utils";

export function ChromostereopsisIllusion({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-black flex items-center justify-center",
        className,
      )}
    >
      <svg
        viewBox="0 0 300 300"
        width="min(88%, 400px)"
        height="min(88%, 400px)"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ shapeRendering: "crispEdges" }}
      >
        {/* Outermost ring: blue (recedes) */}
        <circle cx="150" cy="150" r="130" fill="#0000ff" />
        {/* Second ring: red (advances) */}
        <circle cx="150" cy="150" r="104" fill="#ff0000" />
        {/* Third ring: blue */}
        <circle cx="150" cy="150" r="78" fill="#0000ee" />
        {/* Fourth ring: red */}
        <circle cx="150" cy="150" r="52" fill="#ff0000" />
        {/* Inner: blue */}
        <circle cx="150" cy="150" r="26" fill="#0000ff" />

        {/* Offset red rectangle overlapping blue — red appears to float forward */}
        <rect x="54" y="120" width="80" height="60" fill="#ff0000" />
        {/* Blue rect offset, sharing edge with red */}
        <rect x="120" y="110" width="80" height="60" fill="#0000ff" />
        {/* Another red rect crossing the blue one */}
        <rect x="162" y="128" width="70" height="44" fill="#ff0000" />
        {/* Small blue square crossing red */}
        <rect x="198" y="116" width="44" height="56" fill="#0000ee" />
      </svg>
    </div>
  );
}
