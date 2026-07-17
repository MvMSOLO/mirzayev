import { useLang } from "@/lib/i18n";
import { memo } from "react";

const tokens = [
  "Next.js",
  "TypeScript",
  "React 19",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "REST API",
  "PostgreSQL",
  "Three.js",
  "Framer Motion",
  "Figma",
  "AI Integration",
  "Prompt Engineering",
  "UI/UX",
  "Automation",
  "Git",
];

export const SkillsMarquee = memo(function SkillsMarquee() {
  useLang();
  return (
    <section
      aria-label="Tech stack"
      className="bg-accent py-10 overflow-hidden relative z-10"
      style={{
        borderTop: "2px solid rgba(255,255,255,0.25)",
        borderBottom: "2px solid rgba(0,0,0,0.7)",
        boxShadow: "0 0 60px rgba(255,69,0,0.4), 0 4px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)",
      }}
    >
      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-accent to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-accent to-transparent z-10 pointer-events-none" />

      {/* Noise/texture overlay */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.2)_0px,rgba(0,0,0,0.2)_1px,transparent_1px,transparent_4px)] mix-blend-overlay" />

      {/* Lighting effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

      <div className="whitespace-nowrap flex relative z-10">
        <div className="flex animate-marquee-fast shrink-0">
          {[0, 1].map((k) => (
            <span
              key={k}
              className="font-display text-4xl md:text-5xl text-[#0a090c] uppercase pr-12 flex items-center gap-12 shrink-0 font-bold tracking-tight drop-shadow-[0_2px_0_rgba(255,255,255,0.4)]"
            >
              {tokens.map((t) => (
                <span key={t + k} className="flex items-center gap-10">
                  {t}
                  <span className="text-white/40 text-2xl drop-shadow-none">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
});