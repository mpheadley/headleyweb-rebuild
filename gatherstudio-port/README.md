# Gather Studio Feature Bundle

A self-contained, drop-in package of all 11 proven features (originally built for
Headley Web), ready to copy into the Gather Studio Next.js app. Every file here is
working code lifted from `headleyweb-rebuild` (Next.js 16 App Router + Tailwind v4)
and **already rebranded to Gather Studio**. Copy what you want, wire the env vars,
and finish the few owner/account-specific steps in section 1.

> **Why a bundle and not a direct build?** The Gather Studio repo wasn't reachable
> from the session that produced this. These are the real, battle-tested source
> files — not blind reimplementations — so they behave exactly as they do on
> headleyweb.com, now under Gather Studio branding.

---

## How to get this into the Gather Studio repo

Pick whichever is easiest:

- **Download the archive** — grab `gatherstudio-port.zip` (or `.tar.gz`), unzip,
  and copy its `src/` and `content/` into your GS repo root (paths line up).
- **One-command install** — from the GS repo root, with this folder alongside:
  ```bash
  bash gatherstudio-port/install.sh .
  ```
  Copies `src/` + `content/` into place; leaves `reference/` for manual merge.
- **Copy-paste from GitHub** — browse `gatherstudio-port/` in this repo and copy
  files individually into the matching GS paths.

After any method: install deps, set env vars, and finish section 1's manual steps.

---

## 0. Prerequisites

Gather Studio must be a **Next.js App Router** project using **Tailwind CSS v4**
(these files use `src/app/` and Tailwind utility classes + component classes
defined in `globals.css`). If GS uses a different stack, treat these as reference
implementations rather than drop-ins.

### Install dependencies

```bash
npm i @supabase/supabase-js cheerio gray-matter jspdf lenis lucide-react \
      marked next-mdx-remote reading-time remark-gfm resend
```

