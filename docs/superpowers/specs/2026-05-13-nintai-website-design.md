# Nintai Website — Design Spec

> **Status:** Approved design, ready for implementation planning
> **Date:** 2026-05-13
> **Owner:** Nick B. (developer); Nintai (client)

## 1. Overview

A small, calm, professional marketing website for **Nintai — Experiencias Psicoeducativas**, a Colombian psychoeducational practice run by a solo psychologist working with educational communities, families, organizations, and individuals. The site extends her established Instagram brand (`@psico_nintai`) into a web presence that builds trust, surfaces upcoming workshops, and routes prospective clients to a conversation with her.

**Vision:** When a school director or parent lands on the site, in the first few seconds they should feel exactly what her Instagram feed feels like — calm, warm, professional, and human — and within one click know how to reach her.

## 2. Goals & success criteria

**Primary goals:**

1. Establish a trustworthy, brand-consistent online presence that mirrors her Instagram identity.
2. Generate qualified leads (conversations) for institutional and individual services via WhatsApp.
3. Showcase upcoming and past workshops as social proof.
4. Let her grow a subscriber list (email, optionally WhatsApp) from day one for future event announcements.
5. Be scalable: support future online booking, online payments, and WhatsApp automation without a rewrite.

**Success criteria:**

- Lighthouse Performance ≥ 95 on mobile
- Visually indistinguishable from her Instagram in tone/feel
- She can publish a new event end-to-end without developer involvement (post-Phase 1)
- 5-page site loads under 1.8s LCP on a Colombian 4G connection
- WCAG AA accessibility baseline
- Subscriber list grows from day one of launch

**Non-goals (YAGNI):**

- Multi-language (Spanish-only for Colombia)
- User accounts / client portal
- Dark mode
- Native mobile app
- Blog at launch (deferrable)
- Real-time chat widget

## 3. Context & research

### 3.1 Brand assets in hand

From her Instagram posts and provided SVG:

- **Logotype:** "Nintai" in serif with a hand-drawn flourish over the "ñ" and a curved underline (provided as `gemini-svg.svg`, brand color `#658266`)
- **Tagline:** *"Cultivamos bienestar, impulsamos transformación"*
- **Sub-wordmark:** *"EXPERIENCIAS PSICOEDUCATIVAS"* in wide-tracked uppercase sans
- **Four brand pillars:** Bienestar Emocional, Vínculos Saludables, Reflexión Consciente, Transformación Sostenible (each currently associated with an emoji on Instagram: 🌿 🤝 🧠 ✨)
- **Four audience segments:** Comunidades educativas · Familias · Organizaciones · Procesos individuales
- **Geographic coverage:** Bogotá + Fusagasugá (presencial), plus virtual
- **Existing channels:** Instagram `@psico_nintai`, WhatsApp `wa.me/573154336209`
- **Real photography:** five workshop photos (teacher-wellbeing workshops with stretching, group exercises, chalkboard session, group lunch) plus the "reflective space" team photo
- **Recent campaign:** *"El arte de cuidar a quien educa"* — teacher-wellbeing workshop

### 3.2 Peer analysis (Colombia / LATAM psychoeducational sites)

Reviewed: K&V PsicoEduca, Johana Ortiz Psicoeducación, Pedagogía Sana, Docentes en Calma, Eudai Educa.

**Conventions confirmed:**

- Soft sage / cream / earth-tone palettes
- Serif headlines + humanist sans body
- Audience-segmented service pages
- WhatsApp deep-link as primary CTA (LATAM norm)
- Real photos over stock — strong trust differentiator
- FAQ sections lower visitor anxiety and convert well
- No popups, no aggressive marketing

**Patterns we will NOT adopt (legal/ethical):**

- Individual client testimonials (forbidden under Ley 1090 de 2006 / Colpsic Code of Ethics for clinical work)
- "Cure" guarantees or therapeutic promises
- Patient-vulnerability exploitation in marketing copy

**Patterns we WILL adopt:**

- Institutional testimonials (from schools / organizations) with explicit written consent — legal and stronger than individual ones anyway
- Educational, non-clinical language ("we help you with…", not "abordaje terapéutico multimodal")
- Plain Spanish, conversational tone

