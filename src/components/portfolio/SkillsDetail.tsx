import { useLang } from "@/lib/i18n";
import { RevealBox, ClipReveal, WordReveal } from "./TextReveal";

export function SkillsDetail() {
  const { t } = useLang();
  const groups = [
    {
      title: t("skills.g1"),
      items: [
        "HTML5",
        "CSS3",
        "JavaScript ES6+",
        "TypeScript",
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "Responsive Design",
        "SPA / SSR",
      ],
    },
    {
      title: t("skills.g2"),
      items: [
        "Python",
        "Node.js",
        "REST API",
        "Authentication",
        "Database Integration",
        "JSON",
        "API Development",
      ],
    },
    {
      title: t("skills.g3"),
      items: [
        "Interface Design",
        "User Experience",
        "Wireframing",
        "Prototyping",
        "Design Systems",
        "Mobile-First",
        "Dashboard Design",
      ],
    },
    {
      title: t("skills.g4"),
      items: [
        "AI Integrations",
        "Prompt Engineering",
        "AI-Assisted Dev",
        "Workflow Automation",
        "Git / GitHub",
        "VS Code",
        "Figma",
        "Chrome DevTools",
      ],
    },
  ];
  return (
    <section id="skills" className="px-5 md:px-20 lg:px-32 py-24 border-b border-border relative">
      <div className="absolute top-1/2 left-0 w-24 h-[1px] bg-accent/20 -translate-y-1/2 hidden lg:block" />
      <div className="absolute top-1/2 right-0 w-24 h-[1px] bg-accent/20 -translate-y-1/2 hidden lg:block" />
      <RevealBox className="mb-10 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">{t("skills.tag")}</span>
      </RevealBox>
      <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-12 leading-[0.9]">
        <WordReveal text={t("skills.title_a")} sound /> <br />
        <span className="text-accent">
          <WordReveal text={t("skills.title_b")} delay={0.2} />
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {groups.map((g, i) => (
          <ClipReveal key={g.title} delay={i * 0.1}>
            <div className="border border-border p-5 hover:border-accent transition-colors group relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-8 h-8 bg-accent/10 rounded-bl-full translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
              <div className="flex justify-between items-baseline mb-6 relative z-10">
                <h3 className="font-display text-xl uppercase tracking-tight">{g.title}</h3>
                <span className="text-[10px] text-accent font-bold">0{i + 1}</span>
              </div>
              <ul className="space-y-2 relative z-10">
                {g.items.map((it, j) => (
                  <li key={it} className="text-xs text-white/70 flex items-center gap-2 group/item">
                    <span className="size-1 bg-accent/30 group-hover/item:bg-accent transition-colors" />
                    <span className="group-hover/item:translate-x-1 group-hover/item:text-white transition-all">
                      {it}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ClipReveal>
        ))}
      </div>
    </section>
  );
}
