import { useLang } from "@/lib/i18n";

export function SkillsDetail() {
  const { t } = useLang();
  const groups = [
    { title: t("skills.g1"), items: ["HTML5", "CSS3", "JavaScript ES6+", "TypeScript", "React.js", "Next.js", "Tailwind CSS", "Responsive Design", "SPA / SSR"] },
    { title: t("skills.g2"), items: ["Python", "Node.js", "REST API", "Authentication", "Database Integration", "JSON", "API Development"] },
    { title: t("skills.g3"), items: ["Interface Design", "User Experience", "Wireframing", "Prototyping", "Design Systems", "Mobile-First", "Dashboard Design"] },
    { title: t("skills.g4"), items: ["AI Integrations", "Prompt Engineering", "AI-Assisted Dev", "Workflow Automation", "Git / GitHub", "VS Code", "Figma", "Chrome DevTools"] },
  ];
  return (
    <section id="skills" className="px-5 py-24 border-b border-border">
      <div className="mb-10 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">{t("skills.tag")}</span>
      </div>
      <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-12 leading-[0.9]">
        {t("skills.title_a")} <br /><span className="text-accent">{t("skills.title_b")}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {groups.map((g, i) => (
          <div key={g.title} className="border border-border p-5 hover:border-accent transition-colors">
            <div className="flex justify-between items-baseline mb-6">
              <h3 className="font-display text-xl uppercase tracking-tight">{g.title}</h3>
              <span className="text-[10px] text-accent font-bold">0{i + 1}</span>
            </div>
            <ul className="space-y-2">
              {g.items.map((it) => (
                <li key={it} className="text-xs text-white/70 flex items-center gap-2">
                  <span className="size-1 bg-accent" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
