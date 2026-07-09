import { useLang } from "@/lib/i18n";
import { LiquidButton } from "./LiquidButton";

export function UniverseInteractionLab() {
  const { t } = useLang();
  return (
    <section id="uni-lab" className="px-6 md:px-[8vw] py-[15vh] border-t border-[#111]/10">
      <div className="mb-24">
        <div className="text-[11px] uppercase tracking-[0.4em] text-[#111]/50 mb-6 font-mono">
          — experimental space
        </div>
        <h2
          className="italic text-[#111] leading-[0.85]"
          style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(48px, 8vw, 140px)" }}
        >
          {t("uni.lab.title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Liquid button */}
        <div className="border-t border-[#111]/10 pt-8 group">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#111]/30 font-mono mb-4 group-hover:text-[#111] transition-colors">
            01 / liquid_action
          </div>
          <div
            className="italic text-2xl text-[#111] mb-10"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            {t("uni.lab.liquid")}
          </div>
          <div className="h-48 flex items-center justify-center bg-[#F4F1EA] rounded-sm">
            <LiquidButton primary>explore</LiquidButton>
          </div>
        </div>

        {/* Text distortion */}
        <div className="border-t border-[#111]/10 pt-8 group">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#111]/30 font-mono mb-4 group-hover:text-[#111] transition-colors">
            02 / typography
          </div>
          <div
            className="italic text-2xl text-[#111] mb-10"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            {t("uni.lab.text")}
          </div>
          <div className="h-48 flex items-center justify-center bg-[#F4F1EA] rounded-sm overflow-hidden cursor-none">
            <span
              className="italic text-6xl text-[#111] transition-all duration-700 group-hover:tracking-[0.2em] group-hover:scale-110 group-hover:blur-[1px]"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              fluid
            </span>
          </div>
        </div>

        {/* Cursor gravity */}
        <div className="border-t border-[#111]/10 pt-8 group">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#111]/30 font-mono mb-4 group-hover:text-[#111] transition-colors">
            03 / interactive
          </div>
          <div
            className="italic text-2xl text-[#111] mb-10"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            {t("uni.lab.cursor")}
          </div>
          <div className="h-48 flex items-center justify-center bg-[#F4F1EA] rounded-sm relative overflow-hidden">
            <div className="absolute inset-8 rounded-full border border-[#C7D9C1]/40 animate-pulse" />
            <div className="h-6 w-6 rounded-full bg-[#DFFF00] shadow-[0_0_40px_#DFFF00] animate-uni-drift" />
          </div>
        </div>

        {/* Shape morph */}
        <div className="border-t border-[#111]/10 pt-8 group">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#111]/30 font-mono mb-4 group-hover:text-[#111] transition-colors">
            04 / organic_form
          </div>
          <div
            className="italic text-2xl text-[#111] mb-10"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            {t("uni.lab.shape")}
          </div>
          <div className="h-48 flex items-center justify-center bg-[#F4F1EA] rounded-sm">
            <div className="w-32 h-32 bg-[#111] animate-uni-morph shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
