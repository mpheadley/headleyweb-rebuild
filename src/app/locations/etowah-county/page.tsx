import type { Metadata } from "next";
import { MapPin, Check, ArrowRight, Sparkles, Monitor, Search, Map } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Web Design for Etowah County, AL Businesses",
  description:
    "Custom web design and local SEO for small businesses across Etowah County, Alabama: Gadsden, Rainbow City, Attalla, and surrounding communities. Flat-rate pricing from $495. No contracts.",
  alternates: {
    canonical: "/locations/etowah-county",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Headley Web & SEO",
    url: "/locations/etowah-county",
    images: [
      {
        url: "/images/headley-web-og-v2.webp",
        width: 1200,
        height: 630,
        alt: "Headley Web & SEO, Web Design for Etowah County, AL",
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://headleyweb.com" },
    { "@type": "ListItem", position: 2, name: "Locations", item: "https://headleyweb.com/locations" },
    { "@type": "ListItem", position: 3, name: "Etowah County", item: "https://headleyweb.com/locations/etowah-county" },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Headley Web & SEO",
  description:
    "Headley Web & SEO provides custom web design and local SEO for small businesses across Etowah County, Alabama, including Gadsden, Rainbow City, and Attalla.",
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
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Etowah County",
    addressRegion: "AL",
    addressCountry: "US",
  },
};

const cities = [
  {
    name: "Gadsden",
    slug: "gadsden",
    desc: "Etowah County seat. Noccalula Falls, Broad Street, strong trades market.",
  },
  {
    name: "Rainbow City",
    slug: "rainbow-city",
    desc: "One of Etowah County's fastest-growing communities along the Coosa River.",
  },
  {
    name: "Attalla",
    slug: "attalla",
    desc: "Right next door to Gadsden. Coosa River corridor, strong trades and service market.",
  },
  {
    name: "Southside",
    slug: "southside",
    desc: "One of Etowah County's larger cities, between Gadsden and Rainbow City.",
  },
  {
    name: "Glencoe",
    slug: "glencoe",
    desc: "Between Gadsden and Attalla. Most businesses here are invisible online.",
  },
];

const whyPoints = [
  {
    title: "I Know the Gadsden Market",
    desc: "I've researched every web design competitor in Etowah County. Most have weak GBP presence, no pricing, and sites that rank poorly on mobile. You can outrank them.",
  },
  {
    title: "No Pricing Games",
    desc: "Every competitor in Etowah County says 'call for a quote.' I publish flat-rate pricing from $495. You know exactly what you're getting.",
  },
  {
    title: "Built to Rank in Etowah County",
    desc: "Every site includes local SEO targeting your specific city: Gadsden, Rainbow City, Attalla, Southside. Not generic statewide optimization.",
  },
  {
    title: "You Own Everything",
    desc: "No monthly hosting traps, no locked-in contracts. Your domain, your code, your site. Yours from day one.",
  },
];

export default function EtowahCountyPage() {
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* ═══ Hero ═══ */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 px-6 text-white overflow-hidden">
        <div className="absolute inset-0 ken-burns-subtle" aria-hidden="true">
          <Image
            src="/images/locations/gadsden-hero.webp"
            alt="Gadsden, Alabama, Etowah County seat"
            fill
            priority
            sizes="100vw"
            quality={80}
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(28,40,38,0.72)] via-[rgba(28,40,38,0.55)] to-[rgba(28,40,38,0.80)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-4 animate-on-scroll">
            <MapPin className="inline w-4 h-4 mr-1 -mt-0.5" />
            Etowah County, Alabama
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 !text-white animate-on-scroll">
            Web Design for{" "}
            <span className="text-hw-primary">Etowah County</span>{" "}
            Businesses
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-10 animate-on-scroll">
            Gadsden. Rainbow City. Attalla. Southside. Wherever you are in Etowah County, your customers are searching Google first and finding your competitors instead.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll">
            <Link href="/audit" className="btn-primary text-lg px-8">
              Get Your Free Site Checkup <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/quiz" className="btn-secondary !text-white !border-white/30 hover:!bg-white/10 text-lg px-8">
              <Sparkles className="w-5 h-5 mr-2" />
              See What You Need
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Cities We Serve ═══ */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-hw-secondary font-semibold text-sm tracking-widest uppercase mb-3 animate-on-scroll">
              Where I Work
            </p>
            <h2 className="text-3xl md:text-4xl font-bold animate-on-scroll">
              Cities Across Etowah County
            </h2>
            <p className="text-hw-text-light mt-4 max-w-xl mx-auto animate-on-scroll">
              Every site is built with location-specific SEO, so you rank in your city, not just somewhere in Alabama.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/${city.slug}`}
                className="card-glow flex gap-4 group animate-on-scroll"
              >
                <div className="shrink-0">
                  <MapPin className="w-5 h-5 text-hw-primary mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-hw-primary transition-colors">
                    {city.name}, AL
                  </h3>
                  <p className="text-hw-text-light text-sm">{city.desc}</p>
                  <span className="text-hw-primary text-sm font-semibold mt-2 inline-flex items-center gap-1">
                    See {city.name} page <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Services ═══ */}
      <section className="py-24 md:py-32 px-6 bg-hw-light">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-3 animate-on-scroll">
              What I Build
            </p>
            <h2 className="text-3xl md:text-4xl font-bold animate-on-scroll">
              Services for Etowah County Businesses
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Monitor,
                title: "Custom Web Design",
                desc: "Clean, mobile-friendly websites built for your specific Etowah County market, not a template anyone can buy.",
              },
              {
                icon: Search,
                title: "Local SEO",
                desc: "On-page optimization so you rank when Gadsden and Etowah County customers search for what you do.",
              },
              {
                icon: Map,
                title: "Google Business Profile",
                desc: "Full GBP setup and optimization so you show up in the map pack for Gadsden, Rainbow City, and Etowah County searches.",
              },
            ].map((svc) => (
              <div key={svc.title} className="card-glow text-center animate-on-scroll">
                <div className="w-14 h-14 rounded-2xl bg-hw-primary/10 text-hw-primary flex items-center justify-center mx-auto mb-4">
                  <svc.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">{svc.title}</h3>
                <p className="text-hw-text-light text-sm">{svc.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 animate-on-scroll">
            <Link href="/services" className="text-hw-primary font-semibold hover:underline">
              View all services and pricing <ArrowRight className="inline w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Why Headley Web ═══ */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-hw-secondary font-semibold text-sm tracking-widest uppercase mb-3 animate-on-scroll">
              Why Work With Me
            </p>
            <h2 className="text-3xl md:text-4xl font-bold animate-on-scroll">
              What Makes This Different
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {whyPoints.map((point) => (
              <div key={point.title} className="card-glow flex gap-4 animate-on-scroll">
                <div className="shrink-0">
                  <Check className="w-6 h-6 text-hw-secondary mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{point.title}</h3>
                  <p className="text-hw-text-light text-sm">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 md:py-32 px-6 bg-hw-dark text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold !text-white mb-4 animate-on-scroll">
            Ready to Get Found in Etowah County?
          </h2>
          <p className="text-gray-300 text-lg mb-3 animate-on-scroll">
            Stop losing customers to competitors with better websites. Let&apos;s build yours the right way.
          </p>
          <p className="text-gray-300 text-sm mb-8 animate-on-scroll">
            Flat-rate pricing from $495. No contracts. You own everything.
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

      {/* ═══ Answer-First AEO Block (sr-only, crawlable) ═══ */}
      <section className="sr-only">
        <h2>Web Design for Etowah County, Alabama Small Businesses</h2>
        <p>
          Headley Web &amp; SEO is a Jacksonville, Alabama web design studio serving small businesses
          across Etowah County, including Gadsden, Rainbow City, Attalla, and Southside. Services include
          custom website design starting at $495, local SEO optimization, and Google Business Profile setup
          and management. Every build includes mobile-friendly design, on-page SEO targeting Etowah County
          searches, and full site ownership with no contracts. Flat-rate pricing, no monthly traps.
        </p>
      </section>
    </main>
  );
}
