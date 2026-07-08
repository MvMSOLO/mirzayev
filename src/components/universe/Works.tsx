import neural from "@/assets/work-neural.jpg";
import dashboard from "@/assets/work-dashboard.jpg";
import vortex from "@/assets/work-vortex.jpg";
import youtube from "@/assets/work-youtube.jpg";
import etherea from "@/assets/universe/etherea.jpg";
import { useLang } from "@/lib/i18n";
import { Blob } from "./Blob";

const works = [
  { num: "01", key: "neural", src: neural, variant: "a", year: "2025", href: "https://github.com/MvMSOLO", offset: "translate-x-0" },
  { num: "02", key: "vortex", src: vortex, variant: "b", year: "2024", href: "https://www.instagram.com/mvmsolo", offset: "md:translate-y-24" },
  { num: "03", key: "yt", src: youtube, variant: "c", year: "2024", href: "https://www.youtube.com/@mvmsolo", offset: "md:-translate-y-8" },
  { num: "04", key: "fin", src: dashboard, variant: "d", year: "2024", href: "https://github.com/MvMSOLO", offset: "md:translate-y-16" },
  { num: "05", key: "etherea", src: etherea, variant: "e", year: "2024", href: "https://t.me/axz_foto", offset: "" },
] as const;

export function UniverseWorks() {
  const { t } = useLang();

  const getWorkTitle = (key: string) => {
    switch(key) {
      case "neural": return "Neural Flow";
      case "vortex": return "Vortex UI";
      case "yt": return "YouTube";
      case "fin": return "Synthetix";
      case "etherea": return "Etherea";
      default: return key;
    }
  };

  const getWorkDesc = (key: string) => {
     if (key === "neural") return t("work.neural.desc");
     if (key === "vortex") return t("work.vortex.sub");
     if (key === "yt") return t("work.yt.sub");
     if (key === "fin") return t("work.fin.sub");
     return t(`uni.work.${key}` as never);
  };

  return (
    <section id="uni-works" className="px-6 md:px-[8vw] py-[15vh]">
      <div className="mb-24">
        <div className="text-[11px] uppercase tracking-[0.4em] text-[#111]/50 mb-6 font-mono">— {t("work.tag")}</div>
        <h2 className="italic text-[#111] leading-[0.85]" style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(56px, 10vw, 160px)" }}>
           {t("work.title_a")} <br /> {t("work.title_b")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
        {works.map((w) => (
          <a
            key={w.num}
            href={w.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative ${w.offset} transition-transform duration-700`}
          >
            <div className="relative w-full aspect-square transition-transform duration-700 group-hover:scale-[1.04] group-hover:rotate-[1deg]">
              <Blob variant={w.variant} src={w.src} alt={w.key} className="w-full h-full animate-uni-drift-slow" />
            </div>
            <div className="mt-8 flex justify-between items-start">
              <div>
                <div className="text-[11px] uppercase tracking-[0.3em] text-[#111]/50 font-mono mb-2">{w.num}</div>
                <div className="italic text-4xl md:text-5xl text-[#111] leading-tight" style={{ fontFamily: '"Instrument Serif", serif' }}>
                  {getWorkTitle(w.key)}
                </div>
                <p className="text-sm text-[#111]/60 mt-3 max-w-[25ch] leading-relaxed" style={{ fontFamily: '"Instrument Serif", serif' }}>
                  {getWorkDesc(w.key)}
                </p>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-[#111]/50 font-mono pt-4">{w.year}</div>
            </div>
            <div className="mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#111]/70 group-hover:text-[#111] transition-colors">
              <span className="h-[1px] w-8 bg-[#C7D9C1]" /> {t("work.cta.a")}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
