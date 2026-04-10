# headleyweb.com Plan

> Site is **LIVE** on Vercel. Launched 2026-03-13. Lighthouse 95/100/100/100.
> This doc now tracks post-launch growth work and reference material.

---

## Post-Launch Roadmap

### Location Pages (Local SEO)
Create city-specific landing pages targeting "[service] + [city]" keywords. Each page should:
- Target a specific city in the service area
- Include unique copy about serving that city (not duplicate content)
- Reference local landmarks, neighborhoods, or context
- Include a CTA to contact/schedule
- Have proper meta tags, JSON-LD with areaServed, and canonical URL

**Pages to Create:**
- [ ] `/locations/anniston/` — "Web Design in Anniston, AL"
- [ ] `/locations/oxford/` — "Web Design in Oxford, AL"
- [ ] `/locations/gadsden/` — "Web Design in Gadsden, AL"
- [ ] `/locations/jacksonville/` — "Web Design in Jacksonville, AL"
- [ ] `/locations/talladega/` — "Web Design in Talladega, AL"
- [ ] `/locations/centre/` — "Web Design in Centre, AL"

**SEO rationale:** Competitors like Jessica Leigh Web Design and Jay Forde use this strategy to capture "[web design] + [city name]" search traffic. Each page ranks independently for its target city.

---

### Prospecting: Audit-as-Outreach (Phase 2 — After Warm Network)

> Full playbook in [COMPETITOR_RESEARCH.md → Prospecting Playbook](COMPETITOR_RESEARCH.md)

**When to activate:** Once the warm network (Sebastian referrals, Southern Legends subjects, church/farmers market contacts) has been worked through and Phase 2 paid client slots need filling.

Use the existing audit tool (headleyweb.com/audit) to generate branded PDF reports for competitor clients. No new code needed — the tool is built, the prospect list is identified.

**Priority targets:**
- [ ] Run audits on Plexamedia's clients: Kings Olive Oil Company, The Factory Gadsden, Gadsden Industrial Supply
- [ ] Search Google for `"designed by widenet"` / `"built by widenet"` — identify 5-10 weak client sites, run audits
- [ ] Send PDF + personal note to each prospect ("I noticed your site while researching local businesses — thought you'd want to see this free checkup")
- [ ] Follow up with free Loom video walkthrough for anyone who responds

**Supporting content (publish before activating outreach):**
- [ ] Finish "5 Questions to Ask Before Hiring a Web Designer" blog post (draft exists) — bottom-of-funnel, every question maps to a competitor weakness. Works as both a blog post and a leave-behind PDF.

**Trust signal:**
- [ ] Get BBB accreditation (~$400-600/yr) — only Plexamedia has this locally. Removes their one advantage + adds .org backlink. Revisit when revenue justifies the spend.

---

### Lead Generator & Email Nurture

#### Lead Generator for headleyweb.com
- [ ] Create lead generator asset (PDF checklist or interactive quiz)
- [ ] Build landing page at `/checklist` or `/free-guide`
- [ ] Wire up email capture (Formspree or Mailchimp)
- [ ] Add transitional CTA to homepage hero, blog sidebar, and exit intent

#### Nurture Email Sequence
- [ ] Set up email automation (Mailchimp free tier or similar)
- [ ] Write 5-email sequence from `brandscript.md` nurture outline
- [ ] Connect lead generator form → email automation
- [ ] Test full flow: download → email 1 → ... → email 5

#### Lead Generator Template for Starter Kit
- [ ] Create `lead-generator.html` template page in starter kit
- [ ] Simple landing page: headline + value prop + email capture form
- [ ] Include in `create-site.sh` as optional add-on (like trade pages)

---

### Social Media Reintroduction (Pre-Marketing)

Break radio silence with an honest reintroduction before promoting the business. Three-post sequence:

1. **Post 1 — The Reintroduction** (no CTA)
   - [ ] Write and publish. Honest, short. Where you've been, where you are. "Broken and becoming" energy — acknowledge the grief and the silence without over-explaining, then name what you're building. No sales pitch.
