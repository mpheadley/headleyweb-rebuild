"use client";

import { useState } from "react";
import Link from "next/link";

const PROMPTS = [
  {
    num: "1",
    title: "Sharpen your customer description",
    sub: "Use after BrandScript Section 1 (Character)",
    text: `I run a [type of business] in [city/region]. My customer is roughly: [paste your character description]. They want: [paste what they want].

Rewrite my customer description in 2–3 sentences using plain language a 9th grader could read. Make it specific and concrete — names of neighborhoods, types of jobs, life stage if relevant. Avoid corporate words like "stakeholders" or "consumers." Don't add anything I didn't tell you.`,
    accent: false,
  },
  {
    num: "2",
    title: "Find the three layers of the problem",
    sub: "Use after BrandScript Section 2 (Problem)",
    text: `My customer's external problem is: [paste external problem].

Help me name the internal problem (how this makes them feel day to day) and the philosophical problem (why it's just plain wrong that they're stuck with this). Give me 3 options for each, written as one short sentence. Use the everyday language a customer would actually say out loud — not marketing language.`,
    accent: false,
  },
  {
    num: "3",
    title: "Write empathy + authority statements",
    sub: "Use after BrandScript Section 3 (Guide)",
    text: `I'm positioning myself as a guide — not the hero — to my customer.

My customer is: [paste character].
Their main problem is: [paste external + internal problem].
My background / proof I can help: [list credentials, years in business, results, examples].

Write me 3 empathy statements (sentences that prove I get what my customer is going through, without being sappy) and 3 authority statements (sentences that show I can actually help, without bragging). Keep each under 20 words. Sound human, not like a brochure.`,
    accent: false,
  },
  {
    num: "4",
    title: "Tighten your 3-step plan",
    sub: "Use after BrandScript Section 4 (Plan)",
    text: `Here's my current 3-step plan for working with me:
Step 1: [paste]
Step 2: [paste]
Step 3: [paste]

Rewrite each step as a short, action-led phrase (3–6 words) that sounds friendly and removes any confusion. Each step should start with a verb. Don't use jargon. Don't add a 4th step. Give me 3 alternative versions of the whole plan.`,
    accent: false,
  },
  {
    num: "5",
    title: "Generate a strong direct CTA",
    sub: "Use after BrandScript Section 5 (Call to Action)",
    text: `I need a direct call-to-action button for my homepage and a softer transitional CTA for visitors who aren't ready yet.

My business: [type of business + city]
What I want them to do: [book / call / buy / schedule…]
The transitional offer I can give: [free guide / audit / checklist / call]

Give me 5 direct CTA button options (3 words max each) and 5 transitional CTA options (5 words max each). They should feel inviting, not pushy. No exclamation marks.`,
    accent: false,
  },
  {
    num: "6",
    title: "Name the stakes (failure)",
    sub: "Use after BrandScript Section 6 (Failure)",
    text: `If my customer doesn't act, here's what they keep losing: [paste your draft answer].

Help me sharpen this. Give me 3 versions of the "stakes" written as a short list (3 bullets each) that I could put on a homepage section titled something like "What's at stake if you do nothing?" — concrete, specific, and grounded in real consequences. Avoid fear-mongering. No all-caps. No "don't miss out!"`,
    accent: false,
  },
  {
    num: "7",
    title: "Paint the success picture",
    sub: "Use after BrandScript Section 7 (Success)",
    text: `Here's what success looks like for my customer after working with me: [paste your draft answer].

Rewrite this as 3 short bullets I could put on a homepage section called "What life looks like after." Each bullet should be a concrete, before-and-after style image (e.g., "Wake up to leads in your inbox instead of crickets"). No vague words like "transformation" or "next level."`,
    accent: false,
  },
  {
    num: "★",
    title: "Generate your one-liner",
    sub: "After your BrandScript is filled in",
    text: `Here's my full StoryBrand BrandScript:

Character: [paste]
Want: [paste]
External problem: [paste]
Internal problem: [paste]
Philosophical problem: [paste]
Plan: [paste]
Success: [paste]

Write me 5 different one-liner options I could use as my homepage headline and to introduce myself at networking events. Use this template as a starting point but feel free to vary it: "We help [character] who [problem] so they can [success]." Keep each under 20 words. Sound conversational, not like a tagline.`,
    accent: true,
  },
];

