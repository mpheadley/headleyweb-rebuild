import type { Metadata } from "next";
import { MapPin, BrainCircuit, Frown, Monitor, Search, Map, ArrowRight, Clock, Video, Wrench, TrendingUp, DollarSign, Smartphone, MapPinned, ExternalLink, Check, Sparkles, MessageSquare, BarChart2, Shield, HelpCircle, BookOpen, Navigation, Bot, Star, Globe, type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

type LucideIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;
const buildIconMap: Record<string, LucideIcon> = { Monitor, MessageSquare, BarChart2, MapPin, Shield, Search, HelpCircle, BookOpen, Navigation, Bot, Star, Globe };
import Image from "next/image";
import Link from "next/link";
import SearchTypewriter from "./components/SearchTypewriter";
import LetterReveal from "./components/LetterReveal";
import { projects } from "@/app/data/projects";
import { buildTiers } from "@/app/data/pricing";

export const metadata: Metadata = {
  title: "Web Design for Jacksonville, Anniston & Calhoun County, AL",
  description:
    "Headley Web & SEO builds clear, mobile-friendly websites for local service businesses in Jacksonville, Anniston, Gadsden, and Calhoun County, AL. Get found, get calls, get booked.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Headley Web & SEO",
    url: "/",
    images: [
      {
        url: "/images/headley_web_seo_clean-1200-630.webp",
        width: 1200,
        height: 630,
        alt: "Headley Web & SEO — Web Design for Local Businesses",
      },
    ],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Headley Web & SEO",
  description:
    "Headley Web & SEO is a Jacksonville, Alabama web design studio that builds StoryBrand-powered websites for local service businesses in Northeast Alabama.",
  url: "https://headleyweb.com",
  telephone: "+1-256-644-7334",
  email: "matt@headleyweb.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jacksonville",
    addressRegion: "AL",
    postalCode: "36265",
    addressCountry: "US",
  },
  areaServed: [
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
    { "@type": "AdministrativeArea", name: "Northeast Alabama" },
    { "@type": "State", name: "Alabama", addressCountry: "US" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Complete Online Presence Package",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Local SEO Optimization" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Google Business Profile Setup" } },
    ],
  },
  priceRange: "$495-$1,195",
  openingHours: ["Mo-Sa 09:00-17:00"],
  sameAs: ["https://share.google/Dqh6aBASaey4yQXzm"],
  creator: {
    "@type": "Organization",
    name: "Headley Web & SEO",
    url: "https://headleyweb.com",
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Get More Leads for Your Local Business with a Professional Website",
  description:
    "A 3-step process to get your local service business found online, generate phone calls, and book more jobs.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Request Your Free Checkup",
      text: "Take the quiz or fill out the form. I'll record a personalized video showing exactly where you stand online.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "I Build Your System",
      text: "Based on what I find, I build your website, local SEO, and Google Business Profile — flat rate, no surprises.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Your Phone Starts Ringing",
      text: "Customers find you, call you, and book you. You get found online and get back to the work you love.",
    },
  ],
};

const homeSpeakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Web Design for Jacksonville, Anniston & Calhoun County, AL | Headley Web & SEO",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["[data-speakable='true']", "h1"],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I really need a website if I'm already getting referrals?",
      acceptedAnswer: { "@type": "Answer", text: "Referrals are gold — and then the person Googles you before they call. If what they find is a dead Facebook page from 2019, that referral just became someone else's customer. A professional site is the closer your referrals need." },
    },
    {
      "@type": "Question",
      name: "Will I own my website, or will I be locked into a contract?",
      acceptedAnswer: { "@type": "Answer", text: "You own it. Day one. If I got hit by a bus tomorrow (or just moved to Montana), your website keeps running. No hostage situations, no 'you need us to export your files' nonsense." },
    },
    {
      "@type": "Question",
      name: "I'm not tech-savvy. How much work will this be for me?",
      acceptedAnswer: { "@type": "Answer", text: "Can you send a text? You're qualified. I handle everything. You just answer a few questions about your business and send me some photos. I'll even send you a simple walkthrough video so you never feel stuck." },
    },
    {
      "@type": "Question",
      name: "Do I need to pay for hosting?",
      acceptedAnswer: { "@type": "Answer", text: "Nope. Hosting is included. Your site goes live and stays live — I'm not going to build you a house and then charge you rent for the driveway." },
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
    {
      "@type": "Question",
      name: "What does AI visibility mean? Should I care?",
      acceptedAnswer: { "@type": "Answer", text: "You know how people are starting to ask ChatGPT and Google's AI for recommendations instead of scrolling through search results? Yeah — I make sure your business shows up in those answers. You don't need to understand how it works. That's literally what you're paying me for." },
    },
  ],
};

