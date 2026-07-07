import portrait from "@/assets/portrait.jpg";

export function About() {
  return (
    <section id="about" className="px-5 py-24 relative border-b border-border">
      <div className="mb-12 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent" />
        <span className="text-[10px] uppercase tracking-widest text-accent">// Background</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="relative">
          <div className="relative w-56 md:w-72 aspect-[3/4] bg-neutral-900 border border-white/10 overflow-hidden animate-float">
            <img src={portrait} alt="Avazbek Mirzayev portrait" width={800} height={1000} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" />
          </div>
          <div className="absolute -bottom-4 -right-2 md:-right-6 bg-accent p-4 z-30 rotate-[-3deg]">
            <span className="text-xs font-bold leading-none block uppercase">16 YRS<br />OLD</span>
          </div>
          <div className="absolute -top-3 -left-3 bg-background border border-white/20 px-2 py-1 text-[9px] uppercase tracking-widest">
            Portrait_01
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-lg md:text-xl leading-snug">
            Assalomu alaykum! Men <span className="text-accent">Avazbek Mirzayev</span> — zamonaviy web-ilovalar, sun'iy intellekt yechimlari va innovatsion raqamli mahsulotlar yaratishga qiziqadigan yosh dasturchiman.
          </p>
          <p className="text-sm text-white/60 leading-relaxed">
            Men uchun dasturlash — bu g'oyalarni haqiqiy mahsulotlarga aylantirish imkoniyati. Frontend, full-stack, UI/UX dizayn, AI integratsiyasi va zamonaviy platformalar ustida ishlayman. Shuningdek YouTube'da texnologiya va dasturlash bo'yicha kontent yarataman.
          </p>
          <div className="flex flex-wrap gap-2 pt-4">
            {["React/TS", "Next.js", "Python", "Node.js", "AI", "UI/UX"].map((t) => (
              <span key={t} className="px-2 py-1 border border-border text-[10px] uppercase tracking-widest">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-16">
        {[
          { k: "Age", v: "16" },
          { k: "Projects", v: "50+" },
          { k: "Years Coding", v: "05" },
          { k: "Location", v: "UZ" },
        ].map((s) => (
          <div key={s.k} className="border border-border p-4">
            <p className="font-display text-4xl md:text-5xl leading-none text-accent">{s.v}</p>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mt-3">{s.k}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
