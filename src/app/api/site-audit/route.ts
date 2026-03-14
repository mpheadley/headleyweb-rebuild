import { NextRequest, NextResponse } from "next/server";

export type AuditResult = {
  url: string;
  // Scores (0-100)
  performance: number;
  seo: number;
  accessibility: number;
  // Timing metrics
  fcp: number; // First Contentful Paint (seconds)
  lcp: number; // Largest Contentful Paint (seconds)
  cls: number; // Cumulative Layout Shift
  tbt: number; // Total Blocking Time (ms)
  // Boolean checks
  isHttps: boolean;
  hasMetaDescription: boolean;
  hasViewport: boolean;
  hasHreflang: boolean;
  isLinkCrawlable: boolean;
  // Detailed audits for internal view
  failedAudits: { id: string; title: string; description: string; score: number | null }[];
  passedAudits: { id: string; title: string }[];
};

export type AuditError = {
  error: string;
};

const PAGESPEED_API = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

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

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" } as AuditError, { status: 400 });
  }

  // Normalize URL
  let normalizedUrl = url.trim();
  if (!normalizedUrl.startsWith("http")) {
    normalizedUrl = `https://${normalizedUrl}`;
  }

  if (!isValidUrl(normalizedUrl)) {
    return NextResponse.json({ error: "Please enter a valid website URL" } as AuditError, { status: 400 });
  }

  try {
    const apiUrl = new URL(PAGESPEED_API);
    apiUrl.searchParams.set("url", normalizedUrl);
    apiUrl.searchParams.set("category", "performance");
    apiUrl.searchParams.append("category", "seo");
    apiUrl.searchParams.append("category", "accessibility");
    apiUrl.searchParams.set("strategy", "mobile");

    // Add API key if available
    const apiKey = process.env.PAGESPEED_API_KEY?.trim();
    if (apiKey) {
      apiUrl.searchParams.set("key", apiKey);
    }

    const response = await fetch(apiUrl.toString(), {
      signal: AbortSignal.timeout(45000),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("PageSpeed API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Could not analyze that URL. Make sure the site is publicly accessible." } as AuditError,
        { status: 502 }
      );
    }

    const data = await response.json();
    const categories = data.lighthouseResult?.categories ?? {};
    const audits = data.lighthouseResult?.audits ?? {};

    // Extract scores
    const performance = Math.round((categories.performance?.score ?? 0) * 100);
    const seo = Math.round((categories.seo?.score ?? 0) * 100);
    const accessibility = Math.round((categories.accessibility?.score ?? 0) * 100);

    // Extract timing metrics
    const fcp = parseFloat(((audits["first-contentful-paint"]?.numericValue ?? 0) / 1000).toFixed(1));
    const lcp = parseFloat(((audits["largest-contentful-paint"]?.numericValue ?? 0) / 1000).toFixed(1));
    const cls = parseFloat((audits["cumulative-layout-shift"]?.numericValue ?? 0).toFixed(3));
    const tbt = Math.round(audits["total-blocking-time"]?.numericValue ?? 0);

    // Boolean checks from SEO audits
    const isHttps = normalizedUrl.startsWith("https");
    const hasMetaDescription = audits["meta-description"]?.score === 1;
    const hasViewport = audits["viewport"]?.score === 1;
    const hasHreflang = audits["hreflang"]?.score === 1 || audits["hreflang"]?.score === null;
    const isLinkCrawlable = audits["link-text"]?.score === 1;

    // Collect failed audits for internal view (score < 1, excluding passed/not-applicable)
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

    // Sort failed audits by score ascending (worst first)
    failedAudits.sort((a, b) => (a.score ?? 0) - (b.score ?? 0));

    const result: AuditResult = {
      url: normalizedUrl,
      performance,
      seo,
      accessibility,
      fcp,
      lcp,
      cls,
      tbt,
      isHttps,
      hasMetaDescription,
      hasViewport,
      hasHreflang,
      isLinkCrawlable,
      failedAudits,
      passedAudits,
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
