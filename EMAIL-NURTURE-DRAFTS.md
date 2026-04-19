# Email Nurture Sequence — Headley Web & SEO

> Drafted April 2026. Claude draft — Matt to proof voice before activating.
> Sequence triggers after audit tool lead capture (headleyweb.com/audit).
> Voice guide: `content/VOICE-GUIDE.md`. BrandScript: `brandscript.md`.
> Platform: Resend (create a new audience — do NOT reuse the Southern Legends audience).

---

## Sequence Overview

| # | Day | Subject | BrandScript element |
|---|-----|---------|---------------------|
| 1 | 0 | Here's your free site checkup | Guide / empathy |
| 2 | 3 | Your competitors are easier to find (here's why) | Problem / agitate |
| 3 | 7 | What it actually takes to get found | Plan / 3 steps |
| 4 | 14 | What the before and after actually looks like | Success / proof |
| 5 | 21 | Every month you wait is another month of lost leads | Failure stakes + CTA |

After Day 21 → long-tail biweekly nurture. Use seasonal posts and blog content (see `BLOG_POST_PLAN.md`).

---

## Email 1 — Day 0

**Subject:** Here's your free site checkup

[First name],

Your report is attached. It scores your site across messaging, mobile performance, and local SEO — and shows what I'd fix first if this were my site.

A few things worth knowing: the scores are automated. The recommendations are real. I've built enough of these to know the patterns pretty well, and I'll tell you honestly if what you've got is fixable or needs to start over.

If you want, I'm happy to record a quick walkthrough of your results. Not a sales call — just a 3-5 minute video where I pull up your specific site and tell you what I actually see. Reply here and I'll put it together.

Matt
Headley Web & SEO
(256) 644-7334 | headleyweb.com

---

## Email 2 — Day 3

**Subject:** Your competitors are easier to find (here's why)

[First name],

Here's what happens when someone searches for what you do in your city:

Three businesses show up in the map pack. One of them gets the call.

Which one shows up has almost nothing to do with who does better work or who's been in business longer. It comes down to which site loads faster on a phone, which Google Business Profile has more recent activity, and which one answers the questions people are actually typing.

There's a second layer most businesses don't know about yet. When someone types "my AC stopped working" or "pipes leaking" into ChatGPT or Google, AI answers the question before they ever see a local business. The businesses that get recommended in those answers are the ones whose sites are built to be cited. Most aren't.

If you looked at your checkup results and want to know what it would actually take to fix your numbers — reply and I'll tell you.

Matt

> **Content note:** When blog post #10d ("I Asked ChatGPT to Recommend a Plumber in Anniston") is live, add a P.S. linking to it here. It's the most concrete illustration of this problem.

---

## Email 3 — Day 7

**Subject:** What it actually takes to get found

[First name],

People ask me what the process looks like. Here's the honest version:

**Step 1:** Free site checkup. You already did this. I look at where you stand and tell you what's holding you back.

**Step 2:** I build your system. Website, Google Business Profile, local SEO. Flat rate — you know the number before I start. You own the site, the domain, and all the data from day one. No contracts.

**Step 3:** Your phone starts ringing. Not traffic numbers or impressions. Calls and jobs.

Builds run $495 to $1,995 depending on how aggressively you want to rank. Most local service businesses land at $1,495 — full site, optimized Google profile, and two blog posts that start ranking from launch day.

If that's in the right range, I'd be glad to take a look at your specific situation and tell you what I'd actually do.

Matt
(256) 644-7334 | headleyweb.com

---

## Email 4 — Day 14

**Subject:** What the before and after actually looks like

[First name],

I'll be honest: I don't have a dozen case studies yet. I'm intentionally keeping the client load small so I can do the work right.

But the pattern is consistent. A site that was built to look good — or built by a nephew, or just hasn't been touched since 2018 — is invisible on Google. Not because Google doesn't know it exists. Because it doesn't load fast on a phone, doesn't answer the right questions, and doesn't tell Google precisely where the business is and what it does.

After the rebuild: map pack visibility, first-page results for core service terms, and a site the owner can pull up on their phone without cringing.

Search results don't move overnight. Usually 30-60 days before you see meaningful ranking changes. But the site starts working the day it goes live — anyone who finds you through referrals, Facebook, or a business card has somewhere credible to land.

That's the honest picture of what to expect.

Matt

> **Content note:** Replace this email with a real case study as soon as Between Worlds or another client hits 30-day data. Even one metric ("calls went from 2/week to 9/week in 45 days") changes the conversion rate of this email significantly.

---

## Email 5 — Day 21

**Subject:** Every month you wait is another month of lost leads

[First name],

I'll be direct.

The businesses in your area that are building their sites now will rank higher, collect more reviews, and show up in more AI answers 12 months from now. The gap between them and the businesses waiting compounds every month.

Dunn's HVAC in Anniston was just acquired by a Southeast private equity firm. That company has a national SEO team behind them now. That's not happening to every competitor — but it's the direction the market is moving. The businesses that win are the ones that get their digital presence set before that kind of money owns the map pack.

I have room for one or two more clients this month. If you want 15 minutes, I'll look at your site and tell you what I'd do and what it would cost. No pressure either way.

Text or call: **(256) 644-7334**
Or book online: **headleyweb.com**

Matt Headley
Headley Web & SEO

> **Content note:** The Dunn's reference is time-sensitive — refresh this email when you have a client case study that can replace it, or when a more current local example emerges.

---

## Long-Tail Nurture (Day 22+)

Biweekly emails for up to 12 months. Use:
- Seasonal posts ("Is Your Website Ready for Spring?") — see `BLOG_POST_PLAN.md` seasonal section
- New blog posts as they publish — pull the best paragraph, link to the post
- Local angle updates ("I just saw that [local competitor] launched a new site...")
- Quarterly care plan upsell (around the 90-day mark)

---

## Blog → Email Mapping

| Email | Blog post to link when live |
|-------|----------------------------|
| 2 (problem) | #10d "I Asked ChatGPT to Recommend a Plumber in Anniston" |
| 3 (plan) | KG2 "5 Questions Before Hiring a Web Designer" or KG3 "Template vs Custom-Built" |
| 4 (proof) | Case study post (Between Worlds, 30-day data) |
| 5 (stakes) | KG1 "AI Website Builder vs Hiring a Web Designer" or AEO post #15 |
| Long-tail | Seasonal posts + new blog content as published |

---

## Activation Checklist (wired April 2026 — 4 steps to go live)

The sequence is built. Files:
- `src/app/api/send-report/route.ts` — captures lead into Supabase + Resend audience after audit email sends
- `src/app/api/cron/nurture/route.ts` — daily cron, sends due sequence emails, advances step
- `vercel.json` — cron schedule (2 PM UTC daily)

### Step 1 — Create Supabase table
Open [supabase.com](https://supabase.com) → your project (`wpitqjhvephecfppzvoi`) → SQL Editor → run:

```sql
create table hw_nurture_leads (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  first_name text,
  added_at timestamptz default now(),
  sequence_step integer default 0,
  last_sent_at timestamptz,
  active boolean default true
);
```

### Step 2 — Create Resend audience
[resend.com](https://resend.com) → Audiences → New Audience → name it **"HW Leads"** → copy the audience ID.

### Step 3 — Add 4 env vars in Vercel
headleyweb project → Settings → Environment Variables:

| Key | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | same as southern-legends project (`https://wpitqjhvephecfppzvoi.supabase.co`) |
| `SUPABASE_SERVICE_ROLE_KEY` | same as southern-legends `.env.local` |
| `HW_RESEND_AUDIENCE_ID` | the audience ID from Step 2 |
| `CRON_SECRET` | any random string — generate with `openssl rand -hex 20` |

### Step 4 — Deploy
```bash
git add -A && git commit -m "Wire email nurture sequence" && git push
```

Vercel activates the cron automatically on deploy. Every audit lead gets emails at days 0 (instant with PDF), 3, 7, 14, and 21. Lead capture is best-effort — if Supabase is misconfigured, the audit email still sends.

---

# Newsletter Sequence — General Subscribers

> Separate from the audit funnel above. Triggered by homepage/contact page subscribe form.
> Route: `/api/subscribe` → audience `HW_NEWSLETTER_AUDIENCE_ID` (create in Resend: "HW Newsletter").
> Welcome email fires immediately. Day-3 via Resend Automations (see activation below).

## Email 1 — Welcome (Day 0)

Sent immediately from `/api/subscribe/route.ts`.

**Subject:** Thanks for signing up

**From:** Matt Headley <matt@headleyweb.com>

---

[firstName], (or "Hey," if no first name)

Thanks for getting on the list.

I'm Matt Headley. I build websites for local service businesses in Northeast Alabama — the kind of sites that actually come up when someone searches for your trade in your town.

If you want to see what that looks like in practice, Southern Legends is my own project — an editorial site I designed and built from scratch. Same Next.js stack, same SEO approach, same performance standards I bring to client work:
https://southernlegends.blog

I'll be in touch when I have something worth saying.

Matt
Headley Web & SEO
(256) 644-7334 | headleyweb.com

---

## Email 2 — Day 3

Soft pitch. Links to the audit tool and pricing.

**Subject:** If you're still thinking about your site

**From:** Matt Headley <matt@headleyweb.com>

---

[firstName],

If you've been thinking about getting your site sorted out, two places to start:

The free checkup takes 60 seconds. It scores your site on messaging, mobile speed, and local search — and tells you what I'd fix first if this were my site:
https://headleyweb.com/audit

If you'd rather just see what builds cost and talk through what fits your situation:
https://headleyweb.com/services

No pressure either way. I'm here when you're ready.

Matt
(256) 644-7334

---

## Activation Checklist

### Step 1 — Create Resend audience
[resend.com](https://resend.com) → Audiences → New Audience → name it **"HW Newsletter"** → copy the audience ID.

### Step 2 — Add env var in Vercel
headleyweb project → Settings → Environment Variables:

| Key | Value |
|-----|-------|
| `HW_NEWSLETTER_AUDIENCE_ID` | the audience ID from Step 1 |

### Step 3 — Day-3 via Resend Automations (preferred)

1. Resend → **Automations** → **New Automation**
2. Trigger: **Contact added to audience** → select "HW Newsletter"
3. Add step: **Wait** → 3 days
4. Add step: **Send email** → paste the Day-3 copy above
5. Activate

> If Automations aren't on your plan, extend the existing `/api/cron/nurture/route.ts` to handle newsletter leads — add a `source` column to `hw_nurture_leads` and a new step type for the newsletter sequence.

### Step 4 — Deploy
```bash
git add -A && git commit -m "Add general newsletter subscribe flow" && git push
```
