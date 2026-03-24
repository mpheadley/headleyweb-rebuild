# Prompt: Business Card QR Landing Page & Tracking

Paste this into a new Claude Code chat to build the feature.

---

## Context

I run Headley Web & SEO (headleyweb.com), a web design studio in Jacksonville, Alabama. My business card has a QR code that currently points to `https://headleyweb.com?utm_source=business_card&utm_medium=qr&utm_campaign=networking` -- GA4 picks up the UTM params automatically.

I want to upgrade this to a dedicated landing page that:
1. Gives people who scan my card a better experience than just the homepage
2. Tracks scans so I can see how many people actually use the QR code
3. Can be offered as a feature to my clients (I build websites for local service businesses)

## What to build

### For headleyweb.com (my site, Next.js App Router in `headleyweb/`)

Build a `/card` page (`src/app/card/page.tsx`) that:
- Shows a short, personalized welcome: "Thanks for connecting with Matt" or similar
- Has my headshot and a one-liner about what I do (pull from `website-copy.md` or `brandscript.md`)
- Primary CTA: phone call link (256-644-7334)
- Secondary CTA: link to the free site audit (headleyweb.com/audit)
- Tertiary: email link (matt@headleyweb.com)
- Fires a `card_scan` GA4 custom event on page load (use the existing GA4 consent pattern in the site)
- `noindex` in metadata (this page is for QR traffic, not search)
- Follows the existing Sage & Stone design system (see `headleyweb/CLAUDE.md` for color tokens, fonts, component classes)
- Mobile-first -- most people scanning a business card are on their phone

### For the starter kit templates (future client sites)

After building the headleyweb.com version, build a templatized `/card` page for client sites:
- Review `tools/client-meeting/CARD_LANDING_PAGE_PROMPT.md` for the decision framework I already wrote
- Add a scaffolded `card/page.tsx` to `nextjs-starter-kit/template/src/app/` using `{{CLIENT_NAME}}`, `{{CLIENT_PHONE_DISPLAY}}`, `{{CLIENT_EMAIL}}`, `{{CLIENT_PHONE_RAW}}` tokens (matching the rest of the scaffold)
- Add a static `card.html` to `starter-kit/` using the same token pattern
- Include the GA4 `card_scan` event in both templates
- Add `noindex` metadata by default
- Update `create-next-site.sh` and `create-site.sh` to prompt for card page inclusion (default: yes) and fill in the tokens

### QR code update

My current business card QR is generated via `api.qrserver.com` in `headleyweb/business-card-print.html`. After building the landing page:
- Update the QR code URL to point to `https://headleyweb.com/card` (with UTM params baked in: `?utm_source=business_card&utm_medium=qr&utm_campaign=networking`)
- Keep the existing brand colors in the QR generation

## Files to read first
- `headleyweb/src/app/layout.tsx` -- existing layout, fonts, GA4 setup
- `headleyweb/src/app/page.tsx` -- homepage for design reference
- `headleyweb/business-card-print.html` -- current QR code implementation
- `website-copy.md` and `brandscript.md` -- copy to pull from
- `tools/client-meeting/CARD_LANDING_PAGE_PROMPT.md` -- the decision framework for client sites
- `CLAUDE.md` -- design system tokens and build rules
