const items = [
  "Modern Web Apps",
  "Full-Stack Development",
  "AI Powered Projects",
  "UI/UX Design",
  "Landing Pages",
  "Dashboards",
  "Portfolio Websites",
  "Automation Systems",
  "Technical Content",
];

export function WhatIDo() {
  return (
    <section id="services" className="px-5 py-24 border-b border-border">
      <div className="mb-10 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">// Services</span>
      </div>
      <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-12 leading-[0.9]">
        What <span className="text-accent">I</span> Build
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
        {items.map((it, i) => (
          <div key={it} className="group bg-background p-6 flex items-baseline justify-between hover:bg-accent hover:text-background transition-colors">
            <span className="font-display text-2xl md:text-3xl uppercase tracking-tight">{it}</span>
            <span className="font-mono text-[10px] opacity-40 group-hover:opacity-100">0{i + 1}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
