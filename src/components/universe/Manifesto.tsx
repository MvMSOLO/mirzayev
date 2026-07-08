import { useLang } from "@/lib/i18n";

export function UniverseManifesto() {
  const { t } = useLang();
  return (
    <section className="px-6 md:px-[12vw] py-[20vh] relative overflow-hidden bg-[#111]">
      <div className="relative z-10">
        <div className="text-[11px] uppercase tracking-[0.4em] text-white/30 mb-10 font-mono">— manifesto</div>
        <p
          className="italic text-[#F9F6F0] leading-[1.1] max-w-[18ch] md:max-w-[25ch]"
          style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(36px, 6vw, 90px)" }}
        >
          {t("uni.manifesto")}
        </p>
        <div className="mt-20 h-[1px] w-48 bg-[#C7D9C1]/30" />
      </div>

      {/* Decorative text */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 opacity-[0.03] pointer-events-none select-none hidden lg:block">
         <span className="italic text-[40vw] text-white leading-none" style={{ fontFamily: '"Instrument Serif", serif' }}>
            Alchemist
         </span>
      </div>
    </section>
  );
}
