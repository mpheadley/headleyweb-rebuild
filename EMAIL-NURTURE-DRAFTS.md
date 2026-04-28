# Email Nurture Sequence — Headley Web & SEO

> Research + sources: [EMAIL-NURTURE-RESEARCH.md](EMAIL-NURTURE-RESEARCH.md)

## When to Add More Emails

**Audit funnel (Days 0–28):** Complete. Revisit Email 4 (proof/case study) when Between Worlds or another client hits 30-day data. One real metric changes conversion significantly.

**Newsletter sequence (welcome + Day 7):** Add Days 14, 21, 28 when 3-4 proofed blog posts are live. Pull the best paragraph from each post, add a link. Don't write emails without content to back them up.

**Trigger to expand:** 3-4 proofed blog posts live, or first case study with real data.

---

> Revised April 2026. Claude draft — Matt to proof voice before activating.
> Sequence triggers after audit tool lead capture (headleyweb.com/audit).
> Voice guide: `content/VOICE-GUIDE.md`. BrandScript: `brandscript.md`.
> Platform: Resend Automations — audience "Headley Web" (`5a3a30fe-5277-4851-9c90-e6546d8bb2b2`).
> From address: `reports@headleyweb.com` (Headley Web & SEO)

---

## Design Decisions (April 2026)

- **Plain text only** — no logo header, no hero image, no HTML wrapper. These emails work because they read like a person typed them. Adding design signals "marketing blast" before the first word is read. Research confirms plain text gets higher open rates for this type of sequence.
- **No images in body** — one exception: small headshot (52px circle) in signature. Puts a face to the name without feeling corporate.
- **Signature image:** Use `headshot-linkedin-headley.webp` (real photo, not hedcut). Convert to JPEG before use — WebP not supported in Outlook on Windows. Public URL: `https://headleyweb.com/images/headshot-linkedin-headley.webp`
- **One CTA per email** — reply ask in early emails, link in later ones. Never both.
- **80/20 value ratio** — SB best practice is 80% value, 20% ask across the full sequence. Emails 1–4 are value-first. Email 5 is the close.

---

## Sequence Overview

