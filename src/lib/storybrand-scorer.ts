/* ── StoryBrand copy analysis: HTML extraction + scoring ── */

import * as cheerio from "cheerio";
import type { StoryBrandItem, StoryBrandScore } from "./audit-types";

/* ── Keyword Constants ── */

const JARGON_WORDS = [
  "comprehensive", "solutions", "industry-leading", "leverage", "synergy",
  "utilize", "cutting-edge", "state-of-the-art", "world-class", "best-in-class",
  "innovative", "paradigm", "holistic", "streamline", "robust",
  "next-generation", "turnkey", "scalable", "mission-critical", "enterprise",
];

const WEAK_CTAS = [
  "learn more", "read more", "explore", "discover", "click here", "submit",
  "find out more", "see more", "view more",
];

const STRONG_CTAS = [
  "call", "book", "schedule", "get", "start", "claim", "request",
  "free", "quote", "now", "today",
];

const PAIN_WORDS = [
  "broken", "not working", "losing", "struggling", "frustrated",
  "overwhelmed", "can't find", "no calls", "no leads", "leaking",
  "failing", "missing", "wasting", "costing", "stress", "stressful",
  "hassle", "headache", "boring", "complicated", "confusing",
  "expensive", "unreliable", "hard to find", "no time", "don't know",
  "without the", "settle for",
];

const EMOTION_WORDS = [
  "frustrated", "embarrassed", "overwhelmed", "worried", "stressed",
  "tired of", "sick of", "shouldn't have to", "afraid", "anxious",
  "confused", "exhausted", "desperate", "annoying", "scary",
  "intimidating", "dreading", "nervous", "unsure", "don't want to",
  "worry less", "don't worry", "peace of mind", "without the stress",
  "don't settle",
];

const EMPATHY_PHRASES = [
  "i know", "i understand", "i've been there", "i've seen",
  "it's frustrating", "you deserve", "we understand", "we know",
  "we've been there", "don't worry", "worry less", "we love",
  "we're here", "you shouldn't have to", "we've got you",
  "leave it to us", "we handle", "so you can", "so you don't have to",
  "you focus on", "we take care",
];

const CONSEQUENCE_WORDS = [
  "losing", "missing out", "competitors", "falling behind", "costing you",
  "every day without", "every month without", "every week without",
  "what happens if", "without a", "don't settle", "don't miss",
  "before it's too late", "don't wait", "while you still can",
  "boring", "forgettable", "average", "mediocre",
];

const SUCCESS_WORDS = [
  "you'll", "your phone will", "you'll show up", "you'll stop",
  "imagine", "picture this", "no more", "finally",
  "starts ringing", "get found", "get calls", "get booked",
  "epic", "unforgettable", "memorable", "dream", "love",
  "confident", "easy", "simple", "enjoy", "relax",
  "stress-free", "hassle-free", "worry-free", "you just",
];

const RISK_REDUCERS = [
  "free", "no obligation", "no contract", "money back", "guarantee",
  "risk-free", "cancel anytime", "no commitment", "no strings",
  "refundable", "no cleaning", "no hassle", "won't be charged",
  "included", "we provide", "everything you need", "no extra",
  "no hidden", "no surprise",
];

/* ── HTML Text Extraction (cheerio-based) ── */

export type ExtractedCopy = {
  heroHeadline: string;
  heroSubheadline: string;
  allHeadings: string[];
  ctaTexts: string[];
  phoneNumbers: string[];
  bodyText: string;
  hasLocalBusinessSchema: boolean;
};

