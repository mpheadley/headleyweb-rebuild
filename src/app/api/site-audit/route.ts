import { NextRequest, NextResponse } from "next/server";

/* ── Types ── */

export type StoryBrandItem = {
  id: string;
  label: string;
  section: string;
  autoScore: number | null; // 0-2, null = needs manual scoring
  signals: string[]; // what the auto-scorer detected
};

export type StoryBrandScore = {
  autoTotal: number; // sum of auto-scored items
  autoMax: number; // max possible from auto-scored items
  manualItems: string[]; // IDs of items that need Matt's judgment
  grade: string; // estimated letter grade
  items: StoryBrandItem[];
  // Extracted copy for Matt to review
  extractedCopy: {
    heroHeadline: string;
    heroSubheadline: string;
    allHeadings: string[];
    ctaTexts: string[];
    phoneNumbers: string[];
    firstPersonCount: number;
    secondPersonCount: number;
    fullText: string; // truncated to ~2000 chars
  };
};

export type AuditResult = {
  url: string;
  // Scores (0-100)
  performance: number;
  seo: number;
  accessibility: number;
  // Timing metrics
  fcp: number;
  lcp: number;
  cls: number;
  tbt: number;
  // Boolean checks
  isHttps: boolean;
  hasMetaDescription: boolean;
  hasViewport: boolean;
  hasHreflang: boolean;
  isLinkCrawlable: boolean;
  // Detailed audits for internal view
  failedAudits: { id: string; title: string; description: string; score: number | null }[];
  passedAudits: { id: string; title: string }[];
  // StoryBrand copy analysis
  storyBrand: StoryBrandScore | null;
};

export type AuditError = {
  error: string;
};

/* ── Constants ── */

const PAGESPEED_API = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

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
  "failing", "missing", "wasting", "costing",
];

const EMOTION_WORDS = [
  "frustrated", "embarrassed", "overwhelmed", "worried", "stressed",
  "tired of", "sick of", "shouldn't have to", "afraid", "anxious",
  "confused", "exhausted", "desperate",
];

const EMPATHY_PHRASES = [
  "i know", "i understand", "i've been there", "i've seen",
  "it's frustrating", "you deserve", "we understand", "we know",
  "we've been there",
];

const CONSEQUENCE_WORDS = [
  "losing", "missing out", "competitors", "falling behind", "costing you",
  "every day without", "every month without", "every week without",
  "what happens if", "without a",
];

const SUCCESS_WORDS = [
  "you'll", "your phone will", "you'll show up", "you'll stop",
  "imagine", "picture this", "no more", "finally",
  "starts ringing", "get found", "get calls", "get booked",
];

const RISK_REDUCERS = [
  "free", "no obligation", "no contract", "money back", "guarantee",
  "risk-free", "cancel anytime", "no commitment", "no strings",
];

/* ── URL Validation ── */

function isValidUrl(str: string): boolean {
  try {
    const url = new URL(str);
    if (!["http:", "https:"].includes(url.protocol)) return false;
    if (["localhost", "127.0.0.1", "0.0.0.0"].includes(url.hostname)) return false;
    if (url.hostname.endsWith(".local")) return false;
    return true;
  } catch {
    return false;
  }
}

/* ── HTML Text Extraction ── */

