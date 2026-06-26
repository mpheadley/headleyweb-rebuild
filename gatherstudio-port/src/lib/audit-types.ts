/* ── Shared types for site audit (used by API route + quiz page) ── */

export type StoryBrandItem = {
  id: string;
  label: string;
  section: string;
  autoScore: number | null; // 0-2, null = needs manual scoring
  signals: string[]; // what the auto-scorer detected
  passLabel: string; // plain-English label when passing (e.g. "Your headline speaks to a real problem")
  failLabel: string; // plain-English label when failing (e.g. "Visitors can't tell what you do in 5 seconds")
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
  performanceDesktop?: number;
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
  hasLocalBusinessSchema: boolean;
  // SEO checks (from HTML scrape)
  hasCanonical: boolean;
  hasOgTags: boolean;
  hasSitemap: boolean;
  hasRobotsTxt: boolean;
  h1Count: number;
  wordCount: number;
  imgTotal: number;
  imgWithoutAlt: number;
  // Detailed audits for internal view
  failedAudits: { id: string; title: string; description: string; score: number | null }[];
  passedAudits: { id: string; title: string }[];
  // StoryBrand copy analysis
  storyBrand: StoryBrandScore | null;
  // Mobile screenshot (base64 data URI from PageSpeed Insights)
  screenshot: string | null;
};

export type AuditError = {
  error: string;
};
