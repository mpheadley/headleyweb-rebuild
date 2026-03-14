"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowRight, ArrowLeft, Mail, RotateCcw, Globe, Loader2, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { roiEstimates, normalizeTier, tierPrices, type TradeEstimate } from "../data/roi-estimates";
import type { AuditResult, StoryBrandItem } from "../api/site-audit/route";

/* ── Trade options (not scored) ── */
const tradeOptions = [
  { key: "plumbing", label: "Plumbing" },
  { key: "hvac", label: "HVAC" },
  { key: "electrical", label: "Electrical" },
  { key: "salon", label: "Salon / Barbershop" },
  { key: "small-engine", label: "Small Engine / Lawn Care" },
  { key: "contractor", label: "General Contractor" },
  { key: "other", label: "Other Local Service" },
];

/* ── Questions ── */
const questions = [
  {
    question: "When someone asks for your website, you...",
    answers: [
      { text: "Proudly share a link", value: 4 },
      { text: 'Give them your Facebook page', value: 2 },
      { text: "Change the subject", value: 1 },
      { text: 'Say "it\'s being updated" (it\'s been 2 years)', value: 3 },
    ],
  },
  {
    question: "Your Google Business Profile is...",
    answers: [
      { text: "Fully optimized with photos and reviews", value: 4 },
      { text: "I think I claimed it once?", value: 2 },
      { text: "What's a Google Business Profile?", value: 1 },
      { text: "It exists but could use some love", value: 3 },
    ],
  },
  {
    question: "When a customer Googles your trade + your town, you...",
    answers: [
      { text: "Show up on the first page", value: 4 },
      { text: "Show up... eventually... maybe page 3", value: 3 },
      { text: "Your competitor shows up instead", value: 2 },
      { text: "You've never actually checked", value: 1 },
    ],
  },
  {
    question: "Your marketing strategy is mainly...",
    answers: [
      { text: "Word of mouth and prayer", value: 1 },
      { text: "Social media posts when I remember", value: 2 },
      { text: "A mix of things but nothing consistent", value: 3 },
      { text: "Planned and tracked with real data", value: 4 },
    ],
  },
  {
    question: "When it comes to technology, you...",
    answers: [
      { text: "Built your own computer", value: 4 },
      { text: "Can handle email and social media", value: 3 },
      { text: "Your kids set up your phone", value: 1 },
      { text: "Tried a website builder, gave up halfway", value: 2 },
    ],
  },
  {
    question: "Your biggest frustration right now is...",
    answers: [
      { text: "Great work, but no one knows about it", value: 1 },
      { text: "Inconsistent leads — feast or famine", value: 2 },
      { text: "Competitors who aren't as good get more business", value: 3 },
      { text: "Not having time to figure out the online stuff", value: 2 },
    ],
  },
  {
    question: 'If someone asks how you get new customers, you say...',
    answers: [
      { text: '"All referrals" (said with pride)', value: 2 },
      { text: '"I honestly don\'t know"', value: 1 },
      { text: '"A mix of things"', value: 3 },
      { text: '"I have a system that works"', value: 4 },
    ],
  },
  {
    question: "What sounds most like your business right now?",
    answers: [
      { text: '"I\'m the best-kept secret in town"', value: 1 },
      { text: '"I\'m doing fine but could do better"', value: 3 },
      { text: '"I need to modernize but don\'t know where to start"', value: 2 },
      { text: '"I\'m ready to invest in real growth"', value: 4 },
    ],
  },
];

/* ── Archetypes ── */
type Archetype = {
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  strength: string;
  risk: string;
  recommendation: string;
  tier: string;
};

