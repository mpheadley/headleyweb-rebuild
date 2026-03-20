# Website Copy Draft: Headley Web & SEO

> Filled from `brandscript.md`. This is the section-by-section copy
> to paste into the Next.js components during the build.

---

## Source Documents

- [x] `brandscript.md` completed (all 7 elements + soundbytes + lead generator)
- [x] `storybrand-research.md` available for reference

---

## Hero Section

**Headline (H1):**
Your Customers Are Searching. Can They Find You?

**Sub-headline:**
Stop losing leads to a website that isn't working for you. I build clear, mobile-friendly sites that help you get found, get calls, and get booked, all for a predictable flat rate.

> **Geo strategy note:** Keep the hero broad/human. Geo-signals go in JSON-LD
> `areaServed`, answer-first content block, brand descriptor, footer, and
> trade landing pages, not the hero headline.

> **"StoryBrand" placement note:** Don't use "StoryBrand" in the hero (jargon for
> the target customer). Use it in these sections instead:
> - About page: "I use the StoryBrand framework to..."
> - Services page: explain the methodology as a differentiator
> - Blog posts: educational content about the framework
> - Guide/Trust section: authority marker

**Primary CTA button text:**
Get Your Free Site Checkup

**Secondary CTA button text:**
Schedule a 15-Minute Call

**Visual direction:**
- **Layout:** Full-width dark background (`bg-hw-dark`), centered text, no image initially
- **Future upgrade:** Split layout with text left, right side shows a local business owner on their phone seeing their Google listing (stock or AI-generated). Communicates "this is what success looks like."
- **Background option:** Subtle topographic map pattern or Alabama landscape silhouette at low opacity. Gives texture without competing with text
- **Mood:** Confident but approachable. Not corporate. Not desperate.

---

## Pain Points / Stakes Section

**Section headline:**
You Work Too Hard to Be Hidden by Bad Technology.

**Pain point 1: The Map Pack:**
*(External)* When someone in Calhoun or Etowah County searches "plumber near me," the Google map pack decides who gets the call. If your business isn't in those top 3-5 results, you might as well not exist. No one scrolls past the map.

**Pain point 2: The AI Shift:**
*(External)* And now there's a second problem. When someone searches "house isn't cooling" or "pipes leaking under my sink," AI answers the question before they ever see a local business. If you don't have content that AI can cite, you're invisible to an entire category of customers who are looking for help right now.

> *Stat source: 83% zero-click rate when AI Overviews trigger (click-vision.com / AEO_RESEARCH.md). Use on the website as a stat callout or "Did you know?" element. Note: "near me" searches still go straight to map pack. AI Overviews trigger on problem-aware/informational queries.*

**Pain point 3: The Feeling:**
*(Internal)* You feel embarrassed when a potential client asks for your website address, and frustrated that the rules keep changing in ways you can't keep up with. You're not "bad at marketing." The game just shifted underneath you.

**Pain point 4: The Cost:**
*(Failure)* Every month of inaction is another month of lost revenue you can't get back. Your competitors are getting stronger in the map pack AND in AI answers. The longer you wait, the harder it gets to catch up.

**Visual direction:**
- **Layout:** 2x2 card grid on desktop, stacked on mobile. Light background.
- **Icons:** Simple line icons above each card title: map pin (Map Pack), brain/circuit (AI Shift), face/emotion (The Feeling), dollar/clock (The Cost). Terracotta color to match card titles.
- **Source:** Lucide React or Heroicons (already icon libraries, no extra dependency needed in Next.js)
- **Stat callout:** Consider a pull-quote or highlighted stat box between cards: "83% of searches with AI Overviews get zero clicks." Draws the eye and adds credibility
- **Mood:** Tension without fear-mongering. The cards should feel like "here's what's happening" not "be afraid."

---

## Services Overview

**Section headline:**
How I Help Local Businesses Get Found

**Section subtext:**
Clear websites. Local SEO. Google Business Profile. Everything your business needs to show up when customers search, for a flat, predictable rate.

**Service 1, Title:** Custom Web Design
**Service 1, One-liner:** I build clean, mobile-ready sites that look professional and actually work for your business.

