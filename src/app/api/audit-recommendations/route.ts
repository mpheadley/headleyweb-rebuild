import { NextRequest, NextResponse } from "next/server";
import type { AuditResult } from "@/lib/audit-types";

export const maxDuration = 15;

/* ── Rate Limiting ── */

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 2; // tighter than audit — 2/min/IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

/* ── Main Handler ── */

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({ recommendations: [] }, { status: 200 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ recommendations: [] }, { status: 200 });
  }

  let body: { auditResult: AuditResult; trade?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ recommendations: [] }, { status: 200 });
  }

  const { auditResult, trade } = body;
  if (!auditResult?.storyBrand) {
    return NextResponse.json({ recommendations: [] }, { status: 200 });
  }

  const sb = auditResult.storyBrand;
  const ec = sb.extractedCopy;

  // Build context for Claude
  const failingItems = sb.items
    .filter(i => i.autoScore !== null && i.autoScore < 2)
    .map(i => `- ${i.label} (${i.section}): ${i.failLabel} — signals: ${i.signals.join("; ")}`)
    .join("\n");

  const passingItems = sb.items
    .filter(i => i.autoScore === 2)
    .map(i => `- ${i.label} (${i.section}): ${i.passLabel}`)
    .join("\n");

  const topFailedAudits = auditResult.failedAudits
    .slice(0, 5)
    .map(a => `- ${a.title}${a.score !== null ? ` (score: ${Math.round(a.score * 100)})` : ""}`)
    .join("\n");

  const siteHeadings = ec.allHeadings.slice(0, 10).map(h => `- "${h}"`).join("\n");

  const userMessage = `Here's the audit data for a ${trade || "local business"} website at ${auditResult.url}:

PERFORMANCE: ${auditResult.performance}/100 | SEO: ${auditResult.seo}/100 | Accessibility: ${auditResult.accessibility}/100
Load time (LCP): ${auditResult.lcp}s | First paint: ${auditResult.fcp}s | Layout shift: ${auditResult.cls}
HTTPS: ${auditResult.isHttps ? "Yes" : "No"} | Meta description: ${auditResult.hasMetaDescription ? "Yes" : "No"} | Local business schema: ${auditResult.hasLocalBusinessSchema ? "Yes" : "No"}

STORYBRAND GRADE: ${sb.grade}
Hero headline: "${ec.heroHeadline || "none found"}"
Hero subheadline: "${ec.heroSubheadline || "none found"}"
CTA buttons found: ${ec.ctaTexts.length > 0 ? ec.ctaTexts.join(", ") : "none found"}
Phone numbers: ${ec.phoneNumbers.length > 0 ? ec.phoneNumbers.join(", ") : "none found"}
Pronoun balance: ${ec.secondPersonCount} "you/your" vs ${ec.firstPersonCount} "we/our"

SITE HEADINGS:
${siteHeadings || "none found"}

FAILING STORYBRAND ITEMS:
${failingItems || "none"}

PASSING STORYBRAND ITEMS (do NOT recommend these — the site already does them well):
${passingItems || "none"}

TOP FAILED LIGHTHOUSE AUDITS:
${topFailedAudits || "none"}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        system: `You are a web consultant who uses the StoryBrand SB7 framework to evaluate local service business websites. You work for Headley Web & SEO, a Jacksonville, Alabama studio that builds StoryBrand-powered websites for trades (plumbers, HVAC, contractors, etc.) in Northeast Alabama.

## StoryBrand SB7 Framework (your evaluation lens)
The customer is the HERO. The business is the GUIDE. Every website must answer three questions in 5 seconds: What do you offer? How does it make my life better? What do I do next?

