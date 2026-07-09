import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { useUniverse } from "@/lib/universe";
import { motion, AnimatePresence } from "framer-motion";

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
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] uppercase tracking-[0.3em] text-[#111]/70 font-mono pointer-events-auto"
        >
          40.8447° N <span className="text-[#C7D9C1]">✦</span>
        </motion.div>

        <div className="flex items-center gap-8 pointer-events-auto">
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => setLang(lang === "uz" ? "en" : "uz")}
            className="hidden md:block text-[11px] uppercase tracking-[0.3em] text-[#111]/70 hover:text-[#111] transition-colors cursor-pointer"
          >
            <span className={lang === "uz" ? "text-[#111] font-bold" : ""}>uz</span>
            <span className="mx-2 opacity-30">/</span>
            <span className={lang === "en" ? "text-[#111] font-bold" : ""}>en</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => setIsOpen(!isOpen)}
            className="group flex flex-col gap-[6px] items-end cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[1px] bg-[#111] transition-all duration-500 ${isOpen ? "w-8 rotate-45 translate-y-2" : "w-8"}`}
            />
            <span
              className={`block h-[1px] bg-[#111] transition-all duration-500 ${isOpen ? "opacity-0" : "w-5"}`}
            />
            <span
              className={`block h-[1px] bg-[#111] transition-all duration-500 ${isOpen ? "w-8 -rotate-45 -translate-y-2" : "w-6"}`}
            />
          </motion.button>
        </div>
      </nav>

      {/* Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
            className="fixed inset-0 z-50 bg-[#F9F6F0]"
          >
            <div className="h-full flex flex-col justify-center px-6 md:px-[10vw]">
              <ul className="space-y-4 md:space-y-8">
                {menuItems.map((item, idx) => (
                  <li key={item.label} className="overflow-hidden">
                    <motion.a
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.4 + idx * 0.1,
                      }}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block italic text-6xl md:text-[10vw] leading-none text-[#111] hover:text-[#C7D9C1] transition-colors"
                      style={{
                        fontFamily: '"Instrument Serif", serif',
                      }}
                    >
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-20 flex flex-wrap gap-10 border-t border-[#111]/10 pt-10"
              >
                <button
                  onClick={() => {
                    setLang(lang === "uz" ? "en" : "uz");
                    setIsOpen(false);
                  }}
                  className="text-[12px] uppercase tracking-[0.3em] text-[#111]/70 font-mono cursor-pointer hover:text-[#111] transition-colors"
                >
                  Switch to {lang === "uz" ? "English" : "Uzbek"}
                </button>
                <button
                  onClick={() => {
                    exit();
                    setIsOpen(false);
                  }}
                  className="text-[12px] uppercase tracking-[0.3em] text-[#111]/70 font-mono cursor-pointer hover:text-[#111] transition-colors"
                >
                  Back to Kinetic
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
