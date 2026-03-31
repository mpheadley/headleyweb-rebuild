"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowRight, ArrowLeft, Mail, RotateCcw, Globe, Loader2, CheckCircle2, XCircle, AlertTriangle, Download } from "lucide-react";
import { roiEstimates, normalizeTier, tierPrices, type TradeEstimate } from "../data/roi-estimates";
import type { AuditResult } from "@/lib/audit-types";
import { questions, tradeOptions, getArchetype, manualChecklist } from "../data/quiz-questions";
import QuizScoreGauge from "../components/QuizScoreGauge";
import AuditCheck from "../components/AuditCheck";
import StoryBrandItemRow from "../components/StoryBrandItemRow";
import QuizReportPdf from "../components/QuizReportPdf";

/* ── Plain-English Metric Labels ── */
function getSpeedLabel(lcp: number): string {
  if (lcp <= 2.5) return "Your site loads fast. Visitors won't wait around.";
  if (lcp <= 4) return "Your site is a bit slow. Some visitors are leaving before it loads.";
  return "Your site is slow. Most visitors leave before they ever see your content.";
}

function getScoreLabel(score: number, category: string): string {
  if (score >= 90) return `Your ${category} is in great shape`;
  if (score >= 50) return `Your ${category} needs some work`;
  return `Your ${category} needs serious attention`;
}

/* ── StoryBrand Grade Helpers ── */
function getGradeColor(grade: string): string {
  if (grade === "A") return "text-green-600 bg-green-50 border-green-200";
  if (grade === "B") return "text-green-600 bg-green-50 border-green-200";
  if (grade === "C") return "text-yellow-500 bg-yellow-50 border-yellow-200";
  if (grade === "D") return "text-red-500 bg-red-50 border-red-200";
  return "text-red-600 bg-red-50 border-red-200";
}

function getGradeLabel(grade: string): string {
  if (grade === "A") return "Clear and compelling. This site sells.";
  if (grade === "B") return "Good foundation, needs tightening";
  if (grade === "C") return "Has pieces, but the message is muddled";
  if (grade === "D") return "Missing key messaging elements";
  return "No clear message. Visitors won't know what to do.";
}

function getLetterGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

/* ── StoryBrand Recommendations (client-facing) ── */
const storyBrandRecommendations: Record<string, string> = {
  "1.1": "Lead your headline with the customer's problem, not your company name",
  "1.2": "Make it clear what you do, who you help, and where, all in the first sentence",
  "1.3": "Add a strong call-to-action button above the fold (\"Call Now\", \"Get a Free Quote\")",
  "1.5": "Rewrite your hero section to say \"you\" and \"your\" instead of \"we\" and \"our\"",
  "2.1": "Name the problem your customer is actually dealing with. Don't assume they know.",
  "2.2": "Speak to how the problem makes your customer feel (frustrated, overwhelmed, stuck)",
  "3.1": "Show empathy. Let customers know you understand what they're going through.",
  "3.2": "Add proof: testimonials, years of experience, or number of customers served",
  "4.1": "Add a simple 3-step plan so customers know exactly what to expect",
  "4.2": "Reduce risk with language like \"free estimate\", \"no obligation\", or \"satisfaction guaranteed\"",
  "5.1": "Repeat your main call-to-action throughout the page, not just at the top",
  "5.2": "Use action words in your buttons: \"Get\", \"Call\", \"Book\", \"Schedule\", not \"Learn More\"",
  "6.1": "Show what's at stake. What happens if they don't fix this problem?",
  "6.2": "Paint the picture of success. What does life look like after they hire you?",
  "7.1": "Cut the jargon. Write like you talk to a customer, not a conference room.",
  "7.2": "Put your phone number where people can see it: header, hero, and footer",
};