const archetypes: Record<string, Archetype> = {
  invisible: {
    name: "The Invisible Expert",
    emoji: "🔍",
    tagline: "You're amazing at what you do. Nobody online knows it yet.",
    description:
      "You've built your business on skill and hustle — but your online presence is basically nonexistent. Customers can't find you, and competitors who aren't half as good are getting the calls.",
    strength: "Your craft speaks for itself once people find you",
    risk: "Every day without a web presence, you're handing leads to competitors",
    recommendation:
      "You need the full package — a professional site, Google Business Profile, and local SEO to go from invisible to unmissable.",
    tier: "Get Booked",
  },
  warrior: {
    name: "The Word-of-Mouth Warrior",
    emoji: "🗣️",
    tagline: "Referrals keep you busy. But what happens when they Google you?",
    description:
      "Your reputation is strong in person. The problem? When someone gets your name from a friend, they Google you before they call. If they find a dead Facebook page or nothing at all, that referral becomes someone else's customer.",
    strength: "People already trust you — you just need to close the loop online",
    risk: "You're one bad Google search away from losing warm leads",
    recommendation:
      "A clean, professional site with your Google Business Profile set up properly. You don't need to dominate the internet — you need to not lose the people already looking for you.",
    tier: "Get Found",
  },
  dabbler: {
    name: "The DIY Dabbler",
    emoji: "🔧",
    tagline: "You tried the website builders. It's... fine. But it's not working.",
    description:
      'You\'ve got a Wix site or a Squarespace page that took you a weekend to build. It technically exists, but it\'s not generating leads, it doesn\'t show up on Google, and deep down you know it looks like a "template with your logo on it."',
    strength: "You're not afraid to take action — you just need better tools",
    risk: "A mediocre site can actually hurt more than no site (it says 'I don't take this seriously')",
    recommendation:
      "Let someone build it right. A proper site with real messaging, real SEO, and a design that matches the quality of your work.",
    tier: "Get Calls",
  },
  almost: {
    name: "The Almost There",
    emoji: "📈",
    tagline: "You've got pieces in place. Time to connect the dots.",
    description:
      "You have a website. Maybe a Google listing. Possibly even some reviews. But the leads are inconsistent, you're not sure what's working, and you know there's another level you haven't reached yet.",
    strength: "You've already started — the foundation exists",
    risk: "Without optimization, you're leaving money on the table every month",
    recommendation:
      "A strategic rebuild or optimization pass. Tighten the messaging, fix the SEO gaps, and turn your existing presence into an actual lead machine.",
    tier: "Get Calls or Get Booked",
  },
  legend: {
    name: "The Local Legend",
    emoji: "👑",
    tagline: "You're already winning. Let's make sure you stay there.",
    description:
      "You show up on Google. You get calls from your website. People know your name. But the market is shifting — AI search, voice assistants, and new competitors are coming. The businesses that stay on top are the ones that keep investing.",
    strength: "You have momentum and market trust",
    risk: "Complacency is the only real threat — new competitors are always catching up",
    recommendation:
      "The Get Booked tier with AI visibility and ongoing care. Stay ahead of the curve while everyone else is still figuring out what happened.",
    tier: "Get Booked",
  },
};

function getArchetype(score: number): Archetype {
  if (score <= 13) return archetypes.invisible;
  if (score <= 18) return archetypes.warrior;
  if (score <= 23) return archetypes.dabbler;
  if (score <= 28) return archetypes.almost;
  return archetypes.legend;
}

