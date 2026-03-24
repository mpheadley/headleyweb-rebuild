# Next.js Starter Kit — Build Notes

> Add to this file while building headleyweb.com.
> When a pattern is proven and reusable, mark it with [EXTRACT] so we know
> to pull it into the starter kit later.

---

## Components Worth Reusing

<!-- As you build each component, note what worked and what you'd reuse -->

| Component | Reusable? | Notes |
|-----------|-----------|-------|
| Navbar | | |
| Footer | | |
| Hero | | |
| ServiceCard | | |
| CaseStudyCard | | |
| TestimonialBlock | | |
| ContactForm | | |
| CookieConsent | | |
| BlogPostCard | | |
| ScoreGauge | Yes [EXTRACT] | Animated circular gauge rings (conic-gradient + IntersectionObserver count-up). Supports `variant="light"` / `"dark"`. Auto-colors green/orange/red by score. Use for Lighthouse scores, client stats, any 0-100 metric. |

---

## Project Structure Decisions

### `src/data/` — Shared Data Files [EXTRACT]

Single source of truth for content that appears on multiple pages. Edit once, updates everywhere.

**Pattern:** Create typed data files in `src/app/data/` (or `src/data/` in kit):

| File | What it holds | Pages that use it |
|------|--------------|-------------------|
| `projects.ts` | Portfolio items (title, description, screenshots, URL, tag, stats) | Homepage results section, Portfolio page |
| `pricing.ts` | Tier names, prices, features, paired care plans | Homepage pricing, Services page |
| `testimonials.ts` | Client quotes, names, businesses, photos | Homepage trust, Portfolio, About |
| `site.ts` | Business name, phone, address, social links, brand descriptor | Nav, Footer, JSON-LD schema, Contact page |
| `faqs.ts` | FAQ items (if same Qs appear on multiple pages) | Homepage FAQ, Services FAQ |
| `locations.ts` | City landing pages (slug, name, county, meta, copy, nearby links) | Location pages, Footer service areas, Sitemap |

**When to use:** Content appears in 2+ places. **When not:** Page-specific copy (hero headlines, meta descriptions) — these should differ for SEO.

**Starter kit scaffold should create `src/data/site.ts` by default** — replaces the old `{{PLACEHOLDER}}` token system with typed imports. Business name, phone number, and address should never be hardcoded in components.

---

### Dynamic Location Pages (SSG) [EXTRACT]

Data-driven city landing pages for local SEO. One template, many pages — each with unique copy.

**Pattern:**
1. **Data file** (`src/app/data/locations.ts`) — typed array with `getBySlug()` and `getAllSlugs()` helpers
2. **Dynamic route** (`src/app/locations/[city]/page.tsx`) — uses `generateStaticParams` + `generateMetadata` for full SSG
3. **Auto-scaling integrations** — sitemap.ts and Footer both import from the same data file, so adding a city = adding one object

**Key decisions:**
- Footer "Service Areas" section (not main nav) — scales cleanly to 10-15+ cities without cluttering navigation
- Cross-linking via `nearby` slugs — each page links to related cities, creating internal link clusters for SEO
- JSON-LD per page: `BreadcrumbList` + `ProfessionalService` with city-specific `areaServed`
- Answer-first AEO block (sr-only) per city for AI/search extraction
- Unique copy per city referencing real landmarks/neighborhoods — avoids duplicate content penalties

**Next.js 16 params pattern:**
```tsx
type Params = Promise<{ city: string }>;
export default async function Page({ params }: { params: Params }) {
  const { city } = await params;
  // ...
}
```

---

## Tailwind / daisyUI Observations

<!-- Which daisyUI components worked well? Which needed overrides? -->
<!-- Which Tailwind patterns did Claude Code generate cleanly? -->

---

## MDX Blog Setup

<!-- What was the setup process? What would you template for next time? -->
<!-- Frontmatter fields that every post needs? -->

---

## CLAUDE.md Instructions That Worked

<!-- What project-level CLAUDE.md instructions made Claude Code effective? -->
<!-- Copy the good ones here so they can go into the Next.js starter kit -->

---

## Pain Points / Things to Solve Differently Next Time

