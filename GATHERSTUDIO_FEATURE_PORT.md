# Gather Studio — Feature Port Plan (from Headley Web)

**What this is:** A prioritized extraction guide for porting proven features from this
codebase (`headleyweb-rebuild`) into **gatherstudio.app**. All source paths are relative
to this repo's root.

## Context: how the two relate

Gather Studio is the **umbrella brand** over Headley Web — same owner (Matt Headley), same
Northeast Alabama market, same flat-rate website tiers ($495 / $1,495 / $1,995), same core
thesis ("Clever confuses. Clarity sells. We fix your message first."). Headley Web is now
effectively the *websites* service line inside the larger studio.

Because it's the same business, **most of this site's features port directly** — the only
real adaptations are branding/copy and schema breadth (Gather Studio is multi-service +
multi-product, not a single ProfessionalService).

The Gather Studio homepage copy already *promises* several of these features (the instant
URL audit, the founding-member email capture). Tier 1 below closes the gap between the
promise and a working build.

---

## Tier 1 — Launch-critical (the page already promises these)

### 1. Instant URL audit + messaging scorer + PDF report  ← flagship
The GS homepage says: *"Enter your URL and get an instant score — messaging clarity,
PageSpeed, SEO... Takes 30 seconds. No email required."* That is exactly this tool.

This is the single most **on-brand** asset to port. Gather Studio's whole pitch is that
clarity sells; the messaging scorer is the *automated proof* of that claim — it grades
message clarity programmatically.

| Piece | Source file | Notes |
|-------|-------------|-------|
| Audit API | `src/app/api/site-audit/route.ts` | PageSpeed (mobile+desktop) + HTML scrape; includes SSRF guard + per-IP rate limit |
| Messaging scorer | `src/lib/storybrand-scorer.ts` | jargon detection, weak/strong CTA lists, empathy/pain/consequence signals |
| PDF report | `src/lib/generate-report-pdf.ts` | branded jsPDF report; has competitor section (Section 7b) ready but un-auto-populated |
| Audit UI | `src/app/audit/page.tsx` | client flow |
| Shared types | `src/lib/audit-types.ts` | |
| Logo for PDF | `src/lib/logo-icon-data.ts` | **swap to Gather Studio logo base64** |

**Adaptation:** swap branding (logo, colors, "from" copy); keep the audit's existing rule
of never saying "StoryBrand" in client-facing text (it already uses "messaging / clarity"
— perfectly aligned with GS voice). Set `PAGESPEED_API_KEY`.

### 2. Email capture → Resend (founding-member list)
GS homepage: *"Get early access — $29/mo founding price... One email when we launch."* The
Oct 18 Gather Studio Dashboard launch needs this list **collecting now**.

| Piece | Source file |
|-------|-------------|
| Subscribe API | `src/app/api/subscribe/route.ts` (Resend contacts + welcome email) |
| Forms | `src/app/components/SubscribeCTA.tsx`, `src/app/components/NewsletterSignup.tsx` |

**Adaptation:** create a **new Resend audience** for Gather Studio founding members — per
CLAUDE.md, do NOT reuse the Southern Legends audience. Set `RESEND_API_KEY` +
`HW_NEWSLETTER_AUDIENCE_ID` (rename for GS).

### 3. GA4 consent-gated analytics + cookie banner
Drop-in. Lets you measure what converts at launch.

| Piece | Source file |
|-------|-------------|
| GA loader + event delegation | `src/app/components/Analytics.tsx` |
| Consent banner | `src/app/components/CookieBanner.tsx` |

**Adaptation:** new `NEXT_PUBLIC_GA4_ID`. Add GS-specific events: `audit_run`,
`founding_signup`, plus existing `cta_click` / `phone_click` / `form_submit`.

---

## Tier 2 — High value, light adaptation

### 4. Quiz / lead-scoring engine  → the "SEED Diagnostic"
GS currently sends people off-site to `plainspoken.coach` for the SEED Diagnostic.
Embedding the Headley quiz engine keeps that traffic on gatherstudio.app and feeds the same
funnel (diagnostic → personalized result → email capture).