| # | Day | Subject | BrandScript element |
|---|-----|---------|---------------------|
| 1 | 0 | Here's your free site checkup | Guide / empathy + authority |
| 2 | 7 | Your competitors are easier to find (here's why) | Problem / villain named |
| 3 | 14 | What it actually takes to get found | Plan / 3 steps |
| 4 | 21 | What the before and after actually looks like | Success / proof |
| 5 | 28 | Every month you wait is another month of lost leads | Failure stakes + CTA |

**Timing rationale:** SB best practice is one email per week over 4–6 weeks. Original Day 0 + Day 3 gap was too fast — hitting someone twice in the first week increases unsubscribes before trust is built. Adjusted to weekly cadence.

**Day 0 note:** Email 1 is sent by `/api/send-report/route.ts` with the PDF attached. The Resend Automation handles Emails 2–5 (Days 7, 14, 21, 28). Do not add a Day 0 step in the automation or leads will receive two emails simultaneously.

After Day 28 → long-tail biweekly nurture. Use seasonal posts and blog content (see `BLOG_POST_PLAN.md`).

---

## Email 1 — Day 0

**Subject:** Here's your free site checkup
**Sent by:** `/api/send-report/route.ts` (with PDF attached) — NOT the Resend Automation

---

Hi {{first_name}},

Your report is attached. It scores your site across messaging, mobile performance, and local SEO — and shows what I'd fix first if this were my site.

A few things worth knowing: the scores are automated. The recommendations are real. I've rebuilt sites for local service businesses across Northeast Alabama — HVAC, landscaping, transportation — and I'll tell you honestly if what you've got is fixable or needs to start over.

If you want, I'm happy to record a quick walkthrough of your results. Not a sales call — just a 3-5 minute video where I pull up your specific site and tell you what I actually see. Reply here and I'll put it together.

Matt
Headley Web & SEO
(256) 644-7334 | headleyweb.com

---

## Email 2 — Day 7

**Subject:** Your competitors are easier to find (here's why)

---

Hi {{first_name}},

Here's what happens when someone searches for what you do in your city:

Three businesses show up in the map pack. One of them gets the call. Right now, that's probably not you.

Which one shows up has almost nothing to do with who does better work or who's been in business longer. It comes down to which site loads faster on a phone, which Google Business Profile has more recent activity, and which one answers the questions people are actually typing.

There's a second layer most businesses don't know about yet. When someone types "my AC stopped working" into ChatGPT or Google, AI answers the question before they ever see a local business. The businesses recommended in those answers are the ones whose sites are built to be cited. Most aren't.

If you want to know what it would take to fix your numbers — reply and I'll tell you.

Matt

> **Content note:** When blog post #10d ("I Asked ChatGPT to Recommend a Plumber in Anniston") is live, add a P.S. linking to it here. It's the most concrete illustration of this problem.

---

## Email 3 — Day 14

**Subject:** What it actually takes to get found

---

Hi {{first_name}},

People ask me what the process looks like. Here's the short version:

**Step 1:** Free site checkup. You already did this. I look at where you stand and tell you what's holding you back.

**Step 2:** I build your system. Website, Google Business Profile, local SEO. Flat rate — you know the number before I start. You own everything from day one. No contracts.

**Step 3:** Your phone starts ringing. Not traffic numbers or impressions. Calls and jobs.

Builds run $495 to $1,995. Most local service businesses land at $1,495 — full site, optimized Google profile, and two blog posts that start ranking from launch day.

If that's in the right range, I'd be glad to look at your specific situation and tell you what I'd do.

Matt
(256) 644-7334 | headleyweb.com

> **Content note:** When KG2 ("5 Questions Before Hiring a Web Designer") or KG3 ("Template vs Custom-Built") is live, add a P.S. linking here — positions the plan email with more credibility.

---

## Email 4 — Day 21

**Subject:** What the before and after actually looks like

---

Hi {{first_name}},

Here's what to expect — honestly.

The sites that rank in your market aren't ranking because they look good. They load fast on a phone, answer the right questions, and tell Google exactly where the business is and what it does. Most local sites don't do any of that.

After a rebuild: map pack visibility, first-page results for core service terms, and a site you can pull up on your phone without cringing.

Search results don't move overnight. Usually 30-60 days before you see meaningful ranking changes. But the site starts working the day it goes live — anyone who finds you through referrals, Facebook, or a business card has somewhere credible to land.

If any of that sounds like where you're at, reply and I'll tell you what I'd do with your specific site.

Matt

> **Content note:** Replace this email with a real case study as soon as Between Worlds or another client hits 30-day data. Even one metric ("calls went from 2/week to 9/week in 45 days") changes the conversion rate significantly. The placeholder copy is honest but proof closes faster.

---

## Email 5 — Day 28

**Subject:** Every month you wait is another month of lost leads

---

Hi {{first_name}},

I'll be direct.

The businesses in your area building their sites now will rank higher, collect more reviews, and show up in more AI answers 12 months from now. The gap compounds every month.

Dunn's HVAC in Anniston was just acquired by a Southeast private equity firm. That company has a national SEO team behind them now. That's not every competitor — but it's the direction the market is moving. The businesses that win are the ones that get their digital presence set before that kind of money owns the map pack.

I have room for one or two more clients this month. If you want 15 minutes, I'll look at your site and tell you what I'd do and what it would cost. No pressure either way.

Text or call: (256) 644-7334
Or book online: headleyweb.com

Matt Headley
Headley Web & SEO

> **Content note:** The Dunn's reference is time-sensitive — refresh when you have a client case study that can replace it, or when a more current local example emerges.

---

## Signature Block (all emails)

Paste into Resend's HTML editor. Replaces the plain-text signature above each email.

```html
<table cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;border-top:1px solid #e5e7eb;padding-top:16px;">
  <tr>
    <td style="padding-right:14px;vertical-align:top;">
      <img src="https://headleyweb.com/images/headshot-linkedin-headley.webp"
           width="52" height="52"
           style="border-radius:50%;display:block;"
           alt="Matt Headley">
    </td>
    <td style="vertical-align:top;font-family:sans-serif;font-size:13px;color:#374151;line-height:1.6;">
      <strong style="color:#111;">Matt Headley</strong><br>
      Headley Web &amp; SEO<br>
      <a href="tel:2566447334" style="color:#374151;text-decoration:none;">(256) 644-7334</a> &nbsp;·&nbsp;
      <a href="https://headleyweb.com" style="color:#E07B3C;text-decoration:none;">headleyweb.com</a>
    </td>
  </tr>
</table>
```

> **Image format note:** Convert `headshot-linkedin-headley.webp` to JPEG before relying on it in email — Outlook on Windows does not render WebP.

---

## Long-Tail Nurture (Day 29+)

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

## Activation Checklist — Resend Automations (April 2026)

Audience already exists: **"Headley Web"** (`5a3a30fe-5277-4851-9c90-e6546d8bb2b2`). Every audit PDF request adds leads automatically via `/api/send-report/route.ts`.

### Step 1 — Open Resend Automations
resend.com → **Automations** → **Create Automation**

### Step 2 — Set trigger
- Trigger type: **Contact added to audience**
- Audience: **Headley Web** (`5a3a30fe-5277-4851-9c90-e6546d8bb2b2`)

### Step 3 — Build workflow (Emails 2–5 only)

Email 1 is sent by the API with the PDF. Automation handles the follow-up sequence:

```
[Trigger: Contact added to Headley Web audience]
  → Wait 7 days
  → Send Email — Day 7 (problem)
  → Wait 7 days
  → Send Email — Day 14 (plan)
  → Wait 7 days
  → Send Email — Day 21 (success)
  → Wait 7 days
  → Send Email — Day 28 (stakes + CTA)
```

### Step 4 — Email settings (each step)

| Field | Value |
|---|---|
| From name | `Headley Web & SEO` |
| From address | `reports@headleyweb.com` |
| Reply-to | `matt@headleyweb.com` |
| Subject | (from sequence above) |
| Body | Plain text + HTML signature block |

Set `{{first_name}}` fallback to blank — emails read fine without a name.

### Step 5 — Activate

Click **Publish**. Automation applies to all future contacts added to the audience.

> **Plan note:** Resend Automations require the Pro plan ($20/mo). Confirm plan before building.

---

## Legacy: Supabase + Vercel Cron Approach (archived)

The original activation plan used a Supabase table + Vercel cron job. That approach is no longer the plan — Resend Automations handles it natively without infrastructure. Files still exist in the repo if needed:
- `src/app/api/cron/nurture/route.ts`
- `vercel.json` cron schedule

---

# Newsletter Sequence — General Subscribers

> Separate from the audit funnel above. Triggered by homepage/contact page subscribe form.
> Route: `/api/subscribe` → audience `HW_NEWSLETTER_AUDIENCE_ID` (create in Resend: "HW Newsletter").
> Welcome email fires immediately. Day-7 via Resend Automations (see activation below).

## Email 1 — Welcome (Day 0)

Sent immediately from `/api/subscribe/route.ts`.

**Subject:** Thanks for signing up
**From:** Matt Headley <matt@headleyweb.com>

---

{{first_name}}, (or "Hey," if no first name)

Thanks for getting on the list.

I'm Matt Headley. I build websites for local service businesses in Northeast Alabama — the kind of sites that actually come up when someone searches for your trade in your town.

If you want to see what that looks like in practice, Southern Legends is my own project — an editorial site I designed and built from scratch. Same Next.js stack, same SEO approach, same performance standards I bring to client work:
https://southernlegends.blog

I'll be in touch when I have something worth saying.

Matt
Headley Web & SEO
(256) 644-7334 | headleyweb.com

---

## Email 2 — Day 7

Soft pitch. Links to the audit tool and pricing.

**Subject:** If you're still thinking about your site
**From:** Matt Headley <matt@headleyweb.com>

---

{{first_name}},

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
resend.com → Audiences → New Audience → name it **"HW Newsletter"** → copy the audience ID.

### Step 2 — Add env var in Vercel
headleyweb project → Settings → Environment Variables:

| Key | Value |
|-----|-------|
| `HW_NEWSLETTER_AUDIENCE_ID` | the audience ID from Step 1 |

### Step 3 — Day-7 via Resend Automations

1. Resend → **Automations** → **New Automation**
2. Trigger: **Contact added to audience** → select "HW Newsletter"
3. Add step: **Wait** → 7 days
4. Add step: **Send email** → paste the Day-7 copy above
5. Activate

### Step 4 — Deploy
```bash
git add -A && git commit -m "Add general newsletter subscribe flow" && git push
```

---

## Source Tracking (April 2026)

Every new HW newsletter subscriber triggers a notification email to matt@headleyweb.com with the source in the subject line.

**Subject format:** `New HW subscriber: {email} (source: {source})`

**Why:** Resend's free plan has no custom contact attributes — there's no way to tag a contact with where they came from. Notification email is the workaround: Matt gets a copy per subscriber, source visible at a glance.

**Sources tracked:**
| Source value | Where it fires |
|---|---|
| `homepage` | Section SubscribeCTA on homepage (above AEO block) |
| `about` | Section SubscribeCTA on About page |
| `footer` | Inline SubscribeCTA in `NewsletterSignup.tsx` (site footer) |

**Code:** `source` prop on `SubscribeCTA` → passed to `/api/subscribe` body → included in notification email. `NewsletterSignup.tsx` hardcodes `source: "footer"`. Defaults to `"footer"` (inline) or `"homepage"` (section) if prop is omitted on `SubscribeCTA`.
