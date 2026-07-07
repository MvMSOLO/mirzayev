import { useLang } from "@/lib/i18n";
import { ParticleField } from "./ParticleField";

export function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="relative pt-32 pb-24 overflow-hidden border-b border-border min-h-[92vh] flex flex-col justify-center">
      <ParticleField className="opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background pointer-events-none" />

      <div className="absolute -top-6 left-0 whitespace-nowrap flex pointer-events-none select-none">
        <div className="flex animate-marquee shrink-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="font-display text-[110px] md:text-[180px] leading-none uppercase pr-10 opacity-[0.07]">
              {t("hero.marquee")}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-8 left-0 whitespace-nowrap flex pointer-events-none select-none">
        <div className="flex animate-marquee-reverse shrink-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="font-display text-[80px] md:text-[140px] leading-none uppercase pr-10 opacity-[0.05] text-accent">
              KINETIC LAB · KINETIC LAB · KINETIC LAB ·
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 relative z-10 stagger-reveal">
        <div className="inline-block bg-accent px-2 py-1 mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest">{t("hero.chip")}</span>
        </div>
        <h1 className="font-display text-7xl md:text-9xl uppercase leading-[0.85] tracking-tighter mb-8">
          {t("hero.first")} <br /> <span className="text-accent">{t("hero.last")}</span>
        </h1>
        <p className="max-w-[36ch] text-sm md:text-base text-white/70 leading-relaxed mb-10">
          {t("hero.sub")}
        </p>
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-white/40">
          <span>{t("hero.scroll")}</span>
          <div className="h-[1px] w-12 bg-white/20" />
          <span>{t("hero.est")}</span>
        </div>
      </div>
    </section>
  );
}