**Service 2, Title:** Local SEO Optimization
**Service 2, One-liner:** I optimize your site's structure so local customers find you first when searching for your trade.

**Service 3, Title:** Google Business Profile
**Service 3, One-liner:** I setup and manage your Google Map listing to drive more phone calls and booked jobs every month.

**Visual direction:**
- **Layout:** 3-column card grid on desktop, stacked on mobile. Dark background (`bg-hw-dark`) to create visual contrast after the light Pain Points section.
- **Icons:** Line icons above each service title: monitor/code (Web Design), search/magnifier (Local SEO), map pin (Google Business Profile). White icons on dark background, or terracotta accent.
- **Source:** Lucide React (`Monitor`, `Search`, `MapPin` or similar)
- **CTA:** "Learn more" links on each card pointing to the services page (future inner page)
- **Mood:** Competent and clear. "Here's exactly what I do. No mystery."

---

## How It Works (3-Step Plan)

**Section headline:**
How We Get You More Leads

| Step | Title | Description (1-2 sentences) |
|------|-------|---------------------------|
| 1 | Request Your Free Checkup | Take the quiz or fill out the form. I'll record a personalized video showing exactly where you stand online. |
| 2 | I Build Your System | Based on what I find, I build your website, local SEO, and Google Business Profile. Flat rate, no surprises. |
| 3 | Your Phone Starts Ringing | Customers find you, call you, and book you. You get found online and get back to the work you love. |

**Visual direction:**
- **Layout:** Horizontal 3-step with numbered circles and connecting lines on desktop. Stacks vertically on mobile. Light background to alternate from dark Services section.
- **Visual element:** Large step numbers (1, 2, 3) in terracotta circles, with title and description below each. Connecting line/arrow between steps.
- **Source:** CSS-only, no icons or images needed. The numbered steps pattern is simple and clean.
- **Mood:** Easy and effortless. "This is so simple." Three steps should feel like nothing: low friction, low anxiety.

---

## Why Us / Trust Section

**Section headline:**
Local Expertise, No Guesswork

**Empathy statement:**
As a husband, dad, and former pastor living right here in Jacksonville, I know that running a small business isn't just about "marketing." It's about providing for your family and serving your community. I started Headley Web & SEO because I grew tired of seeing great local businesses get ignored by high-priced agencies.

**Benefit cards:**

| Card | Bento Size | Title | Body |
|------|-----------|-------|------|
| 1 | Tall (dominant) | Show Up on Google Maps | A website is only half the battle. I optimize your Google Business Profile so you land in the top 3 on Maps, where most local customers actually click. |
| 2 | Wide | You Own Everything | No contracts, no hostage situations. You own your site, your domain, and your data from day one. Optional care plans are there if you want them, not because you're trapped. |
| 3 | Standard | Fast on Every Phone | Most local searches happen from a truck or a parking lot. Your site loads fast and makes it easy to call or book in one tap. |
| 4 | Standard | Built for Your Market | Not a generic template. Every page targets the terms your local customers actually search, from Jacksonville to Gadsden and everywhere in between. |

**Authority proof points:**
- StoryBrand messaging framework: your website makes the customer the hero, not you
- Local to Jacksonville, AL: I know your market, your customers, your community

**Visual direction:**
- **Layout:** Two-column on desktop: headshot photo left, empathy text + proof points right. Benefit cards below in asymmetric bento grid (tall left card spanning 2 rows, wide top-right card spanning 2 cols, two standard bottom-right cards). Stacks vertically on mobile.
- **Headshot:** Professional but not stiff. Casual button-down, natural light, maybe outdoors in Jacksonville. Should say "neighbor" not "salesman." Source from existing assets (`headley-web-seo/images/`) or schedule new shoot.
- **Benefit card icons:** Map pin (Show Up on Google Maps), dollar sign (You Own Everything), phone/mobile (Fast on Every Phone), map marker (Built for Your Market)
- **Background:** White or very light. This section needs to feel clean and trustworthy
- **Mood:** Warm, personal, "I'm a real person in your town." The headshot does 80% of the work here.

---

## Testimonials

**Ideal testimonial framing:**

