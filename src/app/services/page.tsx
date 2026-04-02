import type { Metadata } from "next";
import { Monitor, Search, MapPin, Check, ArrowRight, Shield, Users, FileText, BrainCircuit, Sparkles, TrendingUp, CalendarCheck, Zap, MessageSquare, BarChart2, HelpCircle, BookOpen, Navigation, Bot, Star, Globe, type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

type LucideIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;
const buildIconMap: Record<string, LucideIcon> = { Monitor, MessageSquare, BarChart2, MapPin, Shield, Search, HelpCircle, BookOpen, Navigation, Bot, Star, Globe };
import { buildTiers, carePlans } from "@/app/data/pricing";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom web design, local SEO, Google Business Profile management, monthly care plans, and AI visibility for local businesses in Northeast Alabama. Flat-rate pricing from $495.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Headley Web & SEO",
    url: "/services",
    images: [
      {
        url: "/images/headley_web_seo_clean-1200-630.webp",
        width: 1200,
        height: 630,
        alt: "Headley Web & SEO: Services for Local Businesses",
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

const areaServed = [
  { "@type": "City", name: "Jacksonville", addressRegion: "AL", addressCountry: "US" },
  { "@type": "City", name: "Anniston", addressRegion: "AL", addressCountry: "US" },
  { "@type": "City", name: "Oxford", addressRegion: "AL", addressCountry: "US" },
  { "@type": "City", name: "Gadsden", addressRegion: "AL", addressCountry: "US" },
  { "@type": "City", name: "Talladega", addressRegion: "AL", addressCountry: "US" },
  { "@type": "City", name: "Centre", addressRegion: "AL", addressCountry: "US" },
  { "@type": "AdministrativeArea", name: "Calhoun County", addressRegion: "AL", addressCountry: "US" },
  { "@type": "AdministrativeArea", name: "Etowah County", addressRegion: "AL", addressCountry: "US" },
  { "@type": "AdministrativeArea", name: "Cherokee County", addressRegion: "AL", addressCountry: "US" },
  { "@type": "AdministrativeArea", name: "Talladega County", addressRegion: "AL", addressCountry: "US" },
];

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Web Design & SEO Services for Local Businesses | Headley Web & SEO",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["[data-speakable='true']", "h1"],
  },
};

const serviceFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a small business website cost?",
      acceptedAnswer: { "@type": "Answer", text: "A professional small business website from Headley Web & SEO costs between $495 and $1,995 as a one-time flat rate. The Get Found plan ($495) is a single-page site with clear messaging and mobile-friendly design. Get Calls ($1,495) adds 3-5 pages with search optimization and FAQ sections. Get Booked ($1,995) is a full 5-7 page site with advanced SEO, AI visibility, and structured data. Every plan includes Google Business Profile setup, and you own your website from day one. No contracts." },
    },
    {
      "@type": "Question",
      name: "What is local SEO and why does my business need it?",
      acceptedAnswer: { "@type": "Answer", text: "Local SEO is the process of optimizing your website and online presence so customers in your area find you when they search for your services. It includes on-page optimization (titles, meta descriptions, schema markup), Google Business Profile management, and content structured around the specific trades and towns you serve. Without local SEO, even a great-looking website won't generate phone calls." },
    },
    {
      "@type": "Question",
      name: "What is AI visibility and how does it help my business?",
      acceptedAnswer: { "@type": "Answer", text: "AI visibility means structuring your website so AI tools like Google AI Overviews, ChatGPT, and Perplexity can read, understand, and recommend your business. Over 80% of Google searches now end without a click. AI visibility includes answer-first content, schema markup that AI parsers trust, and entity optimization so AI knows your trade, your town, and your hours." },
    },
    {
      "@type": "Question",
      name: "I already have a website. Do we have to start from scratch?",
      acceptedAnswer: { "@type": "Answer", text: "Not always. Sometimes a renovation beats a rebuild. I'll take an honest look at what you've got and tell you whether it's worth saving or if we're better off starting fresh. No hard sell either way." },
    },
    {
      "@type": "Question",
      name: "How long does a website project take?",
      acceptedAnswer: { "@type": "Answer", text: "3-4 weeks from 'let's do it' to 'holy cow that's my website.' The biggest variable is usually how fast we can round up your photos and business info. I'll tell you exactly what I need so nothing holds us up." },
    },
    {
      "@type": "Question",
      name: "What happens if I need edits after launch?",
      acceptedAnswer: { "@type": "Answer", text: "First 30 days of tweaks are on me. After that, optional care plans start at $49/mo if you want ongoing help — or you can just call me when something comes up. I'm not going to leave you hanging." },
    },
    {
      "@type": "Question",
      name: "How does payment work?",
      acceptedAnswer: { "@type": "Answer", text: "Half upfront, half when the site goes live. That's it. No retainer, no auto-billing surprises, no 'processing fees' that magically appear." },
    },
    {
      "@type": "Question",
      name: "What makes you different from a big agency?",
      acceptedAnswer: { "@type": "Answer", text: "A big agency puts you on a project board and assigns you to whoever's free. I'm one person. I answer my own phone. I live in Jacksonville. If your website has a problem, you're not opening a support ticket — you're texting me." },
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Web Design and Local SEO",
  provider: {
    "@type": "ProfessionalService",
    name: "Headley Web & SEO",
    url: "https://headleyweb.com",
    telephone: "+1-256-644-7334",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jacksonville",
      addressRegion: "AL",
      postalCode: "36265",
      addressCountry: "US",
    },
  },
  areaServed,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Design & SEO Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Custom Web Design",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Get Found: Single-Page Website",
              description: "Professional, mobile-friendly single-page website with clear messaging, basic search optimization, contact form setup, and Google Business Profile setup. You own your website from day one.",
              areaServed,
            },
            price: "495",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Get Calls: Multi-Page Website",
              description: "3-5 page website with search optimization, FAQ sections featured in Google search results, professional mobile-friendly design, clear messaging that converts visitors, and Google Business Profile setup.",
              areaServed,
            },
            price: "795",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Get Booked: Full SEO Website",
              description: "5-7 page website with advanced search optimization, content written for AI visibility, structured data so Google knows your trade and town, professional design, and full Google Business Profile setup and optimization.",
              areaServed,
            },
            price: "1195",
            priceCurrency: "USD",
          },
        ],
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Local SEO Optimization",
          description: "Keyword research for your specific trade and market, on-page optimization including titles, meta tags, and schema markup, content structured for Google and AI answers, local search targeting for your service area, and FAQ sections that Google features in search results.",
          areaServed,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Google Business Profile Setup & Management",
          description: "Full Google Business Profile setup and optimization including category and service area configuration, review response coaching and strategy, photo optimization, and monthly management available via care plans.",
          areaServed,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Monthly Website Care Plans",
          description: "Optional ongoing care plans included free for 3 months with every build. Essential Care ($49/mo): hosting, security, and up to 30 min of edits/month. Growth Care ($99/mo): adds Google Business Profile management and monthly results report. Accelerate ($199/mo): adds 2 blog posts/month, monthly strategy call, and AI visibility monitoring.",
          areaServed,
        },
      },
    ],
  },
};