(`next`, `react`, `react-dom` are already in any Next.js app. `@supabase/...`
is only needed if you keep the optional audit-result storage in feature #1/#5.)

### Environment variables

| Var | Used by | Notes |
|-----|---------|-------|
| `PAGESPEED_API_KEY` | #1 audit | Google PageSpeed Insights key |
| `ANTHROPIC_API_KEY` | #5 AI recs, competitor-research | Claude API |
| `RESEND_API_KEY` | #1 email report, #2 subscribe | Resend |
| `HW_NEWSLETTER_AUDIENCE_ID` | #2 subscribe | **new** GS Resend audience — rename to `GS_NEWSLETTER_AUDIENCE_ID` if you prefer (update `subscribe/route.ts`) |
| `NEXT_PUBLIC_GA4_ID` | #3 analytics | GS GA4 measurement id |
| `NEXT_PUBLIC_INTERNAL_KEY` | #1/#5 | shared secret guarding internal API calls |
| `NEXT_PUBLIC_SUPABASE_URL` | optional storage | only if keeping Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | optional storage | only if keeping Supabase |

> Trim env vars before use (`process.env.X?.trim()`) — Vercel can add trailing
> whitespace. The originals already do this.

---

## 1. Rebrand — already applied; finish these owner/account steps

The bundle is **already rebranded**: `Headley Web & SEO`/`Headley Web` → `Gather
Studio`, `headleyweb.com` → `gatherstudio.app`, report sender →
`reports@gatherstudio.app`. The live Headley Formspree id was **removed** and
replaced with `formspree.io/f/REPLACE_ME` so GS form leads can't route into
Headley's account. Central values live in `src/lib/brand.config.ts`.

**Intentionally kept** (Matt owns Gather Studio too): his name "Matt Headley",
phone `(256) 644-7334`, email `matt@headleyweb.com`.

**Remaining manual steps before launch:**

| What | Where | Action |
|------|-------|--------|
| Formspree id | `formspree.io/f/REPLACE_ME` (grep it) | create a GS Formspree form, paste its id |
| GA4 id | `NEXT_PUBLIC_GA4_ID` env (fallback literal `G-XXXXXXXXXX`) | set GS measurement id |
| Resend audience | `subscribe/route.ts` / env | create a **new** GS audience (don't reuse Southern Legends) + verify sending domain |
| PDF logo | `src/lib/logo-icon-data.ts` → `LOGO_ICON_BASE64` | swap for GS logo |
| Social handle | `HeadleyWebSEO` (Footer, card) | replace with GS social handle |
| Card assets | `/card`: `headley.webp`, `headley.vcf` | replace headshot/vCard or update paths |
| GS email (optional) | `brand.config.ts` `email` | switch from `matt@headleyweb.com` if GS uses its own |

Verify: `grep -rn "REPLACE_ME\|G-XXXXXXXXXX" src/` shows what still needs values;
`grep -rin "headley" src/` should show only the intentional keeps above.

**Design tokens:** the components use Tailwind classes like `bg-hw-primary`,
`text-hw-dark`. `reference/globals.css` contains the full Sage & Stone token set
plus component classes (`.btn-primary`, `.card-glow`, `.animate-on-scroll`,
ken-burns, angled sections). Either copy those `:root`/`@theme` tokens + classes
into GS's `globals.css`, or remap the `hw-*` classes to GS's own tokens.
`reference/layout.tsx` shows font setup (Fraunces/Outfit/Rock Salt) and the
hero-preload pattern.

---

## 2. Install order (all 11, top to bottom)

Mirrors the structure in `src/` — copy each listed path to the same path in GS.

### #1 — Audit tool + messaging scorer + PDF report  ⭐ flagship
The homepage's "Run Your Free Audit" promise. Email-gated AI report.
```
src/app/api/site-audit/route.ts        # PageSpeed (mobile+desktop) + scrape; SSRF guard + rate limit
src/app/api/send-report/route.ts       # emails the PDF via Resend + Formspree lead notify
src/lib/storybrand-scorer.ts           # the "clarity" engine (jargon/CTA/empathy signals)
src/lib/generate-report-pdf.ts         # branded jsPDF report (has competitor Section 7b)
src/lib/audit-types.ts
src/lib/logo-icon-data.ts              # ⚠ swap LOGO_ICON_BASE64 for the GS logo
src/app/audit/page.tsx
src/app/components/{AuditCheck,ScoreGauge,StoryBrandItemRow,PageSpeedProof,LazyPageSpeedProof,CheckupForm}.tsx
```
Adapt: keep the rule of never saying "StoryBrand" in client-facing copy — it
already uses "messaging/clarity," which IS the GS voice. Replace the logo base64.

### #2 — Email capture (Resend)
For the Oct 18 founding-member list.
```
src/app/api/subscribe/route.ts
src/app/components/{SubscribeCTA,NewsletterSignup}.tsx
```
Adapt: **create a new Resend audience for GS** (don't reuse Southern Legends);
set `HW_NEWSLETTER_AUDIENCE_ID`.

### #3 — GA4 consent-gated analytics + cookie banner
```
src/app/components/{Analytics,CookieBanner}.tsx
```
Mount `<CookieBanner/>` + `<Analytics/>` in the root layout. Set
`NEXT_PUBLIC_GA4_ID`. Add GS events: `audit_run`, `founding_signup`.

### #4 — Quiz / SEED Diagnostic engine
Replaces the off-site plainspoken.coach handoff.
```
src/app/quiz/page.tsx
src/app/data/{quiz-questions,roi-estimates}.ts
src/app/components/{QuizScoreGauge,QuizReportPdf}.tsx
```
Adapt: rewrite questions/archetypes around **messaging maturity** (the SEED
frame). The archetype + ROI scoring pattern is reusable; the content is not.

### #5 — AI recommendations (Claude)
"What to fix first," layered onto the audit.
```
src/app/api/audit-recommendations/route.ts   # rate-limited; optional Supabase store
src/app/api/competitor-research/route.ts      # optional
```
Adapt: update the model id to a current one (e.g. `claude-sonnet-4-6`); retune
the prompt toward GS messaging language. Set `ANTHROPIC_API_KEY`.

### #6 — SEO / JSON-LD / sitemap / robots
```
src/app/sitemap.ts      # ⚠ references blog + locations; trim to the routes GS ships
src/app/robots.ts
```
Adapt: GS is a multi-service studio — model `Organization` + multiple
`Service`/`Product` entries rather than a single `ProfessionalService`. See
`reference/layout.tsx` for the metadata/OG/Twitter/canonical pattern.

### #7 — MDX blog system
```
src/lib/blog.ts                  # loader: frontmatter, reading time, git dates, H2->FAQ schema
src/app/blog/page.tsx
src/app/blog/[slug]/page.tsx
src/app/blog/feed.xml/route.ts   # RSS
content/blog/*.mdx               # 2 posts included as structure templates — replace with GS content
```
Needs GS-authored content. The two included `.mdx` files show the frontmatter
shape (title, description, date, tags, image, TLDR).

### #8 — Animation/UX components
```
src/app/components/{LenisProvider,ScrollReveal,LetterReveal,SearchTypewriter}.tsx
```
Wrap the app in `<LenisProvider>`. `ScrollReveal`/`LetterReveal` rely on the
`.animate-on-scroll` / `.blur-reveal` classes in `reference/globals.css`.
`SearchTypewriter`'s query list is Headley-specific — edit to GS verticals.

### #9 — Portfolio grid ("The Work")
```
src/app/portfolio/page.tsx
src/app/data/projects.ts    # ⚠ replace with GS's 16 projects + screenshots
```

### #10 — Local SEO location pages
```
src/app/data/locations.ts                       # ⚠ GS's location data
src/app/locations/[city]/page.tsx
src/app/locations/{calhoun-county,etowah-county}/page.tsx
```
Same Alabama footprint, so largely reusable — edit copy/links per location.

### #11 — QR card landing + scan tracking
```
src/app/card/page.tsx
src/app/card/CardScanTracker.tsx   # fires GA4 card_scan if consent given
```
Useful for in-person events (The Aisle, markets). `page.tsx` sets
`robots: { index: false }`. If GS suppresses Nav/Footer on `/card` like Headley
does, replicate that in GS middleware.

---

## 3. Shared components included
`Nav.tsx`, `Footer.tsx`, `BuiltByBadge.tsx` — referenced by multiple features.
Rebrand links/contact. `reference/globals.css` + `reference/layout.tsx` are
**reference only** (don't overwrite GS's versions — merge the tokens/classes).

## 4. What is NOT in this bundle (can't be ported)
The Gather Studio Dashboard (CRM, automations, Iris AI EA) and vertical SaaS
tools need user accounts/auth, Stripe billing, and an agent backend — none of
which exist in Headley Web. Those are net-new builds.

## 5. Suggested verification after install
```bash
npm run build          # type + lint (ESLint blocks raw <img>; use next/image)
grep -rn "REPLACE_ME\|G-XXXXXXXXXX" src/   # finish these before launch
grep -rin "headley" src/                   # only intentional owner keeps should remain
```
Smoke-test the audit route with a real URL, submit the subscribe form (confirm
the Resend contact + welcome email), and confirm GA fires only after consent.
