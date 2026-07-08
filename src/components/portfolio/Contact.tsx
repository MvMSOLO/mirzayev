import { useLang } from "@/lib/i18n";
import { useUniverse } from "@/lib/universe";

const social = [
  { k: "Telegram", v: "@axz_foto", href: "https://t.me/axz_foto" },
  { k: "Instagram", v: "@mvmsolo", href: "https://www.instagram.com/mvmsolo" },
  { k: "YouTube", v: "@mvmsolo", href: "https://www.youtube.com/@mvmsolo" },
  { k: "TikTok", v: "@mvmsolo", href: "https://www.tiktok.com/@mvmsolo" },
  { k: "X", v: "@mvmsolo", href: "https://x.com/mvmsolo" },
  { k: "Discord", v: "@mvmsolo", href: "https://discord.com/users/mvmsolo" },
];

const direct = [
  { k: "Email", v: "mirzayevavazbek15@gmail.com", href: "mailto:mirzayevavazbek15@gmail.com" },
  { k: "GitHub", v: "MvMSOLO", href: "https://github.com/MvMSOLO" },
];

export function Contact() {
  const { t } = useLang();
  const { enter } = useUniverse();
  return (
    <footer id="contact" className="px-5 md:px-20 lg:px-32 pt-24 pb-16 relative overflow-hidden">
      <div className="absolute -bottom-16 left-0 whitespace-nowrap flex pointer-events-none select-none">
        <div className="flex animate-marquee shrink-0">
          {[0, 1, 2].map((k) => (
            <span key={k} className="font-display text-[140px] md:text-[220px] leading-none uppercase pr-10 opacity-[0.05]">
              AVAZBEK MIRZAYEV ·
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <div className="mb-10 flex gap-2 items-center">
          <div className="h-[1px] w-8 bg-accent" />
          <span className="text-[10px] uppercase tracking-widest text-accent">{t("contact.tag")}</span>
        </div>

        <h2 className="font-display text-6xl md:text-9xl uppercase leading-[0.85] mb-6 tracking-tighter">
          {t("contact.title_a")} <br /><span className="text-accent">{t("contact.title_b")}</span>
        </h2>

        <p className="text-xs md:text-sm text-white/50 max-w-[52ch] mb-14">{t("contact.note")}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <div>
            <span className="text-[10px] uppercase text-white/40 tracking-widest mb-4 block">{t("contact.social")}</span>
            <ul className="divide-y divide-border">
              {social.map((s) => (
                <li key={s.k}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="flex justify-between py-4 group items-center">
                    <span className="text-sm uppercase font-bold group-hover:text-accent transition-colors">{s.k}</span>
                    <span className="text-sm text-white/50 group-hover:text-accent transition-colors flex items-center gap-2">{s.v}<span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-[10px] uppercase text-white/40 tracking-widest mb-4 block">{t("contact.direct")}</span>
            <ul className="divide-y divide-border">
              {direct.map((s) => (
                <li key={s.k}>
                  <a href={s.href} target={s.href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" className="flex justify-between py-4 group items-center">
                    <span className="text-sm uppercase font-bold group-hover:text-accent transition-colors">{s.k}</span>
                    <span className="text-sm text-white/50 group-hover:text-accent transition-colors flex items-center gap-2 truncate max-w-[60%]">{s.v}<span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-wrap justify-between items-center gap-4 text-[10px] uppercase tracking-widest opacity-40 font-mono">
          <span>© 2026 LABS-AM</span>
          <span>Olmaliq · 40.9926° N, 69.5986° E</span>
          <span>v3.0 · Kinetic Lab</span>
        </div>

        <div className="mt-14 flex justify-center">
          <button
            onClick={enter}
            className="group relative flex items-center gap-4 border border-accent/60 px-8 py-4 uppercase tracking-[0.3em] text-xs font-bold hover:bg-accent hover:border-accent hover:text-background transition-all duration-500"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
            </span>
            {t("uni.enter")}
            <span className="text-xl">↗</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
