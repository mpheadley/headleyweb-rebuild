import type { Metadata } from "next";
import { ExternalLink, ArrowRight, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "See websites I've built for local businesses in Northeast Alabama. Custom web design, local SEO, and Google Business Profile optimization — real results for real businesses.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    url: "/portfolio",
    images: [
      {
        url: "/images/headley_web_seo_clean-1200-630.webp",
        width: 1200,
        height: 630,
        alt: "Headley Web & SEO — Portfolio",
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://headleyweb.com" },
    { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://headleyweb.com/portfolio" },
  ],
};

const projects = [
  {
    title: "Valley Small Engine Repair",
    description: "Local service site with customer testimonials and easy contact — built to convert search traffic into phone calls.",
    desktop: "/images/desktop-screenshot-valley-800w.webp",
    mobile: "/images/mobile-sreenshot-valley-480w.webp",
    url: "https://valley-small-engine.vercel.app",
    tag: "Local Service",
    featured: true,
  },
  {
    title: "Golden Hive Honey",
    description: "Clean e-commerce demo for local honey products with warm, inviting design.",
    desktop: "/images/project-honey-800w.webp",
    mobile: "/images/project-honey-mobile-480w.webp",
    url: "https://golden-hive-honey.vercel.app",
    tag: "E-Commerce",
    featured: false,
  },
  {
    title: "Chromatic Chaos Salon",
    description: "Modern salon site with booking integration and bold brand personality.",
    desktop: "/images/project-salon-800w.webp",
    mobile: "/images/project-salon-mobile-480w.webp",
    url: "https://chromatic-chaos-salon.vercel.app",
    tag: "Salon & Beauty",
    featured: false,
  },
  {
    title: "Emotional Support Chicken",
    description: "Satirical concept site for a fake certified emotional support poultry business. Built to demonstrate design range, humor, and full-stack chops.",
    desktop: null,
    mobile: null,
    url: null,
    tag: "Creative Showcase",
    featured: false,
  },
];

export default function PortfolioPage() {
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ═══ Hero ═══ */}
      <section className="pt-28 pb-16 px-6 bg-hw-light">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-on-scroll">
            Helping Alabama Businesses{" "}
            <span className="text-hw-primary">Get Found Online</span>
          </h1>
          <p className="text-lg text-hw-text-light max-w-2xl mx-auto animate-on-scroll">
            Every project starts with a clear goal: make your phone ring. Here&apos;s what that looks like in practice.
          </p>
        </div>
      </section>

      {/* ═══ Projects ═══ */}
      <section className="py-16 px-6 bg-hw-dark">
        <div className="max-w-5xl mx-auto space-y-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl overflow-hidden animate-on-scroll ${
                project.featured ? "md:flex" : ""
              }`}
            >
              {/* Screenshot */}
              {project.desktop ? (
                <div className={`relative aspect-[16/10] ${project.featured ? "md:aspect-auto md:w-1/2" : ""} bg-hw-dark/60 border-b ${project.featured ? "md:border-b-0 md:border-r" : ""} border-white/10 overflow-hidden`}>
                  <img
                    src={project.desktop}
                    alt={`${project.title} website screenshot`}
                    width={800}
                    height={456}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                  {project.mobile && (
                    <img
                      src={project.mobile}
                      alt={`${project.title} on mobile`}
                      width={480}
                      height={914}
                      loading="lazy"
                      className="absolute bottom-0 right-4 w-[22%] rounded-t-lg shadow-2xl border-t-2 border-x-2 border-white/20"
                    />
                  )}
                </div>
              ) : (
                <div className={`aspect-[16/10] ${project.featured ? "md:aspect-auto md:w-1/2" : ""} bg-hw-dark/40 border-b border-white/10 flex items-center justify-center`}>
                  <p className="text-gray-500 text-sm">Screenshots coming soon</p>
                </div>
              )}

              {/* Info */}
              <div className={`p-6 ${project.featured ? "md:p-8 md:flex md:flex-col md:justify-center" : ""}`}>
                <span className="text-xs font-semibold text-hw-primary uppercase tracking-wider">{project.tag}</span>
                <h2 className={`${project.featured ? "text-xl" : "text-lg"} font-bold !text-white mt-1 mb-2`}>
                  {project.title}
                </h2>
                <p className="text-gray-300 text-sm mb-4">
                  {project.description}
                </p>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-hw-primary hover:text-hw-primary-dark transition-colors font-semibold"
                  >
                    View Live Site <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 px-6 bg-hw-light">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">
            Want Results Like These?
          </h2>
          <p className="text-lg text-hw-text-light mb-8 animate-on-scroll">
            Let&apos;s talk about what a professional online presence could do for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll">
            <Link href="/contact" className="btn-primary text-lg px-8">
              Get Your Free Video Audit <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a href="tel:+12566447334" className="btn-secondary text-lg px-8">
              <Phone className="w-5 h-5 mr-2" />
              (256) 644-7334
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
