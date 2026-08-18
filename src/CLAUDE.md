# CLAUDE.md — Datathon 2K26 Project Guide

> This file gives AI coding assistants (Claude, Antigravity, etc.) the full context needed to work on this codebase safely and consistently.

---

## Project Overview

**Datathon 2K26** is a single-page hackathon showcase website for the inter-department competition hosted by the Department of Computer Science & Engineering (BDA & CC) at SRM Institute of Science & Technology, Ramapuram.

- **8 problem statements** across two tracks: *BDA & Cloud Computing* (4 challenges) and *Robotics* (3 challenges), plus 1 open challenge.
- Built as a **Next.js 16** app with React 19, Tailwind CSS v4, Framer Motion, and shadcn/ui.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.3.0 (App Router) |
| React | React 19 |
| Styling | Tailwind CSS v4 (`@import 'tailwindcss'`) + Vanilla CSS |
| Animations | Framer Motion 13 |
| UI Primitives | shadcn/ui + Base UI (`@base-ui/react`) |
| Icons | Lucide React |
| Fonts | Google Fonts via `next/font/google` — **Archivo** (display) + **Inter** (body) |
| Analytics | Vercel Analytics (production only) |
| Package Manager | pnpm |

---

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Design tokens (:root CSS vars) + global styles + chrome-text animation
│   ├── layout.tsx         # Root layout — fonts, metadata, viewport
│   └── page.tsx           # Main page — assembles all sections
├── components/
│   ├── background-waves.tsx   # SVG wave animation background (z-index 0, fixed)
│   ├── challenge-detail.tsx   # Modal/drawer for expanded challenge view
│   ├── challenge-index.tsx    # Scrollable index list of all 12 challenges
│   ├── challenge-section.tsx  # Individual challenge card/section
│   ├── college-logo.tsx       # Header college-logo slot (set COLLEGE_LOGO_SRC)
│   ├── custom-cursor.tsx      # Custom cursor (fine-pointer devices only)
│   ├── gallery.tsx            # Gallery grid (#gallery) — set `src` per item
│   ├── hero.tsx               # Hero section — chrome animated DATATHON/2K26 title
│   ├── illustrations.tsx      # All SVG illustrations (inline, typed)
│   ├── logo-strip.tsx         # Footer partner/sponsor logo band
│   ├── nav.tsx                # Top navigation
│   ├── open-challenge.tsx     # Open challenge (last-numbered) section
│   ├── register.tsx           # Register CTA (#register) — set REGISTRATION_URL
│   ├── scroll-progress.tsx    # Scroll progress indicator
│   ├── section-divider.tsx    # Large typographic dividers between tracks
│   ├── section-interstitial.tsx # Visual break between BDA and Robotics tracks
│   └── site-footer.tsx        # Footer
└── lib/
    └── challenges.ts      # All challenge data + accentColorMap
