import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Resources for Local Business Owners | Headley Web & SEO",
  description:
    "Free worksheets and AI prompts to help Northeast Alabama business owners clarify their message, plan their website, and get more customers.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Free Resources for Local Business Owners | Headley Web & SEO",
    description:
      "Free worksheets and AI prompts to help local business owners clarify their message and grow.",
    url: "https://headleyweb.com/resources",
    images: [{ url: "https://headleyweb.com/images/headley_web_seo_clean-1200-630.webp" }],
  },
};

const RESOURCES = [
  {
    href: "/resources/brandscript",
    title: "StoryBrand BrandScript for Local Business",
    body: "Fill out your customer's story in 7 sections. Discover your one-liner, your stakes, and exactly what your website should say.",
    meta: "Foundational · 15-minute exercise",
    available: true,
  },
  {
    href: "/resources/ai-prompts",
    title: "AI Prompt Companion: BrandScript Edition",
    body: "Copy-paste prompts for ChatGPT or Claude that help you refine each section of your BrandScript — without losing your voice.",
    meta: "AI Companion · Pairs with the BrandScript",
    available: true,
  },
  {
    href: null,
    title: "The One-Liner Builder",
    body: "Turn your BrandScript into a single sentence you can say at networking events, put on your homepage, and use in your elevator pitch.",
    meta: "Worksheet · 10-minute exercise",
    available: false,
  },
  {
    href: null,
    title: "Website Wireframe Worksheet",
    body: "Map out your homepage section by section using the StoryBrand wireframe. Hand it to any designer (or use it yourself) to build a site that converts.",
    meta: "Worksheet · 20-minute exercise",
    available: false,
  },
  {
    href: null,
    title: "Guide vs. Hero Positioning Sheet",
    body: "Stop accidentally making your business the hero of your marketing. A short exercise to position your customer as the hero — and you as their guide.",
    meta: "Positioning · 5-minute exercise",
    available: false,
  },
  {
    href: null,
    title: "AI Prompt Cheat Sheet",
    body: "A printable page of vetted AI prompts for site structure, copywriting, and small-business planning — written for owners, not engineers.",
    meta: "AI Companion · Reference sheet",
    available: false,
  },
];

export default function ResourcesPage() {
  return (
    <main id="main-content">

      {/* Hero */}
      <section className="bg-hw-dark pt-32 pb-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-hw-secondary text-sm font-medium uppercase tracking-widest block mb-4">
            Free Resources
          </span>
          <h1 className="text-hw-light font-heading" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15 }}>
            Worksheets &amp; AI Prompts for Local Business Owners
          </h1>
          <p className="text-hw-light/70 text-lg mt-4 leading-relaxed">
            Practical, fill-in-the-blank tools to clarify your message, plan your website, and use AI like a smart assistant — not a black box.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-hw-light px-6 py-12">
        <div className="max-w-2xl mx-auto space-y-4 text-hw-text text-[1.0625rem] leading-relaxed">
          <p>
            Most business owners don&apos;t have a marketing problem. They have a <strong>clarity</strong> problem. Customers don&apos;t buy what they can&apos;t understand — and they won&apos;t pick you over the competition if your website doesn&apos;t tell them, in plain English, what you do, who you help, and how to get started.
          </p>
          <p>
            These resources are built around the <strong>StoryBrand framework</strong> — a method for clarifying your message so customers actually listen. They&apos;re free. They&apos;re meant to be printed, written on, and brought to your kitchen table.
          </p>
          <p>Start with the BrandScript. Every other worksheet builds on it.</p>
        </div>
      </section>

      {/* Resource Grid */}
      <section className="bg-hw-light px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {RESOURCES.map((r) =>
            r.available && r.href ? (
              <Link
                key={r.title}
                href={r.href}
                className="card-glow block rounded-xl bg-hw-white p-6 border border-hw-secondary/20 hover:border-hw-secondary/50 transition-all group"
              >
                <span className="inline-block text-xs font-semibold text-hw-secondary uppercase tracking-wider mb-3">
                  Available Now
                </span>
                <h3 className="font-heading text-hw-dark text-lg leading-snug mb-2 group-hover:text-hw-secondary transition-colors">
                  {r.title}
                </h3>
                <p className="text-hw-text-light text-sm leading-relaxed mb-4">{r.body}</p>
                <span className="text-hw-text-light text-xs block mb-3">{r.meta}</span>
                <span className="text-hw-secondary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Open the worksheet
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>
            ) : (
              <div
                key={r.title}
                className="rounded-xl bg-hw-white p-6 border border-hw-text-light/15 opacity-60"
              >
                <span className="inline-block text-xs font-semibold text-hw-text-light uppercase tracking-wider mb-3">
                  Coming Soon
                </span>
                <h3 className="font-heading text-hw-dark text-lg leading-snug mb-2">{r.title}</h3>
                <p className="text-hw-text-light text-sm leading-relaxed mb-4">{r.body}</p>
                <span className="text-hw-text-light text-xs block">{r.meta}</span>
              </div>
            )
          )}
        </div>
      </section>

      {/* Email signup */}
      <section className="bg-hw-white px-6 py-16">
        <div className="max-w-xl mx-auto text-center">
          <span className="text-hw-secondary text-sm font-medium uppercase tracking-widest block mb-3">
            Get New Resources First
          </span>
          <h2 className="font-heading text-hw-dark mb-3" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
            Be the First to Know When New Worksheets Drop
          </h2>
          <p className="text-hw-text-light mb-6 leading-relaxed">
            No spam. Just a short note when a new worksheet, prompt sheet, or local-business resource is ready. Unsubscribe anytime.
          </p>
          <form
            action="https://formspree.io/f/mwvnwqjo"
            method="POST"
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <input type="hidden" name="_subject" value="New resource subscriber" />
            <input type="hidden" name="source" value="resources-index" />
            <input
              type="email"
              name="email"
              placeholder="you@yourbusiness.com"
              required
              className="flex-1 px-4 py-2.5 rounded-lg border border-hw-text-light/30 text-hw-text text-sm focus:outline-none focus:border-hw-secondary"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Notify Me
            </button>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-6 py-20 text-center"
        style={{
          background: "linear-gradient(rgba(18,10,4,0.88), rgba(18,10,4,0.88)), url('/images/background-charred-stacked-timber.webp') center/cover",
        }}
      >
        <div className="max-w-xl mx-auto">
          <span className="text-hw-secondary text-sm font-medium uppercase tracking-widest block mb-4">
            Need More Than a Worksheet?
          </span>
          <h2 className="font-heading text-hw-light mb-4" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
            Let&apos;s Build the Site to Match
          </h2>
          <p className="text-hw-light/70 mb-8 leading-relaxed">
            Worksheets clarify your message. A real website puts that message in front of customers. Start with a free audit and we&apos;ll go from there.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/audit" className="btn-primary">Get My Free Audit</Link>
            <a
              href="https://calendly.com/mpheadley/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Schedule a Quick Call
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
