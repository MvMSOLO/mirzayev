import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/lib/i18n";

type UniverseType = "startup" | "agency" | "brand" | "secret";

interface Portal {
  id: UniverseType;
  code: string;
  label: { uz: string; en: string };
  accent: string;
  fields: Array<{ key: string; label: { uz: string; en: string } }>;
  font: string;
}

const portals: Portal[] = [
  {
    id: "startup",
    code: "001",
    label: { uz: "STARTAP ASOSCHISI", en: "STARTUP FOUNDER" },
    accent: "#FF4500",
    font: "font-display",
    fields: [
      { key: "mission", label: { uz: "MISSIYA", en: "MISSION" } },
      { key: "speed", label: { uz: "TEZLIK", en: "SPEED" } },
      { key: "goal", label: { uz: "MAQSAD", en: "GOAL" } },
    ],
  },
  {
    id: "agency",
    code: "002",
    label: { uz: "IJODIY AGENTLIK", en: "CREATIVE AGENCY" },
    accent: "#DFFF00",
    font: "font-display italic",
    fields: [
      { key: "mission", label: { uz: "MISSIYA", en: "MISSION" } },
      { key: "focus", label: { uz: "FOKUS", en: "FOCUS" } },
      { key: "goal", label: { uz: "MAQSAD", en: "GOAL" } },
    ],
  },
  {
    id: "brand",
    code: "003",
    label: { uz: "GLOBAL BREND", en: "GLOBAL BRAND" },
    accent: "#C7D9C1",
    font: "font-display",
    fields: [
      { key: "mission", label: { uz: "MISSIYA", en: "MISSION" } },
      { key: "focus", label: { uz: "AUDITORIYA", en: "AUDIENCE" } },
      { key: "goal", label: { uz: "TA'SIR", en: "IMPACT" } },
    ],
  },
  {
    id: "secret",
    code: "004",
    label: { uz: "MAXFIY LOYIHA", en: "SECRET PROJECT" },
    accent: "#ff2244",
    font: "font-mono",
    fields: [
      { key: "classification", label: { uz: "TASNIFI", en: "CLASSIFICATION" } },
      { key: "access", label: { uz: "RUXSAT", en: "ACCESS" } },
      { key: "status", label: { uz: "HOLAT", en: "STATUS" } },
    ],
  },
];

