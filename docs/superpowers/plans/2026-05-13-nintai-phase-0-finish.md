# Nintai Phase 0 (Demo) — Finish & Deploy Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Take the existing Nintai site scaffolding (pages, components, content, design system already in place) from a broken half-installed state to a clean, building, dev-server-running site with a GitHub Pages deploy workflow ready to push.

**Architecture:** No new architecture. We are finishing a project that already follows the spec at `docs/superpowers/specs/2026-05-13-nintai-website-design.md`. This plan repairs the broken install, fixes any errors `astro check` / `astro build` surfaces, adds the missing GH Actions workflow, and adds a README.

**Tech Stack:** Astro 4, Tailwind, TypeScript, `astro-icon` + Lucide, content collections, GitHub Pages via Actions.

**Verification approach:** No unit-test framework is set up for this static site (and the spec doesn't call for one in Phase 0). Verification is via `astro check` (type + content checks), `astro build` (full build pipeline), and a manual dev-server smoke test of every page. These are the right tools for a static Astro site at this stage.

---

## Task 1: Repair broken `npm install`

**Why:** Currently `node_modules/astro/dist/` contains only 2 files; the Astro CLI and runtime are missing. Every other task depends on a working install.

**Files:**
- Touch: `node_modules/` (regenerated)
- Keep as-is: `package.json`, `package-lock.json`

- [ ] **Step 1: Confirm the broken state**

Run: `npx astro --version`
Expected: non-zero exit, ERR_MODULE_NOT_FOUND for `astro/dist/cli/index.js`.

- [ ] **Step 2: Remove the broken `node_modules`**

Run (PowerShell): `Remove-Item -Recurse -Force "c:\Users\nickb\Desktop\Ma website\node_modules"`
Expected: directory removed cleanly. If it errors due to long paths, retry once.

- [ ] **Step 3: Fresh install from lockfile**

Run: `npm ci`
Expected: install completes with no fatal errors. Warnings about peer deps are acceptable.

- [ ] **Step 4: Verify Astro CLI is present**

Run: `npx astro --version`
Expected: prints a version like `4.16.x` and exits 0.

- [ ] **Step 5: Verify the dist tree exists**

Run (PowerShell): `Test-Path "node_modules\astro\dist\cli\index.js"`
Expected: `True`.

---

## Task 2: Run `astro check`, fix any issues

**Why:** Astro Check covers TypeScript + content-collection schemas + `.astro` syntax. Surface every problem before trying to build.

**Files:** Any source file flagged by the checker (TBD by output).

- [ ] **Step 1: Run the checker**

Run: `npm run check`
Capture the full output.

- [ ] **Step 2: Triage the output**

For each error / warning:
- Note the file and line.
- Classify: real bug, schema mismatch, missing import, or stale comment.

Common things to watch for given the codebase I already saw:
- `gemini-svg.svg` at the repo root but the layout/header references `public/logo/nintai.svg`. If `nintai.svg` is missing in `public/logo/`, copy it: `Copy-Item gemini-svg.svg public/logo/nintai.svg`.
- Astro content schema imports an `image()` helper — only works inside `defineCollection`'s schema factory. Should already be correct in `src/content/config.ts`.
- The `pages` collection is declared but no `.md` files exist under `src/content/pages/`. That is fine if nothing imports from it; if `astro check` complains about an empty collection, leave the schema and add a single seed file `src/content/pages/.gitkeep` (no — markdown collections ignore non-md). If errors appear, address them then.

- [ ] **Step 3: Fix the issues, one file at a time**

For each issue, edit the relevant file with the minimum change to make it pass. Do not refactor unrelated code.

- [ ] **Step 4: Re-run the checker**

Run: `npm run check`
Expected: `0 errors, 0 warnings` (warnings about hints like `accessibility` are acceptable but try to resolve).

- [ ] **Step 5: Commit (if a git repo is in scope)**

Skip the commit in this environment — the user's home directory is the git root and there are no committed files yet. Note it in the plan log instead.

---

## Task 3: Run `astro build`, fix any build errors

**Why:** `astro check` does not run the actual build pipeline. The build will exercise content collection rendering, image processing via `sharp`, and route generation.

**Files:** Any source file flagged by the build (TBD).

- [ ] **Step 1: Run the build**

Run: `npm run build`
Capture the full output.

- [ ] **Step 2: Inspect output**

Expected on success: a `dist/` directory containing `index.html`, `servicios/index.html`, `eventos/index.html`, `sobre-nintai/index.html`, `contacto/index.html`, `agenda/index.html`, `privacidad/index.html`, plus `_astro/` and `logo/nintai.svg` and asset images.

Run (PowerShell):
```powershell
Get-ChildItem dist -Recurse -File | Select-Object FullName | Format-Table -AutoSize -Wrap
```

- [ ] **Step 3: Fix any build errors**

Common build-time failures for this project:
- Missing `public/logo/nintai.svg`: fix by copying from `gemini-svg.svg`.
- `astro:assets` referencing an image not in `src/assets/`: fix the path.
- Sharp install issues on Windows: re-run `npm rebuild sharp`.
- `astro-icon` failing on an icon name not whitelisted in `astro.config.mjs > integrations > icon.include.lucide`: add the icon name and rebuild.

For each error, fix the root cause, do not silence the checker.

- [ ] **Step 4: Re-run the build until clean**

Run: `npm run build`
Expected: build completes, prints something like `Complete!` and lists generated pages.

---

## Task 4: Dev server smoke test

**Why:** Build success does not prove pages render correctly. A 30-second click-through catches console errors, missing icons, broken layouts.

**Files:** None modified — read-only verification.

- [ ] **Step 1: Start the dev server in the background**

Run: `npm run dev` with `block_until_ms: 0` (background it; capture the terminal file).
Expected: server starts on `http://localhost:4321/nintai-web/` (note the base path).

- [ ] **Step 2: Poll the terminal until ready**

Read the terminal file. Look for `Local   http://localhost:4321/nintai-web/`. Retry with a 2s sleep if not yet ready.

- [ ] **Step 3: Hit each page with `Invoke-WebRequest`**

For each path in this list, fetch and confirm HTTP 200 + non-empty body:

```
/nintai-web/
/nintai-web/servicios
/nintai-web/eventos
/nintai-web/sobre-nintai
/nintai-web/contacto
/nintai-web/agenda
/nintai-web/privacidad
```

Run:
```powershell
$paths = @('/', '/servicios', '/eventos', '/sobre-nintai', '/contacto', '/agenda', '/privacidad')
foreach ($p in $paths) {
  $url = "http://localhost:4321/nintai-web$p"
  try {
    $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
    "$($r.StatusCode) $url ($($r.RawContentLength) bytes)"
  } catch {
    "FAIL $url $($_.Exception.Message)"
  }
}
```

Expected: all rows start with `200`.

- [ ] **Step 4: Stop the dev server**

Kill the dev-server process by pid (from the terminal file header).

---

## Task 5: Create `.github/workflows/deploy.yml`

**Why:** Spec says Phase 0 deploys to GitHub Pages via GitHub Actions. The workflows directory exists but is empty.

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Write the workflow file**

Use the official `withastro/action`. The site lives at `<user>.github.io/nintai-web/` so `base` is already correctly set in `astro.config.mjs`.

Contents:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Install, build, and upload Astro site
        uses: withastro/action@v3
        with:
          node-version: 20

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Sanity-check the YAML**

Run (PowerShell):
```powershell
$y = Get-Content ".github\workflows\deploy.yml" -Raw
$y -match 'withastro/action@v3' -and $y -match 'actions/deploy-pages@v4'
```
Expected: `True`.

- [ ] **Step 3: Note open items for the user**

- `astro.config.mjs` still has `GITHUB_USER = 'CHANGE-ME-GITHUB-USERNAME'`. The user chose to skip setting it this session, so flag it in the README (Task 6) as the one config edit needed before deploy.
- The repo must exist on GitHub with Pages enabled (`Source: GitHub Actions`).

---

## Task 6: README with deploy + handoff instructions

**Why:** The project root has no `README.md`. The user will want a one-page recap of what's here and how to run it.

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write the README**

Contents:

````markdown
# Nintai — Experiencias Psicoeducativas

A small, calm, professional marketing site for **Nintai**, a Colombian psychoeducational practice. Built with Astro 4, Tailwind, and TypeScript. Phase 0 of the rollout (see `docs/superpowers/specs/2026-05-13-nintai-website-design.md`).

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
├── assets/photos/       # workshop photos (processed via Astro <Image />)
├── components/
│   ├── layout/          # Header, Footer, FloatingWhatsApp
│   ├── ui/              # Section, Pill
│   ├── booking/         # BookingCTA — single source of truth for WhatsApp/booking
│   ├── events/          # EventCard, PastEventCard
│   ├── services/        # ServiceSection
│   └── subscribe/       # SubscribeForm
├── content/             # markdown-driven content collections (events, services, pillars)
├── layouts/             # BaseLayout
├── lib/                 # siteConfig, buildWhatsappUrl
├── pages/               # one file per route
└── styles/              # global.css (tokens, base, components)
public/
└── logo/nintai.svg      # provided logo
docs/superpowers/
├── specs/               # approved design spec
└── plans/               # implementation plans
.github/workflows/
└── deploy.yml           # build + publish to GitHub Pages
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

1. Open `astro.config.mjs` and set `GITHUB_USER` to your real GitHub username.
2. Push the repo to GitHub as `nintai-web` (the slug must match `REPO_NAME` in `astro.config.mjs`).
3. In the repo: **Settings → Pages → Source: GitHub Actions**.
4. Push to `main`. The workflow at `.github/workflows/deploy.yml` does the rest.

The site will be available at `https://<your-username>.github.io/nintai-web/`.

## Things still using placeholders (intentional for the demo)

- `siteConfig.formspreeEndpoint` in `src/lib/site.ts` — replace with a real Formspree form id to receive contact + subscribe submissions, or wait for Phase 1 (Netlify Forms + Brevo).
- `GITHUB_USER` in `astro.config.mjs`.
- `src/content/pillars/*.md` and `src/content/services/*.md` bodies are short — the homepage and `/servicios` use frontmatter only, so longer prose is optional polish.

## Phase 1 and beyond

See `docs/superpowers/specs/2026-05-13-nintai-website-design.md` section 9 for the full phased rollout (Netlify migration, Decap CMS, Brevo email automation, Cal.com booking, Wompi payments, WhatsApp automation).
````

- [ ] **Step 2: Verify the README rendered with no merge artifacts**

Read the file back and confirm there are no `<<<<<<<`, `=======`, `>>>>>>>` markers or stray YAML in the markdown.

---

## Task 7: Final verification

**Why:** After any fixes from Tasks 2–3, re-confirm `astro check` and `astro build` both succeed cleanly, end-to-end.

**Files:** None modified.

- [ ] **Step 1: Clean rebuild**

Run (PowerShell, sequentially):
```powershell
if (Test-Path dist) { Remove-Item -Recurse -Force dist }
npm run check
npm run build
```

- [ ] **Step 2: Confirm output**

Expected:
- `npm run check` → `0 errors, 0 warnings` (or only acceptable hints).
- `npm run build` → completes with a list of generated pages.
- `dist/` exists with all 7 HTML pages plus `_astro/` and `logo/`.

- [ ] **Step 3: Hand back to user**

Summarize: what's built, what's still placeholder, what one-line edits the user needs to make before pushing to GitHub.

---

## Notes for the executor

- **Do not** edit `astro.config.mjs > GITHUB_USER` — the user explicitly chose to keep it as a placeholder this session.
- **Do not** add unit tests or a test framework — out of scope for Phase 0, and the spec is clear: `astro check` + `astro build` + manual smoke test is the right verification surface for a static marketing site.
- **Do not** refactor existing components or change the design system — the spec is approved, the design is set.
- If `npm ci` is too slow on this machine, fall back to `npm install` (it will use the existing lockfile).
- If any pillar or service `.md` file fails schema validation, fix the frontmatter rather than relaxing the schema — schema strictness is the whole point.
