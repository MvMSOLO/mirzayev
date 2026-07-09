import { useState } from "react";
import { useLang } from "@/lib/i18n";

interface Project {
  id: string;
  name: string;
  origin: { uz: string; en: string };
  problem: { uz: string; en: string };
}

const projects: Project[] = [
  {
    id: "aether",
    name: "AETHER",
    origin: { uz: "Bir tunda notebook chetiga chizilgan spiral.", en: "A spiral doodled on a notebook margin one night." },
    problem: { uz: "Statik saytlar zerikarli. Kod harakatlanmasa — u yashamaydi.", en: "Static sites feel dead. If code doesn't move, it isn't alive." },
  },
  {
    id: "neural",
    name: "NEURAL",
    origin: { uz: "Dasturchilar bir xil ishni takrorlayotgani kuzatildi.", en: "Watched developers repeat the same task twenty times a day." },
    problem: { uz: "Ijodkorlar biror joyda takrorlanuvchi ishga vaqt yo'qotadi.", en: "Creators lose hours to work that should be automated." },
  },
  {
    id: "vortex",
    name: "VORTEX",
    origin: { uz: "Bruklindagi eski afisha uchun tunda chizilgan skitch.", en: "A late-night sketch inspired by a Brooklyn poster archive." },
    problem: { uz: "Dizayn tizimlari bir xil ko'rinadi. Xarakter kerak.", en: "Design systems all look the same. Give it teeth." },
  },
  {
    id: "youtube",
    name: "MVMSOLO",
    origin: { uz: "Kimga texnologiya haqida yozardim? O'zimga.", en: "Wrote to teach the version of me who was still learning." },
    problem: { uz: "Ta'lim kontenti quruq. Ilhomsiz.", en: "Learning content is dry. Uninspired. It shouldn't be." },
  },
];

const stagesUz = [
  "Final Design",
  "Revision 8",
  "Revision 6",
  "Revision 4",
  "Wireframe",
  "Rough Concept",
  "Notebook Sketch",
  "Original Thought",
];

