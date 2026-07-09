
# V4 — Immersive Portfolio Expansion

Massive upgrade adding rich animations, filling desktop empty space, migrating portfolio data into Creative Universe, plus three signature experiences: Future Compiler, Design Archaeology, and Parallel Universe Contact.

## 1. Animation infrastructure

Add premium motion libs (install once, use across both universes):
- `motion` (Framer Motion v11 successor) — page/section reveals, layout animations
- `gsap` + `@gsap/react` — timelines, ScrollTrigger, cinematic sequences
- `lenis` — buttery smooth scroll (both universes)
- `split-type` — character-level text animations
- Keep existing canvas particles

New shared hooks in `src/hooks/`:
- `useLenis.ts` — global smooth scroll
- `useScrollReveal.ts` — GSAP ScrollTrigger wrapper
- `useMagnetic.ts` — magnetic cursor targets
- `useSplitText.ts` — character/word splits with stagger

Apply throughout Kinetic Lab:
- Hero headline: char-by-char reveal with skew + blur
- Section headings: masked slide-up + subtle scramble
- Work cards: parallax on scroll, hover tilt (vanilla-tilt style, GSAP-driven)
- Marquees keep CSS, but gain scroll-linked speed modulation via ScrollTrigger
- Nav: magnetic hover + underline morph
- Language toggle: keep existing wipe, add GSAP text scramble
- Section transitions: pinned scroll scenes on Philosophy + AetherFlow

Respect `prefers-reduced-motion` everywhere (short fades only).

## 2. Desktop density — fill empty space

Kinetic Lab currently has generous whitespace on desktop. Add without breaking mobile:

- **Hero**: side rails with live coords, UTC clock, scroll indicator, rotating status ("● COMPILING REALITY"), vertical marquee of tools
- **About**: two-column asymmetric layout on `lg+` — portrait left, stat grid + timeline right (mobile stays stacked)
- **WhatIDo**: expand from list to bento-grid on `lg+` (6 tiles with icons, hover video-loop feel via CSS)
- **SkillsDetail**: add sparkline-like SVG proficiency bars + numeric year-of-experience
- **Work**: add sticky project index sidebar on `lg+`, hover reveals large preview + metadata (year, role, stack, link)
- **New section — LAB LOG**: pseudo-terminal changelog feed between Philosophy and Contact
- **New section — TOOLKIT GRID**: 24-icon dense grid of tools/software with hover labels
- **Contact**: add availability calendar strip + response-time indicator

All new content localized in `i18n.tsx` (UZ + EN).

## 3. Creative Universe cleanup + parity

Current creative tree has some filler sections (Philosophy, WhatIDo, Skills, About duplicates). Refactor:
- Remove: `About.tsx`, `WhatIDo.tsx`, `Skills.tsx`, `Philosophy.tsx` from `src/components/universe/`
- Keep the editorial voice, but port real portfolio data into creative-styled sections:
  - **Hero** — same asymmetric editorial, real name/tagline
  - **Manifesto** — real bio in italic long-form
  - **Selected Works** — same 6 real projects with real links (GitHub, YouTube, Instagram, etc.), rendered inside blob masks
  - **Craft** (new) — real skills as editorial list with proficiency dots
  - **Interaction Lab** — keep the 4 demos, wire fully working liquid buttons + morphing
  - **Contact chip** — real socials in editorial serif, links open in new tabs
  - **Footer** — exit universe button + credits

Every button in creative universe must actually navigate (external `_blank` links, or trigger real actions). Update i18n for all new copy.

## 4. Future Compiler section

New route section rendered inside Kinetic Lab (between Work and Philosophy).

**Gating**: `localStorage.getItem("future-compiler-played")` — if true, skip intro and mount workspace directly.

**Intro CTA**: full-viewport panel with `<PLAY EXPERIENCE>` button (magnetic + goo hover).

**Cinematic (22s GSAP timeline)** — pure code, no video:
1. Fade to black (0.5s)
2. Crosshair SVG assembles from scan lines (2s)
3. "SCANNING ENVIRONMENT…" typewriter + radar sweep (3s)
4. Crosshair glides to command line (2s)
5. Type `future realistic` char-by-char (2s)
6. `ENTER` flash + shockwave (0.5s)
7. HTML tag stream (columns of `<div>`, `<span>` scrolling) — canvas layer (3s)
8. CSS architecture map — animated force-directed nodes on SVG (3s)
9. JS logic network — connecting dots (2s)
10. Wireframes emerge → components materialize (skeletons fill in) (2s)
11. Grid + typography lock + design tokens sync (1s)
12. "PREVIEW ENGINE ACTIVE" flash → workspace fade in (1s)

Scanlines, motion blur (CSS filter), chromatic aberration, camera shake via transform. Skippable with Esc or button. Sets `localStorage` on complete.

