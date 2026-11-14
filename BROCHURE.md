# Headley Web — Trifold Brochure Specs & Workflow

## Files

| File | Purpose |
|------|---------|
| `brochure-trifold-traditional.html` | Working/preview file — open in browser to edit |
| `brochure-trifold-traditional-print.html` | Print-ready file — matched to GotPrint template |
| `print-outside-400dpi.png` | Source export, outside sheet |
| `print-inside-400dpi.png` | Source export, inside sheet |
| `print-outside-gotprint.jpg` | Upload to GotPrint — outside |
| `print-inside-gotprint.jpg` | Upload to GotPrint — inside |

---

## GotPrint Specs (8.5×11 Trifold)

- **Product:** Brochures → 8.5×11 → Trifold (C-fold / Letter fold)
- **Final trim size:** 11" × 8.5" (landscape)
- **Sheet with bleed:** 11.125" × 8.625"
- **Bleed:** 0.0625" per side (NOT the standard 0.125" — GotPrint uses half bleed)
- **Safe zone:** Keep content 0.125" inside trim edge
- **Format accepted:** JPG or PDF
- **Template files:** `~/Downloads/brochure-8.5inx11in-trifold.jpg.zip` (keep for reference)

### Fold Line Positions (measured from GotPrint template)

| Panel | Width | Fold at (from left) |
|-------|-------|---------------------|
| Left (tuck panel — folds inside) | 3.6875" | — |
| Center (inside back) | 3.6875" | 3.6875" |
| Right (outer wrap — front cover) | 3.75" | 7.375" |
| **Total** | **11.125"** | |

> **Critical:** These fold positions are fixed by GotPrint's printing equipment. The HTML panel widths MUST match exactly or the fold will crease through your content.
>
> **How we measured:** Rendered GotPrint's PDF template at 400 DPI with `pdftoppm`, scanned for vertical guide lines. Fold 1 detected at x=1474px = 3.685", Fold 2 at x=2949px = 3.7725". Rounded to 3.6875" and 7.375" for clean CSS values.
>
> **C-fold asymmetry:** Left (tuck) panel is slightly narrower than right (outer wrap) — this is intentional. Wrong panel widths cause the fold to crease through background colors, which we confirmed in GotPrint's instant proof tool.

---

## C-Fold Panel Layout

### Outside sheet (unfolded, left → right)
```
[P5 — Problem/flap] | [P6 — Back cover/contact] | [P4 — Front cover]
      3.6875"                 3.6875"                    3.75"
       (tuck)                 (center)               (outer wrap)
```

### Inside sheet (unfolded, left → right)
```
[P1 — Guide/empathy] | [P2 — Plan/steps] | [P3 — CTA/pricing]
       3.6875"               3.6875"               3.75"
        (tuck)               (center)           (outer wrap)
```

### Fold sequence (how it closes)
1. Right panel (P4/front cover) is the face
2. Left flap (P5/problem) folds in first — seen immediately on opening
3. Center panel (P6/back) is the exterior back when folded shut

---

## HTML CSS Variables (print file)

```css
--p-left:   3.6875in;  /* tuck panel — slightly narrower for C-fold */
--p-center: 3.6875in;
--p-right:  3.75in;    /* outer wrap — slightly wider */
```

Sheet dimensions:
```css
.sheet  { width: 11.125in; height: 8.625in; }
.panel  { height: 8.625in; }
@page   { size: 11.125in 8.625in; margin: 0; }
```

---

## Export Workflow

### 1. Edit the working file
Open `brochure-trifold-traditional.html` in browser. Make changes there first to preview quickly. The working file may use slightly different CSS variable values (screen-optimized) — always apply final changes to the print file too.

### 2. Export PNGs
```bash
bash ~/Developer/webdev/tools/export-html-print.sh brochure-trifold-traditional-print.html 400
```
Outputs: `print-outside-400dpi.png` and `print-inside-400dpi.png`

Expected dimensions: **4450 × 3451 px** (11.125" × 8.625" at 400 DPI)

### 3. Convert to JPG for GotPrint
```bash
sips -s format jpeg -s formatOptions 95 print-outside-400dpi.png --out print-outside-gotprint.jpg
sips -s format jpeg -s formatOptions 95 print-inside-400dpi.png --out print-inside-gotprint.jpg
```