export function DesignArchaeology() {
  const { lang } = useLang();
  const [active, setActive] = useState<Project | null>(null);
  const [stage, setStage] = useState(0);

  const openProject = (p: Project) => {
    setActive(p);
    setStage(0);
  };

  const close = () => setActive(null);
  const next = () => setStage((s) => Math.min(s + 1, 8));
  const prev = () => setStage((s) => Math.max(s - 1, 0));

  return (
    <section className="px-5 md:px-20 lg:px-32 py-24 border-t border-border">
      <div className="mb-10 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">// DESIGN ARCHAEOLOGY</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 mb-12">
        <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter">
          {lang === "uz" ? "Vaqtga qarshi" : "Excavate"}
          <br />
          <span className="text-accent">{lang === "uz" ? "sayohat" : "backwards"}</span>
        </h2>
        <p className="text-sm text-white/60 max-w-[52ch] self-end">
          {lang === "uz"
            ? "Ish arxeologiyasi. Yakuniy dizayndan boshlab, har bir bosqichni ochib, birinchi fikrga qadar boring."
            : "Reverse case studies. Start from the final design, peel back every revision, arrive at the original thought."}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => openProject(p)}
            className="bg-background p-6 text-left hover:bg-accent hover:text-background transition-colors group aspect-square flex flex-col justify-between"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 group-hover:text-background/70">
              {String(projects.indexOf(p) + 1).padStart(2, "0")} / 04
            </span>
            <div>
              <div className="font-display text-2xl md:text-4xl uppercase tracking-tighter">{p.name}</div>
              <div className="text-[10px] uppercase tracking-widest mt-2 opacity-60">
                {lang === "uz" ? "→ QAZISH" : "→ EXCAVATE"}
              </div>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-[80] bg-background overflow-y-auto">
          <div className="sticky top-0 z-10 flex justify-between items-center px-5 md:px-20 py-4 border-b border-border bg-background/95 backdrop-blur">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent">
                ◉ {active.name}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                {stage < 8 ? `STAGE ${stage + 1}/8 · ${stagesUz[stage]}` : "ORIGIN"}
              </span>
            </div>
            <button onClick={close} className="text-[10px] uppercase tracking-widest hover:text-accent">
              ✕ CLOSE
            </button>
          </div>

          <div className="min-h-[70vh] flex items-center justify-center p-8 relative">
            <ArtifactStage stage={stage} project={active} lang={lang} />
          </div>

          <div className="flex justify-between items-center px-5 md:px-20 py-6 border-t border-border sticky bottom-0 bg-background/95 backdrop-blur">
            <button
              onClick={prev}
              disabled={stage === 0}
              className="text-[10px] uppercase tracking-widest border border-border px-4 py-2 hover:border-accent hover:text-accent disabled:opacity-30"
            >
              ← {lang === "uz" ? "OLDIN" : "PREVIOUS"}
            </button>
            <div className="flex gap-1">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-[2px] ${i <= stage ? "bg-accent" : "bg-border"} transition-colors`}
                />
              ))}
            </div>
            <button
              onClick={next}
              disabled={stage === 8}
              className="text-[10px] uppercase tracking-widest border border-accent bg-accent text-background px-4 py-2 hover:bg-transparent hover:text-accent disabled:opacity-30"
            >
              {lang === "uz" ? "KEYINGI" : "NEXT"} →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function ArtifactStage({ stage, project, lang }: { stage: number; project: Project; lang: "uz" | "en" }) {
  // Progressive deconstruction visuals
  const opacityScale = Math.max(0.2, 1 - stage * 0.11);
  const grayscale = Math.min(stage * 15, 100);

  if (stage === 8) {
    return (
      <div className="text-center max-w-2xl mx-auto animate-uni-deconstruct">
        <div className="font-display text-4xl md:text-6xl uppercase tracking-tighter mb-8">
          <span className="text-accent">ORIGIN</span> FOUND
        </div>
        <div className="border-t border-b border-accent/30 py-6 space-y-6 text-left">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-accent mb-2">// FIRST SPARK</div>
            <p className="text-lg italic">{project.origin[lang]}</p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-accent mb-2">// PROBLEM</div>
            <p className="text-lg">{project.problem[lang]}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-4xl transition-all duration-700 relative"
      style={{ filter: `grayscale(${grayscale}%)`, opacity: opacityScale }}
    >
      {/* Progressive mock */}
      <div className="border border-border p-6 md:p-10 bg-secondary/30 relative">
        {stage <= 3 && (
          <>
            <div className="flex justify-between items-center mb-8">
              <div className="font-display text-3xl md:text-5xl uppercase tracking-tighter">
                {project.name}<span className="text-accent">.</span>
              </div>
              {stage <= 1 && <div className="text-[10px] uppercase tracking-widest text-accent">● LIVE</div>}
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {Array.from({ length: 6 - Math.min(stage, 3) }).map((_, i) => (
                <div key={i} className="aspect-square bg-secondary border border-border" />
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-secondary" />
              <div className="h-4 w-3/4 bg-secondary" />
              <div className="h-4 w-1/2 bg-secondary" />
            </div>
          </>
        )}
        {stage === 4 && (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border border-dashed border-accent/50 h-16 flex items-center px-4">
                <span className="text-[10px] font-mono uppercase text-accent/60">module.{i + 1}</span>
              </div>
            ))}
          </div>
        )}
        {stage === 5 && (
          <svg viewBox="0 0 400 300" className="w-full h-64" fill="none" stroke="#FF4500" strokeWidth="2">
            <rect x="20" y="20" width="360" height="60" strokeDasharray="6 4" />
            <rect x="20" y="100" width="170" height="80" strokeDasharray="6 4" />
            <rect x="210" y="100" width="170" height="80" strokeDasharray="6 4" />
            <rect x="20" y="200" width="360" height="80" strokeDasharray="6 4" />
            <text x="200" y="55" textAnchor="middle" fill="#FF4500" fontSize="10" fontFamily="monospace">HEADER</text>
            <text x="105" y="140" textAnchor="middle" fill="#FF4500" fontSize="10" fontFamily="monospace">CARD A</text>
            <text x="295" y="140" textAnchor="middle" fill="#FF4500" fontSize="10" fontFamily="monospace">CARD B</text>
          </svg>
        )}
        {stage === 6 && (
          <svg viewBox="0 0 400 300" className="w-full h-64" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round">
            <path d="M20 40 Q 100 20, 200 40 T 380 40" />
            <path d="M20 80 L 380 80" strokeDasharray="4 4" />
            <path d="M40 130 L 60 110 L 100 140 L 140 100 L 180 150" />
            <circle cx="250" cy="180" r="30" />
            <path d="M300 200 L 360 240 L 320 260 Z" />
            <text x="80" y="270" fill="rgba(255,255,255,0.7)" fontSize="14" fontFamily="cursive">idea → shape → feeling</text>
          </svg>
        )}
        {stage === 7 && (
          <div className="relative py-8" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent 0 39px, rgba(255,255,255,0.05) 39px 40px), repeating-linear-gradient(0deg, transparent 0 39px, rgba(255,255,255,0.05) 39px 40px)" }}>
            <svg viewBox="0 0 400 240" className="w-full h-56" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round">
              <path d="M30 60 Q 80 20, 130 70 T 250 40" strokeDasharray="2 3" />
              <text x="140" y="120" fill="rgba(255,255,255,0.7)" fontSize="16" fontFamily="cursive" transform="rotate(-4 140 120)">
                what if code could feel alive?
              </text>
              <path d="M60 160 L 90 180 M 90 180 L 80 170 M 90 180 L 84 190" strokeWidth="1.5" />
              <circle cx="260" cy="180" r="18" strokeDasharray="3 3" />
              <text x="260" y="184" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="cursive">core</text>
            </svg>
          </div>
        )}
      </div>
      <div className="mt-6 text-center text-[10px] uppercase tracking-widest text-white/40 font-mono">
        {stagesUz[stage]}
      </div>
    </div>
  );
}
