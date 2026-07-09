import { useLang } from "@/lib/i18n";
import { useEffect, useState } from "react";

export function HeroRails() {
  const { t } = useLang();
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const iso = d.toISOString().split("T")[1].split(".")[0];
      setTime(iso + " UTC");
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Left rail */}
      <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-6 items-center text-[9px] uppercase tracking-[0.3em] text-white/40 font-mono pointer-events-none">
        <span className="vertical-text">{t("hero.chip")}</span>
        <span className="h-24 w-px bg-white/20" />
        <span className="vertical-text">40.9926°N · 69.5986°E</span>
      </div>

      {/* Right rail */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-4 items-center text-[9px] uppercase tracking-[0.3em] text-accent font-mono pointer-events-none">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          COMPILING REALITY
        </span>
        <span className="h-24 w-px bg-accent/40" />
        <span className="vertical-text text-white/40">{time || "loading…"}</span>
      </div>
    </>
  );
}
