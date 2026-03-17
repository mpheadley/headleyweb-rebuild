"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Globe, Loader2, CheckCircle2, AlertTriangle, Search, Mail, Download } from "lucide-react";
import type { AuditResult } from "@/lib/audit-types";
import { roiEstimates, normalizeTier, tierPrices, type TradeEstimate } from "../data/roi-estimates";
import { tradeOptions } from "../data/quiz-questions";
import QuizScoreGauge from "../components/QuizScoreGauge";
import AuditCheck from "../components/AuditCheck";
import StoryBrandItemRow from "../components/StoryBrandItemRow";

/* ── StoryBrand Grade Helpers ── */
function getGradeColor(grade: string): string {
  if (grade === "A") return "text-green-600 bg-green-50 border-green-200";
  if (grade === "B") return "text-green-600 bg-green-50 border-green-200";
  if (grade === "C") return "text-yellow-700 bg-yellow-50 border-yellow-200";
  if (grade === "D") return "text-red-500 bg-red-50 border-red-200";
  return "text-red-600 bg-red-50 border-red-200";
}

function getGradeLabel(grade: string): string {
  if (grade === "A") return "StoryBrand-aligned — this site sells";
  if (grade === "B") return "Good foundation, needs tightening";
  if (grade === "C") return "Has pieces, but the message is muddled";
  if (grade === "D") return "Missing key messaging elements";
  return "No clear message — visitors won't know what to do";
}

/* ── Overall Grade Helpers ── */
function getLetterGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

/* ── StoryBrand Recommendations ── */
const storyBrandRecommendations: Record<string, string> = {
  "1.1": "Lead your headline with the customer's problem — not your company name",
  "1.2": "Make it clear what you do, who you help, and where — in the first sentence",
  "1.3": "Add a strong call-to-action button above the fold (\"Call Now\", \"Get a Free Quote\")",
  "1.5": "Rewrite your hero section to say \"you\" and \"your\" instead of \"we\" and \"our\"",
  "2.1": "Name the problem your customer is actually dealing with — don't assume they know",
  "2.2": "Speak to how the problem makes your customer feel (frustrated, overwhelmed, stuck)",
  "3.1": "Show empathy — let customers know you understand what they're going through",
  "3.2": "Add proof: testimonials, years of experience, or number of customers served",
  "4.1": "Add a simple 3-step plan so customers know exactly what to expect",
  "4.2": "Reduce risk with language like \"free estimate\", \"no obligation\", or \"satisfaction guaranteed\"",
  "5.1": "Repeat your main call-to-action throughout the page — not just at the top",
  "5.2": "Use action words in your buttons: \"Get\", \"Call\", \"Book\", \"Schedule\" — not \"Learn More\"",
  "6.1": "Show what's at stake — what happens if they don't fix this problem?",
  "6.2": "Paint the picture of success — what does life look like after they hire you?",
  "7.1": "Cut the jargon — write like you talk to a customer, not a conference room",
  "7.2": "Put your phone number where people can see it — header, hero, and footer",
};