```

---

## Design System — CSS Variables

All colors are defined as CSS custom properties in [`src/app/globals.css`](src/app/globals.css) under `:root`. **Never hardcode hex colors in components** — always use these tokens via Tailwind classes.

### Current Theme: Dark Neon

```css
:root {
  color-scheme: dark;
  --background: #04080a;       /* Near-black base */
  --foreground: #e4fff4;       /* Mint-white text */
  --paper: #070e0c;            /* Section backgrounds */
  --ink: #e4fff4;              /* Primary text */
  --ink-muted: #39d98a;        /* Secondary/muted text */
  --line: #00ff88;             /* Divider lines */
  --card: #0c1a14;             /* Card backgrounds */
  --card-foreground: #e4fff4;  /* Card text */
  --border: #0d3324;           /* Borders */
  --ring: #00ff88;             /* Focus rings */
  --accent-red: #bf5fff;       /* Neon purple — challenges 01, 05, 11 */
  --accent-blue: #00e5ff;      /* Neon cyan — challenges 02, 07, 10 */
  --accent-green: #00ff88;     /* Neon green — challenges 03, 06, 09 */
  --accent-yellow: #ccff00;    /* Electric yellow — challenges 04, 08, 12 */
}
```

### Tailwind Color Utilities

These are mapped via `@theme inline` in globals.css:

| CSS Variable | Tailwind Class |
|---|---|
| `--background` | `bg-background` / `text-background` |
| `--foreground` | `text-foreground` |
| `--ink` | `text-ink` |
| `--ink-muted` | `text-ink-muted` |
| `--line` | `bg-line` / `border-line` |
| `--card` | `bg-card` |
| `--card-foreground` | `text-card-foreground` |
| `--border` | `border-border` |
| `--accent-green` | `text-accent-green` / `bg-accent-green` / `border-accent-green` |
| `--accent-blue` | `text-accent-blue` / `bg-accent-blue` / `border-accent-blue` |
| `--accent-red` | `text-accent-red` / `bg-accent-red` / `border-accent-red` |
| `--accent-yellow` | `text-accent-yellow` / `bg-accent-yellow` / `border-accent-yellow` |

### Fonts

```css
--font-sans: var(--font-inter)      → font-sans (body text)
--font-display: var(--font-archivo) → font-display (headings, numbers)
```

---

## Challenge Data — `src/lib/challenges.ts`

### Accent Color System

Each challenge has an `accent: AccentColor` field (`"red" | "blue" | "green" | "yellow"`). Components use `accentColorMap` to convert this to Tailwind classes:

```ts
export const accentColorMap: Record<AccentColor, { text: string; bg: string; border: string }> = {
  red:    { text: "text-accent-red",    bg: "bg-accent-red",    border: "border-accent-red" },
  blue:   { text: "text-accent-blue",   bg: "bg-accent-blue",   border: "border-accent-blue" },
  green:  { text: "text-accent-green",  bg: "bg-accent-green",  border: "border-accent-green" },
  yellow: { text: "text-accent-yellow", bg: "bg-accent-yellow", border: "border-accent-yellow" },
}
```

### Challenge Accent Assignments

| # | Challenge | Track | Accent |
|---|---|---|---|
| 01 | Software Release Readiness | BDA & CC | `red` (neon purple) |
| 02 | Sustainable Cloud Computing | BDA & CC | `green` (neon green) |
| 03 | Supply Chain Risk Intelligence | BDA & CC | `blue` (neon cyan) |
| 04 | Digital Product Feedback Intelligence | BDA & CC | `yellow` (electric yellow) |
| 05 | Selective Pesticide Spraying | Robotics | `green` (neon green) |
| 06 | Pipe Inspection with Defect Localization | Robotics | `blue` (neon cyan) |
| 07 | Autonomous Retrieval of Dropped Objects | Robotics | `red` (neon purple) |
| 08 | Open Challenge | Open | `yellow` (electric yellow) |

> Accents rotate so no two adjacent challenges share a colour (2 of each).

---

## Key Component Notes

### `BackgroundWaves`
- SVG with 7 sine-wave paths using native `<animateTransform>` (SVG user units — scales with `viewBox`)
- Fixed, `pointer-events: none`, `z-index: 0`
- **Do not** convert wave animation to CSS `transform` — pixel units won't scale with the SVG viewBox

### `Hero`
- `"DATATHON"` and `"2K26"` use the `.chrome-text` CSS class (animated metallic gradient)
- **Hover** → shimmer speed increases, white glow appears
- **Click** → `.chrome-flash` class applied for 500ms (explosive brightness)
- Entry animation uses Framer Motion `y` + `opacity` slide-up

### `ChallengeSection` / `ChallengeDetail`
- Both consume `accentColorMap` from `challenges.ts` — add new accent colors there, not inline

### `Nav`
- Inline nav appears at `lg` (not `md`) — 5 links plus the logo lockup will not fit at 768px
- Below `lg` the same links render in the full-screen mobile menu

### `CollegeLogo` / `LogoStrip` / `Gallery` / `Register`
- Each holds a single top-of-file constant or array to fill in later:
  `COLLEGE_LOGO_SRC`, `partnerLogos[].src`, `galleryItems[].src`, `REGISTRATION_URL`
- All render placeholders until those are set — no layout change when they are

### `CustomCursor`
- Only activates on `fine` pointer media devices (mouse, not touch)
- The `html.custom-cursor-active` CSS class hides the native cursor

---

## Development Commands

```bash
# Run dev server (from src/ directory)
npm run dev          # → http://localhost:3000

# Build for production
npm run build

# Lint
npm run lint
```

> ⚠️ The dev server runs from `src/`, not the repo root. The `package.json`, `next.config.mjs`, and `tsconfig.json` are all inside `src/`.

---

## Important Rules

1. **Color changes** → only edit CSS variables in `src/app/globals.css` `:root` block. Never hardcode colors in components.
2. **New challenges** → add to the `challenges` array in `src/lib/challenges.ts`. Set `accent` to one of the 4 valid values, and keep `number` sequential from `"01"`.
   Counts are derived (`totalCount`, `bdaCount`, `roboticsCount`, `openCount`, `pad2`) — **never hardcode a challenge count in a component**.
3. **New accent colors** → add the type to `AccentColor`, add the CSS variable in globals.css, and add to `accentColorMap`.
4. **Animations** → all entry animations use Framer Motion. Background animations use CSS keyframes or SVG `animateTransform`. Respect `prefers-reduced-motion` (handled globally in globals.css).
5. **TypeScript** → build errors are ignored (`ignoreBuildErrors: true`) but keep types correct.
6. **Images** → `next/image` with `unoptimized: true`. All illustrations are inline SVGs in `illustrations.tsx`.

---

## Next.js Version Warning

> This project uses **Next.js 16** which has breaking changes from earlier versions.
> Read `node_modules/next/dist/docs/` for current API conventions before writing any Next.js-specific code.
