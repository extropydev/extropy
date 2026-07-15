# extropy.dev

Personal brand site for **extropy** — fullstack web engineering by Maksim.
Warm-paper minimalism, a hand-drawn animated lotus identity, and content in
four languages (EN · NL · RU · UK).

## Stack

- **Next.js** (App Router, React Server Components, static generation)
- **TypeScript** everywhere
- **Tailwind CSS 4** with design tokens in `globals.css`
- **next-intl** — locale routing (`/`, `/nl`, `/ru`, `/uk`)
- **motion** — reveal/bloom animations (with `prefers-reduced-motion` support)
- No icon libraries: every icon is a hand-drawn SVG in `src/components/icons`

## Structure

```
src/
  app/[locale]/          Pages: home, notes, notes/[slug], about, contact
  components/
    brand/               Lotus mark: shared geometry, static + animated variants
    icons/               Custom animated icon set (currentColor, CSS-driven)
    home/                Home page sections (hero, principles, stack, …)
    notes/               Field-notes ledger row + code block
    layout/              Header, footer, locale switcher, live clock
    ui/                  Reveal, section label — small shared primitives
  content/notes/         Field notes: typed model, per-locale dictionaries, snippets
  messages/              UI copy per locale (en/nl/ru/uk.json)
  i18n/                  next-intl routing/request config
  lib/                   site constants, tiny utilities
```

## Concepts

- **Five petals = five principles.** The lotus mark carries one petal per
  principle of extropianism; the home page section is interactive.
- **Field notes** replace a portfolio grid: five client worries (payments,
  auth, cart, responsive, performance) → how each is engineered away.

## Commands

```bash
npm run dev     # local dev server
npm run build   # production build (all routes statically generated)
npm run lint    # eslint
```

Editing content: UI copy lives in `src/messages/*.json`; long-form field-note
content in `src/content/notes/{en,nl,ru,uk}.ts`; links and email in
`src/lib/site.ts`.
