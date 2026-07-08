import etherea from "@/assets/universe/etherea.jpg";
import { useLang } from "@/lib/i18n";
import { LiquidButton } from "./LiquidButton";
import { Blob } from "./Blob";

export function UniverseHero() {
  const { t } = useLang();
  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-24">
      {/* Center blob image */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[92vw] max-w-[880px] aspect-square">
          <Blob variant="a" src={etherea} alt="avazbek mirzayev creative universe" className="w-full h-full animate-uni-drift" />
        </div>
      </div>

      {/* Asymmetric typography */}
      <h1
        className="absolute font-serif italic leading-[0.85] text-[#111] pointer-events-none select-none"
        style={{
          fontFamily: '"Instrument Serif", "Cormorant Garamond", serif',
          fontSize: "clamp(80px, 18vw, 280px)",
          top: "18vh",
          left: "4vw",
          fontWeight: 400,
        }}
      >
        avazbek
      </h1>
      <span
        className="absolute font-serif italic leading-[0.85] text-[#111] pointer-events-none select-none"
        style={{
          fontFamily: '"Instrument Serif", "Cormorant Garamond", serif',
          fontSize: "clamp(70px, 15vw, 240px)",
          bottom: "18vh",
          right: "4vw",
          fontWeight: 400,
        }}
      >
        mirzayev
      </span>

      {/* Manifesto snippet */}
      <div className="absolute top-[55vh] md:top-[40vh] left-6 md:left-[8vw] max-w-[38ch] z-10">
        <p className="text-sm md:text-base text-[#111] leading-relaxed" style={{ fontFamily: '"Instrument Serif", serif' }}>
          {t("uni.hero.desc")}
        </p>
        <div className="mt-6">
          <LiquidButton href="#uni-works">{t("uni.hero.cta")}</LiquidButton>
        </div>
      </div>
    </section>
  );
}
