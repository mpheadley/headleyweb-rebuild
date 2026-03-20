# Blog Post Plan — headleyweb.com

> Master list of planned blog content. Cadence: 2 posts/month minimum.
> Claude drafts, you edit for voice. Publish via MDX in `/content/blog/`.
> Cross-reference: [BUSINESS_STRATEGY.md](BUSINESS_STRATEGY.md) Content Marketing Plan.

---

## Phase 1 — Foundation Posts (launch with 2, publish rest in months 1-3)

These establish expertise and target high-intent local keywords.

| # | Title | Target Keywords | Funnel Stage | Status |
|---|-------|-----------------|--------------|--------|
| 1 | "Why Your Website Isn't Converting (And the Framework That Fixes It)" | website not converting, small business website | Top | Published (2026-03-11) |
| 2 | "Web Design for Plumbers: What Actually Gets Phone Calls" | web design for plumbers, plumber website | Middle | Published (2026-03-13) |
| 3 | "StoryBrand for Small Business: A Practical Guide" | storybrand small business, storybrand website | Top | Published (2026-03-12) |
| 4 | "How Much Should a Small Business Website Cost in 2026?" | small business website cost, website pricing | Middle | Published (2026-03-11) |
| 5 | "5 Things Your HVAC Website Needs to Rank on Google" | HVAC website, HVAC SEO | Middle | Published (2026-03-13) |

---

## Phase 1b — Niche Roundup Posts (SEO lead magnets)

Curated lists of existing websites in a trade, critiqued through a StoryBrand lens.
Each post is a permanent lead magnet that ranks for "[trade] website design" keywords.

| # | Title | Target Trade | Status |
|---|-------|-------------|--------|
| 6 | "Best HVAC Websites in Alabama (And What Makes Them Work)" | HVAC | Planned |
| 7 | "7 Plumber Websites That Actually Get Phone Calls" | Plumbing | Planned |
| 8 | "Top Contractor Websites in Northeast Alabama" | General contractors | Planned |
| 9 | "Lawn Care & Landscaping Websites That Convert Visitors to Customers" | Landscaping | Planned |
| 10 | "Restaurant Websites That Make You Want to Book a Table" | Restaurants | Planned |

**Template per entry:**
- Screenshot + link
- 2-3 sentences: what works, what doesn't (StoryBrand critique)
- "Does the hero show the customer's success? Is the CTA clear? Can you find the phone number in 3 seconds?"

**CTA at bottom:** "Want a site that outperforms these? Get Your Free Video Audit."

---

## Phase 1c — Hyperlocal & Shareable Posts (Facebook group fuel)

These are the posts local business owners actually share in Facebook groups.
Higher priority than AEO/technical posts — your Phase 1 leads come from local social, not search for "answer engine optimization."

| # | Title | Target Keywords | Funnel Stage | Status |
|---|-------|-----------------|--------------|--------|
| 10b | "What Happens When You Google Your Own Business (And How to Fix What You See)" | google my business, google yourself | Top | Planned |
| 10c | "The 5 Local Businesses in Anniston That Are Crushing It Online (And What You Can Learn)" | Anniston business, local business website | Top | Planned |
| 10d | "I Asked ChatGPT to Recommend a Plumber in Anniston — Here's What It Said" | chatgpt local business, AI recommend plumber | Top | Drafted — `content/blog/drafts/i-asked-chatgpt-to-recommend-a-plumber-in-anniston.mdx`. Matt needs to run the actual queries, screenshot results, and record the Reel. |

**Why these are high priority:**
- **#10b** is the most shareable post on this entire list. Every business owner will try it immediately. Pairs with your audit content (Phase 3) and AI Visibility Audit lead magnet.
- **#10c** cross-pollinates with Local Legends. Featured businesses share the post. Backlink magnet. Repeat for other cities (Oxford, Gadsden, Jacksonville). See `local-legends/PLAN.md` Phase 6 → Cross-Promotion for the full linking strategy.
- **#10d** is a concrete, scary, shareable version of your AEO thesis. More compelling than abstract "83% of searches" stats. Record it as a Reel too — the reaction video format works perfectly.

**CTA at bottom:** "Want to see what Google and AI say about YOUR business? Get Your Free Video Audit."

---