<!-- What slowed you down? What broke? What was confusing? -->

---

## What Carries Over From Vanilla Kit (Confirmed)

- [ ] StoryBrand process (unchanged)
- [ ] Design Brief (unchanged — Phase 1b photography included)
- [ ] Launch Checklist (adapt for Vercel)
- [ ] GA4 event tracking pattern (adapt from vanilla JS to React)
- [ ] Attribution system (footer link, meta, JSON-LD)
- [ ] SEO standards (meta tags, OG, canonical, JSON-LD)
- [ ] Cookie consent pattern (adapt to React component)
- [ ] Domain Name Strategy guide (DOMAIN_STRATEGY.md — brand vs. SEO vs. hybrid)
- [ ] Launch Day Push client deliverable (LAUNCH_DAY_PUSH.md — hand to client at go-live)

## Design Brief Tools [EXTRACT]

- **Font Preview Tool** — `starter-kit/widgets/font-preview.html` is the HTML version. For Next.js, build a `/font-preview` page component that:
  - Loads accent font candidates via `next/font/google` or `<link>` (for optical sizing fonts)
  - Shows live preview of accent text in context (hero, section headings, CTA)
  - Lets user toggle animation styles (fade-rotate, scale-bounce, letter-by-letter, none)
  - Has "Copy My Decision" button
  - Key lesson: `display: inline-block` is required on animated spans — CSS `transform` is ignored on inline elements
  - This is a Design Brief Phase 2f tool — used when a design calls for a handwritten/decorative accent font