export default function AuditPage() {
  const searchParams = useSearchParams();
  const internalKey = process.env.NEXT_PUBLIC_INTERNAL_KEY?.trim();
  const isInternal = internalKey ? searchParams.get("internal") === internalKey : false;

  const [siteUrl, setSiteUrl] = useState("");
  const [trade, setTrade] = useState<string>("");
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [auditError, setAuditError] = useState<string | null>(null);
  const [auditLoading, setAuditLoading] = useState(false);

  // Trade/ROI data
  const tradeData: TradeEstimate | null = trade ? roiEstimates[trade] ?? null : null;
  const recommendedTier = "Get Calls";
  const tierPrice = tierPrices[recommendedTier] ?? 795;

  // AI recommendations state
  const [aiRecs, setAiRecs] = useState<string[] | null>(null);
  const [aiRecsLoading, setAiRecsLoading] = useState(false);

  // Email state
  const [email, setEmail] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // Refs
  const resultsRef = useRef<HTMLDivElement>(null);

  // Checklist state for internal view
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Auto-scroll to results when they load
  useEffect(() => {
    if (auditResult && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [auditResult]);

  // Send audit data to Formspree for lead capture (fire-and-forget)
  useEffect(() => {
    if (!auditResult) return;
    const formData: Record<string, string | number> = {
      _subject: `Site Audit: ${auditResult.url}`,
      source: "audit-page",
      site_url: auditResult.url,
      trade: trade || "not selected",
      audit_performance: auditResult.performance,
      audit_seo: auditResult.seo,
      audit_accessibility: auditResult.accessibility,
      audit_lcp: `${auditResult.lcp}s`,
      audit_https: auditResult.isHttps ? "Yes" : "No",
      audit_meta_desc: auditResult.hasMetaDescription ? "Yes" : "No",
      audit_local_schema: auditResult.hasLocalBusinessSchema ? "Yes" : "No",
      audit_issues: auditResult.failedAudits.length,
    };
    if (auditResult.storyBrand) {
      formData.storybrand_grade = auditResult.storyBrand.grade;
      formData.storybrand_score = `${auditResult.storyBrand.autoTotal}/${auditResult.storyBrand.autoMax}`;
    }
    fetch("https://formspree.io/f/xyknwdgp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).catch(() => { /* silent — lead capture is best-effort */ });
  }, [auditResult, trade]);

  const handleChecklistToggle = useCallback((key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  async function handleRunAudit(e: React.FormEvent) {
    e.preventDefault();
    if (!siteUrl.trim()) return;

    setAuditLoading(true);
    setAuditError(null);
    setAuditResult(null);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);

    try {
      const res = await fetch("/api/site-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: siteUrl.trim() }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const data = await res.json();
      if (!res.ok) {
        setAuditError(data.error || "Could not analyze that URL.");
      } else {
        const result = data as AuditResult;
        setAuditResult(result);
        // Fetch AI recommendations in background (non-blocking)
        if (result.storyBrand) {
          setAiRecsLoading(true);
          fetch("/api/audit-recommendations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ auditResult: result, trade }),
          })
            .then(r => r.ok ? r.json() : null)
            .then(json => {
              if (json?.recommendations?.length > 0) setAiRecs(json.recommendations);
            })
            .catch(() => {})
            .finally(() => setAiRecsLoading(false));
        }
      }
    } catch (err) {
      clearTimeout(timeout);
      if (err instanceof DOMException && err.name === "AbortError") {
        setAuditError("The audit timed out. The site may be slow or unreachable — please try again.");
      } else {
        setAuditError("Something went wrong. Please try again.");
      }
    }
    setAuditLoading(false);
  }

  async function handleSendEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !auditResult) return;

    setEmailSending(true);
    setEmailError(false);
    try {
      const res = await fetch("/api/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          auditResult,
          tradeData,
          recommendedTier,
          tierPrice,
          recommendations,
        }),
      });
      if (res.ok) {
        setEmailSent(true);
        // Send lead data with email to Formspree (fire-and-forget)
        fetch("https://formspree.io/f/xyknwdgp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _subject: `Site Audit Lead: ${auditResult.url}`,
            source: "audit-page-email",
            email: email.trim(),
            site_url: auditResult.url,
            trade: trade || "not selected",
            audit_performance: auditResult.performance,
            audit_seo: auditResult.seo,
            audit_accessibility: auditResult.accessibility,
            storybrand_grade: auditResult.storyBrand?.grade ?? "N/A",
          }),
        }).catch(() => {});
      } else {
        setEmailError(true);
      }
    } catch {
      setEmailError(true);
    }
    setEmailSending(false);
  }

  async function handleDownloadPdf() {
    if (!auditResult) return;
    const { buildReportDoc } = await import("@/lib/generate-report-pdf");
    const doc = buildReportDoc({
      archetype: {
        name: "Site Audit",
        emoji: "\u{1F50D}",
        tagline: "Instant website analysis",
        description: `Automated audit of ${auditResult.url} covering speed, SEO, accessibility, and messaging.`,
        strength: "",
        risk: "",
        recommendation: "Review the results below and take action on the top recommendations.",
        tier: "",
      },
      auditResult,
      tradeData,
      recommendedTier,
      tierPrice,
      recommendations,
    });
    const hostname = new URL(auditResult.url).hostname;
    doc.save(`site-readiness-report-${hostname}.pdf`);
  }

  function handleReset() {
    setSiteUrl("");
    setTrade("");
    setAuditResult(null);
    setAuditError(null);
    setCheckedItems({});
    setEmail("");
    setEmailSent(false);
    setEmailError(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Compute recommendations — prefer AI recs, fall back to static
  const staticRecs = auditResult?.storyBrand?.items
    .filter(i => i.autoScore !== null && i.autoScore === 0 && storyBrandRecommendations[i.id])
    .slice(0, 3)
    .map(i => storyBrandRecommendations[i.id]) ?? [];
  const recommendations = aiRecs ?? staticRecs;

  // Compute overall grade for teaser
  const overallScore = (() => {
    if (!auditResult) return 0;
    const scores: number[] = [];
    if (auditResult.performance > 0) scores.push(auditResult.performance);
    if (auditResult.seo > 0) scores.push(auditResult.seo);
    if (auditResult.accessibility > 0) scores.push(auditResult.accessibility);
    const sbGradeMap: Record<string, number> = { A: 95, B: 82, C: 68, D: 55, F: 35 };
    if (auditResult.storyBrand) {
      scores.push(sbGradeMap[auditResult.storyBrand.grade] ?? 50);
    }
    return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  })();
  const overallGrade = getLetterGrade(overallScore);

  // Dynamic executive summary for teaser
  const executiveSummary = (() => {
    if (!auditResult) return "";
    const parts: string[] = [];
    if (auditResult.lcp > 4) {
      parts.push(`your site takes ${auditResult.lcp}s to load — most visitors leave after 3`);
    } else if (auditResult.lcp > 2.5) {
      parts.push(`your site is a bit slow at ${auditResult.lcp}s`);
    }
    if (auditResult.storyBrand && (auditResult.storyBrand.grade === "D" || auditResult.storyBrand.grade === "F")) {
      parts.push("your messaging isn\u2019t clear enough to convert visitors into customers");
    }
    if (auditResult.seo < 50) {
      parts.push("search engines are having trouble understanding your site");
    }
    if (!auditResult.hasLocalBusinessSchema) {
      parts.push("Google can\u2019t verify your business details for local search");
    }
    if (!auditResult.isHttps) {
      parts.push("your site isn\u2019t secure — browsers may warn visitors away");
    }
    if (parts.length === 0) {
      return "Your site is in solid shape. A few tweaks could make it even stronger \u2014 get the full report to see exactly where.";
    }
    return `Your website is your hardest-working employee \u2014 but right now, ${parts.slice(0, 2).join(" and ")}. Get the full report to see what I\u2019d fix first.`;
  })();

  return (
    <main id="main-content" className="min-h-screen bg-hw-light">
      {/* Header */}
      <section className="bg-hw-dark text-white pt-28 pb-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-3">
            Free Tool
          </p>
          <h1 className="text-3xl md:text-4xl font-bold !text-white mb-4">
            Free Site Audit
          </h1>
          <p className="text-gray-300">
            Paste your website URL and get an instant report — speed, SEO, mobile setup, and messaging analysis.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* URL Input */}
          <div className="card-glow !p-8 md:!p-10">
            <form onSubmit={handleRunAudit}>
              <label htmlFor="audit-url" className="block text-sm font-semibold text-hw-dark mb-2">
                Your Website URL
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hw-text-light" />
                  <input
                    id="audit-url"
                    type="text"
                    value={siteUrl}
                    onChange={(e) => setSiteUrl(e.target.value)}
                    placeholder="www.yourbusiness.com"
                    className="form-input w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white text-hw-text"
                    disabled={auditLoading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={auditLoading || !siteUrl.trim()}
                  className="btn-primary !py-3 !px-5 shrink-0 inline-flex items-center gap-2"
                >
                  {auditLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  {auditLoading ? "Analyzing..." : "Run Audit"}
                </button>
              </div>
              {/* Optional trade selector */}
              <div className="mt-4">
                <label htmlFor="audit-trade" className="block text-sm font-semibold text-hw-dark mb-2">
                  What type of business? <span className="text-hw-text-light font-normal">(optional — unlocks ROI estimates)</span>
                </label>
                <select
                  id="audit-trade"
                  value={trade}
                  onChange={(e) => setTrade(e.target.value)}
                  className="form-input w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-hw-text"
                  disabled={auditLoading}
                >
                  <option value="">Skip — just audit the site</option>
                  {tradeOptions.map((t) => (
                    <option key={t.key} value={t.key}>{t.label}</option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-hw-text-light mt-2">
                No signup required. Results appear in 20–30 seconds.
              </p>
            </form>
          </div>

          {/* Loading */}
          {auditLoading && (
            <div className="card-glow !p-8 md:!p-10 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-hw-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Analyzing your website...</h3>
              <p className="text-sm text-hw-text-light">
                We&apos;re checking speed, SEO, mobile setup, and messaging. This takes 20–30 seconds.
              </p>
            </div>
          )}

          {/* Error */}
          {auditError && (
            <div className="card-glow !p-6 bg-yellow-50 border-yellow-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-hw-text">{auditError}</p>
                  <p className="text-xs text-hw-text-light mt-1">Check the URL and try again.</p>
                </div>
              </div>
            </div>
          )}

          {/* ── Client-Facing Results (Teaser) ── */}
          {auditResult && !isInternal && (
            <div ref={resultsRef} className="card-glow !p-8 md:!p-10 scroll-mt-24">
              {/* Overall Grade */}
              <div className="text-center mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wide text-hw-text-light mb-3">
                  Your Overall Site Grade
                </h3>
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl border-2 ${getGradeColor(overallGrade)}`}>
                  <span className="text-5xl font-bold">{overallGrade}</span>
                </div>
                <p className="text-sm text-hw-text-light mt-2">
                  <span className="font-medium text-hw-text">{auditResult.url}</span>
                </p>
              </div>

              {/* Executive Summary */}
              <p className="text-sm text-hw-text text-center mb-8 max-w-lg mx-auto leading-relaxed">
                {executiveSummary}
              </p>

              {/* Score Gauges */}
              <div className="flex justify-center gap-4 md:gap-8 flex-wrap mb-2">
                <QuizScoreGauge score={auditResult.performance} label="Speed" />
                <QuizScoreGauge score={auditResult.seo} label="SEO" />
                <QuizScoreGauge score={auditResult.accessibility} label="Accessibility" />
              </div>
              <p className="text-xs text-hw-text-light text-center mb-8">
                <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> 90+ Good</span>
                <span className="mx-2">·</span>
                <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" /> 50–89 Fair</span>
                <span className="mx-2">·</span>
                <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Below 50 Poor</span>
              </p>

              {/* Mobile Screenshot */}
              {auditResult.screenshot && (
                <div className="flex justify-center mb-8">
                  <div className="relative w-48 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <Image
                      src={auditResult.screenshot}
                      alt={`Mobile screenshot of ${auditResult.url}`}
                      width={360}
                      height={640}
                      className="w-full h-auto"
                      unoptimized
                    />
                    <p className="text-[10px] text-hw-text-light text-center py-1 bg-gray-50">
                      How your site looks on mobile
                    </p>
                  </div>
                </div>
              )}

              {/* Email Gate */}
              <div className="border-t border-gray-100 pt-6">
                {emailSent ? (
                  <div role="status" aria-live="polite" className="text-center">
                    <p className="text-sm text-green-600 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Report sent to {email}
                    </p>
                    <p className="text-xs text-hw-text-light mt-2 mb-3">
                      Check your inbox — your full report is on the way.
                    </p>
                    <button
                      onClick={handleDownloadPdf}
                      className="btn-secondary !text-sm !py-2 !px-5 inline-flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-base font-semibold text-hw-text mb-1">Get Your Full Report</p>
                    <p className="text-xs text-hw-text-light mb-4">
                      Your detailed PDF includes speed analysis, messaging breakdown, and exactly what I&apos;d fix first — free, no strings.
                    </p>
                    <form onSubmit={handleSendEmail} className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                      <div className="relative w-full sm:w-auto">
                        <label htmlFor="audit-email" className="sr-only">Email address</label>
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hw-text-light" aria-hidden="true" />
                        <input
                          id="audit-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@email.com"
                          className="form-input pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-white text-hw-text text-sm w-full sm:w-64"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={emailSending}
                        className="btn-primary !text-sm !py-2.5 !px-6 inline-flex items-center gap-2 w-full sm:w-auto justify-center"
                      >
                        {emailSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                        {emailSending ? "Sending..." : "Send My Report"}
                      </button>
                    </form>
                    {emailError && (
                      <p className="text-xs text-red-500 text-center mt-2">
                        Something went wrong. Try again, or call (256) 644-7334 and I&apos;ll send it manually.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Phone CTA */}
              <div className="mt-6 text-center">
                <p className="text-sm text-hw-text-light mb-2">
                  Want to talk through your results?
                </p>
                <a href="tel:+12566447334" className="text-sm font-semibold text-hw-primary hover:text-hw-primary-dark transition-colors">
                  Call me — (256) 644-7334
                </a>
              </div>

              {/* Utility links */}
              <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={handleReset}
                  className="text-sm text-hw-text-light hover:text-hw-text transition-colors underline"
                >
                  Audit another site
                </button>
                <Link href="/quiz" className="text-sm text-hw-primary hover:text-hw-primary-dark transition-colors underline">
                  Take the full quiz
                </Link>
              </div>
            </div>
          )}

          {/* ── ROI Estimate (Internal only — client sees this in PDF) ── */}
          {auditResult && isInternal && tradeData && (
            <div className="card-glow !p-8 md:!p-10">
              <h3 className="text-lg font-bold mb-1">
                What a Weak Online Presence Could Mean
              </h3>
              <p className="text-sm text-hw-text-light mb-6">
                Estimates based on industry averages for {tradeData.label.toLowerCase()} businesses in Northeast Alabama
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-hw-dark">${tradeData.avgJobValue}</p>
                  <p className="text-xs text-hw-text-light mt-1">Average Job Value</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-hw-dark">{tradeData.estimatedMissedLeads[0]}-{tradeData.estimatedMissedLeads[1]}</p>
                  <p className="text-xs text-hw-text-light mt-1">Leads That May Go Elsewhere</p>
                </div>
                <div className="bg-red-50 border border-red-200/40 rounded-xl p-4 text-center col-span-2 md:col-span-1">
                  <p className="text-2xl font-bold text-red-600">${tradeData.estimatedMonthlyLoss[0].toLocaleString()}-${tradeData.estimatedMonthlyLoss[1].toLocaleString()}</p>
                  <p className="text-xs text-hw-text-light mt-1">Potential Missed Revenue</p>
                </div>
              </div>

              <div className="bg-hw-secondary/5 border border-hw-secondary/15 rounded-xl p-5 text-center">
                <p className="text-hw-text">
                  A <span className="font-semibold text-hw-primary">{recommendedTier}</span> package (${tierPrice}) typically pays for itself within{" "}
                  <span className="font-bold text-hw-dark">
                    {tradeData.paybackJobs[recommendedTier] ?? 4} job{(tradeData.paybackJobs[recommendedTier] ?? 4) !== 1 ? "s" : ""}
                  </span>.
                </p>
              </div>
              <p className="text-xs text-hw-text-light text-center mt-3">
                Your results may vary — these numbers reflect typical businesses in our area.
              </p>
            </div>
          )}

          {/* ── Internal View ── */}
          {auditResult && isInternal && (
            <div ref={resultsRef} className="card-glow !p-8 md:!p-10 scroll-mt-24">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold">
                  Site Audit — Internal View
                </h3>
                <span className="text-xs bg-hw-primary/10 text-hw-primary px-2 py-1 rounded font-mono">
                  INTERNAL
                </span>
              </div>
              <p className="text-sm text-hw-text-light mb-6 font-mono">
                {auditResult.url}
              </p>

              {/* Score Gauges */}
              <div className="flex justify-center gap-4 md:gap-8 flex-wrap mb-6">
                <QuizScoreGauge score={auditResult.performance} label="Performance" />
                <QuizScoreGauge score={auditResult.seo} label="SEO" />
                <QuizScoreGauge score={auditResult.accessibility} label="Accessibility" />
              </div>

              {/* Core Web Vitals */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
                <p className="text-sm font-bold uppercase tracking-wide text-hw-text-light mb-3">
                  Core Web Vitals (Mobile)
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className={`text-xl font-mono font-bold ${auditResult.fcp <= 1.8 ? "text-green-600" : auditResult.fcp <= 3 ? "text-yellow-500" : "text-red-500"}`}>
                      {auditResult.fcp}s
                    </p>
                    <p className="text-xs text-hw-text-light">FCP</p>
                  </div>
                  <div>
                    <p className={`text-xl font-mono font-bold ${auditResult.lcp <= 2.5 ? "text-green-600" : auditResult.lcp <= 4 ? "text-yellow-500" : "text-red-500"}`}>
                      {auditResult.lcp}s
                    </p>
                    <p className="text-xs text-hw-text-light">LCP</p>
                  </div>
                  <div>
                    <p className={`text-xl font-mono font-bold ${auditResult.cls <= 0.1 ? "text-green-600" : auditResult.cls <= 0.25 ? "text-yellow-500" : "text-red-500"}`}>
                      {auditResult.cls}
                    </p>
                    <p className="text-xs text-hw-text-light">CLS</p>
                  </div>
                  <div>
                    <p className={`text-xl font-mono font-bold ${auditResult.tbt <= 200 ? "text-green-600" : auditResult.tbt <= 600 ? "text-yellow-500" : "text-red-500"}`}>
                      {auditResult.tbt}ms
                    </p>
                    <p className="text-xs text-hw-text-light">TBT</p>
                  </div>
                </div>
              </div>

              {/* Boolean Checks */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <AuditCheck passed={auditResult.isHttps} label="HTTPS" />
                <AuditCheck passed={auditResult.hasMetaDescription} label="Meta description" />
                <AuditCheck passed={auditResult.hasViewport} label="Viewport meta tag" />
                <AuditCheck passed={auditResult.isLinkCrawlable} label="Crawlable link text" />
                <AuditCheck passed={auditResult.hasLocalBusinessSchema} label="LocalBusiness schema" />
              </div>

              {/* Failed Audits */}
              {auditResult.failedAudits.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-bold uppercase tracking-wide text-red-500 mb-3">
                    Failed Audits ({auditResult.failedAudits.length})
                  </p>
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {auditResult.failedAudits.map((audit) => (
                      <div key={audit.id} className="bg-red-50 border border-red-200/40 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-hw-text">{audit.title}</p>
                          {audit.score !== null && (
                            <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                              audit.score === 0 ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"
                            }`}>
                              {Math.round(audit.score * 100)}
                            </span>
                          )}
                        </div>
                        {audit.description && (
                          <p className="text-xs text-hw-text-light mt-1">{audit.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Passed Audits */}
              {auditResult.passedAudits.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-bold uppercase tracking-wide text-green-600 mb-3">
                    Passed Audits ({auditResult.passedAudits.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {auditResult.passedAudits.map((audit) => (
                      <span key={audit.id} className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded">
                        {audit.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* StoryBrand Analysis (Internal) */}
              {auditResult.storyBrand && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-bold uppercase tracking-wide text-hw-text-light">
                      StoryBrand Copy Analysis
                    </p>
                    <span className={`text-lg font-bold px-3 py-1 rounded border ${getGradeColor(auditResult.storyBrand.grade)}`}>
                      {auditResult.storyBrand.grade} — {auditResult.storyBrand.autoTotal}/{auditResult.storyBrand.autoMax} auto-scored
                    </span>
                  </div>

                  {/* Extracted Copy */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-blue-600 mb-2">
                      Extracted Copy (review this)
                    </p>
                    {auditResult.storyBrand.extractedCopy.heroHeadline && (
                      <div className="mb-2">
                        <p className="text-xs text-blue-500">Hero Headline:</p>
                        <p className="text-sm font-medium text-hw-text">&ldquo;{auditResult.storyBrand.extractedCopy.heroHeadline}&rdquo;</p>
                      </div>
                    )}
                    {auditResult.storyBrand.extractedCopy.heroSubheadline && (
                      <div className="mb-2">
                        <p className="text-xs text-blue-500">Sub-headline:</p>
                        <p className="text-sm text-hw-text">&ldquo;{auditResult.storyBrand.extractedCopy.heroSubheadline}&rdquo;</p>
                      </div>
                    )}
                    <div className="mb-2">
                      <p className="text-xs text-blue-500">
                        Pronoun Balance: {auditResult.storyBrand.extractedCopy.secondPersonCount} &ldquo;you/your&rdquo; vs {auditResult.storyBrand.extractedCopy.firstPersonCount} &ldquo;we/our&rdquo;
                      </p>
                    </div>
                    {auditResult.storyBrand.extractedCopy.ctaTexts.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs text-blue-500">CTAs Found:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {auditResult.storyBrand.extractedCopy.ctaTexts.slice(0, 8).map((cta, i) => (
                            <span key={i} className="text-xs bg-white border border-blue-200 px-2 py-0.5 rounded">{cta}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Scoring Items by Section */}
                  {["Hero", "Problem", "Guide", "Plan", "Call to Action", "Stakes", "Messaging"].map((section) => {
                    const sectionItems = auditResult.storyBrand!.items.filter(i => i.section === section);
                    if (sectionItems.length === 0) return null;
                    return (
                      <div key={section} className="mb-3">
                        <p className="text-xs font-bold uppercase tracking-wide text-hw-text-light mb-2">{section}</p>
                        <div className="space-y-2">
                          {sectionItems.map(item => (
                            <StoryBrandItemRow key={item.id} item={item} />
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* Recommendations (AI-powered when available) */}
                  {(recommendations.length > 0 || aiRecsLoading) && (
                    <div className="mt-4 bg-hw-secondary/5 border border-hw-secondary/15 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <p className="text-sm font-bold text-hw-secondary uppercase tracking-wide">
                          What I&apos;d Fix First
                        </p>
                        {aiRecs && (
                          <span className="text-[10px] bg-hw-secondary/10 text-hw-secondary px-1.5 py-0.5 rounded font-medium">
                            AI
                          </span>
                        )}
                        {aiRecsLoading && (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-hw-secondary" />
                        )}
                      </div>
                      <ul className="space-y-2">
                        {recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-hw-text">
                            <ArrowRight className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Manual Checklist (Internal) */}
              {isInternal && (
                <div className="mb-6">
                  <p className="text-sm font-bold uppercase tracking-wide text-hw-text-light mb-3">
                    Quick Manual Checks
                  </p>
                  {[
                    { section: "Google Business Profile", items: ["GBP claimed and verified", "Correct hours, address, phone", "At least 5 reviews", "Posts in last 30 days"] },
                    { section: "Online Presence", items: ["Shows in Google Maps for main keyword", "NAP consistent across directories", "Facebook page exists and active"] },
                    { section: "Conversion", items: ["Phone number clickable on mobile", "Contact form works", "Social proof near CTA"] },
                  ].map((group) => (
                    <div key={group.section} className="mb-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-hw-primary mb-2">{group.section}</p>
                      <div className="space-y-1">
                        {group.items.map((item, i) => {
                          const key = `${group.section}-${i}`;
                          return (
                            <label key={key} className="flex items-start gap-2 text-sm text-hw-text cursor-pointer hover:bg-gray-50 p-1 rounded">
                              <input
                                type="checkbox"
                                className="mt-1 accent-hw-primary"
                                checked={!!checkedItems[key]}
                                onChange={() => handleChecklistToggle(key)}
                              />
                              <span className={checkedItems[key] ? "line-through text-hw-text-light" : ""}>{item}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Copy-Paste Summary (Internal) */}
              {isInternal && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <p className="text-sm font-bold uppercase tracking-wide text-hw-text-light mb-2">
                    Quick Summary (copy-paste ready)
                  </p>
                  <pre className="text-xs text-hw-text font-mono whitespace-pre-wrap bg-white border border-gray-100 rounded-lg p-3 overflow-x-auto">
{`Site: ${auditResult.url}
Performance: ${auditResult.performance}/100 | SEO: ${auditResult.seo}/100 | Accessibility: ${auditResult.accessibility}/100
FCP: ${auditResult.fcp}s | LCP: ${auditResult.lcp}s | CLS: ${auditResult.cls} | TBT: ${auditResult.tbt}ms
HTTPS: ${auditResult.isHttps ? "Yes" : "No"} | Meta Desc: ${auditResult.hasMetaDescription ? "Yes" : "No"} | Viewport: ${auditResult.hasViewport ? "Yes" : "No"} | LocalBusiness Schema: ${auditResult.hasLocalBusinessSchema ? "Yes" : "No"}
Issues Found: ${auditResult.failedAudits.length} | Passing: ${auditResult.passedAudits.length}${auditResult.storyBrand ? `\nStoryBrand Grade: ${auditResult.storyBrand.grade} (${auditResult.storyBrand.autoTotal}/${auditResult.storyBrand.autoMax} auto-scored)` : ""}`}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* ── Bottom CTAs (Internal only — client teaser has its own email gate) ── */}
          {auditResult && isInternal && (
            <div className="card-glow !p-8 md:!p-10">
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                <a href="tel:+12566447334" className="btn-primary text-center">
                  Call Me — (256) 644-7334
                </a>
                <Link href="/contact" className="btn-secondary text-center">
                  Send Me a Message
                </Link>
              </div>

              {/* Email report (for testing) */}
              <div className="border-t border-gray-100 pt-6">
                {emailSent ? (
                  <div role="status" aria-live="polite" className="text-center">
                    <p className="text-sm text-green-600 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Report sent to {email}
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm font-semibold text-hw-text mb-1">Email PDF Report</p>
                    <form onSubmit={handleSendEmail} className="flex flex-col sm:flex-row gap-2 justify-center items-center mt-3">
                      <div className="relative w-full sm:w-auto">
                        <label htmlFor="audit-email" className="sr-only">Email address</label>
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hw-text-light" aria-hidden="true" />
                        <input
                          id="audit-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@email.com"
                          className="form-input pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-white text-hw-text text-sm w-full sm:w-64"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={emailSending}
                        className="btn-primary !text-sm !py-2.5 !px-6 inline-flex items-center gap-2 w-full sm:w-auto justify-center"
                      >
                        {emailSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                        {emailSending ? "Sending..." : "Send Report"}
                      </button>
                    </form>
                    {emailError && (
                      <p className="text-xs text-red-500 text-center mt-2">
                        Something went wrong.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={handleReset}
                  className="text-sm text-hw-text-light hover:text-hw-text transition-colors underline"
                >
                  Audit another site
                </button>
                <Link href="/quiz" className="text-sm text-hw-primary hover:text-hw-primary-dark transition-colors underline">
                  Take the full quiz
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
