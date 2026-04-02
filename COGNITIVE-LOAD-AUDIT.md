# Cognitive Load Audit — headleyweb.com

**Date:** 2026-04-01
**Status:** Changes implemented, ready for visual review

---

## Cross-Site Redundancy (worst offenders found)

1. **"You own everything"** — appeared 7+ times across homepage, services, about
2. **"Flat-rate, one-time build. No ongoing fees..."** — verbatim on homepage + services
3. **Final CTA block** (audit btn + quiz btn + "Want instant results?" link) — identical on homepage, services, portfolio, about
4. **"How We Get You More Leads" 3-step section** — copy-pasted verbatim from homepage to services
5. **Pricing section** — near-identical on homepage and services (cards, comparison table, founding clients box)
6. **"Currently accepting founding clients"** — both homepage and services
7. **FAQ overlap** — 4 of services' 6 FAQs duplicated homepage FAQs

---

## Page-by-Page Findings

### Homepage (was 11 sections, ~1,005 lines)

| Issue | Severity |
|-------|----------|
| 10 FAQs too many — 4 are operational (timeline, payment, edits, agency vs solo) | High |
| Pricing cards overloaded — features + inherited features + care plan highlights + comparison table | High |
| AI callout in Pain Points — a CTA *before* visitor sees what you do (3 CTAs before services section) | Medium |
| Consequences section restates Pain Points with different words | Low |
| Value prop echo chamber — ownership, flat-rate, local in Pain Points, Trust, Pricing, FAQ, AND Final CTA | Medium |
| Founding clients callout + comparison table add density to an already heavy pricing section | Medium |

### Services (was 9 sections)

| Issue | Severity |
|-------|----------|
| How It Works is 100% duplicated from homepage | High |
| 5 services x 5 bullets = 25 bullets; last 2 overlap with care plans/pricing below | Medium |
| AEO blocks partially duplicate FAQ ("referrals" and "hosting" in both) | Medium |
| Pricing + Care Plans + founding clients all duplicated from homepage | Medium |

### About

| Issue | Severity |
|-------|----------|
| "Local to Jacksonville" and "Calhoun County & Beyond" credentials overlap | Low |
| Otherwise clean — good section flow, appropriate length | — |

### Portfolio, Contact, Quiz, Audit

No significant cognitive load issues. These pages are focused and functional.

---

## Changes Implemented

### Homepage (`src/app/page.tsx`)
- **FAQ: 10 -> 6** — Removed "How long does a project take?", "What happens after launch?", "How does payment work?", "What makes you different from an agency?" (all relocated to services)
- **Pricing cards simplified** — Removed inherited features lists, replaced with one-line "+ everything in Get Found/Get Calls". Collapsed care plan from 3 highlights + 2 links to a single compact line with "See care plan details" link.
- **Comparison table removed** — Added "See full plan comparison" link to services page
- **AI callout box removed** from Pain Points section (premature CTA)
- **Founding clients callout removed** (kept on services page only)
- **faqSchema updated** to match the 6 visible FAQs

### Services (`src/app/services/page.tsx`)
- **How It Works section removed** (100% duplicate of homepage)
- **5 service blocks -> 3 + 2 compact mentions** — "Monthly Care & Growth" and "AI Recommends You" collapsed from full 5-bullet blocks into a 2-column brief with links to care plans
- **FAQ updated** — Removed 2 Qs that duplicated AEO blocks, added 4 operational Qs from homepage. Now 8 unique FAQs.
- **serviceFaqSchema updated** to match visible FAQs
- **"Want instant results?" link removed** from CTA
- **Unused imports cleaned** (Video, Wrench)

### About (`src/app/about/page.tsx`)
- **Credentials: 5 -> 4** — Merged "Local to Jacksonville" and "Calhoun County & Beyond" into one card
- **"Want instant results?" link removed** from CTA
- **Unused imports cleaned** (Globe, Map)

### Portfolio (`src/app/portfolio/page.tsx`)
- **"Want instant results?" link removed** from CTA

### Preserved (by design)
- All AEO/sr-only blocks
- All JSON-LD schemas (updated where visible FAQ changed)
- StoryBrand section flow on homepage (problem -> guide -> plan -> action -> success -> failure)
- `pricing.ts` data unchanged
- Quiz, audit, contact, blog untouched

---

## Still Worth Watching

- **Consequences section** still partially echoes Pain Points — could consider merging/tightening later
- **"You own everything"** still appears on homepage Trust card, pricing, and services — 3 mentions is reasonable but watch for drift
- **Services page is still long** (services detail + why me + AEO + pricing + care plans + FAQ + CTA) — could revisit if bounce rate is high
- **Homepage Final CTA** still restates pricing info — monitor whether that helps or hurts conversion

---

## How to Review

1. `cd ~/Developer/webdev/headleyweb-rebuild && npm run dev`
2. Walk through each page on mobile and desktop
3. Pay attention to: does each section earn its space? Can you understand what Matt does, what it costs, and what to do next without scrolling back up?
4. Check services page FAQ for completeness — it now has the operational questions that were on the homepage