### 3.3 Colombian compliance

- **Ley 1090 de 2006** (psychologist conduct) — no patient testimonials, no cure promises
- **Ley 1581 de 2012 / Habeas Data** — required privacy policy, explicit consent for data collection, right to access/delete
- All forms collecting personal data must have explicit opt-in checkbox and link to `/privacidad`

## 4. Visual identity & design system

### 4.1 Color tokens (CSS variables)

| Token | Hex | Usage |
|---|---|---|
| `--cream` | `#F1ECDE` | Primary background |
| `--cream-deep` | `#E8E1CE` | Section dividers, cards on cream |
| `--sage` | `#658266` | Primary brand color (from authoritative SVG) — headlines, logo, primary buttons, links |
| `--sage-deep` | `#4E6650` | Hover states, secondary headlines, footer |
| `--sage-tint` | `rgba(101,130,102,0.08)` | Icon discs, soft accents |
| `--ink` | `#2E342A` | Body copy |
| `--muted` | `#7A766B` | Captions, meta, secondary text |
| `--warm-accent` | `#C9A57A` | Sparing accent (event date pills, hover details) |

WCAG AA contrast verified for ink-on-cream and sage-on-cream.

### 4.2 Typography

| Role | Font | Source | Settings |
|---|---|---|---|
| Display / H1–H2 | **Cormorant Garamond** | Google Fonts | weights 400/500/600; italic available |
| Body / UI | **Inter** | Google Fonts | weights 400/500/600/700 |
| Tagline / small caps | **Inter** | Google Fonts | uppercase, tracking-wide |

- Base body size: **16px** mobile / **17px** desktop
- Line-height: **1.6** body, **1.2** display
- Both fonts self-hosted via `@fontsource/*` packages (zero external font requests)
- Fallback stacks: `Cormorant Garamond, Georgia, 'Times New Roman', serif` and `Inter, -apple-system, system-ui, sans-serif`

### 4.3 Spacing & rhythm

- Vertical section spacing: **80px desktop / 56px mobile**
- Generous whitespace is non-negotiable
- Container max-width: **1140px** with **24px / 48px** side padding (mobile / desktop)
- Border radius: **rounded-2xl** (~16px) on cards and buttons — soft, no harsh edges

### 4.4 Motion

- Subtle fade-up on scroll for content blocks (8px translate, 400ms ease-out)
- `prefers-reduced-motion: reduce` → instant, no transforms
- Hover transitions: 150ms ease for color, 200ms ease for transform
- No autoplay, no parallax, no carousel auto-rotation

### 4.5 Iconography

**Library:** Lucide via `astro-icon` integration.

**The four pillar icons** (replacing Instagram emojis exactly 1:1):

| Pillar | Lucide icon |
|---|---|
| Bienestar Emocional | `lucide:leaf` |
| Vínculos Saludables | `lucide:handshake` |
| Reflexión Consciente | `lucide:brain` |
| Transformación Sostenible | `lucide:sparkles` |

Each rendered at 56px, sage stroke (1.5px), inside an 88px circular `--sage-tint` disc.

**The four audience icons:**

| Audience | Lucide icon |
|---|---|
| Comunidades educativas | `lucide:graduation-cap` |
| Familias | `lucide:heart-handshake` |
| Organizaciones | `lucide:building-2` |
| Procesos individuales | `lucide:sprout` |

### 4.6 Logo

Provided SVG (`gemini-svg.svg`) used everywhere. Reserved sizes:

- Header: 160–180px wide
- Hero: 240px wide
- Footer: 200px wide
- Favicon: 32×32 derived from the flourish glyph

### 4.7 Components (visual primitives)

- `Button` — primary (sage fill), secondary (sage outline), tertiary (text-only link with arrow)
- `Card` — cream-deep background, rounded-2xl, no shadow (or very subtle)
- `Pill` — date/modality/audience badges
- `Section` — wrapper with consistent vertical rhythm and optional eyebrow heading
- `Icon` — wrapper around `astro-icon` for consistent sizing/color

## 5. Information architecture

5 pages + `/privacidad`. Approach 1 from brainstorming (Calm marketing site).

