# Project Overview

**AVAZBEK / 16** — A dual-mode interactive portfolio by Avazbek Mirzayev. Features two visual worlds:
- **Kinetic mode** (dark "Technical Lab" aesthetic, grid patterns, coordinate tracking)
- **Universe mode** (light organic aesthetic, fluid typography, "digital alchemy")

Multi-language (UZ/EN), music player, GSAP/Framer Motion/Three.js animations, and SSR via TanStack Start.

Originally created and exported from Lovable; now running on Replit with Supabase as the backend.

## Stack
- Vite + `@lovable.dev/vite-tanstack-config` (wraps TanStack Start, Tailwind v4, tsconfig-paths, Nitro)
- React 19, TanStack Router/Start, React Query
- Supabase (`@supabase/supabase-js`) — credentials in `.env` (already present from the Lovable export)
- shadcn/Radix UI components, Tailwind CSS v4
- Package manager: bun (`bun.lock` present)

## Running on Replit
- Dev server: workflow "Start application" runs `bun run dev` (= `vite dev`), serving on port 5000.
- `vite.config.ts` overrides the Lovable config's default `server` (host `::`, port 8080 — not supported on Replit's container network) to bind `0.0.0.0:5000` with `allowedHosts: true` so the Replit preview proxy can reach it. Do not remove this override.
- Supabase env vars (`VITE_SUPABASE_*`, `SUPABASE_*`) are already set in `.env` from the original export.

## User preferences
None recorded yet.