| Piece | Source file |
|-------|-------------|
| Quiz flow | `src/app/quiz/page.tsx` |
| Questions/archetypes | `src/app/data/quiz-questions.ts` |
| ROI estimates | `src/app/data/roi-estimates.ts` |
| Result gauges | `src/app/components/QuizScoreGauge.tsx`, `src/app/components/ScoreGauge.tsx` |

**Adaptation:** rewrite questions/archetypes around *messaging maturity* (the SEED frame)
rather than trade-specific online maturity. The archetype + ROI pattern is reusable; the
content is industry-specific.

### 5. AI "what to fix first" recommendations (Claude)
GS How-It-Works: *"tell you what's broken, and what to do first."* This route already does
exactly that — pair it with the audit output.

| Piece | Source file |
|-------|-------------|
| Recommendations API | `src/app/api/audit-recommendations/route.ts` (Claude, rate-limited) |

**Adaptation:** set `ANTHROPIC_API_KEY`; retune the prompt toward GS's messaging-first
language. Use a current model id (`claude-sonnet-4-6` or newer).

### 6. SEO / JSON-LD / sitemap / robots stack
| Piece | Source file |
|-------|-------------|
| Metadata + schema | `src/app/page.tsx`, `src/app/layout.tsx` |
| Sitemap / robots | `src/app/sitemap.ts`, `src/app/robots.ts` |

**Adaptation:** GS is a multi-service **studio** with a product suite, so model it as
`Organization` + multiple `Service`/`Product` entries (Blueprint Session, websites, the
SaaS tools) rather than Headley's single `ProfessionalService`.

---

## Tier 3 — Polish & content

| # | Feature | Source | Adaptation |
|---|---------|--------|-----------|
| 7 | MDX blog (RSS + auto-FAQ schema, git dates) | `src/lib/blog.ts`, `src/app/blog/` | point at GS content dir; great for Plainspoken methodology posts |
| 8 | Animation/UX polish | `LenisProvider.tsx`, `ScrollReveal.tsx`, `LetterReveal.tsx`, `SearchTypewriter.tsx` | drop-in; the "studio" feel |
| 9 | Portfolio grid ("The Work") | Headley portfolio cards | maps onto the 16-project GS work grid |
| 10 | Local SEO location pages | `src/app/data/locations.ts`, `src/app/locations/[city]/` | same Alabama footprint; transfers if GS wants local ranking |
| 11 | QR business-card landing + scan tracking | `src/app/card/`, `CardScanTracker.tsx` | useful for in-person events (The Aisle, markets) |

---

## What CANNOT be ported from Headley Web

The Gather Studio Dashboard (CRM, automations, daily briefing, the "Iris" AI EA) and the
vertical SaaS products (SermonCoach, PetalStudio, MarketDay, GatherEvents, Bloom Bar) need
infrastructure this site doesn't have:

- **User accounts / auth** (Headley Web has only a PIN-gated admin route)
- **Subscription billing** (Stripe, for the $29/mo tiers)
- **The Iris AI-EA backend** (multi-turn agent + data access)

These are net-new builds, not ports.

---

## Recommended sequence for Oct 18 launch

1. **Founding-member email capture (#2)** — get the list collecting *immediately*.
2. **GA4 + consent (#3)** — measure from day one.
3. **Instant audit + messaging scorer + PDF (#1)** — make the homepage CTA real; it's the
   proof of the "clarity sells" thesis and the strongest lead magnet.
4. **AI recommendations (#5)** layered onto the audit.
5. **SEED Diagnostic quiz (#4)** to replace the off-site handoff.
6. Tier 3 polish/content as time allows.

> **Note on access:** This plan was authored from the `headleyweb-rebuild` repo. The actual
> port requires write access to the Gather Studio repository, which was not reachable in the
> session that produced this doc.
