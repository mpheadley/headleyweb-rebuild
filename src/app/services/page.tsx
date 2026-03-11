import type { Metadata } from "next";
import { Monitor, Search, MapPin, Check, ArrowRight, Video, Clock, Shield, BarChart3, Users, FileText, BrainCircuit, Sparkles } from "lucide-react";
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
    title: "Request Your Free Checkup",
    description: "Take the quiz or fill out the form. I'll record a personalized video showing exactly where you stand online.",
    icon: Video,
  },
  {
    step: 2,
    title: "I Build Your System",
    description: "Based on what I find, I build your website, local SEO, and Google Business Profile — flat rate, no surprises.",
    icon: Clock,
  },
  {
    step: 3,
    title: "Your Phone Starts Ringing",
    description: "Customers find you, call you, and book you. You get found online and get back to the work you love.",
    icon: BarChart3,
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
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 px-6 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center ken-burns-subtle"
          style={{ backgroundImage: "url('/images/google-map-review.webp')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(28,40,38,0.92)] via-[rgba(28,40,38,0.85)] to-[rgba(28,40,38,0.95)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 !text-white animate-on-scroll">
            How I Help Your Business{" "}
            <span className="text-hw-primary">Get Found</span>
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto animate-on-scroll">
            Clear websites. Local SEO. Google Business Profile. Everything your business needs to show up when customers search — for a flat, predictable rate.
          </p>
        </div>
      </section>

      {/* ═══ Services Detail ═══ */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-3 animate-on-scroll">What I Do</p>
            <h2 className="text-3xl md:text-4xl font-bold animate-on-scroll">Three Services, One Goal</h2>
            <p className="text-hw-text-light mt-4 max-w-2xl mx-auto animate-on-scroll">Each one designed to put your business in front of customers who are already searching for what you do.</p>
          </div>
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
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-3 animate-on-scroll">The Plan</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-16 animate-on-scroll">
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
          <p className="text-hw-secondary font-semibold text-sm tracking-widest uppercase mb-3 text-center animate-on-scroll">Why Me</p>
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
        className="relative py-28 md:py-36 px-6 overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 15%, rgba(0,0,0,0.55) 85%, rgba(0,0,0,0.82) 100%), url('/images/background-dark-oak.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-3 animate-on-scroll">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold !text-white animate-on-scroll">
              Compare Your Options
            </h2>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto animate-on-scroll">
              Every tier includes mobile-ready design, search optimization, and full site ownership.
              You own your website from day one — no contracts, no monthly traps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {/* Get Found */}
            <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8 flex flex-col transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(224,123,60,0.1)] animate-on-scroll" style={{ transitionDelay: "0s" }}>
              <h3 className="text-base font-bold !text-hw-primary uppercase tracking-wider mb-1">Get Found</h3>
              <p className="font-heading text-[42px] font-extrabold !text-white mb-2">$495</p>
              <p className="text-xs text-gray-300 uppercase tracking-wide mb-4">one-time</p>
              <p className="text-sm text-white italic border-l-3 border-hw-primary pl-3 mb-3">
                Get online. Get visible. Get found.
              </p>
              <p className="text-xs text-gray-400 mb-5">Typically 1 page · ~1–2 weeks*</p>
              <ul className="space-y-3 text-sm text-gray-300 mb-6 flex-grow">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                  Professional, mobile-friendly design
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                  Clear messaging that converts visitors
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                  Basic search optimization
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                  Contact form setup
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                  You own your website
                </li>
                <li className="flex items-start gap-2 text-gray-400 line-through">
                  Google Business Profile setup
                </li>
              </ul>
              <div className="flex flex-col gap-1 py-4 border-t border-white/[0.07] mb-5">
                <span className="text-xs font-semibold text-gray-300">Essential Care — <span className="text-hw-primary font-normal">$49/mo</span></span>
                <span className="text-xs text-gray-300">Hosting, security, &amp; minor updates</span>
                <span className="text-xs text-hw-primary font-semibold">First 3 months included, cancel anytime</span>
              </div>
              <Link href="/contact" className="btn-primary w-full text-center">Get Started</Link>
            </div>

            {/* Get Calls — Best Value */}
            <div className="bg-hw-primary/[0.07] backdrop-blur-sm border border-hw-primary/30 rounded-2xl p-8 flex flex-col relative transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(224,123,60,0.15)] animate-on-scroll" style={{ transitionDelay: "0.12s" }}>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-hw-primary text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Best Value
              </span>
              <h3 className="text-base font-bold !text-hw-primary uppercase tracking-wider mb-1">Get Calls</h3>
              <p className="font-heading text-[42px] font-extrabold !text-white mb-2">$795</p>
              <p className="text-xs text-gray-300 uppercase tracking-wide mb-4">one-time</p>
              <p className="text-sm text-white italic border-l-3 border-hw-primary pl-3 mb-3">
                Show up in search. Start getting calls.
              </p>
              <p className="text-xs text-gray-400 mb-5">Typically 3–5 pages · ~2–3 weeks*</p>
              <ul className="space-y-3 text-sm text-gray-300 mb-6 flex-grow">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                  Google Business Profile setup
                  <span className="text-hw-primary text-xs font-semibold">($150 value)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                  Search optimization
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                  FAQ section that Google features in search
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                  Professional, mobile-friendly design
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                  Clear messaging that converts visitors
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                  You own your website
                </li>
              </ul>
              <div className="flex flex-col gap-1 py-4 border-t border-white/[0.07] mb-5">
                <span className="text-xs font-semibold text-gray-300">Growth Care — <span className="text-hw-primary font-normal">$79/mo</span></span>
                <span className="text-xs text-gray-300">Essential + monthly traffic reports</span>
                <span className="text-xs text-hw-primary font-semibold">First 3 months included, cancel anytime</span>
              </div>
              <Link href="/contact" className="btn-primary w-full text-center">Get Started</Link>
            </div>

            {/* Get Booked */}
            <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8 flex flex-col transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(224,123,60,0.1)] animate-on-scroll" style={{ transitionDelay: "0.24s" }}>
              <h3 className="text-base font-bold !text-hw-primary uppercase tracking-wider mb-1">Get Booked</h3>
              <p className="font-heading text-[42px] font-extrabold !text-white mb-2">$1,195</p>
              <p className="text-xs text-gray-300 uppercase tracking-wide mb-4">one-time</p>
              <p className="text-sm text-white italic border-l-3 border-hw-primary pl-3 mb-3">
                Dominate local search. Stay booked solid.
              </p>
              <p className="text-xs text-gray-400 mb-5">Typically 5–7 pages · ~3–4 weeks*</p>
              <ul className="space-y-3 text-sm text-gray-300 mb-6 flex-grow">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                  Google Business Profile setup &amp; optimization
                  <span className="text-hw-primary text-xs font-semibold">($300 value)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                  Advanced search optimization
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                  Content written for AI visibility
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                  Google knows your trade, your town, and your hours
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                  Professional, mobile-friendly design
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                  Clear messaging that converts visitors
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                  You own your website
                </li>
              </ul>
              <div className="flex flex-col gap-1 py-4 border-t border-white/[0.07] mb-5">
                <span className="text-xs font-semibold text-gray-300">Accelerate — <span className="text-hw-primary font-normal">$149/mo</span></span>
                <span className="text-xs text-gray-300">Growth + AI visibility &amp; strategy</span>
                <span className="text-xs text-hw-primary font-semibold">First 3 months included, cancel anytime</span>
              </div>
              <Link href="/contact" className="btn-primary w-full text-center">Get Started</Link>
            </div>
          </div>

          <p className="text-center text-gray-400 text-sm mt-8 animate-on-scroll">
            Flat-rate build. No surprises. 50% upfront, 50% at launch.
          </p>
          <p className="text-center text-gray-400 text-xs mt-2 animate-on-scroll">
            *Timelines begin once all content (text, photos, logos) is received.
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
              Get Your Free Site Checkup <ArrowRight className="w-5 h-5 ml-2" />
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
          Headley Web <span style={{ fontFamily: "'Playfair Display', serif" }}>&amp;</span> SEO offers three core services for local businesses in Northeast Alabama: custom web design (clean, mobile-ready sites), local SEO optimization (on-page structure, keyword targeting, and search visibility), and Google Business Profile setup and management. Every build includes local SEO foundations, mobile responsiveness, and clear calls to action designed using the StoryBrand messaging framework. Pricing starts at $495 for a Get Found site, $795 for a Get Calls site, and $1,195 for a Get Booked site. All sites include full ownership — no contracts or monthly hosting traps. Serving Jacksonville, Anniston, Oxford, Gadsden, and surrounding communities.
        </p>
      </section>
    </main>
  );
}