## Phase 2 — AI Visibility / AEO / GEO Posts

These position you as ahead of the curve on AI-driven search changes.
Topics refined from [AEO_RESEARCH.md](AEO_RESEARCH.md) findings.

| # | Title | Target Keywords | Funnel Stage | Status |
|---|-------|-----------------|--------------|--------|
| 11 | "Why Your Small Business Needs to Show Up in AI Answers, Not Just Google" | AI search small business, AI overview local business | Top | Planned |
| 12 | "What Is Answer Engine Optimization? A Guide for Local Businesses" | answer engine optimization, AEO for small business | Top | Planned |
| 13 | "How to Get Your Business Recommended by ChatGPT and Perplexity" | chatgpt recommend business, perplexity local business | Middle | Planned |
| 14 | "SEO vs AEO vs GEO: What Local Businesses Actually Need in 2026" | SEO vs AEO, generative engine optimization | Top | Planned |
| 15 | "83% of Searches End Without a Click: What That Means for Your HVAC Business" | zero click search, HVAC marketing 2026 | Top | Planned |
| 16 | "The Schema Markup Your Contractor Website Is Missing (And Why AI Ignores You)" | schema markup contractors, JSON-LD local business | Middle | Planned |
| 17 | "How to Write 'Answer-First' Content That AI Actually Recommends" | answer first content, AI content strategy | Middle | Planned |
| 18 | "Your Brand Descriptor: The 2-Sentence Statement That Makes AI Trust You" | brand descriptor AI, entity SEO local business | Middle | Planned |

> **Source:** Topics 15-18 derived from [AEO_RESEARCH.md](AEO_RESEARCH.md) key findings:
> zero-click stats (80%+), trade-specific schema stacks, answer-first content
> structure, and brand descriptor/entity strategy.

---

## Phase 3 — Interactive Audit Content (Top-of-Funnel)

Video + landing page combos that demonstrate expertise and drive Clarity Sprint bookings.

| # | Title | Format | Status |
|---|-------|--------|--------|
| 19 | "I Googled [Plumber] in Anniston and Here's What Happened" | Screen recording + landing page | Planned |
| 20 | "I Googled [HVAC] in Gadsden and Here's What Happened" | Screen recording + landing page | Planned |
| 21 | "I Googled [Contractor] in Oxford and Here's What Happened" | Screen recording + landing page | Planned |