export function ParallelContact() {
  const { lang } = useLang();
  const [portal, setPortal] = useState<Portal | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<"idle" | "transmit" | "done">("idle");
  const [err, setErr] = useState<string | null>(null);

  const openPortal = (p: Portal) => {
    setPortal(p);
    setValues({});
    setPhase("idle");
    setErr(null);
  };

  const close = () => setPortal(null);

  const submit = async () => {
    if (!portal) return;
    setPhase("transmit");
    setErr(null);
    await new Promise((r) => setTimeout(r, 5500));
    const { error } = await supabase.from("contact_messages").insert({
      universe_type: portal.id,
      payload: values,
    });
    if (error) {
      setErr(error.message);
      setPhase("idle");
      return;
    }
    setPhase("done");
  };

  return (
    <section id="contact-parallel" className="px-5 md:px-20 lg:px-32 py-16 md:py-24 border-t border-border">
      <div className="mb-10 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">
          // PARALLEL UNIVERSE · CONTACT
        </span>
      </div>
      <div className="mb-14">
        <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter">
          {lang === "uz" ? "Olamingizni" : "Select"}
          <br />
          <span className="text-accent">{lang === "uz" ? "tanlang" : "your universe"}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {portals.map((p) => (
          <button
            key={p.id}
            onClick={() => openPortal(p)}
            className="group relative aspect-[3/4] border border-border overflow-hidden bg-secondary/30 p-6 flex flex-col justify-between hover:border-accent transition-all"
            style={{ ["--acc" as string]: p.accent }}
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                {p.code}
              </span>
              <div className="relative w-10 h-10">
                <div
                  className="absolute inset-0 rounded-full border animate-spin"
                  style={{ borderColor: p.accent, animationDuration: "6s" }}
                />
                <div
                  className="absolute inset-2 rounded-full border animate-spin"
                  style={{
                    borderColor: p.accent,
                    animationDuration: "3s",
                    animationDirection: "reverse",
                  }}
                />
              </div>
            </div>
            <div>
              <div
                className={`text-2xl md:text-3xl uppercase tracking-tighter mb-2 ${p.font}`}
                style={{ color: p.accent }}
              >
                {p.label[lang]}
              </div>
              <div className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100">
                → {lang === "uz" ? "PORTALGA KIRISH" : "ENTER PORTAL"}
              </div>
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-br pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${p.accent}30, transparent 70%)`,
              }}
            />
          </button>
        ))}
      </div>

      {portal && (
        <div className="fixed inset-0 z-[80] bg-background/98 backdrop-blur overflow-y-auto">
          <div className="flex justify-between items-center px-5 md:px-20 py-6 border-b border-border">
            <span
              className="text-[10px] font-mono uppercase tracking-widest"
              style={{ color: portal.accent }}
            >
              {portal.code} · {portal.label[lang]}
            </span>
            <button
              onClick={close}
              className="text-[10px] uppercase tracking-widest hover:text-accent"
            >
              ✕ CLOSE
            </button>
          </div>

          {phase === "idle" && (
            <div className="max-w-2xl mx-auto px-6 py-16 space-y-8">
              <h3
                className={`text-4xl md:text-6xl uppercase tracking-tighter ${portal.font}`}
                style={{ color: portal.accent }}
              >
                {portal.id === "secret"
                  ? lang === "uz"
                    ? "MAXFIY BRIF"
                    : "CLASSIFIED BRIEF"
                  : lang === "uz"
                    ? "BRIF"
                    : "BRIEF"}
              </h3>
              {portal.fields.map((f) => (
                <div key={f.key} className="border-b border-border pb-4">
                  <label className="text-[10px] uppercase tracking-widest opacity-60 block mb-2 font-mono">
                    {f.label[lang]}
                  </label>
                  <input
                    value={values[f.key] || ""}
                    onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                    className={`w-full bg-transparent border-0 text-2xl md:text-3xl focus:outline-none ${portal.id === "secret" ? "font-mono" : "font-display"}`}
                    style={{ color: portal.accent }}
                    placeholder={portal.id === "secret" ? "████ ████" : "..."}
                  />
                </div>
              ))}
              <div className="border-b border-border pb-4">
                <label className="text-[10px] uppercase tracking-widest opacity-60 block mb-2 font-mono">
                  {lang === "uz" ? "SIGNAL / EMAIL" : "SIGNAL / EMAIL"}
                </label>
                <input
                  value={values.contact || ""}
                  onChange={(e) => setValues({ ...values, contact: e.target.value })}
                  type="email"
                  className="w-full bg-transparent border-0 text-2xl md:text-3xl focus:outline-none font-mono"
                  style={{ color: portal.accent }}
                  placeholder="you@planet.earth"
                />
              </div>
              {err && <p className="text-red-500 text-xs uppercase tracking-widest">✕ {err}</p>}
              <button
                onClick={submit}
                className="w-full py-6 border-2 uppercase tracking-[0.3em] text-sm font-bold transition-all hover:bg-accent hover:text-background"
                style={{ borderColor: portal.accent, color: portal.accent }}
              >
                {lang === "uz" ? "→ SIGNAL YUBORISH" : "→ TRANSMIT SIGNAL"}
              </button>
            </div>
          )}

          {phase === "transmit" && (
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 relative">
              <svg
                viewBox="0 0 200 200"
                className="w-64 h-64"
                fill="none"
                stroke={portal.accent}
                strokeWidth="0.5"
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <circle
                    key={i}
                    cx="100"
                    cy="100"
                    r={20 + i * 15}
                    strokeDasharray="4 4"
                    className="animate-ping"
                    style={{ animationDelay: `${i * 200}ms`, animationDuration: "2s" }}
                  />
                ))}
                <circle cx="100" cy="100" r="8" fill={portal.accent} />
              </svg>
              <div
                className="text-center font-mono text-xs uppercase tracking-widest space-y-2"
                style={{ color: portal.accent }}
              >
                <div className="animate-uni-typewriter">◉ ESTABLISHING CONNECTION…</div>
                <div className="animate-uni-typewriter" style={{ animationDelay: "1.5s" }}>
                  ◉ SIGNAL LOCKED
                </div>
                <div className="animate-uni-typewriter" style={{ animationDelay: "3.5s" }}>
                  ◉ UNIVERSE LINK ESTABLISHED
                </div>
              </div>
            </div>
          )}

          {phase === "done" && (
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center px-6">
              <div
                className="text-[10px] font-mono uppercase tracking-widest"
                style={{ color: portal.accent }}
              >
                ◉ TRANSMISSION COMPLETE
              </div>
              <h3
                className={`text-5xl md:text-7xl uppercase tracking-tighter ${portal.font}`}
                style={{ color: portal.accent }}
              >
                {lang === "uz" ? "SIGNAL QABUL QILINDI" : "SIGNAL RECEIVED"}
              </h3>
              <p className="text-white/60 max-w-md">
                {lang === "uz"
                  ? "Xabaringiz olamlar orasidan o'tdi. Tez orada javob bo'ladi."
                  : "Your message crossed universes. Expect a reply soon."}
              </p>
              <button
                onClick={close}
                className="mt-6 border border-accent px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-accent hover:text-background transition-colors"
              >
                {lang === "uz" ? "OLAMGA QAYTISH" : "RETURN TO UNIVERSE"}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
