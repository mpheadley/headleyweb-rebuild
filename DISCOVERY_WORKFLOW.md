# Discovery Workflow — Pre-Meeting Research Playbook

> Repeatable process for prospect research before any discovery call or meeting.
> Built from the Between Worlds session (2026-03-18). Run this the day before.
> Estimated time: 30–60 minutes in Claude Code or Cowork.

---

## Step 0 — What You Need to Start

- Prospect's business name and website URL
- Their industry / service type
- Meeting date/time (for cheatsheet date stamp)

---

## Step 1 — Audit Their Website

Run `fetch-site-audit.py` (located in each client project folder, or copy from `between-worlds/`) against their URL. Captures:

- Mobile + desktop PageSpeed scores
- Meta description present/malformed
- Viewport meta tag (mobile-friendly)
- Canonical tag
- JSON-LD schema (LocalBusiness)
- Pages indexed (`site:` query)

**Key numbers to pull out:**
- LCP (Largest Contentful Paint) — the headline "before" number
- Mobile PageSpeed score (out of 100)
- Desktop PageSpeed score

> If rate-limited by PageSpeed API, wait a few minutes and retry desktop separately.
> The mobile score matters most for local service businesses — lead with that.

---

## Step 2 — StoryBrand Messaging Audit

Run their homepage through `headleyweb.com/quiz` (or the audit tool). Captures:

- Hero / Problem / Guide / Plan / CTA / Stakes / Messaging scores
- Overall grade (out of 30)
- Key copy problems (e.g., "We disease," no adjuster/case manager language, buried services)

**What to look for:**
- Does their hero headline name *who they help* or just describe their business?
- Do they name the specific buyer (adjuster, case manager, property manager)?
- Is the main CTA visible above the fold?
- Is there any problem/pain language, or is it all features?

---

## Step 3 — Keyword Ranking Research

Search for their 2–3 most important keywords in Google/WebSearch:

1. `[service] [city/state]` — their primary local keyword
2. `[niche] [industry vertical] [state]` — any industry-specific modifier

**What to capture:**
- Are they appearing at all (any page)?
- Who is ranking in positions 1–5?
- Is there a Map Pack? Are they in it? Is their GBP claimed?

Record in `BASELINE_METRICS.md` under "Search Rank."

---

## Step 4 — Competitor Analysis

For each top-ranking competitor, note:
- Why they outrank the prospect (state-specific pages, explicit B2B language, content volume, GBP authority)
- One specific thing the prospect could do to close the gap

**Three questions per competitor:**
1. What do they have that your prospect doesn't? (pages, keywords, schema)
2. Who is their copy written for? (general public vs. specific buyer)
3. What's the easiest thing to copy/beat?

This becomes Section 4b of the meeting cheatsheet and the "Who's Outranking You" section of the audit report PDF.

---

## Step 5 — Google Business Profile Check

Search their business name + city in Google Maps. Check:

- [ ] GBP exists?
- [ ] Claimed or unclaimed?
- [ ] Star rating + review count
- [ ] Categories set correctly?
- [ ] Photos present?
- [ ] Website linked?

An unclaimed GBP with any stars is a high-urgency, low-effort talking point. Claim it immediately after the meeting (or show the client how).

---

## Step 6 — Social / Platform Scan (2 minutes)

- Facebook page: follower count, last post date, whether services match the website
- LinkedIn (if B2B): company page exists?
- Yelp / BBB / industry directories: any profiles that need updating?

Flag anything that contradicts the website (e.g., services on Facebook not mentioned on the site).

---

## Step 7 — Populate the Cheatsheet

Update `docs/meeting-cheatsheet.html` with findings:

- Fill in actual PageSpeed scores (mobile + desktop)
- Fill in LCP value
- Check/uncheck technical audit boxes (meta, viewport, canonical, schema)
- Add competitor names and their ranking advantages (Section 4b)
- Note GBP status
- Update the opening hook if the data reveals a stronger angle

---

## Step 8 — Baseline Metrics Doc

Fill in `BASELINE_METRICS.md`:
- All Lighthouse scores
- Keyword ranking status (verified + date)
- Technical audit checkboxes
- Competitor table
- GBP status

This doc becomes your case study "before" numbers. Capture it before anything changes.

---

## Output Files per Client

| File | How to Generate | Purpose |
|------|----------------|---------|
| `BASELINE_METRICS.md` | Fill in manually during Steps 1–6 | Before numbers for case study |
| `docs/meeting-cheatsheet.html` | Edit directly (Steps 7–8) | Source for cheatsheet PDF |
| `docs/meeting-cheatsheet.pdf` | `bash generate-pdfs.sh` | Print and bring to meeting |
| `docs/leave-behind.html` | Edit source content here | Source for next-steps PDF |
| `docs/[client]-next-steps.pdf` | `bash generate-pdfs.sh` | Hand to client at end of meeting |
| `fetch-site-audit.py` | `python3 fetch-site-audit.py` in Claude Code | Quick audit before the meeting |

### Step 9 — Generate All Print PDFs

This is the final step before every meeting. Run from the client project folder in Claude Code:

```bash
# One-time setup only — never needs to run again:
sudo apt-get install -y chromium-browser

# Every meeting from here on:
bash generate-pdfs.sh
```

After the one-time Chromium install, `bash generate-pdfs.sh` from any client folder is all you need going forward.

This produces:
- `docs/meeting-cheatsheet.pdf` — your reference doc, printed and brought to the meeting
- `docs/[client]-next-steps.pdf` — the branded Headley Web leave-behind, handed to the client

**If Chromium isn't available:** The script falls back gracefully. Leave-behind generates via Python. For the cheatsheet, open the HTML in Chrome → ⌘P → Save as PDF (it has `@page` print rules baked in).

**Brand colors:** All HTML docs use Headley Web brand colors — terracotta `#E07B3C` (primary), sage `#6B8F71` (secondary/borders), dark `#1C2826` (text/headers). These are baked into the template files. **Always start new client docs by copying the existing templates** (`meeting-cheatsheet.html`, `leave-behind.html`) rather than creating from scratch — that's how the colors carry forward automatically.

---

## Quick-Reference: Talking Points by Finding

| Finding | Talking Point |
|---------|--------------|
| LCP > 3s | "Your site loads in Xs. That's slow enough that Google penalizes it in rankings — and visitors bounce." |
| Viewport missing | "Your site isn't technically mobile-friendly. Google uses mobile-first indexing, so this hurts your ranking directly." |
| No JSON-LD schema | "Google can't confirm what your business does or where you're located. Schema markup fixes that." |
| GBP unclaimed | "Your Google listing exists but it's unclaimed — meaning someone else could claim it. We fix that immediately." |
| Not ranking for primary keyword | "Right now, when [buyer] searches for [keyword], you don't appear. [Competitor] does. Here's why." |
| StoryBrand < 15/30 | "Your homepage talks about your business. The new site talks to the person who's going to write you a check." |

---

## Notes

- Run the audit the day before, not the morning of — PageSpeed can rate-limit
- Screenshot the GBP listing and SERP results as part of baseline capture
- If WebFetch is blocked (Cowork sandbox), use `fetch-site-audit.py` in Claude Code instead
- The `betweenworlds-report.pdf` (audit tool output) is generated fresh each time via headleyweb.com/quiz — re-run after launch to show the "after" numbers