### 4. Upload to GotPrint
- Go to gotprint.com → Brochures → 8.5×11 → Trifold
- Upload outside JPG first, then inside JPG
- Use GotPrint's instant proof to verify fold lines fall on panel boundaries (not through content)
- The proof should show panel backgrounds stopping cleanly at each dotted fold line

---

## GotPrint Order Settings (first order — 2026-04-18)

- **Size:** 8.5×11
- **Color:** Full Color Both Sides
- **Paper:** 100lb Gloss Book (text weight, not cover stock)
- **Fold:** Tri-Fold
- **Quantity:** 100
- **Production:** Regular (3–4 business days)
- **Estimated pickup:** ~2026-04-25

### Paper choice decision
100lb Gloss **Book** (not Cover) — saves ~$20. Cover stock is heavier/stiffer and better for desk leave-behinds. Book stock is thinner like a magazine page but folds cleanly and prints sharp. Acceptable for walk-in pitch brochures that are conversation starters, not long-term leave-behinds. Upgrade to Cover stock if brochures feel too flimsy in hand or clients are keeping them.

### Quantity decision
100 for first run — enough to test without over-committing. Re-order after pitch days confirm what's working.

---

## Image Assets Used

| Panel | Image | File |
|-------|-------|------|
| Front cover (P4) | Google review screenshot | `public/images/google-review-hvac.webp` |
| Back cover (P6) | Matt headshot | `public/images/headshot-matt-headley.webp` |
| Guide (P1) | Matt at laptop | `public/images/laptop-matt-headley.webp` |
| Problem (P5) | Website comparison cartoon | `public/images/quiz-website-checkup-1200-630.webp` |

---

## Copy Notes

- **Villain framing:** "Most businesses around here got sold a website by someone who disappeared after the check cleared." — the villain is the faceless outside agency, not a person or company.
- **Reviews:** Jean E. (Jacksonville) on top, Micah J. (rental business owner) below — both on Panel 1 inside.
- **Value anchor:** "One flat rate. No monthly ad spend. Starting at $495" — bottom of Panel 2.
- **Care line:** "$49–$199/mo. Keeps your site current and your Google listing active." — below phone on Panel 3.
- **Flat rate statement:** Technically accurate — no hourly surprises. Maintenance plans are optional, not required for the build fee.

---

## How We Found the Correct Fold Positions

1. Downloaded GotPrint's template zip files (JPG + PDF + AI)
2. JPG pixel analysis was unreliable — compression artifacts made fold lines ambiguous
3. Rendered the **PDF template** at 400 DPI using `pdftoppm`: `pdftoppm -png -r 400 brochure-*.pdf /tmp/gotprint-template`
4. Scanned columns for non-white pixels to find the three-line guide clusters at each fold
5. Each fold shows three lines: safe zone left | **fold line** (center, lighter) | safe zone right — 0.125" apart
6. Measured: Fold 1 at x=1474px = **3.685"**, Fold 2 at x=2949px = **7.3725"**
7. Rounded to clean CSS values: 3.6875" and 7.375"
8. Inside sheet is printed on the back — columns must be **mirrored**: outside uses `--p-left | --p-center | --p-right`, inside uses `--p-right | --p-center | --p-left`
9. Verified in GotPrint's instant proof tool before ordering

## Known Pitfalls

1. **Fold line mismatch** — if panel widths don't match GotPrint's fold positions, the fold creases through content. Always verify in GotPrint's instant proof before ordering. Left and right outer panels are NOT equal width — left (tuck) is 3.6875", right (outer wrap) is 3.75". Using `--p-outer` for both will be wrong.
2. **Bleed is 0.0625" per side** — smaller than the industry-standard 0.125". Don't add extra bleed margin beyond what the CSS already accounts for.
3. **Export script outputs at screen font rendering** — fonts render slightly differently than print. Acceptable for brochure-level output. If ever upgrading to professional prepress, use a headless print pipeline or export from Figma/InDesign.
4. **QR codes** — generated via `api.qrserver.com` at runtime. If the domain ever changes, update both QR `src` URLs in the print file.
