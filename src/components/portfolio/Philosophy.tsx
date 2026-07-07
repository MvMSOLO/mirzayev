const steps = [
  { t: "Muammoni aniqlash", d: "Har bir loyiha aniq muammoni tushunishdan boshlanadi. Kim uchun? Nima uchun?" },
  { t: "UX rejalashtirish", d: "Foydalanuvchi tajribasini xaritalash — flowlar, holatlar, mikro-detallar." },
  { t: "Dizayn tizimi", d: "Rang, tipografiya, komponentlar. Bir marta yaratamiz — hamma joyda ishlaydi." },
  { t: "Toza kod", d: "TypeScript, semantik markup, performance-first arxitektura." },
  { t: "Iteratsiya", d: "Ship qilamiz, o'lchaymiz, yaxshilaymiz. Perfect emas, real." },
];

export function Philosophy() {
  return (
    <section id="philosophy" className="px-5 py-24 border-b border-border">
      <div className="mb-10 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">// Philosophy</span>
      </div>
      <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-16 leading-[0.9]">
        How I <br /><span className="text-accent">Build</span>
      </h2>
      <div className="space-y-10 md:space-y-14 max-w-3xl">
        {steps.map((s, i) => (
          <div key={s.t} className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-start border-t border-border pt-8">
            <span className="font-display text-5xl md:text-7xl text-accent leading-none">0{i + 1}</span>
            <div>
              <h4 className="font-display text-2xl md:text-3xl uppercase tracking-tight mb-3">{s.t}</h4>
              <p className="text-sm text-white/60 leading-relaxed max-w-[50ch]">{s.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
