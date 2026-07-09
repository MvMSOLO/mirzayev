import { useLang } from "@/lib/i18n";
import { motion } from "framer-motion";

export function Nav() {
  const { lang, setLang, t } = useLang();
  return (
    <nav className="fixed top-0 w-full z-50 mix-blend-difference px-5 md:px-12 lg:px-32 py-6 flex justify-between items-center">
      <motion.a
        href="#top"
        className="text-xs font-bold tracking-tighter"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {t("nav.handle")}
      </motion.a>
      <div className="flex gap-4 items-center">
        <motion.button
          onClick={() => setLang(lang === "uz" ? "en" : "uz")}
          aria-label="Toggle language"
          className="flex items-center gap-1 border border-white/30 px-2 py-1 text-[10px] uppercase tracking-widest font-bold hover:bg-accent hover:border-accent transition-colors cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className={lang === "uz" ? "text-accent" : "opacity-40"}>UZ</span>
          <span className="opacity-30">/</span>
          <span className={lang === "en" ? "text-accent" : "opacity-40"}>EN</span>
        </motion.button>
        <div className="flex gap-2 items-center">
          <div className="size-2 bg-accent animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest hidden sm:inline">
            {t("nav.status")}
          </span>
        </div>
      </div>
    </nav>
  );
}