/* ── Score Gauge Component ── */
function ScoreGauge({ score, label, size = "normal" }: { score: number; label: string; size?: "normal" | "small" }) {
  const color = score >= 90 ? "text-green-600" : score >= 50 ? "text-yellow-500" : "text-red-500";
  const bgColor = score >= 90 ? "stroke-green-600" : score >= 50 ? "stroke-yellow-500" : "stroke-red-500";
  const dims = size === "small" ? "w-16 h-16" : "w-20 h-20";
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`relative ${dims}`}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" stroke="#e5e7eb" strokeWidth="6" />
          <circle
            cx="40" cy="40" r="36" fill="none"
            className={bgColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center font-bold ${color} ${size === "small" ? "text-sm" : "text-lg"}`}>
          {score}
        </span>
      </div>
      <span className={`text-hw-text-light ${size === "small" ? "text-xs" : "text-xs"} text-center`}>{label}</span>
    </div>
  );
}

/* ── Audit Check Item ── */
function AuditCheck({ passed, label }: { passed: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {passed ? (
        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
      ) : (
        <XCircle className="w-4 h-4 text-red-500 shrink-0" />
      )}
      <span className={passed ? "text-hw-text" : "text-red-600 font-medium"}>{label}</span>
    </div>
  );
}

/* ── Plain-English Metric Labels ── */
function getSpeedLabel(lcp: number): string {
  if (lcp <= 2.5) return "Your site loads fast — visitors won't wait around";
  if (lcp <= 4) return "Your site is a bit slow — some visitors are leaving before it loads";
  return "Your site is slow — most visitors leave before they ever see your content";
}

function getScoreLabel(score: number, category: string): string {
  if (score >= 90) return `Your ${category} is in great shape`;
  if (score >= 50) return `Your ${category} needs some work`;
  return `Your ${category} needs serious attention`;
}

/* ── StoryBrand Grade Colors ── */
function getGradeColor(grade: string): string {
  if (grade === "A") return "text-green-600 bg-green-50 border-green-200";
  if (grade === "B") return "text-green-600 bg-green-50 border-green-200";
  if (grade === "C") return "text-yellow-500 bg-yellow-50 border-yellow-200";
  if (grade === "D") return "text-red-500 bg-red-50 border-red-200";
  return "text-red-600 bg-red-50 border-red-200";
}

function getGradeLabel(grade: string): string {
  if (grade === "A") return "StoryBrand-aligned — this site sells";
  if (grade === "B") return "Good foundation, needs tightening";
  if (grade === "C") return "Has pieces, but the message is muddled";
  if (grade === "D") return "Talking about themselves, not the customer";
  return "Digital brochure — not a sales tool";
}

/* ── StoryBrand Item Score Display ── */
function StoryBrandItemRow({ item }: { item: StoryBrandItem }) {
  const scoreColor = item.autoScore === null
    ? "bg-gray-100 text-gray-500"
    : item.autoScore === 2
      ? "bg-green-100 text-green-700"
      : item.autoScore === 1
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700";

  return (
    <div className="border border-gray-100 rounded-lg p-3">
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm font-medium text-hw-text">{item.id} {item.label}</p>
        <span className={`text-xs font-mono px-2 py-0.5 rounded ${scoreColor}`}>
          {item.autoScore === null ? "Manual" : `${item.autoScore}/2`}
        </span>
      </div>
      {item.signals.map((s, i) => (
        <p key={i} className="text-xs text-hw-text-light">{s}</p>
      ))}
    </div>
  );
}

/* ── Manual Audit Checklist Items ── */
const manualChecklist = [
  {
    section: "Google Business Profile",
    items: [
      "GBP claimed and verified",
      "Business name, address, phone (NAP) accurate",
      "Correct business category selected",
      "Business hours set and up to date",
      "At least 10 photos uploaded (storefront, work, team)",
      "Business description filled out with keywords",
      "Service area or address set correctly",
      "At least 5 Google reviews",
      "Owner responds to reviews",
      "Posts/updates in last 30 days",
    ],
  },
  {
    section: "Online Presence",
    items: [
      "Shows up on Google Maps for main keyword + city",
      "Facebook page exists and is active",
      "Yelp listing claimed (if applicable)",
      "BBB listing (if applicable)",
      "NAP consistent across all directories",
      "No duplicate listings on Google",
    ],
  },
  {
    section: "Conversion Elements",
    items: [
      "Phone number clickable on mobile",
      "Contact form works and submits",
      "Form is short (name, phone, message max)",
      "Thank-you page or confirmation after form submit",
      "Social proof near CTA (reviews, badges, testimonials)",
      "Trust signals present (license #, insurance, BBB)",
      "Live chat or text option (bonus)",
    ],
  },
  {
    section: "StoryBrand (Manual Review)",
    items: [
      "1.4 — Sub-headline expands the story (not just a tagline)",
      "1.6 — Three questions answered in 5 seconds (offer, benefit, next step)",
      "Overall messaging clarity — would a stranger understand in one read?",
      "Guide positioning — empathy + authority balanced, not just credentials",
      "Copy reads like conversation, not corporate speak",
      "Every section drives toward the CTA",
    ],
  },
];

export default function QuizPage() {
  const searchParams = useSearchParams();
  const isInternal = searchParams.get("internal") === "true";

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // New state for trade, URL audit, and ROI
  const [trade, setTrade] = useState<string | null>(null);
  const [showTradeSelect, setShowTradeSelect] = useState(false);
  const [siteUrl, setSiteUrl] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [auditError, setAuditError] = useState<string | null>(null);
  const [auditLoading, setAuditLoading] = useState(false);

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
      // Skip audit, go to results
      setShowUrlInput(false);
      setShowResult(true);
      return;
    }
    setAuditLoading(true);
    setAuditError(null);
    try {
      const res = await fetch(`/api/site-audit?url=${encodeURIComponent(siteUrl.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        setAuditError(data.error || "Could not analyze that URL.");
      } else {
        setAuditResult(data as AuditResult);
      }
    } catch {
      setAuditError("Something went wrong. Please try again.");
    }
    setAuditLoading(false);
    setShowUrlInput(false);
    setShowResult(true);
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
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("https://formspree.io/f/xyknwdgp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          quiz_result: result?.name,
          quiz_score: totalScore,
          trade: trade || "not selected",
          site_url: siteUrl || "not provided",
          _subject: `Quiz Result: ${result?.name}`,
        }),
      });
    } catch {
      // Silently continue — show result regardless
    }
    setSubmitting(false);
    setEmailSubmitted(true);
  }

  // Start the audit in the background once we move to email gate
  useEffect(() => {
    if (showResult && siteUrl.trim() && !auditResult && !auditError && !auditLoading) {
      // Audit was kicked off from URL input step — nothing extra needed here
    }
  }, [showResult, siteUrl, auditResult, auditError, auditLoading]);

  const totalScore = answers.reduce((sum, v) => sum + v, 0);
  const result = showResult ? getArchetype(totalScore) : null;
  const tradeData: TradeEstimate | null = trade ? roiEstimates[trade] ?? null : null;
  const recommendedTier = result ? normalizeTier(result.tier) : "Get Calls";
  const tierPrice = tierPrices[recommendedTier] ?? 795;

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
            8 quick questions. 60 seconds. Find out where you stand — and what to do next.
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
                  className="text-sm text-gray-400 hover:text-hw-text-light transition-colors underline"
                >
                  Skip
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
                Paste your URL and I&apos;ll run a quick checkup — speed, SEO, mobile-friendliness — so you can see exactly where you stand.
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
                  Skip — I don&apos;t have one
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
              </form>
              <button
                onClick={() => setEmailSubmitted(true)}
                className="mt-4 text-xs text-gray-400 hover:text-hw-text-light transition-colors underline"
              >
                Skip — just show my results
              </button>
            </div>
          )}

          {showResult && emailSubmitted && (
            <div className="space-y-6">
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

                <p className="text-hw-text leading-relaxed mb-6">
                  {result?.description}
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

              {/* ── ROI Estimate ── */}
              {tradeData && (
                <div className="card-glow !p-8 md:!p-10">
                  <h3 className="text-lg font-bold mb-1">
                    What This Could Be Costing You
                  </h3>
                  <p className="text-sm text-hw-text-light mb-6">
                    Based on typical {tradeData.label.toLowerCase()} businesses in our area
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-hw-dark">${tradeData.avgJobValue}</p>
                      <p className="text-xs text-hw-text-light mt-1">Average Job Value</p>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-hw-dark">{tradeData.estimatedMissedLeads[0]}-{tradeData.estimatedMissedLeads[1]}</p>
                      <p className="text-xs text-hw-text-light mt-1">Missed Leads / Month</p>
                    </div>
                    <div className="bg-red-50 border border-red-200/40 rounded-xl p-4 text-center col-span-2 md:col-span-1">
                      <p className="text-2xl font-bold text-red-600">${tradeData.estimatedMonthlyLoss[0].toLocaleString()}-${tradeData.estimatedMonthlyLoss[1].toLocaleString()}</p>
                      <p className="text-xs text-hw-text-light mt-1">Estimated Monthly Loss</p>
                    </div>
                  </div>

                  <div className="bg-hw-secondary/5 border border-hw-secondary/15 rounded-xl p-5 text-center">
                    <p className="text-hw-text">
                      Your <span className="font-semibold text-hw-primary">{recommendedTier}</span> package (${tierPrice}) pays for itself in just{" "}
                      <span className="font-bold text-hw-dark">
                        {tradeData.paybackJobs[recommendedTier] ?? 4} job{(tradeData.paybackJobs[recommendedTier] ?? 4) !== 1 ? "s" : ""}
                      </span>.
                    </p>
                  </div>
                </div>
              )}

              {/* ── Site Audit Results (Client-Facing) ── */}
              {auditResult && !isInternal && (
                <div className="card-glow !p-8 md:!p-10">
                  <h3 className="text-lg font-bold mb-1">
                    Your Site&apos;s Quick Checkup
                  </h3>
                  <p className="text-sm text-hw-text-light mb-6">
                    Here&apos;s how <span className="font-medium text-hw-text">{auditResult.url}</span> is performing on mobile
                  </p>

                  {/* Score Gauges */}
                  <div className="flex justify-center gap-8 mb-8">
                    <ScoreGauge score={auditResult.performance} label="Speed" />
                    <ScoreGauge score={auditResult.seo} label="SEO" />
                    <ScoreGauge score={auditResult.accessibility} label="Accessibility" />
                  </div>

                  {/* Plain-English Summary */}
                  <div className="space-y-3 mb-6">
                    <div className={`flex items-start gap-3 p-3 rounded-lg ${auditResult.lcp <= 2.5 ? "bg-green-50" : auditResult.lcp <= 4 ? "bg-yellow-50" : "bg-red-50"}`}>
                      {auditResult.lcp <= 2.5 ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      ) : auditResult.lcp <= 4 ? (
                        <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-hw-text">{getSpeedLabel(auditResult.lcp)}</p>
                        <p className="text-xs text-hw-text-light mt-0.5">Your site takes {auditResult.lcp}s to show its main content</p>
                      </div>
                    </div>

                    <div className={`flex items-start gap-3 p-3 rounded-lg ${auditResult.seo >= 90 ? "bg-green-50" : auditResult.seo >= 50 ? "bg-yellow-50" : "bg-red-50"}`}>
                      {auditResult.seo >= 90 ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-hw-text">{getScoreLabel(auditResult.seo, "search engine visibility")}</p>
                        <p className="text-xs text-hw-text-light mt-0.5">This affects whether customers find you on Google</p>
                      </div>
                    </div>
                  </div>

                  {/* Basic Checks */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <AuditCheck passed={auditResult.isHttps} label="Secure connection (HTTPS)" />
                    <AuditCheck passed={auditResult.hasMetaDescription} label="Search description" />
                    <AuditCheck passed={auditResult.hasViewport} label="Mobile-friendly setup" />
                    <AuditCheck passed={auditResult.isLinkCrawlable} label="Links are crawlable" />
                  </div>

                  {/* StoryBrand Messaging Score (Client-Facing) */}
                  {auditResult.storyBrand && (
                    <div className="mb-6">
                      <h4 className="text-sm font-bold uppercase tracking-wide text-hw-text-light mb-3">
                        Your Website Messaging
                      </h4>
                      <div className={`rounded-xl p-5 border text-center mb-4 ${getGradeColor(auditResult.storyBrand.grade)}`}>
                        <p className="text-3xl font-bold mb-1">{auditResult.storyBrand.grade}</p>
                        <p className="text-sm">{getGradeLabel(auditResult.storyBrand.grade)}</p>
                      </div>
                      <div className="space-y-2">
                        {auditResult.storyBrand.items
                          .filter(i => i.autoScore !== null && i.autoScore < 2)
                          .slice(0, 4)
                          .map((item) => (
                            <div key={item.id} className={`flex items-start gap-2 p-2 rounded-lg ${item.autoScore === 0 ? "bg-red-50" : "bg-yellow-50"}`}>
                              {item.autoScore === 0 ? (
                                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                              )}
                              <p className="text-sm text-hw-text">{item.label}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-hw-primary/5 border border-hw-primary/15 rounded-xl p-5 text-center">
                    <p className="text-sm text-hw-text mb-2">
                      Want me to walk you through what this means for your business?
                    </p>
                    <a href="tel:+12566447334" className="btn-primary !text-sm !py-2 !px-4 inline-flex items-center gap-2">
                      Let&apos;s Talk — (256) 644-7334
                    </a>
                  </div>
                </div>
              )}

              {/* ── Site Audit Results (Internal View) ── */}
              {auditResult && isInternal && (
                <div className="card-glow !p-8 md:!p-10">
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
                  <div className="flex justify-center gap-8 mb-6">
                    <ScoreGauge score={auditResult.performance} label="Performance" />
                    <ScoreGauge score={auditResult.seo} label="SEO" />
                    <ScoreGauge score={auditResult.accessibility} label="Accessibility" />
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
                      Check these items during your call with the client. Items above are automated — these need your eyes.
                    </p>
                    {manualChecklist.map((group) => (
                      <div key={group.section} className="mb-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-hw-primary mb-2">{group.section}</p>
                        <div className="space-y-1">
                          {group.items.map((item, i) => (
                            <label key={i} className="flex items-start gap-2 text-sm text-hw-text cursor-pointer hover:bg-gray-50 p-1 rounded">
                              <input type="checkbox" className="mt-1 accent-hw-primary" />
                              <span>{item}</span>
                            </label>
                          ))}
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
HTTPS: ${auditResult.isHttps ? "Yes" : "No"} | Meta Desc: ${auditResult.hasMetaDescription ? "Yes" : "No"} | Viewport: ${auditResult.hasViewport ? "Yes" : "No"}
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
                      <p className="text-xs text-hw-text-light mt-1">No worries — your quiz results and recommendation are still valid.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── CTAs ── */}
              <div className="card-glow !p-8 md:!p-10">
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/#checkup" className="btn-primary text-center">
                    Get Your Free Site Checkup
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <a
                    href="tel:+12566447334"
                    className="btn-secondary text-center"
                  >
                    Call Me — (256) 644-7334
                  </a>
                </div>

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
