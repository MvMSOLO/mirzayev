import { useLang } from "@/lib/i18n";

const tokens = [
  "Next.js",
  "TypeScript",
  "React",
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

export function SkillsMarquee() {
  useLang();
  return (
    <section
      aria-label="Tech stack"
      className="bg-accent py-5 overflow-hidden border-y-4 border-background relative"
    >
      {/* Edge masks for premium fade effect */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-accent to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-accent to-transparent z-10 pointer-events-none" />
      <div className="whitespace-nowrap flex">
        <div className="flex animate-marquee-fast shrink-0">
          {[0, 1].map((k) => (
            <span
              key={k}
              className="font-display text-2xl md:text-4xl text-background uppercase pr-8 flex items-center gap-8 shrink-0"
            >
              {tokens.map((t) => (
                <span key={t + k} className="flex items-center gap-8">
                  {t}
                  <span className="text-background/40">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
