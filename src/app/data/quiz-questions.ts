/* ── Quiz data: trade options, questions, archetypes, manual checklist ── */

export const tradeOptions = [
  { key: "plumbing", label: "Plumbing" },
  { key: "hvac", label: "HVAC" },
  { key: "electrical", label: "Electrical" },
  { key: "roofing", label: "Roofing" },
  { key: "painting", label: "Painting" },
  { key: "landscaping", label: "Landscaping / Lawn Care" },
  { key: "cleaning", label: "Cleaning Service" },
  { key: "pest-control", label: "Pest Control" },
  { key: "auto-repair", label: "Auto Repair / Mechanic" },
  { key: "salon", label: "Salon / Barbershop" },
  { key: "contractor", label: "General Contractor" },
  { key: "other", label: "Other Local Service" },
];

export const questions = [
  {
    question: "When someone asks for your website, you...",
    answers: [
      { text: "Proudly share a link", value: 4 },
      { text: "Give them your Facebook page", value: 2 },
      { text: "Change the subject", value: 1 },
      { text: "Say \"it's being updated\" (it's been 2 years)", value: 3 },
    ],
  },
  {
    question: "Your Google Business Profile is...",
    answers: [
      { text: "Fully optimized with photos and reviews", value: 4 },
      { text: "I think I claimed it once?", value: 2 },
      { text: "What's a Google Business Profile?", value: 1 },
      { text: "It exists but could use some love", value: 3 },
    ],
  },
  {
    question: "When a customer Googles your trade + your town, you...",
    answers: [
      { text: "Show up on the first page", value: 4 },
      { text: "Show up... eventually... maybe page 3", value: 3 },
      { text: "Your competitor shows up instead", value: 2 },
      { text: "You've never actually checked", value: 1 },
    ],
  },
  {
    question: "Your marketing strategy is mainly...",
    answers: [
      { text: "Word of mouth and prayer", value: 1 },
      { text: "Social media posts when I remember", value: 2 },
      { text: "A mix of things but nothing consistent", value: 3 },
      { text: "Planned and tracked with real data", value: 4 },
    ],
  },
  {
    question: "When it comes to technology, you...",
    answers: [
      { text: "Built your own computer", value: 4 },
      { text: "Can handle email and social media", value: 3 },
      { text: "Your kids set up your phone", value: 1 },
      { text: "Tried a website builder, gave up halfway", value: 2 },
    ],
  },
  {
    question: "Your biggest frustration right now is...",
    answers: [
      { text: "Great work, but no one knows about it", value: 1 },
      { text: "Inconsistent leads — feast or famine", value: 2 },
      { text: "Competitors who aren't as good get more business", value: 3 },
      { text: "Not having time to figure out the online stuff", value: 2 },
    ],
  },
  {
    question: "If someone asks how you get new customers, you say...",
    answers: [
      { text: "\"All referrals\" (said with pride)", value: 2 },
      { text: "\"I honestly don't know\"", value: 1 },
      { text: "\"A mix of things\"", value: 3 },
      { text: "\"I have a system that works\"", value: 4 },
    ],
  },
  {
    question: "What sounds most like your business right now?",
    answers: [
      { text: "\"I'm the best-kept secret in town\"", value: 1 },
      { text: "\"I'm doing fine but could do better\"", value: 3 },
      { text: "\"I need to modernize but don't know where to start\"", value: 2 },
      { text: "\"I'm ready to invest in real growth\"", value: 4 },
    ],
  },
];

export type Archetype = {
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  strength: string;
  risk: string;
  recommendation: string;
  tier: string;
};

