import portrait from "@/assets/portrait.jpg";
import { useLang } from "@/lib/i18n";
import { Blob } from "./Blob";

export function UniverseAbout() {
  const { t } = useLang();
  return (
    <section id="uni-about" className="px-6 md:px-[8vw] py-[15vh]">
      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24 items-center">
        <div className="relative">
          <div className="relative w-full aspect-[3/4] max-w-[400px] mx-auto lg:mx-0">
             <Blob
                variant="c"
                src={portrait}
                alt="Avazbek Mirzayev"
                className="w-full h-full animate-uni-drift-slow grayscale hover:grayscale-0 transition-all duration-1000"
             />
          </div>
          <div className="absolute -bottom-8 -right-4 bg-[#DFFF00] p-4 md:p-6 rotate-3 shadow-xl">
             <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#111]">
                {t("about.badge")}
             </span>
          </div>
        </div>

        <div className="space-y-6 md:space-y-8">
          <div className="text-[11px] uppercase tracking-[0.4em] text-[#111]/50 font-mono">— {t("about.tag")}</div>
          <h2 className="italic text-[#111] leading-[1.1]" style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(32px, 5vw, 64px)" }}>
            {t("about.p1_pre")}<span className="text-[#C7D9C1]">Avazbek Mirzayev</span>{t("about.p1_post")}
          </h2>
          <p className="text-lg md:text-xl text-[#111]/70 leading-relaxed" style={{ fontFamily: '"Instrument Serif", serif' }}>
            {t("about.p2")}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-[#111]/10">
            {[
              { k: t("about.age.k"), v: "16" },
              { k: t("about.projects.k"), v: "50+" },
              { k: t("about.years.k"), v: "05" },
              { k: t("about.location.k"), v: "UZ" },
            ].map((s) => (
              <div key={s.k}>
                <p className="italic text-4xl md:text-5xl text-[#111]" style={{ fontFamily: '"Instrument Serif", serif' }}>{s.v}</p>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#111]/40 font-mono mt-2">{s.k}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