function extractTextFromHtml(html: string): {
  heroHeadline: string;
  heroSubheadline: string;
  allHeadings: string[];
  ctaTexts: string[];
  phoneNumbers: string[];
  bodyText: string;
} {
  // Remove scripts, styles, and comments
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");

  // Extract headings
  const headingMatches = cleaned.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi);
  const allHeadings: string[] = [];
  for (const m of headingMatches) {
    const text = m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (text) allHeadings.push(text);
  }

  // Hero headline = first h1
  const h1Match = cleaned.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const heroHeadline = h1Match
    ? h1Match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
    : "";

  // Hero subheadline = first <p> after first <h1>, or first h2
  let heroSubheadline = "";
  if (h1Match) {
    const afterH1 = cleaned.substring((h1Match.index ?? 0) + h1Match[0].length);
    const nextP = afterH1.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (nextP) {
      heroSubheadline = nextP[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    }
  }
  if (!heroSubheadline && allHeadings.length > 1) {
    heroSubheadline = allHeadings[1];
  }

  // Extract button/CTA texts
  const ctaTexts: string[] = [];
  const buttonMatches = cleaned.matchAll(/<(?:button|a)[^>]*class[^>]*(?:btn|cta|button|action)[^>]*>([\s\S]*?)<\/(?:button|a)>/gi);
  for (const m of buttonMatches) {
    const text = m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (text && text.length < 50) ctaTexts.push(text);
  }
  // Also get all <a> and <button> with short text as potential CTAs
  const linkMatches = cleaned.matchAll(/<(?:button|a)[^>]*>([\s\S]*?)<\/(?:button|a)>/gi);
  for (const m of linkMatches) {
    const text = m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (text && text.length > 2 && text.length < 40 && !ctaTexts.includes(text)) {
      ctaTexts.push(text);
    }
  }

  // Extract phone numbers
  const phoneNumbers: string[] = [];
  const phoneMatches = cleaned.matchAll(/(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g);
  for (const m of phoneMatches) {
    if (!phoneNumbers.includes(m[0])) phoneNumbers.push(m[0]);
  }

  // Get body text
  const bodyText = cleaned
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#?\w+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return { heroHeadline, heroSubheadline, allHeadings, ctaTexts, phoneNumbers, bodyText };
}

/* ── StoryBrand Scoring ── */

function scoreStoryBrand(extracted: ReturnType<typeof extractTextFromHtml>): StoryBrandScore {
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
  if (heroFailSignals.length > 0) heroScore = 0;
  else if (heroPassSignals.length >= 2) heroScore = 2;
  else if (heroPassSignals.length === 1) heroScore = 1;
  items.push({
    id: "1.1", label: "Customer Problem in Headline", section: "Hero",
    autoScore: heroScore, signals: [...heroFailSignals, ...heroPassSignals],
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
  });

  // 1.4 Sub-headline Expands the Story (manual)
  items.push({
    id: "1.4", label: "Sub-headline Expands the Story", section: "Hero",
    autoScore: null, signals: heroSubheadline ? [`Sub-headline found: "${heroSubheadline.slice(0, 100)}"`] : ["No sub-headline detected"],
  });

  // 1.5 No "We" Disease in Hero
  const pronounSignals: string[] = [];
  let pronounScore = 0;
  pronounSignals.push(`Hero: ${heroSecondPerson} "you/your" vs ${heroFirstPerson} "we/our"`);
  if (heroFirstPerson === 0 && heroSecondPerson > 0) {
    pronounScore = 2;
    pronounSignals.push("Hero is customer-centered");
  } else if (heroSecondPerson > heroFirstPerson) {
    pronounScore = 1;
    pronounSignals.push("More you/your than we/our, but mixed");
  } else {
    pronounScore = 0;
    pronounSignals.push("Hero leads with the business, not the customer");
  }
  items.push({
    id: "1.5", label: 'No "We" Disease in Hero', section: "Hero",
    autoScore: pronounScore, signals: pronounSignals,
  });

  // 1.6 Three Questions Answered (manual)
  items.push({
    id: "1.6", label: "Three Questions Answered in 5 Seconds", section: "Hero",
    autoScore: null, signals: ["Manual check: What do you offer? How does it help me? What do I do next?"],
  });

  // 2.1 External Problem Stated
  const painMatches = PAIN_WORDS.filter(w => lowerBody.includes(w));
  const painSignals: string[] = [];
  let painScore = 0;
  if (painMatches.length >= 3) {
    painScore = 2;
    painSignals.push(`Strong pain language: ${painMatches.slice(0, 5).join(", ")}`);
  } else if (painMatches.length >= 1) {
    painScore = 1;
    painSignals.push(`Some pain language: ${painMatches.join(", ")}`);
  } else {
    painSignals.push("No pain-point language detected");
  }
  items.push({
    id: "2.1", label: "External Problem Stated", section: "Problem",
    autoScore: painScore, signals: painSignals,
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
  });

  // 3.2 Authority
  const authoritySignals: string[] = [];
  let authorityScore: number | null = null;
  const hasTestimonial = /"[^"]{20,}"/.test(bodyText) || /testimonial|review/i.test(bodyText);
  const hasYearsExp = /\d+\+?\s*years?\s*(of\s+)?experience/i.test(bodyText);
  const hasNumbers = /helped?\s+\d+|served?\s+\d+|\d+\s*\+?\s*(clients?|customers?|businesses?|projects?)/i.test(bodyText);
  if (hasTestimonial) authoritySignals.push("Testimonials/reviews detected");
  if (hasYearsExp) authoritySignals.push("Years of experience mentioned");
  if (hasNumbers) authoritySignals.push("Specific numbers/results cited");
  if (authoritySignals.length >= 2) authorityScore = 2;
  else if (authoritySignals.length === 1) authorityScore = 1;
  else {
    authorityScore = 0;
    authoritySignals.push("No authority signals detected");
  }
  items.push({
    id: "3.2", label: "Guide Shows Authority", section: "Guide",
    autoScore: authorityScore, signals: authoritySignals,
  });

  // 4.1 Simple Step-by-Step Plan
  const planSignals: string[] = [];
  let planScore: number | null = null;
  const hasHowItWorks = /how it works|how we work|our process|simple steps|easy steps|step [123]/i.test(bodyText);
  const hasNumberedSteps = /step\s*[123]|1\.\s+\w|first[\s,].*second[\s,].*third/i.test(bodyText);
  if (hasHowItWorks) planSignals.push("'How it works' section detected");
  if (hasNumberedSteps) planSignals.push("Numbered steps detected");
  if (planSignals.length >= 2) planScore = 2;
  else if (planSignals.length === 1) planScore = 1;
  else {
    planScore = 0;
    planSignals.push("No plan/process section detected");
  }
  items.push({
    id: "4.1", label: "Simple Step-by-Step Plan", section: "Plan",
    autoScore: planScore, signals: planSignals,
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
  });

  // 6.2 Success/Transformation Painted
  const successMatches = SUCCESS_WORDS.filter(w => lowerBody.includes(w));
  const successSignals: string[] = [];
  let successScore = 0;
  if (successMatches.length >= 3) {
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
  });

  // 7.2 Phone Number Visible
  const phoneSignals: string[] = [];
  let phoneScore = 0;
  if (phoneNumbers.length > 0) {
    // Check if phone appears in first ~500 chars (likely header/hero)
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
  });

  // Calculate totals
  const autoScoredItems = items.filter(i => i.autoScore !== null);
  const manualItems = items.filter(i => i.autoScore === null).map(i => i.id);
  const autoTotal = autoScoredItems.reduce((sum, i) => sum + (i.autoScore ?? 0), 0);
  const autoMax = autoScoredItems.length * 2;

  // Estimate grade (extrapolate manual items at the same rate as auto)
  const autoRate = autoMax > 0 ? autoTotal / autoMax : 0;
  const estimatedTotal = Math.round(autoRate * 40); // project to 40-point scale
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