### 5.1 Site map

```
/                  Home
/servicios         All 4 audiences on one page with #anchors
/eventos           Upcoming list + past events gallery
/sobre-nintai      Story, philosophy, the 4 pillars expanded
/contacto          WhatsApp CTA + form
/privacidad        Privacy policy (Ley 1581 compliant)

# Reserved routes (placeholders, built in later phases):
/agenda            → redirects to WhatsApp in demo/Phase 1; Calendly embed in Phase 3
/eventos/[slug]    → individual event detail page (Phase 1 if needed, else Phase 2)
/eventos/[slug]/inscripcion → registration form (Phase 4 — payments)
/cuenta            → future client area (low priority, may never build)
/admin             → Decap CMS (Phase 1 on Netlify; not present in GitHub Pages demo)
```

### 5.2 Global elements

- **Header:** logo (links home) · Servicios · Eventos · Sobre Nintai · Contacto · WhatsApp button (sage, with icon)
- **Footer:** logo · tagline · locations (Bogotá / Fusagasugá) · Instagram · WhatsApp · email · "© Nintai 2026" · link to `/privacidad`
- **Floating WhatsApp bubble:** bottom-right, mobile-priority, pre-filled message *"Hola, me gustaría conocer más sobre Nintai"*
- **Newsletter signup:** placed in home footer, `/eventos` hero, `/contacto` page

### 5.3 Page-by-page content

#### `/` Home

1. **Hero** — cream background, logo, headline *"Cultivamos bienestar, impulsamos transformación"*, subhead *"Experiencias psicoeducativas para comunidades educativas, familias y organizaciones."*, primary CTA → WhatsApp, secondary CTA → scroll to services
2. **Espacio para detenernos** section — her Instagram copy verbatim: *"Un espacio para detenernos, reflexionar y transformarnos. En Nintai creemos que el bienestar emocional es la base para construir vínculos más conscientes, entornos más saludables y procesos de desarrollo verdaderamente significativos."* Paired with the team-meeting photo.
3. **Los 4 pilares** — 4-card row with Lucide icons + names + 1-line description
4. **¿Qué hacemos?** — 4-audience grid with audience icons + short blurb + "Conoce más" → `/servicios#anchor`
5. **Próximo encuentro** — featured upcoming event card (empty state if none scheduled)
6. **Cierre + CTA** — *"Creemos que cuidar también transforma"* + WhatsApp CTA + newsletter signup
7. Footer

#### `/servicios`

Hero strip with title + intro. Then four anchored sections, each:

- `#comunidades-educativas` — workshop photo (stretching/squat scene), description, "En este espacio trabajamos…" bullets, audience-specific WhatsApp CTA
- `#familias`
- `#organizaciones`
- `#procesos-individuales`

Pre-filled WhatsApp messages tailored per audience (e.g. *"Hola, soy directora de un colegio y quisiera saber más sobre los talleres para docentes"*).

#### `/eventos`

- Hero: *"Próximos encuentros"*
- Upcoming events list (CMS-driven, sorted by date asc) — cards with cover image, title, date/time, location, modality pill, summary, "Quiero asistir" CTA (WhatsApp pre-filled with event name)
- Past events gallery (CMS-driven, photo-first grid). Click → lightbox with description and photos
- Empty state copy: *"Pronto anunciaremos nuestros próximos encuentros. Síguenos en Instagram para no perderte nada."*
- Newsletter signup at bottom

#### `/sobre-nintai`

- Hero: portrait of her if/when available; logo + botanical accent until then
- *Nuestra esencia* block (her Instagram copy): *"Creemos que cuidar también transforma. Por eso generamos espacios que integran reflexión, aprendizaje y herramientas prácticas para acompañar procesos humanos con sentido."*
- *Mi historia* — bio, training, philosophy (placeholder copy until she writes it; we draft for her)
- *Los 4 pilares*, expanded paragraphs
- Locations (Bogotá + Fusagasugá + virtual)
- CTA: *"¿Conversamos?"* → WhatsApp

#### `/contacto`

- Hero: *"Conversemos"*
- Primary CTA card: WhatsApp button with her number formatted nicely
- Email contact
- Contact form: name, email, phone, audience dropdown, message → Formspree (demo) / Netlify Forms (production)
- Social link (Instagram)
- Locations

