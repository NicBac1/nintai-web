# Nintai — Experiencias Psicoeducativas

A small, calm, professional marketing site for **Nintai**, a Colombian psychoeducational practice. Built with Astro 4, Tailwind, and TypeScript. This is Phase 0 of the rollout (see `docs/superpowers/specs/2026-05-13-nintai-website-design.md`).

## Local development

```bash
npm install
npm run dev      # http://localhost:4321/nintai-web/
npm run check    # types + content collections + .astro syntax
npm run build    # outputs to ./dist
npm run preview  # serves ./dist locally
```

> Note: the dev server lives under the base path `/nintai-web/` because Phase 0 deploys as a GitHub Pages project site. When migrating to a custom domain in Phase 1, change `base: '/'` and `site` in `astro.config.mjs`.

## Project layout

```
src/
├── assets/photos/       workshop photos (processed via Astro <Image />)
├── components/
│   ├── layout/          Header, Footer, FloatingWhatsApp
│   ├── ui/              Section, Pill
│   ├── booking/         BookingCTA — single source of truth for WhatsApp / booking
│   ├── events/          EventCard, PastEventCard
│   ├── services/        ServiceSection
│   └── subscribe/       SubscribeForm
├── content/             markdown-driven content collections (events, services, pillars)
├── layouts/             BaseLayout
├── lib/                 siteConfig, buildWhatsappUrl
├── pages/               one file per route
└── styles/              global.css (tokens, base, components)
public/
└── logo/nintai.svg      provided logo
docs/superpowers/
├── specs/               approved design spec
└── plans/               implementation plans
.github/workflows/
└── deploy.yml           build + publish to GitHub Pages
```

## Editing content

- **Events:** add a markdown file to `src/content/events/`. The schema in `src/content/config.ts` documents every field.
- **Services:** edit the four files in `src/content/services/` — one per audience.
- **Pillars:** edit `src/content/pillars/`.
- **Site-wide config** (WhatsApp number, email, locations, Instagram handle): `src/lib/site.ts`.
- **Pre-filled WhatsApp messages per audience:** `src/lib/whatsapp.ts`.
- **Lucide icons:** any new icon name must also be added to `astro.config.mjs > integrations > icon.include.lucide`.

## Deploy (GitHub Pages)

Before the first deploy:

1. Open `astro.config.mjs` and replace `GITHUB_USER = 'CHANGE-ME-GITHUB-USERNAME'` with your real GitHub username.
2. Push the repo to GitHub as `nintai-web` (the slug must match `REPO_NAME` in `astro.config.mjs`).
3. In the repo on GitHub: **Settings → Pages → Source: GitHub Actions**.
4. Push to `main`. The workflow at `.github/workflows/deploy.yml` does the rest.

The site will be available at `https://<your-username>.github.io/nintai-web/`.

## Things still using placeholders (intentional for the demo)

- `GITHUB_USER` in `astro.config.mjs` — must be set before the first deploy.
- `siteConfig.formspreeEndpoint` in `src/lib/site.ts` — replace with a real Formspree form id to receive contact + subscribe submissions, or wait for Phase 1 (Netlify Forms + Brevo).
- Bodies of `src/content/pillars/*.md` and `src/content/services/*.md` are short. The homepage and `/servicios` only use frontmatter, so longer prose is optional polish for `/sobre-nintai`.

## Phase 1 and beyond

See `docs/superpowers/specs/2026-05-13-nintai-website-design.md` section 9 for the full phased rollout (Netlify migration, Decap CMS, Brevo email automation, Cal.com booking, Wompi payments, WhatsApp automation).

## Pinned dependency note

`@astrojs/sitemap` is pinned to `3.3.1` rather than the latest 3.x. Versions ≥ 3.4.0 use the `astro:routes:resolved` hook which only exists in Astro 5+. When this project is upgraded to Astro 5 (Phase 1 candidate), the pin can be relaxed.
