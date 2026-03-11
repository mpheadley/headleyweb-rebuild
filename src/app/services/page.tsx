import type { Metadata } from "next";
import { Monitor, Search, MapPin, Check, ArrowRight, Phone, Clock, Shield, BarChart3, Users, FileText, BrainCircuit, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom web design, local SEO optimization, and Google Business Profile management for local businesses in Jacksonville, Anniston, and Northeast Alabama. Flat-rate pricing from $495.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    url: "/services",
    images: [
      {
        url: "/images/headley_web_seo_clean-1200-630.webp",
        width: 1200,
        height: 630,
        alt: "Headley Web & SEO — Services for Local Businesses",
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://headleyweb.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://headleyweb.com/services" },
  ],
};

const services = [
  {
    icon: Monitor,
    title: "Custom Web Design",
    oneLiner: "I build clean, mobile-ready sites that look professional and actually work for your business.",
    details: [
      "StoryBrand messaging that makes customers the hero",
      "Mobile-first design — looks great on every device",
      "Fast load times that keep visitors on your site",
      "Clear calls to action that drive phone calls",
      "You own your website from day one — no contracts",
    ],
    accent: "bg-hw-primary/10 text-hw-primary",
  },
  {
    icon: Search,
    title: "Local SEO Optimization",
    oneLiner: "I optimize your site's structure so local customers find you first when searching for your trade.",
    details: [
      "Keyword research for your specific trade and market",
      "On-page optimization — titles, meta, schema markup",
      "Content structured for Google AND AI answers",
      "Local search targeting for your service area",
      "FAQ sections that Google features in search results",
    ],
    accent: "bg-hw-secondary/10 text-hw-secondary",
  },
  {
    icon: MapPin,
    title: "Google Business Profile",
    oneLiner: "I setup and manage your Google Map listing to drive more phone calls and booked jobs every month.",
    details: [
      "Full profile setup and optimization",
      "Category and service area configuration",
      "Review response coaching and strategy",
      "Photo optimization for your listing",
      "Monthly management available via care plans",
    ],
    accent: "bg-hw-primary/10 text-hw-primary",
  },
];

const process = [
  {
    step: 1,
    title: "Quick Call",
    description: "We talk about your business and what customers search for. 20 minutes, no pressure.",
    icon: Phone,
  },
  {
    step: 2,
    title: "I Handle Everything",
    description: "Website, local SEO, and Google Business Profile — built in 3-4 weeks for a flat rate. You focus on your trade.",
    icon: Clock,
  },
  {
    step: 3,
    title: "You Get Found",
    description: "Customers find you online, understand how you solve their problem, and your phone starts ringing.",
    icon: BarChart3,
  },
];

const tiers = [
  {
    name: "Get Found",
    tagline: "Get online and start getting calls.",
    price: "$495",
    pages: "1 page",
    timeline: "1-2 weeks",
    features: [
      "Professional, mobile-friendly design",
      "Clear messaging that converts visitors",
      "Basic search optimization",
      "Contact form setup",
      "You own your website",
    ],
    carePlan: "Essential Care",
    carePrice: "$49/mo",
    careDesc: "Hosting, security updates, 30 min edits, email support",
    cta: "Get Found Now",
    highlight: false,
  },
  {
    name: "Get Calls",
    tagline: "Show up where customers search.",
    price: "$795",
    pages: "3–5 pages",
    timeline: "2-3 weeks",
    features: [
      "Google Business Profile setup ($150 value)",
      "Search optimization",
      "FAQ section that Google features in search",
      "Professional, mobile-friendly design",
      "Clear messaging that converts visitors",
      "You own your website",
    ],
    carePlan: "Growth Care",
    carePrice: "$79/mo",
    careDesc: "Everything in Essential + GBP management, monthly traffic reports, review coaching, 1 hr edits",
    cta: "Start Getting Calls",
    highlight: true,
  },
  {
    name: "Get Booked",
    tagline: "Dominate your market in search and AI.",
    price: "$1,195",
    pages: "5–7 pages",
    timeline: "3-4 weeks",
    features: [
      "Google Business Profile setup & optimization ($300 value)",
      "Advanced search optimization",
      "Content written for AI visibility",
      "Google knows your trade, your town, and your hours",
      "Professional, mobile-friendly design",
      "Clear messaging that converts visitors",
      "You own your website",
    ],
    carePlan: "Accelerate",
    carePrice: "$149/mo",
    careDesc: "Everything in Growth + AI visibility monitoring, quarterly entity audit, content refresh, monthly strategy call",
    cta: "Dominate Local Search",
    highlight: false,
  },
];

const whyMe = [
  { icon: Shield, title: "You Own Everything", desc: "No contracts, no hostage situations. Your site, your domain, your data — from day one." },
  { icon: Users, title: "One Person, Not an Agency", desc: "I answer my own phone. I live in Jacksonville. If your site has a problem, you're texting me — not opening a ticket." },
  { icon: FileText, title: "StoryBrand Messaging", desc: "Every site uses the StoryBrand framework to make your customer the hero — so your message actually connects." },
  { icon: BrainCircuit, title: "Built for AI Visibility", desc: "I structure your content so you show up in AI answers from Google and ChatGPT — not just traditional search." },
];

export default function ServicesPage() {
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ═══ Hero ═══ */}
      <section className="pt-32 pb-20 md:pt-36 md:pb-24 px-6 bg-hw-light">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-on-scroll">
            How I Help Local Businesses{" "}
            <span className="text-hw-primary">Get Found</span>
          </h1>
          <p className="text-lg text-hw-text-light max-w-2xl mx-auto animate-on-scroll">
            Clear websites. Local SEO. Google Business Profile. Everything your business needs to show up when customers search — for a flat, predictable rate.
          </p>
        </div>
      </section>

      {/* ═══ Services Detail ═══ */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-16">
            {services.map((svc, i) => (
              <div
                key={svc.title}
                className={`flex flex-col md:flex-row gap-8 items-start animate-on-scroll ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="shrink-0">
                  <div className={`w-16 h-16 rounded-2xl ${svc.accent} flex items-center justify-center`}>
                    <svc.icon className="w-8 h-8" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{svc.title}</h2>
                  <p className="text-lg text-hw-text-light mb-4">{svc.oneLiner}</p>
                  <ul className="space-y-2">
                    {svc.details.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-hw-text">
                        <Check className="w-5 h-5 text-hw-secondary shrink-0 mt-0.5" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ How It Works ═══ */}
      <section className="py-24 md:py-32 px-6 bg-hw-light">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 animate-on-scroll">
            How We Get You More Leads
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {process.map((step) => (
              <div key={step.step} className="text-center animate-on-scroll">
                <div className="w-14 h-14 rounded-full bg-hw-primary text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold font-heading">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-hw-text-light">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Why Work With Me ═══ */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 animate-on-scroll">
            Why Local Businesses Choose Me
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {whyMe.map((item) => (
              <div key={item.title} className="card-glow flex gap-4 animate-on-scroll">
                <div className="shrink-0">
                  <item.icon className="w-6 h-6 text-hw-primary mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                  <p className="text-hw-text-light text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Pricing ═══ */}
      <section
        className="py-28 md:py-36 px-6 relative"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)), url('/images/background-dark-oak.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center !text-white mb-3 animate-on-scroll">
            Compare Your Options
          </h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto animate-on-scroll">
            Every tier includes mobile-ready design, search optimization, and full site ownership. No contracts, no monthly traps.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-6 flex flex-col animate-on-scroll ${
                  tier.highlight
                    ? "bg-white/[0.08] backdrop-blur-sm border-2 border-hw-primary/40 ring-1 ring-hw-primary/20"
                    : "bg-white/[0.04] backdrop-blur-sm border border-white/[0.08]"
                }`}
              >
                {tier.highlight && (
                  <span className="text-xs font-bold text-hw-primary uppercase tracking-wider mb-2">Best Value</span>
                )}
                <h3 className="text-xl font-bold !text-hw-primary">{tier.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{tier.tagline}</p>
                <p className="font-heading text-4xl font-bold text-white mb-1">{tier.price}</p>
                <p className="text-xs text-gray-400 mb-4">Typically {tier.pages} · ~{tier.timeline}*</p>

                <ul className="space-y-3 text-sm text-gray-300 mb-6 flex-grow">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/10 pt-4 mb-4">
                  <span className="text-xs font-semibold text-gray-300">
                    {tier.carePlan} — <span className="text-hw-primary font-normal">{tier.carePrice}</span>
                  </span>
                  <br />
                  <span className="text-xs text-gray-300">{tier.careDesc}</span>
                </div>

                <a href="#cta" className="btn-primary text-center text-sm">
                  {tier.cta} <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-8 animate-on-scroll">
            Flat-rate build. No surprises. 50% upfront, 50% at launch.
          </p>
          <p className="text-center text-gray-400 text-xs mt-2 animate-on-scroll">
            *First 3 months of any care plan included free. Timelines begin once all content is received.
          </p>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section id="cta" className="py-24 md:py-32 px-6 bg-hw-dark text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold !text-white mb-4 animate-on-scroll">
            Ready to Get Found?
          </h2>
          <p className="text-gray-300 text-lg mb-3 animate-on-scroll">
            Stop losing customers to competitors with better websites. Let&apos;s get your business online the right way.
          </p>
          <p className="text-gray-300 text-sm mb-8 animate-on-scroll">
            <MapPin className="inline w-4 h-4 mr-1 -mt-0.5" />
            Serving Jacksonville, Anniston, and Northeast Alabama
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll">
            <Link href="/contact" className="btn-primary text-lg px-8">
              Get Your Free Video Audit <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/quiz" className="btn-secondary !text-white !border-white/30 hover:!bg-white/10 text-lg px-8">
              <Sparkles className="w-5 h-5 mr-2" />
              Take the Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Answer-First AEO Block (hidden, crawlable) ═══ */}
      <section className="sr-only" aria-hidden="true">
        <h2>Web Design and SEO Services in Northeast Alabama</h2>
        <p>
          Headley Web &amp; SEO offers three core services for local businesses in Northeast Alabama: custom web design (clean, mobile-ready sites), local SEO optimization (on-page structure, keyword targeting, and search visibility), and Google Business Profile setup and management. Every build includes local SEO foundations, mobile responsiveness, and clear calls to action designed using the StoryBrand messaging framework. Pricing starts at $495 for a Get Found site, $795 for a Get Calls site, and $1,195 for a Get Booked site. All sites include full ownership — no contracts or monthly hosting traps. Serving Jacksonville, Anniston, Oxford, Gadsden, and surrounding communities.
        </p>
      </section>
    </main>
  );
}