/* ── Main Handler ── */

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" } as AuditError, { status: 400 });
  }

  let normalizedUrl = url.trim();
  if (!normalizedUrl.startsWith("http")) {
    normalizedUrl = `https://${normalizedUrl}`;
  }

  if (!isValidUrl(normalizedUrl)) {
    return NextResponse.json({ error: "Please enter a valid website URL" } as AuditError, { status: 400 });
  }

  try {
    // Run PageSpeed and copy scrape in parallel
    const [pageSpeedResult, copyResult] = await Promise.allSettled([
      fetchPageSpeed(normalizedUrl),
      fetchAndScrapeCopy(normalizedUrl),
    ]);

    // Process PageSpeed
    let lighthouse = getDefaultLighthouse();
    if (pageSpeedResult.status === "fulfilled") {
      lighthouse = pageSpeedResult.value;
    }

    // Process copy scrape + StoryBrand scoring
    let storyBrand: StoryBrandScore | null = null;
    if (copyResult.status === "fulfilled" && copyResult.value) {
      storyBrand = scoreStoryBrand(copyResult.value);
    }

    const result: AuditResult = {
      url: normalizedUrl,
      ...lighthouse,
      storyBrand,
    };

    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof DOMException && err.name === "TimeoutError") {
      return NextResponse.json(
        { error: "The audit timed out. The site may be too slow to analyze or temporarily unavailable." } as AuditError,
        { status: 504 }
      );
    }
    console.error("Site audit error:", err);
    return NextResponse.json(
      { error: "Something went wrong running the audit. Please try again." } as AuditError,
      { status: 500 }
    );
  }
}

