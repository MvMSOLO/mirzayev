import solara from "@/assets/universe/solara.jpg";
import lumen from "@/assets/universe/lumen.jpg";
import obscura from "@/assets/universe/obscura.jpg";
import noir from "@/assets/universe/noir.jpg";
import etherea from "@/assets/universe/etherea.jpg";
import aether from "@/assets/universe/aether.jpg";
import { useLang } from "@/lib/i18n";
import { Blob } from "./Blob";

const works = [
  { num: "01", key: "solara", src: solara, variant: "a", year: "2024", href: "https://github.com/MvMSOLO", offset: "translate-x-0" },
  { num: "02", key: "lumen", src: lumen, variant: "b", year: "2023", href: "https://www.youtube.com/@mvmsolo", offset: "md:translate-y-24" },
  { num: "03", key: "obscura", src: obscura, variant: "c", year: "2024", href: "https://www.instagram.com/mvmsolo", offset: "md:-translate-y-8" },
  { num: "04", key: "noir", src: noir, variant: "d", year: "2023", href: "https://x.com/mvmsolo", offset: "md:translate-y-16" },
  { num: "05", key: "etherea", src: etherea, variant: "e", year: "2024", href: "https://t.me/axz_foto", offset: "" },
  { num: "06", key: "aether", src: aether, variant: "f", year: "2024", href: "https://github.com/MvMSOLO", offset: "md:translate-y-20" },
] as const;

export function UniverseWorks() {
  const { t } = useLang();
  return (
    <section id="uni-works" className="px-6 md:px-[8vw] py-[15vh]">
      <div className="mb-16">
        <div className="text-[11px] uppercase tracking-[0.4em] text-[#111]/50 mb-4 font-mono">— selected works</div>
        <h2 className="italic text-[#111]" style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(56px, 9vw, 140px)", lineHeight: 0.85 }}>
          selected works
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-24">
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
            <div className="mt-6 flex justify-between items-baseline">
              <div>
                <div className="text-[11px] uppercase tracking-[0.3em] text-[#111]/50 font-mono mb-1">{w.num}</div>
                <div className="italic text-3xl md:text-4xl text-[#111]" style={{ fontFamily: '"Instrument Serif", serif' }}>
                  {w.key}
                </div>
                <div className="text-xs text-[#111]/60 mt-1">{t(`uni.work.${w.key}` as never)}</div>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-[#111]/50 font-mono">{w.year}</div>
            </div>
            <div className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#111]/70 group-hover:text-[#111]">
              <span className="h-[1px] w-6 bg-[#C7D9C1]" /> view case
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
