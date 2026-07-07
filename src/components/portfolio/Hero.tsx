export function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 overflow-hidden border-b border-border">
      <div className="absolute -top-6 left-0 whitespace-nowrap animate-marquee flex pointer-events-none select-none">
        {Array.from({ length: 2 }).map((_, i) => (
          <span key={i} className="font-display text-[110px] md:text-[180px] leading-none uppercase pr-10 opacity-[0.06]">
            FULL-STACK · UI DESIGNER · AI BUILDER · CONTENT CREATOR ·
          </span>
        ))}
      </div>

      <div className="px-5 relative z-10 stagger-reveal">
        <div className="inline-block bg-accent px-2 py-1 mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest">Experimental Lab · 2026</span>
        </div>
        <h1 className="font-display text-7xl md:text-9xl uppercase leading-[0.85] tracking-tighter mb-8">
          Avazbek <br /> <span className="text-accent">Mirzayev</span>
        </h1>
        <p className="max-w-[34ch] text-sm md:text-base text-white/60 leading-relaxed mb-10">
          Full-stack developer, UI/UX designer & AI enthusiast building next-gen digital systems from Olmaliq, O'zbekiston.
        </p>
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-white/40">
          <span>↓ Scroll</span>
          <div className="h-[1px] w-12 bg-white/20" />
          <span>Est. 2010</span>
        </div>
      </div>
    </section>
  );
}