export function extractTextFromHtml(html: string): ExtractedCopy {
  const $ = cheerio.load(html);

  // Check for LocalBusiness (or subtype) JSON-LD schema BEFORE removing scripts
  let hasLocalBusinessSchema = false;
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).html() ?? "");
      const types = Array.isArray(json) ? json : [json];
      for (const obj of types) {
        const t = (obj["@type"] ?? "").toLowerCase();
        if (
          t.includes("localbusiness") ||
          t.includes("professionalservice") ||
          t.includes("homeandconstructionbusiness") ||
          t.includes("plumber") ||
          t.includes("electrician") ||
          t.includes("hvacbusiness") ||
          t.includes("roofingcontractor") ||
          t.includes("generalcontractor")
        ) {
          hasLocalBusinessSchema = true;
        }
      }
    } catch {
      // invalid JSON-LD, skip
    }
  });

  // Remove non-content elements
  $("script, style, noscript, svg, iframe").remove();

  // Extract all headings
  const allHeadings: string[] = [];
  $("h1, h2, h3, h4, h5, h6").each((_, el) => {
    const text = $(el).text().replace(/\s+/g, " ").trim();
    if (text) allHeadings.push(text);
  });

  // Hero headline = first h1
  const heroHeadline = $("h1").first().text().replace(/\s+/g, " ").trim();

  // Hero subheadline = first <p> after first <h1>, or second heading
  let heroSubheadline = "";
  const firstH1 = $("h1").first();
  if (firstH1.length) {
    const nextP = firstH1.nextAll("p").first();
    if (nextP.length) {
      heroSubheadline = nextP.text().replace(/\s+/g, " ").trim();
    }
  }
  if (!heroSubheadline && allHeadings.length > 1) {
    heroSubheadline = allHeadings[1];
  }

  // Extract CTA texts from buttons/links with CTA-like classes
  const ctaTexts: string[] = [];
  const seen = new Set<string>();

  $("a, button").each((_, el) => {
    const $el = $(el);
    const classes = ($el.attr("class") ?? "").toLowerCase();
    const text = $el.text().replace(/\s+/g, " ").trim();

    if (!text || text.length < 2 || text.length > 50) return;
    if (seen.has(text.toLowerCase())) return;
    seen.add(text.toLowerCase());

    // Prioritize elements with CTA-like classes
    if (/btn|cta|button|action/.test(classes) && text.length < 50) {
      ctaTexts.unshift(text); // CTA-classed elements first
    } else if (text.length >= 3 && text.length < 40) {
      ctaTexts.push(text);
    }
  });

  // Extract phone numbers
  const phoneNumbers: string[] = [];
  const bodyHtml = $("body").html() ?? "";
  const phoneMatches = bodyHtml.matchAll(/(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g);
  for (const m of phoneMatches) {
    if (!phoneNumbers.includes(m[0])) phoneNumbers.push(m[0]);
  }

  // Get body text
  const bodyText = $("body").text()
    .replace(/\s+/g, " ")
    .trim();

  return { heroHeadline, heroSubheadline, allHeadings, ctaTexts, phoneNumbers, bodyText, hasLocalBusinessSchema };
}

/* ── StoryBrand Scoring ── */

