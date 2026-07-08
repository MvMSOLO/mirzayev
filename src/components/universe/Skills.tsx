import { useLang } from "@/lib/i18n";

const stack = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Three.js"],
  backend: ["Node.js", "Python", "PostgreSQL", "Prisma", "AI Integration"],
  design: ["Figma", "UI/UX", "Branding", "Motion Design"],
  tools: ["Git", "Docker", "Vercel", "OpenAI API", "Cursor"],
};

export function UniverseSkills() {
  const { t } = useLang();
  return (
    <section id="uni-skills" className="px-6 md:px-[8vw] py-[15vh]">
      <div className="mb-20">
        <div className="text-[11px] uppercase tracking-[0.4em] text-[#111]/50 mb-6 font-mono">— {t("skills.tag")}</div>
        <h2 className="italic text-[#111] leading-[0.85]" style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(56px, 10vw, 160px)" }}>
          {t("skills.title_a")} <br /> {t("skills.title_b")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
        {Object.entries(stack).map(([category, items], idx) => (
          <div key={category} className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] text-[#111]/30">0{idx + 1}</span>
              <h3 className="uppercase text-[11px] tracking-[0.3em] text-[#111]/60 font-mono">
                {t(`skills.g${idx + 1}` as never)}
              </h3>
            </div>
            <ul className="space-y-2 md:space-y-4">
              {items.map((item) => (
                <li key={item} className="italic text-3xl md:text-5xl text-[#111] hover:translate-x-2 transition-transform duration-500 cursor-default" style={{ fontFamily: '"Instrument Serif", serif' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