function PromptCard({ prompt }: { prompt: typeof PROMPTS[0] }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(prompt.text).then(done).catch(() => fallback());
    } else {
      fallback();
    }
    function fallback() {
      const ta = document.createElement("textarea");
      ta.value = prompt.text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
      done();
    }
  }

  return (
    <article className={`bg-hw-white rounded-xl p-6 border ${prompt.accent ? "border-2 border-hw-secondary/40" : "border-hw-text-light/15"}`}>
      <header className="flex items-start gap-4 mb-4">
        <span className={`shrink-0 w-9 h-9 rounded-full font-bold text-sm flex items-center justify-center ${prompt.accent ? "bg-hw-secondary text-hw-white" : "bg-hw-secondary/15 text-hw-secondary"}`}>
          {prompt.num}
        </span>
        <div>
          <h3 className="font-heading text-hw-dark text-lg leading-snug">{prompt.title}</h3>
          <p className="text-hw-text-light text-xs mt-0.5">{prompt.sub}</p>
        </div>
      </header>
      <pre className="bg-hw-light rounded-lg p-4 text-hw-text text-sm leading-relaxed whitespace-pre-wrap font-mono mb-4 overflow-x-auto">
        <code>{prompt.text}</code>
      </pre>
      <button
        type="button"
        onClick={copy}
        className="btn-secondary text-sm"
      >
        {copied ? "Copied!" : "Copy prompt"}
      </button>
    </article>
  );
}

export default function AIPromptsPage() {
  return (
    <main id="main-content">

      {/* Hero */}
      <section className="bg-hw-dark pt-32 pb-12 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-hw-secondary text-sm font-medium uppercase tracking-widest block mb-4">
            AI Companion · Pairs with the BrandScript
          </span>
          <h1 className="text-hw-light font-heading" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15 }}>
            AI Prompts for Your BrandScript
          </h1>
          <p className="text-hw-light/70 text-lg mt-4 leading-relaxed">
            Copy, paste, and edit. These prompts use AI like an editor — not a replacement — so the words that come out still sound like you.
          </p>
        </div>
      </section>

      {/* How-to */}
      <section className="bg-hw-light px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-hw-dark text-2xl mb-4">How to use this sheet</h2>
          <ol className="space-y-3 text-hw-text leading-relaxed list-decimal list-inside">
            <li>Fill in the <Link href="/resources/brandscript" className="text-hw-secondary hover:underline">BrandScript worksheet</Link> first. These prompts assume you have draft answers.</li>
            <li>Open <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-hw-secondary hover:underline">Claude</a> or <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-hw-secondary hover:underline">ChatGPT</a> in another tab.</li>
            <li>Click any <em>Copy prompt</em> button below, paste into the AI, and replace the <code className="bg-hw-white px-1 rounded text-sm">[bracketed bits]</code> with your actual answers.</li>
            <li>Read the AI&apos;s reply critically. Keep what sounds like you. Toss what doesn&apos;t. <strong>You&apos;re the editor.</strong></li>
          </ol>
          <p className="mt-5 p-4 bg-hw-white rounded-lg border border-hw-primary/20 text-hw-text text-sm leading-relaxed">
            <strong>One rule:</strong> AI is fast at draft #1. It is very bad at sounding like a specific person on the first try. Always rewrite the AI&apos;s output in your own voice before publishing.
          </p>
        </div>
      </section>

      {/* Prompt cards */}
      <section className="bg-hw-light px-6 pb-16">
        <div className="max-w-2xl mx-auto space-y-5">
          {PROMPTS.map((p) => <PromptCard key={p.num} prompt={p} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-hw-white px-6 py-16 text-center">
        <div className="max-w-xl mx-auto">
          <span className="text-hw-secondary text-sm font-medium uppercase tracking-widest block mb-3">Reality Check</span>
          <h2 className="font-heading text-hw-dark mb-3" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
            Now Let&apos;s See If Your Site Actually Says This
          </h2>
          <p className="text-hw-text-light mb-6 leading-relaxed">
            A polished BrandScript and AI-refined copy is half the battle. The other half is whether your current website actually communicates it. Send me your URL — I&apos;ll send back a free, plain-English audit with what to fix first.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/audit" className="btn-primary">Get My Free Audit</Link>
            <a href="https://calendly.com/mpheadley/30min" target="_blank" rel="noopener noreferrer" className="btn-secondary">Schedule a Quick Call</a>
          </div>
        </div>
      </section>

    </main>
  );
}
