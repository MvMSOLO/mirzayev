---
name: Lighthouse / Core Web Vitals optimization
description: Patterns for fixing CLS, LCP, FCP, and mobile paint bottlenecks in a React + Vite + Tailwind v4 + Framer Motion portfolio
---

## Anton display=optional + fallback fallback
`font-display: optional` + a metric-matched `@font-face` with `size-adjust` is the only reliable way to eliminate font-swap CLS for hugely scaled display fonts (Anton at 10rem/160px). `display=swap` at that size causes 0.6+ CLS because Anton's condensed metrics differ massively from `sans-serif`. The fallback uses local fonts (Impact, Arial Narrow, Arial Black) so it renders immediately.

**Why:** At 160px font-size, even a 5% width difference per character multiplies to dozens of pixels of shift across a name line. `swap` never converges because the fallback text is replaced. `optional` + matched fallback means the user always sees the correct layout; Anton loads only for repeat visits (via cache).

**How to apply:** Any display-font-heavy hero section using `font-display: swap` at >4rem should use `optional` + a local-font fallback with `size-adjust` tuned to the font's UPM. Use glyphs.space or FontDrop to measure the target font's metrics.

## React.lazy() on TanStack Start + SSR
TanStack Start (Vite + H3 + SSR) handles `React.lazy()` fine, but the import pattern matters:
- Static components that SSR-render must be eager imports (Hero, Nav, About).
- Below-fold components use `React.lazy(() => import("path").then(m => ({ default: m.ComponentName })))`.
- Wrap in `<Suspense fallback={null}>` so they don't delay the initial SSR stream.
- The existing `LazySection` (IntersectionObserver + mounted guard) is still needed on top of lazy — lazy defers code download, LazySection defers mount + prevents CLS.

**Why:** Without `React.lazy()`, all 25+ components bundle into one initial JS chunk, blocking FCP/LCP on mobile by 2+ seconds.

## backdrop-filter blur on mobile
`backdrop-filter: blur(64px)` (Tailwind `backdrop-blur-3xl`) costs 30-80ms of GPU time per paint frame on mobile. Above the fold this blocks LCP. The fix is either:
- Cap with `@media (max-width: 767px)` to `blur(8px)` via `.glass, [class*="glass"]` selector with `!important`
- Or use responsive Tailwind variants: `backdrop-blur-md lg:backdrop-blur-3xl`

## CSS `filter: blur()` transitions trigger paint
Animating `filter: blur()` is not compositor-thread-only — it triggers paint on every frame. `opacity + transform` are compositor-only and achieve the same reveal effect. This applies to `section-fade-in` and similar scroll-reveal animations.

## Film grain animation cost
A `position: fixed` full-viewport SVG feTurbulence grain animated with `animation: grain-shift 0.35s steps(1) infinite` triggers paint ~3×/sec on every visible scroll chunk. Slowing to `0.5s` + adding `will-change: transform` pushes it to its own GPU layer and reduces paint ticks.

## Hydration-safe random/date on SSR
`Math.random()` or `new Date()` in `useState(() => ...)` initializer causes SSR/client mismatch → React tears down and re-renders the entire tree. Fix: use a stable SSR placeholder, then set the real value in `useEffect([])` (client-only). Same pattern for `useState("")` → use a fixed-width placeholder like `useState("00:00:00 UTC")`.
