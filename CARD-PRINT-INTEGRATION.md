# Card Print Integration — Plainspoken Blueprint Digital Card

> **TLDR:** Print vendor research for `/card` feature. Phase 1 = affiliate links only. Phase 2 = Printful API. **Read when:** Building print-to-order integration or updating affiliate links. **Skip if:** Phase 1 affiliate links are already live and you're not building API integration.

---

## Summary

The `/card/[slug]` page currently links to Popl (NFC) and Vistaprint (print) with placeholder affiliate refs. This doc documents the recommended vendors, their affiliate programs, and Phase 2 API integration path.

---

## Phase 1 — Affiliate Links (Current)

No API. Users click out to vendor sites and self-serve. Revenue from affiliate commissions.

### Printful ⭐ Recommended

- **Product:** Business cards, 3.5"×2", minimum 50 cards
- **Pricing:** ~$18 for 100 cards
- **Affiliate:** 10% commission, 12 months post-purchase, 30-day cookie
- **Minimum payout:** $25 USD
- **Program URL:** printful.com/affiliates

**Why Printful over MOO:**
- MOO's developer API appears legacy (last documented 2008–2011); unclear if active
- MOO's affiliate commission is 1–12% (variable) via AffiliateWindow/Commission Junction — more friction
- Printful has a production-ready REST API for Phase 2
- Printful pricing is competitive and the affiliate program is straightforward

### Popl (NFC Card)

- **Product:** NFC card — tap to open digital profile
- **How it works:** Software-first; NFC hardware triggers a URL to the user's digital profile. Users configure their own profile — PB just supplies the URL.
- **Affiliate:** 5–20% per subscription (up to 20% initial, 5% recurring for 12 months)
- **Program URL:** reps.popl.co via Impact platform
- **Integration note:** No API needed for Phase 1. Just link users to Popl and they configure the NFC card to point to their `/card/[slug]` URL.

### MOO (Skip for now)

- Developer API exists but appears undated/legacy
- Higher affiliate friction (AffiliateWindow/Commission Junction)
- Revisit only if Printful API integration fails or MOO launches a cleaner affiliate program

---

## Affiliate Link Update Checklist

When affiliate accounts are live, update the URLs in:

1. **`/card/page.tsx`** — Done step, Popl + Vistaprint affiliate CTAs
2. **`/card/[slug]/page.tsx`** — "Order physical cards" section, both vendor links

**Current placeholder refs:**
```
?ref=plainspokenblueprint
```

**Replace Vistaprint with Printful link** once affiliate account is approved — Printful is the stronger Phase 2 path and has better economics.

---

## Phase 2 — Printful API Integration

**When to build:** After `/card` has generated 50+ QR downloads or 10+ affiliate click-throughs. Validate demand before investing in the API.

**What it enables:** User clicks "Order 100 cards" on their `/card/[slug]` page → PB pre-fills the card design with their name/one-liner/contact info → Printful creates the order → ships directly to the user.

### API Overview

- **Auth:** Bearer token (simple)
- **Endpoint:** `POST /orders` — pass product ID + print file URL
- **Business card product ID:** Check `GET /products` — filter by "Business Cards" (3.5"×2")
- **Docs:** developers.printful.com

### Design Generation for Phase 2

The challenge is generating a print-ready PDF or high-res PNG with the user's card data. Options:

1. **Puppeteer/headless Chrome** — render the `/card/[slug]` page as a PDF, pass the URL to Printful. Easiest path but requires a Puppeteer-compatible serverless function (not standard Vercel).
2. **Canvas API server-side** — generate a 3.5"×2" @300dpi PNG using `node-canvas` or similar. More reliable for print.
3. **Vercel OG image generator** — already in the stack (`@vercel/og`), generates images via Satori. Adapt for print dimensions (1050×600px at 300dpi).

**Recommended Phase 2 path:** Satori-based image generator (zero new dependencies, already on Vercel edge network) → pass generated image URL to Printful API.

---

## Summary Table

| Vendor | Phase 1 | Phase 2 | Commission | Notes |
|--------|---------|---------|------------|-------|
| **Printful** | ✅ Affiliate link | ✅ REST API | 10%, 12mo | Best overall path |
| **Popl (NFC)** | ✅ Affiliate link | ❌ Not needed | 5–20% | Software-first, URL config |
| **MOO** | ⚠️ Skip | ❌ Legacy API | 1–12% | More friction, worse API |
| **Vistaprint** | ✅ Current link | ❌ No API | Unknown | Replace with Printful affiliate |

---

## Popl Affiliate Signup

1. Go to popl.co → footer → Affiliates (or reps.popl.co)
2. Sign up via Impact platform
3. Order one Popl card to verify product experience
4. Get referral link → update `href` in `/card/page.tsx` and `/card/[slug]/page.tsx`

## Printful Affiliate Signup

1. Go to printful.com/affiliates
2. Apply — approval typically 1–3 days
3. Get deep link to business cards product page
4. Update `href` in both card pages (replace Vistaprint link)

---

*Research completed 2026-05-10. Revisit Phase 2 when /card has meaningful traffic.*