- **2025/2026 Effects to Port** — these were added to `starter-kit/widgets/effects.css` (#13-18) and need React equivalents:
  - **Sticky Shrinking Nav** (#13) — client component with scroll listener or CSS `animation-timeline: scroll()`
  - **Smooth FAQ Accordion** (#14) — `interpolate-size: allow-keywords` on `<details>` elements, progressive enhancement
  - **CSS Scroll-Driven Animations** (#15) — `animation-timeline: view()` as progressive enhancement alongside IntersectionObserver fallback
  - **View Transitions** (#16) — Next.js `ViewTransitions` component or experimental `viewTransition` flag in next.config.js
  - **Form Micro-Interactions** (#17) — focus glow, error shake, submit success state
  - **Bento Grid** (#18) — CSS Grid with `span 2` / `span` classes for editorial layouts
  - **`@starting-style`** — CSS entry animations without JS (Chrome 117+, Safari 17.5+, Firefox 129+). Not in effects.css yet, use as progressive enhancement.
  - **Popover API** — native `popover` attribute for tooltips, modals, dropdowns. No JS for show/hide, handles focus trapping + light-dismiss automatically. Baseline across browsers. Use for booking modal, cookie consent, and any overlay component instead of custom JS.
  - **Container Queries** — `@container` lets components respond to parent width, not viewport. Makes cards and widgets truly portable across layouts (sidebar, full-width, bento grid). Use as standard practice for all reusable components in the kit.

---

## Icon System [EXTRACT]

### Use a library — never hand-draw SVG paths

Hand-drawn SVG icons in JSX are a maintenance trap: hard to read, impossible to resize consistently, no hover states, no animation, and they inflate component files. Replace all inline SVG icons with a library before first deploy.

**Install:**
```bash
npm install @heroicons/react lucide-react
```

**Primary: Heroicons** (`@heroicons/react`) — made by the Tailwind team, MIT license, consistent 1.5px stroke weight. Use for all standard UI icons.

```tsx
// outline = 24px, 1.5px stroke — use for large illustrative icons (services, steps, cards)
import { TruckIcon, ChatBubbleLeftRightIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

// solid = 24px, filled — use for small indicators (checkmarks, success states)
import { CheckIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
```

**Secondary: Lucide React** — use only for icons Heroicons doesn't cover (e.g. `CalendarX`, `MapPin`, niche icons).

```tsx
import { CalendarX } from "lucide-react";
```

**Sizing:** Always size via className, not width/height props:
- Large card/section icons: `className="w-12 h-12"` or `w-10 h-10`
- Step circle icons: `className="w-8 h-8"` inside a `w-16 h-16 rounded-full bg-teal/10` container
- Small indicators: `className="w-4 h-4"` or smaller

**Icon-first section pattern (Services cards):**
```tsx
<div className="card border-t-4 border-teal">
  <div className="text-teal mb-4">{svc.icon}</div>
  <h3>{svc.title}</h3>
</div>
```

**Step circle pattern (How It Works):**
```tsx
<div className="mx-auto mb-4 w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center text-teal">
  {step.icon}
</div>
<p className="text-xs font-bold text-teal/50 tracking-widest mb-1">{step.n}</p>
```

**Never use:** raw `<svg>` paths in component files. If you need an icon and neither Heroicons nor Lucide has it, check [heroicons.com](https://heroicons.com) and [lucide.dev](https://lucide.dev) first — the gap is almost never real.

---

## Launch Lessons (March 2026 — headleyweb.com) [EXTRACT]

### GA4 env var: always `.trim()`
Vercel env vars can have trailing whitespace/newlines. The GA4 ID broke `querySelector` because of a newline in the string. **Always** `.trim()` env vars before using in selectors or URLs.
```tsx
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID?.trim();
```

### Button system: 3 named classes, never manual overrides [EXTRACT]
Discovered on Between Worlds (March 2026). The `::before` slide-fill animation causes z-index collision — pseudo-element covers text nodes because `> *` selector only matches elements, not text nodes. Also, using the same color for both text and fill (e.g. teal border + teal fill) makes text invisible mid-hover.

**The fix — three context-aware classes:**
- `btn-primary` — solid filled, always readable on any background. Main CTA.
- `btn-outline` — outline style for light/white backgrounds only.
- `btn-outline-white` — outline style for dark/navy backgrounds only.

**Rule:** never manually override button colors inline. Pick the right class for the context. `btn-secondary` is retired — it was the source of every dark-bg copy-paste override chain.

Both `nextjs-starter-kit/template/src/app/globals.css` and `template/CLAUDE.md` updated.

### Button contrast: use `--primary-dark` for btn backgrounds
`#E07B3C` (terracotta) on white text = 2.97:1 — fails WCAG AA. Use `--primary-dark` (`#B85A24`, 4.64:1) as btn-primary background. Keep `#E07B3C` for decorative large text, icons, and accent elements where 3:1 suffices.

### GSAP ScrollTrigger + React: never use `pin:true`
Discovered on Between Worlds (March 2026). GSAP's `pin:true` moves the target element into a dynamically created pin-spacer div. React doesn't know about this — its fiber tree still points to the original parent. On navigation, React calls `originalParent.removeChild(section)`, but section is now inside the pin-spacer. Result: `NotFoundError: The node to be removed is not a child of this node` — page crashes on every nav from that page.

**Fix:** Use CSS `position:sticky` + a tall wrapper div. Same visual effect, zero DOM manipulation.
```tsx
// Wrapper provides the scroll distance; section sticks visually
<div ref={containerRef} style={{ height: "1300vh" }}>
  <section style={{ position: "sticky", top: 0, height: "100vh" }}>
    ...
  </section>
</div>
```
ScrollTrigger then triggers on the wrapper div (not the section) with `end: "bottom bottom"` — no `pin:true` needed. If you store ScrollTrigger instances for cleanup, put them in an array defined outside the async `init()` so the cleanup closure always has access, even if the user navigates before `init()` completes.

### overflow-x: clip — not hidden — for preventing horizontal scroll
`overflow-x: hidden` on `html`/`body` prevents horizontal scroll from `translateX` animations, but it creates a new scroll container that breaks `position:sticky` on child elements. Use `clip` instead — it clips overflow without creating a scroll container.

```css
html, body {
  overflow-x: clip; /* not hidden — clip preserves position:sticky */
}
```

Add this to `globals.css` from day one, not as a post-launch fix. The translateX animations in `animate-from-left` / `animate-from-right` will cause horizontal scroll on mobile if this isn't set.

### Component classes with hardcoded `color` silently override Tailwind utilities
If a CSS component class (e.g. `.eyebrow`, `.card-title`) sets `color: var(--primary)`, Tailwind color utilities applied alongside it won't work — the component class wins in cascade order. Two safe approaches:

1. **Don't put `color` in component classes** — set color explicitly at each usage site with a Tailwind utility. More verbose, zero surprises.
2. **Use Tailwind's `!` modifier** when you need to override — `!text-white/70` generates `color: rgba(255,255,255,0.7) !important`.

The `.eyebrow` class in the Between Worlds starter had `color: var(--primary)` baked in. Every eyebrow on a dark section needed `!text-white/70` to override it. The kit's `globals.css` should not set `color` on eyebrow/label component classes.

### Cookie banner / secondary button contrast on dark backgrounds
`text-gray-400` (#9ca3af) on a navy background fails WCAG AA (3.96:1 vs required 4.5:1). Minimum for secondary/decline actions on dark backgrounds: `text-gray-300`. Audit the cookie banner as part of every Lighthouse run — it appears on every page but is easy to miss since it overlays the bottom of the screen.

### Vercel domain setup: force-issue bare domain cert
When adding a custom domain via `vercel domains add`, the SSL cert for `www.` provisions automatically but the bare domain cert may not. Run `vercel certs issue <domain>` explicitly if bare domain shows cert errors.

### Vercel GitHub webhook: verify after initial setup
The GitHub → Vercel auto-deploy webhook can fail silently. Pushes appear to succeed on GitHub but Vercel never receives them (builds show "Error" in 9 seconds — not enough time to actually build). Verify by: push a commit, open the Vercel dashboard, confirm a build starts within 30 seconds. If not, use `vercel deploy --prod` from the CLI as an immediate fix, then investigate the webhook in Vercel project settings → Git. Re-connecting the GitHub repo usually resolves it.

### Vercel: Next.js app must be at repo root (or set Root Directory immediately)
If the Next.js app lives in a subdirectory (e.g. `site/`, `headleyweb/`) because the repo also holds docs and assets, Vercel will fail to find `pages` or `app` and the build will error. Fix: Vercel → project → Settings → General → Root Directory → set to the subdirectory name. **Do this before the first deploy, not after something breaks.** Better long-term: structure new projects with the Next.js app at the repo root and keep docs/assets local or in a separate repo. The subdirectory pattern has caused this issue on every project where it appeared.

### Vercel: add `vercel-build` script to `package.json`
Vercel looks for a `vercel-build` script before falling back to `next build`. If the script is missing and Vercel's root directory is misconfigured (see above), the build errors cryptically rather than falling through gracefully. Add this to every new project's `package.json` as a default:
```json
"vercel-build": "next build"
```

### Vercel env vars: must be set in Vercel dashboard/CLI
`.env.local` is gitignored and not deployed. After setting `NEXT_PUBLIC_GA4_ID` locally, also run:
```bash
echo "G-XXXXXXXXXX" | vercel env add NEXT_PUBLIC_GA4_ID production
```
Then redeploy (`vercel --prod`) for it to take effect.

### Favicon: use `src/app/favicon.ico` + `src/app/apple-icon.png`
Next.js App Router auto-serves these — no `<link>` tags needed. Carry brand mark from Design Brief Phase 2 into favicon early, not as a post-launch fix.

### Formspree honeypot: add to all forms
```tsx
<input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
```

### robots.ts + sitemap.ts: create during scaffold, not launch
These are boilerplate. Should be in the Next.js starter kit template from day one.

### Hero LCP: never use CSS `background-image`
CSS `background-image` URLs aren't discovered until CSS is parsed + layout is computed, causing massive render delay (79% of LCP time on headleyweb.com — 3s delay on a 39KB image). Always use `<Image fill priority>` for the hero background:
```tsx
<div className="absolute inset-0 ken-burns-subtle" aria-hidden="true">
  <Image src="/images/hero.webp" alt="" fill priority sizes="100vw" quality={80} className="object-cover" />
</div>
```
Next.js automatically injects `<link rel="preload">` + `fetchpriority="high"`. No manual preload needed. This applies to any full-bleed background image that could be the LCP element — not just heroes.

### OG image: design tool pattern
Keep `og-preview.html` as a local design tool (gitignored). Design at 1200x630, screenshot, convert with `cwebp -q 85`. Fewer words at larger size beats more info at smaller size.

### Google Fonts render-blocking
`<link rel="stylesheet">` for Google Fonts blocks first paint. The `display=swap` param helps (shows fallback font immediately) but LCP still suffers. Future kit should explore self-hosting Fraunces via `next/font/google` if optical sizing can be preserved.

## TODO: Port from headleyweb.com build

> These patterns were developed during the headleyweb.com rebuild and need to be
> ported into the Next.js starter kit once formalized.

- [ ] **AI/zero-click problem framing** — STORYBRAND_PROMPT.md now prompts for the "search has changed" angle (80%+ zero-click, AI answers, map pack). Port this into the Next.js StoryBrand process so client BrandScripts naturally include the AI dimension. The old "outdated website" framing is a symptom; "the way people search has changed" is the root cause. Blend both.
- [ ] **83% stat usage guide** — 83% zero-click rate when AI Overviews trigger (source: click-vision.com, cited in AEO_RESEARCH.md). Use "over 80%" in customer-facing copy; cite 83% in blog posts and data contexts. Good for: blog posts, YouTube video hooks, stats sections, AI Visibility service descriptions.
- [ ] **Site Audit Tool [EXTRACT]** — Full automated audit page with API routes. Components: `/audit` page, `/api/site-audit` (PageSpeed + cheerio StoryBrand scorer), `/api/send-report` (Resend email + PDF), `generate-report-pdf.ts`, `QuizScoreGauge`, `AuditCheck`, `StoryBrandItemRow`, `QuizReportPdf`. For starter kit: make branding configurable (colors, logo, company name, phone, from-email) via `site.config.ts`. Internal view key via env var. Optional trade selector for ROI estimates. This is the top-of-funnel lead gen tool — every client site could have one if white-labeled.
- [ ] **AEO Brand Grader as CTA option** — secondary transitional CTA for AI/search-aware contexts
- [ ] **Launch Day Push deliverable** — client-facing checklist for day-of-launch social/review push
- [ ] **Build Report HTML template [EXTRACT]** — Client-facing printable document showing what was built, before/after images, "still needed" checklist, and Phase 2 pitch. Proven on Between Worlds. Extract as a template with `{{CLIENT_NAME}}`, `{{DRAFT_URL}}`, `{{DATE}}` placeholders. Image comparison section is project-specific — keep as an optional block. Goes in `tools/docs-templates/build-report.html`. Saves ~1hr per project.
- [ ] **Pipeline workflow doc** — Codify when to advance pipeline stage, what belongs in Contact Notes vs Pipeline Notes vs Next Action. Pattern proven across Dart Side, RED Enterprise, Between Worlds. Not code — a process doc for `tools/` or `starter-kit/WORKFLOW.md` extension.

---

## Ready to Extract?

**headleyweb.com and Between Worlds are both live. Time to build the kit.**

Start a new Claude Code chat session — do not continue kit work in a project session.
The prompt to use is in `headleyweb-rebuild/NEXTJS_KIT_NOTES.md` (this file, above — see [EXTRACT] items).

**First tasks for that session:**
- Read `nextjs-starter-kit/PLAN.md`, `CLAUDE.md`, and the existing `template/` before touching anything
- Read all three shipped Next.js sites for working implementations (headleyweb, between-worlds, check if southern-legends is Next.js)
- Fix `AnimateOnScroll` location — currently in `components/seo/`, should be `components/ui/` or `components/`
- Audit `template/globals.css` — needs `overflow-x: clip`, directional animation classes, and all other `[EXTRACT]` patterns
- Rewrite starter kit `CLAUDE.md` as directives for Claude Code, not developer docs — include explicit component inventory so nothing gets rewritten from scratch

---

## Next.js Starter Kit Plan

A full migration plan exists at: `~/Developer/webdev/nextjs-starter-kit/PLAN.md`

It includes:
- Component library (core layout + page sections + widgets)
- New widgets from edgy-salon-website (lightbox gallery, testimonial carousel, booking modal, expandable pricing, Instagram feed)
- Site config pattern (replaces `{{PLACEHOLDER}}` tokens)
- Project structure and scaffold CLI design
- Migration priority order
