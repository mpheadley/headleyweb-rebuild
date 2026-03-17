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
    .map(i => `- ${i.label}: ${i.failLabel} (signals: ${i.signals.join("; ")})`)
    .join("\n");

  const topFailedAudits = auditResult.failedAudits
    .slice(0, 5)
    .map(a => `- ${a.title}${a.score !== null ? ` (score: ${Math.round(a.score * 100)})` : ""}`)
    .join("\n");

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

FAILING STORYBRAND ITEMS:
${failingItems || "none"}

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
        system: `You are a StoryBrand-certified web consultant analyzing a small local business website. Give 3-5 specific, actionable recommendations in priority order. Each recommendation should:
- Reference actual data from the audit (specific scores, copy, or findings)
- Be written in second person ("Your headline says X — change it to Y")
- Be one sentence, max two
- Focus on changes that will convert more visitors into customers
- Never recommend things the site already does well

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