export default function QuizPage() {
  const searchParams = useSearchParams();
  const internalKey = process.env.NEXT_PUBLIC_INTERNAL_KEY?.trim();
  const isInternal = internalKey ? searchParams.get("internal") === internalKey : false;

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formspreeError, setFormspreeError] = useState(false);
  const [newsletterOptin, setNewsletterOptin] = useState(false);

  // New state for trade, URL audit, and ROI
  const [trade, setTrade] = useState<string | null>(null);
  const [showTradeSelect, setShowTradeSelect] = useState(false);
  const [siteUrl, setSiteUrl] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [auditError, setAuditError] = useState<string | null>(null);
  const [auditLoading, setAuditLoading] = useState(false);

  // AI recommendations state
  const [aiRecs, setAiRecs] = useState<string[] | null>(null);
  const [aiRecsLoading, setAiRecsLoading] = useState(false);

  // PDF email state
  const [reportSending, setReportSending] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const [reportError, setReportError] = useState(false);

  // Ref for scrolling to audit results
  const auditResultsRef = useRef<HTMLDivElement>(null);

  // Checklist state keyed by URL for LocalStorage persistence
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [checklistLoaded, setChecklistLoaded] = useState<string | null>(null);

  // Build a stable storage key from the audit URL
  const checklistStorageKey = auditResult?.url
    ? `hw-checklist-${auditResult.url}`
    : null;

  // Load checklist from LocalStorage when audit result arrives
  useEffect(() => {
    if (!checklistStorageKey || checklistLoaded === checklistStorageKey) return;
    try {
      const saved = localStorage.getItem(checklistStorageKey);
      if (saved) setCheckedItems(JSON.parse(saved));
    } catch {
      // Ignore parse errors
    }
    setChecklistLoaded(checklistStorageKey);
  }, [checklistStorageKey, checklistLoaded]);

  // Auto-scroll to audit results when they arrive
  useEffect(() => {
    if (auditResult && auditResultsRef.current) {
      auditResultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [auditResult]);

  // Save checklist to LocalStorage on change
  const handleChecklistToggle = useCallback((key: string) => {
    setCheckedItems((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (checklistStorageKey) {
        try { localStorage.setItem(checklistStorageKey, JSON.stringify(next)); } catch { /* quota */ }
      }
      return next;
    });
  }, [checklistStorageKey]);

  // Total steps: 8 questions + trade select = 9 steps before result
  const totalSteps = questions.length + 1;
  const currentStep = showTradeSelect
    ? questions.length
    : currentQ;
  const progress = ((currentStep + (showResult ? 1 : 0)) / totalSteps) * 100;

  function handleSelect(value: number, index: number) {
    setSelected(index);
    setTimeout(() => {
      const newAnswers = [...answers, value];
      setAnswers(newAnswers);
      setSelected(null);

      if (currentQ + 1 < questions.length) {
        setCurrentQ(currentQ + 1);
      } else {
        // Show trade selection instead of going straight to results
        setShowTradeSelect(true);
      }
    }, 300);
  }

  function handleTradeSelect(tradeKey: string) {
    setTrade(tradeKey);
    // Brief delay so user sees the selection
    setTimeout(() => {
      setShowTradeSelect(false);
      setShowUrlInput(true);
    }, 300);
  }

  function handleSkipTrade() {
    setShowTradeSelect(false);
    setShowUrlInput(true);
  }

  async function handleRunAudit() {
    if (!siteUrl.trim()) {
      setShowUrlInput(false);
      setShowResult(true);
      return;
    }
    // Transition to results immediately — audit loads in the background
    setAuditLoading(true);
    setAuditError(null);
    setShowUrlInput(false);
    setShowResult(true);
    try {
      const res = await fetch("/api/site-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: siteUrl.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuditError(data.error || "Could not analyze that URL.");
      } else {
        const result = data as AuditResult;
        setAuditResult(result);
        // Fetch AI recommendations in background
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
      if (err instanceof TypeError && err.message.includes("fetch")) {
        setAuditError("Couldn't reach our server. Check your internet connection and try again.");
      } else {
        setAuditError("Something went wrong analyzing that site. Please try again.");
      }
    }
    setAuditLoading(false);
  }

  function handleSkipUrl() {
    setShowUrlInput(false);
    setShowResult(true);
  }

  function handleBack() {
    if (showUrlInput) {
      setShowUrlInput(false);
      setShowTradeSelect(true);
      return;
    }
    if (showTradeSelect) {
      setShowTradeSelect(false);
      setTrade(null);
      setCurrentQ(questions.length - 1);
      setAnswers(answers.slice(0, -1));
      return;
    }
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setAnswers(answers.slice(0, -1));
    }
  }

  function handleRestart() {
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setShowResult(false);
    setShowTradeSelect(false);
    setShowUrlInput(false);
    setEmail("");
    setEmailSubmitted(false);
    setTrade(null);
    setSiteUrl("");
    setAuditResult(null);
    setAuditError(null);
    setCheckedItems({});
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFormspreeError(false);
    try {
      // Flat key-value pairs (no nesting — Formspree renders nested objects as [object Object])
      const formData: Record<string, string | number | boolean> = {
        email,
        quiz_result: result?.name ?? "",
        quiz_score: totalScore,
        recommended_tier: recommendedTier,
        trade: trade || "not selected",
        site_url: siteUrl || "not provided",
        _subject: `Quiz Result: ${result?.name}${auditResult ? ` | Site: ${auditResult.url}` : ""}`,
      };
      if (newsletterOptin) formData.newsletter = true;

      // Audit data (flat keys)
      if (auditResult) {
        formData.audit_performance = auditResult.performance;
        formData.audit_seo = auditResult.seo;
        formData.audit_accessibility = auditResult.accessibility;
        formData.audit_lcp = `${auditResult.lcp}s`;
        formData.audit_fcp = `${auditResult.fcp}s`;
        formData.audit_cls = auditResult.cls;
        formData.audit_tbt = `${auditResult.tbt}ms`;
        formData.audit_https = auditResult.isHttps ? "Yes" : "No";
        formData.audit_meta_desc = auditResult.hasMetaDescription ? "Yes" : "No";
        formData.audit_local_schema = auditResult.hasLocalBusinessSchema ? "Yes" : "No";
        formData.audit_issues = auditResult.failedAudits.length;
      }

      // StoryBrand data (flat keys)
      if (auditResult?.storyBrand) {
        const sb = auditResult.storyBrand;
        formData.storybrand_grade = sb.grade;
        formData.storybrand_score = `${sb.autoTotal}/${sb.autoMax}`;
        formData.storybrand_hero = sb.extractedCopy.heroHeadline || "(none)";
        formData.storybrand_pronouns = `${sb.extractedCopy.secondPersonCount} you/your vs ${sb.extractedCopy.firstPersonCount} we/our`;
        formData.storybrand_top_issues = sb.items
          .filter(i => i.autoScore !== null && i.autoScore < 2)
          .slice(0, 5)
          .map(i => `${i.id} ${i.label}: ${i.autoScore}/2`)
          .join("; ");
      }

      // ROI data (flat keys)
      if (tradeData) {
        formData.roi_trade = tradeData.label;
        formData.roi_avg_job = `$${tradeData.avgJobValue}`;
        formData.roi_monthly_loss = `$${tradeData.estimatedMonthlyLoss[0].toLocaleString()}-$${tradeData.estimatedMonthlyLoss[1].toLocaleString()}`;
        formData.roi_payback_jobs = tradeData.paybackJobs[recommendedTier] ?? "N/A";
        formData.roi_tier_price = `$${tierPrice}`;
      }

      const res = await fetch("https://formspree.io/f/xyknwdgp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) setFormspreeError(true);
    } catch {
      setFormspreeError(true);
    }
    setSubmitting(false);
    setEmailSubmitted(true);
  }

  const totalScore = answers.reduce((sum, v) => sum + v, 0);
  const result = showResult ? getArchetype(totalScore) : null;
  const tradeData: TradeEstimate | null = trade ? roiEstimates[trade] ?? null : null;
  const recommendedTier = result ? normalizeTier(result.tier) : "Get Calls";
  const tierPrice = tierPrices[recommendedTier] ?? 795;

  // Overall grade for audit teaser
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

  const executiveSummary = (() => {
    if (!auditResult) return "";
    const parts: string[] = [];
    if (auditResult.lcp > 4) {
      parts.push(`your site takes ${auditResult.lcp}s to load \u2014 most visitors leave after 3`);
    } else if (auditResult.lcp > 2.5) {
      parts.push(`your site is a bit slow at ${auditResult.lcp}s`);
    }
    if (auditResult.storyBrand && (auditResult.storyBrand.grade === "D" || auditResult.storyBrand.grade === "F")) {
      parts.push("your messaging isn\u2019t clear enough to convert visitors into customers");
    }
    if (auditResult.seo < 50) {
      parts.push("search engines are having trouble understanding your site");
    }
    if (parts.length === 0) {
      return "Your site is in solid shape. Get the full report to see exactly where you can improve.";
    }
    return `Right now, ${parts.slice(0, 2).join(" and ")}. Get the full report for the complete breakdown.`;
  })();

  const staticRecs = auditResult?.storyBrand?.items
    .filter(i => i.autoScore !== null && i.autoScore === 0 && storyBrandRecommendations[i.id])
    .slice(0, 3)
    .map(i => storyBrandRecommendations[i.id]) ?? [];
  const recommendations = aiRecs ?? staticRecs;

  async function handleSendReport() {
    if (!email.trim() || !auditResult) return;
    setReportSending(true);
    setReportError(false);
    try {
      const res = await fetch("/api/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          auditResult,
          archetype: result,
          tradeData,
          recommendedTier,
          tierPrice,
          recommendations,
        }),
      });
      if (res.ok) {
        setReportSent(true);
      } else {
        setReportError(true);
      }
    } catch {
      setReportError(true);
    }
    setReportSending(false);
  }

  async function handleDownloadPdf() {
    if (!auditResult || !result) return;
    const { buildReportDoc } = await import("@/lib/generate-report-pdf");
    const doc = buildReportDoc({
      archetype: result,
      auditResult,
      tradeData,
      recommendedTier,
      tierPrice,
      recommendations,
    });
    const hostname = new URL(auditResult.url).hostname;
    doc.save(`site-readiness-report-${hostname}.pdf`);
  }

  return (
    <main id="main-content" className="min-h-screen bg-hw-light">
      {/* Header */}
      <section className="bg-hw-dark text-white pt-28 pb-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-3">
            Free Quiz
          </p>
          <h1 className="text-3xl md:text-4xl font-bold !text-white mb-4">
            What&apos;s Your Business&apos;s Online Personality?
          </h1>
          <p className="text-gray-300 mb-8">
            A few quick questions. 60 seconds. Find out where you stand and what to do next.
          </p>
          <Image
            src="/images/quiz-website-checkup-1200-630.webp"
            alt="Before and after illustration: a frustrated business owner with a failing website report card transforms into a happy owner with top scores in speed, SEO, and user experience"
            width={1200}
            height={630}
            sizes="(min-width: 768px) 640px, 100vw"
            className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
            priority
          />
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-gray-200 h-1.5">
        <div
          className="bg-hw-primary h-1.5 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Quiz Body */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">

          {/* ── Scored Questions ── */}
          {!showTradeSelect && !showUrlInput && !showResult && (
            <div className="card-glow !p-8 md:!p-10">
              <p className="text-sm text-hw-text-light mb-2">
                Question {currentQ + 1} of {questions.length}
              </p>
              <h2 className="text-xl md:text-2xl font-bold mb-8">
                {questions[currentQ].question}
              </h2>
              <div className="space-y-3">
                {questions[currentQ].answers.map((a, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(a.value, i)}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 font-medium ${
                      selected === i
                        ? "border-hw-primary bg-hw-primary/10 text-hw-dark"
                        : "border-gray-200 hover:border-hw-primary/40 hover:bg-hw-primary/5 text-hw-text"
                    }`}
                  >
                    {a.text}
                  </button>
                ))}
              </div>
              {currentQ > 0 && (
                <button
                  onClick={handleBack}
                  className="mt-6 text-sm text-hw-text-light hover:text-hw-text flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              )}
            </div>
          )}

          {/* ── Trade Selection ── */}
          {showTradeSelect && (
            <div className="card-glow !p-8 md:!p-10">
              <p className="text-sm text-hw-text-light mb-2">
                Almost done!
              </p>
              <h2 className="text-xl md:text-2xl font-bold mb-3">
                What kind of business do you run?
              </h2>
              <p className="text-hw-text-light text-sm mb-6">
                This helps us estimate what a weak online presence might be costing you.
              </p>
              <div className="space-y-3">
                {tradeOptions.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => handleTradeSelect(t.key)}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 font-medium ${
                      trade === t.key
                        ? "border-hw-primary bg-hw-primary/10 text-hw-dark"
                        : "border-gray-200 hover:border-hw-primary/40 hover:bg-hw-primary/5 text-hw-text"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={handleBack}
                  className="text-sm text-hw-text-light hover:text-hw-text flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={handleSkipTrade}
                  className="text-sm text-hw-text-light hover:text-hw-text transition-colors underline"
                >
                  Skip this step
                </button>
              </div>
            </div>
          )}

          {/* ── URL Input ── */}
          {showUrlInput && !showResult && (
            <div className="card-glow !p-8 md:!p-10 text-center">
              <Globe className="w-10 h-10 text-hw-primary mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Got a website?
              </h2>
              <p className="text-hw-text-light mb-6 max-w-md mx-auto">
                Paste your URL and I&apos;ll run a quick checkup (speed, SEO, mobile-friendliness) so you can see exactly where you stand.
              </p>
              <div className="max-w-md mx-auto">
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={siteUrl}
                    onChange={(e) => setSiteUrl(e.target.value)}
                    placeholder="yoursite.com"
                    className="form-input flex-grow px-4 py-3 border border-gray-200 rounded-lg bg-white text-hw-text"
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleRunAudit(); } }}
                  />
                  <button
                    onClick={handleRunAudit}
                    disabled={auditLoading}
                    className="btn-primary !py-3 !px-5 shrink-0"
                  >
                    {auditLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Check It"}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mt-6 max-w-md mx-auto">
                <button
                  onClick={handleBack}
                  className="text-sm text-hw-text-light hover:text-hw-text flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={handleSkipUrl}
                  className="text-sm text-gray-400 hover:text-hw-text-light transition-colors underline"
                >
                  Skip, I don&apos;t have one
                </button>
              </div>
            </div>
          )}

          {/* ── Results Flow ── */}
          {showResult && !emailSubmitted && (
            /* ── Email Gate ── */
            <div className="card-glow !p-8 md:!p-10 text-center">
              <p className="text-hw-primary text-4xl mb-4">{result?.emoji}</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Your results are ready!
              </h2>
              <p className="text-hw-text-light mb-8 max-w-md mx-auto">
                Enter your email to see your Online Personality type, personalized recommendation
                {auditResult ? ", and your site audit results" : ""}.
              </p>
              <form onSubmit={handleEmailSubmit} className="max-w-sm mx-auto">
                <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hw-text-light" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="form-input w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white text-hw-text"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary !py-3 !px-5 shrink-0"
                  >
                    {submitting ? "..." : "Show Me"}
                  </button>
                </div>
                <label className="flex items-start gap-2 mt-3 text-xs text-hw-text-light cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newsletterOptin}
                    onChange={(e) => setNewsletterOptin(e.target.checked)}
                    className="mt-0.5 accent-hw-primary"
                  />
                  Also send me occasional web tips (no spam, unsubscribe anytime)
                </label>
              </form>
              <button
                onClick={() => setEmailSubmitted(true)}
                className="mt-4 text-xs text-gray-400 hover:text-hw-text-light transition-colors underline"
              >
                Skip, just show my results
              </button>
            </div>
          )}

          {showResult && emailSubmitted && (
            <div className="space-y-6">

              {/* ── Formspree Error Warning ── */}
              {formspreeError && (
                <div className="card-glow !p-6 bg-yellow-50 border-yellow-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-hw-text">We had trouble saving your info.</p>
                      <p className="text-xs text-hw-text-light mt-1">
                        Your results are below. If you&apos;d like us to follow up, give us a call at{" "}
                        <a href="tel:+12566447334" className="text-hw-primary font-medium">(256) 644-7334</a>.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Result Card ── */}
              <div className="card-glow !p-8 md:!p-10">
                <div className="text-center mb-8">
                  <p className="text-5xl mb-3">{result?.emoji}</p>
                  <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-2">
                    Your Online Personality
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {result?.name}
                  </h2>
                  <p className="text-lg text-hw-text-light italic">
                    {result?.tagline}
                  </p>
                </div>

                <p className="text-hw-text leading-relaxed mb-4">
                  {result?.description}
                </p>

                <p className="text-hw-text-light text-sm italic mb-6">
                  I see this a lot with {tradeData ? tradeData.label.toLowerCase() : "local"} businesses in our area &mdash; and the good news is, it&apos;s fixable.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-hw-secondary/5 border border-hw-secondary/15 rounded-xl p-5">
                    <p className="text-sm font-bold text-hw-secondary uppercase tracking-wide mb-2">
                      Your Strength
                    </p>
                    <p className="text-hw-text text-sm">{result?.strength}</p>
                  </div>
                  <div className="bg-red-50 border border-red-200/40 rounded-xl p-5">
                    <p className="text-sm font-bold text-red-500 uppercase tracking-wide mb-2">
                      Your Risk
                    </p>
                    <p className="text-hw-text text-sm">{result?.risk}</p>
                  </div>
                </div>

                <div className="bg-hw-primary/5 border border-hw-primary/15 rounded-xl p-6 mb-8">
                  <p className="text-sm font-bold text-hw-primary uppercase tracking-wide mb-2">
                    What I&apos;d Recommend
                  </p>
                  <p className="text-hw-text mb-3">{result?.recommendation}</p>
                  <p className="text-sm text-hw-text-light">
                    Best fit: <span className="font-semibold text-hw-primary">{result?.tier}</span> tier
                  </p>
                </div>
              </div>

              {/* ── ROI Callout (Client-facing — lighter version) ── */}
              {!isInternal && tradeData && (
                <div className="bg-red-50 border border-red-200/40 rounded-xl p-6 text-center">
                  <p className="text-hw-text leading-relaxed">
                    A weak online presence could be costing your {tradeData.label.toLowerCase()} business{" "}
                    <span className="font-bold text-red-600">
                      ${tradeData.estimatedMonthlyLoss[0].toLocaleString()}&ndash;${tradeData.estimatedMonthlyLoss[1].toLocaleString()}/mo
                    </span>{" "}
                    in missed leads.
                  </p>
                  <p className="text-xs text-hw-text-light mt-2">
                    Get the full report for the complete breakdown.
                  </p>
                </div>
              )}

              {/* ── ROI Estimate (Internal only — full grid) ── */}
              {isInternal && tradeData && (
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
                      Your <span className="font-semibold text-hw-primary">{recommendedTier}</span> package (${tierPrice}) typically pays for itself within{" "}
                      <span className="font-bold text-hw-dark">
                        {tradeData.paybackJobs[recommendedTier] ?? 4} job{(tradeData.paybackJobs[recommendedTier] ?? 4) !== 1 ? "s" : ""}
                      </span>.
                    </p>
                  </div>
                  <p className="text-xs text-hw-text-light text-center mt-3">
                    Your results may vary. These numbers reflect typical businesses in our area.
                  </p>
                </div>
              )}

              {/* ── Audit Loading ── */}
              {auditLoading && (
                <div className="card-glow !p-8 md:!p-10 text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-hw-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">Analyzing your website...</h3>
                  <p className="text-sm text-hw-text-light">
                    This takes 20–30 seconds. We&apos;re checking speed, SEO, mobile setup, and messaging.
                  </p>
                </div>
              )}

              {/* ── Site Audit Results (Client Teaser) ── */}
              {auditResult && !isInternal && (
                <div ref={auditResultsRef} className="card-glow !p-8 md:!p-10 scroll-mt-24">
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

                  {/* Get Full Report */}
                  <div className="border-t border-gray-100 pt-6 text-center">
                    {reportSent ? (
                      <div role="status" aria-live="polite">
                        <p className="text-sm text-green-600 flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Full report sent to {email}
                        </p>
                        <p className="text-xs text-hw-text-light mt-2 mb-3">
                          Check your inbox. Your detailed PDF is on the way.
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
                      <>
                        <p className="text-base font-semibold text-hw-text mb-1">Get Your Full Report</p>
                        <p className="text-xs text-hw-text-light mb-4">
                          Detailed PDF with speed analysis, messaging breakdown, and what I&apos;d fix first, sent to {email || "your email"}.
                        </p>
                        <button
                          onClick={handleSendReport}
                          disabled={reportSending}
                          className="btn-primary !text-sm !py-2.5 !px-6 inline-flex items-center gap-2"
                        >
                          {reportSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                          {reportSending ? "Sending..." : "Send My Report"}
                        </button>
                        {reportError && (
                          <p className="text-xs text-red-500 mt-2">
                            Something went wrong. Try again, or call (256) 644-7334.
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* ── Site Audit Results (Internal View) ── */}
              {auditResult && isInternal && (
                <div ref={auditResultsRef} className="card-glow !p-8 md:!p-10 scroll-mt-24">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold">
                      Site Audit, Internal View
                    </h3>
                    <span className="text-xs bg-hw-primary/10 text-hw-primary px-2 py-1 rounded font-mono">
                      INTERNAL
                    </span>
                  </div>
                  <p className="text-sm text-hw-text-light mb-6 font-mono">
                    {auditResult.url}
                  </p>

                  {/* Score Gauges */}
                  <div className="flex justify-center gap-8 mb-6">
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
                          {auditResult.storyBrand.grade}: {auditResult.storyBrand.autoTotal}/{auditResult.storyBrand.autoMax} auto-scored
                        </span>
                      </div>

                      {/* Extracted Copy for Review */}
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
                    </div>
                  )}

                  {/* Manual Audit Checklist */}
                  <div className="mb-6">
                    <p className="text-sm font-bold uppercase tracking-wide text-hw-text-light mb-3">
                      Manual Audit Checklist
                    </p>
                    <p className="text-xs text-hw-text-light mb-4">
                      Check these items during your call with the client. Items above are automated. These need your eyes.
                    </p>
                    {manualChecklist.map((group) => (
                      <div key={group.section} className="mb-4">
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

                  {/* Copy-Paste Summary */}
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
                </div>
              )}

              {/* ── Audit Error ── */}
              {auditError && (
                <div className="card-glow !p-6 bg-yellow-50 border-yellow-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-hw-text">{auditError}</p>
                      <p className="text-xs text-hw-text-light mt-1">No worries. Your quiz results and recommendation are still valid.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Success / Transformation ── */}
              {auditResult && !isInternal && (
                <div className="card-glow !p-8 md:!p-10">
                  <h3 className="text-lg font-bold mb-4">What a Site That Works Looks Like</h3>
                  <div className="space-y-3">
                    {[
                      "Loads in under 3 seconds so visitors stay and explore",
                      "Clear headline that speaks to your customer\u2019s problem",
                      "Phone number and call-to-action visible without scrolling",
                      "Google can verify your business for local search results",
                      "Messaging that makes visitors say \u201Cthis is exactly what I need\u201D",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <p className="text-sm text-hw-text">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── 3-Step Plan ── */}
              <div className="card-glow !p-8 md:!p-10">
                <h3 className="text-lg font-bold text-center mb-6">Here&apos;s What Happens Next</h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-hw-primary/10 text-hw-primary font-bold text-lg flex items-center justify-center mx-auto mb-3">1</div>
                    <p className="text-sm font-semibold text-hw-dark mb-1">Get your free report</p>
                    <p className="text-xs text-hw-text-light">Speed, SEO, and messaging &mdash; all in one PDF.</p>
                  </div>
                  <div>
                    <div className="w-10 h-10 rounded-full bg-hw-primary/10 text-hw-primary font-bold text-lg flex items-center justify-center mx-auto mb-3">2</div>
                    <p className="text-sm font-semibold text-hw-dark mb-1">I&apos;ll personally review your site</p>
                    <p className="text-xs text-hw-text-light">And follow up with what I&apos;d fix first.</p>
                  </div>
                  <div>
                    <div className="w-10 h-10 rounded-full bg-hw-primary/10 text-hw-primary font-bold text-lg flex items-center justify-center mx-auto mb-3">3</div>
                    <p className="text-sm font-semibold text-hw-dark mb-1">We fix the biggest gap first</p>
                    <p className="text-xs text-hw-text-light">No pressure, no long contracts. Just results.</p>
                  </div>
                </div>
              </div>

              {/* ── CTAs ── */}
              <div className="card-glow !p-8 md:!p-10">
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="tel:+12566447334"
                    className="btn-primary text-center"
                  >
                    Call Me: (256) 644-7334
                  </a>
                  <Link href="/audit" className="btn-secondary text-center">
                    Get Your Free Site Checkup
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>

                {/* PDF Download (Internal only — client gets PDF via email) */}
                {result && isInternal && (
                  <div className="text-center mt-4">
                    <QuizReportPdf
                      archetype={result}
                      auditResult={auditResult}
                      tradeData={tradeData}
                      recommendedTier={recommendedTier}
                      tierPrice={tierPrice}
                      recommendations={recommendations}
                    />
                  </div>
                )}

                <div className="text-center mt-6">
                  <button
                    onClick={handleRestart}
                    className="text-sm text-hw-text-light hover:text-hw-text flex items-center gap-1 mx-auto transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Take it again
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
