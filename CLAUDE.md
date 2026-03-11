# Headley Web & SEO — headleyweb.com Rebuild

## Project Overview
Matt Headley's business website. Next.js App Router + Tailwind v4 + MDX blog.
This is both the live business site AND the proving ground for the Next.js starter kit.

## Tech Stack
- **Framework:** Next.js 16.1.6 (App Router, `src/app/`)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`) — no daisyUI (removed due to class conflicts)
- **Fonts:** Fraunces (headings, `<link>` in layout.tsx for optical sizing) + Inter (body, `next/font/google`) + Rock Salt (accent, `<link>` — used sparingly for hero/section emphasis via `LetterReveal` component)
- **Hosting:** Vercel (deploy from GitHub)
- **Analytics:** GA4 (consent-gated — build same pattern as HTML starter kit)
- **Forms:** Formspree (or Vercel serverless — TBD)
- **Blog:** MDX in `/content/blog/` (not yet set up)

## Design System: "Sage & Stone"

### Color Tokens (defined in `globals.css :root` + `@theme inline`)
| Token | Tailwind class | Hex | Usage |
|-------|---------------|-----|-------|
| `--color-primary` | `hw-primary` | `#E07B3C` | Terracotta — CTAs, accents |
| `--color-primary-dark` | `hw-primary-dark` | `#B85A24` | Button shadow, hover |
| `--color-secondary` | `hw-secondary` | `#6B8F71` | Sage — links, card glow |
| `--color-dark` | `hw-dark` | `#1C2826` | Nav, footer, dark sections |
| `--color-light` | `hw-light` | `#F5F0EB` | Body background |
| `--color-text` | `hw-text` | `#2D2D2D` | Body text |
| `--color-text-light` | `hw-text-light` | `#6B7280` | Captions, muted |
| `--color-white` | `hw-white` | `#FFFFFF` | Cards, overlays |

Use Tailwind classes: `bg-hw-primary`, `text-hw-dark`, `border-hw-secondary`, etc.

### Typography
- **Headings:** `font-family: var(--font-heading)` → Fraunces (set on h1-h6 in globals.css)
- **Body:** `font-family: var(--font-body)` → Inter (set on body in globals.css)
- **Hero:** `clamp(2.5rem, 5vw, 4rem)`
- **H2:** `clamp(1.75rem, 3vw, 2.5rem)`
- **Body:** `1.125rem` (18px)

### Component Classes (defined in `globals.css`)
- **`.btn-primary`** — Terracotta tactile button with 3D box-shadow, press-down on hover/active
- **`.btn-secondary`** — Sage outline button, fills on hover
- **`.card-glow`** — White card with sage border-glow on hover
- **`.section-angled`** / **`.section-angled-reverse`** — Diagonal clip-path dividers
- **`.ken-burns-subtle`** / **`.ken-burns-medium`** — Slow zoom on images
- **`.animate-on-scroll`** — Fade-up on scroll (needs IntersectionObserver JS — not yet wired)

## Key Source Documents (in parent `headleyweb-rebuild/`)
- **`website-copy.md`** — ALL website copy. Pull directly into components. Don't rewrite on the fly.
- **`brandscript.md`** — StoryBrand framework, one-liner, soundbytes, brand descriptor
- **`DESIGN_BRIEF_FILLED.md`** — Locked design decisions (colors, fonts, structure, effects)
- **`REBUILD_PLAN.md`** — Full rebuild plan with page list and architecture
- **`BLOG_POST_PLAN.md`** — Planned blog content (MDX)
- **`BUSINESS_STRATEGY.md`** — Revenue model, pricing, growth plan
- **`NEXTJS_KIT_NOTES.md`** — Patterns to extract for the Next.js starter kit

## Build Rules

### Copy
- Pull ALL copy from `website-copy.md`. Never invent copy during the build.
- Hero sub-headline: "Stop losing leads to a website that isn't working for you. I build clear, mobile-friendly sites that make your phone ring — for a predictable flat rate."
- Keep hero headline broad (no geo). Geo goes in JSON-LD `areaServed`, answer-first blocks, footer, trade pages.
- Don't use "StoryBrand" in hero or customer-facing headlines. Use it on About page, Services page, blog posts.

### Structure
- Build one page at a time. Finish and verify before starting the next.
- Build one section at a time within each page. Pause for review after each section.
- Homepage section order: Hero → Pain Points → Services → How It Works → Trust (empathy + benefit cards) → Portfolio → Pricing (Build Tiers) → Pricing (Care Plans) → Consequences → FAQ → Final CTA → Lead Gen Form → Answer-First Block (hidden/SEO)
- Every page needs: unique `<title>`, meta description, OG tags, canonical, JSON-LD

### Styling
- All styles go in `globals.css` or as Tailwind utility classes. No `<style>` blocks in components.
- Use existing component classes (`.btn-primary`, `.card-glow`, etc.) — don't recreate with raw Tailwind.
- New component classes get added to `globals.css` following the existing token pattern.

### Images
- WebP format, `width`/`height` on every `<img>` or Next.js `<Image>`
- Hero: `loading="eager"` / `priority={true}`. Everything else: lazy.
- Large images need `srcset` / `sizes` (or use Next.js `<Image>` which handles this)

### SEO & AEO
- JSON-LD `LocalBusiness` schema on homepage (type: `ProfessionalService`)
- `areaServed`: Jacksonville, Anniston, Oxford, Gadsden, Centre, Talladega + Calhoun/Etowah/Cherokee/Talladega counties
- `FAQPage` schema on any page with FAQ
- `BreadcrumbList` on inner pages
- Answer-first content blocks (100-200 words) on homepage and services page — visible or `<script type="application/ld+json">`
- Brand descriptor: "Headley Web & SEO is a Jacksonville, Alabama web design studio that builds StoryBrand-powered websites for local service businesses in Northeast Alabama."

### Attribution
- HTML comment at top of layout: `<!-- Built by Headley Web & SEO | headleyweb.com -->`
- Footer: "Built by Headley Web & SEO" (this is our own site)
- `<meta name="author" content="Headley Web & SEO | headleyweb.com">`
- JSON-LD `creator` block

### Analytics & Consent
- GA4 gated behind cookie consent (same pattern as HTML starter kit, adapted to React)
- Track: `phone_click`, `form_submit`, `cta_click` events
- No tracking fires until user accepts

### Accessibility
- `prefers-reduced-motion` respected (already in globals.css)
- 4.5:1 contrast minimum on all text
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<footer>`
- Skip-to-content link

## Next.js Kit Notes
After completing each major component or page, update `../NEXTJS_KIT_NOTES.md` with:
- Components that proved reusable (tag with `[EXTRACT]`)
- Pain points to solve differently
Prompt the user: "Want to add anything to the Next.js kit notes?"

## Pages to Build
1. **Homepage** (`page.tsx`) — all sections from website-copy.md
2. **Services** (`services/page.tsx`) — detailed service descriptions + answer-first block
3. **About** (`about/page.tsx`) — owner story + credentials
4. **Portfolio** (`portfolio/page.tsx`) — project cards with screenshots
5. **Contact** (`contact/page.tsx`) — form + Calendly + phone
6. **Blog** (`blog/`) — MDX-powered, launch with 2 posts
7. **Privacy** (`privacy/page.tsx`)

## Existing Site Assets
Copy from `~/Documents/Web Development/headley-web-seo/`:
- `images/` — headshot, brand mark, project screenshots, OG image
- `lead-tracker-setup.gs` — Google Apps Script for lead tracking
