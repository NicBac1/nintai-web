# Nintai — Experiencias Psicoeducativas

A small, calm, professional marketing site for **Nintai**, a Colombian psychoeducational practice. Built with Astro 4, Tailwind, and TypeScript. Hosted on **Netlify** (forms included).

## Local development

```bash
npm install
npm run dev      # http://localhost:4321/
npm run check    # types + content collections + .astro syntax
npm run build    # outputs to ./dist
npm run preview  # serves ./dist locally
```

## Project layout

```
src/
├── assets/photos/       workshop photos (processed via Astro <Image />)
├── components/
│   ├── layout/          Header, Footer, FloatingWhatsApp
│   ├── ui/              Section, Pill
│   ├── booking/         BookingCTA — WhatsApp CTAs
│   ├── events/          EventCard, PastEventCard
│   ├── services/        ServiceSection
│   └── subscribe/       SubscribeForm (Netlify Forms)
├── content/             markdown-driven content collections (events, services, pillars)
├── layouts/             BaseLayout
├── lib/                 siteConfig, buildWhatsappUrl
├── pages/               one file per route
└── styles/              global.css (tokens, base, components)
public/
└── logo/nintai.webp     brochure logo (png favicon sibling)
docs/superpowers/
├── specs/               approved design spec
└── plans/               implementation plans
netlify.toml             build + publish settings
```

## Editing content

- **Events:** add a markdown file to `src/content/events/`. The schema in `src/content/config.ts` documents every field.
- **Services:** edit the three files in `src/content/services/` — one per audience (Personas, Comunidades educativas, Empresas).
- **Pillars:** edit `src/content/pillars/`.
- **Site-wide config** (WhatsApp number, email, locations, Instagram handle): `src/lib/site.ts`.
- **Pre-filled WhatsApp messages per audience:** `src/lib/whatsapp.ts`.
- **Lucide icons:** any new icon name must also be added to `astro.config.mjs > integrations > icon.include.lucide`.

## Deploy (Netlify)

1. Push this repo to GitHub (already at `NicBac1/nintai-web`).
2. In [Netlify](https://app.netlify.com): **Add new site → Import an existing project → GitHub → nintai-web**.
3. Build settings are read from `netlify.toml` (`npm run build` → `dist`). Leave them as detected.
4. Deploy. You’ll get a URL like `https://<random-name>.netlify.app`.
5. Optional: Site settings → **Domain management** → set a custom domain, and set env `SITE_URL` to that domain.
6. **Forms:** after the first deploy, open **Forms** in the Netlify UI. Submissions for `contact` and `subscribe` appear there; enable email notifications under form settings.

Local `astro dev` cannot receive Netlify Forms — submissions only work on the deployed Netlify site.

## Forms

- Contact (`/contacto`) and subscribe (footer + `/eventos`) post to **Netlify Forms**.
- After submit, visitors land on `/gracias`.
- WhatsApp buttons remain available as a faster direct channel.

## Phase 1 and beyond

See `docs/superpowers/specs/2026-05-13-nintai-website-design.md` section 9 for Decap CMS, Brevo, Cal.com, Wompi, etc.

## Pinned dependency note

`@astrojs/sitemap` is pinned to `3.3.1` rather than the latest 3.x. Versions ≥ 3.4.0 use the `astro:routes:resolved` hook which only exists in Astro 5+. When this project is upgraded to Astro 5, the pin can be relaxed.
