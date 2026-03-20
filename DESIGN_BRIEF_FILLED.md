# Design Brief — Headley Web & SEO (headleyweb.com rebuild)

> Completed March 2026. All decisions locked in. Ready to build.

---

## Phase 0 — Project Context

**Client name:** Headley Web & SEO
**Trade / niche:** Web design & SEO for local service businesses
**City, State:** Jacksonville, AL (serving NE Alabama — Anniston, Oxford, Gadsden, Talladega, Centre)
**Target customer:** Local service business owners (plumbers, HVAC, contractors, woodworkers, restaurants, nonprofits)
**Primary action we want visitors to take:** Get Your Free Video Audit (transitional CTA) → Schedule a Strategy Call (direct CTA)
**One sentence describing what makes this business different:** I use the StoryBrand framework to build websites that make your customer the hero — not your business — so your phone actually rings.

---

## Phase 1 — Visual References

See [COMPETITOR_RESEARCH.md](COMPETITOR_RESEARCH.md) for full analysis. Key takeaways:

- **What to borrow:** Metrics-first case studies, location pages for local SEO, transparent pricing, social proof components (client logos, trust badges, Google rating)
- **What to avoid:** Generic agency stock photos, "we're #1" ego positioning, dark/techy color schemes that feel cold

### Inspiration direction:
- Neo-minimalist aesthetic (2026 trend — generous whitespace, soft serifs, tactile UI)
- Warm + grounded palette (not the typical agency blue/dark)
- StoryBrand-aligned structure: hero shows customer success, not the guide

---

## Phase 1b — Photography Direction

| Shot | StoryBrand Role | Page Location | Status |
|------|----------------|---------------|--------|
| Professional headshot | The Guide (authority) | About page, testimonial sidebar | Needed |
| Working at desk shot | The Guide (competence) | About page, blog author bio | Needed |
| Client project screenshots | Success/Authority proof | Portfolio, case studies | Have some (current sites) |
| Before/after comparisons | Transformation proof | Case studies | Collect at 30/60 days |
| AI-generated phone w/ reviews | Hero success visualization | Homepage hero | Have (needs Fix 2 post-launch: composite real GBP screenshot) |

---

## Phase 2 — Brand Identity (locked decisions)

### Color Palette: "Sage & Stone"

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#E07B3C` | Terracotta — CTAs, accents, active states |
| `--color-secondary` | `#6B8F71` | Sage green — links, hover glow, supporting accents |
| `--color-dark` | `#1C2826` | Deep forest — nav, footer, dark sections |
| `--color-light` | `#F5F0EB` | Warm cream — body background |
| `--color-text` | `#2D2D2D` | Near-black — body text |
| `--color-text-light` | `#6B7280` | Gray — captions, meta text |
| `--color-white` | `#FFFFFF` | Cards, overlays |

### Typography

| Token | Value | Usage |
|-------|-------|-------|
| `--font-heading` | `'Fraunces', serif` | Headlines — optical sizing, soft serif, neo-minimalist |
| `--font-body` | `'Inter', sans-serif` | Body text — clean, highly legible |
| `--font-size-hero` | `clamp(2.5rem, 5vw, 4rem)` | Hero headline |
| `--font-size-h2` | `clamp(1.75rem, 3vw, 2.5rem)` | Section headings |
| `--font-size-body` | `1.125rem` | Body copy (18px) |

### Buttons: Tactile style

| Token | Value |
|-------|-------|
| `--btn-radius` | `8px` |
| `--btn-shadow` | `0 4px 0 #B85A24` (darker terracotta depth) |
| `--btn-padding` | `0.875rem 2rem` |
| Style | Colored box-shadow gives a "pressable" 3D feel |

### Structural Variations

| Element | Decision | Notes |
|---------|----------|-------|
| **Nav** | Transparent → solid on scroll | Starts transparent over hero, fills with `--color-dark` on scroll |
| **Card hover** | Border glow (sage) | `box-shadow: 0 0 20px rgba(107,143,113,0.35)` + sage border |
| **Section dividers** | Angled clip-path | CSS `clip-path: polygon()` diagonal edge between sections |

### Effects (decide per-section during build)

| Effect | Where | Notes |
|--------|-------|-------|
| `animate-on-scroll` | All sections | Fade-in on scroll (IntersectionObserver) |
| `animate-hero` | Hero section | Entrance animation on load |
| Ken Burns | Hero + photo break sections | Slow zoom/pan on images — better than parallax for mobile |
| Counter animation | Stats section (if used) | Animated number count-up |

---

## Phase 3 — Copy (from BrandScript)

### Hero Section
- **Headline:** "Your Customers Are Searching. Can They Find You?"
- **Sub-headline:** "Stop losing leads to a website that isn't working for you. I build clear, mobile-friendly sites that make your phone ring — for a predictable flat rate."
- **Primary CTA:** "Get Your Free Video Audit"
- **Secondary CTA:** "Schedule a 15-Minute Call"

