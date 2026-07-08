import { useLang } from "@/lib/i18n";

export function UniverseNav() {
  const { lang, setLang } = useLang();
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex justify-between items-start p-6 md:p-10">
      <div className="text-[11px] uppercase tracking-[0.3em] text-[#111]/70 font-mono">
        40.8447° N <span className="text-[#C7D9C1]">✦</span>
      </div>
      <div className="flex items-center gap-6">
        <button
          onClick={() => setLang(lang === "uz" ? "en" : "uz")}
          className="text-[11px] uppercase tracking-[0.3em] text-[#111]/70 hover:text-[#111]"
        >
          <span className={lang === "uz" ? "text-[#111]" : ""}>uz</span>
          <span className="mx-1 opacity-30">/</span>
          <span className={lang === "en" ? "text-[#111]" : ""}>en</span>
        </button>
        <div className="flex flex-col gap-[6px]" aria-hidden>
          <span className="block h-[1px] w-6 bg-[#111]" />
          <span className="block h-[1px] w-6 bg-[#111]" />
        </div>
      </div>
    </nav>
  );
}
