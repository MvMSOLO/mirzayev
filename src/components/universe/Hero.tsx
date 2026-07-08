import etherea from "@/assets/universe/etherea.jpg";
import { useLang } from "@/lib/i18n";
import { LiquidButton } from "./LiquidButton";
import { Blob } from "./Blob";

export function UniverseHero() {
  const { t } = useLang();
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden pt-24 md:pt-32">
      {/* Center blob image */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
        <div className="relative w-full max-w-[880px] aspect-square">
          <Blob variant="a" src={etherea} alt="avazbek mirzayev creative universe" className="w-full h-full animate-uni-drift" />
        </div>
      </div>

      {/* Asymmetric typography */}
      <div className="relative z-10 pointer-events-none select-none px-6 md:px-[4vw]">
        <h1
          className="font-serif italic leading-[0.85] text-[#111]"
          style={{
            fontFamily: '"Instrument Serif", "Cormorant Garamond", serif',
            fontSize: "clamp(60px, 18vw, 280px)",
            marginTop: "10vh",
            fontWeight: 400,
          }}
        >
          avazbek
        </h1>
        <div className="flex justify-end">
          <span
            className="font-serif italic leading-[0.85] text-[#111] -mt-[2vw] md:-mt-[4vw]"
            style={{
              fontFamily: '"Instrument Serif", "Cormorant Garamond", serif',
              fontSize: "clamp(50px, 15vw, 240px)",
              fontWeight: 400,
            }}
          >
            mirzayev
          </span>
        </div>
      </div>

      {/* Manifesto snippet */}
      <div className="absolute bottom-12 md:bottom-24 left-6 md:left-[8vw] max-w-[32ch] z-20">
        <p className="text-base md:text-xl text-[#111] leading-relaxed mb-8" style={{ fontFamily: '"Instrument Serif", serif' }}>
          {t("uni.hero.desc")}
        </p>
        <div>
          <LiquidButton href="#uni-works">{t("uni.hero.cta")}</LiquidButton>
        </div>
      </div>

      <div className="absolute bottom-12 right-6 md:right-[8vw] z-20 hidden md:block">
        <div className="text-[10px] uppercase tracking-[0.4em] text-[#111]/40 font-mono rotate-90 origin-right translate-y-full">
           scroll to explore
        </div>
      </div>
    </section>
  );
}