const services = [
  {
    icon: Monitor,
    title: "Custom Web Design",
    oneLiner: "I build clean, mobile-ready sites that look professional and actually work for your business.",
    details: [
      "StoryBrand messaging that makes customers the hero",
      "Mobile-first design that looks great on every device",
      "Fast load times that keep visitors on your site",
      "Clear calls to action that drive phone calls",
      "You own your website from day one. No contracts",
    ],
    accent: "bg-hw-primary/10 text-hw-primary",
  },
  {
    icon: Search,
    title: "Local SEO Optimization",
    oneLiner: "I optimize your site's structure so local customers find you first when searching for your trade.",
    details: [
      "Keyword research for your specific trade and market",
      "On-page optimization: titles, meta, schema markup",
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
      "Ongoing management included in Growth Care & Accelerate plans",
    ],
    accent: "bg-hw-primary/10 text-hw-primary",
  },
];


const whyMe = [
  { icon: Shield, title: "You Own Everything", desc: "No contracts, no hostage situations. Your site, your domain, your data. From day one." },
  { icon: Users, title: "One Person, Not an Agency", desc: "I answer my own phone. I live in Jacksonville. If your site has a problem, you're texting me, not opening a ticket." },
  { icon: FileText, title: "StoryBrand Messaging", desc: "Every site uses the StoryBrand framework to make your customer the hero, so your message actually connects." },
  { icon: BrainCircuit, title: "Built for AI Visibility", desc: "I structure your content so you show up in AI answers from Google and ChatGPT, not just traditional search." },
];

