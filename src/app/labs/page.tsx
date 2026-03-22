import type { Metadata } from "next";
import { ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Labs — Interactive Web Experiments",
  description:
    "A collection of interactive demos built with GSAP, Three.js, and WebGL. Scroll-driven animation, cursor-reactive 3D particle fields, and generative audio — the kind of work that makes websites memorable.",
  alternates: {
    canonical: "/labs",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Headley Web & SEO",
    url: "/labs",
    images: [
      {
        url: "/images/headley_web_seo_clean-1200-630.webp",
        width: 1200,
        height: 630,
        alt: "Headley Web & SEO — Labs",
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://headleyweb.com" },
    { "@type": "ListItem", position: 2, name: "Labs", item: "https://headleyweb.com/labs" },
  ],
};

const BASE = "https://headley-labs.vercel.app";

const demos = [
  {
    title: "Convergence",
    tag: "Flagship",
    tagColor: "text-hw-primary",
    description:
      "1,800 stars and a journey from chaos to convergence.",
    tech: ["GSAP", "ScrollTrigger", "Three.js", "WebGL", "Web Audio API"],
    href: "/labs/convergence/",
    gradient: "from-[#1a1428] via-[#0f0c1a] to-[#08080f]",
    accent: "rgba(200,169,110,0.15)",
    note: "Move your cursor through the stars. Scroll slowly. Click the sphere.",
  },
  {
    title: "Stardust: Enhanced",
    tag: "Three.js",
    tagColor: "text-hw-secondary",
    description:
      "4,000 gold particles with spring physics. Cursor repels the field; click for a radial explosion that arcs out and floats back. Bloom post-processing makes white particles glow against the dark.",
    tech: ["Three.js", "WebGL", "Spring Physics", "Bloom"],
    href: `${BASE}/stardust/enhanced/`,
    gradient: "from-[#0a0a1a] via-[#0a0a0f] to-[#05050a]",
    accent: "rgba(200,169,110,0.12)",
    note: "Click anywhere to explode.",
  },
  {
    title: "Stardust: Gravity",
    tag: "Three.js",
    tagColor: "text-hw-secondary",
    description:
      "Same particle field, inverted physics. Stars flow toward your cursor instead of fleeing it — held in tension by a spring pulling them home. Click to scatter; gravity immediately pulls them back.",
    tech: ["Three.js", "WebGL", "Attraction Physics"],
    href: `${BASE}/stardust/gravity/`,
    gradient: "from-[#080a1a] via-[#06080f] to-[#04060a]",
    accent: "rgba(144,184,255,0.1)",
    note: "Hold your cursor still and watch them settle.",
  },
  {
    title: "Stardust: Constellation",
    tag: "Three.js",
    tagColor: "text-hw-secondary",
    description:
      "Lines connect nearby particles as they move — a living constellation that shifts with every cursor movement. 3,000 precomputed pairs, updated every frame.",
    tech: ["Three.js", "WebGL", "Constellation Lines"],
    href: `${BASE}/stardust/constellation/`,
    gradient: "from-[#050a14] via-[#04080f] to-[#02050a]",
    accent: "rgba(144,184,255,0.08)",
    note: "Move slowly to see the web form.",
  },
  {
    title: "Stardust: Flip",
    tag: "Three.js",
    tagColor: "text-hw-secondary",
    description:
      "Click to tip the entire particle field 90° on its axis — the field becomes a glowing razor-thin disc edge-on to the viewer, then flips back through. Cursor tilt works in both states.",
    tech: ["Three.js", "WebGL", "3D Rotation"],
    href: `${BASE}/stardust/flip/`,
    gradient: "from-[#0a0a14] via-[#080810] to-[#05050a]",
    accent: "rgba(200,169,110,0.1)",
    note: "Click to flip. Click again to continue.",
  },
  {
    title: "Editorial Parallax",
    tag: "Scrollytelling",
    tagColor: "text-amber-400",
    description:
      "A pinned scroll experience with five photographic panels. Each panel reveals text and drifts at a different rate — the kind of depth that makes editorial sites feel alive.",
    tech: ["GSAP", "ScrollTrigger", "Parallax"],
    href: `${BASE}/editorial-parallax/`,
    gradient: "from-[#1a0d08] via-[#120a06] to-[#0d0805]",
    accent: "rgba(181,97,28,0.12)",
    note: "Scroll slowly through each panel.",
  },
  {
    title: "Bad Art Club",
    tag: "Shipped",
    tagColor: "text-emerald-400",
    description:
      "The party game where terrible drawings win. Draw prompts on your phone, vote on the big screen — no app, no install, 3–16 players. Also includes Hot Take, Pictionary, and Night Falls (hidden roles) modes.",
    tech: ["Node.js", "Express", "Socket.io", "Real-time Multiplayer"],
    href: "https://tv-party-game.onrender.com",
    gradient: "from-[#081a0e] via-[#060f09] to-[#040a06]",
    accent: "rgba(52,211,153,0.1)",
    note: "One TV, everyone's phone. Free, no account needed.",
  },
];

export default function LabsPage() {
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ═══ Hero ═══ */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden bg-hw-dark">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, rgba(200,169,110,0.08) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(107,143,113,0.06) 0%, transparent 50%)",
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block text-xs font-semibold text-hw-primary uppercase tracking-widest mb-4">
            Headley Web &amp; SEO — Labs
          </span>
          <h1 className="text-4xl md:text-6xl font-bold !text-white mb-6 animate-on-scroll">
            Where the interesting{" "}
            <span className="text-hw-primary">stuff lives.</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto animate-on-scroll">
            Experiments in scroll-driven animation, cursor-reactive 3D, and generative audio.
            Built to explore what&apos;s possible — and to show clients what a website can feel like
            when it&apos;s built with real craft.
          </p>
        </div>
      </section>

      {/* ═══ Demos Grid ═══ */}
      <section className="py-16 md:py-24 px-6 bg-hw-dark">
        <div className="max-w-6xl mx-auto">
          {/* Flagship — full width */}
          {demos.filter((d) => d.tag === "Flagship").map((demo) => (
            <a
              key={demo.title}
              href={demo.href}
              className="group block mb-8 rounded-2xl overflow-hidden border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_40px_rgba(200,169,110,0.08)] md:flex"
            >
              {/* Preview */}
              <div
                className={`relative aspect-[16/9] md:aspect-auto md:w-1/2 bg-gradient-to-br ${demo.gradient} flex items-center justify-center border-b md:border-b-0 md:border-r border-white/[0.08] overflow-hidden`}
              >
                <div
                  className="absolute inset-0 opacity-60"
                  style={{ background: `radial-gradient(ellipse at center, ${demo.accent} 0%, transparent 70%)` }}
                />
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-3 group-hover:border-hw-primary/60 transition-colors duration-300">
                    <ExternalLink className="w-6 h-6 text-white/40 group-hover:text-hw-primary transition-colors duration-300" />
                  </div>
                  <p className="text-white/30 text-xs tracking-widest uppercase group-hover:text-white/50 transition-colors duration-300">
                    Open demo
                  </p>
                </div>
                {/* Particle suggestion — CSS dots */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                  {[...Array(18)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-[#c8a96e] opacity-20"
                      style={{
                        width: Math.random() * 3 + 1 + "px",
                        height: Math.random() * 3 + 1 + "px",
                        left: Math.random() * 100 + "%",
                        top: Math.random() * 100 + "%",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="p-8 md:p-10 md:flex md:flex-col md:justify-center bg-white/[0.02]">
                <span className={`text-xs font-semibold uppercase tracking-widest ${demo.tagColor}`}>
                  {demo.tag}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold !text-white mt-2 mb-3">
                  {demo.title}
                </h2>
                <p className="text-white/60 mb-5 leading-relaxed">{demo.description}</p>
                <p className="text-white/30 text-sm italic mb-5">{demo.note}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {demo.tech.map((t) => (
                    <span key={t} className="text-xs bg-white/[0.06] text-white/50 px-3 py-1 rounded-full border border-white/[0.08]">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 text-hw-primary text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                  Open demo <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </a>
          ))}

          {/* Rest — 2-column grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {demos.filter((d) => d.tag !== "Flagship").map((demo) => (
              <a
                key={demo.title}
                href={demo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl overflow-hidden border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(107,143,113,0.08)] bg-white/[0.02]"
              >
                {/* Preview */}
                <div
                  className={`relative aspect-[16/7] bg-gradient-to-br ${demo.gradient} flex items-center justify-center border-b border-white/[0.08] overflow-hidden`}
                >
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{ background: `radial-gradient(ellipse at center, ${demo.accent} 0%, transparent 70%)` }}
                  />
                  <div className="relative z-10 flex items-center gap-2 text-white/30 group-hover:text-white/50 transition-colors duration-300">
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-xs tracking-widest uppercase">Open demo</span>
                  </div>
                  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute rounded-full bg-[#c8a96e] opacity-15"
                        style={{
                          width: Math.random() * 2 + 1 + "px",
                          height: Math.random() * 2 + 1 + "px",
                          left: Math.random() * 100 + "%",
                          top: Math.random() * 100 + "%",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <span className={`text-xs font-semibold uppercase tracking-widest ${demo.tagColor}`}>
                    {demo.tag}
                  </span>
                  <h2 className="text-lg font-bold !text-white mt-1 mb-2">{demo.title}</h2>
                  <p className="text-white/55 text-sm mb-3 leading-relaxed">{demo.description}</p>
                  <p className="text-white/25 text-xs italic mb-4">{demo.note}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {demo.tech.map((t) => (
                      <span key={t} className="text-xs bg-white/[0.05] text-white/40 px-2.5 py-0.5 rounded-full border border-white/[0.06]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-hw-secondary text-sm font-semibold group-hover:gap-2.5 transition-all duration-200">
                    Open demo <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Context ═══ */}
      <section className="py-20 px-6 bg-hw-dark border-t border-white/[0.06]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-white/40 text-sm leading-relaxed mb-6">
            These experiments are how I stay sharp between client projects — and how I show clients
            what&apos;s possible before they ask. If something here caught your eye for a project,
            let&apos;s talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Start a conversation <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/portfolio" className="btn-secondary">
              <Sparkles className="w-4 h-4 mr-2" />
              See client work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
