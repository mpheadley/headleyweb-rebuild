/**
 * Gather Studio — central brand config.
 *
 * Single source of truth for brand-level values that are currently hardcoded
 * across the ported feature files. Two ways to use it:
 *
 *   1. (Recommended, gradual) Import BRAND where you touch a file and replace
 *      the hardcoded literal, e.g. `BRAND.phoneDisplay` instead of "(256) 644-7334".
 *   2. (Fast) Use the find/replace table in ../../README.md to swap the literals
 *      in place, then delete this file if you don't want a runtime dependency.
 *
 * The README lists every file that still contains a Headley Web literal so you
 * can verify nothing was missed (`grep -ri "headley" src/`).
 */
export const BRAND = {
  // Identity
  name: "Gather Studio",
  legalName: "Gather Studio",
  tagline: "Clever confuses. Clarity sells.",
  descriptor:
    "Gather Studio is an Alabama messaging-first studio that fixes your message, builds the site around it, then scales with ads and AI follow-up.",
  builtByLabel: "Built by Gather Studio",

  // URLs
  domain: "gatherstudio.app",
  url: "https://gatherstudio.app",
  ownerSiteUrl: "https://matthewheadley.com",

  // Contact  (same owner as Headley Web — update only if GS uses different contact)
  phoneDisplay: "(256) 644-7334",
  phoneHref: "+12566447334",
  email: "matt@headleyweb.com",

  // Email delivery (Resend)
  // NOTE: create a NEW Resend audience for Gather Studio — do not reuse the
  // Southern Legends / Headley Web audience. Verify the sending domain first.
  resendFrom: "reports@gatherstudio.app",
  resendReplyTo: "matt@headleyweb.com",

  // Forms (Formspree) — create a new Formspree form for GS and paste its id
  formspreeId: "REPLACE_ME",

  // Social
  social: {
    facebook: "",
    linkedin: "",
    instagram: "",
  },

  // Area served (for LocalBusiness / location JSON-LD). Edit to GS's footprint.
  areaServed: [
    "Jacksonville",
    "Anniston",
    "Oxford",
    "Gadsden",
    "Talladega",
    "Alabama",
  ],
} as const;

export type Brand = typeof BRAND;
