# replit.md

## Overview

This is a Vietnamese driving school landing page for **Trung Tâm Đào Tạo và Sát Hạch Lái Xe Thành Công** (Thanh Cong Driving Training and Testing Center). The application is a high-conversion marketing landing page showcasing driving courses (B-Auto, B-Manual, C1), enrollment process, schedules, and contact information.

The app is a full-stack TypeScript project using React on the frontend and Express.js on the backend, sharing types through a common `shared/` directory. It currently uses PostgreSQL via Drizzle ORM, though the main feature is the frontend landing page.

---

## User Preferences

Preferred communication style: Simple, everyday language.

---

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, bootstrapped via Vite
- **Routing**: `wouter` — lightweight client-side routing; only two routes exist (`/` → Home landing page, `*` → 404)
- **State & Data Fetching**: TanStack React Query (`@tanstack/react-query`) with a custom `apiRequest` helper and `getQueryFn` wrapper
- **UI Components**: shadcn/ui component library (New York style) built on top of Radix UI primitives — full set of components available in `client/src/components/ui/`
- **Styling**: Tailwind CSS with CSS variables for theming; custom brand colors defined in `index.css` and `tailwind.config.ts`
- **Animation**: Framer Motion for scroll-triggered fade-up animations on the home page
- **Typography**: Google Fonts — `Be Vietnam Pro` (body), `Playfair Display` (headings), `Space Mono` (numeric stats)
- **Brand Colors**:
  - Primary (Crimson Red): `#C8102E` / `hsl(355 85% 45%)`
  - Dark Navy: `#1A1A2E`
  - Gold accent: `#F0A500`
  - Warm white background: `#F8F6F2`
- **Entry point**: `client/src/main.tsx` → `App.tsx` → `Router` → pages

### Backend Architecture
- **Framework**: Express.js 5 with TypeScript, run via `tsx`
- **Server entry**: `server/index.ts` creates HTTP server, registers routes, serves static files in production or Vite dev middleware in development
- **Routes**: Defined in `server/routes.ts` — currently empty (ready for API endpoints to be added under `/api/`)
- **Storage**: `server/storage.ts` exports a `MemStorage` class implementing `IStorage` interface. Currently uses in-memory Maps. Can be swapped for a database-backed implementation
- **Static serving**: In production, serves built files from `dist/public/`. In development, uses Vite middleware (`server/vite.ts`)

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: `shared/schema.ts` — currently only a `users` table with `id`, `username`, `password` fields
- **Config**: `drizzle.config.ts` reads `DATABASE_URL` env variable; migrations stored in `./migrations/`
- **Current storage**: `MemStorage` is used at runtime (not the DB yet) — to switch to Postgres, implement a `DatabaseStorage` class using `drizzle-orm`

### Shared Code
- `shared/schema.ts` contains Drizzle table definitions, Zod validation schemas, and TypeScript types used by both frontend and backend
- TypeScript paths configured: `@/` → `client/src/`, `@shared/` → `shared/`

### Build System
- **Dev**: `tsx server/index.ts` with Vite dev server as middleware (HMR enabled)
- **Production build**: Custom `script/build.ts` — runs Vite for client, then esbuild for server (bundles select deps, externalizes the rest)
- **Output**: `dist/public/` (client), `dist/index.cjs` (server)

---

## External Dependencies

### UI & Component Libraries
- **Radix UI** — full suite of headless primitives (accordion, dialog, select, tabs, etc.)
- **shadcn/ui** — styled component wrappers over Radix (New York style)
- **Framer Motion** — animation library used for scroll-triggered effects on the landing page
- **Embla Carousel** — carousel/slider component
- **Lucide React** — icon set

### Forms & Validation
- **React Hook Form** + `@hookform/resolvers` — form state management
- **Zod** + `drizzle-zod` — schema validation shared between frontend and backend

### Database & ORM
- **Drizzle ORM** (`drizzle-orm`, `drizzle-kit`) — type-safe ORM for PostgreSQL
- **`pg`** — PostgreSQL Node.js driver
- **`connect-pg-simple`** — PostgreSQL-backed session store (for Express sessions)
- Requires `DATABASE_URL` environment variable to be set

### Fonts
- **Google Fonts** (loaded via CDN in `client/index.html`):
  - `Be Vietnam Pro` — optimized for Vietnamese text
  - `Playfair Display` — serif for headings
  - `Space Mono` — monospace for stats/numbers

### Replit-Specific Plugins (dev only)
- `@replit/vite-plugin-runtime-error-modal` — shows runtime errors as overlay
- `@replit/vite-plugin-cartographer` — Replit code navigation
- `@replit/vite-plugin-dev-banner` — dev environment banner

### Utilities
- `date-fns` — date formatting
- `clsx` + `tailwind-merge` — conditional className utilities
- `nanoid` — unique ID generation
- `wouter` — client-side routing
- `vaul` — drawer component primitive
- `recharts` — charting (chart.tsx component available)
- `cmdk` — command palette component