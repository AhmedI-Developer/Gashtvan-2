# Gashtvan Marketing Website

Premium travel & tourism marketing site for **Gashtvan** (Erbil, Kurdistan Region, Iraq).

## Stack

- React + Vite
- Tailwind CSS v4 (theme tokens via CSS variables + `data-theme`)
- Framer Motion, GSAP + ScrollTrigger, Lenis
- React Router, react-helmet-async
- Offers data from `src/data/offers.json` (or `VITE_API_URL`)

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Theme

- Controlled by `data-theme="dark|light"` on `<html>`
- Inline script in `index.html` prevents flash (reads `localStorage` / `prefers-color-scheme`)
- Toggle lives in the navbar

## Languages

- Selector in the navbar: English, Arabic, Kurdish (Sorani)
- Choice persists in `localStorage` (`gashtvan-lang`)
- RTL is applied automatically for `ar` / `ckb`
- UI strings live in `src/i18n/locales/*.json`

## Preloaders

- Original shape animation: `src/components/layout/preloaders/ShapePreloader.jsx`
- Plane animation (active): `src/components/layout/preloaders/PlanePreloader.jsx`
- Switch via `ACTIVE_VARIANT` in `src/components/layout/Preloader.jsx` (`'plane'` | `'shape'`)
- Shown once per session; clear `sessionStorage.gashtvan-preloader-seen` to preview again

## Edit contact & brand microcopy

Update **`src/config/site.js`** only (phones, emails, address, hours, social, tagline).

## Edit company profile copy

Update **`src/content/company.js`**.

> Important: the original brief’s “COMPANY CONTENT” block was not pasted. Current copy uses only facts stated in the brief. Replace with your verbatim profile / vision / mission / services / management text when ready.

## Add or edit offers

1. Open **`src/data/offers.json`**
2. Add an object matching the schema (see existing entries)
3. Required fields: `id`, `slug`, `title`, `category`, `destination`, `shortDescription`, `fullDescription`, `coverImage`, `gallery`, `validFrom`, `validUntil`, `includes`, `excludes`, `terms`, `contactCTA`
4. Optional: `price`, `oldPrice`, `currency`, `badge`, `duration`, `itinerary`
5. Expired offers (`validUntil` in the past) hide automatically

### Remote offers API (optional)

Set in `.env`:

```
VITE_API_URL=https://example.com/api/offers
```

The response must be an array of offers (or `{ "offers": [...] }`) matching the same schema.

## Deploy

Build with `npm run build` and deploy the `dist/` folder to any static host (Vercel, Netlify, Cloudflare Pages, S3+CDN). Ensure SPA fallback routes `/offers/*` to `index.html`.

## Brand rules (summary)

- Colors: navy `#04203A`, accent `#A0C23A`, white, navy-tinted grays only
- Green only for CTAs, hovers, motion accents, active states — never large backgrounds or body text
- Logo G uses `--logo-g` (white in dark / navy in light); accent shape stays green
