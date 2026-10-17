# Gashtvan Marketing Website

Premium travel & tourism marketing site for **Gashtvan** (Erbil, Kurdistan Region, Iraq).

## Stack

- React + Vite
- Tailwind CSS v4 (theme tokens via CSS variables + `data-theme`)
- Framer Motion, GSAP + ScrollTrigger, Lenis
- React Router, react-helmet-async
- Offers, destinations, and news from the Laravel API (`/api`, proxied in dev)

## Run

```bash
npm install
npm run dev
```

Backend should be running on `http://127.0.0.1:8000` (Vite proxies `/api` and `/storage`).

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

Update **`src/content/company.js`** (and `company.ar.js` / `company.ckb.js`).

## Add or edit offers

Use the admin panel (`/admin`) or the Laravel API. Offer images are stored in backend public storage (`/storage/offers/...`).

## Deploy

Build with `npm run build` and deploy the `dist/` folder to any static host (Vercel, Netlify, Cloudflare Pages, S3+CDN). Ensure SPA fallback routes `/offers/*` to `index.html`. Point API/`storage` at the Laravel backend.

## Brand rules (summary)

See design tokens in `src/styles/index.css` and established section patterns under `src/components/sections/`.
