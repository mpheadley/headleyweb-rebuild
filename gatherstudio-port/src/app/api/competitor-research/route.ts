import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

/* ── Rate Limiting ── */

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 2;

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

/* ── Types ── */

export type CompetitorResult = {
  name: string;
  url: string;
  advantage: string;
};

/* ── Main Handler ── */

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({ competitors: [] });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ competitors: [] });
  }

  let body: { url: string; trade?: string; city?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ competitors: [] });
  }

  const { url, trade, city } = body;
  if (!url) {
    return NextResponse.json({ competitors: [] });
  }

  // Build a search-informed prompt
  const tradeLabel = trade || "local service business";
  const cityLabel = city || "their area";
  const searchQuery = `${tradeLabel} near ${cityLabel}`;

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
        max_tokens: 1024,
        system: `You are a local SEO competitor researcher for Headley Web & SEO, a web design studio in Jacksonville, Alabama.

Your job: find real competitors for a local service business so we can show them who's outranking them.

## Instructions
1. Use the web search tool to search for the business's competitors in their area.
2. Identify 3-5 real competing businesses from the search results.
3. For each competitor, note what they're doing well (better reviews, more content, faster site, better Google listing, etc.).

## Output format
Return ONLY a JSON array of objects with these fields:
- "name": Business name
- "url": Their website URL (must be a real URL from search results)
- "advantage": One sentence about what gives them a search advantage

No markdown, no explanation, no preamble. Just the JSON array.
Example: [{"name":"ABC Plumbing","url":"https://abcplumbing.com","advantage":"Strong Google reviews (4.8 stars, 200+ reviews) and fast-loading site"}]

If you can't find real competitors, return an empty array: []`,
        messages: [
          {
            role: "user",
            content: `Find the top competitors for this ${tradeLabel} website: ${url}\n\nSearch for: "${searchQuery}"\n\nI need real businesses that would be competing for the same local search terms.`,
          },
        ],
        tools: [
          {
            type: "web_search_20250305",
            name: "web_search",
            max_uses: 3,
            user_location: {
              type: "approximate",
              city: cityLabel !== "their area" ? cityLabel : "Jacksonville",
              region: "Alabama",
              country: "US",
              timezone: "America/Chicago",
            },
          },
        ],
      }),
      signal: AbortSignal.timeout(25000),
    });

    if (!response.ok) {
      console.error("Competitor research API error:", response.status);
      return NextResponse.json({ competitors: [] });
    }

    const data = await response.json();

    // Extract text content from the response (may have multiple content blocks)
    let text = "";
    for (const block of data.content ?? []) {
      if (block.type === "text") {
        text += block.text;
      }
    }

    // Parse JSON array from response
    let competitors: CompetitorResult[] = [];
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        competitors = parsed
          .filter(
            (c: Record<string, unknown>) =>
              typeof c.name === "string" &&
              typeof c.url === "string" &&
              typeof c.advantage === "string"
          )
          .slice(0, 5);
      }
    } catch {
      // Try extracting JSON array from mixed text
      const match = text.match(/\[[\s\S]*\]/);
      if (match) {
        try {
          const parsed = JSON.parse(match[0]);
          if (Array.isArray(parsed)) {
            competitors = parsed
              .filter(
                (c: Record<string, unknown>) =>
                  typeof c.name === "string" &&
                  typeof c.url === "string" &&
                  typeof c.advantage === "string"
              )
              .slice(0, 5);
          }
        } catch {
          // Give up
        }
      }
    }

    return NextResponse.json({
      competitors,
      usage: data.usage?.server_tool_use ?? null,
    });
  } catch (err) {
    console.error("Competitor research error:", err);
    return NextResponse.json({ competitors: [] });
  }
}
