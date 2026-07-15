import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";
import { memo } from "react";

export const AetherFlow = memo(function AetherFlow() {
  const { t } = useLang();
  const rows = [
    {
      key: "aether.1" as const,
      dir: "left",
      size: "text-5xl md:text-8xl",
      opacity: "opacity-[0.88]",
      speed: "animate-marquee",
      color: "text-white",
    },
    {
      key: "aether.2" as const,
      dir: "right",
      size: "text-3xl md:text-5xl",
      opacity: "opacity-[0.55]",
      speed: "animate-marquee-reverse",
      color: "text-accent",
    },
    {
      key: "aether.3" as const,
      dir: "left",
      size: "text-4xl md:text-7xl",
      opacity: "opacity-[0.72]",
      speed: "animate-marquee-slow",
      color: "text-white",
    },
  ];

  return (
    <section
      aria-label="Aether flow"
      className="py-24 border-y border-white/[0.06] overflow-hidden space-y-6 bg-[#070609] relative"
    >
      {/* Gradient fades */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#070609] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#070609] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#070609] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#070609] to-transparent z-10 pointer-events-none" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-blueprint opacity-[0.015] pointer-events-none" />

      {/* Scanning beam */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 bottom-0 w-48 bg-gradient-to-r from-transparent via-accent/[0.04] to-transparent pointer-events-none z-20"
      />

      {rows.map((r, i) => (
        <div key={i} className="whitespace-nowrap flex">
          <div className={`flex shrink-0 ${r.speed}`}>
            {[0, 1, 2, 3].map((k) => (
              <span
                key={k}
                className={`font-display uppercase tracking-tighter pr-12 ${r.size} ${r.opacity} ${r.color}`}
              >
                {t(r.key)}{" "}
                <motion.span
                  className="text-accent inline-block"
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: i * 0.7 }}
                >
                  ✦
                </motion.span>{" "}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
});
