import { useLang } from "@/lib/i18n";

export function WhatIDo() {
  const { t } = useLang();
  const items = [
    "wid.1","wid.2","wid.3","wid.4","wid.5","wid.6","wid.7","wid.8","wid.9",
  ] as const;
  return (
    <section id="services" className="px-5 md:px-20 lg:px-32 py-24 border-b border-border relative overflow-hidden">
      <div className="mb-10 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">{t("wid.tag")}</span>
      </div>
      <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-12 leading-[0.9]">
        {t("wid.title_a")}<span className="text-accent">{t("wid.title_i")}</span>{t("wid.title_b")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
        {items.map((k, i) => (
          <div key={k} className="group bg-background p-6 flex items-baseline justify-between hover:bg-accent hover:text-background transition-colors cursor-default">
            <span className="font-display text-2xl md:text-3xl uppercase tracking-tight">{t(k)}</span>
            <span className="font-mono text-[10px] opacity-40 group-hover:opacity-100">0{i + 1}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
