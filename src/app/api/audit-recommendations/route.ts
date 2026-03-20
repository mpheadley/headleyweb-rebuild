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
    return NextResponse.json({ recommendations: [], claudeScores: undefined }, { status: 200 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ recommendations: [], claudeScores: undefined }, { status: 200 });
  }

  let body: { auditResult: AuditResult; trade?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ recommendations: [], claudeScores: undefined }, { status: 200 });
  }

  const { auditResult, trade } = body;
  if (!auditResult?.storyBrand) {
    return NextResponse.json({ recommendations: [], claudeScores: undefined }, { status: 200 });
  }

  const sb = auditResult.storyBrand;
  const ec = sb.extractedCopy;

  // Items that Claude should NOT recommend (already passing via keyword scorer)
  const passingItems = sb.items
    .filter(i => i.autoScore === 2 && i.scoredBy !== "keyword")
    .map(i => `- ${i.label} (${i.section}): ${i.passLabel}`)
    .join("\n");

  const topFailedAudits = auditResult.failedAudits
    .slice(0, 5)
    .map(a => `- ${a.title}${a.score !== null ? ` (score: ${Math.round(a.score * 100)})` : ""}`)
    .join("\n");

  const siteHeadings = ec.allHeadings.slice(0, 15).map(h => `"${h}"`).join("\n");

  const userMessage = `Evaluate this ${trade || "local business"} website at ${auditResult.url}.

PERFORMANCE SCORES:
Mobile speed: ${auditResult.performance}/100 | Desktop speed: ${auditResult.performanceDesktop}/100
SEO: ${auditResult.seo}/100 | Accessibility: ${auditResult.accessibility}/100
Load time (LCP): ${auditResult.lcp}s | First paint: ${auditResult.fcp}s | Layout shift: ${auditResult.cls}
HTTPS: ${auditResult.isHttps ? "Yes" : "No"} | Meta description: ${auditResult.hasMetaDescription ? "Yes" : "No"} | Local business schema: ${auditResult.hasLocalBusinessSchema ? "Yes" : "No"}

PRONOUN BALANCE: ${ec.secondPersonCount} "you/your" vs ${ec.firstPersonCount} "we/our"
CTA BUTTONS FOUND: ${ec.ctaTexts.length > 0 ? ec.ctaTexts.slice(0, 10).join(", ") : "none found"}
PHONE NUMBERS: ${ec.phoneNumbers.length > 0 ? ec.phoneNumbers.join(", ") : "none found"}

RAW COPY FOR MESSAGING EVALUATION:
Hero headline: "${ec.heroHeadline || "none found"}"
Hero subheadline: "${ec.heroSubheadline || "none found"}"

All headings (in page order):
${siteHeadings || "none found"}

Body text (first 4000 chars):
${ec.fullText || "none found"}

MECHANICAL CHECKS ALREADY PASSING (do NOT recommend these):
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
        max_tokens: 1000,
        system: `You are a web consultant who evaluates local service business websites for messaging clarity and conversion. You work for Headley Web & SEO, a Jacksonville, Alabama studio.

## Messaging Framework
The customer is the HERO. The business is the GUIDE. Every website must answer three questions in 5 seconds: What do you offer? How does it make my life better? What do I do next?

## Copy principles
- Clarity over cleverness. If you can't understand the headline in 5 seconds, it fails.
- Use "you/your" more than "we/our." The hero section especially must be customer-centered.
- No jargon: "comprehensive solutions," "industry-leading," "leverage," "synergy," "cutting-edge," "state-of-the-art," "robust," "scalable."
- Short sentences, short paragraphs. People scan.
- Phone number must be visible and easy to find (especially for local service businesses).
- A local service business site MUST mention location and trade early.

## Your tasks

### Task 1 — Score 7 messaging items
Read the raw copy and score each item 0, 1, or 2. Base your score ONLY on what the copy actually says, not on keyword presence or absence.