export default function Home() {
  return (
    <main id="main-content">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSpeakableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* ═══ Hero Section ═══ */}
      <section className="relative min-h-[85vh] md:min-h-[80vh] flex items-center justify-center bg-hw-dark text-white section-angled overflow-hidden pt-32 pb-24 md:pt-24 md:pb-0">
        {/* Hero background — next/image with priority for optimal LCP preload */}
        <div className="absolute inset-0 ken-burns-subtle" aria-hidden="true">
          <Image
            src="/images/google-review-hvac.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={80}
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(28,40,38,0.85)] via-[rgba(28,40,38,0.7)] to-[rgba(28,40,38,0.9)]" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-[1fr_22rem] gap-12 items-center">
            {/* Left — Copy */}
            <div className="text-center md:text-left min-w-0">
              <p className="text-hw-secondary font-semibold text-sm tracking-widest uppercase mb-5 md:mb-4">
                Web Design &amp; SEO for Jacksonville, Anniston &amp; Calhoun County
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 !text-white">
                Your Customers Are Searching.
                <br />
                <span className="text-hw-primary">
                  Can They <LetterReveal text="Find You?" className="" delay={1100} trigger="load" />
                </span>
              </h1>
              <p className="text-lg text-gray-300 max-w-xl mb-8 mx-auto md:mx-0" data-speakable="true">
                Stop losing leads to a website that isn&apos;t working for you. I
                build clear, mobile-friendly sites that help you get found, get calls, and get booked — for a
                predictable flat rate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/audit" className="btn-primary">
                  Get Your Free Site Checkup
                </Link>
                <Link href="/quiz" className="btn-secondary !text-white !border-white/80 hover:!bg-hw-secondary hover:!border-hw-secondary">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Take the Quiz
                </Link>
              </div>
            </div>

            {/* Right — Animated search bar (hidden on small mobile, visible md+) */}
            <div className="hidden md:flex items-center justify-center">
              <SearchTypewriter />
            </div>
          </div>

          {/* Search bar — desktop only. Hidden on mobile to keep hero clean and spacious. */}
        </div>
      </section>

      {/* ═══ Pain Points ═══ */}
      <section className="py-24 md:py-32 px-6 bg-hw-light grain">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left — Image */}
            <div className="relative mx-auto md:mx-0 w-72 h-72 md:w-80 md:h-80 animate-on-scroll">
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-full border-2 border-dashed border-hw-secondary/30" aria-hidden="true" />
              <Image
                src="/images/google-map-review.webp"
                alt="Hand holding phone showing Google Maps local business results"
                width={320}
                height={320}
                sizes="(min-width: 768px) 320px, 288px"
                loading="lazy"
                className="w-full h-full object-cover object-center rounded-full shadow-lg border-4 border-white"
              />
            </div>

            {/* Right — Pain points list */}
            <div>
              <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-3">The Problem</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                You Work <span className="font-light">Too Hard</span> to Be{" "}
                <span className="text-hw-primary blur-reveal">Hidden Online.</span>
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4 animate-on-scroll" style={{ transitionDelay: "0s" }}>
                  <MapPin className="w-6 h-6 text-hw-primary shrink-0 mt-0.5" />
                  <p className="text-lg">
                    <strong>Competitors show up first</strong> — you&apos;re losing
                    calls to businesses no better than yours.
                  </p>
                </div>
                <div className="flex gap-4 animate-on-scroll" style={{ transitionDelay: "0.1s" }}>
                  <BrainCircuit className="w-6 h-6 text-hw-primary shrink-0 mt-0.5 rotate-90" />
                  <p className="text-lg">
                    <strong>AI is changing how people search</strong> — and most
                    local businesses aren&apos;t ready for what&apos;s coming.
                  </p>
                </div>
                <div className="flex gap-4 animate-on-scroll" style={{ transitionDelay: "0.2s" }}>
                  <Frown className="w-6 h-6 text-hw-primary shrink-0 mt-0.5" />
                  <p className="text-lg">
                    <strong>Your site doesn&apos;t match your work</strong> — you do
                    great work, but your online presence doesn&apos;t show it.
                  </p>
                </div>
                <div className="flex gap-4 animate-on-scroll" style={{ transitionDelay: "0.3s" }}>
                  <Clock className="w-6 h-6 text-hw-primary shrink-0 mt-0.5" />
                  <p className="text-lg">
                    <strong>Every month costs you</strong> — competitors get stronger
                    in the map pack and AI answers while you wait.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Callout — response to the pain */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6 bg-hw-dark/5 border border-hw-dark/10 border-l-4 border-l-hw-primary rounded-xl animate-on-scroll">
            <div className="text-center sm:text-left">
              <p className="text-lg font-bold">
                Want to see what AI says about your business?
              </p>
              <p className="text-hw-text-light text-sm mt-1">
                I&apos;ll include an AI visibility check in your free site checkup.
              </p>
            </div>
            <Link href="/audit" className="btn-primary whitespace-nowrap shrink-0">
              Get Your Free Checkup
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Services ═══ */}
      <section className="relative py-24 md:py-32 px-6 text-white section-angled-reverse overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/background-charred-stacked-timber.webp')" }}
        />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl px-8 py-10 mb-12 max-w-2xl mx-auto animate-on-scroll">
            <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-3">What I Do</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 !text-white">
              How I Help Local Businesses Get Found
            </h2>
            <p className="text-gray-200">
              Three focused services — each one designed to put your business in
              front of customers who are already searching for what you do.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="service-card bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-8 text-center animate-on-scroll" style={{ transitionDelay: "0s" }}>
              <Monitor className="service-icon w-10 h-10 text-hw-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 !text-white">
                Custom Web Design
              </h3>
              <p className="text-gray-300 mb-4">
                I build clean, mobile-ready sites that look professional and
                actually work for your business.
              </p>
              <a href="/services" className="text-hw-primary font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
                Explore web design services <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="service-card bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-8 text-center animate-on-scroll" style={{ transitionDelay: "0.15s" }}>
              <Search className="service-icon w-10 h-10 text-hw-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 !text-white">
                Local SEO Optimization
              </h3>
              <p className="text-gray-300 mb-4">
                I optimize your site&apos;s structure so local customers find you
                first when searching for your trade.
              </p>
              <a href="/services" className="text-hw-primary font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
                Explore local SEO services <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="service-card bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-8 text-center animate-on-scroll" style={{ transitionDelay: "0.3s" }}>
              <Map className="service-icon w-10 h-10 text-hw-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 !text-white">
                Google Business Profile
              </h3>
              <p className="text-gray-300 mb-4">
                I setup and manage your Google Map listing to drive more phone
                calls and booked jobs every month.
              </p>
              <a href="/services" className="text-hw-primary font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
                Explore Google Business services <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ How It Works ═══ */}
      <section className="py-24 md:py-32 px-6 bg-hw-light grain">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-3 animate-on-scroll">The Plan</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-16 animate-on-scroll">
            How We Get You <span className="font-light">More Leads</span>
          </h2>
          <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-y-8 gap-x-0 items-start relative">
            <div className="flex flex-col items-center text-center animate-on-scroll" style={{ transitionDelay: "0.05s" }}>
              <div className="w-16 h-16 rounded-full bg-hw-secondary/10 border-2 border-hw-secondary flex items-center justify-center mb-4 relative z-10">
                <Video className="w-7 h-7 text-hw-secondary" />
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-hw-secondary text-white text-xs font-bold flex items-center justify-center">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Run Your Free Site Audit</h3>
              <p className="text-hw-text-light">
                Check your site in 30 seconds. I&apos;ll follow up with a personalized video showing exactly where you stand online.
              </p>
            </div>
            {/* Connector 1→2 */}
            <div className="flex items-center justify-center md:mt-5 animate-on-scroll" style={{ transitionDelay: "0.1s" }} aria-hidden="true">
              {/* Vertical dots on mobile */}
              <div className="flex flex-col gap-1.5 md:hidden">
                <span className="w-1.5 h-1.5 rounded-full bg-hw-secondary/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-hw-secondary/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-hw-secondary/40" />
              </div>
              {/* Chevron on desktop */}
              <svg className="hidden md:block" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6l6 6-6 6" stroke="#6B8F71" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
              </svg>
            </div>
            <div className="flex flex-col items-center text-center animate-on-scroll" style={{ transitionDelay: "0.2s" }}>
              <div className="w-16 h-16 rounded-full bg-hw-secondary/10 border-2 border-hw-secondary flex items-center justify-center mb-4 relative z-10">
                <Wrench className="w-7 h-7 text-hw-secondary" />
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-hw-secondary text-white text-xs font-bold flex items-center justify-center">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">I Build Your System</h3>
              <p className="text-hw-text-light">
                Based on what I find, I build your website, local SEO, and Google Business Profile — flat rate, no surprises.
              </p>
            </div>
            {/* Connector 2→3 */}
            <div className="flex items-center justify-center md:mt-5 animate-on-scroll" style={{ transitionDelay: "0.3s" }} aria-hidden="true">
              {/* Vertical dots on mobile */}
              <div className="flex flex-col gap-1.5 md:hidden">
                <span className="w-1.5 h-1.5 rounded-full bg-hw-primary/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-hw-primary/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-hw-primary/40" />
              </div>
              {/* Chevron on desktop */}
              <svg className="hidden md:block" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6l6 6-6 6" stroke="#E07B3C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
              </svg>
            </div>
            <div className="flex flex-col items-center text-center animate-on-scroll" style={{ transitionDelay: "0.4s" }}>
              <div className="w-16 h-16 rounded-full bg-hw-primary/10 border-2 border-hw-primary flex items-center justify-center mb-4 relative z-10">
                <TrendingUp className="w-7 h-7 text-hw-primary" />
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-hw-primary text-white text-xs font-bold flex items-center justify-center">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Your Phone Starts Ringing</h3>
              <p className="text-hw-text-light">
                Customers find you, call you, and book you. You get found online and get back to the work you love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Success / Transformation ═══ */}
      <section className="py-24 md:py-32 px-6" style={{ backgroundColor: "rgba(107,143,113,0.06)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-hw-secondary font-semibold text-sm tracking-widest uppercase mb-3 animate-on-scroll">The Transformation</p>
            <h2 className="text-3xl md:text-4xl font-bold animate-on-scroll">What Changes When You Show Up</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Before */}
            <div className="animate-on-scroll" style={{ transitionDelay: "0.1s" }}>
              <h3 className="text-sm font-bold text-hw-text-light uppercase tracking-wider mb-4">Before</h3>
              <ul className="space-y-3 text-hw-text-light">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">&#x2717;</span>
                  Invisible online — losing leads to competitors who aren&apos;t better, just easier to find
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">&#x2717;</span>
                  Overwhelmed by changing technology and jargon you didn&apos;t ask for
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">&#x2717;</span>
                  Embarrassed when someone asks for your website
                </li>
              </ul>
            </div>
            {/* After */}
            <div className="animate-on-scroll" style={{ transitionDelay: "0.2s" }}>
              <h3 className="text-sm font-bold text-hw-secondary uppercase tracking-wider mb-4">After</h3>
              <ul className="space-y-3 text-hw-text">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                  Found at the top of Google and recommended by AI — your phone actually rings
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                  Confident and proud when sharing your website with customers and referrals
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-hw-secondary shrink-0 mt-0.5" />
                  Stable and in control — your online presence works while you work
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Trust (Empathy + Benefit Cards) ═══ */}
      <section className="py-28 md:py-36 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Top — Headshot + Empathy */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-16">
            <div className="relative mx-auto md:mx-0 animate-on-scroll overflow-hidden rounded-2xl shadow-lg w-full h-72 md:h-80">
              <Image
                src="/images/laptop-matt-headley.webp"
                alt="Matt Headley working on a laptop at a local coffee shop"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                quality={80}
                className="object-cover object-[50%_20%]"
              />
            </div>
            <div className="animate-on-scroll" style={{ transitionDelay: "0.15s" }}>
              <p className="text-hw-secondary font-semibold text-sm tracking-widest uppercase mb-3">Why Me</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Local Expertise,{" "}
                <span className="font-light scribble-wrap">
                  No Guesswork
                  <svg className="scribble scribble-on-scroll" viewBox="0 0 120 8" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M2 5 Q30 2 60 5 Q90 8 118 3" fill="none" stroke="#E07B3C" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
              <p className="text-lg text-hw-text-light mb-6">
                As a husband, dad, and small business owner right here in Jacksonville, I&apos;ve spent 19 years building things for people who needed someone to show up and do the work. I started Headley Web <span className="amp">&amp;</span> SEO because great local businesses deserve a website that works as hard as they do.
              </p>
              <ul className="space-y-3 text-hw-text-light">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-hw-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-hw-primary" />
                  </span>
                  StoryBrand messaging framework — your website makes the customer the hero, not you
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-hw-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-hw-primary" />
                  </span>
                  Local to Jacksonville, AL — I know your market, your customers, your community
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom — Benefit Cards (Bento Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Tall left — strongest benefit */}
            <div className="card-glow p-8 md:row-span-2 flex flex-col justify-center animate-on-scroll" style={{ transitionDelay: "0.05s" }}>
              <MapPinned className="w-10 h-10 text-hw-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Show Up on Google Maps</h3>
              <p className="text-hw-text-light">
                A website is only half the battle. I optimize your Google Business Profile so you land in the top 3 on Maps — where most local customers actually click.
              </p>
            </div>
            {/* Wide top-right — ownership */}
            <div className="card-glow p-6 md:col-span-2 flex items-center gap-6 animate-on-scroll" style={{ transitionDelay: "0.12s" }}>
              <DollarSign className="w-10 h-10 text-hw-primary shrink-0" />
              <div>
                <h3 className="text-lg font-bold mb-1">You Own Everything</h3>
                <p className="text-hw-text-light text-sm">
                  No contracts, no hostage situations. You own your site, your domain, and your data from day one. Optional care plans are there if you want them — not because you&apos;re trapped.
                </p>
              </div>
            </div>
            {/* Bottom-right pair */}
            <div className="card-glow p-6 text-center animate-on-scroll" style={{ transitionDelay: "0.22s" }}>
              <Smartphone className="w-8 h-8 text-hw-primary mx-auto mb-3" />
              <h3 className="text-lg font-bold mb-2">Fast on Every Phone</h3>
              <p className="text-hw-text-light text-sm">
                Most local searches happen from a truck or a parking lot. Your site loads fast and makes it easy to call or book in one tap.
              </p>
            </div>
            <div className="card-glow p-6 text-center animate-on-scroll" style={{ transitionDelay: "0.32s" }}>
              <MapPin className="w-8 h-8 text-hw-primary mx-auto mb-3" />
              <h3 className="text-lg font-bold mb-2">Built for Your Market</h3>
              <p className="text-hw-text-light text-sm">
                Not a generic template. Every page targets the terms your local customers actually search — Jacksonville to Gadsden and everywhere in between.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Portfolio / Results ═══ */}
      <section className="py-24 md:py-32 px-6 bg-hw-dark text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-3 animate-on-scroll">Results</p>
            <h2 className="text-3xl md:text-4xl font-bold !text-white animate-on-scroll">
              Real Businesses. <LetterReveal text="Real Results." className="text-4xl md:text-5xl text-hw-primary" delay={200} trigger="scroll" />
            </h2>
          </div>

          {/* Featured project — full width, horizontal layout */}
          {projects.filter((p) => p.featured).map((project) => (
          <a key={project.title} href={project.url} target="_blank" rel="noopener noreferrer" className="group rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-hw-primary/40 transition-colors mb-8 animate-on-scroll block">
            <div className="grid md:grid-cols-[1.2fr_1fr]">
              <div className="relative aspect-[16/10] md:aspect-auto bg-hw-dark/60 border-b md:border-b-0 md:border-r border-white/10 overflow-hidden">
                <Image
                  src={project.desktop}
                  alt={`${project.title} website screenshot`}
                  width={800}
                  height={456}
                  sizes="(min-width: 768px) 55vw, 100vw"
                  quality={80}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <Image
                  src={project.mobile}
                  alt={`${project.title} on mobile`}
                  width={62}
                  height={112}
                  sizes="62px"
                  quality={80}
                  className="absolute bottom-3 right-4 rounded-lg border-2 border-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
                />
              </div>
              <div className="p-8 flex flex-col justify-center text-left">
                <h3 className="text-xl font-bold mb-2 !text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4">
                  {project.description}
                </p>
                {project.stats && (
                <div className="flex gap-6 mb-5">
                  {project.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-hw-primary">{stat.value}</p>
                    <p className="text-gray-400 text-xs uppercase tracking-wide">{stat.label}</p>
                  </div>
                  ))}
                </div>
                )}
                <span className="text-hw-primary font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  View project <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </a>
          ))}

          {/* Secondary projects — 2-col grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {projects.filter((p) => !p.featured).slice(0, 2).map((project, i) => (
            <a key={project.title} href={project.url} target="_blank" rel="noopener noreferrer" className="group rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-hw-primary/40 transition-colors animate-on-scroll block" style={{ transitionDelay: `${(i + 1) * 0.1}s` }}>
              <div className="relative aspect-[16/10] bg-hw-dark/60 border-b border-white/10 overflow-hidden">
                <Image
                  src={project.desktop}
                  alt={`${project.title} website screenshot`}
                  width={800}
                  height={456}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  quality={80}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <Image
                  src={project.mobile}
                  alt={`${project.title} on mobile`}
                  width={62}
                  height={112}
                  sizes="62px"
                  quality={80}
                  className="absolute bottom-3 right-4 rounded-lg border-2 border-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
                />
              </div>
              <div className="p-6 text-left">
                <h3 className="text-lg font-bold mb-1 !text-white">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4">
                  {project.description}
                </p>
                <span className="text-hw-primary font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  View project <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
            ))}
          </div>

          <div className="text-center animate-on-scroll">
            <p className="text-gray-300 mb-6">Want results like these for your business?</p>
            <Link href="/audit" className="btn-primary">
              Get Your Free Site Checkup
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Consequences ═══ */}
      <section className="py-24 md:py-32 px-6" style={{ backgroundColor: "rgba(28,40,38,0.04)" }}>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-3 animate-on-scroll">Don&apos;t Wait</p>
          <h2 className="text-3xl md:text-4xl font-bold animate-on-scroll">What Happens If You Wait</h2>
          <p className="text-hw-text-light mt-4 animate-on-scroll">Every month without a clear online presence...</p>
        </div>
        {/* Timeline with red connecting line */}
        <div className="relative max-w-3xl mx-auto flex flex-col">
          {/* Vertical connecting line */}
          <div className="absolute left-[23px] top-7 bottom-7 w-[2px]" style={{ background: "linear-gradient(to bottom, rgba(220,38,38,0.35) 0%, rgba(220,38,38,0.1) 100%)" }} aria-hidden="true" />
          {/* Risk 1 */}
          <div className="flex gap-7 items-start py-5 animate-on-scroll" style={{ transitionDelay: "0.1s" }}>
            <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center relative z-10" style={{ background: "rgba(220,38,38,0.07)", border: "2px solid rgba(220,38,38,0.2)" }} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="pt-2.5">
              <h3 className="text-lg font-bold mb-2">Competitors rank above you</h3>
              <p className="text-hw-text-light leading-relaxed">
                Every search is a chance for them to win a customer that could&apos;ve been yours — and it keeps happening every day. They&apos;re getting stronger in the map pack AND in AI answers.
              </p>
            </div>
          </div>
          {/* Risk 2 */}
          <div className="flex gap-7 items-start py-5 animate-on-scroll" style={{ transitionDelay: "0.2s" }}>
            <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center relative z-10" style={{ background: "rgba(220,38,38,0.07)", border: "2px solid rgba(220,38,38,0.2)" }} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="pt-2.5">
              <h3 className="text-lg font-bold mb-2">Customers move on to whoever shows up next</h3>
              <p className="text-hw-text-light leading-relaxed">
                Without a clear online presence, potential customers can&apos;t find you — and they&apos;re not waiting around. They call whoever shows up first.
              </p>
            </div>
          </div>
          {/* Risk 3 */}
          <div className="flex gap-7 items-start py-5 animate-on-scroll" style={{ transitionDelay: "0.3s" }}>
            <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center relative z-10" style={{ background: "rgba(220,38,38,0.07)", border: "2px solid rgba(220,38,38,0.2)" }} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="pt-2.5">
              <h3 className="text-lg font-bold mb-2">Your time stays tied up</h3>
              <p className="text-hw-text-light leading-relaxed">
                Without a website to answer routine questions, you&apos;re fielding the same calls and texts — time you can&apos;t spend on the work that actually grows your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Pricing ═══ */}
      <section className="relative py-28 md:py-36 px-6 overflow-hidden" style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 15%, rgba(0,0,0,0.55) 85%, rgba(0,0,0,0.82) 100%), url('/images/background-dark-oak.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-3 animate-on-scroll">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold !text-white animate-on-scroll">
              Compare Your Options
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
                {/* Paired care plan */}
                <div className="flex flex-col gap-2 py-4 border-t border-white/[0.07] mb-5">
                  <span className="text-xs font-semibold text-gray-300">
                    {tier.carePlan.name} — <span className="text-hw-primary font-normal">${tier.carePlan.price}/mo</span>
                  </span>
                  <ul className="space-y-1">
                    {tier.carePlan.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-1.5 text-xs text-gray-400">
                        <Check className="w-3 h-3 text-hw-secondary shrink-0 mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-hw-primary font-semibold">First 3 months included</span>
                    <Link href="/services#care-plans" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                      Full details →
                    </Link>
                  </div>
                </div>
                <Link href={tier.ctaHref} className="btn-primary w-full text-center">{tier.cta}</Link>
              </div>
            ))}
          </div>

          {/* Quick Comparison */}
          <div className="mt-10 overflow-x-auto animate-on-scroll">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 pr-4 text-gray-400 font-medium" />
                  <th className="py-3 px-4 text-gray-300 font-semibold text-center">Get Found</th>
                  <th className="py-3 px-4 text-hw-primary font-semibold text-center">Get Calls</th>
                  <th className="py-3 px-4 text-gray-300 font-semibold text-center">Get Booked</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 text-gray-400">Pages</td>
                  <td className="py-2.5 px-4 text-center">1</td>
                  <td className="py-2.5 px-4 text-center">3–5</td>
                  <td className="py-2.5 px-4 text-center">5–7</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 text-gray-400">Timeline</td>
                  <td className="py-2.5 px-4 text-center">1–2 weeks</td>
                  <td className="py-2.5 px-4 text-center">2–3 weeks</td>
                  <td className="py-2.5 px-4 text-center">3–4 weeks</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 text-gray-400">SEO</td>
                  <td className="py-2.5 px-4 text-center">Basic</td>
                  <td className="py-2.5 px-4 text-center">Full</td>
                  <td className="py-2.5 px-4 text-center">Advanced + AI</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 text-gray-400">GBP Setup</td>
                  <td className="py-2.5 px-4 text-center"><Check className="w-4 h-4 text-hw-secondary mx-auto" /></td>
                  <td className="py-2.5 px-4 text-center"><Check className="w-4 h-4 text-hw-secondary mx-auto" /></td>
                  <td className="py-2.5 px-4 text-center"><Check className="w-4 h-4 text-hw-secondary mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2.5 pr-4 text-gray-400">FAQ Schema</td>
                  <td className="py-2.5 px-4 text-center text-gray-500">—</td>
                  <td className="py-2.5 px-4 text-center"><Check className="w-4 h-4 text-hw-secondary mx-auto" /></td>
                  <td className="py-2.5 px-4 text-center"><Check className="w-4 h-4 text-hw-secondary mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 text-gray-400">AI Visibility</td>
                  <td className="py-2.5 px-4 text-center text-gray-500">—</td>
                  <td className="py-2.5 px-4 text-center text-gray-500">—</td>
                  <td className="py-2.5 px-4 text-center"><Check className="w-4 h-4 text-hw-secondary mx-auto" /></td>
                </tr>
              </tbody>
            </table>
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

      {/* ═══ FAQ ═══ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-3 animate-on-scroll">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold animate-on-scroll">Questions We Hear From Local Business Owners</h2>
          </div>
          <div className="animate-on-scroll">
            <details className="faq-item">
              <summary>Do I really need a website if I&apos;m already getting referrals?</summary>
              <div className="faq-answer">
                Referrals are gold — and then the person Googles you before they call. If what they find is a dead Facebook page from 2019, that referral just became someone else&apos;s customer. A professional site is the closer your referrals need.
              </div>
            </details>
            <details className="faq-item">
              <summary>Will I own my website, or will I be locked into a contract?</summary>
              <div className="faq-answer">
                You own it. Day one. If I got hit by a bus tomorrow (or just moved to Montana), your website keeps running. No hostage situations, no &ldquo;you need us to export your files&rdquo; nonsense.
              </div>
            </details>
            <details className="faq-item">
              <summary>I&apos;m not &ldquo;tech-savvy.&rdquo; How much work will this be for me?</summary>
              <div className="faq-answer">
                Can you send a text? You&apos;re qualified. I handle everything. You just answer a few questions about your business and send me some photos. I&apos;ll even send you a simple walkthrough video so you never feel stuck.
              </div>
            </details>
            <details className="faq-item">
              <summary>Do I need to pay for hosting?</summary>
              <div className="faq-answer">
                Nope. Hosting is included. Your site goes live and stays live — I&apos;m not going to build you a house and then charge you rent for the driveway.
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
            <details className="faq-item">
              <summary>What does &ldquo;AI visibility&rdquo; mean? Should I care?</summary>
              <div className="faq-answer">
                You know how people are starting to ask ChatGPT and Google&apos;s AI for recommendations instead of scrolling through search results? Yeah — I make sure your business shows up in those answers. You don&apos;t need to understand how it works. That&apos;s literally what you&apos;re paying me for.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="py-24 md:py-32 px-6 bg-hw-dark text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold !text-white mb-4 animate-on-scroll">Ready to Get Found?</h2>
          <p className="text-gray-300 text-lg mb-3 animate-on-scroll">
            Stop losing customers to competitors with better websites. Let&apos;s get your business online the right way.
          </p>
          <p className="text-gray-400 mb-2 animate-on-scroll">
            Flat-rate builds from $495. Care plan included free for 3 months, then from $49/mo — cancel anytime.
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

      {/* ═══ Answer-First Content Block (AEO / SEO) — visually hidden, crawlable ═══ */}
      <section className="sr-only">
        <p data-speakable="true">
          Headley Web <span className="amp">&amp;</span> SEO is a Jacksonville, Alabama web design studio that builds
          StoryBrand-powered websites for local service businesses in Anniston, Gadsden, Jacksonville, and across Calhoun County. We
          specialize in clear, mobile-friendly sites with built-in local SEO and Google Business
          Profile optimization for plumbers, HVAC companies, contractors, restaurants, and other
          service providers in Calhoun, Etowah, Cherokee, and Talladega counties. Every site is
          built to generate leads — not just look good. Flat-rate pricing from $495 with full
          site ownership. No contracts, no monthly traps. Our StoryBrand approach makes your
          customer the hero of the story, so your messaging connects and your phone actually rings.
        </p>
      </section>
    </main>
  );
}