#### `/privacidad`

Standard Habeas Data privacy policy template, customized for Nintai. Must address: data controller identity, purpose of collection, recipient categories, rights of data subjects (access/rectification/cancellation/opposition), retention period, contact for data inquiries, opt-out mechanism. To be lawyer-reviewed before production launch (template covers compliance for demo).

## 6. Technical architecture

### 6.1 Stack

| Layer | Choice |
|---|---|
| Framework | **Astro 4** |
| Styling | **Tailwind CSS** + CSS variables for tokens |
| Icons | `astro-icon` + Lucide pack |
| Content | Astro **Content Collections** (typed markdown) |
| Forms (demo) | **Formspree** (free tier, 50 submissions/mo) |
| Forms (production) | **Netlify Forms** |
| CMS (production) | **Decap CMS** (open-source, git-backed) |
| Email service | **Brevo** (free tier; LATAM-friendly; WhatsApp upgrade path) |
| Auth (production CMS) | **Netlify Identity** |
| Hosting (demo) | **GitHub Pages** (`output: 'static'`) |
| Hosting (production) | **Netlify** (`output: 'hybrid'`, SSR-ready) |
| Image optimization | Astro `<Image />` (sharp, webp/avif, responsive `srcset`) |
| Analytics | **Plausible** (deferred; add post-launch if desired) |

### 6.2 Rendering modes

- **Demo (Phase 0):** `output: 'static'`. Every page prerendered at build time. Zero server.
- **Production (Phase 1+):** `output: 'hybrid'`. Pages prerendered by default; individual routes/endpoints can opt into SSR via `export const prerender = false` when we add booking/payments/webhooks.

### 6.3 Repository structure

```
nintai-web/
├── astro.config.mjs           # output mode, integrations, site/base config
├── tailwind.config.mjs        # design tokens (colors, fonts, spacing)
├── tsconfig.json
├── package.json
├── public/
│   ├── logo/nintai.svg        # provided SVG logo
│   ├── favicon.svg
│   └── (admin/ in production only — Decap CMS)
├── src/
│   ├── assets/photos/         # her workshop photos
│   ├── components/
│   │   ├── layout/            # Header, Footer, Nav, FloatingWhatsApp
│   │   ├── ui/                # Button, Card, Pill, Icon, Section
│   │   ├── home/              # HeroHome, Pillars, Audiences, NextEvent
│   │   ├── services/          # ServiceSection, AudienceCard
│   │   ├── events/            # EventCard, PastEventGrid, EventLightbox
│   │   ├── about/             # PillarExpanded, EssenceBlock
│   │   ├── subscribe/         # SubscribeForm
│   │   └── booking/           # BookingCTA (single source of truth for CTAs)
│   ├── content/
│   │   ├── config.ts          # collection schemas
│   │   ├── events/            # one .md per event
│   │   ├── services/          # one .md per audience
│   │   ├── pillars/           # one .md per pillar
│   │   └── pages/             # editable page copy (home, sobre, contacto, privacidad)
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── servicios.astro
│   │   ├── eventos/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── sobre-nintai.astro
│   │   ├── contacto.astro
│   │   ├── privacidad.astro
│   │   └── api/               # SSR endpoints (production phases)
│   ├── styles/
│   │   └── global.css         # CSS variables, font @imports
│   └── lib/
│       ├── whatsapp.ts        # buildWhatsappUrl(message, audience)
│       └── site.ts            # site config helpers
├── docs/
│   └── superpowers/
│       ├── specs/
│       └── plans/
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions → GitHub Pages
├── netlify.toml               # ready for production migration
└── README.md
```

### 6.4 Key architectural decisions

#### `BookingCTA` — the scalability hinge

Every CTA on the site routes through one component. Today it builds a `wa.me` URL; tomorrow it can route to Calendly or a native booking form by flipping a `BOOKING_MODE` env var. No page or content changes needed when scheduling evolves.

```ts
interface Props {
  audience?: 'colegio' | 'familia' | 'organizacion' | 'individual' | 'evento';
  eventTitle?: string;
  variant?: 'primary' | 'secondary' | 'inline';
  label?: string;
}
```

