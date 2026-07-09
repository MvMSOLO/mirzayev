# AVAZBEK / 16 — Experimental Lab & Creative Universe

An advanced, dual-mode portfolio system built with the cutting-edge React ecosystem. This project showcases the intersection of technical precision and creative expression through two distinct visual worlds: **Kinetic (Experimental Lab)** and **Universe (Creative World)**.

## 🚀 Vision & Concept

This is not just a portfolio; it's a digital experience designed to push the boundaries of modern web development.

- **Kinetic Mode (Experimental Lab):** A dark-themed, "Technical Lab" aesthetic featuring grid patterns, coordinate tracking, scanning animations, and a high-tech vibe. It focuses on technical capabilities, AI-driven concepts, and performance-first architecture.
- **Universe Mode (Creative World):** A light-themed, organic aesthetic featuring fluid transitions, sophisticated typography (Inter Tight & Instrument Serif), and "digital alchemy." It focuses on design philosophy, interactive art, and human-centered experiences.

---

## 🛠 Tech Stack

The project leverages the latest tools in the React ecosystem for maximum performance and developer experience:

- **Framework:** [React 19](https://react.dev/) (latest features & performance)
- **Routing:** [TanStack Router](https://tanstack.com/router) & [TanStack Start](https://tanstack.com/start) (Full-stack React framework with type-safe routing)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (using the new `@utility` and `@theme` directives)
- **Animations:**
  - [Framer Motion v12](https://www.framer.com/motion/) (complex UI transitions & staggered reveals)
  - [GSAP](https://gsap.com/) (high-performance timeline animations)
  - [Three.js](https://threejs.org/) & [React Three Fiber](https://r3f.docs.pmnd.rs/) (3D elements & particle fields)
- **State & Data:** [TanStack Query](https://tanstack.com/query), [Zod](https://zod.dev/), [React Hook Form](https://react-hook-form.com/)
- **Backend/DB:** [Supabase](https://supabase.com/)
- **Audio:** [Howler.js](https://howlerjs.com/) for immersive soundscapes
- **Runtime:** [Bun](https://bun.sh/) (Fast package management and execution)

---

## ✨ Key Features

### 1. Dual-Mode Identity
Managed by a custom `UniverseProvider`, the site can transition between two entirely different themes and layouts with sophisticated "deconstruction" and "rebuild" animations.

### 2. Multi-language (i18n)
Full support for **Uzbek (UZ)** and **English (EN)** via a custom lightweight i18n system (`src/lib/i18n.tsx`). Transitions between languages are animated with a cinematic "wipe" effect.

### 3. Future Compiler
An interactive AI-driven concept component where users can input prompts to "initialize builds" of digital concepts, simulating a neural network analysis.

### 4. Technical Lab UI
Features custom grid backgrounds (`bg-grid-blueprint`), `TechnicalOverlay` with coordinate tracking, and a mobile-first design that maintains consistency across all devices.

### 5. Immersive Music Player
A custom-built music player integrated with the UI, allowing users to search and play tracks while exploring the different modes of the portfolio.

### 6. High-Performance Animations
Optimized animations using hardware acceleration, custom cubic-beziers (e.g., `[0.16, 1, 0.3, 1]`), and `whileInView` triggers for a smooth, professional feel.

---

## 📁 Architecture

```text
src/
├── components/
│   ├── portfolio/    # Kinetic (Lab) mode components
│   ├── universe/     # Creative mode components
│   └── ui/           # Shared Radix-based UI components
├── lib/
│   ├── i18n.tsx      # Multi-language dictionary & logic
│   ├── universe.tsx  # Mode transition & state management
│   └── utils.ts      # Helper functions
├── routes/           # File-based routing (TanStack Router)
├── integrations/     # Supabase & external services
└── styles.css        # Tailwind v4 configuration & keyframes
```

---

## 🚦 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) installed on your machine.

### Installation
```bash
bun install
```

### Development
```bash
bun run dev
```

### Build
```bash
bun run build
```

---

## ☁️ Deployment (Vercel)

For the best experience on Vercel, use the following settings:

- **Framework Preset:** `Other`
- **Build Command:** `bun run build`
- **Output Directory:** `.output`
- **Install Command:** `bun install`

> **Note:** Ensure you have the `NITRO_PRESET=vercel` environment variable set if the build does not automatically detect the environment.

---

## 📜 Development Guidelines (AGENTS.md)
- **Padding:** Use `lg:px-32` for main portfolio sections to ensure alignment.
- **Hydration:** All dynamic logic (dates, random numbers) must be in `useEffect`.
- **Aesthetic:** Maintain the "Technical Lab" vibe for Kinetic and "Organic/Minimal" for Universe.
- **Animations:** Keep them sophisticated; avoid "flashy" or distracting styles.

Created with ⚡ by **Avazbek Mirzayev** | 2026
