# Headley Web & SEO — Business Strategy & Growth Roadmap

## Revenue Model
- **Build Tiers:** Flat-rate website builds for local service businesses
- **Care Plans:** Monthly recurring revenue for hosting, updates, and support
- **Audit Funnel:** Free automated site checkup (email-gated PDF) → personal follow-up by Matt

---

## Growth Projects — Prioritized Roadmap

### Phase 1: Blog Content Pipeline (START NOW)
**Why first:** Costs nothing but time, compounds over time, builds domain authority, feeds the audit funnel, and doubles as sales tools.

**What it includes:**
- Content calendar targeting local service business owners
- Tactical/educational posts (e.g. "5 Things Your HVAC Website Needs")
- Claude drafts with heavy rewriting by Matt for voice
- SEO-optimized with internal links to services and audit pages
- Consistent publishing cadence (aim for 2-4 posts/month)

**Success signals:**
- Organic traffic growth to blog posts within 60 days
- Blog → audit funnel conversions tracked in GA4
- At least 6-8 published posts in first 3 months

---

### Phase 2: Trade-Specific Landing Page Generator (AFTER 2-3 MONTHS)
**Why second:** Programmatic SEO pages work best when domain already has authority. Phase 1 builds that authority.

**What it includes:**
- Template system for `[trade]/[city]` landing pages
- Start with 3-5 high-value trades in strongest cities (hand-written, unique content)
- Scale to generator/template system once the pattern proves it converts
- Each page gets unique copy, testimonials, and local signals
- JSON-LD LocalBusiness schema per page

**Prerequisites:**
- Domain authority building from Phase 1 blog content
- Real conversion data from existing pages to validate the pattern
- At least some backlinks / organic traffic baseline

**Warning:** Don't generate hundreds of thin city+trade pages early — Google may treat them as low-quality. Start manual, go programmatic once proven.

---

### Phase 3: Automated Client Reporting Dashboard (WHEN CLIENT VOLUME DEMANDS IT)
**Why last:** This is infrastructure for a scaling problem. Don't build it until the problem exists.

**What it includes:**
- Automated monthly reports for Care Plan clients
- Uptime, Core Web Vitals, traffic, keyword rankings
- Branded PDF or dashboard per client
- Reduces manual reporting time as client base grows

**Trigger to build:** When you have 10+ recurring Care Plan clients and reporting becomes a time sink. Until then, a Loom video or Google Doc works fine.

---

## Current Infrastructure (Already Built)
- Full Next.js site with App Router, Tailwind v4, MDX blog system
- Free site audit tool with email-gated PDF report
- StoryBrand messaging scorer
- Cookie consent + GA4 analytics
- JSON-LD structured data
- `locations/[city]` dynamic pages (early geo-targeting)

## Near-Term Action Items
- [ ] Build content calendar for Phase 1
- [ ] Draft first tactical blog post
- [ ] Set up editorial workflow (Claude drafts → Matt rewrites → publish)
- [ ] Track blog → audit conversions in GA4