#### Typed content collections

All editable content lives in markdown files with zod-validated frontmatter schemas. The events schema includes future-payment fields (`priceCop`, `capacity`, `requiresRegistration`) that are unused in Phase 1 but present so we don't migrate data later.

#### Centralized WhatsApp URL builder

`src/lib/whatsapp.ts` exports a single `buildWhatsappUrl(message, audience?)` function. Audience-specific pre-filled messages live in `site config` (CMS-editable in production). Changing her WhatsApp number is a one-place edit.

#### Image handling

All photos go through Astro's `<Image />` component. Output formats: webp + avif with responsive `srcset`. Eager-load only the hero image; everything else lazy. Target image weights: hero < 80KB, thumbnails < 25KB.

#### Reserved route paths

Slugs reserved now to avoid breaking inbound links later: `/agenda`, `/eventos/[slug]/inscripcion`, `/api/webhooks/payments`, `/api/contact`, `/api/subscribe`, `/api/webhooks/event-published`, `/cuenta`.

## 7. CMS schema (Decap, production phase)

Admin lives at `/admin` (production only). Auth: Netlify Identity, invite-only, two roles (Editor / Admin). Editorial workflow enabled.

### 7.1 Collections

#### Eventos (folder collection)

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | ✓ | |
| `slug` | string | ✓ (auto) | |
| `startsAt` | datetime | ✓ | |
| `endsAt` | datetime | ✗ | |
| `location` | string | ✓ | |
| `modality` | enum: presencial / virtual / hibrido | ✓ | |
| `audience` | enum: colegio / familia / organizacion / individual / mixto | ✓ | |
| `coverImage` | image | ✓ | |
| `summary` | string (≤200 chars) | ✓ | |
| `body` | markdown | ✓ | |
| `gallery` | image[] | ✗ | For past events lightbox |
| `capacity` | int | ✗ | Phase 4 |
| `priceCop` | int | ✗ | Phase 4; blank/0 = gratuito |
| `requiresRegistration` | bool | default false | Phase 4 |
| `notifyOnPublish` | bool | default false | Phase 2 |
| `notifySegments` | enum[] | ✗ | Conditional on above |
| `status` | enum: borrador / proximo / pasado | ✓ | Auto from `startsAt`, overridable |

#### Servicios (4 files, one per audience)

| Field | Type |
|---|---|
| `audience` | enum (fixed) |
| `sectionTitle` | string |
| `image` | image |
| `body` | markdown |
| `workBullets` | string[] |
| `ctaLabel` | string (default "Conversemos") |
| `whatsappPrefill` | string |

#### Pilares (4 files)

| Field | Type |
|---|---|
| `name` | string |
| `icon` | string (Lucide name) |
| `shortDescription` | string |
| `longDescription` | markdown |
| `order` | int |

#### Páginas (singletons: home, sobre-nintai, contacto, privacidad)

Each page = one markdown file with structured frontmatter for headings + free-form body.

#### Configuración del sitio (singleton)

| Field | Type |
|---|---|
| `businessName` | string |
| `tagline` | string |
| `whatsappNumber` | string |
| `email` | email |
| `instagramUrl` | url |
| `locations` | string[] |
| `footerText` | markdown |
| `whatsappMessages` | object (by audience) |

### 7.2 Workflow

1. Edit/create in CMS → saved as branch commit (Draft)
2. "Listo para revisión" → moves to In Review
3. "Publicar" → merges to main → Netlify build → live in ~30 seconds
4. Built-in preview before publish

## 8. Notifications & email automation

### 8.1 Newsletter signup (Phase 1)

Form placed in home footer, `/eventos` hero, `/contacto`. Fields:

- Nombre
- Email
- WhatsApp (optional, prepares for Phase 5)
- ¿Qué te interesa? — multi-select: Eventos / Talleres para colegios / Talleres para familias / Procesos individuales
- Opt-in checkbox (required): *"Acepto recibir comunicaciones de Nintai y la [política de privacidad](/privacidad)."*

