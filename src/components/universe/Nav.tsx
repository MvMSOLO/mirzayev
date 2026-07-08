import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { useUniverse } from "@/lib/universe";

export function UniverseNav() {
  const { lang, setLang } = useLang();
  const { exit } = useUniverse();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "About", href: "#uni-about" },
    { label: "Works", href: "#uni-works" },
    { label: "Services", href: "#uni-services" },
    { label: "Lab", href: "#uni-lab" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[60] flex justify-between items-start p-6 md:p-10 pointer-events-none">
        <div className="text-[11px] uppercase tracking-[0.3em] text-[#111]/70 font-mono pointer-events-auto">
          40.8447° N <span className="text-[#C7D9C1]">✦</span>
        </div>

        <div className="flex items-center gap-8 pointer-events-auto">
          <button
            onClick={() => setLang(lang === "uz" ? "en" : "uz")}
            className="hidden md:block text-[11px] uppercase tracking-[0.3em] text-[#111]/70 hover:text-[#111] transition-colors"
          >
            <span className={lang === "uz" ? "text-[#111] font-bold" : ""}>uz</span>
            <span className="mx-2 opacity-30">/</span>
            <span className={lang === "en" ? "text-[#111] font-bold" : ""}>en</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group flex flex-col gap-[6px] items-end"
            aria-label="Toggle menu"
          >
            <span className={`block h-[1px] bg-[#111] transition-all duration-500 ${isOpen ? "w-8 rotate-45 translate-y-2" : "w-8"}`} />
            <span className={`block h-[1px] bg-[#111] transition-all duration-500 ${isOpen ? "opacity-0" : "w-5"}`} />
            <span className={`block h-[1px] bg-[#111] transition-all duration-500 ${isOpen ? "w-8 -rotate-45 -translate-y-2" : "w-6"}`} />
          </button>
        </div>
      </nav>

      {/* Overlay Menu */}
      <div className={`fixed inset-0 z-50 bg-[#F9F6F0] transition-transform duration-1000 ease-expo ${isOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="h-full flex flex-col justify-center px-6 md:px-[10vw]">
          <ul className="space-y-4 md:space-y-8">
            {menuItems.map((item, idx) => (
              <li key={item.label} className="overflow-hidden">
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block italic text-6xl md:text-[10vw] leading-none text-[#111] hover:text-[#C7D9C1] transition-all duration-700 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    transitionDelay: `${idx * 100}ms`
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={`mt-20 flex flex-wrap gap-10 border-t border-[#111]/10 pt-10 transition-opacity duration-1000 ${isOpen ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: '500ms' }}>
             <button
                onClick={() => { setLang(lang === "uz" ? "en" : "uz"); setIsOpen(false); }}
                className="text-[12px] uppercase tracking-[0.3em] text-[#111]/70 font-mono"
              >
                Switch to {lang === "uz" ? "English" : "Uzbek"}
              </button>
              <button
                onClick={() => { exit(); setIsOpen(false); }}
                className="text-[12px] uppercase tracking-[0.3em] text-[#111]/70 font-mono"
              >
                Back to Kinetic
              </button>
          </div>
        </div>
      </div>
    </>
  );
}