**Format per post:**
- 60-90 second screen recording: Google search for a trade + city, show what comes up (and what doesn't)
- No roasting — just reveal the gap. "Here's who shows up. Here's who doesn't. Here's why."
- Embed the video on a dedicated landing page at `/audit/[trade]-[city]`
- Landing page includes: video embed, 3-5 key observations, CTA to book a free strategy call
- Share the video as a Reel/TikTok, link to landing page in bio/comments
- Every business owner who's NOT showing up feels the pain — that's the share mechanic

**Reusable landing page template:** Build once as a Next.js component, reuse for each trade + city combo. Could also become a starter kit widget for client sites doing their own content marketing.

**Animated version (social content):** Build a search bar + results animation (typewriter types query → fake SERP results slide in showing the client's business at #1). Use as a short-form video/GIF for Reels, TikTok, or client deliverables. More polished than a raw screen recording, reusable across trades. Could also embed in blog posts alongside the real screen recording.

**CTA:** "Want to see where YOUR business shows up? Get a Free 15-Minute Audit."

---

## Phase 4 — Viral Build Content (blog + video combo)

Posts tied to the satirical speed-build projects. Each one is a blog post AND a social video.

| # | Title | Format | Status |
|---|-------|--------|--------|
| 22 | "I Built a Professional Website for Emotional Support Chickens" | Blog post + time-lapse video | Planned — also a portfolio piece (Creative Showcase card) |
| 23 | "I Asked AI to Build a Website About Itself — Here's What Happened" | Blog post + screen recording | Planned |
| 24 | "I Built My Wife a Fake Business Website and It Looks Better Than Most Real Ones" | Blog post + couple content video | Planned |
| 25 | "I Built a Local Storytelling Site to Prove Small Businesses Deserve Better Websites" | Blog post + site walkthrough | Planned — Local Legends (local-legends/). Write when site has 5+ real profiles. See `local-legends/PLAN.md` Phase 6 → Cross-Promotion. |

**Why these work as blog posts:**
- They demonstrate skill while being entertaining enough to share
- "I built X in Y hours" format performs well on social and search
- Each post links to the live satirical site + headleyweb.com services page
- Tech-curious readers see the process; business owners see the result
- Post #23 doubles as thought leadership on AI in web design (positions you as ahead of the curve)

**CTA at bottom:** "If I can make emotional support chickens look this legit, imagine what I can do for your actual business."

---

## Phase 5 — Interactive Quiz Content (Lead Magnets)

Quizzes embedded on headleyweb.com + standalone blog posts explaining each one.

| # | Title | Format | Status |
|---|-------|--------|--------|
| 26 | "What's Your Business's Online Personality? (Take the Quiz)" | Interactive quiz + blog post explaining the 5 archetypes | Planned |
| 27 | "The $10K Question: Is Your Website Making or Losing You Money?" | Dollar-amount quiz + blog post with the math behind each question | Planned |
| 28 | "How Does Google See Your Business? (Grade Yourself A-F)" | Grading quiz + blog post with fix-it guide per grade | Planned |
| 29 | "Build Your Dream Website in 60 Seconds" | Visual quiz + blog post showing before/after transformations | Planned |

**Quiz → Blog → CTA flow:**
- Quiz lives as a React component on headleyweb.com (homepage or `/quiz`)
- Blog post explains the methodology and links to the quiz
- Quiz result captures email, triggers nurture sequence
- Shareable result graphic drives organic social reach

---

## Ongoing — Seasonal Urgency Posts (quarterly)

Evergreen posts refreshed/republished each year. Slot into the nurture email sequence as quarterly touchpoints.

| # | Title | Best Publish Window | Status |
|---|-------|-------------------|--------|
| — | "Is Your Website Ready for Spring? 5 Things to Check Before Your Busy Season" | Feb–Mar | Planned |
| — | "Summer Marketing Checklist: What Local Businesses Need Before the Rush" | May–Jun | Planned |
| — | "Get Your Website Ready for the Holidays (Before Your Competitors Do)" | Sep–Oct | Planned |
| — | "New Year, New Customers: 3 Website Fixes That Pay for Themselves in January" | Dec–Jan | Planned |

**Why these matter:**
- Give you a reason to email leads quarterly ("Hey, saw this and thought of you")
- Create urgency without being pushy — the calendar does the selling
- Republish/refresh annually with updated stats — evergreen SEO value
- Pair with care plan upsells ("Don't have time to do these yourself? That's what Growth Care is for.")

---

## Ongoing — Case Study Posts

Published after each client project hits 30/60/90 day metrics.

| # | Title Pattern | Status |
|---|--------------|--------|
| — | "[Client Trade] Website Redesign: How We Increased Calls by X%" | Template ready |
| — | "From Invisible to #1 in the Map Pack: [Client] Case Study" | Template ready |

See [BUSINESS_STRATEGY.md](BUSINESS_STRATEGY.md) Case Study Template for format.

---

## 3-Month Editorial Calendar (April–June 2026)

Target: ~60% broad small business topics (reach), ~40% trade-specific (local SEO).
Posts marked with * are higher priority.

### Month 1 — April 2026

| Week | Type | Title | CTA |
|------|------|-------|-----|
| 1 | Broad | * "Nobody Reads Your Website (Here's What They Actually Do)" | Audit |
| 2 | Trade | "What Every Electrician's Website Gets Wrong" | Audit |
| 3 | Broad | * "When to DIY Your Website and When to Hire Someone" | Quiz/Audit |
| 4 | Broad | "What 'SEO' Actually Means for a Small Business (No Jargon)" | Audit |

### Month 2 — May 2026

| Week | Type | Title | CTA |
|------|------|-------|-----|
| 1 | Broad | * "Why Your Website Looks Fine But Doesn't Get Calls" | Audit |
| 2 | Trade | "Your Lawn Care Website Needs These 5 Things Before Summer" | Audit |
| 3 | Broad | "Is Your Website Slow? Here's What It's Costing You" | Audit |
| 4 | Broad | * "Your Customer Is the Hero, Not Your Business" | Audit |

### Month 3 — June 2026

| Week | Type | Title | CTA |
|------|------|-------|-----|
| 1 | Broad | "The Free Google Tool Most Small Businesses Ignore" (GBP) | Audit |
| 2 | Trade | "Marketing Your Cleaning Business Online: What Actually Works" | Audit |
| 3 | Broad | * "Why I Show My Prices (And Why Most Web Designers Don't)" — Matt should write/heavy rewrite | Audit |
| 4 | Broad | "5 Signs It's Time to Rebuild Your Website" | Audit |

### Backlog (Unscheduled)

- "What to Put on Your Homepage (And What to Leave Off)"
- "Why Reviews Matter More Than Your Website Design"
- "The One Page Your Website Is Probably Missing" (dedicated services/pricing page)
- "How to Write Your Own About Page (Template)"
- "Local SEO Checklist: 10 Things You Can Do This Week"
- "Why I Don't Build on WordPress (And What I Use Instead)"
- "What Happens After Your Website Launches (Hint: That's When the Work Starts)"
- Trade: Roofers
- Trade: Auto repair / detailing
- Trade: Restaurants / food trucks
- Trade: Real estate agents
- Trade: Dentists / chiropractors

---

## Publishing Notes

### Priority Order (what to write next)

> Your target audience (local business owners) finds you through Facebook groups and word of mouth,
> not by searching for "answer engine optimization." Prioritize content they'll actually share.

1. **Foundation posts (1-5)** — already live or in progress. Core SEO play.
2. **Hyperlocal & shareable posts (10b-10d)** — highest share potential in local Facebook groups. Write these before the AEO posts.
3. **Roundup posts (6-10)** — can be written now, no client work needed. Permanent lead magnets.
4. **Seasonal post (whichever is next on the calendar)** — publish on cadence, refresh annually.
5. **Viral build posts (22-25)** — write alongside the speed-build projects as they happen.
6. **AEO posts (11-18)** — important for positioning but your clients don't search for these terms yet. Lower urgency.
7. **Audit content (19-21)** — requires the landing page template to be built first.
8. **Quiz content (26-29)** — requires the quiz components to be built first.

### Distribution Checklist (every post)

> A great post nobody sees is worthless. Spend as much time distributing a post as writing it.
> SEO is the long game (months to rank). Distribution is the short game — where your Phase 1 leads come from.

For **every** published post, run through this checklist:

- [ ] **Facebook groups** — Calhoun County groups, NE Alabama business groups, trade-specific groups. Don't just drop a link — write a 2-3 sentence hook first. Example: "I googled 'plumber in Anniston' yesterday and what I found was wild. Wrote up what I learned:" [link]
- [ ] **Personal Facebook/Instagram** — your network is your first audience. Friends share, friends' friends see it.
- [ ] **Email nurture list** — every new post goes to your Mailchimp list. This is the primary reason you're building the nurture sequence.
- [ ] **Google Business Profile post** — GBP lets you publish short updates with links. Free, easy, helps your own local ranking.
- [ ] **LinkedIn** — repurpose as a shorter text post with a link. Especially good for the AI/AEO content and "I Asked ChatGPT..." style posts.

**Post-specific extras (when applicable):**
- [ ] **Reel/TikTok** — for posts with a video component (audit content, viral builds, "I Asked ChatGPT..." posts). Record a 60-second version, link to full post in bio.
- [ ] **Tag featured businesses** — for hyperlocal posts (#10c) and roundups (#6-10). The featured business shares it = free reach.
- [ ] **Cross-post to Local Legends** — for hyperlocal content that overlaps with the Local Legends audience.

### General Rules

- **Roundup posts (6-10)** can be written now — they don't require client work
- **AEO posts (11-18)** refine after reviewing AEO_RESEARCH.md
- **Case studies** publish as client data comes in (30/60/90 day milestones)
- **Seasonal posts** publish 4-6 weeks before the season starts
- All posts get OG/Twitter meta, proper slugs, and internal links to services page
- Each post ends with CTA: "Get Your Free Video Audit" or "Schedule a 15-Minute Call"
- Don't write "how I built X" posts for client sites — turn those into case study posts with real metrics instead. Build-process posts are for personal/satirical projects only.

---

*Last updated: March 18, 2026 (added 3-month editorial calendar)*