Submits to `/api/subscribe` (SSR endpoint in production) → Brevo API → contact created with tag(s) matching interests. Double opt-in confirmation handled by Brevo automatically.

### 8.2 Event-triggered emails (Phase 2)

When she publishes an event in CMS with `notifyOnPublish: true`:

1. Netlify build runs
2. Build hook calls `/api/webhooks/event-published` with event slug
3. Endpoint reads event data, formats email
4. Calls Brevo "send campaign" API with audience filter = `notifySegments`
5. Brevo delivers to matching contacts within minutes

Email template designed in Brevo matching brand (sage + cream + serif). Includes event card, "Más información" CTA → event page, "Reservar" CTA → WhatsApp.

### 8.3 WhatsApp automation (Phase 5)

Deferred until subscriber base justifies cost (~100+ contacts or paid event ROI).

Two options when activated:

- **Light:** Brevo WhatsApp add-on (~$15 USD/mo) — same dashboard, same `notifySegments` mechanism, one API param change
- **Heavy:** dedicated WhatsApp Business platform (Wati, Sirena) — more features, more cost

Phase 1 form already collects opt-in WhatsApp numbers, so the list is ready.

### 8.4 Compliance

- Double opt-in mandatory (Brevo default)
- Unsubscribe link in every email (Brevo automatic)
- Privacy policy linked beneath every signup form
- Clear "Your data, your control" microcopy
- All data subject rights from Ley 1581 honored

## 9. Rollout phases

### Phase 0 — Demo (GitHub Pages) — ~3 days

**Goal:** A real URL she can click through on her phone and react to. No backend, no CMS, no auth.

- Astro project scaffolded, `output: 'static'`
- All 5 pages + `/privacidad`
- Full visual design system (palette, type, components, icons)
- Her SVG logo wired in
- Her 5 workshop photos optimized and placed
- WhatsApp CTAs functional
- Newsletter form: visible/styled; submits to Formspree (50/mo free) so the experience feels real
- Mobile-responsive, performance targets met
- Seed content (events, services, pillars, page copy) lifted from her Instagram
- Deployed to `https://<user>.github.io/nintai-web/` via GitHub Actions

**Exit criteria:** she sees it on her phone, gives feedback.

### Phase 1 — Production launch (Netlify) — ~1–2 days after demo approval

**Goal:** Real domain, CMS for her, production-grade.

- Migrate `output` to `'hybrid'`
- Move from GitHub Pages to Netlify
- Wire up Decap CMS at `/admin` with Netlify Identity
- Invite her as Editor; you as Admin
- Connect real domain (e.g. `nintai.com.co`)
- Switch contact form from Formspree to Netlify Forms
- Wire newsletter signup to Brevo via `/api/subscribe`
- Lawyer-reviewed privacy policy
- Plausible analytics (optional, ~$9/mo)

**Exit criteria:** she can publish an event without dev help; subscribers flowing into Brevo.

### Phase 2 — Email automation — ~½–1 day, when she has 20+ subscribers

- `/api/webhooks/event-published` endpoint
- Brevo campaign templates (sage + cream)
- `notifyOnPublish` toggle in CMS becomes functional

### Phase 3 — Self-serve booking — ~½–1 day, when she's tired of manual WhatsApp scheduling

- Cal.com or Calendly embed at `/agenda`
- `BookingCTA` mode flipped to `hybrid` (WhatsApp + booking)

### Phase 4 — Paid events & registration — ~1–2 days when there's real demand

- Wompi merchant account (her, with her bank — ~1 week external dependency)
- `/eventos/[slug]/inscripcion` registration + checkout
- `/api/webhooks/payments` for Wompi events
- Confirmation emails via Brevo
- `paid` status on events

### Phase 5 — WhatsApp automation — open-ended

- Brevo WhatsApp add-on OR Wati integration
- Same `notifySegments` mechanism, second channel

### Deferred indefinitely

Blog, multi-language, dark mode, mobile app, member portal — only built if/when there's clear demand.

## 10. Hosting, domain, costs

### 10.1 Hosting

- **Demo:** GitHub Pages (free, fast deploy via Actions)
- **Production:** Netlify (free tier covers expected traffic comfortably)

### 10.2 Domain (Phase 1 onward)