**7 elements you evaluate:**
1. CHARACTER — Does the headline speak to what the CUSTOMER wants (not what the business does)?
2. PROBLEM — Three layers: external (tangible issue), internal (how it makes them FEEL — frustrated, embarrassed, overwhelmed), philosophical (why it shouldn't be this way). Most sites only address external.
3. GUIDE — Shows empathy ("we understand") BEFORE authority (credentials, testimonials, years). Never lead with "we are the best."
4. PLAN — 3 simple steps that remove confusion. Process plan ("1. Call, 2. We assess, 3. We fix") or agreement plan (guarantees, no contracts).
5. CALL TO ACTION — One direct CTA repeated throughout (nav, hero, mid-page, footer). Strong CTAs use action words: "call," "book," "schedule," "get," "start," "claim," "request," "free," "quote," "now," "today." Weak CTAs to flag: "learn more," "discover," "click here," "explore," "submit."
6. FAILURE — Name real consequences of inaction. Not fear-mongering — honest stakes the customer already knows.
7. SUCCESS — Paint the after picture. Before/after transformation. "Imagine..." or "No more..."

## Copy principles
- Clarity over cleverness. If you can't understand the headline in 5 seconds, it fails.
- Use "you/your" more than "we/our." The hero section especially must be customer-centered.
- No jargon: "comprehensive solutions," "industry-leading," "leverage," "synergy," "cutting-edge," "state-of-the-art," "robust," "scalable" — these all fail.
- Short sentences, short paragraphs. People scan.
- Phone number must be visible and easy to find (especially for local service businesses).
- A local service business site MUST mention location and trade early. Visitors need to know what you do and where within seconds.

## Scoring context
- Pronoun balance matters: if "we/our" count exceeds "you/your" count, the site talks about itself more than its customer.
- Risk reducers build trust: "free," "no obligation," "no contract," "guarantee," "cancel anytime," "no hidden fees."
- Empathy phrases that work: "we understand," "you deserve," "so you can," "so you don't have to," "we've got you."
- Success language that converts: "you'll," "imagine," "no more," "finally," "stress-free," "hassle-free."

## Your task
Give 3-5 specific, actionable recommendations in priority order. Each recommendation should:
- Reference actual data from the audit (specific scores, extracted copy, or findings)
- Be written in second person ("Your headline says X — change it to Y")
- Be one sentence, max two
- Focus on changes that will convert more visitors into customers
- Never recommend things the site already does well
- When suggesting headline rewrites, make the CUSTOMER the hero (address their desire or pain), not the business
- If a technical finding (slow speed, missing meta description, no schema) directly hurts their ability to get found or convert visitors, you may reference it — but prioritize messaging recommendations
- Infer the target audience from the site's actual copy (headings, services listed, CTAs) — don't assume B2B or B2C based on the trade label alone
- Match the site's tone and scope: reference the full range of services they actually offer, respect their geographic market (don't substitute our service area), and match the formality level of their existing copy

## Voice rules
- Never use the word "StoryBrand" — use plain language ("messaging," "clarity," "your website's message")
- These recommendations appear in an auto-generated report. Use "the checkup found" or "your site" framing — never "I noticed" or "I found" (no one has personally reviewed it yet). Forward-looking first-person is OK ("I'd rewrite this as...").
- Keep labels honest: if a recommendation is about something only visible in the HTML (not the visual layout), don't claim it's "visible" or "above the fold."
- Don't exaggerate performance issues — a 3-4s load time is moderate, not catastrophic. Reserve urgent language for genuinely poor scores (below 50 or LCP above 5s).
- Keep each recommendation to one short sentence, max two. These render in a PDF with limited space — concise is better.

Return ONLY a JSON array of 3-5 strings. No markdown, no explanation, no preamble.`,
        messages: [{ role: "user", content: userMessage }],
      }),
      signal: AbortSignal.timeout(12000),
    });

    if (!response.ok) {
      return NextResponse.json({ recommendations: [] }, { status: 200 });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? "";

    // Parse JSON array from response
    let recommendations: string[] = [];
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed) && parsed.every((s: unknown) => typeof s === "string")) {
        recommendations = parsed.slice(0, 5);
      }
    } catch {
      // Try extracting JSON array from text
      const match = text.match(/\[[\s\S]*\]/);
      if (match) {
        try {
          const parsed = JSON.parse(match[0]);
          if (Array.isArray(parsed)) {
            recommendations = parsed.filter((s: unknown) => typeof s === "string").slice(0, 5);
          }
        } catch {
          // Give up — return empty
        }
      }
    }

    return NextResponse.json({ recommendations });
  } catch {
    return NextResponse.json({ recommendations: [] }, { status: 200 });
  }
}