> "Before working with Matt, our business was invisible online, and it felt like we were falling behind our competitors. Matt took the time to understand our local Northeast Alabama market and built a site that finally makes the phone ring. Now, we have a professional digital storefront we're actually proud to share, and our local leads have never been more consistent."
> - [Name], [Title/Business]

**Real testimonials to use:**
1. *(Collect from first 3 free clients. Get in writing before launch)*
2.
3.

---

## Portfolio Section

**Section headline:**
Helping Alabama Businesses Get Found Online

> **Implementation note:** Display as project cards with desktop + mobile screenshots.
> Update with real client sites as they launch. These 3 demos ship with the site at launch.

**Project 1: Valley Small Engine Repair**
Local service site with customer testimonials and easy contact

**Project 2: Golden Hive Honey**
Clean e-commerce demo for local honey products

**Project 3: Chromatic Chaos Salon**
Modern salon site with booking integration and photo gallery

**Project 4: Emotional Support Chicken** *(Creative Showcase)*
Satirical concept site for a fake certified emotional support poultry business. Built to demonstrate design range, humor, and full-stack chops: Next.js, custom illustrations, and a brand identity from scratch.

**CTA below portfolio:**
Want results like these? → Get Your Free Site Checkup

**Visual direction:**
- **Layout:** 3-column card grid on desktop, stacked on mobile. Each card has a screenshot image area (16:10 aspect ratio) on top, project name and one-liner below. Dark background section.
- **Visual element:** Desktop + mobile screenshot mockups of each demo site. Use browser-frame or device-frame mockup containers to look polished even with placeholder screenshots.
- **Source:** Take screenshots of the 3 demo sites once built. For now, use placeholder gray boxes with project names. Replace with real screenshots before launch.
- **CTA placement:** Centered below the grid. `btn-primary` with "Get Your Free Site Checkup"
- **Mood:** "Look what I can do." Professional portfolio feel without being flashy. The screenshots do the selling.

---

## Pricing: Build Tiers

**Section headline:**
Compare Your Options

**Section subtext:**
Every tier includes mobile-ready design, search optimization, and full site ownership. You own your website from day one. No contracts, no monthly traps.

> **Format note:** Display as side-by-side glassmorphism cards on a dark textured background. Differentiators listed first, shared features sink to bottom. Each card includes its paired monthly care plan below a divider. Middle card (Get Calls) highlighted as "Best Value."
>
> **Naming principle:** Tier names describe the OUTCOME the customer buys, not the deliverables. Page counts are implementation details YOU decide, not a selling point. (See Lee Blue revenue engine model, `memory/lee-blue-revenue-model.md`.)

**Tier 1: Get Found:** $495 · 1-2 weeks
- *Tagline:* "Get online. Get visible. Get found."
- ✓ Professional, mobile-friendly design
- ✓ Clear messaging that converts visitors
- ✓ Basic search optimization
- ✓ Contact form setup
- ✓ Google Business Profile setup
- ✓ You own your website
- **Bundled care plan:** Essential Care, $49/mo (hosting, security updates, 30 min edits, email support)
- *CTA:* Get Found Now

**Tier 2: Get Calls (Best Value):** $795 · 2-3 weeks
- *Tagline:* "Show up in search. Start getting calls."
- ✓ Search optimization
- ✓ FAQ section that Google features in search
- ✓ Professional, mobile-friendly design
- ✓ Clear messaging that converts visitors
- ✓ Google Business Profile setup
- ✓ You own your website
- **Bundled care plan:** Growth Care, $79/mo (everything in Essential + GBP management, monthly traffic reports, review coaching, 1 hr edits)
- *CTA:* Start Getting Calls

**Tier 3: Get Booked:** $1,195 · 3-4 weeks
- *Tagline:* "Dominate local search. Stay booked solid."
- ✓ Advanced search optimization
- ✓ Content written for AI visibility
- ✓ Google knows your trade, your town, and your hours
- ✓ Professional, mobile-friendly design
- ✓ Clear messaging that converts visitors
- ✓ Google Business Profile setup & optimization
- ✓ You own your website
- **Bundled care plan:** Accelerate, $149/mo (everything in Growth + AI visibility monitoring, quarterly entity audit, content refresh, monthly strategy call, priority support)
- *CTA:* Dominate Local Search

**Bottom line:** Flat-rate build. No surprises.

