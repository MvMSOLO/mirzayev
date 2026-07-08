import { useLang } from "@/lib/i18n";
import { LiquidButton } from "./LiquidButton";

export function UniverseInteractionLab() {
  const { t } = useLang();
  return (
    <section className="px-6 md:px-[8vw] py-[15vh] border-t border-[#111]/10">
      <div className="mb-16">
        <div className="text-[11px] uppercase tracking-[0.4em] text-[#111]/50 mb-4 font-mono">— interaction lab</div>
        <h2 className="italic text-[#111]" style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(48px, 7vw, 120px)", lineHeight: 0.9 }}>
          {t("uni.lab.title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Liquid button */}
        <div className="border-t border-[#111]/20 pt-6">
          <div className="text-[10px] uppercase tracking-widest text-[#111]/50 font-mono mb-1">01</div>
          <div className="italic text-xl text-[#111] mb-6" style={{ fontFamily: '"Instrument Serif", serif' }}>
            {t("uni.lab.liquid")}
          </div>
          <div className="h-40 flex items-center justify-center">
            <LiquidButton primary>enter universe</LiquidButton>
          </div>
        </div>

        {/* Text distortion */}
        <div className="border-t border-[#111]/20 pt-6">
          <div className="text-[10px] uppercase tracking-widest text-[#111]/50 font-mono mb-1">02</div>
          <div className="italic text-xl text-[#111] mb-6" style={{ fontFamily: '"Instrument Serif", serif' }}>
            {t("uni.lab.text")}
          </div>
          <div className="h-40 flex items-center justify-center overflow-hidden group cursor-pointer">
            <span className="italic text-5xl text-[#111] transition-all duration-500 group-hover:tracking-[0.4em] group-hover:blur-[1px]" style={{ fontFamily: '"Instrument Serif", serif' }}>
              creative
            </span>
          </div>
        </div>

        {/* Cursor gravity */}
        <div className="border-t border-[#111]/20 pt-6">
          <div className="text-[10px] uppercase tracking-widest text-[#111]/50 font-mono mb-1">03</div>
          <div className="italic text-xl text-[#111] mb-6" style={{ fontFamily: '"Instrument Serif", serif' }}>
            {t("uni.lab.cursor")}
          </div>
          <div className="h-40 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border border-[#C7D9C1]" />
            <div className="h-4 w-4 rounded-full bg-[#DFFF00] shadow-[0_0_30px_#DFFF00]" />
          </div>
        </div>

        {/* Shape morph */}
        <div className="border-t border-[#111]/20 pt-6">
          <div className="text-[10px] uppercase tracking-widest text-[#111]/50 font-mono mb-1">04</div>
          <div className="italic text-xl text-[#111] mb-6" style={{ fontFamily: '"Instrument Serif", serif' }}>
            {t("uni.lab.shape")}
          </div>
          <div className="h-40 flex items-center justify-center">
            <div className="w-32 h-32 bg-[#111] animate-uni-morph" />
          </div>
        </div>
      </div>
    </section>
  );
}
