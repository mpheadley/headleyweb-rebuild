export interface CarePlan {
  name: string;
  price: number;
  tagline: string;
  upgradeReason: string;
  highlights: string[]; // 3 items — used in homepage card footer
  features: string[];   // full list — used in services page care plans section
  iconName: "shield" | "trending-up" | "zap";
}

export interface BuildFeature {
  iconName: string;
  text: string;
}

export interface BuildTier {
  name: string;
  price: number;
  priceDisplay: string;
  tagline: string;
  timeline: string;
  bestValue: boolean;
  cta: string;
  ctaHref: string;
  animationDelay: string;
  features: BuildFeature[];
  inheritedFeatures?: string[];
  inheritedNote?: string;
  carePlan: CarePlan;
}

export const carePlans: CarePlan[] = [
  {
    name: "Essential Care",
    price: 49,
    tagline: "Your site stays live and up to date.",
    iconName: "shield" as const,
    upgradeReason:
      "For businesses that want hands-off hosting — a professional has it covered. No Squarespace login, no guessing if your site is still running.",
    highlights: [
      "Hosting & security handled",
      "Up to 30 min of updates/month",
      "Uptime monitoring",
    ],
    features: [
      "Hosting & security handled for you",
      "Up to 30 min of updates/month — text, photos, hours, prices",
      "Uptime monitoring — I know if it goes down before you do",
      "Email support",
    ],
  },
  {
    name: "Growth Care",
    price: 99,
    tagline: "Your Google Maps presence, actively managed.",
    iconName: "trending-up" as const,
    upgradeReason:
      "Google Maps often drives more calls than the website itself. This plan keeps your listing active, accurate, and building reviews — without you lifting a finger.",
    highlights: [
      "Google Business Profile managed",
      "Monthly results report",
      "Review acquisition coaching",
    ],
    features: [
      "Everything in Essential Care",
      "Google Business Profile managed — posts, review responses, Q&A",
      "Monthly results report — calls, clicks & impressions",
      "Review acquisition coaching — I tell you what to ask and when",
      "Up to 1 hr of edits/month",
    ],
  },
  {
    name: "Accelerate",
    price: 199,
    tagline: "Content that compounds. Visibility that grows.",
    iconName: "zap" as const,
    upgradeReason:
      "For businesses that want to keep climbing — in Google search, Google Maps, and AI tools like ChatGPT. Two new posts a month means more pages ranking, more questions answered, more reasons for customers to find you.",
    highlights: [
      "2 blog posts/month, done for you",
      "Monthly strategy call",
      "AI visibility monitoring",
    ],
    features: [
      "Everything in Growth Care",
      "2 blog posts/month — researched, drafted, published for you",
      "Monthly 30-min strategy call",
      "AI visibility monitoring — ChatGPT & Perplexity",
      "Quarterly content refresh on existing pages",
    ],
  },
];

export const buildTiers: BuildTier[] = [
  {
    name: "Get Found",
    price: 495,
    priceDisplay: "$495",
    tagline: "Get online. Get visible. Get found.",
    timeline: "Typically 1 page · ~1–2 weeks*",
    bestValue: false,
    cta: "Get Found Now",
    ctaHref: "/contact",
    animationDelay: "0s",
    features: [
      { iconName: "Monitor", text: "Professional, mobile-ready design" },
      { iconName: "MessageSquare", text: "Clear messaging that converts visitors" },
      { iconName: "BarChart2", text: "Analytics so you can see who's visiting" },
      { iconName: "MapPin", text: "Google Business Profile setup" },
      { iconName: "Shield", text: "You own everything — no contracts" },
    ],
    carePlan: carePlans[0],
  },
  {
    name: "Get Calls",
    price: 1495,
    priceDisplay: "$1,495",
    tagline: "Show up in search. Start getting calls.",
    timeline: "Typically 3–5 pages · ~2–3 weeks*",
    bestValue: true,
    cta: "Start Getting Calls",
    ctaHref: "/contact",
    animationDelay: "0.12s",
    features: [
      { iconName: "Search", text: "Built to show up when locals search for your trade" },
      { iconName: "HelpCircle", text: "FAQ section Google features in search" },
      { iconName: "BookOpen", text: "Blog built + 2 launch posts written for you" },
    ],
    inheritedFeatures: [
      "Professional, mobile-ready design",
      "Clear messaging that converts visitors",
      "Analytics so you can see who's visiting",
      "Google Business Profile setup",
      "You own everything — no contracts",
    ],
    carePlan: carePlans[1],
  },
  {
    name: "Get Booked",
    price: 1995,
    priceDisplay: "$1,995",
    tagline: "Become the obvious choice in your area.",
    timeline: "Typically 5–7 pages · ~3–4 weeks*",
    bestValue: false,
    cta: "Become the Local Authority",
    ctaHref: "/contact",
    animationDelay: "0.24s",
    features: [
      { iconName: "Navigation", text: "Pages for your city and trade — so locals find you first" },
      { iconName: "Bot", text: "4 blog posts written so AI tools recommend you" },
      { iconName: "Star", text: "Google Maps listing fully built out" },
      { iconName: "Globe", text: "Google knows your trade, your town, and your hours" },
    ],
    inheritedFeatures: [
      "Built to show up when locals search for your trade",
      "FAQ section Google features in search",
      "Blog built + 2 launch posts written for you",
    ],
    inheritedNote: "and everything in Get Found",
    carePlan: carePlans[2],
  },
];
