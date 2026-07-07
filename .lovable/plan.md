# Kinetic Lab Portfolio — Avazbek Mirzayev

Single-page, dark, motion-forward portfolio in the "Kinetic Lab Experimental" direction, using the full bio and skills from the uploaded markdown.

## Design tokens (locked)

- Background `#0D0C10`, foreground `#FFFFFF`, accent industrial orange `#FF4500`, muted `rgba(255,255,255,0.4)`, border `rgba(255,255,255,0.1)`.
- Display: Anton (uppercase kinetic titles). Body/mono: JetBrains Mono. Loaded via `<link>` in `src/routes/__root.tsx` head, families registered in `@theme` in `src/styles.css`.
- Selection colored orange. Custom keyframes: `marquee`, `slide-up`, plus new `float` and `scroll-reveal`.

## Sections (in order)

1. **Fixed nav** — `AVAZBEK / 16` left, live "Status: Available" dot right, `mix-blend-difference`.
2. **Hero** — huge Anton title "AVAZBEK / MIRZAYEV" (orange second line), giant background marquee ("FULL-STACK ENGINEER · UI DESIGNER · AI BUILDER · CONTENT CREATOR"), accent chip "EXPERIMENTAL LAB · 2026", subtitle in Uzbek + English ("Olmaliq, O'zbekiston · 16 yosh · Building next-gen digital systems"), scroll cue.
3. **About** — layered asymmetric: portrait placeholder card + floating orange "16 YRS OLD" sticker, "// BACKGROUND" heading, real bio from md (short Uzbek + English combined paragraph from the file), stat row (Projects, YouTube subs, Years coding, Stack items).
4. **What I Do** — 3×3 grid of chips from the "What I Do" list (Web apps, Full-stack, AI projects, UI/UX, Landing pages, Dashboards, Portfolios, Automation, Content).
5. **Skills marquee band** — orange full-bleed band scrolling all tech: HTML5, CSS3, JS, TS, React, Next.js, Tailwind, Node, Python, REST, PostgreSQL, Figma, Git, AI Integrations, Prompt Engineering, etc.
6. **Skills detail** — 4-column responsive breakdown (Frontend / Backend / UI-UX / AI & Tools) taken verbatim from md.
7. **Selected Works (Bento)** — asymmetric grid: 1 large hero project + 2 medium + 2 small + "View archive" tile. 5 placeholder projects (Neural Flow AI agent, Vortex UI system, Fintech Dashboard, YouTube channel case, Automation Suite) with orange hover reveal state (CSS-only for now — no JS libs beyond React).
8. **Development Philosophy** — 5 numbered steps from the md (Muammoni aniqlash → Foydalanuvchi tajribasi → Dizayn → Kod → Iteratsiya). Big orange numerals, mono body.
9. **Contact footer** — huge "READY TO TRANSMIT?" title, Social/Direct two-column links (YouTube, GitHub, Instagram, Telegram, Email, LinkedIn), coordinates + ©2026 LABS-AM row.

## Implementation

- Replace `src/routes/index.tsx` placeholder with the composed portfolio. Break into small components under `src/components/portfolio/`: `Nav`, `Hero`, `About`, `WhatIDo`, `SkillsMarquee`, `SkillsDetail`, `Work`, `Philosophy`, `Contact`.
- Update `src/routes/__root.tsx` head: real title "Avazbek Mirzayev — Full-Stack Developer & UI Designer", description, og:title/description/type, twitter:card. Add Google Fonts `<link>` (Anton + JetBrains Mono) in the head `links` array (per stack rules — no CSS `@import` of remote URL).
- Add tokens & keyframes to `src/styles.css` inside existing `@theme inline` (extend with `--color-accent`, `--font-display`, `--font-mono`) and add `@keyframes marquee/slide-up/float` plus utility classes (`.animate-marquee`, `.stagger-reveal`).
- Generate 1 hero background image and 3 project thumbs via imagegen (dark, geometric, orange highlights) saved under `src/assets/`.
- Motion: CSS-only (marquee, stagger fade-up on load, hover states, `animate-pulse` accent dots). Respect `prefers-reduced-motion` via a `@media` rule that disables the marquee and long transitions. No GSAP/Three.js dependencies added — keeps bundle lean and matches the static preview fidelity.
- Composition matches selected prototype: same section order, same asymmetric about, same bento shape (1 tall + medium + small + CTA), same orange marquee band, same footer.

## Technical notes

- No new npm packages needed.
- No backend / Lovable Cloud — pure presentation.
- Accessibility: semantic `<header>/<section>/<footer>`, alt text on generated images, focus-visible rings in orange.
- SEO: single H1 in hero, meta + og tags in __root head; og:image added on `/` leaf route pointing to generated hero asset (absolute URL only if project has one — otherwise omit per rules).