2. **Post 2 — What You're Building** (a few days later)
   - [ ] Light, forward-looking. This is where Headley Web enters naturally. Let the reintroduction do the emotional work — this one just says "here's what I'm doing now."
3. **Post 3+ — Normal posting resumes**
   - [ ] Business content, viral builds, blog shares, etc. The reintroduction did its job — stop circling back to it.

**Rules:**
- Don't let the hard season become the brand. One strong reintroduction, maybe one callback, then shift to the work.
- Post to personal Facebook first (that's where the silence was noticed), then headleyweb.com socials.
- This sequence should run BEFORE the viral speed-build posts or blog distribution pushes.

---

### Blog Content (Ongoing)

> Full blog post plan with status tracking: [BLOG_POST_PLAN.md](BLOG_POST_PLAN.md)

**Publishing cadence:** 2 posts/month minimum. Use Claude to research and draft, then edit for your voice.

**Distribution:** Run the [BLOG_POST_PLAN.md](BLOG_POST_PLAN.md) Distribution Checklist for every published post (Facebook groups, personal social, email list, GBP post, LinkedIn). Distribution is where Phase 1 leads come from — don't just publish and hope SEO does the work.

| # | Title | Target Keywords | Funnel Stage |
|---|-------|-----------------|--------------|
| 1 | "Why Your Website Isn't Converting (And the Framework That Fixes It)" | website not converting, small business website | Top |
| 2 | "Web Design for Plumbers: What Actually Gets Phone Calls" | web design for plumbers, plumber website | Middle |
| 3 | "StoryBrand for Small Business: A Practical Guide" | storybrand small business, storybrand website | Top |
| 4 | "How Much Should a Small Business Website Cost in 2026?" | small business website cost, website pricing | Middle |
| 5 | "5 Things Your HVAC Website Needs to Rank on Google" | HVAC website, HVAC SEO | Middle |

#### Local Legends Blog Post
- [ ] "I Built a Local Storytelling Site to Prove Small Businesses Deserve Better Websites" — walkthrough of the Local Legends build (Next.js, MDX, editorial design). Demonstrates the stack AND tells a story about caring about local businesses. See BLOG_POST_PLAN.md Phase 4 (#25).

#### Blog Features Still Open
- [ ] Tag/category filtering
- [ ] RSS feed (good for SEO, simple to generate)

---

### Audit Landing Page Template (Phase 3 blog content)
- [ ] Build reusable `/audit/[trade]-[city]` page template (video embed + observations + CTA)
- [ ] First instance: "I Googled [Plumber] in Anniston" — screen record + landing page
- [ ] Component: `<AuditLandingPage trade="" city="" videoUrl="" observations={[]} />`
- [ ] Share as Reel/TikTok, landing page is the conversion point → Clarity Sprint booking
- [ ] See [BLOG_POST_PLAN.md](BLOG_POST_PLAN.md) Phase 3 for full details

---

### Vanilla Starter Kit AEO Updates
- [ ] Update `index.html` — add `FAQPage` schema to FAQ section
- [ ] Update `index.html` — add `HowTo` schema to process section
- [ ] Update `index.html` — upgrade `LocalBusiness` to use `{{CLIENT_SCHEMA_TYPE}}` token
- [ ] Update `services.html` — add answer-first content block + `Service` schema
- [ ] Add `{{BRAND_DESCRIPTOR}}` token to templates (meta description, JSON-LD, about page)
- [ ] Add `{{CLIENT_SCHEMA_TYPE}}` token to `create-site.sh` wizard
- [ ] Update CLAUDE.md "Standards Already in Starter Kit" section

---

### Viral Content Marketing (Weekend Speed-Builds)

Weekend side projects, 2-3 hours each.

**The play:** Build absurd satirical business sites using your own starter kit/Next.js kit, screen-record the build, post the result + time-lapse to local Facebook groups. Punchline: "I built this in an afternoon — imagine what I can do for YOUR business" with a link to headleyweb.com.

**Planned builds:**
- [x] **Emotional Support Chicken** — DEPLOYED to Vercel. Project: `emotional-support-chicken/`.
- [ ] **[Wife's Fake Business TBD]** — feet pics or similar. Film the build as couple content for TikTok/Reels. Different design style than the chicken (luxury minimalist vs. farmhouse wellness). Separate session.
- [ ] **"AI Builds Its Own Website"** — screen record Claude building a site about itself. Meta, shareable, tech-curious audience. Could double as blog post: "I used AI to build this site in 2 hours. Here's what it got right and what I had to fix."

**Idea backlog (pick from these for future builds):**
- Professional Porch Sitting — certified rocking chair consultants, sweet tea pairings
- Waffle House Sommelier — scattered/smothered tasting menus, hash brown flight pairings
- Professional Church Potluck Judging — certified casserole evaluators, deviled egg rankings
- Competitive Napping League — rankings, training programs, regulation pillow specs
- Professional Apology Writer — packages from "forgot your birthday" ($29) to "I said what at Thanksgiving" ($499)
- Artisanal Ice Cubes — hand-carved, single-origin water, subscription delivery
- Kids' Lemonade Stand: Enterprise Edition — LLC formation, franchise opportunities, investor deck
- Marriage Referee Service — certified dispute resolution for thermostat wars
- Premium Dirt — organic locally-sourced Alabama red clay, farm-to-yard, skincare line
- The Infinite Portfolio — a website whose only content is showcasing itself

**Content deliverables per build:**
- Finished site deployed (Vercel or Netlify)
- 60-second time-lapse of the build process (screen record)
- Post to Calhoun County / NE Alabama Facebook groups
- Share on personal social + headleyweb.com socials
- Link back to headleyweb.com in footer, FAQ, and post caption

**Success metric:** One viral local post = name recognition in target market. Nobody shares "check out this web designer's portfolio" — but they absolutely share "this dude built a professional website for emotional support chickens."

---

### Next.js Kit Component Porting

When building the Next.js kit, port the vanilla HTML/CSS widget variants into React components with prop-based variant selection. The vanilla widgets are the source of truth — port when ready, don't pre-build.

#### Hero Component
Source: `starter-kit/widgets/hero-variants.html`
```jsx
<Hero variant="default" />   // full-bleed photo + overlay
<Hero variant="split" />     // text left, image right (angled divider)
<Hero variant="video" />     // video background + dark overlay
<Hero variant="bold-type" /> // no image, oversized typography + accent gradient
```
- CSS stays nearly identical — move to Tailwind classes or CSS module
- Video variant needs `<video>` with `prefers-reduced-motion` fallback
- Bold-type variant uses `clamp()` sizing — keep as custom CSS

#### ProcessSteps Component
Source: `starter-kit/widgets/process-variants.html`
```jsx
<ProcessSteps variant="default" />         // horizontal card grid
<ProcessSteps variant="craftsman-grid" />  // dark bg, large serif numbers, connecting line
<ProcessSteps variant="tactical-cards" />  // dashed borders, crosshair badges
<ProcessSteps variant="circle-steps" />    // big colored circles, dotted connector
<ProcessSteps variant="timeline" />        // vertical gradient line, numbered circles
<ProcessSteps variant="stepper" />         // horizontal compact circles, app-like
<ProcessSteps variant="zigzag" />          // alternating left/right with images
<ProcessSteps variant="icon-forward" />    // no cards, large icons lead
```

#### CaseStudy Component
Source: `starter-kit/case-study.html`
- Metrics-first layout as a reusable component
- Before/after screenshot grid
- Results table with highlight column
- Testimonial callout with brand accent

#### Action Items
- [ ] Port hero variants to `<Hero variant="..." />` component
- [ ] Port process variants to `<ProcessSteps variant="..." />` component
- [ ] Port case study template to `<CaseStudy />` component
- [ ] Port before/after slider widget to React component
- [ ] Create Storybook or preview page showing all variants side-by-side
- [ ] Document variant options in component props/README

---

### "Broken and Becoming" Copy Updates
Thread the honest origin story into the right places at the right depth:

- [ ] **About page bio** — Replace Paragraph 1 with revised version that names the loss and connects it to the work. One paragraph, steady and forward-looking. (Draft in `content/blog/drafts/copy-updates.md`, needs further revision to include the "broken and becoming" angle rather than just generic resilience.)
- [ ] **Southern Legends self-profile** — Write Matt's own profile as the first Southern Legends piece (500-800 words). This is where the full weight of the story lives — grief, excitement, both at once. Sets the editorial tone for every profile after.
- [ ] **Homepage** — Don't touch. Customer is the hero there.

---

### Services Page — Phase 2 Visual Upgrade
- [ ] Replace Web Design service card icon with a real project screenshot (Dart Side, ESC, etc.)
- [ ] Replace Google Business Profile icon with a GBP listing screenshot showing reviews/map pack
- [ ] Leave SEO and Monthly Care as icons (concepts too abstract to photograph well)
- [ ] Mixed icon/image treatment needs intentional layout — revisit card design at that point

### Portfolio Data Collection (Ongoing)
- [ ] Screenshot client sites before your build goes live (the "before")
- [ ] Ask for testimonials immediately after launch
- [ ] Check metrics at 30 and 60 days post-launch
- [ ] Add Local Legends to portfolio page — personal project / creative showcase card. Demonstrates Next.js + MDX editorial design, storytelling about NE Alabama small businesses. Deploy to Vercel first.

---

## Reference Material

### Tech Stack

| Layer | Tool | Why |
|-------|------|-----|
| Framework | Next.js (App Router) | SSG/SSR, image optimization, MDX support, future-proof |
| Styling | Tailwind CSS v4 + daisyUI (npm) | Utility classes + 65 polished components, build-time CSS |
| Blog | MDX | Markdown + React components, lives in Git, no CMS overhead |
| Hosting | Vercel (free tier) | Zero-config deploys from GitHub, automatic preview deploys |
| Analytics | GA4 (consent-gated) + Search Console | Same as current kit, plus event tracking on CTAs |
| Forms | Formspree or Vercel serverless function | Contact form submissions |
| Domain | headleyweb.com (existing) | Point DNS to Vercel |

### Competitor & Inspiration Research

See [COMPETITOR_RESEARCH.md](COMPETITOR_RESEARCH.md) for full analysis of local competitors, StoryBrand designers, trade-focused freelancers, and best-in-class portfolio sites.

### Pricing & Retainer Model

#### Lessons Learned from First Clients
- Client #1 ghosted after free build — no deposit, no commitment signal
- Client #2 hasn't started paying despite completed site
- Buying domains on behalf of clients creates ongoing liability
- Free builds work as a flywheel (Hormozi strategy) but need commitment filters

#### Hormozi Flywheel — Current Phase (price ramp over time)

Strategy: offer free/discounted builds to get portfolio, testimonials, and referrals,
then incrementally raise prices as proof accumulates.

| Phase | Build Fee | Monthly | Commitment Required |
|-------|-----------|---------|-------------------|
| Phase 1 (NOW) | Free | $49-79/mo | Agreement signed + client buys domain + content delivered |
| Phase 2 | 80% off ($99-159) | $49-79/mo | Same + small deposit |
| Phase 3 | 60% off ($198-318) | $49-79/mo | Same + 50% deposit |
| Phase 4 | 40% off ($297-477) | Full price | Same + 50% deposit |
| Phase 5 | Full price | Full price | Standard terms (below) |

**Phase 1 approach (minimum friction, maximum acquisition):**
- YOU handle everything — grab photos from their existing online presence, write copy, buy domain if needed
- Goal is portfolio pieces and case studies, not revenue
- Only real ask: agree to monthly support after launch + give a testimonial
- Add friction gradually as you move through phases (domain ownership, deposits, content requirements)
- The commitment filters below are for Phase 3+ when you're charging real money

#### Target Build Pricing (full price — Phase 5 goal)

| Tier | Price | Deposit | Pages | What's Included |
|------|-------|---------|-------|-----------------|
| Kickstart | $495 | $250 up front | 1 page (single-page scrolling) | Mobile-friendly, contact form, basic on-page SEO |
| Starter | $1,495 | $750 up front | 3–5 pages | Full local SEO, Google Business Profile setup |
| Professional | $2,995 | $1,500 up front | 5–7 pages | Custom design, advanced SEO, GBP, portfolio, priority support |
| Sales Engine | $7,495 | $3,750 up front | 7+ pages + blog | Next.js stack, StoryBrand session, advanced SEO, content strategy |

> **Note:** Current live pricing on headleyweb.com is $495 / $795 / $1,195.
> Raise to target prices after 2–3 case studies with measurable ROI data.

**Rules going forward:**
- 50% deposit before any work begins (non-refundable, covers initial design + setup)
- Remaining balance due before site goes live
- Client buys their own domain (walk them through Namecheap on the discovery call)
- You manage DNS as part of the build; they own and pay for the domain directly
- Scope, timeline, and deposit agreed in writing before work starts

#### Monthly Support Tiers (renamed from "Care" plans)

| Tier | Price | What's Included |
|------|-------|-----------------|
| **Maintain** | $49/mo | Hosting, security updates, uptime monitoring, 1 hr/mo minor edits |
| **Grow** | $149/mo | Maintain + 1 blog post/mo, monthly traffic report, 1 GBP post/mo |
| **Accelerate** | $349/mo | Grow + 2 blog posts/mo, email newsletter (1 send/mo), lead funnel page, quarterly strategy call |

**Notes:**
- Maintain is the baseline — every client should be on this after launch
- Grow is the upsell for clients who want content marketing but can't do it themselves
- Accelerate is the aspirational tier — path toward the $2,500/mo retainer goal
- Dog-food all three tiers on headleyweb.com to build proof and process
- First 3 months of Maintain included with every build (existing policy, keeps clients engaged)
- These prices are v1 — iterate after 3-6 months based on actual time spent per client

#### Domain Ownership Policy
- Client registers and pays for their own domain (Namecheap recommended, ~$10-15/yr)
- You configure DNS during the build
- If a client ghosts, the domain is their responsibility — no ongoing cost to you
- For existing clients where you bought the domain: transfer via Namecheap push-to-account or let expire

### AEO Standards (baked into every page)

1. **Trade-specific JSON-LD sub-types** — use `ProfessionalService`, `WebDesigner`, etc. instead of generic `LocalBusiness`. For client sites: `HVACBusiness`, `Plumber`, `Electrician`, `LandscapingService`, etc.
2. **FAQPage schema** on every page with FAQ content — not just the FAQ page.
3. **HowTo schema** on process/how-it-works sections — tells AI models this is instructional content.
4. **Answer-first content blocks** — every service page and trade page starts with a 100-200 word direct answer to the searcher's implied question.
5. **Brand descriptor** — a consistent 1-2 sentence description used across site, GBP, directories, and structured data. Defined in `brandscript.md`, referenced everywhere.
6. **Service schema with areaServed** — list specific towns and zip codes, not just "Alabama."

### Analytics & Tracking

#### Standard (every site, including client sites)

```javascript
// GA4 event tracking — add to all sites
// Track phone link clicks
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    gtag('event', 'phone_click', {
      event_category: 'contact',
      event_label: link.href
    });
  });
});

// Track form submissions
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', () => {
    gtag('event', 'form_submit', {
      event_category: 'contact',
      event_label: form.action
    });
  });
});

// Track CTA button clicks
document.querySelectorAll('.btn-primary, .cta-button').forEach(btn => {
  btn.addEventListener('click', () => {
    gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: btn.textContent.trim()
    });
  });
});
```

#### For Case Study Data (track per client)
- GA4 dashboard: sessions, bounce rate, avg session duration
- GA4 events: phone clicks, form submissions, CTA clicks
- Google Search Console: impressions, clicks, average position
- Google Business Profile: views, direction requests, calls (manual check)

### Case Study Template (per client)

```
Client: [Name]
Trade: [Plumber / HVAC / Woodworker / etc.]
Location: [City, State]

The Problem:
[What they came to you with — no website, bad website, no leads, etc.]

What We Built:
[Tier, pages, key features, StoryBrand approach]

The Results (30/60/90 days):
- Google Search impressions: [before] -> [after]
- Phone calls tracked: [number]
- Form submissions: [number]
- Map Pack ranking: [position]

Screenshot: [before/after or hero shot of the finished site]
Testimonial: "[Quote from client]" — [Client name, business]
```

### Before/After Slider on Portfolio Page
Use the `starter-kit/widgets/before-after.html` widget to show website rebuilds.
Screenshot old site → screenshot new site → drop into before/after slider.
- Same viewport width (1440x900) for both screenshots so the slider lines up
- Firefox: `Ctrl+Shift+S` > "Save full page" | Chrome DevTools: `Ctrl+Shift+P` > "Capture screenshot"
- More impactful than just showing the finished site alone

---

## Completed (Archive)

<details>
<summary>StoryBrand (Step 0) — DONE</summary>

- [x] Run STORYBRAND_PROMPT.md with your own info
- [x] Save output as `storybrand-research.md`
- [x] Compose BrandScript — `brandscript.md`
- [x] Fill in Brand Soundbytes (GBP description, social bio, email sig, brand descriptor)
- [x] Draft website copy — `website-copy.md`
</details>

<details>
<summary>Design Brief (Step 1) — DONE</summary>

- [x] Finalize homepage section order
- [x] Pick hero variant (bold-type)
- [x] Pick process variant
- [x] Wireframe inner pages (Services, Portfolio, About, Contact)
- See `DESIGN_BRIEF_FILLED.md` for locked decisions
</details>

<details>
<summary>Next.js Project Setup (Step 2) — DONE</summary>

- [x] Project scaffolded with Next.js App Router + Tailwind + daisyUI
- [x] All pages built: Homepage, Services, Portfolio, About, Contact, Blog, Privacy
</details>

<details>
<summary>MDX Blog Setup (Step 3) — DONE</summary>

- [x] Post listing page with cards (title, date, excerpt, image)
- [x] Individual post pages with proper SEO meta tags
- [x] Sitemap auto-generation
</details>

<details>
<summary>Analytics & Tracking (Step 4) — DONE</summary>

- [x] GA4 installed with event tracking (consent-gated)
- [x] Phone click, form submit, CTA click events
- [x] Google Search Console verified
</details>

<details>
<summary>AEO — headleyweb.com (Step 7) — DONE</summary>

- [x] `WebDesigner` / `ProfessionalService` JSON-LD on homepage
- [x] `FAQPage` schema on homepage FAQ section (10 Q&As)
- [x] `HowTo` schema on homepage "How It Works" section (2026-03-13)
- [x] Answer-first content block on services page
- [x] Answer-first content block on each blog post (auto-generated from H2s in blog.ts)
- [x] Consistent brand descriptor across all pages
- [x] `Service` schema with detailed descriptions on services page (2026-03-13)
</details>

<details>
<summary>Launch Checklist — DONE (2026-03-13)</summary>

- [x] All pages built and reviewed
- [x] Blog has at least 2 published posts
- [x] Portfolio has at least 1 case study
- [x] StoryBrand messaging consistent across all pages
- [x] Mobile responsive + Lighthouse 95/100/100/100
- [x] GA4 installed with event tracking (consent-gated)
- [x] Google Search Console verified
- [x] Sitemap submitted
- [x] OG/Twitter meta tags on all pages (including blog posts)
- [x] OG image validated via Facebook Sharing Debugger + Twitter Card Validator
- [x] Favicon and apple-touch-icon
- [x] DNS pointed to Vercel
- [x] Old site backed up
- [x] SSL active (automatic on Vercel)
- [x] Portfolio screenshots up to date with live client sites
</details>

<details>
<summary>Known Issues — ALL RESOLVED</summary>

- [x] **NO_LCP on mobile** — Fixed. Hero converted from CSS `background-image` to `<Image priority>`. LCP now 2.9s.
- [x] **Accessibility contrast issue** — Fixed. Button contrast corrected (dark text on terracotta 5.12:1), cookie banner links/buttons fixed. Accessibility 100.
</details>
</details>