export function scoreStoryBrand(extracted: ExtractedCopy): StoryBrandScore {
  const { heroHeadline, heroSubheadline, allHeadings, ctaTexts, phoneNumbers, bodyText } = extracted;
  const lowerBody = bodyText.toLowerCase();
  const lowerHero = heroHeadline.toLowerCase();
  const heroSection = (heroHeadline + " " + heroSubheadline).toLowerCase();
  const items: StoryBrandItem[] = [];

  // Count pronouns
  const firstPersonCount = (lowerBody.match(/\b(we|our|us|my|i)\b/g) ?? []).length;
  const secondPersonCount = (lowerBody.match(/\b(you|your|you're|you'll)\b/g) ?? []).length;
  const heroFirstPerson = (heroSection.match(/\b(we|our|us|my|i)\b/g) ?? []).length;
  const heroSecondPerson = (heroSection.match(/\b(you|your|you're|you'll)\b/g) ?? []).length;

  // Helper: count keyword matches
  function countMatches(text: string, keywords: string[]): number {
    return keywords.filter(kw => text.includes(kw)).length;
  }

  // 1.1 Customer Problem in Headline
  const heroFailSignals: string[] = [];
  const heroPassSignals: string[] = [];
  let heroScore: number | null = null;
  if (lowerHero.startsWith("welcome")) heroFailSignals.push("Starts with 'Welcome'");
  if (lowerHero.match(/since \d{4}/)) heroFailSignals.push("Contains founding year");
  if (lowerHero.match(/^(we|our|i|my)\b/)) heroFailSignals.push("Leads with first person");
  if (lowerHero.match(/\b(you|your)\b/)) heroPassSignals.push("Uses second-person language");
  if (countMatches(lowerHero, PAIN_WORDS) > 0) heroPassSignals.push("Contains pain-point language");
  // Benefit/outcome framing in headline counts as customer-focused
  if (countMatches(lowerHero, SUCCESS_WORDS) > 0) heroPassSignals.push("Outcome/benefit language in headline");
  if (heroFailSignals.length > 0) heroScore = 0;
  else if (heroPassSignals.length >= 2) heroScore = 2;
  else if (heroPassSignals.length >= 1) heroScore = 1;
  // No signals at all but also no fail signals → give partial credit (neutral headline)
  else heroScore = 1;
  items.push({
    id: "1.1", label: "Customer Problem in Headline", section: "Hero",
    autoScore: heroScore, signals: [...heroFailSignals, ...heroPassSignals],
    passLabel: "Your headline speaks to a real customer problem",
    failLabel: "Headline doesn't connect to a real customer pain",
  });

  // 1.2 Clear Value Proposition
  const vpSignals: string[] = [];
  let vpScore: number | null = null;
  const hasTradeKeyword = /\b(plumb|hvac|heat|cool|electric|salon|hair|lawn|repair|roof|paint|clean|build|remodel|contractor)\w*/i.test(heroSection);
  const hasLocation = /\b(alabama|jacksonville|anniston|gadsden|oxford|talladega|centre|county)\b/i.test(lowerBody.slice(0, 500));
  const hasBenefit = countMatches(heroSection, ["save", "fix", "get", "stop", "help", "find", "grow", "protect", "fast", "affordable"]) > 0;
  if (hasTradeKeyword) vpSignals.push("Trade/industry keyword found");
  if (hasLocation) vpSignals.push("Location mentioned early");
  if (hasBenefit) vpSignals.push("Benefit language present");
  if (vpSignals.length >= 2) vpScore = 2;
  else if (vpSignals.length === 1) vpScore = 1;
  else vpScore = 0;
  items.push({
    id: "1.2", label: "Clear Value Proposition", section: "Hero",
    autoScore: vpScore, signals: vpSignals,
    passLabel: "Visitors can quickly tell what you do and where",
    failLabel: "Visitors can't tell what you do in 5 seconds",
  });

  // 1.3 Direct CTA Above the Fold
  const ctaLower = ctaTexts.map(t => t.toLowerCase());
  const weakCtas = ctaLower.filter(t => WEAK_CTAS.some(w => t.includes(w)));
  const strongCtas = ctaLower.filter(t => STRONG_CTAS.some(s => t.includes(s)));
  const ctaSignals: string[] = [];
  let ctaScore = 0;
  if (strongCtas.length > 0) {
    ctaScore = 2;
    ctaSignals.push(`Strong CTAs found: ${strongCtas.slice(0, 3).map(s => `"${s}"`).join(", ")}`);
  } else if (ctaTexts.length > 0) {
    ctaScore = 1;
    ctaSignals.push(`CTAs found but weak: ${ctaLower.slice(0, 3).map(s => `"${s}"`).join(", ")}`);
  } else {
    ctaSignals.push("No CTA buttons detected");
  }
  if (weakCtas.length > 0) ctaSignals.push(`Weak CTAs: ${weakCtas.slice(0, 3).map(s => `"${s}"`).join(", ")}`);
  items.push({
    id: "1.3", label: "Direct CTA Above the Fold", section: "Hero",
    autoScore: ctaScore, signals: ctaSignals,
    passLabel: "Clear call-to-action visible right away",
    failLabel: "No clear call-to-action above the fold",
  });

  // 1.4 Sub-headline Expands the Story (manual)
  items.push({
    id: "1.4", label: "Sub-headline Expands the Story", section: "Hero",
    autoScore: null, signals: heroSubheadline ? [`Sub-headline found: "${heroSubheadline.slice(0, 100)}"`] : ["No sub-headline detected"],
    passLabel: "Sub-headline adds helpful detail",
    failLabel: "No sub-headline to explain what you offer",
  });

  // 1.5 No "We" Disease in Hero
  const pronounSignals: string[] = [];
  let pronounScore = 0;
  pronounSignals.push(`Hero: ${heroSecondPerson} "you/your" vs ${heroFirstPerson} "we/our"`);
  // Check if the headline itself (not subheadline) leads with first person
  const headlineLeadsWithWe = /^(we|our|i|my)\b/.test(lowerHero);
  if (heroFirstPerson === 0 && heroSecondPerson > 0) {
    pronounScore = 2;
    pronounSignals.push("Hero is customer-centered");
  } else if (heroFirstPerson === 0 && heroSecondPerson === 0) {
    // No pronouns at all — headline focused on outcome/benefit, not "we" or "you"
    pronounScore = 2;
    pronounSignals.push("Headline focuses on outcome, not pronouns");
  } else if (!headlineLeadsWithWe && heroSecondPerson > 0) {
    // Headline is customer-focused, "we" appears in supporting text (guide role)
    pronounScore = 2;
    pronounSignals.push("Headline is customer-focused; 'we' in supporting text is guide voice");
  } else if (heroSecondPerson >= heroFirstPerson) {
    pronounScore = 1;
    pronounSignals.push("More you/your than we/our, but mixed");
  } else {
    pronounScore = 0;
    pronounSignals.push("Hero leads with the business, not the customer");
  }
  items.push({
    id: "1.5", label: 'No "We" Disease in Hero', section: "Hero",
    autoScore: pronounScore, signals: pronounSignals,
    passLabel: "Your hero section focuses on the customer, not you",
    failLabel: "Hero talks about your business instead of the customer",
  });

  // 1.6 Three Questions Answered (manual)
  items.push({
    id: "1.6", label: "Three Questions Answered in 5 Seconds", section: "Hero",
    autoScore: null, signals: ["Manual check: What do you offer? How does it help me? What do I do next?"],
    passLabel: "A visitor can answer 'what, how, and what next' in seconds",
    failLabel: "Visitors can't quickly tell what you offer, how it helps, or what to do next",
  });

  // 2.1 External Problem Stated
  const painMatches = PAIN_WORDS.filter(w => lowerBody.includes(w));
  const painSignals: string[] = [];
  let painScore = 0;
  if (painMatches.length >= 2) {
    painScore = 2;
    painSignals.push(`Pain language found: ${painMatches.slice(0, 5).join(", ")}`);
  } else if (painMatches.length >= 1) {
    painScore = 1;
    painSignals.push(`Some pain language: ${painMatches.join(", ")}`);
  } else {
    painSignals.push("No pain-point language detected");
  }
  items.push({
    id: "2.1", label: "External Problem Stated", section: "Problem",
    autoScore: painScore, signals: painSignals,
    passLabel: "You name the problem your customers are facing",
    failLabel: "Doesn't name the problem your customers face",
  });

  // 2.2 Internal/Emotional Problem
  const emotionMatches = EMOTION_WORDS.filter(w => lowerBody.includes(w));
  const emotionSignals: string[] = [];
  let emotionScore = 0;
  if (emotionMatches.length >= 2) {
    emotionScore = 2;
    emotionSignals.push(`Emotional language: ${emotionMatches.slice(0, 5).join(", ")}`);
  } else if (emotionMatches.length === 1) {
    emotionScore = 1;
    emotionSignals.push(`Minimal emotional language: ${emotionMatches.join(", ")}`);
  } else {
    emotionSignals.push("No emotional/internal problem language detected");
  }
  items.push({
    id: "2.2", label: "Internal/Emotional Problem Addressed", section: "Problem",
    autoScore: emotionScore, signals: emotionSignals,
    passLabel: "You speak to how the problem makes customers feel",
    failLabel: "Doesn't speak to how the problem makes customers feel",
  });

  // 3.1 Empathy
  const empathyMatches = EMPATHY_PHRASES.filter(p => lowerBody.includes(p));
  const empathySignals: string[] = [];
  let empathyScore = 0;
  if (empathyMatches.length >= 2) {
    empathyScore = 2;
    empathySignals.push(`Empathy phrases: ${empathyMatches.join(", ")}`);
  } else if (empathyMatches.length === 1) {
    empathyScore = 1;
    empathySignals.push(`Some empathy: ${empathyMatches.join(", ")}`);
  } else {
    empathySignals.push("No empathy language detected");
  }
  items.push({
    id: "3.1", label: "Guide Shows Empathy", section: "Guide",
    autoScore: empathyScore, signals: empathySignals,
    passLabel: "You show customers you understand their situation",
    failLabel: "Doesn't show customers you understand what they're going through",
  });

  // 3.2 Authority
  const authoritySignals: string[] = [];
  let authorityScore: number | null = null;
  const hasTestimonial = /"[^"]{20,}"/.test(bodyText) || /testimonial|review/i.test(bodyText);
  const hasYearsExp = /\d+\+?\s*years?\s*(of\s+)?experience/i.test(bodyText);
  const hasNumbers = /helped?\s+\d+|served?\s+\d+|\d+\s*\+?\s*(clients?|customers?|businesses?|projects?|families|parties|events)/i.test(bodyText);
  const hasSocialProof = /real\s+(kids|people|results|customers|clients)|gallery|photos|portfolio/i.test(bodyText);
  const hasSpecificStats = /\d+\s*(blasters?|darts?|barriers?|items?|products?|services?)|\d+%/i.test(bodyText);
  if (hasTestimonial) authoritySignals.push("Testimonials/reviews detected");
  if (hasYearsExp) authoritySignals.push("Years of experience mentioned");
  if (hasNumbers) authoritySignals.push("Specific numbers/results cited");
  if (hasSocialProof) authoritySignals.push("Social proof detected (gallery/real results)");
  if (hasSpecificStats) authoritySignals.push("Specific stats or inventory numbers cited");
  if (authoritySignals.length >= 2) authorityScore = 2;
  else if (authoritySignals.length === 1) authorityScore = 1;
  else {
    authorityScore = 0;
    authoritySignals.push("No authority signals detected");
  }
  items.push({
    id: "3.2", label: "Guide Shows Authority", section: "Guide",
    autoScore: authorityScore, signals: authoritySignals,
    passLabel: "You back up your expertise with proof",
    failLabel: "No proof you're the right person for the job",
  });

  // 4.1 Simple Step-by-Step Plan
  const planSignals: string[] = [];
  let planScore: number | null = null;
  const hasHowItWorks = /how it works|how we work|our process|simple steps|easy steps|step [123]|the plan|the process|here'?s how|what to expect/i.test(bodyText);
  const hasNumberedSteps = /step\s*[123]|1\.\s+\w|first[\s,].*second[\s,].*third/i.test(bodyText);
  // Detect heading-based plans ("Book", "Pickup", "Return" or "1. X", "2. Y")
  const planHeadings = allHeadings.filter(h => /^(step\s*\d|[123]\.|book|order|pick\s*up|return|schedule|choose|get\s+started)/i.test(h));
  if (hasHowItWorks) planSignals.push("'How it works' section detected");
  if (hasNumberedSteps) planSignals.push("Numbered steps detected");
  if (planHeadings.length >= 2) planSignals.push(`Plan headings found: ${planHeadings.slice(0, 3).join(", ")}`);
  if (planSignals.length >= 2) planScore = 2;
  else if (planSignals.length >= 1) planScore = 1;
  else {
    planScore = 0;
    planSignals.push("No plan/process section detected");
  }
  items.push({
    id: "4.1", label: "Simple Step-by-Step Plan", section: "Plan",
    autoScore: planScore, signals: planSignals,
    passLabel: "You show visitors exactly how to get started",
    failLabel: "No clear 'here's how it works' steps",
  });

  // 4.2 Plan Reduces Risk
  const riskMatches = RISK_REDUCERS.filter(w => lowerBody.includes(w));
  const riskSignals: string[] = [];
  let riskScore = 0;
  if (riskMatches.length >= 2) {
    riskScore = 2;
    riskSignals.push(`Risk reducers: ${riskMatches.join(", ")}`);
  } else if (riskMatches.length === 1) {
    riskScore = 1;
    riskSignals.push(`Some risk reduction: ${riskMatches.join(", ")}`);
  } else {
    riskSignals.push("No risk-reducing language detected");
  }
  items.push({
    id: "4.2", label: "Plan Reduces Risk", section: "Plan",
    autoScore: riskScore, signals: riskSignals,
    passLabel: "You reduce risk with guarantees or reassurance",
    failLabel: "Nothing to make visitors feel safe taking the next step",
  });

  // 5.1 CTA Repeated Throughout
  const ctaCount = ctaTexts.length;
  const ctaRepeatSignals: string[] = [`${ctaCount} CTA buttons/links detected`];
  let ctaRepeatScore = 0;
  if (ctaCount >= 4) { ctaRepeatScore = 2; }
  else if (ctaCount >= 2) { ctaRepeatScore = 1; }
  items.push({
    id: "5.1", label: "CTA Repeated Throughout Page", section: "Call to Action",
    autoScore: ctaRepeatScore, signals: ctaRepeatSignals,
    passLabel: "Call-to-action buttons appear throughout the page",
    failLabel: "Not enough call-to-action buttons — visitors lose interest",
  });

  // 5.2 CTA Language is Action-Oriented
  const ctaLangSignals: string[] = [];
  let ctaLangScore = 0;
  if (strongCtas.length > weakCtas.length) {
    ctaLangScore = 2;
    ctaLangSignals.push("CTAs use strong action language");
  } else if (strongCtas.length > 0) {
    ctaLangScore = 1;
    ctaLangSignals.push("Mix of strong and weak CTAs");
  } else if (ctaTexts.length > 0) {
    ctaLangSignals.push("CTAs use weak/passive language");
  } else {
    ctaLangSignals.push("No CTAs detected");
  }
  items.push({
    id: "5.2", label: "CTA Language is Action-Oriented", section: "Call to Action",
    autoScore: ctaLangScore, signals: ctaLangSignals,
    passLabel: "Your buttons use strong, clear action words",
    failLabel: "Button text is vague — visitors aren't sure what happens next",
  });

  // 6.1 Failure/Consequences Stated
  const consequenceMatches = CONSEQUENCE_WORDS.filter(w => lowerBody.includes(w));
  const consequenceSignals: string[] = [];
  let consequenceScore = 0;
  if (consequenceMatches.length >= 2) {
    consequenceScore = 2;
    consequenceSignals.push(`Consequence language: ${consequenceMatches.join(", ")}`);
  } else if (consequenceMatches.length === 1) {
    consequenceScore = 1;
    consequenceSignals.push(`Some consequence language: ${consequenceMatches.join(", ")}`);
  } else {
    consequenceSignals.push("No consequences/failure language detected");
  }
  items.push({
    id: "6.1", label: "Failure/Consequences Stated", section: "Stakes",
    autoScore: consequenceScore, signals: consequenceSignals,
    passLabel: "You show what happens if visitors do nothing",
    failLabel: "Doesn't show what happens if they do nothing",
  });

  // 6.2 Success/Transformation Painted
  const successMatches = SUCCESS_WORDS.filter(w => lowerBody.includes(w));
  const successSignals: string[] = [];
  let successScore = 0;
  if (successMatches.length >= 2) {
    successScore = 2;
    successSignals.push(`Success language: ${successMatches.slice(0, 5).join(", ")}`);
  } else if (successMatches.length >= 1) {
    successScore = 1;
    successSignals.push(`Some success language: ${successMatches.join(", ")}`);
  } else {
    successSignals.push("No success/transformation language detected");
  }
  items.push({
    id: "6.2", label: "Success/Transformation Painted", section: "Stakes",
    autoScore: successScore, signals: successSignals,
    passLabel: "You paint a picture of what life looks like after",
    failLabel: "Doesn't show visitors what success looks like",
  });

  // 7.1 No Jargon
  const jargonMatches = JARGON_WORDS.filter(w => lowerBody.includes(w));
  const jargonSignals: string[] = [];
  let jargonScore = 2;
  if (jargonMatches.length >= 3) {
    jargonScore = 0;
    jargonSignals.push(`Heavy jargon: ${jargonMatches.join(", ")}`);
  } else if (jargonMatches.length >= 1) {
    jargonScore = 1;
    jargonSignals.push(`Some jargon: ${jargonMatches.join(", ")}`);
  } else {
    jargonSignals.push("No jargon detected — plain English");
  }
  items.push({
    id: "7.1", label: "No Jargon — Plain English", section: "Messaging",
    autoScore: jargonScore, signals: jargonSignals,
    passLabel: "Your site uses plain, easy-to-understand language",
    failLabel: "Too much jargon — customers won't understand what you're saying",
  });

  // 7.2 Phone Number Visible
  const phoneSignals: string[] = [];
  let phoneScore = 0;
  if (phoneNumbers.length > 0) {
    const firstChunk = bodyText.slice(0, 500);
    const phoneInHeader = phoneNumbers.some(p => firstChunk.includes(p));
    if (phoneInHeader) {
      phoneScore = 2;
      phoneSignals.push(`Phone in header/hero: ${phoneNumbers[0]}`);
    } else {
      phoneScore = 1;
      phoneSignals.push(`Phone found but not prominent: ${phoneNumbers[0]}`);
    }
  } else {
    phoneSignals.push("No phone number detected on the page");
  }
  items.push({
    id: "7.2", label: "Phone Number Visible", section: "Messaging",
    autoScore: phoneScore, signals: phoneSignals,
    passLabel: "Phone number is easy to find",
    failLabel: "No phone number visible on the page",
  });

  // Calculate totals
  const autoScoredItems = items.filter(i => i.autoScore !== null);
  const manualItems = items.filter(i => i.autoScore === null).map(i => i.id);
  const autoTotal = autoScoredItems.reduce((sum, i) => sum + (i.autoScore ?? 0), 0);
  const autoMax = autoScoredItems.length * 2;

  // Estimate grade (extrapolate manual items at the same rate as auto)
  const autoRate = autoMax > 0 ? autoTotal / autoMax : 0;
  const estimatedTotal = Math.round(autoRate * 40);
  let grade = "F";
  if (estimatedTotal >= 34) grade = "A";
  else if (estimatedTotal >= 26) grade = "B";
  else if (estimatedTotal >= 18) grade = "C";
  else if (estimatedTotal >= 10) grade = "D";

  return {
    autoTotal,
    autoMax,
    manualItems,
    grade,
    items,
    extractedCopy: {
      heroHeadline,
      heroSubheadline,
      allHeadings: allHeadings.slice(0, 20),
      ctaTexts: ctaTexts.slice(0, 15),
      phoneNumbers,
      firstPersonCount,
      secondPersonCount,
      fullText: bodyText.slice(0, 2000),
    },
  };
}
