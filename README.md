# REPLIDEX

**Maverick Hunter Tactical Database** — an immersive, in-universe tactical companion for the _Mega Man X_ universe. A "Pokédex for Mega Man X" that feels like a Maverick Hunter command terminal.

> Design principle: **Sci-fi outside, modern app inside.** Tactical/HUD aesthetics, but usability, readability, and responsiveness come first.

MVP covers **Mega Man X1**, architected so X2–X8 can be added without rewrites.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first design tokens)
- **Zustand** + `localStorage` persistence · **Zod**-ready domain layer
- **Framer Motion** (subtle transitions) · **lucide-react**
- PWA: web manifest + service worker (offline app shell)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Quality gates:

```bash
npx tsc --noEmit   # typecheck
npx eslint .       # lint
npm run build      # production build
```

> The service worker is registered in **production only**. To exercise offline mode: `npm run build && npm run start`, then toggle offline in DevTools.

## Screens

| Route | Screen | Notes |
| --- | --- | --- |
| `/` | Command | Tactical globe, live stats, current hunt, next recommended target |
| `/targets` | Target Database | Search + Series/Element/Status filters |
| `/targets/[slug]` | Target Dossier | Weakness/reward, abilities, stage intel, weakness chain |
| `/route` | Hunter Route | Beginner / Boss-Weakness modes, live locked→available→complete |
| `/intel` | Intel Hub | Briefings · Comm-Link · Tactical Logs (logs generated from progress) |
| `/archive` | Archive | Category grid + weapon/character codex |
| `/archive/blueprints` | Blueprint Archive | Entity-type filters |
| `/archive/blueprints/[slug]` | Blueprint Viewer | SVG schematics, clickable callouts, inspector |

## Structure

```
src/
  app/            # routes (App Router)
  components/replidex/   # tactical UI system (TacticalPanel, BlueprintViewer, …)
  data/x1/        # X1 dataset (mavericks, weapons, stages, characters, blueprints, intel)
  domain/types.ts # presentation-agnostic domain model
  services/       # weaknessGraph, recommendations, progress, logs (pure functions)
  stores/         # progress.store.ts (Zustand + localStorage)
  lib/            # elements, cn helper
```

### Design principles baked in

- **Data is separate from UI.** All lore lives in `src/data`; components render from it.
- **Relationships are computed, not hardcoded.** Weakness chains and route recommendations are derived by `services/`, never authored as UI text or arrows.
- **One shared progress store** drives the dashboard, target cards, route, intel logs, and completion %.
- **No copyrighted sprites.** Portraits are glyphs on blueprint tiles; schematics are generated SVG.

## Roadmap

- ✅ **Phase 1** — Design tokens, app shell, X1 data, Command / Targets / Dossier
- ✅ **Phase 2** — Progress tracking, weakness graph, Hunter Route + recommendations
- ✅ **Phase 3** — Intel Hub, Archive, Blueprint Archive + Viewer
- ✅ **Phase 4** — PWA (manifest + service worker), accessibility, motion
- ⏭️ **Next** — Expand to X2–X8; optional Supabase-backed cloud progress
