import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function AfterimageFlashIllusion({ className }: { className?: string }) {
  const [blank, setBlank] = useState(false);

  useEffect(() => {
    // 7s stare phase, then 4s blank, repeat
    let id: ReturnType<typeof setTimeout>;
    function schedule(isBlank: boolean) {
      id = setTimeout(
        () => {
          setBlank(isBlank);
          schedule(!isBlank);
        },
        isBlank ? 4000 : 7000,
      );
    }
    schedule(false);
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-[#888888] flex items-center justify-center",
        className,
      )}
    >
      {/* Inverted-colour silhouette: cyan face on grey → afterimage shows red */}
      <svg
        viewBox="0 0 200 200"
        width="min(80%, 320px)"
        height="min(80%, 320px)"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transition: "opacity 0.15s ease",
          opacity: blank ? 0 : 1,
          position: "absolute",
        }}
        aria-hidden="true"
      >
        {/* Head: cyan (complement of red) */}
        <circle cx="100" cy="100" r="72" fill="#00ffff" />
        {/* Eyes: yellow (complement of violet/blue) */}
        <ellipse cx="78" cy="86" rx="12" ry="14" fill="#ffff00" />
        <ellipse cx="122" cy="86" rx="12" ry="14" fill="#ffff00" />
        {/* Pupils: black */}
        <circle cx="78" cy="88" r="6" fill="#000000" />
        <circle cx="122" cy="88" r="6" fill="#000000" />
        {/* Nose: dark cyan shadow */}
        <ellipse cx="100" cy="110" rx="7" ry="9" fill="#009999" />
        {/* Smile: dark */}
        <path
          d="M 72 130 Q 100 152 128 130"
          stroke="#005555"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Blank frame with fixation dot */}
      <div
        style={{
          transition: "opacity 0.15s ease",
          opacity: blank ? 1 : 0,
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#ff4500",
            boxShadow: "0 0 8px rgba(255,69,0,0.8)",
          }}
        />
      </div>
    </div>
  );
}