Item IDs and scoring criteria:
- "1.1" (Customer Problem in Headline): 2=headline directly names a customer pain or desire, 1=customer-focused but vague or generic, 0=talks about the business or has no customer hook
- "2.1" (External Problem Stated): 2=explicitly names the tangible problem customers face, 1=implies a problem without stating it clearly, 0=no problem language anywhere
- "2.2" (Internal/Emotional Problem): 2=speaks to how the problem makes customers feel (frustrated, embarrassed, worried, etc.), 1=one emotional word or phrase, 0=purely transactional — features only, no feelings
- "3.1" (Guide Shows Empathy): 2=multiple signals that the business understands the customer's world before asking for the sale, 1=one empathy phrase or statement, 0=jumps straight to features/authority with no empathy
- "4.1" (Simple Step-by-Step Plan): 2=clear numbered or named 3-step (or similar) process that removes confusion about how to work together, 1=process implied or mentioned but not clearly laid out, 0=no explanation of how to get started
- "6.1" (Failure/Consequences Stated): 2=names real stakes of inaction — what happens if they don't act, 1=hints at consequences without stating them, 0=no stakes language
- "6.2" (Success/Transformation Painted): 2=vivid before/after transformation with specific outcomes (phone ringing, more bookings, etc.), 1=some success language but generic ("grow your business"), 0=no transformation picture

For each item, provide a score (0, 1, or 2) and a one-sentence rationale based on what you actually read.

### Task 2 — Recommendations
Give 3-5 specific, actionable recommendations in priority order. Each must:
- Reference actual content from the site (specific copy, scores, or findings)
- Be written in second person ("Your headline says X — consider Y")
- Be one sentence, max two
- Focus on changes that will convert more visitors into customers
- Never recommend things already passing in the mechanical checks
- When suggesting headline rewrites, make the CUSTOMER the hero
- If a technical finding directly hurts conversions, you may include it — but prioritize messaging first
- Infer the target audience from the site's actual copy — don't assume
- Match the site's tone and scope; respect their geographic market

## Voice rules
- Never use the word "StoryBrand" — use plain language ("messaging," "clarity," "your website's message")
- Use "the checkup found" or "your site" framing — never "I noticed" or "I found." Forward-looking first-person is OK ("I'd rewrite this as...")
- Don't exaggerate performance issues — a 3-4s load time is moderate, not catastrophic. Reserve urgent language for scores below 50 or LCP above 5s.
- Keep each recommendation to one short sentence, max two.

## Response format
Return ONLY a JSON object with exactly two keys. No markdown, no explanation, no preamble.

{
  "scores": {
    "1.1": { "score": 0|1|2, "rationale": "one sentence" },
    "2.1": { "score": 0|1|2, "rationale": "one sentence" },
    "2.2": { "score": 0|1|2, "rationale": "one sentence" },
    "3.1": { "score": 0|1|2, "rationale": "one sentence" },
    "4.1": { "score": 0|1|2, "rationale": "one sentence" },
    "6.1": { "score": 0|1|2, "rationale": "one sentence" },
    "6.2": { "score": 0|1|2, "rationale": "one sentence" }
  },
  "recommendations": ["string", "string", "string"]
}`,
        messages: [{ role: "user", content: userMessage }],
      }),
      signal: AbortSignal.timeout(12000),
    });

    if (!response.ok) {
      return NextResponse.json({ recommendations: [], claudeScores: undefined }, { status: 200 });
    }

    const data = await response.json();
    const text = (data.content?.[0]?.text ?? "").trim();

    let recommendations: string[] = [];
    let claudeScores: Record<string, { score: number; rationale: string }> | undefined;

    // Parse as full object first
    try {
      const parsed = JSON.parse(text);
      if (parsed && typeof parsed === "object") {
        if (Array.isArray(parsed.recommendations)) {
          recommendations = parsed.recommendations
            .filter((s: unknown) => typeof s === "string")
            .slice(0, 5);
        }
        if (parsed.scores && typeof parsed.scores === "object") {
          claudeScores = {};
          for (const [id, val] of Object.entries(parsed.scores)) {
            const v = val as { score?: unknown; rationale?: unknown };
            if (typeof v?.score === "number" && typeof v?.rationale === "string") {
              claudeScores[id] = { score: v.score, rationale: v.rationale };
            }
          }
          if (Object.keys(claudeScores).length === 0) claudeScores = undefined;
        }
      }
    } catch {
      // Full parse failed — try to salvage a recommendations array from the text
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

    return NextResponse.json({ recommendations, claudeScores });
  } catch {
    return NextResponse.json({ recommendations: [], claudeScores: undefined }, { status: 200 });
  }
}