/* ── PageSpeed Fetch ── */

async function fetchPageSpeed(normalizedUrl: string) {
  const apiUrl = new URL(PAGESPEED_API);
  apiUrl.searchParams.set("url", normalizedUrl);
  apiUrl.searchParams.set("category", "performance");
  apiUrl.searchParams.append("category", "seo");
  apiUrl.searchParams.append("category", "accessibility");
  apiUrl.searchParams.set("strategy", "mobile");

  const apiKey = process.env.PAGESPEED_API_KEY?.trim();
  if (apiKey) {
    apiUrl.searchParams.set("key", apiKey);
  }

  const response = await fetch(apiUrl.toString(), {
    signal: AbortSignal.timeout(45000),
  });

  if (!response.ok) {
    throw new Error(`PageSpeed API returned ${response.status}`);
  }

  const data = await response.json();
  const categories = data.lighthouseResult?.categories ?? {};
  const audits = data.lighthouseResult?.audits ?? {};

  const performance = Math.round((categories.performance?.score ?? 0) * 100);
  const seo = Math.round((categories.seo?.score ?? 0) * 100);
  const accessibility = Math.round((categories.accessibility?.score ?? 0) * 100);

  const fcp = parseFloat(((audits["first-contentful-paint"]?.numericValue ?? 0) / 1000).toFixed(1));
  const lcp = parseFloat(((audits["largest-contentful-paint"]?.numericValue ?? 0) / 1000).toFixed(1));
  const cls = parseFloat((audits["cumulative-layout-shift"]?.numericValue ?? 0).toFixed(3));
  const tbt = Math.round(audits["total-blocking-time"]?.numericValue ?? 0);

  const isHttps = normalizedUrl.startsWith("https");
  const hasMetaDescription = audits["meta-description"]?.score === 1;
  const hasViewport = audits["viewport"]?.score === 1;
  const hasHreflang = audits["hreflang"]?.score === 1 || audits["hreflang"]?.score === null;
  const isLinkCrawlable = audits["link-text"]?.score === 1;

  const failedAudits: AuditResult["failedAudits"] = [];
  const passedAudits: AuditResult["passedAudits"] = [];

  const auditRefs = [
    ...(categories.performance?.auditRefs ?? []),
    ...(categories.seo?.auditRefs ?? []),
    ...(categories.accessibility?.auditRefs ?? []),
  ];

  const seenIds = new Set<string>();
  for (const ref of auditRefs) {
    const audit = audits[ref.id];
    if (!audit || seenIds.has(ref.id)) continue;
    seenIds.add(ref.id);

    if (audit.score === null || audit.scoreDisplayMode === "notApplicable") continue;

    if (audit.score < 1) {
      failedAudits.push({
        id: ref.id,
        title: audit.title ?? ref.id,
        description: (audit.description ?? "").split("[Learn more]")[0].trim(),
        score: audit.score,
      });
    } else {
      passedAudits.push({ id: ref.id, title: audit.title ?? ref.id });
    }
  }

  failedAudits.sort((a, b) => (a.score ?? 0) - (b.score ?? 0));

  return {
    performance, seo, accessibility,
    fcp, lcp, cls, tbt,
    isHttps, hasMetaDescription, hasViewport, hasHreflang, isLinkCrawlable,
    failedAudits, passedAudits,
  };
}

function getDefaultLighthouse() {
  return {
    performance: 0, seo: 0, accessibility: 0,
    fcp: 0, lcp: 0, cls: 0, tbt: 0,
    isHttps: false, hasMetaDescription: false, hasViewport: false, hasHreflang: false, isLinkCrawlable: false,
    failedAudits: [] as AuditResult["failedAudits"],
    passedAudits: [] as AuditResult["passedAudits"],
  };
}

/* ── Copy Scrape ── */

async function fetchAndScrapeCopy(normalizedUrl: string) {
  const response = await fetch(normalizedUrl, {
    signal: AbortSignal.timeout(15000),
    headers: {
      "User-Agent": "HeadleyWebAudit/1.0 (site-checkup)",
      "Accept": "text/html",
    },
  });

  if (!response.ok) return null;

  const html = await response.text();
  return extractTextFromHtml(html);
}
