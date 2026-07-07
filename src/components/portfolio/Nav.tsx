import { useLang } from "@/lib/i18n";

export function Nav() {
  const { lang, setLang, t } = useLang();
  return (
    <nav className="fixed top-0 w-full z-50 mix-blend-difference px-5 py-6 flex justify-between items-center">
      <a href="#top" className="text-xs font-bold tracking-tighter">{t("nav.handle")}</a>
      <div className="flex gap-4 items-center">
        <button
          onClick={() => setLang(lang === "uz" ? "en" : "uz")}
          aria-label="Toggle language"
          className="flex items-center gap-1 border border-white/30 px-2 py-1 text-[10px] uppercase tracking-widest font-bold hover:bg-accent hover:border-accent transition-colors"
        >
          <span className={lang === "uz" ? "text-accent" : "opacity-40"}>UZ</span>
          <span className="opacity-30">/</span>
          <span className={lang === "en" ? "text-accent" : "opacity-40"}>EN</span>
        </button>
        <div className="flex gap-2 items-center">
          <div className="size-2 bg-accent animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest hidden sm:inline">{t("nav.status")}</span>
        </div>
      </div>
    </nav>
  );
}
