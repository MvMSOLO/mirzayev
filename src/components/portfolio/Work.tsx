import neural from "@/assets/work-neural.jpg";
import dashboard from "@/assets/work-dashboard.jpg";
import vortex from "@/assets/work-vortex.jpg";
import youtube from "@/assets/work-youtube.jpg";
import { useLang } from "@/lib/i18n";

export function Work() {
  const { t } = useLang();
  return (
    <section id="work" className="px-5 md:px-20 lg:px-32 py-24 border-b border-border relative overflow-hidden">
      {/* Section Decor */}
      <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-white/10 hidden lg:block">
        SEC_WORK // ARCHIVE.DB // ACCESS_GRANTED
      </div>

      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="mb-4 flex gap-2 items-center">
            <div className="h-[1px] w-8 bg-accent" />
            <span className="text-[10px] uppercase tracking-widest text-accent">{t("work.tag")}</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9]">
            {t("work.title_a")} <br />{t("work.title_b")}
          </h2>
        </div>
        <span className="text-[10px] text-white/40 mb-2 font-mono">[01 — 05]</span>
      </div>

      <div className="grid grid-cols-6 gap-6">
        <a href="https://github.com/MvMSOLO" target="_blank" rel="noopener noreferrer" className="col-span-6 md:col-span-4 md:row-span-2 group relative border border-border bg-neutral-900/30 aspect-[4/5] md:aspect-auto overflow-hidden shadow-2xl">
          {/* Technical corners for card */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent opacity-0 group-hover:opacity-100 transition-opacity z-20" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity z-20" />

          <img src={neural} alt="Neural Flow" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[500px]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] text-accent font-bold">{t("work.tag.ai")}</span>
              <span className="text-[10px] opacity-40 font-mono">2025</span>
            </div>
            <div>
              <h3 className="font-display text-4xl md:text-5xl uppercase mb-2 tracking-tight">Neural Flow</h3>
              <p className="text-xs text-white/60 max-w-[40ch]">{t("work.neural.desc")}</p>
            </div>
          </div>
        </a>

        <a href="https://www.instagram.com/mvmsolo" target="_blank" rel="noopener noreferrer" className="col-span-3 md:col-span-2 group relative border border-border bg-neutral-900/30 aspect-square overflow-hidden">
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent opacity-0 group-hover:opacity-100 transition-opacity z-20" />
          <img src={vortex} alt="Vortex UI" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-opacity duration-500" loading="lazy" />
          <div className="relative z-10 p-4 h-full flex flex-col justify-between">
            <span className="text-[10px] text-accent font-bold">{t("work.tag.design")}</span>
            <div>
              <h3 className="font-display text-2xl uppercase leading-none">Vortex UI</h3>
              <p className="text-[10px] text-white/50 mt-1">{t("work.vortex.sub")}</p>
            </div>
          </div>
        </a>

        <a href="https://www.youtube.com/@mvmsolo" target="_blank" rel="noopener noreferrer" className="col-span-3 md:col-span-2 group relative border border-border bg-neutral-900/30 aspect-square overflow-hidden">
          <img src={youtube} alt="YouTube channel" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-opacity duration-500" loading="lazy" />
          <div className="relative z-10 p-4 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-[10px] text-accent font-bold">{t("work.tag.content")}</span>
              <div className="size-2 bg-accent animate-pulse" />
            </div>
            <div>
              <h3 className="font-display text-2xl uppercase leading-none">YouTube</h3>
              <p className="text-[10px] text-white/50 mt-1">{t("work.yt.sub")}</p>
            </div>
          </div>
        </a>

        <a href="https://github.com/MvMSOLO" target="_blank" rel="noopener noreferrer" className="col-span-6 md:col-span-4 group relative border border-border bg-neutral-900/30 h-64 overflow-hidden">
          <img src={dashboard} alt="Synthetix Dashboard" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-opacity duration-500" loading="lazy" />
          <div className="relative z-10 p-5 h-full flex flex-col justify-between">
            <span className="text-[10px] text-accent font-bold">{t("work.tag.fin")}</span>
            <div>
              <h3 className="font-display text-3xl uppercase leading-none">Synthetix Dashboard</h3>
              <p className="text-xs text-white/50 mt-1">{t("work.fin.sub")}</p>
            </div>
          </div>
        </a>

        <a href="#contact" className="col-span-6 md:col-span-2 group border border-accent/40 bg-accent/5 p-6 flex items-center justify-between hover:bg-accent hover:text-background transition-colors">
          <span className="font-display text-2xl uppercase leading-none">{t("work.cta.a")}<br />{t("work.cta.b")}</span>
          <span className="text-3xl">↗</span>
        </a>
      </div>
    </section>
  );
}
