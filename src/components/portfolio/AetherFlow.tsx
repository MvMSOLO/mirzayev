import { useLang } from "@/lib/i18n";

export function AetherFlow() {
  const { t } = useLang();
  const rows = [
    { key: "aether.1" as const, dir: "left", size: "text-5xl md:text-8xl", opacity: "opacity-90" },
    {
      key: "aether.2" as const,
      dir: "right",
      size: "text-3xl md:text-6xl",
      opacity: "opacity-40 text-accent",
    },
    { key: "aether.3" as const, dir: "left", size: "text-4xl md:text-7xl", opacity: "opacity-70" },
  ];
  return (
    <section
      aria-label="Aether flow"
      className="py-16 border-y border-border overflow-hidden space-y-4 bg-[#0a090c]"
    >
      {rows.map((r, i) => (
        <div key={i} className="whitespace-nowrap flex">
          <div
            className={`flex shrink-0 ${r.dir === "left" ? "animate-marquee" : "animate-marquee-reverse"}`}
          >
            {[0, 1, 2].map((k) => (
              <span
                key={k}
                className={`font-display uppercase tracking-tighter pr-10 ${r.size} ${r.opacity}`}
              >
                {t(r.key)} <span className="text-accent">✦</span>{" "}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