const archetypes: Record<string, Archetype> = {
  invisible: {
    name: "The Invisible Expert",
    emoji: "\u{1F50D}",
    tagline: "You're amazing at what you do. Nobody online knows it yet.",
    description:
      "You've built your business on skill and hustle — but your online presence is basically nonexistent. Customers can't find you, and competitors who aren't half as good are getting the calls.",
    strength: "Your craft speaks for itself once people find you",
    risk: "Every day without a web presence, you're handing leads to competitors",
    recommendation:
      "You need the full package — a professional site, Google Business Profile, and local SEO to go from invisible to unmissable.",
    tier: "Get Booked",
  },
  warrior: {
    name: "The Word-of-Mouth Warrior",
    emoji: "\u{1F5E3}\u{FE0F}",
    tagline: "Referrals keep you busy. But what happens when they Google you?",
    description:
      "Your reputation is strong in person. The problem? When someone gets your name from a friend, they Google you before they call. If they find a dead Facebook page or nothing at all, that referral becomes someone else's customer.",
    strength: "People already trust you — you just need to close the loop online",
    risk: "You're one bad Google search away from losing warm leads",
    recommendation:
      "A clean, professional site with your Google Business Profile set up properly. You don't need to dominate the internet — you need to not lose the people already looking for you.",
    tier: "Get Found",
  },
  dabbler: {
    name: "The DIY Dabbler",
    emoji: "\u{1F527}",
    tagline: "You tried the website builders. It's... fine. But it's not working.",
    description:
      "You've got a Wix site or a Squarespace page that took you a weekend to build. It technically exists, but it's not generating leads, it doesn't show up on Google, and deep down you know it looks like a \"template with your logo on it.\"",
    strength: "You're not afraid to take action — you just need better tools",
    risk: "A mediocre site can actually hurt more than no site (it says 'I don't take this seriously')",
    recommendation:
      "Let someone build it right. A proper site with real messaging, real SEO, and a design that matches the quality of your work.",
    tier: "Get Calls",
  },
  almost: {
    name: "The Almost There",
    emoji: "\u{1F4C8}",
    tagline: "You've got pieces in place. Time to connect the dots.",
    description:
      "You have a website. Maybe a Google listing. Possibly even some reviews. But the leads are inconsistent, you're not sure what's working, and you know there's another level you haven't reached yet.",
    strength: "You've already started — the foundation exists",
    risk: "Without optimization, you're leaving money on the table every month",
    recommendation:
      "A strategic rebuild or optimization pass. Tighten the messaging, fix the SEO gaps, and turn your existing presence into an actual lead machine.",
    tier: "Get Calls or Get Booked",
  },
  legend: {
    name: "The Local Legend",
    emoji: "\u{1F451}",
    tagline: "You're already winning. Let's make sure you stay there.",
    description:
      "You show up on Google. You get calls from your website. People know your name. But the market is shifting — AI search, voice assistants, and new competitors are coming. The businesses that stay on top are the ones that keep investing.",
    strength: "You have momentum and market trust",
    risk: "Complacency is the only real threat — new competitors are always catching up",
    recommendation:
      "The Get Booked tier with AI visibility and ongoing care. Stay ahead of the curve while everyone else is still figuring out what happened.",
    tier: "Get Booked",
  },
};

export function getArchetype(score: number): Archetype {
  if (score <= 13) return archetypes.invisible;
  if (score <= 18) return archetypes.warrior;
  if (score <= 23) return archetypes.dabbler;
  if (score <= 28) return archetypes.almost;
  return archetypes.legend;
}

export const manualChecklist = [
  {
    section: "Google Business Profile",
    items: [
      "GBP claimed and verified",
      "Business name, address, phone (NAP) accurate",
      "Correct business category selected",
      "Business hours set and up to date",
      "At least 10 photos uploaded (storefront, work, team)",
      "Business description filled out with keywords",
      "Service area or address set correctly",
      "At least 5 Google reviews",
      "Owner responds to reviews",
      "Posts/updates in last 30 days",
    ],
  },
  {
    section: "Online Presence",
    items: [
      "Shows up on Google Maps for main keyword + city",
      "Facebook page exists and is active",
      "Yelp listing claimed (if applicable)",
      "BBB listing (if applicable)",
      "NAP consistent across all directories",
      "No duplicate listings on Google",
    ],
  },
  {
    section: "Conversion Elements",
    items: [
      "Phone number clickable on mobile",
      "Contact form works and submits",
      "Form is short (name, phone, message max)",
      "Thank-you page or confirmation after form submit",
      "Social proof near CTA (reviews, badges, testimonials)",
      "Trust signals present (license #, insurance, BBB)",
      "Live chat or text option (bonus)",
    ],
  },
  {
    section: "StoryBrand (Manual Review)",
    items: [
      "1.4 — Sub-headline expands the story (not just a tagline)",
      "1.6 — Three questions answered in 5 seconds (offer, benefit, next step)",
      "Overall messaging clarity — would a stranger understand in one read?",
      "Guide positioning — empathy + authority balanced, not just credentials",
      "Copy reads like conversation, not corporate speak",
      "Every section drives toward the CTA",
    ],
  },
];