**Payment terms:** 50% upfront, 50% at launch. First 3 months of any care plan included free.

**Visual direction:**
- **Layout:** 3-column glassmorphism cards on dark textured background (dark oak image with gradient overlay). Middle card (Get Calls) highlighted with terracotta-tinted glassmorphism and "Best Value" badge. Stacks vertically on mobile.
- **Visual element:** Price in heading font (Fraunces) at 42px. Checkmark icons for features. Care plan section below a divider line within each card. CTA button at bottom of each card.
- **Source:** CSS glassmorphism (`bg-white/[0.04] backdrop-blur-sm border border-white/[0.08]`), background-image with gradient overlay on section. Fraunces font on prices via `font-heading`.
- **Background:** Dark (`--color-dark`) with `/images/background-dark-oak.webp` texture overlay. Gradient fades edges for seamless transitions.
- **Mood:** Premium and confident. Dark background creates visual weight. This is a serious decision point. Glassmorphism keeps it modern. Bundled care plans in each card eliminate the need for a separate section.

> **Care plans are now bundled into each build tier card.** There is no separate Care Plans section on the page. Each card shows its paired monthly plan below a divider, reinforcing ongoing value without a second sales pitch.

> **Accelerate positioning note:** This is the bridge tier. Don't oversell the
> AI angle with jargon. Frame it as: "I make sure Google AND AI recommend
> your business, not just index it." Raise to $249-$349 once you have proof
> (AI mention screenshots, before/after entity audit results).

---

## AEO Brand Grader (Lead Magnet / CTA Option)