### Problem Section
- **Headline:** "You Work Too Hard to Be Hidden by Bad Technology."
- **Sub-headline:** "In Northeast Alabama, a simple referral isn't enough when your competitors are easier to find on a smartphone."

### Services (3 cards)
1. **Custom Web Design** — "I build 3-8 page, mobile-ready sites that look professional and actually work for your business."
2. **Local SEO Optimization** — "I optimize your site's structure so local customers find you first when searching for your trade."
3. **Google Business Profile** — "I setup and manage your Google Map listing to drive more phone calls and booked jobs every month."

### How It Works (3 steps)
1. **Schedule Your 15-Minute Discovery Call** — We'll talk about your business goals and identify exactly where you are losing customers online.
2. **I Handle the Technical Heavy Lifting** — From design to local SEO and Google Profile setup, I manage every technical detail for a flat, predictable rate.
3. **You Get Found and Start Booking More Jobs** — Launch your new site and get back to the work you love, while your website works 24/7 to bring you neighbors.

### Guide / About Section
- **Headline:** "A Local Partner Who Understands the Value of a Handshake."
- **Sub-headline:** "No jargon. No runaround. Just a search-optimized site that works as hard as you do."

### FAQ (6 questions)
1. "Do I really need a website if I'm already getting referrals?"
2. "Will I own my website, or will I be locked into a contract?"
3. "I'm not 'tech-savvy.' How much work will this be for me?"
4. "How exactly does local SEO help my business grow?"
5. "What makes you different from a large regional marketing agency?"
6. "How long until I start seeing more calls from my website?"

### Final CTA
- **Headline:** "Ready to Stop Losing Leads to Your Competitors?"
- **Sub-headline:** "Get a clear, search-ready website that grows your business for a predictable flat rate."
- **CTA:** "Get Your Free Video Audit"

### One-Liner (for GBP, social bios)
"I help Northeast Alabama service businesses get found on Google with clear, mobile-friendly websites that make the phone ring."

---

## Phase 4 — CSS Token Block

```css
:root {
  /* Sage & Stone palette */
  --color-primary: #E07B3C;
  --color-primary-dark: #B85A24;
  --color-secondary: #6B8F71;
  --color-secondary-dark: #4A6B4F;
  --color-dark: #1C2826;
  --color-light: #F5F0EB;
  --color-text: #2D2D2D;
  --color-text-light: #6B7280;
  --color-white: #FFFFFF;

  /* Typography */
  --font-heading: 'Fraunces', serif;
  --font-body: 'Inter', sans-serif;
  --font-size-hero: clamp(2.5rem, 5vw, 4rem);
  --font-size-h2: clamp(1.75rem, 3vw, 2.5rem);
  --font-size-h3: clamp(1.25rem, 2vw, 1.5rem);
  --font-size-body: 1.125rem;
  --font-size-small: 0.875rem;
  --line-height-body: 1.7;
  --line-height-heading: 1.2;

  /* Spacing */
  --section-padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 4rem);
  --card-padding: 2rem;
  --gap: 2rem;

  /* Buttons — tactile style */
  --btn-radius: 8px;
  --btn-shadow: 0 4px 0 var(--color-primary-dark);
  --btn-padding: 0.875rem 2rem;

  /* Cards — border glow hover */
  --card-radius: 12px;
  --card-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  --card-hover-glow: 0 0 20px rgba(107, 143, 113, 0.35), 0 0 40px rgba(107, 143, 113, 0.15);

  /* Section dividers — angled clip-path */
  --divider-angle: 3deg;
}
```

> **Note:** These tokens will be mapped to Tailwind CSS `theme.extend` in
> `tailwind.config.ts` rather than used as raw CSS custom properties.

---

## Phase 5 — Go/No-Go

| Item | Status | Decision |
|------|--------|----------|
| Palette (Sage & Stone) | Locked | #E07B3C terracotta + #6B8F71 sage + #1C2826 forest |
| Typography (Fraunces + Inter) | Locked | Fraunces headings, Inter body |
| Button style (tactile) | Locked | 8px radius, colored box-shadow depth |
| Hero layout | Locked | Full-bleed photo (AI phone/reviews), Ken Burns effect, text overlay |
| Nav behavior | Locked | Transparent → solid on scroll |
| Card hover | Locked | Border glow (sage) |
| Section dividers | Locked | Angled clip-path |
| Hero copy | Locked | "Your NE Alabama Customers Are Searching. Can They Find You?" |
| CTA | Locked | "Get Your Free Video Audit" (primary) |
| Effects | Decide during build | Ken Burns, scroll animations, counter — per section |
| Photography | Needs headshot + workspace shot | Have AI hero image (Fix 2 post-launch) |

**Result: GO — proceed to build.**

---

## Post-Launch Tasks

- [ ] Composite real GBP screenshot onto hero phone image (replace AI-generated text)
- [ ] Professional headshot + workspace photo
- [ ] Collect 30/60/90 day metrics for case studies
- [ ] Add client testimonials as they come in

---

*Completed: March 9, 2026*
