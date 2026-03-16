import { NextRequest, NextResponse } from "next/server";
import type { AuditResult, AuditError, StoryBrandScore } from "@/lib/audit-types";
import { extractTextFromHtml, scoreStoryBrand } from "@/lib/storybrand-scorer";

/* ── Constants ── */

const PAGESPEED_API = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

/* ── Rate Limiting ── */

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute per IP

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

/* ── URL Validation (SSRF-hardened) ── */

function isValidUrl(str: string): boolean {
  try {
    const url = new URL(str);
    if (!["http:", "https:"].includes(url.protocol)) return false;

    const hostname = url.hostname;

    // Block localhost variants
    if (["localhost", "127.0.0.1", "0.0.0.0"].includes(hostname)) return false;
    if (hostname === "[::1]") return false;
    if (hostname.endsWith(".local")) return false;

    // Block private/reserved IP ranges
    const parts = hostname.split(".").map(Number);
    if (parts.length === 4 && parts.every((p) => !isNaN(p))) {
      if (parts[0] === 10) return false; // 10.0.0.0/8
      if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return false; // 172.16.0.0/12
      if (parts[0] === 192 && parts[1] === 168) return false; // 192.168.0.0/16
      if (parts[0] === 169 && parts[1] === 254) return false; // link-local / cloud metadata
      if (parts[0] === 127) return false; // 127.0.0.0/8
      if (parts[0] === 0) return false; // 0.0.0.0/8
    }

    // Block all bracket-notation IPv6 (prevents ::1, fe80::, etc.)
    if (hostname.startsWith("[")) return false;

    return true;
  } catch {
    return false;
  }
}

/* ── Main Handler ── */

export async function POST(request: NextRequest) {
  // Rate limit by IP
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again." } as AuditError,
      { status: 429 }
    );
  }

  let body: { url?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" } as AuditError, { status: 400 });
  }

  const url = body.url;
  if (!url) {
    return NextResponse.json({ error: "URL is required" } as AuditError, { status: 400 });
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
    let hasLocalBusinessSchema = false;
    if (copyResult.status === "fulfilled" && copyResult.value) {
      storyBrand = scoreStoryBrand(copyResult.value);
      hasLocalBusinessSchema = copyResult.value.hasLocalBusinessSchema;
    }

    const result: AuditResult = {
      url: normalizedUrl,
      ...lighthouse,
      hasLocalBusinessSchema,
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
    isHttps, hasMetaDescription, hasViewport, hasHreflang, isLinkCrawlable, hasLocalBusinessSchema: false,
    failedAudits, passedAudits,
  };
}

function getDefaultLighthouse() {
  return {
    performance: 0, seo: 0, accessibility: 0,
    fcp: 0, lcp: 0, cls: 0, tbt: 0,
    isHttps: false, hasMetaDescription: false, hasViewport: false, hasHreflang: false, isLinkCrawlable: false, hasLocalBusinessSchema: false,
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
