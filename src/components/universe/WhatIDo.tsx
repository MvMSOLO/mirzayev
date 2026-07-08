import { useLang } from "@/lib/i18n";

export function UniverseWhatIDo() {
  const { t } = useLang();
  const items = [
    "wid.1", "wid.2", "wid.3", "wid.4", "wid.5", "wid.6", "wid.7", "wid.8", "wid.9",
  ] as const;

  return (
    <section id="uni-services" className="px-6 md:px-[8vw] py-[15vh] bg-[#111] text-[#F9F6F0]">
      <div className="mb-20">
        <div className="text-[11px] uppercase tracking-[0.4em] text-white/30 mb-6 font-mono">— {t("wid.tag")}</div>
        <h2 className="italic leading-[0.85]" style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(56px, 10vw, 160px)" }}>
          {t("wid.title_a")}<span className="text-[#C7D9C1]">{t("wid.title_i")}</span>{t("wid.title_b")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 md:gap-y-16">
        {items.map((k, i) => (
          <div key={k} className="group border-t border-white/10 pt-6 md:pt-8 transition-colors hover:border-[#C7D9C1]">
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <span className="font-mono text-[10px] text-white/30 group-hover:text-[#C7D9C1]">0{i + 1}</span>
              <div className="size-1 rounded-full bg-[#C7D9C1] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="italic text-2xl md:text-4xl leading-tight" style={{ fontFamily: '"Instrument Serif", serif' }}>
              {t(k)}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
