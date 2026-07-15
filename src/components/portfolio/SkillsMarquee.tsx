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
      className="bg-accent py-4 overflow-hidden relative"
      style={{ borderTop: "1px solid rgba(255,255,255,0.12)", borderBottom: "1px solid rgba(0,0,0,0.4)" }}
    >
      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-accent to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-accent to-transparent z-10 pointer-events-none" />

      {/* Noise/texture overlay */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15)_0px,rgba(0,0,0,0.15)_1px,transparent_1px,transparent_3px)]" />

      <div className="whitespace-nowrap flex">
        <div className="flex animate-marquee-fast shrink-0">
          {[0, 1].map((k) => (
            <span
              key={k}
              className="font-display text-xl md:text-3xl text-background uppercase pr-8 flex items-center gap-8 shrink-0 font-bold tracking-tight"
            >
              {tokens.map((t) => (
                <span key={t + k} className="flex items-center gap-7">
                  {t}
                  <span className="text-background/30 text-sm">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
});
