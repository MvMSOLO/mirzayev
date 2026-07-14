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
      <nav className="fixed top-0 left-0 right-0 z-[60] flex justify-between items-start p-6 md:p-10 pointer-events-none transition-all duration-300">
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

      {/* Overlay Menu with Custom Elastic SVG Wave Morphing */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.4 } }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            {/* Morphing Liquid SVG Backing Panel */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                  initial={{ d: "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z" }}
                  animate={{
                    d: [
                      "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z",
                      "M 0 0 L 100 0 L 100 70 Q 50 120 0 70 Z",
                      "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z"
                    ]
                  }}
                  exit={{
                    d: [
                      "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z",
                      "M 0 0 L 100 0 L 100 70 Q 50 0 0 70 Z",
                      "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z"
                    ]
                  }}
                  transition={{
                    duration: 0.85,
                    times: [0, 0.6, 1],
                    ease: [0.76, 0, 0.24, 1]
                  }}
                  fill="#F9F6F0"
                />
              </svg>
            </div>

            <div className="h-full flex flex-col justify-center px-6 md:px-[10vw] relative z-10">
              <ul className="space-y-4 md:space-y-8">
                {menuItems.map((item, idx) => (
                  <li key={item.label} className="overflow-hidden">
                    <motion.a
                      initial={{ y: "110%", rotate: 8, opacity: 0 }}
                      animate={{ y: 0, rotate: 0, opacity: 1 }}
                      exit={{ y: "-110%", rotate: -8, opacity: 0 }}
                      transition={{
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.15 + idx * 0.08,
                      }}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline gap-6 italic text-5xl md:text-[9vw] leading-none text-[#111] hover:text-accent transition-colors"
                      style={{
                        fontFamily: '"Instrument Serif", serif',
                      }}
                    >
                      {/* Interactive Staggered Letter Spring Animation on Hover */}
                      <span className="text-[10px] font-mono tracking-widest text-[#111]/30 not-italic group-hover:text-accent group-hover:translate-x-2 transition-all duration-300">
                        0{idx + 1}
                      </span>

                      <span className="relative overflow-hidden inline-block">
                        {item.label.split("").map((char, charIdx) => (
                          <motion.span
                            key={charIdx}
                            className="inline-block"
                            whileHover={{
                              y: -8,
                              scale: 1.15,
                              color: "var(--color-accent, #ea580c)",
                              transition: { type: "spring", stiffness: 350, damping: 10 }
                            }}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </span>
                    </motion.a>
                  </li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.7 }}
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
