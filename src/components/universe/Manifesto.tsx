import { useLang } from "@/lib/i18n";

export function UniverseManifesto() {
  const { t } = useLang();
  return (
    <section className="px-6 md:px-[12vw] py-[20vh]">
      <div className="text-[11px] uppercase tracking-[0.4em] text-[#111]/50 mb-8 font-mono">— manifesto</div>
      <p
        className="italic text-[#111] leading-[1.15]"
        style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(28px, 4.6vw, 68px)" }}
      >
        {t("uni.manifesto")}
      </p>
      <div className="mt-14 h-[1px] w-24 bg-[#C7D9C1]" />
    </section>
  );
}
