import { useLang } from "@/lib/i18n";

export function UniversePhilosophy() {
  const { t } = useLang();
  const items = [1, 2, 3, 4, 5];

  return (
    <section className="px-6 md:px-[8vw] py-[15vh] bg-[#F9F6F0] overflow-hidden">
      <div className="mb-20">
        <div className="text-[11px] uppercase tracking-[0.4em] text-[#111]/50 mb-6 font-mono">— {t("phi.tag")}</div>
        <h2 className="italic text-[#111] leading-[0.85]" style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(56px, 10vw, 160px)" }}>
          {t("phi.title_a")} <br /> {t("phi.title_b")}
        </h2>
      </div>

      <div className="space-y-32">
        {items.map((i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-[0.5fr_1fr] gap-8 md:gap-24 items-start group">
            <div className="font-mono text-[10px] text-[#111]/30 pt-4 border-t border-[#111]/10 group-hover:text-[#111] transition-colors">
              STEP_0{i}
            </div>
            <div className="border-t border-[#111]/10 pt-4">
              <h3 className="italic text-4xl md:text-6xl text-[#111] mb-6" style={{ fontFamily: '"Instrument Serif", serif' }}>
                {t(`phi.${i}.t` as never)}
              </h3>
              <p className="text-lg md:text-xl text-[#111]/70 max-w-[45ch] leading-relaxed" style={{ fontFamily: '"Instrument Serif", serif' }}>
                {t(`phi.${i}.d` as never)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
