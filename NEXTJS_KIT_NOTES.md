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

### Frontmatter SEO fields — decouple editorial from search [EXTRACT]

**Problem:** `excerpt` does double duty on content/editorial sites — it shows on card grids AND becomes `<meta name="description">`. These are different jobs. A good lede is literary. A good meta description is factual, 150–160 chars, front-loads the keyword, and gives a reason to click.

**Pattern:** Add a `metaDescription` field to frontmatter, fall back to `excerpt` if absent:

```ts
// profiles/[slug]/page.tsx
const { title, excerpt, metaDescription, name, location } = profile.frontmatter;
const seoDescription = metaDescription ?? excerpt;

return {
  title: `${name} — ${location}`,
  description: seoDescription,
  openGraph: { description: seoDescription },
  twitter: { description: seoDescription },
};
```

**In frontmatter:**
```yaml
excerpt: "The literary lede shown on card grids — can be as long as it needs to be."
metaDescription: "The 150–160 char search-optimized version. Front-load the keyword."
```

**Rules:**
- `metaDescription` hard cap: 160 chars. Google truncates anything longer, mid-sentence.
- If no `metaDescription` is set, `excerpt` fires as fallback — so existing content doesn't break.
- Front-load the entity name or primary keyword in the first 60 chars (shown in mobile SERPs).
- Don't write `metaDescription` and `excerpt` as the same sentence — if they're identical, just use `excerpt`.

### `name` vs `title` field split — entity name vs literary headline

For editorial/content sites with creative H1s ("The Burning Bus," "Where Wonder Grows Wild"):

- `title` → literary headline, used as H1 on the page
- `name` → actual entity name ("Freedom Riders National Monument"), used in `<title>` tag and OG

```ts
title: `${name} — ${location}`, // "Freedom Riders National Monument — Anniston, Alabama"
// H1 on page still renders frontmatter.title ("The Burning Bus")
```

This lets the design be editorial while keeping the `<title>` tag findable. Particularly useful for: place profiles, business profiles, person profiles, event pages.

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

## Launch Lessons (March 2026 — headleyweb.com) [EXTRACT]

### GA4 env var: always `.trim()`
Vercel env vars can have trailing whitespace/newlines. The GA4 ID broke `querySelector` because of a newline in the string. **Always** `.trim()` env vars before using in selectors or URLs.
```tsx
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID?.trim();
```

### Button contrast: use `--primary-dark` for btn backgrounds
`#E07B3C` (terracotta) on white text = 2.97:1 — fails WCAG AA. Use `--primary-dark` (`#B85A24`, 4.64:1) as btn-primary background. Keep `#E07B3C` for decorative large text, icons, and accent elements where 3:1 suffices.

### Vercel domain setup: force-issue bare domain cert
When adding a custom domain via `vercel domains add`, the SSL cert for `www.` provisions automatically but the bare domain cert may not. Run `vercel certs issue <domain>` explicitly if bare domain shows cert errors.

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

---

## AEO (Answer Engine Optimization) Patterns [EXTRACT]

Proven patterns from headleyweb.com for making client sites visible to AI answer engines (ChatGPT, Perplexity, Google AI Overviews).

### 1. `llms.txt` — AI Crawler Brief

Place `/public/llms.txt` in every client site. This is the emerging standard for telling LLMs what your site/business is about — like robots.txt for AI crawlers.

**Template structure:**
```
# Business Name
> One-sentence brand descriptor

## About (2-3 paragraphs)
## Services (bulleted, with prices)
## Service Area (cities/counties)
## Contact (url, email, phone)
## Content (blog description)
## Key Pages (full URLs)
```

**Kit action:** Scaffold `llms.txt` from `site.config.ts` data during project init.

### 2. Speakable Schema — Voice + AI Citation

Add `SpeakableSpecification` to every page so voice assistants and AI know which content to quote.

```json
{
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["[data-speakable='true']", "h1"]
  }
}
```

Mark key content with `data-speakable="true"`:
- **Homepage:** Hero sub-headline, brand descriptor block
- **Services:** Answer-first Q&A blocks
- **Blog posts:** TLDR summary, H1

**Kit action:** Add speakable schema to base layout or per-page metadata helper. Create a `<Speakable>` wrapper component.

### 3. Answer-First Content Blocks — Featured Snippet + AI Extraction

Visible Q&A sections on Services and key landing pages. Each block:
- **H3 as a question** (matches "People Also Ask" queries)
- **100-200 word direct answer** in the first paragraph
- Paired with `FAQPage` JSON-LD schema for the same Q&As
- Marked `data-speakable="true"` for voice/AI

**Target questions per client site:**
1. "How much does [service] cost in [city]?" (pricing)
2. "What is [service] and why does my business need it?" (education)
3. "Do I need a [service] if I already get referrals?" (objection handling)
4. Trade-specific: "What should I look for in a [trade] website?" (authority)

**Kit action:** Create an `<AnswerBlock question="..." answer="...">` component that auto-generates both the visible block and the FAQPage schema entry.

