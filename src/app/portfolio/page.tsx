import type { Metadata } from "next";
import { ExternalLink, ArrowRight, Sparkles, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/app/data/projects";
import LazyPageSpeedProof from "@/app/components/LazyPageSpeedProof";

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

export default function PortfolioPage() {
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
          style={{ backgroundImage: "url('/images/background-dark-oak.webp')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(28,40,38,0.92)] via-[rgba(28,40,38,0.85)] to-[rgba(28,40,38,0.95)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 !text-white animate-on-scroll">
            Work That Gets{" "}
            <span className="text-hw-primary hand-accent">Results</span>
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto animate-on-scroll">
            Every project starts with a clear goal: make your phone ring. Here&apos;s what that looks like in practice.
          </p>
        </div>
      </section>

      {/* ═══ Projects ═══ */}
      <section className="py-24 md:py-32 px-6 bg-hw-dark">
        <div className="max-w-5xl mx-auto">
          {/* Featured project — horizontal card */}
          {projects.filter((p) => p.featured).map((project) => (
            <div
              key={project.title}
              className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl overflow-hidden animate-on-scroll md:flex mb-8"
            >
              {/* Screenshot */}
              {project.desktop ? (
                <div className="relative aspect-[16/10] md:aspect-auto md:w-1/2 bg-hw-dark/60 border-b md:border-b-0 md:border-r border-white/10 overflow-hidden">
                  <Image
                    src={project.desktop}
                    alt={`${project.title} website screenshot`}
                    width={800}
                    height={456}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    quality={80}
                    className="w-full h-full object-cover object-top"
                  />
                  {project.mobile && (
                    <Image
                      src={project.mobile}
                      alt={`${project.title} on mobile`}
                      width={480}
                      height={914}
                      sizes="62px"
                      quality={80}
                      fill={false}
                      className="absolute bottom-0 right-4 w-[22%] rounded-t-lg shadow-2xl border-t-2 border-x-2 border-white/20"
                    />
                  )}
                </div>
              ) : (
                <div className="aspect-[16/10] md:aspect-auto md:w-1/2 bg-hw-dark/40 border-b md:border-b-0 md:border-r border-white/10 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Screenshots coming soon</p>
                </div>
              )}

              {/* Info */}
              <div className="p-6 md:p-8 md:flex md:flex-col md:justify-center">
                <span className="text-xs font-semibold text-hw-primary uppercase tracking-wider">{project.tag}</span>
                <h2 className="text-xl font-bold !text-white mt-1 mb-2">
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

          {/* Remaining projects — 2-column grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.filter((p) => !p.featured).map((project) => (
              <div
                key={project.title}
                className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl overflow-hidden animate-on-scroll"
              >
                {/* Screenshot */}
                {project.desktop ? (
                  <div className="relative aspect-[16/10] bg-hw-dark/60 border-b border-white/10 overflow-hidden">
                    <Image
                      src={project.desktop}
                      alt={`${project.title} website screenshot`}
                      width={800}
                      height={456}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      quality={80}
                      className="w-full h-full object-cover object-top"
                    />
                    {project.mobile && (
                      <Image
                        src={project.mobile}
                        alt={`${project.title} on mobile`}
                        width={480}
                        height={914}
                        sizes="62px"
                        quality={80}
                        fill={false}
                        className="absolute bottom-0 right-4 w-[22%] rounded-t-lg shadow-2xl border-t-2 border-x-2 border-white/20"
                      />
                    )}
                  </div>
                ) : (
                  <div className="aspect-[16/10] bg-hw-dark/40 border-b border-white/10 flex items-center justify-center">
                    <p className="text-gray-500 text-sm">Screenshots coming soon</p>
                  </div>
                )}

                {/* Info */}
                <div className="p-6">
                  <span className="text-xs font-semibold text-hw-primary uppercase tracking-wider">{project.tag}</span>
                  <h2 className="text-lg font-bold !text-white mt-1 mb-2">
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
        </div>
      </section>

      {/* ═══ PageSpeed Proof ═══ */}
      <LazyPageSpeedProof variant="dark" />

      {/* ═══ CTA ═══ */}
      <section className="py-24 md:py-32 px-6 bg-hw-light">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">
            Want Results Like These?
          </h2>
          <p className="text-hw-text-light text-lg mb-3 animate-on-scroll">
            Let&apos;s talk about what a professional online presence could do for your business.
          </p>
          <p className="text-hw-text-light text-sm mb-8 animate-on-scroll">
            <MapPin className="inline w-4 h-4 mr-1 -mt-0.5" />
            Serving Jacksonville, Anniston, and Northeast Alabama
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll">
            <Link href="/contact" className="btn-primary text-lg px-8">
              Get Your Free Site Checkup <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/quiz" className="btn-secondary text-lg px-8">
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
