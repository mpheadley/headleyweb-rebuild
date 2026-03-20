# Custom Skill Prompts for Headley Web

Copy-paste these into a new Cowork session to build each skill.

---

## 1. Discovery Call Prep Skill

```
I want to create a custom Cowork skill called "discovery-prep" that automates my pre-sales research workflow.

Context: I run Headley Web & SEO, a local web design + SEO business in Calhoun County, Alabama. Before every sales call I run a discovery process that involves researching the prospect's current web presence, Google Business Profile, competitors, and local SEO gaps.

My CRM is in Airtable (connected via MCP). My discovery workflow is documented in:
~/Documents/Web Development/headleyweb-rebuild/DISCOVERY_WORKFLOW.md

The skill should:
1. Take a business name and location as input
2. Pull any existing record from my Airtable CRM
3. Run through the discovery checklist from DISCOVERY_WORKFLOW.md (web search for their site, GBP listing, competitors in their niche + area, schema markup check, mobile/speed issues)
4. Output a structured briefing doc I can review before the call — including talking points, competitor comparisons, and specific problems I spotted
5. Save the briefing as a PDF or markdown file

Read my DISCOVERY_WORKFLOW.md and BUSINESS_STRATEGY.md first to understand the full process and how I position services.
```

---

## 2. Case Study Generator Skill

```
I want to create a custom Cowork skill called "case-study" that generates case study content from my client data.

Context: I run Headley Web & SEO. Case studies with real numbers are the core of my sales strategy — I need 2-3 strong ones to justify raising prices. My business strategy is in:
~/Documents/Web Development/headleyweb-rebuild/BUSINESS_STRATEGY.md

The skill should:
1. Ask which client (pull from Airtable CRM if connected)
2. Ask for before/after metrics (or pull from GA4/Search Console data if I paste it in)
3. Generate a case study in multiple formats:
   - A page-ready markdown/HTML block for headleyweb.com (with sections: challenge, solution, results, client quote placeholder)
   - A short version for social media posts
   - A one-liner for use in proposals and emails
4. Follow StoryBrand-style framing: the client is the hero, I'm the guide, the problem is the villain
5. Keep the tone direct and results-focused — no fluff, no "we're passionate about web design" language

Bonus: if I provide before/after screenshots, include them in the output.
```