export default function ServicesPage() {
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
            How I Help Local Businesses{" "}
            <span className="text-hw-primary hand-accent">Get Found</span>
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto animate-on-scroll">
            Clear websites. Local SEO. Google Business Profile. Everything your business needs to show up when customers search, for a flat, predictable rate.
          </p>
        </div>
      </section>

      {/* ═══ Services Detail ═══ */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-3 animate-on-scroll">What I Do</p>
            <h2 className="text-3xl md:text-4xl font-bold animate-on-scroll">Every Service, One Goal</h2>
            <p className="text-hw-text-light mt-4 max-w-2xl mx-auto animate-on-scroll">Put your business in front of customers who are already searching for what you do, and keep it there.</p>
          </div>
          <div className="space-y-16">
            {services.map((svc) => (
              <div
                key={svc.title}
                className="flex flex-col md:flex-row gap-8 items-start animate-on-scroll"
              >
                <div className="shrink-0">
                  <div className={`w-20 h-20 rounded-2xl ${svc.accent} flex items-center justify-center`}>
                    <svc.icon className="w-10 h-10" />
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

          {/* Brief pointers to ongoing services */}
          <div className="mt-16 grid sm:grid-cols-2 gap-6 animate-on-scroll">
            <div className="flex items-start gap-4">
              <CalendarCheck className="w-6 h-6 text-hw-secondary shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Monthly Care &amp; Growth</h3>
                <p className="text-hw-text-light text-sm">Hosting, updates, Google Business Profile management, and content — handled for you month after month. <Link href="#care-plans" className="text-hw-primary hover:underline">See care plans →</Link></p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <BrainCircuit className="w-6 h-6 text-hw-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">AI Visibility</h3>
                <p className="text-hw-text-light text-sm">I structure your content so ChatGPT, Google AI, and Perplexity recommend your business. Built into every site, monitored in <Link href="#care-plans" className="text-hw-primary hover:underline">Accelerate</Link>.</p>
              </div>
            </div>
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

      {/* ═══ Answer-First AEO Blocks ═══ */}
      <section className="py-24 md:py-32 px-6 bg-hw-light grain">
        <div className="max-w-3xl mx-auto">
          <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-3 text-center animate-on-scroll">Common Questions</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 animate-on-scroll">
            Straight Answers for Local Business Owners
          </h2>

          <div className="space-y-12">
            <div className="animate-on-scroll">
              <h3 className="text-xl font-bold mb-3" data-speakable="true">How much does a small business website cost?</h3>
              <p className="text-hw-text leading-relaxed" data-speakable="true">
                A professional small business website from Headley Web &amp; SEO costs between $495 and $1,195 as a one-time flat rate. The Get Found plan ($495) is a single-page site with clear messaging and mobile-friendly design. Get Calls ($795) adds 3-5 pages with search optimization and FAQ sections. Get Booked ($1,195) is a full 5-7 page site with advanced SEO, AI visibility, and structured data. Every plan includes Google Business Profile setup, and you own your website from day one. No contracts.
              </p>
            </div>

            <div className="animate-on-scroll">
              <h3 className="text-xl font-bold mb-3" data-speakable="true">What is local SEO and why does my business need it?</h3>
              <p className="text-hw-text leading-relaxed" data-speakable="true">
                Local SEO is the process of optimizing your website and online presence so customers in your area find you when they search for your services. When someone in Anniston searches &ldquo;HVAC repair near me,&rdquo; local SEO determines whether your business appears in Google&apos;s Map Pack or gets buried on page two. It includes on-page optimization (titles, meta descriptions, schema markup), Google Business Profile management, and content structured around the specific trades and towns you serve. Without local SEO, even a great-looking website won&apos;t generate phone calls.
              </p>
            </div>

            <div className="animate-on-scroll">
              <h3 className="text-xl font-bold mb-3" data-speakable="true">What is AI visibility and how does it help my business?</h3>
              <p className="text-hw-text leading-relaxed" data-speakable="true">
                AI visibility means structuring your website so AI tools like Google AI Overviews, ChatGPT, and Perplexity can read, understand, and recommend your business. Over 80% of Google searches now end without a click, often because AI answers the question directly. If your business isn&apos;t structured for AI to cite, you&apos;re invisible in the fastest-growing search channel. AI visibility includes answer-first content, schema markup that AI parsers trust, and entity optimization so AI knows your trade, your town, and your hours.
              </p>
            </div>

            <div className="animate-on-scroll">
              <h3 className="text-xl font-bold mb-3" data-speakable="true">Do I need a website if I already get referrals?</h3>
              <p className="text-hw-text leading-relaxed" data-speakable="true">
                Yes. Referrals are your best leads, but most people still Google your business before they call. If what they find is a dead Facebook page or nothing at all, that referral becomes someone else&apos;s customer. A professional website is the closer your referrals need. It confirms you&apos;re legitimate, shows your work, and makes it easy to call or book in one tap.
              </p>
            </div>
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
              Build Plans
            </h2>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto animate-on-scroll">
              Flat-rate, one-time build. No ongoing fees unless you want them.
              You own your website from day one.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {buildTiers.map((tier) => (
              <div
                key={tier.name}
                className={`${
                  tier.bestValue
                    ? "bg-hw-primary/[0.07] backdrop-blur-sm border border-hw-primary/30 hover:shadow-[0_12px_40px_rgba(224,123,60,0.15)]"
                    : "bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] hover:shadow-[0_12px_40px_rgba(224,123,60,0.1)]"
                } rounded-2xl p-8 flex flex-col relative transition-all hover:-translate-y-1 animate-on-scroll`}
                style={{ transitionDelay: tier.animationDelay }}
              >
                {tier.bestValue && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-hw-primary text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Best Value
                  </span>
                )}
                <h3 className="text-base font-bold !text-hw-primary uppercase tracking-wider mb-1">{tier.name}</h3>
                <p className="font-heading text-[42px] font-extrabold !text-white mb-2">{tier.priceDisplay}</p>
                <p className="text-xs text-gray-300 uppercase tracking-wide mb-4">one-time</p>
                <p className="text-sm text-white italic border-l-3 border-hw-primary pl-3 mb-3">{tier.tagline}</p>
                <p className="text-xs text-gray-400 mb-5">{tier.timeline}</p>
                <ul className="space-y-3 text-sm text-gray-300 flex-grow">
                  {tier.features.map((feature) => {
                    const Icon = buildIconMap[feature.iconName] ?? Check;
                    return (
                      <li key={feature.text} className="flex items-start gap-2">
                        <Icon className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                        {feature.text}
                      </li>
                    );
                  })}
                  {tier.inheritedFeatures && (
                    <>
                      <li className="border-t border-white/[0.07] pt-3 mt-1">
                        <span className="text-[11px] text-gray-500 uppercase tracking-wider">Also includes</span>
                      </li>
                      {tier.inheritedFeatures.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-hw-secondary shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-300">{f}</span>
                        </li>
                      ))}
                      {tier.inheritedNote && (
                        <li className="text-xs text-gray-400 italic pl-5">{tier.inheritedNote}</li>
                      )}
                    </>
                  )}
                </ul>
                <div className="mt-6 mb-0"></div>
                <div className="border-t border-white/[0.07] pt-4 mb-5">
                  <p className="text-xs text-gray-400">
                    Paired with{" "}
                    <Link href="#care-plans" className="text-hw-primary hover:underline">
                      {tier.carePlan.name}: ${tier.carePlan.price}/mo
                    </Link>
                  </p>
                  <p className="text-xs text-hw-primary font-semibold mt-1">First 3 months included free</p>
                </div>
                <Link href={tier.ctaHref} className="btn-primary w-full text-center">{tier.cta}</Link>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-8 animate-on-scroll">
            Flat-rate build. No surprises. 50% upfront, 50% at launch.
          </p>
          <p className="text-center text-gray-400 text-xs mt-2 animate-on-scroll">
            *Timelines begin once all content (text, photos, logos) is received.
          </p>
          <div className="mt-10 max-w-xl mx-auto border border-hw-primary/25 rounded-xl px-6 py-5 text-center animate-on-scroll">
            <p className="text-white font-semibold text-sm mb-1">Currently accepting founding clients</p>
            <p className="text-gray-400 text-sm">I&rsquo;m building sites for a small number of founding clients at a significantly reduced rate in exchange for a testimonial and case study. <Link href="/contact" className="text-hw-primary hover:underline">Ask about availability &rarr;</Link></p>
          </div>
        </div>
      </section>

      {/* ═══ Care Plans ═══ */}
      <section id="care-plans" className="py-24 md:py-32 px-6 bg-hw-light grain">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-3 animate-on-scroll">Monthly Care Plans</p>
            <h2 className="text-3xl md:text-4xl font-bold animate-on-scroll">Care Plans</h2>
            <p className="text-hw-text-light mt-4 max-w-2xl mx-auto animate-on-scroll">
              Every build includes 3 months free. After that, stay on the plan that fits where your business is headed, or cancel anytime.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {carePlans.map((plan, i) => (
              <div
                key={plan.name}
                className={`card-glow flex flex-col relative animate-on-scroll${i === 1 ? " ring-2 ring-hw-primary/30" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {i === 1 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-hw-primary text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Best Value
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl bg-hw-primary/10 flex items-center justify-center mb-4">
                  {plan.iconName === "shield" && <Shield className="w-6 h-6 text-hw-primary" />}
                  {plan.iconName === "trending-up" && <TrendingUp className="w-6 h-6 text-hw-primary" />}
                  {plan.iconName === "zap" && <Zap className="w-6 h-6 text-hw-primary" />}
                </div>
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="font-heading text-[36px] font-extrabold text-hw-primary mb-1">
                  ${plan.price}<span className="text-base font-normal text-hw-text-light">/mo</span>
                </p>
                <p className="text-hw-text-light text-sm mb-2">{plan.tagline}</p>
                <p className="text-sm text-hw-text mb-5 pb-5 border-b border-gray-200">{plan.upgradeReason}</p>
                <ul className="space-y-2.5 flex-grow mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-hw-text">
                      <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={i === 2 ? "btn-primary text-center" : "btn-secondary text-center"}>
                  Start with {plan.name}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-hw-text-light text-sm mt-8 animate-on-scroll">
            Care plans are optional. Your site is yours. No hosting lock-in, no contracts.
          </p>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-3 animate-on-scroll">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold animate-on-scroll">Common Questions About Our Services</h2>
          </div>
          <div className="animate-on-scroll">
            <details className="faq-item">
              <summary>How much does a small business website cost?</summary>
              <div className="faq-answer">
                A professional small business website costs between $495 and $1,995 as a one-time flat rate. The Get Found plan ($495) is a single-page site with clear messaging and mobile-friendly design. Get Calls ($1,495) adds 3-5 pages with search optimization and FAQ sections. Get Booked ($1,995) is a full 5-7 page site with advanced SEO, AI visibility, and structured data. Every plan includes Google Business Profile setup, and you own your website from day one. No contracts.
              </div>
            </details>
            <details className="faq-item">
              <summary>What is local SEO and why does my business need it?</summary>
              <div className="faq-answer">
                Local SEO is the process of optimizing your website and online presence so customers in your area find you when they search for your services. It includes on-page optimization (titles, meta descriptions, schema markup), Google Business Profile management, and content structured around the specific trades and towns you serve. Without local SEO, even a great-looking website won&apos;t generate phone calls.
              </div>
            </details>
            <details className="faq-item">
              <summary>What is AI visibility and how does it help my business?</summary>
              <div className="faq-answer">
                You know how people are starting to ask ChatGPT and Google&apos;s AI for recommendations instead of scrolling through search results? AI visibility means structuring your website so those tools can read, understand, and recommend your business. It includes answer-first content, schema markup that AI parsers trust, and entity optimization so AI knows your trade, your town, and your hours.
              </div>
            </details>
            <details className="faq-item">
              <summary>I already have a website. Do we have to start from scratch?</summary>
              <div className="faq-answer">
                Not always. Sometimes a renovation beats a rebuild. I&apos;ll take an honest look at what you&apos;ve got and tell you whether it&apos;s worth saving or if we&apos;re better off starting fresh. No hard sell either way.
              </div>
            </details>
            <details className="faq-item">
              <summary>How long does a website project take?</summary>
              <div className="faq-answer">
                3-4 weeks from &ldquo;let&apos;s do it&rdquo; to &ldquo;holy cow that&apos;s my website.&rdquo; The biggest variable is usually how fast we can round up your photos and business info. I&apos;ll tell you exactly what I need so nothing holds us up.
              </div>
            </details>
            <details className="faq-item">
              <summary>What happens if I need edits after launch?</summary>
              <div className="faq-answer">
                First 30 days of tweaks are on me. After that, optional care plans start at $49/mo if you want ongoing help — or you can just call me when something comes up. I&apos;m not going to leave you hanging.
              </div>
            </details>
            <details className="faq-item">
              <summary>How does payment work?</summary>
              <div className="faq-answer">
                Half upfront, half when the site goes live. That&apos;s it. No retainer, no auto-billing surprises, no &ldquo;processing fees&rdquo; that magically appear.
              </div>
            </details>
            <details className="faq-item">
              <summary>What makes you different from a big agency?</summary>
              <div className="faq-answer">
                A big agency puts you on a project board and assigns you to whoever&apos;s free. I&apos;m one person. I answer my own phone. I live in Jacksonville. If your website has a problem, you&apos;re not opening a support ticket — you&apos;re texting me.
              </div>
            </details>
          </div>
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
            Serving Jacksonville, Anniston, Gadsden, and Calhoun County
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll">
            <Link href="/audit" className="btn-primary text-lg px-8">
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
      <section className="sr-only">
        <h2>Web Design and SEO Services in Anniston, Gadsden &amp; Calhoun County</h2>
        <p>
          Headley Web <span className="amp">&amp;</span> SEO offers five core services for local businesses in Northeast Alabama: custom web design (clean, mobile-ready sites), local SEO optimization (on-page structure, keyword targeting, and search visibility), Google Business Profile setup and management, monthly care plans for ongoing maintenance and growth, and AI visibility optimization so your business gets recommended by tools like ChatGPT and Perplexity. Every build includes local SEO foundations, mobile responsiveness, and clear calls to action designed using the StoryBrand messaging framework. Pricing starts at $495 (Get Found), $1,495 (Get Calls), and $1,995 (Get Booked). Monthly care plans start at $49/mo. First 3 months included free with every build. All sites include full ownership. No contracts or monthly hosting traps. Serving Jacksonville, Anniston, Oxford, Gadsden, and surrounding communities.
        </p>
      </section>
    </main>
  );
}
