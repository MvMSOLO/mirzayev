import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";

export function AetherFlow() {
  const { t } = useLang();
  const rows = [
    { key: "aether.1" as const, dir: "left", size: "text-5xl md:text-8xl", opacity: "opacity-90", speed: "animate-marquee" },
    { key: "aether.2" as const, dir: "right", size: "text-3xl md:text-6xl", opacity: "opacity-40 text-accent", speed: "animate-marquee-reverse" },
    { key: "aether.3" as const, dir: "left", size: "text-4xl md:text-7xl", opacity: "opacity-70", speed: "animate-marquee-slow" },
  ];

  return (
    <section
      aria-label="Aether flow"
      className="py-20 border-y border-border overflow-hidden space-y-5 bg-[#070609] relative"
    >
      {/* Top and bottom gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#070609] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#070609] to-transparent z-10 pointer-events-none" />
      {/* Left/right edge masks */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#070609] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#070609] to-transparent z-10 pointer-events-none" />

      {/* Scanning line */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-accent/5 to-transparent pointer-events-none z-20"
      />

      {rows.map((r, i) => (
        <div key={i} className="whitespace-nowrap flex">
          <div className={`flex shrink-0 ${r.speed}`}>
            {[0, 1, 2, 3].map((k) => (
              <span
                key={k}
                className={`font-display uppercase tracking-tighter pr-10 ${r.size} ${r.opacity}`}
              >
                {t(r.key)}{" "}
                <motion.span
                  className="text-accent inline-block"
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
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
}
