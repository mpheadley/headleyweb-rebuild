"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Mail, RotateCcw } from "lucide-react";

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

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const progress = ((currentQ + (showResult ? 1 : 0)) / questions.length) * 100;

  function handleSelect(value: number, index: number) {
    setSelected(index);
    // Brief delay so user sees the selection highlight
    setTimeout(() => {
      const newAnswers = [...answers, value];
      setAnswers(newAnswers);
      setSelected(null);

      if (currentQ + 1 < questions.length) {
        setCurrentQ(currentQ + 1);
      } else {
        setShowResult(true);
      }
    }, 300);
  }

  function handleBack() {
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
    setEmail("");
    setEmailSubmitted(false);
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
          _subject: `Quiz Result: ${result?.name}`,
        }),
      });
    } catch {
      // Silently continue — show result regardless
    }
    setSubmitting(false);
    setEmailSubmitted(true);
  }

  const totalScore = answers.reduce((sum, v) => sum + v, 0);
  const result = showResult ? getArchetype(totalScore) : null;

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
          <p className="text-gray-300">
            8 quick questions. 60 seconds. Find out where you stand — and what to do next.
          </p>
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
          {!showResult ? (
            /* ── Question Card ── */
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
          ) : !emailSubmitted ? (
            /* ── Email Gate ── */
            <div className="card-glow !p-8 md:!p-10 text-center">
              <p className="text-hw-primary text-4xl mb-4">{result?.emoji}</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Your results are ready!
              </h2>
              <p className="text-hw-text-light mb-8 max-w-md mx-auto">
                Enter your email to see your Online Personality type — plus a
                personalized recommendation for your business.
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
          ) : (
            /* ── Result Card ── */
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
          )}
        </div>
      </section>
    </main>
  );
}
