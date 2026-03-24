import type { Metadata } from "next";
import { Check, MapPin, ArrowRight, Sparkles, BookOpen, DollarSign, Map, Search, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Matt Headley — husband, dad, and former pastor turned web designer in Jacksonville, Alabama. I build StoryBrand-powered websites for local service businesses in Northeast Alabama.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Headley Web & SEO",
    url: "/about",
    images: [
      {
        url: "/images/headley_web_seo_clean-1200-630.webp",
        width: 1200,
        height: 630,
        alt: "Headley Web & SEO — About Matt Headley",
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://headleyweb.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://headleyweb.com/about" },
  ],
};

const credentials = [
  {
    icon: BookOpen,
    title: "StoryBrand Framework",
    desc: "Every site makes the customer the hero — not you.",
    accent: "bg-hw-primary/10 text-hw-primary",
    span: "sm:col-span-2",
  },
  {
    icon: MapPin,
    title: "Local to Jacksonville",
    desc: "I know the Calhoun County market firsthand.",
    accent: "bg-hw-secondary/10 text-hw-secondary",
    span: "",
  },
  {
    icon: DollarSign,
    title: "Flat-Rate Pricing",
    desc: "Full site ownership. No contracts, no surprises.",
    accent: "bg-hw-primary/10 text-hw-primary",
    span: "",
  },
  {
    icon: Search,
    title: "Google Business Profile",
    desc: "Optimization included in every build.",
    accent: "bg-hw-secondary/10 text-hw-secondary",
    span: "",
  },
  {
    icon: Globe,
    title: "Calhoun County & Beyond",
    desc: "Serving Calhoun, Etowah, Cherokee & Talladega counties.",
    accent: "bg-hw-primary/10 text-hw-primary",
    span: "",
  },
];

export default function AboutPage() {
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
          style={{ backgroundImage: "url('/images/laptop-matt-headley.webp')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(28,40,38,0.92)] via-[rgba(28,40,38,0.82)] to-[rgba(28,40,38,0.95)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 !text-white animate-on-scroll">
            A Local Business Owner,{" "}
            <span className="text-hw-primary">Just Like You</span>
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto animate-on-scroll">
            I started Headley Web <span className="amp">&amp;</span> SEO because I kept watching great local businesses lose leads to competitors who were simply easier to find online.
          </p>
        </div>
      </section>

      {/* ═══ Story + Headshot ═══ */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="animate-on-scroll">
            <Image
              src="/images/headley-family-800w.webp"
              alt="The Headley family in Jacksonville, Alabama"
              width={800}
              height={533}
              className="rounded-2xl shadow-lg float-right ml-8 mb-6 w-48 md:w-64 h-auto"
              loading="lazy"
            />
            <div className="space-y-5">
              <p className="text-lg leading-relaxed">
                I&apos;m Matt Headley — husband, dad, and small business owner in Jacksonville, Alabama. I&apos;ve spent 19 years building things for other people — churches, a flower farm, community events — and every one of them needed a website that actually worked. That&apos;s how I got here.
              </p>
              <p className="text-lg leading-relaxed">
                I started Headley Web <span className="amp">&amp;</span> SEO because I kept watching great local businesses lose leads to competitors who were simply easier to find online. It wasn&apos;t because those competitors did better work — they just had a better digital front door.
              </p>
              <p className="text-lg leading-relaxed">
                I built this service to be a straightforward partnership for my neighbors in Anniston, Jacksonville, and Calhoun County. I handle the technical heavy lifting — from the initial build to ongoing security and maintenance — so you can focus on running your business. That same persistence I bring to everything else, I bring to every site I build.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Credentials — Bento Grid ═══ */}
      <section className="py-24 md:py-32 px-6 bg-hw-light">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">
            What I Bring to the Table
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {credentials.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className={`card-glow flex flex-col gap-3 animate-on-scroll ${c.span}`}
                >
                  <div className={`w-12 h-12 rounded-xl ${c.accent} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold">{c.title}</h3>
                  <p className="text-hw-text-light">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ Family Photo + Personal Touch ═══ */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <Image
            src="/images/headshot-matt-headley.webp"
            alt="Matt Headley — owner of Headley Web & SEO, Jacksonville, Alabama"
            width={768}
            height={1025}
            className="rounded-2xl shadow-lg w-40 md:w-48 h-auto shrink-0 animate-on-scroll"
            loading="lazy"
          />
          <div className="animate-on-scroll">
            <p className="text-lg text-hw-text-light">
              I&apos;d love to help your business be the first thing people find when they search. Let&apos;s start with a free look at where you stand online.
            </p>
            <p className="mt-4 text-xl text-hw-primary hand-accent">— Matt</p>
          </div>
        </div>
      </section>

      {/* ═══ Google Review ═══ */}
      <section className="py-10 px-6 bg-hw-light border-y border-black/5">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left animate-on-scroll">
          <span className="text-3xl" aria-hidden="true">⭐</span>
          <p className="text-hw-text-light text-sm">
            Already a client? A Google review means the world to a small business —&nbsp;
            <a
              href="https://g.page/r/CZcynt10WKMIEAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="text-hw-primary hover:text-hw-primary-dark underline underline-offset-2 transition-colors font-medium"
            >
              Leave a quick review
            </a>
          </p>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 md:py-32 px-6 bg-hw-dark text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold !text-white mb-4 animate-on-scroll">
            See Where You Stand Online
          </h2>
          <p className="text-gray-300 text-lg mb-3 animate-on-scroll">
            Get a free checkup of your website — no sales pitch, no strings attached.
          </p>
          <p className="text-gray-300 text-sm mb-8 animate-on-scroll">
            <MapPin className="inline w-4 h-4 mr-1 -mt-0.5" />
            Jacksonville, Alabama &middot; Serving Calhoun County &amp; Beyond
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
          <p className="text-gray-400 text-sm mt-4 animate-on-scroll">
            Want instant results? <Link href="/audit" className="text-hw-primary hover:text-hw-primary/80 underline transition-colors">Try the free automated audit</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
