import type { Metadata } from "next";
import { Check, MapPin, ArrowRight, Sparkles } from "lucide-react";
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
  "StoryBrand messaging framework — every site makes the customer the hero",
  "Local to Jacksonville, AL — I know the NE Alabama market firsthand",
  "Flat-rate pricing with full site ownership — no contracts, no surprises",
  "Google Business Profile optimization included in every build",
  "Serving Calhoun, Etowah, Cherokee, and Talladega counties",
];

export default function AboutPage() {
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
            A Local Business Owner,{" "}
            <span className="text-hw-primary">Just Like You</span>
          </h1>
          <p className="text-lg text-hw-text-light max-w-2xl mx-auto animate-on-scroll">
            I started Headley Web &amp; SEO because I kept watching great local businesses lose leads to competitors who were simply easier to find online.
          </p>
        </div>
      </section>

      {/* ═══ Story + Headshot ═══ */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Headshot */}
            <div className="shrink-0 animate-on-scroll">
              <Image
                src="/images/headshot-matt-headley.webp"
                alt="Matt Headley — owner of Headley Web & SEO, Jacksonville, Alabama"
                width={400}
                height={400}
                className="rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>

            {/* Story */}
            <div className="space-y-5 animate-on-scroll">
              <p className="text-lg leading-relaxed">
                I&apos;m a husband and dad living in Jacksonville. As a former pastor and small business owner, I know exactly what it&apos;s like to work hard and worry about where the next customer is coming from.
              </p>
              <p className="text-lg leading-relaxed">
                I started Headley Web &amp; SEO because I kept watching great local businesses lose leads to competitors who weren&apos;t better — just more visible online. It wasn&apos;t because those competitors did better work — they just had a better digital front door.
              </p>
              <p className="text-lg leading-relaxed">
                I built this service to be a straightforward partnership for my neighbors in Northeast Alabama. I handle the technical heavy lifting — from the initial build to ongoing security and maintenance — so you can focus on running your business. My goal is to provide a professional online presence with flat-rate pricing, clear communication, and the peace of mind that your site is always working for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Credentials ═══ */}
      <section className="py-24 md:py-32 px-6 bg-hw-light">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 animate-on-scroll">
            What I Bring to the Table
          </h2>
          <ul className="space-y-4">
            {credentials.map((c) => (
              <li key={c} className="flex items-start gap-3 text-lg animate-on-scroll">
                <Check className="w-6 h-6 text-hw-secondary shrink-0 mt-0.5" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ Family Photo + Personal Touch ═══ */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Image
            src="/images/headley-family-800w.webp"
            alt="The Headley family in Jacksonville, Alabama"
            width={800}
            height={533}
            className="rounded-2xl shadow-lg mx-auto mb-8 animate-on-scroll"
            loading="lazy"
          />
          <p className="text-lg text-hw-text-light max-w-2xl mx-auto animate-on-scroll">
            I&apos;d love to help your business be the first thing people find when they search. Let&apos;s start with a quick conversation about where you are now and where you want to be.
          </p>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 md:py-32 px-6 bg-hw-dark text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold !text-white mb-4 animate-on-scroll">
            Let&apos;s Talk About Your Business
          </h2>
          <p className="text-gray-300 text-lg mb-3 animate-on-scroll">
            20 minutes, no pressure, no sales pitch. Just an honest look at where you stand online.
          </p>
          <p className="text-gray-300 text-sm mb-8 animate-on-scroll">
            <MapPin className="inline w-4 h-4 mr-1 -mt-0.5" />
            Jacksonville, Alabama &middot; Serving Northeast Alabama
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
    </main>
  );
}