### 4. Hidden AEO Brand Block — AI Entity Anchor

A `sr-only` section on homepage and key pages with the full brand descriptor (100-200 words). Contains: business name, location, services, trades served, pricing, differentiators. This gives AI engines a clean, extractable entity summary.

```tsx
<section className="sr-only">
  <p data-speakable="true">
    [Brand descriptor — who, where, what, for whom, pricing, differentiator]
  </p>
</section>
```

**Kit action:** Auto-generate from `site.config.ts` + `services.ts` data.

### 5. Blog AEO Patterns

- **TLDR frontmatter field** → rendered as `data-speakable="true"` block at top of post
- **Question frontmatter field** → used for FAQ schema auto-generation
- **H2-as-question extraction** → auto-builds FAQPage schema from headings containing "?", "Why", "How", "What"
- **Speakable schema** on every blog post targeting TLDR + H1

**Kit action:** These are already built into the MDX blog setup. Extract `buildFaqSchema()` and speakable pattern into kit blog scaffold.

---

## Mobile Hero Patterns (Southern Legends, April 2026)

### Safari dvh gap on pinned GSAP scroll sections [EXTRACT]

`100dvh` recalculates when Safari's bottom chrome hides/shows during scroll, causing GSAP's pinned section to show a gap at the bottom (white or whatever color is behind it). Fix:

1. Capture `window.innerHeight` once at mount in a `stableVh` ref — never recalculate
2. Set section height inline: `sectionRef.current.style.height = \`${stableVh.current}px\``
3. Use the captured value as a **static string** for the ScrollTrigger `end` — arrow functions get re-evaluated on `ScrollTrigger.refresh()` (which fires on resize)

```tsx
const stableVh = useRef<number>(0);

useEffect(() => {
  stableVh.current = window.innerHeight;
  if (sectionRef.current) {
    sectionRef.current.style.height = \`${stableVh.current}px\`;
  }
}, []);

// Inside useGSAP:
end: \`+=${(totalPanels - 1) * stableVh.current}\`, // static string — not a function
```

Set the document background color to match the section so any residual gap is invisible.

---

### `translateZ` + `preserve-3d` + GSAP stagger

When a parent has `transform-style: preserve-3d` (e.g., for GSAP `rotationX` flip transitions), child elements need a minimal `translateZ` to maintain their GPU compositing layer. Removing it entirely causes GSAP `opacity`/`y` stagger animations on those children to delay by the full parent animation duration before firing.

Fix: keep `translateZ(2px)` on content overlays inside `preserve-3d` parents — small enough to avoid visual displacement, large enough to maintain the 3D layer.

---

### iOS Safari: `background-attachment: fixed` doesn't work

`background-attachment: fixed` is not supported on iOS Safari (touch devices generally). Use `@media (hover: hover)` to apply it only on pointer devices:

```css
.grid-topo {
  background-attachment: scroll; /* default — works everywhere */
}
@media (hover: hover) {
  .grid-topo {
    background-attachment: fixed; /* parallax on desktop only */
  }
}
```

---

### Carousel swipe on iOS [EXTRACT]

Native touch swipe for a CSS sliding carousel (no library needed):

```tsx
const touchStartX = useRef<number | null>(null);

const handleTouchStart = (e: React.TouchEvent) => {
  touchStartX.current = e.touches[0].clientX;
  setPaused(true);
};

const handleTouchEnd = (e: React.TouchEvent) => {
  if (touchStartX.current === null) return;
  const delta = e.changedTouches[0].clientX - touchStartX.current;
  if (delta < -50) next();
  else if (delta > 50) prev();
  touchStartX.current = null;
  setPaused(false);
};
```

Apply `onTouchStart` / `onTouchEnd` to the sliding track div. Threshold of 50px prevents accidental swipes on vertical scroll.

---

### React hydration: don't initialize mobile state with useState

`useState(false)` for a mobile check runs server-side. Flipping it in `useEffect` causes a hydration mismatch when the boolean affects inline styles. Move device checks inside `useGSAP` or other client-only callbacks where they never run server-side.

---

### Fraunces `opsz` axis consistency

Fraunces is an optical size variable font. The same font-size at `opsz: 144` vs `opsz: 72` looks dramatically different (high-contrast display vs softer text form). If multiple headline classes use Fraunces, normalize them to the same `opsz` value to avoid inconsistent appearance across cards/components.

```css
/* All headline classes — standardize on opsz: 72 */
font-variation-settings: "opsz" 72;
```

---

## Ready to Extract?

When headleyweb.com is live and you've marked 5+ items with [EXTRACT],
it's time to formalize the Next.js starter kit.

---

## Next.js Starter Kit Plan

A full migration plan exists at: `~/Developer/webdev/nextjs-starter-kit/PLAN.md`

It includes:
- Component library (core layout + page sections + widgets)
- New widgets from edgy-salon-website (lightbox gallery, testimonial carousel, booking modal, expandable pricing, Instagram feed)
- Site config pattern (replaces `{{PLACEHOLDER}}` tokens)
- Project structure and scaffold CLI design
- Migration priority order
