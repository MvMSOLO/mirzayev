import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type Lang = "uz" | "en";

type Dict = Record<string, { uz: string; en: string }>;

export const dict: Dict = {
  // Nav
  "nav.handle": { uz: "AVAZBEK / 16", en: "AVAZBEK / 16" },
  "nav.status": { uz: "Ochiq · 2026", en: "Available · 2026" },
  "nav.menu": { uz: "Menyu", en: "Menu" },
  "nav.close": { uz: "Yopish", en: "Close" },
  "nav.about": { uz: "Men haqimda", en: "About" },
  "nav.work": { uz: "Ishlar", en: "Work" },
  "nav.services": { uz: "Xizmatlar", en: "Services" },
  "nav.lab": { uz: "Laboratoriya", en: "Lab" },
  "nav.contact": { uz: "Aloqa", en: "Contact" },

  // Sound & Music
  "sound.on": { uz: "Ovoz: Yoqilgan", en: "Sound: On" },
  "sound.off": { uz: "Ovoz: O'chirilgan", en: "Sound: Off" },
  "music.search": { uz: "Qidirish (yoki link)", en: "Search (or link)" },
  "music.playing": { uz: "O'ynalmoqda", en: "Playing" },
  "music.paused": { uz: "To'xtatilgan", en: "Paused" },
  "music.collapse": { uz: "Musiqa panelini yopish", en: "Collapse music player" },
  "music.expand": { uz: "Musiqa panelini ochish", en: "Expand music player" },
  "music.play": { uz: "Ijro etish", en: "Play" },
  "music.pause": { uz: "To'xtatish", en: "Pause" },

  // Hero
  "hero.chip": { uz: "EKSPERIMENTAL LAB · 2026", en: "EXPERIMENTAL LAB · 2026" },
  "hero.first": { uz: "Avazbek", en: "Avazbek" },
  "hero.last": { uz: "Mirzayev", en: "Mirzayev" },
  "hero.sub": {
    uz: "Full-stack dasturchi, UI/UX dizayner va sun'iy intellekt ustasi — Olmaliq, O'zbekistondan kelajak raqamli tizimlarini yaratadi.",
    en: "Full-stack developer, UI/UX designer & AI enthusiast building next-gen digital systems from Olmaliq, Uzbekistan.",
  },
  "hero.scroll": { uz: "↓ Pastga", en: "↓ Scroll" },
  "hero.est": { uz: "T. 2010", en: "Est. 2010" },
  "hero.marquee": {
    uz: "FULL-STACK · UI DIZAYNER · AI USTASI · KONTENT MUALLIFI ·",
    en: "FULL-STACK · UI DESIGNER · AI BUILDER · CONTENT CREATOR ·",
  },

  // About
  "about.tag": { uz: "// Kelib chiqishi", en: "// Background" },
  "about.p1_pre": { uz: "Assalomu alaykum! Men ", en: "Hello! I'm " },
  "about.p1_post": {
    uz: " — zamonaviy web-ilovalar, sun'iy intellekt yechimlari va innovatsion raqamli mahsulotlar yaratishga qiziqadigan yosh dasturchiman.",
    en: " — a young developer passionate about modern web apps, AI solutions and building innovative digital products.",
  },
  "about.p2": {
    uz: "Men uchun dasturlash — bu g'oyalarni haqiqiy mahsulotlarga aylantirish. Frontend, full-stack, UI/UX dizayn, AI integratsiyasi va zamonaviy platformalar ustida ishlayman. YouTube'da texnologiya va dasturlash bo'yicha kontent yarataman.",
    en: "For me, coding is turning ideas into real products. I work on frontend, full-stack, UI/UX design, AI integrations and modern platforms. I also create tech & programming content on YouTube.",
  },
  "about.age.k": { uz: "Yosh", en: "Age" },
  "about.projects.k": { uz: "Loyihalar", en: "Projects" },
  "about.years.k": { uz: "Kod yozgan", en: "Years Coding" },
  "about.location.k": { uz: "Manzil", en: "Location" },
  "about.badge": { uz: "16 YOSH", en: "16 YRS OLD" },

  // WhatIDo
  "wid.tag": { uz: "// Xizmatlar", en: "// Services" },
  "wid.title_a": { uz: "Nima ", en: "What " },
  "wid.title_i": { uz: "Men", en: "I" },
  "wid.title_b": { uz: " Quraman", en: " Build" },
  "wid.1": { uz: "Zamonaviy Web Ilovalar", en: "Modern Web Apps" },
  "wid.1.d": { uz: "React 19 va TypeScript bilan tezkor, responsive ilovalar.", en: "Fast, responsive apps with React 19, TypeScript, and modern frameworks." },
  "wid.2": { uz: "Full-Stack Ishlanma", en: "Full-Stack Development" },
  "wid.2.d": { uz: "Frontend va backend — to'liq tizim arxitekturasi va API.", en: "Frontend + backend — complete system architecture and API design." },
  "wid.3": { uz: "AI Asosidagi Loyihalar", en: "AI Powered Projects" },
  "wid.3.d": { uz: "LLM, OpenAI va embeddings bilan aqlli raqamli mahsulotlar.", en: "Intelligent products powered by LLMs, OpenAI, and embeddings." },
  "wid.4": { uz: "UI/UX Dizayn", en: "UI/UX Design" },
  "wid.4.d": { uz: "Foydalanuvchi uchun qulay, estetik va funksional interfeyslar.", en: "User-centered, aesthetic, and functional interface design." },
  "wid.5": { uz: "Landing Sahifalar", en: "Landing Pages" },
  "wid.5.d": { uz: "Yuqori konversiyali marketing sahifalari — tezkor va esda qoluvchi.", en: "High-converting marketing pages — fast-loading and memorable." },
  "wid.6": { uz: "Dashboardlar", en: "Dashboards" },
  "wid.6.d": { uz: "Realtaym grafiklar, KPI kartalar va analitika panellari.", en: "Real-time charts, KPI cards, and analytics dashboards." },
  "wid.7": { uz: "Portfolio Saytlar", en: "Portfolio Websites" },
  "wid.7.d": { uz: "Siz kabi ijodkorlar uchun moslashtirilgan portfel saytlar.", en: "Custom portfolio sites that showcase your unique craft." },
  "wid.8": { uz: "Avtomatlashtirish", en: "Automation Systems" },
  "wid.8.d": { uz: "Takrorlanadigan jarayonlarni avtomatlashtirish — botlar va AI.", en: "Automating repetitive workflows with bots and AI pipelines." },
  "wid.9": { uz: "Texnik Kontent", en: "Technical Content" },
  "wid.9.d": { uz: "YouTube va blog kontenti — texnologiya, kod va dizayn haqida.", en: "YouTube & blog content about tech, code, and design." },

  // Skills
  "skills.tag": { uz: "// Imkoniyatlar", en: "// Capabilities" },
  "skills.title_a": { uz: "Texnik", en: "Technical" },
  "skills.title_b": { uz: "To'plam", en: "Stack" },
  "skills.g1": { uz: "Frontend", en: "Frontend" },
  "skills.g2": { uz: "Backend", en: "Backend" },
  "skills.g3": { uz: "UI / UX", en: "UI / UX" },
  "skills.g4": { uz: "AI va Vositalar", en: "AI & Tools" },

  // Work
  "work.tag": { uz: "// Arxiv", en: "// Archive" },
  "work.title_a": { uz: "Tanlangan", en: "Selected" },
  "work.title_b": { uz: "Ishlar", en: "Works" },
  "work.tag.ai": { uz: "AI AGENT", en: "AI AGENT" },
  "work.tag.design": { uz: "DIZAYN", en: "DESIGN" },
  "work.tag.content": { uz: "KONTENT", en: "CONTENT" },
  "work.tag.fin": { uz: "FINTECH", en: "FINTECH" },
  "work.neural.desc": {
    uz: "Dasturchilar uchun AI asosidagi vazifalarni avtomatlashtirish tizimi. Next.js, OpenAI, Postgres.",
    en: "AI-driven task automation engine for developers. Next.js, OpenAI, Postgres.",
  },
  "work.neural.sub": {
    uz: "AI asosidagi avtomatlashtirish · Next.js · OpenAI",
    en: "AI-driven automation · Next.js · OpenAI",
  },
  "work.tag.yt": { uz: "KONTENT", en: "CONTENT" },
  "work.vortex.sub": { uz: "Dizayn tizimi", en: "Design system" },
  "work.yt.sub": { uz: "Tech kanal", en: "Tech channel" },
  "work.fin.sub": {
    uz: "Realtaym analitika · grafiklar · signal",
    en: "Realtime analytics · charts · alerts",
  },
  "work.cta.a": { uz: "Barchasini", en: "View" },
  "work.cta.b": { uz: "Ko'rish", en: "Archive" },

  // Philosophy
  "phi.tag": { uz: "// Falsafa", en: "// Philosophy" },
  "phi.title_a": { uz: "Qanday", en: "How I" },
  "phi.title_b": { uz: "Quraman", en: "Build" },
  "phi.1.t": { uz: "O'ylash va Izlanish", en: "Thinking & Researching" },
  "phi.1.d": {
    uz: "Muammoni har tomonlama o'rganish, foydalanuvchilar ehtiyojini tushunish, loyiha strategiyasini chizish va tizim me'morchiligini chuqur loyihalash.",
    en: "Framing the challenge, setting milestones, analyzing user needs, and planning out technical architectures deeply.",
  },
  "phi.2.t": { uz: "Tushunish va Kodlash", en: "Understanding & Coding" },
  "phi.2.d": {
    uz: "Yozilgan har bir qator kodning ishlash mantig'ini chuqur anglash. Pristine, xavfsiz va kelajakka moslashuvchan TypeScript tizimlarini yaratish.",
    en: "Translating complex logic into readable, pristine, secure, and highly optimized TypeScript component architectures.",
  },
  "phi.3.t": { uz: "Sinab Ko'rish", en: "Testing & Verification" },
  "phi.3.d": {
    uz: "Loyiha yuklanish tezligi, unumdorligi va turli xil qurilmalarda ishlash holatlarini ekstremal testlar hamda avtomatlashtirilgan testlar orqali sinovdan o'tkazish.",
    en: "Simulating simulated environments, measuring performance scores, stress testing responsiveness, and running unit test pipelines.",
  },
  "phi.4.t": { uz: "Yetkazish va Yakunlash", en: "Delivering & Finalizing" } ,
  "phi.4.d": {
    uz: "Tayyor loyihani global chekka serverlarga yuklash, CDN orqali eng yuqori unumdorlik va satifying tezlik bilan foydalanuvchiga taqdim etish.",
    en: "Deploying high-performance builds to edge nodes globally, ensuring impeccable delivery, and launching smoothly.",
  },

  // Contact
  "contact.tag": { uz: "// Aloqa", en: "// Transmit" },
  "contact.title_a": { uz: "Signal", en: "Ready to" },
  "contact.title_b": { uz: "Uzatishga Tayyor?", en: "Transmit?" },
  "contact.social": { uz: "// Ijtimoiy", en: "// Social" },
  "contact.direct": { uz: "// To'g'ridan-to'g'ri", en: "// Direct" },
  "contact.note": {
    uz: "Business va hamkorlik takliflari uchun murojaat qiling. Spam yoki reklama xabarlari qabul qilinmaydi.",
    en: "For business and collaboration inquiries only. Spam and ads will be ignored.",
  },

  // Aether
  "aether.1": {
    uz: "AETHER FLOW · CHEKSIZ OQIM · KINETIK LAB",
    en: "AETHER FLOW · ENDLESS STREAM · KINETIC LAB",
  },
  "aether.2": {
    uz: "KOD · DIZAYN · AI · KONTENT · TAKROR",
    en: "CODE · DESIGN · AI · CONTENT · REPEAT",
  },
  "aether.3": { uz: "OLMALIQ → GLOBAL · 2026 →", en: "OLMALIQ → GLOBAL · 2026 →" },

  // Lang switch
  "lang.switching": { uz: "Tilni almashtirish...", en: "Switching language..." },

  // Universe CTA
  "uni.enter": { uz: "Kreativ olamga kirish", en: "Enter creative universe" },
  "uni.exit": { uz: "Kinetik olamga qaytish", en: "Return to kinetic" },

  // Universe hero + manifesto
  "uni.hero.desc": {
    uz: "raqamli alkimyogar — inson tajribasini yuksaltiruvchi ta'sirchan interfeyslar va aqlli tizimlar yaratadi.",
    en: "digital alchemist — crafting immersive interfaces & intelligent systems that elevate human experience.",
  },
  "uni.hero.cta": { uz: "olamga kirish", en: "enter the universe" },
  "uni.manifesto": {
    uz: "har bir piksel — bu she'r. har bir o'zaro ta'sir — bu marosim. dizayn nafaqat ko'rinadi, u his qilinadi, nafas oladi va o'zgaradi.",
    en: "every pixel is a poem. every interaction, a ritual. design isn't seen — it's felt, it breathes, it transforms.",
  },

  // Universe works
  "uni.work.solara": { uz: "veb tajriba · 2024", en: "web experience · 2024" },
  "uni.work.lumen": { uz: "raqamli o'rnatma · 2023", en: "digital installation · 2023" },
  "uni.work.obscura": { uz: "brend identifikatsiyasi · 2024", en: "brand identity · 2024" },
  "uni.work.noir": { uz: "muharrirlik prototipi · 2023", en: "editorial prototype · 2023" },
  "uni.work.etherea": { uz: "interaktiv san'at · 2024", en: "interactive art · 2024" },
  "uni.work.aether": { uz: "webgl tajriba · 2024", en: "webgl experience · 2024" },

  // Universe lab
  "uni.lab.title": { uz: "o'zaro ta'sir laboratoriyasi", en: "interaction & elements lab" },
  "uni.lab.liquid": { uz: "suyuq tugma", en: "liquid button" },
  "uni.lab.text": { uz: "matn buzilishi", en: "text distortion" },
  "uni.lab.cursor": { uz: "kursor effekti", en: "cursor gravity" },
  "uni.lab.shape": { uz: "shakl transformatsiyasi", en: "shape morphing" },

  // Universe footer
  "uni.footer.note": {
    uz: "biznes va hamkorlik uchun murojaat qiling. har bir loyiha — yangi olam.",
    en: "for business and collaboration inquiries. every project is a new universe.",
  },
  "fc.prompt.placeholder.1": {
    uz: "masalan: minimalist portfolio...",
    en: "e.g. minimalist portfolio...",
  },
  "fc.prompt.placeholder.2": {
    uz: "masalan: qahvaxona uchun landing...",
    en: "e.g. coffee shop landing page...",
  },
  "fc.prompt.placeholder.3": {
    uz: "masalan: saas platformasi dashboardi...",
    en: "e.g. saas platform dashboard...",
  },
  "fc.prompt.chip.1": { uz: "E-tijorat do'koni", en: "E-commerce store" },
  "fc.prompt.chip.2": { uz: "Kripto treker", en: "Crypto tracker" },
  "fc.prompt.chip.3": { uz: "Shaxsiy blog", en: "Personal blog" },
  "fc.prompt.label": { uz: "TIZIMGA KIRITISH", en: "SYSTEM INPUT" },
  "fc.prompt.submit": { uz: "KOMPILYATSIYA QILISH", en: "INITIALIZE BUILD" },
  "fc.prompt.thinking": { uz: "NEYRON TARMOQ TAHLIL QILMOQDA", en: "NEURAL NETWORK ANALYZING" },

  // Neural Timeline
  "nt.tag": { uz: "// Neyron Vaqt Chizig'i", en: "// Neural Timeline" },
  "nt.title_a": { uz: "5 Yillik", en: "Five-Year" },
  "nt.title_b": { uz: "Zanjir", en: "Circuit" },
  "nt.sub": {
    uz: "16 yoshda, ammo 5 yillik amaliy tajriba bilan — har bir yosh zanjirga yangi texnologik signal yoqadi. Yoshni tanlang.",
    en: "16 years old, five years of hands-on signal — every age fires a new technology into the circuit. Pick a node.",
  },
  "nt.now": { uz: "HOZIR", en: "NOW" },
  "nt.age": { uz: "YOSH", en: "YRS" },
  "nt.hint": { uz: "Tugmani bosing yoki ← → bilan boshqaring", en: "Tap a node or steer with ← →" },

  // Zen Garden
  "uni.zen.tag": { uz: "// Zen Bog'i", en: "// Zen Garden" },
  "uni.zen.title": { uz: "Raqamli Zen Bog'i", en: "Digital Zen Garden" },
  "uni.zen.desc": { uz: "Sichqonchani qum ustida sudrab silliq to'lqinlar hosil qiling. Sayqallangan toshlarni joylashtirish va sokin tovushlarni his qilish uchun bosing.", en: "Rake smooth ripples across the sand with your cursor. Click to place polished stones and trigger meditative frequencies." },
  "uni.zen.clear": { uz: "Bog'ni tozalash", en: "Clear Garden" },
  "uni.zen.preset.title": { uz: "Andozalar", en: "Presets" },
  "uni.zen.preset.1": { uz: "Sokin Oqim", en: "Silent Stream" },
  "uni.zen.preset.2": { uz: "Kvant To'lqini", en: "Quantum Waves" },
  "uni.zen.preset.3": { uz: "Abadiy Spiral", en: "Eternal Spiral" },
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: keyof typeof dict) => string;
  switching: boolean;
}

const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("uz");
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved === "uz" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  // Keep <html lang> in sync with the active language so screen readers
  // announce content in the correct language.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback(
    (l: Lang) => {
      if (l === lang) return;
      setSwitching(true);
      setTimeout(() => {
        setLangState(l);
        try {
          localStorage.setItem("lang", l);
        } catch {}
      }, 350);
      setTimeout(() => setSwitching(false), 900);
    },
    [lang],
  );

  const t = useCallback((k: keyof typeof dict) => dict[k]?.[lang] ?? String(k), [lang]);

  return (
    <LangCtx.Provider value={{ lang, setLang, t, switching }}>
      {children}
      {switching && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <div className="absolute inset-0 bg-accent origin-left animate-lang-wipe" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-4xl md:text-7xl uppercase text-background tracking-tighter animate-lang-label">
              {lang === "uz" ? "EN · ENGLISH" : "UZ · O'ZBEKCHA"}
            </span>
          </div>
        </div>
      )}
    </LangCtx.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang outside provider");
  return ctx;
}