> **Status:** Not built yet. Can be done manually for early leads (ask ChatGPT/Perplexity
> about the prospect's business, screenshot the results, include in the site checkup).
> Build as automated tool in Phase 3.

**CTA text option:** "Is AI Recommending Your Business? Find Out Free."

**How it works (for the visitor):**
1. Enter your business name and city
2. We check what ChatGPT, Perplexity, and Google AI say about you
3. You get a report showing your "AI Visibility Score" vs. local competitors

**Where to use this CTA:**
- Blog posts about AEO / AI visibility (natural fit)
- Services page as secondary CTA
- Exit-intent popup (alternative to site checkup)
- NOT the homepage hero. Site checkup stays primary there

**Copy for the report delivery email:**
"Here's what AI says about your business, and what it says about your competitors.
Most local businesses don't show up in AI answers at all. Here's exactly what to
fix to change that."

> **Why this matters for the website copy:** The AEO Brand Grader gives you a second
> transitional CTA that's lower friction than the site checkup (automated vs. manual).
> Use it in contexts where the visitor is already thinking about AI/search visibility.
> The site checkup stays primary for cold traffic (more personal, higher trust).

---

## Consequences: What Happens If You Wait

> **StoryBrand element:** Failure. This is a standalone section on the page,
> separate from the Pain Points section. Pain Points go near the top (problem awareness);
> Consequences go near the bottom (urgency before the final CTA).

**Section headline:**
What Happens If You Wait

**Subtext:**
Every month without a clear online presence...

**Risk 1: Competitors rank above you:**
Every search is a chance for them to win a customer that could've been yours, and it keeps happening every day. They're getting stronger in the map pack AND in AI answers.

**Risk 2: Customers move on:**
Without a clear online presence, potential customers can't find you, and they're not waiting around. They call whoever shows up first.

**Risk 3: Your time stays tied up:**
Without a website to answer routine questions, you're fielding the same calls and texts. That's time you can't spend on the work that actually grows your business.

**Visual direction:**
- **Layout:** Single column, centered. Dark or muted background to create visual weight and urgency before the final CTA. Three risk items stacked vertically with bold titles.
- **Visual element:** Warning/alert-style icons (subtle, not alarmist) or simply bold text with a left accent border per risk. No images. This is a text-driven section that relies on copy weight.
- **Source:** CSS-only. Left border accent in terracotta or a muted red tone. No icon library needed.
- **Mood:** Serious but not scary. "This is real, and it's happening now." A pause before the hopeful final CTA.

---

## FAQ Section

> **Using personality versions.** The personality-infused FAQ copy was chosen for the live site. The formal versions below are kept as reference for contexts that need a more buttoned-up tone (proposals, formal documents, etc.).

**Section headline:**
Questions We Hear From Local Business Owners

**Q1:** Do I really need a website if I'm already getting referrals?
**A1 (live, personality):** Referrals are gold, and then the person Googles you before they call. If what they find is a dead Facebook page from 2019, that referral just became someone else's customer. A professional site is the closer your referrals need.
**A1 (formal):** Referrals are great, but most people check your reputation online before they call. A professional site and a managed Google Profile act as your best salesperson when you're busy on a job site.

**Q2:** Will I own my website, or will I be locked into a contract?
**A2 (live, personality):** You own it. Day one. If I got hit by a bus tomorrow (or just moved to Montana), your website keeps running. No hostage situations, no "you need us to export your files" nonsense.
**A2 (formal):** You own your site outright from day one. No monthly retainer traps, no hidden fees. My flat-rate model ensures you have total control.

**Q3:** I'm not "tech-savvy." How much work will this be for me?
**A3 (live, personality):** Can you send a text? You're qualified. I handle everything. You just answer a few questions about your business and send me some photos. I'll even send you a simple walkthrough video so you never feel stuck.
**A3 (formal):** Almost none. I handle the heavy lifting of design and SEO so you can focus on your trade. I'll even provide a simple video walkthrough of your new site so you can make minor edits yourself.

**Q4:** Do I need to pay for hosting?
**A4 (live, personality):** Nope. Hosting is included. Your site goes live and stays live. I'm not going to build you a house and then charge you rent for the driveway.
**A4 (formal):** No. Hosting is included with your website. Your site will be live and fully functional at no extra cost.

**Q5:** I already have a website. Do we have to start from scratch?
**A5 (live, personality):** Not always. Sometimes a renovation beats a rebuild. I'll take an honest look at what you've got and tell you whether it's worth saving or if we're better off starting fresh. No hard sell either way.
**A5 (formal):** Not necessarily. I'll review your current site and recommend whether to build on it or start fresh, whichever gives you the most value.

**Q6:** How long does a website project take?
**A6 (live, personality):** 3-4 weeks from "let's do it" to "holy cow that's my website." The biggest variable is usually how fast we can round up your photos and business info. I'll tell you exactly what I need so nothing holds us up.
**A6 (formal):** Typically 3-4 weeks. The timeline depends mainly on how quickly we can finalize your content: photos, hours, and services. I'll guide you through exactly what I need so there are no surprises.

**Q7:** What happens if I need edits after launch?
**A7 (live, personality):** First 30 days of tweaks are on me. After that, optional care plans start at $49/mo if you want ongoing help, or you can just call me when something comes up. I'm not going to leave you hanging.
**A7 (formal):** The first 30 days of small edits are included. After that, optional monthly care plans are available for ongoing updates, hosting management, and Google Business Profile maintenance.

**Q8:** How does payment work?
**A8 (live, personality):** Half upfront, half when the site goes live. That's it. No retainer, no auto-billing surprises, no "processing fees" that magically appear.
**A8 (formal):** 50% to start, 50% when the site goes live. No long-term commitment. Optional care plans are billed separately if you choose them.

**Q9:** What makes you different from a big agency?
**A9 (live, personality):** A big agency puts you on a project board and assigns you to whoever's free. I'm one person. I answer my own phone. I live in Jacksonville. If your website has a problem, you're not opening a support ticket. You're texting me.
**A9 (formal):** Large agencies often treat you like an account number and hide their work behind jargon. I'm a neighbor in Jacksonville who provides personal service, clear pricing, and total accountability.

**Q10:** What does "AI visibility" mean? Should I care?
**A10 (live, personality):** You know how people are starting to ask ChatGPT and Google's AI for recommendations instead of scrolling through search results? Yeah, I make sure your business shows up in those answers. You don't need to understand how it works. That's literally what you're paying me for.
**A10 (formal):** When someone asks Google or ChatGPT a question like "best plumber in Anniston," AI pulls answers from websites with clear, structured content. I build that into every site so you show up in AI answers too, not just traditional search results. You don't need to understand it; I handle it.

**Visual direction:**
- **Layout:** Accordion (click to expand). Keeps the page scannable. Single column, centered, max-width ~800px. Light background.
- **Visual element:** Chevron or plus/minus toggle icons on each question. No images. FAQ is pure text.
- **Source:** CSS-only accordion or lightweight React state toggle. No library needed.
- **Background:** Light/cream. Clean reading experience. Could add a subtle sage left border on the expanded answer for brand touch.
- **Mood:** Helpful and conversational. "Ask me anything. I'm an open book."

---

## Success / Transformation Section

> **StoryBrand element:** Success. Before → After comparison showing the customer's transformation. Placed after FAQ, before the final CTA.

**Section headline:**
What Changes When You Show Up

**Before:**
- Invisible online, losing leads to competitors who aren't better, just easier to find
- Overwhelmed by changing technology and jargon you didn't ask for
- Embarrassed when someone asks for your website

**After:**
- Found at the top of Google and recommended by AI. Your phone actually rings
- Confident and proud when sharing your website with customers and referrals
- Stable and in control. Your online presence works while you work

**Visual direction:**
- **Layout:** 2-column grid. Before (left) with red X marks, After (right) with green checkmarks. Light sage-tinted background.
- **Mood:** Hopeful contrast. The "before" is real but the "after" is clearly better.

---

## Quiz CTA Banner

> Inline banner between Pricing and Consequences sections. Lightweight alternative CTA for visitors who aren't ready to commit but want guidance.

**Headline:** Not sure what you need?
**Body:** Take our 60-second quiz to find out your business's online personality and get a personalized recommendation.
**CTA:** Take the Quiz →

**Visual direction:**
- **Layout:** Horizontal card with icon, text, and button. Light background (`bg-hw-light`).
- **Mood:** Low-pressure, curiosity-driven.

---

## Contact / Final CTA Section

**Headline:**
Ready to Get Found?

**Sub-headline:**
Stop losing customers to competitors with better websites. Let's get your business online the right way.

**Detail line:**
Flat-rate builds from $495. Care plan included free for 3 months, then from $49/mo. Cancel anytime.

**Location line:**
Serving Jacksonville, Anniston, and Northeast Alabama

**CTA button text:**
Get Your Free Site Checkup

**Phone CTA text:**
Or call me directly: (256) XXX-XXXX

**Visual direction:**
- **Layout:** Centered text on dark background (`bg-hw-dark`). Headline, sub-headline, detail line, location line stacked. Two CTA buttons side by side (primary + phone). Simple and clean, no cards, no grid.
- **Visual element:** None. Strong typography carries it. The dark background creates visual separation and finality.
- **Source:** No images or icons needed.
- **Mood:** Confident invitation. "You've seen everything. Ready to go?" Not pushy, not desperate. The lighter tone of "Ready to Get Found?" works because the Consequences section above already created urgency.

---

## Lead Gen / Site Checkup Form

**Headline:**
Get Your Free Site Checkup

**Body text:**
I'll personally review your online presence and send you a short video showing exactly what's keeping customers from finding you. No sales pitch, no strings attached.

**Form fields:**
- Your Name
- Email Address
- Your Website URL (or "I don't have one yet")
- Phone Number, *(Optional) Just so I can text you the link once the video is uploaded.*

**CTA button text:**
Get My Free Checkup

> **Placement note:** This can be a standalone section on the homepage (below
> the final CTA) or a dedicated landing page linked from blog posts and ads.
> The site checkup is the primary lead magnet. It stays higher-commitment than
> the AEO Brand Grader but builds more trust because it's personal.

**Visual direction:**
- **Layout:** Two-column on desktop: explanatory text left, form right. Stacks vertically on mobile (text on top, form below). Light background with subtle sage accent, a different feel from the dark Final CTA above.
- **Visual element:** The form itself is the visual element. Clean input fields, clear labels, prominent submit button. Maybe a small "no spam" or "takes 30 seconds" trust note below the button.
- **Source:** Formspree or Vercel serverless for form handling. Inputs are styled with brand tokens.
- **Mood:** Low-pressure, personal. "I'll do this for you, free, no strings." The body copy already handles the trust. The form just needs to feel easy and quick.

---

## Answer-First Content Block (AEO)

**For homepage:**
Headley Web & SEO is a Jacksonville, Alabama web design studio that builds StoryBrand-powered websites for local service businesses in Northeast Alabama. We specialize in clear, mobile-friendly sites with built-in local SEO and Google Business Profile optimization for plumbers, HVAC companies, contractors, restaurants, and other service providers in Calhoun, Etowah, Cherokee, and Talladega counties. Every site is built to generate leads, not just look good. Flat-rate pricing from $495 with full site ownership. No contracts, no monthly traps. Our StoryBrand approach makes your customer the hero of the story, so your messaging connects and your phone actually rings.

**For services page:**
Headley Web & SEO offers three core services for local businesses in Northeast Alabama: custom web design (3-8 page mobile-ready sites), local SEO optimization (on-page structure, keyword targeting, and search visibility), and Google Business Profile setup and management. Every build includes local SEO foundations, mobile responsiveness, and clear calls to action designed using the StoryBrand messaging framework. Pricing starts at $495 (Get Found), $795 (Get Calls), and $1,195 (Get Booked). All sites include full ownership. No contracts or monthly hosting traps. Serving Jacksonville, Anniston, Oxford, Gadsden, and surrounding communities.

---

## About Page: Owner Story

**Section headline:**
A Local Business Owner, Just Like You

**Paragraph 1** (empathy, who you are):
I'm a husband and dad living in Jacksonville. As a former pastor and small business owner, I know exactly what it's like to work hard and worry about where the next customer is coming from.

**Paragraph 2** (origin, why you started):
I started Headley Web & SEO because I kept watching great local businesses lose leads to competitors who were simply easier to find online. It wasn't because those competitors did better work. They just had a better digital front door.

**Paragraph 3** (promise, what you deliver):
I built this service to be a straightforward partnership for my neighbors in Northeast Alabama. I handle the technical heavy lifting, from the initial build to ongoing security and maintenance, so you can focus on running your business. My goal is to provide a professional online presence with flat-rate pricing, clear communication, and the peace of mind that your site is always working for you.

**Credentials** (list format):
- StoryBrand messaging framework: every site makes the customer the hero
- Local to Jacksonville, AL: I know the NE Alabama market firsthand
- Flat-rate pricing with full site ownership. No contracts, no surprises
- Google Business Profile optimization included in every build
- Serving Calhoun, Etowah, Cherokee, and Talladega counties

**Closing line** (invitation, connect to CTA):
I'd love to help your business be the first thing people find when they search. Let's start with a free look at where you stand online.

---

## Footer Tagline

Get found. Get calls. Get booked.

---

## Personality-Infused Copy Alternatives

> **Voice:** Dry, warm, confident. Former pastor who builds websites. The contrast IS the brand.
> Humor increases down the page. Never in hero. Light in pricing. Medium in consequences. Medium-high in FAQ.
> Rule: If it would make a plumber in Anniston chuckle and feel at ease, it's right. If it feels like a marketing agency trying to be funny, kill it.
> **No em dashes.** Never use "—" in copy. Em dashes are an AI writing tell and make copy feel generated. Use periods, commas, colons, or just rewrite the sentence instead.

### Consequences: Personality Version

**Section headline:**
What Happens If You Keep Waiting

**Subtext:**
Nothing dramatic. Just the slow, quiet cost of being invisible.

**Risk 1: Your competitors aren't waiting:**
While you're thinking about it, they're already showing up in map packs and AI answers. Every search someone does is a coin flip between you and them, except right now, the coin only has their side.

**Risk 2: Customers don't give second chances:**
Nobody's bookmarking your name to look up later. They search, they scroll, they call whoever's there. If that's not you, they'll never know what they missed.

**Risk 3: You stay the best-kept secret in town:**
Great work. Great reputation. Zero online proof. Your customers love you. The problem is the ones who haven't found you yet.

### FAQ: Personality Version

> Tone: Conversational, slightly wry. Like you're answering these questions over coffee at The Brick.

**Q1:** Do I really need a website if I'm already getting referrals?
**A1:** Referrals are gold, and then the person Googles you before they call. If what they find is a dead Facebook page from 2019, that referral just became someone else's customer. A professional site is the closer your referrals need.

**Q2:** Will I own my website, or will I be locked into a contract?
**A2:** You own it. Day one. If I got hit by a bus tomorrow (or just moved to Montana), your website keeps running. No hostage situations, no "you need us to export your files" nonsense.

**Q3:** I'm not "tech-savvy." How much work will this be for me?
**A3:** Can you send a text? You're qualified. I handle everything. You just answer a few questions about your business and send me some photos. I'll even send you a simple walkthrough video so you never feel stuck.

**Q4:** Do I need to pay for hosting?
**A4:** Nope. Hosting is included. Your site goes live and stays live. I'm not going to build you a house and then charge you rent for the driveway.

**Q5:** I already have a website. Do we have to start from scratch?
**A5:** Not always. Sometimes a renovation beats a rebuild. I'll take an honest look at what you've got and tell you whether it's worth saving or if we're better off starting fresh. No hard sell either way.

**Q6:** How long does a website project take?
**A6:** 3-4 weeks from "let's do it" to "holy cow that's my website." The biggest variable is usually how fast we can round up your photos and business info. I'll tell you exactly what I need so nothing holds us up.

**Q7:** What happens if I need edits after launch?
**A7:** First 30 days of tweaks are on me. After that, optional care plans start at $49/mo if you want ongoing help, or you can just call me when something comes up. I'm not going to leave you hanging.

**Q8:** How does payment work?
**A8:** Half upfront, half when the site goes live. That's it. No retainer, no auto-billing surprises, no "processing fees" that magically appear.

**Q9:** What makes you different from a big agency?
**A9:** A big agency puts you on a project board and assigns you to whoever's free. I'm one person. I answer my own phone. I live in Jacksonville. If your website has a problem, you're not opening a support ticket. You're texting me.

**Q10:** What does "AI visibility" mean? Should I care?
**A10:** You know how people are starting to ask ChatGPT and Google's AI for recommendations instead of scrolling through search results? Yeah, I make sure your business shows up in those answers. You don't need to understand how it works. That's literally what you're paying me for.

### About Page: Personality Version

**Paragraph 1** (who you are):
I'm a husband, dad, and former pastor living in Jacksonville, Alabama. Which means I've spent most of my adult life listening to people's problems and trying to help. I just traded sermons for sitemaps.

**Paragraph 2** (origin):
I started Headley Web & SEO because I kept watching local businesses I care about lose customers to competitors who weren't better, just more visible online. That bothered me in a way I couldn't un-bother.

**Paragraph 3** (promise):
I built this to be simple: I make your business easy to find, easy to trust, and easy to contact. Flat-rate pricing, clear timelines, and you own everything when we're done. No mystery. No jargon. No "let me loop in my team." It's just me.

### 404 Page

**Headline:** Well, this is awkward.
**Body:** This page doesn't exist. Kind of like your competitor's mobile optimization.
**CTA:** Let's get you back on track → [Go Home]
**Alt body (if feeling spicy):** You found the one page on this site that can't help you. Unlike the rest of them.

### Micro-Copy Ideas (for future use)

- **Form submit success:** "Got it. I'll be in touch faster than your last web designer returned a phone call."
- **Care plan cancel confirmation:** "No hard feelings. Your site will keep working. I built it that way."
- **Loading state (if needed):** "Hang tight. Unlike your old site, this won't take long."
- **Empty search results:** "Nothing here yet, but at least YOUR site won't have this problem."
- **Cookie banner:** "This site uses cookies. Not the good kind your grandma makes, but the kind that help me improve your experience."

---

## Checklist

- [x] Hero headline is about the CUSTOMER, not the business
- [x] Sub-headline names an emotion or transformation
- [x] Pain points are specific to this trade (not generic "we're the best")
- [x] 3-step plan matches BrandScript exactly
- [x] FAQ answers address real objections (not softball questions)
- [x] Final CTA section paints success AND names failure stakes
- [x] Answer-first content block is written (100-200 words, direct answer)
- [x] All copy reads at 8th grade level (no jargon)
- [x] Every section traces back to a BrandScript element
- [x] This document saved as `website-copy.md` in the project folder

> **Next step:** Build the site section by section. Pull copy from this document
> directly into Next.js components. Don't rewrite on the fly.

---

*Completed: March 9, 2026*
