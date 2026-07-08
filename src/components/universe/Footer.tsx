import { useLang } from "@/lib/i18n";
import { useUniverse } from "@/lib/universe";
import { LiquidButton } from "./LiquidButton";

const socials = [
  { k: "Telegram", href: "https://t.me/axz_foto" },
  { k: "Instagram", href: "https://www.instagram.com/mvmsolo" },
  { k: "YouTube", href: "https://www.youtube.com/@mvmsolo" },
  { k: "TikTok", href: "https://www.tiktok.com/@mvmsolo" },
  { k: "X", href: "https://x.com/mvmsolo" },
  { k: "Discord", href: "https://discord.com/users/mvmsolo" },
  { k: "GitHub", href: "https://github.com/MvMSOLO" },
  { k: "Email", href: "mailto:mirzayevavazbek15@gmail.com" },
];

export function UniverseFooter() {
  const { t } = useLang();
  const { exit } = useUniverse();
  return (
    <footer className="px-6 md:px-[8vw] py-[15vh] border-t border-[#111]/10">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-16 items-end">
        <div>
          <div className="text-[11px] uppercase tracking-[0.4em] text-[#111]/50 mb-6 font-mono">— transmit</div>
          <h2 className="italic text-[#111] leading-[0.9]" style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(56px, 10vw, 160px)" }}>
            let's create.
          </h2>
          <p className="mt-8 max-w-[52ch] text-[#111]/70 text-sm" style={{ fontFamily: '"Instrument Serif", serif' }}>
            {t("uni.footer.note")}
          </p>
        </div>
        <div>
          <ul className="space-y-2 md:text-right">
            {socials.map((s) => (
              <li key={s.k}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="italic text-2xl md:text-3xl text-[#111]/60 hover:text-[#111] transition-colors" style={{ fontFamily: '"Instrument Serif", serif' }}>
                  {s.k}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-24 flex flex-wrap items-center justify-between gap-6 border-t border-[#111]/10 pt-8">
        <div className="text-[10px] uppercase tracking-[0.3em] text-[#111]/50 font-mono">
          © 2026 avazbek mirzayev · all rights reserved · olmaliq 40.9926° N
        </div>
        <LiquidButton primary onClick={exit}>{t("uni.exit")}</LiquidButton>
      </div>
    </footer>
  );
}