- Recommend `.com.co` (~$30 USD/yr) for Colombian trust signal
- Candidates: `nintai.com.co`, `psiconintai.com.co`, `experiencias-nintai.com.co`
- Registrar: Hostinger or GoDaddy Colombia (good DNS UX)

### 10.3 Email address

- `hola@nintai.com.co` via Google Workspace (~$6/mo) — recommended
- Alternative: Zoho Mail free tier
- Fallback: registrar email forwarding (free)

### 10.4 Monthly cost summary

| Item | Demo | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Phase 5 |
|---|---|---|---|---|---|---|
| Hosting | $0 | $0 | $0 | $0 | $0 | $0 |
| Domain (amortized) | – | $2.50 | $2.50 | $2.50 | $2.50 | $2.50 |
| Email service (Brevo) | $0 | $0 | $0 | $0 | $0 | $0 |
| Email mailbox | – | $0–$6 | $0–$6 | $0–$6 | $0–$6 | $0–$6 |
| Forms | $0 | $0 | $0 | $0 | $0 | $0 |
| CMS | – | $0 | $0 | $0 | $0 | $0 |
| Booking platform | – | – | – | $0–$15 | $0–$15 | $0–$15 |
| Payments (Wompi) | – | – | – | – | per-tx fees only | per-tx fees only |
| WhatsApp Business | – | – | – | – | – | $15–$40 |
| **Approx total** | **$0** | **$2.50–$8.50** | **$2.50–$8.50** | **$2.50–$23.50** | **$2.50–$23.50** | **$17.50–$63.50** |

### 10.5 Backups

- Git history = full content history
- Netlify retains last 100 deploys with one-click rollback
- No database to back up (content is git)

## 11. Performance, SEO, accessibility

### 11.1 Performance targets

- Lighthouse Performance ≥ 95 mobile
- LCP < 1.8s on 4G
- CLS < 0.05
- Total JS shipped < 30KB
- Images: webp/avif, responsive srcset, lazy-loaded except hero

### 11.2 SEO

- Per-page meta tags (title, description, og:image, twitter:card)
- `sitemap.xml` auto-generated via `@astrojs/sitemap`
- `robots.txt`
- Structured data: `LocalBusiness` on home, `Event` on each event page (Phase 1+)
- `<html lang="es-CO">`

### 11.3 Accessibility

- WCAG AA color contrast (verified)
- Semantic HTML (`<nav>`, `<main>`, `<article>`, `<section>`, headings in order)
- All images have required alt text (CMS field is required, not optional)
- Keyboard navigable, visible focus rings
- `prefers-reduced-motion` respected
- Form labels properly associated
- ARIA landmarks present

## 12. Legal & compliance

- **Ley 1090 de 2006 (psychologist code):**
  - No individual client testimonials
  - No "cure" guarantees or therapeutic promises
  - Educational, non-clinical language
  - Institutional testimonials permitted with written consent
- **Ley 1581 de 2012 / Habeas Data:**
  - `/privacidad` page mandatory before collecting any personal data
  - Explicit opt-in checkbox on every form
  - Lawyer review of privacy policy before production launch
  - All subject rights honored: access, rectification, cancellation, opposition
  - Retention period stated; contact for data inquiries listed

## 13. Open items / dependencies

| Item | Owner | Blocking? |
|---|---|---|
| Real portrait of her for `/sobre-nintai` | Her (deferred) | No — page works without |
| Bio copy for "Mi historia" | Her (we draft, she edits) | No — placeholder ok for demo |
| Final domain choice | Her (or you) | Phase 1 |
| Wompi merchant account | Her + her bank | Phase 4 only |
| Lawyer review of privacy policy | External | Production launch |
| Her GitHub username (for repo) | You | Phase 0 |
| Higher-res versions of workshop photos | Already provided ✓ | – |
| Logo SVG | Already provided ✓ (`gemini-svg.svg`) | – |

## 14. Out of scope

- Real-time chat widget
- User accounts / client portal (deferred to "if ever")
- Multi-language
- Dark mode
- Blog at launch
- Mobile app
- Newsletter content authoring tool (she writes in Brevo's editor)
- Custom analytics dashboard
