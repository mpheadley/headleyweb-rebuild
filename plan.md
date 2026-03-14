# Quiz Enhancements: Site Audit + ROI Lookup Table

## Overview
Add two features to the existing quiz results page:
1. **Quick Site Audit** — optional URL input that runs automated checks and displays results
2. **ROI Lookup Table** — trade-based estimate of lost revenue shown alongside the archetype result

Both appear on the results card after the user sees their archetype. Matt can use the audit data when interpreting results for a client on a call.

---

## Step 1: Add Trade Selection Question to Quiz

Add a 9th question: "What kind of business do you run?" with options:
- Plumbing
- HVAC
- Electrical
- Salon / Barbershop
- Small Engine / Lawn Care
- General Contractor
- Other Local Service

This answer gets stored separately (not added to the personality score) — it drives the ROI lookup.

**File:** `src/app/quiz/page.tsx` — add to questions array with a `scored: false` flag, track trade selection in separate state.

---

## Step 2: Add Optional URL Input to Email Gate / Results Flow

After the email gate (or skip), show an optional field: "Got a website? Paste the URL and I'll run a quick checkup."

- Text input with URL validation
- "Run Checkup" button
- "Skip" link to go straight to results
- If they entered a URL, we fetch `/api/site-audit?url=...` and show results alongside the archetype

**File:** `src/app/quiz/page.tsx` — new state for `siteUrl` and `auditResults`, new UI step between email gate and results.

---

## Step 3: Build the Site Audit API Route

Create `src/app/api/site-audit/route.ts` — a Next.js Route Handler that:

1. Validates the URL (must be http/https, not localhost, etc.)
2. Calls Google PageSpeed Insights API (free, no key required at low volume):
   `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={url}&category=performance&category=seo&category=accessibility&strategy=mobile`
3. Extracts and returns:
   - **Performance score** (0-100)
   - **SEO score** (0-100)
   - **Accessibility score** (0-100)
   - **Is mobile-friendly** (from SEO audits)
   - **Has meta description** (from SEO audits)
   - **Uses HTTPS** (from the URL itself)
   - **First Contentful Paint** (seconds)
   - **Largest Contentful Paint** (seconds)
4. Returns a clean JSON response with plain-English labels

**No API key needed** for PageSpeed Insights at low volume (a few hundred requests/day). If we need more, we can add a key later via env var.

**Timeout:** 30-second timeout on the fetch to Google's API. Show a friendly message if it times out.

---

## Step 4: Build the ROI Lookup Table

Add a data file `src/app/data/roi-estimates.ts` with trade-specific data:

```ts
export const roiEstimates: Record<string, {
  avgJobValue: number;
  monthlySearchVolume: string; // range like "40-80"
  estimatedMissedLeads: string; // range like "15-30"
  estimatedMonthlyLoss: string; // range like "$1,500-$3,000"
  paybackJobs: Record<string, number>; // tier → number of jobs to pay back
}> = {
  plumbing: {
    avgJobValue: 250,
    monthlySearchVolume: "50-100",
    estimatedMissedLeads: "15-30",
    estimatedMonthlyLoss: "$1,500-$3,000",
    paybackJobs: { "Get Found": 2, "Get Calls": 4, "Get Booked": 5 },
  },
  hvac: { ... },
  electrical: { ... },
  salon: { ... },
  "small-engine": { ... },
  contractor: { ... },
  other: { ... },
};
```

Numbers based on typical small-town service business economics in Northeast Alabama market.

---

## Step 5: Display Audit Results + ROI on Results Card

Update the results card in `src/app/quiz/page.tsx` to show two new sections:

### ROI Section (always shown if trade was selected)
Appears right after the "What I'd Recommend" box:
- "What this could be costing you" header
- Shows: avg job value, estimated missed leads/month, estimated monthly loss
- "Your [tier] package ($X) pays for itself in just [N] jobs."

### Audit Section (shown only if URL was provided)
Appears after ROI section:
- "Your Site's Quick Checkup" header
- Score gauges for Performance, SEO, Accessibility (similar to existing PageSpeed gauges on the site)
- Checklist items: HTTPS ✓/✗, Meta description ✓/✗, Mobile-friendly ✓/✗
- Load time stats (FCP, LCP) with plain-English labels
- "Want me to walk you through what this means? Book a free call." CTA

### Matt's Internal Use
The audit results are also useful for Matt when reviewing with a client — he can pull up their quiz result, see the automated audit data, and interpret it on a call.

---

## Step 6: Update Formspree Submission

Include trade and URL in the email submission so Matt has the full picture:
```json
{
  "email": "...",
  "quiz_result": "The DIY Dabbler",
  "quiz_score": 21,
  "trade": "plumbing",
  "site_url": "https://example.com"
}
```

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/app/quiz/page.tsx` | Modify — add trade question, URL input, audit display, ROI display |
| `src/app/api/site-audit/route.ts` | Create — PageSpeed Insights proxy |
| `src/app/data/roi-estimates.ts` | Create — trade-specific ROI lookup data |

No new dependencies needed. Uses native `fetch` for the PageSpeed API call.
