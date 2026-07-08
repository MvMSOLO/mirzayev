
# V3 — Creative Universe Mode

Add a "Creative Universe" toggle that runs a 5-second cinematic transformation from the current Kinetic Lab (dark/orange) portfolio into a completely different editorial art universe (warm ivory / sage / acid lime, serif italics, organic blob shapes). Both universes coexist — the user can switch back.

## 1. Footer CTA

Add a single non-intrusive button in `Contact.tsx` (fixed bottom-right on desktop, inline chip on mobile) styled minimal outline:

```
◯ ENTER CREATIVE UNIVERSE
```

Does not disturb existing footer content. Localized (UZ: "Kreativ olamga kirish", EN: "Enter Creative Universe"). When active, the button flips to "◯ EXIT UNIVERSE" so the user can return.

## 2. Transition sequence (5s cinematic)

New `UniverseTransition.tsx` overlay component driven by a `UniverseProvider` context (`mode: "kinetic" | "creative"`, `phase: "idle" | "deconstruct" | "liquid" | "flash" | "rebuild"`).

- **0–1s Deconstruction**: full-page snapshot via `html2canvas`-free approach — render a fixed-position clone of current DOM with CSS `filter` + `clip-path` + transform breakup. Splits hero headline characters (already in Anton) into absolutely-positioned spans that translate/rotate outward with staggered easing and fade to particles on canvas.
- **1–2s Liquidization**: SVG `feTurbulence` + `feDisplacementMap` filter animated via `<animate>` over the snapshot; scale grows, saturation drops. Cards visibly warp.
- **2–3s White flash**: overlay fades to `#F9F6F0`; small centered mono text "reconstructing universe" types in char-by-char; floating coordinate dots on canvas.
- **3–5s Rebuild**: creative universe DOM fades/slides in with staggered blob mask reveals; scroll resets to top.

Reverse sequence plays when exiting (rebuild → flash → liquid → deconstruct → kinetic). Respects `prefers-reduced-motion` (falls back to 400ms cross-fade).

## 3. Creative Universe (separate design system)

New tree under `src/components/universe/` — NOT reusing Kinetic components. Rendered conditionally in `routes/index.tsx` based on context mode. Sections:

- **Hero** — asymmetric editorial. "avazbek" massive italic serif offset left, "mirzayev" lower and offset right, overlapping an organic SVG blob containing a generated ethereal image. Top-left coordinates `40.8447° N`, top-right hamburger. No grid.
- **Manifesto** — single long editorial paragraph, extreme whitespace, italic pullquotes.
- **Selected Works** — six projects (solara, lumen, obscura, noir, etherea, aether) each inside a unique SVG blob `<mask>` clipping generated imagery, with hand-numbered `01–06` italic labels and "view case" links pointing to the same real URLs (GitHub, YouTube, Instagram, Telegram, etc.).
- **Interaction Lab** — 4 demo tiles: Liquid Button (SVG goo filter + magnetic cursor), Text Distortion (hover displacement), Cursor Effect (custom lime dot + gravity ring), Shape Morphing (CSS `d` path interpolation between blobs).
- **Contact / Footer** — italic "all rights reserved © 2026 avazbek mirzayev" + same social links, plus the "EXIT UNIVERSE" toggle mirroring the entry button.

## 4. Design tokens (Creative)

Added to `src/styles.css` under a `[data-universe="creative"]` selector so semantic tokens flip when active:

```
--background: #F9F6F0   /* warm ivory */
--foreground: #111111
--accent:     #C7D9C1   /* sage */
--accent-2:   #DFFF00   /* acid lime */
--chrome:     #D7D7D7
--font-display: "Instrument Serif", "Cormorant Garamond", serif
--font-body:    "Inter Tight", sans-serif
```

Load fonts via `<link>` in `__root.tsx` head (Instrument Serif + Cormorant Garamond italic + Inter Tight). No Tailwind classes hardcode colors — all through tokens so both modes theme cleanly.

## 5. Interactions

- **Desktop liquid buttons**: shared `<LiquidButton>` with SVG goo filter (`feGaussianBlur` + `feColorMatrix`) and pointer-driven CSS custom props for stretch/ripple.
- **Magnetic cursor**: custom cursor ring following pointer with spring lerp; scales on hoverable targets; sage default, lime on primary CTAs.
- **Shape morph**: `<path>` `d` attribute animated via CSS `@property` for blob transitions.
- **Mobile**: no hover. `DeviceOrientationEvent` (with iOS permission prompt on first tap) drives a parallax offset on hero blobs; touch-and-hold on project shapes triggers a scale+morph reveal; simple tilt gyro shifts image inside its mask. Falls back gracefully when permission denied.
- **Perf**: pause canvas + orientation listeners when tab hidden / off-viewport; skip filters on `prefers-reduced-motion`.

## 6. New assets

Generate 6 ethereal creative-universe images with `imagegen` (organic blob-friendly, warm ivory + sage + subtle greenery; sculptural figures, still life, botanical fragments — matching the uploaded reference):

```
src/assets/universe/solara.jpg
src/assets/universe/lumen.jpg
src/assets/universe/obscura.jpg
src/assets/universe/noir.jpg
src/assets/universe/etherea.jpg
src/assets/universe/aether.jpg
```

Hero uses `etherea.jpg`. Not re-using existing Kinetic Lab work images.

## 7. i18n

Extend `src/lib/i18n.tsx` with all creative-universe strings (manifesto, project titles/descriptions, interaction lab captions, CTA labels) in UZ + EN — same discipline as v2.

## 8. Wiring

- `UniverseProvider` wraps `<main>` in `routes/index.tsx`; the `data-universe` attribute is set on `<html>` so tokens flip globally.
- Kinetic tree remains untouched; creative tree only mounts once `phase === "rebuild"` starts, unmounts on reverse.
- Body scroll locked during transition; restored + scrolled to top after.
- No new npm dependencies — pure React + CSS + SVG + canvas.

## Files

Create:
- `src/components/UniverseTransition.tsx`
- `src/lib/universe.tsx` (context/provider/hook)
- `src/components/universe/Nav.tsx`
- `src/components/universe/Hero.tsx`
- `src/components/universe/Manifesto.tsx`
- `src/components/universe/Works.tsx`
- `src/components/universe/InteractionLab.tsx`
- `src/components/universe/Footer.tsx`
- `src/components/universe/LiquidButton.tsx`
- `src/components/universe/MagneticCursor.tsx`
- `src/components/universe/Blob.tsx` (SVG mask helper)
- `src/assets/universe/*.jpg` (6 images)

Edit:
- `src/routes/index.tsx` — mount provider + conditional tree + transition overlay
- `src/routes/__root.tsx` — add serif font `<link>` tags
- `src/styles.css` — creative token block, goo filter, blob keyframes, transition keyframes
- `src/components/portfolio/Contact.tsx` — add "Enter Creative Universe" CTA
- `src/lib/i18n.tsx` — add creative strings

No backend, no new deps. Both universes localized, accessible, and reduced-motion safe.
