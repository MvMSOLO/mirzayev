const social = [
  { k: "YouTube", v: "@avazbekdev" },
  { k: "GitHub", v: "/avazbek-m" },
  { k: "Instagram", v: "@avaz.dev" },
  { k: "Telegram", v: "@avaz_dev" },
];

const direct = [
  { k: "Email", v: "hello@avazbek.dev" },
  { k: "LinkedIn", v: "/in/avazbek-mirzayev" },
];

export function Contact() {
  return (
    <footer id="contact" className="px-5 pt-24 pb-16 relative overflow-hidden">
      <div className="absolute -bottom-16 left-0 whitespace-nowrap animate-marquee flex pointer-events-none select-none">
        {[0, 1].map((k) => (
          <span key={k} className="font-display text-[140px] md:text-[220px] leading-none uppercase pr-10 opacity-[0.04]">
            AVAZBEK MIRZAYEV · AVAZBEK MIRZAYEV ·
          </span>
        ))}
      </div>

      <div className="relative z-10">
        <div className="mb-10 flex gap-2 items-center">
          <div className="h-[1px] w-8 bg-accent" />
          <span className="text-[10px] uppercase tracking-widest text-accent">// Transmit</span>
        </div>

        <h2 className="font-display text-6xl md:text-9xl uppercase leading-[0.85] mb-14 tracking-tighter">
          Ready to <br /><span className="text-accent">Transmit?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <div>
            <span className="text-[10px] uppercase text-white/40 tracking-widest mb-4 block">// Social</span>
            <ul className="divide-y divide-border">
              {social.map((s) => (
                <li key={s.k}>
                  <a href="#" className="flex justify-between py-4 group">
                    <span className="text-sm uppercase font-bold">{s.k}</span>
                    <span className="text-sm text-white/50 group-hover:text-accent transition-colors">{s.v}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-[10px] uppercase text-white/40 tracking-widest mb-4 block">// Direct</span>
            <ul className="divide-y divide-border">
              {direct.map((s) => (
                <li key={s.k}>
                  <a href="#" className="flex justify-between py-4 group">
                    <span className="text-sm uppercase font-bold">{s.k}</span>
                    <span className="text-sm text-white/50 group-hover:text-accent transition-colors">{s.v}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-wrap justify-between items-center gap-4 text-[10px] uppercase tracking-widest opacity-40 font-mono">
          <span>© 2026 LABS-AM</span>
          <span>Olmaliq · 40.9926° N, 69.5986° E</span>
          <span>v1.0 · Kinetic Lab</span>
        </div>
      </div>
    </footer>
  );
}
