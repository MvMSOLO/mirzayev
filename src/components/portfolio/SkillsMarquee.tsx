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
      className="bg-accent py-4 overflow-hidden border-y-4 border-background"
    >
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
