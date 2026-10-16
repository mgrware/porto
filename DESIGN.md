# Design direction: Systems Blueprint

This file records the direction the site already has, so later changes keep it. It was written down from the existing code, not invented. The owner can edit anything here. Where this file and the code disagree, fix one of them on purpose.

**Reading:** a portfolio sheet set for recruiters and engineering leads hiring a senior backend engineer, drawn as a set of engineering drawings.

**Dial:** ENERGY 2 / RHYTHM 2 / MOTION 1

## Identity

The portfolio is a set of drawing sheets. Each page is a numbered sheet (`SHEET 01` to `06`). Projects are drawings with a drawing number (`GR-PRJ-2025-01`). Blog posts are entries in a revision log. The footer is the title block.

The metaphor fits the claim the site makes: backend work that is specified, dimensioned, and checkable. Keep it consistent. Every label that looks like drawing metadata has to match the real structure (sheet numbers, counts, years).

## Decisions and reasons

| Decision | Reason |
|---|---|
| **Palette:** navy ground, amber accent, steel blue secondary | Blueprint paper and a drafting marker. Amber is the single accent: primary actions, sheet numbers, the current item. Steel blue is for secondary text and tags. |
| **Dark by default, light variant, working toggle** | The blueprint is dark by nature. The light theme is "the same drawing on white paper", with amber and blue darkened to keep contrast. Both themes have to work. |
| **Tokens in `app/assets/css/main.css`** | RGB triplets, so Tailwind opacity modifiers work in both themes. Never hard-code hex values in components. |
| **Contrast** | `--outline` is the lowest-contrast text token. It must stay at 4.5:1 or more against `surface-container-high` in both themes. Check before changing any text color. |
| **Space Grotesk for headings** | Mechanical, engineered letterforms that read like lettering on a drawing, with enough personality for the name and titles. |
| **IBM Plex Sans for body** | Sober, very legible at length, and pairs with Plex Mono. |
| **IBM Plex Mono for labels and metadata** | Drawing annotations: sheet numbers, dates, tags, specs. Short labels are uppercase with wide tracking because they imitate stencilled drawing text. Never use it for paragraphs or headings. |
| **Zero border radius everywhere** | Drafting is done with straight edges. `tailwind.config.ts` zeroes the radius scale. Don't add `rounded-2xl`/`3xl`/`[...]`. |
| **No shadows, no glow, no glassmorphism** | A drawing is flat. Hierarchy comes from line weight (`border-2` for major rules, `border` for minor) and fill tone. The one exception is the navbar's light `backdrop-blur-sm`, so content scrolling under it stays legible. |
| **Drafting grid background (`bp-grid`)** | It is the paper the sheets are drawn on. It is the one background texture. Don't add others. |
| **Hatching (`bp-hatch`)** | Marks a plate with no image supplied yet, the way unsupplied details are hatched on a drawing. |
| **Corner marks on framed figures** | Registration marks on a sheet. They are the repeated identity motif. Use them on figures and the login card, not on every box. |
| **Layout: ruled lists and tables, not card grids** | Content is read like a drawing index: rows separated by rules, metadata in the left column. The tech stack is the only grid of equal cells, because it is literally a parts list. |
| **Icons: Material Symbols, used sparingly** | Only where the icon is the clearest label (theme, zoom, edit, delete). Directional arrows only where they say where you go: ↓ to an anchor, ↗ external, ← back. |
| **Motion (MOTION 1)** | A one-time fade and rise as sections enter (`v-reveal`), color transitions on hover, and a pulsing dot only for the real "open to roles" status. Everything stops under `prefers-reduced-motion`. |
| **Loader** | A dimension line being measured, in theme tokens. No spinners with glow. |

## Content rules

- Every figure on the site comes from the experience log (the CV), and the hero cites the source of each one. No made-up uptime, latency, or "live" status.
- No em dashes in UI text. Date ranges use an en dash (`Mar 2022 – Feb 2026`). Label separators use `·`.
- Admin screens use plain sentence-case copy ("Save changes", "New entry"), not SNAKE_CASE terminal speak.

## Admin area

Login and the dashboard use the same system as the public sheets: `AdminHeading`, `AdminSearch`, and the `admin-input`, `admin-label`, and `admin-icon-btn` classes in `main.css`. Controls are at least 44px tall.