**Workspace (permanent, real)**:
- Prompt textarea: "Describe your website idea"
- Submit → status cycles: `THINKING → BUILDING → COMPILING → OPTIMIZING` (fake progress bar, 4–6s total; no streaming code shown)
- Backed by **Lovable AI Gateway** (`google/gemini-2.5-flash`) via a `createServerFn` — prompt asks model to output strictly `{html, css, js}` JSON (vanilla only, no frameworks)
- Enable **Lovable Cloud** (Supabase) to expose the AI gateway server function
- **Code viewer**: tabbed (HTML/CSS/JS), Prism-lite syntax highlighting via `shiki` (or `prism-react-renderer` — lighter), collapsible sections, copy button, download `.zip` via `jszip`, live Preview tab renders in sandboxed `<iframe srcdoc>`
- Mobile-optimized: tabs collapse to accordion; horizontal scroll for code

## 5. Design Archaeology section

New section between Work and Future Compiler (Kinetic Lab only).

- Project picker: 4 real projects
- On open → full-screen scroll experience with GSAP ScrollTrigger pinning
- 8 stages, each a pinned scroll scene, deconstructing progressively:
  1. Final Design (screenshot-style mock)
  2. Revision 8 (colors slightly muted, one card removed)
  3. Revision 6 (typography swaps to placeholder)
  4. Revision 4 (spacing collapses, grayscale)
  5. Wireframe (all boxes become outlines)
  6. Rough Concept (hand-drawn SVG blocks)
  7. Notebook Sketch (paper texture + pencil SVG strokes animate in)
  8. Original Thought → fade to black
- End screen: centered "ORIGIN FOUND" (masked reveal) → then origin card (problem, inspiration, first spark)
- All SVG-based transformations; no image swaps needed beyond one final mock per project
- Sketch marks, arrows, annotations appear as animated SVG paths (`strokeDasharray` reveal)

Localized captions in UZ + EN.

## 6. Parallel Universe Contact

Replace current contact CTA area (keep footer credits + social lists).

**Portal select**:
Four portal cards with animated SVG rings + particle bursts on hover:
- 001 STARTUP FOUNDER
- 002 CREATIVE AGENCY
- 003 GLOBAL BRAND
- 004 SECRET PROJECT

**On select** → full theme swap for the section:
- Different accent color, typography weight, motion easing
- Custom "brief" fields for that persona (Mission, Speed, Goal / Mission, Focus, Goal / Mission, Focus, Goal / Classification, Access, Status)
- Secret Project uses redacted-bar aesthetics + monospace

**Submission flow (GSAP timeline, 6s)**:
1. Particles converge to center
2. Signal lines connect from 4 corners
3. Transmission bars fill
4. "ESTABLISHING CONNECTION…" → "SIGNAL LOCKED" → "UNIVERSE LINK ESTABLISHED"
5. Message actually persists via Lovable Cloud (new `contact_messages` table with RLS: anon insert-only, authenticated select for admin later)

## Data / backend

Enable **Lovable Cloud** for:
- `contact_messages` table (id, universe_type, payload jsonb, created_at) — anon INSERT policy, service_role select
- AI Gateway server function for Future Compiler code generation (uses `LOVABLE_API_KEY`, `google/gemini-2.5-flash`)

## New dependencies

`motion`, `gsap`, `@gsap/react`, `lenis`, `split-type`, `prism-react-renderer`, `jszip`

## Files

### Create
- `src/hooks/useLenis.ts`, `useScrollReveal.ts`, `useMagnetic.ts`, `useSplitText.ts`
- `src/components/portfolio/LabLog.tsx`
- `src/components/portfolio/ToolkitGrid.tsx`
- `src/components/portfolio/HeroRails.tsx` (side rails)
- `src/components/portfolio/WorkSidebar.tsx`
- `src/components/portfolio/FutureCompiler/index.tsx`
- `src/components/portfolio/FutureCompiler/Cinematic.tsx`
- `src/components/portfolio/FutureCompiler/Workspace.tsx`
- `src/components/portfolio/FutureCompiler/CodeViewer.tsx`
- `src/components/portfolio/DesignArchaeology/index.tsx`
- `src/components/portfolio/DesignArchaeology/Stage.tsx`
- `src/components/portfolio/ParallelContact/index.tsx`
- `src/components/portfolio/ParallelContact/Portal.tsx`
- `src/components/portfolio/ParallelContact/Transmission.tsx`
- `src/lib/compiler.functions.ts` (createServerFn → AI Gateway)
- Supabase migration: `contact_messages` table + grants + RLS

### Edit
- All Kinetic portfolio components (motion + density additions)
- `src/routes/index.tsx` (mount new sections, Lenis provider)
- `src/lib/i18n.tsx` (add all new copy UZ + EN)
- `src/styles.css` (new keyframes, scanline filters, futuristic tokens)
- `src/components/universe/Universe.tsx` (remove filler sections, restructure)
- `src/components/portfolio/Contact.tsx` (integrate ParallelContact, keep Enter Universe CTA)

### Delete
- `src/components/universe/About.tsx`
- `src/components/universe/WhatIDo.tsx`
- `src/components/universe/Skills.tsx`
- `src/components/universe/Philosophy.tsx`

## Technical notes

- All GSAP timelines cleaned up in `useEffect` return
- ScrollTrigger paused on tab hidden
- Lenis integrated with GSAP ticker for sync
- Future Compiler cinematic mounts lazily (React.lazy + Suspense) to keep initial bundle lean
- Sandboxed iframe (`sandbox="allow-scripts"`) for AI-generated preview
- No secrets in client code — AI calls via server function only
