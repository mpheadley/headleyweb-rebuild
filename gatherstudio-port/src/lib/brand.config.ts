/**
 * Gather Studio — central brand config.
 *
 * Single source of truth for brand-level values.
 *
 * The bundle has ALREADY been rebranded from Headley Web -> Gather Studio
 * (domain, brand name, report sender). This file remains the place to manage
 * those values going forward — import BRAND where convenient, e.g.
 * `BRAND.phoneDisplay` instead of the hardcoded "(256) 644-7334".
 *
 * A few owner-specific literals are intentionally KEPT (Matt is the owner of
 * Gather Studio too): his name "Matt Headley", email, phone, the `HeadleyWebSEO`
 * social handle, and the headshot/vCard filenames on the /card page. Update the
 * handle + asset filenames if GS uses its own. See README "Remaining manual steps."
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

  // Contact  (same owner, Matt Headley — update only if GS uses different contact)
  phoneDisplay: "(256) 644-7334",
  phoneHref: "+12566447334",
  email: "matt@headleyweb.com",

  // Email delivery (Resend)
  // NOTE: create a NEW Resend audience for Gather Studio — do not reuse the
  // existing Southern Legends audience. Verify the sending domain first.
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
