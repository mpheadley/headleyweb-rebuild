import type { Metadata } from "next";
import { MapPin, Check, ArrowRight, Sparkles, Monitor, Search, Map } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { locations, getLocationBySlug, getAllLocationSlugs } from "@/app/data/locations";

type Params = Promise<{ city: string }>;

export async function generateStaticParams() {
  return getAllLocationSlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city } = await params;
  const loc = getLocationBySlug(city);
  if (!loc) return {};

  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    alternates: {
      canonical: `/locations/${loc.slug}`,
    },
    openGraph: {
      url: `/locations/${loc.slug}`,
      images: [
        {
          url: "/images/headley_web_seo_clean-1200-630.webp",
          width: 1200,
          height: 630,
          alt: `Headley Web & SEO — ${loc.metaTitle}`,
        },
      ],
    },
  };
}

export default async function LocationPage({ params }: { params: Params }) {
  const { city } = await params;
  const loc = getLocationBySlug(city);
  if (!loc) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://headleyweb.com" },
      { "@type": "ListItem", position: 2, name: loc.name, item: `https://headleyweb.com/locations/${loc.slug}` },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Headley Web & SEO",
    description: `Headley Web & SEO provides custom web design and local SEO services for businesses in ${loc.name}, ${loc.county}, Alabama.`,
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
      "@type": "City",
      name: loc.name,
      addressRegion: "AL",
      addressCountry: "US",
    },
    creator: {
      "@type": "Organization",
      name: "Headley Web & SEO",
      url: "https://headleyweb.com",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Design & SEO Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `Web Design in ${loc.name}, AL`,
            description: `Custom web design for local businesses in ${loc.name}, Alabama. Mobile-friendly, SEO-optimized websites starting at $495.`,
          },
          price: "495",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `Local SEO in ${loc.name}, AL`,
            description: `Local SEO optimization for ${loc.name} businesses. On-page SEO, Google Business Profile setup, and structured data.`,
          },
        },
      ],
    },
  };

  const nearbyLocations = loc.nearby
    .map((s) => locations.find((l) => l.slug === s))
    .filter(Boolean);

  const services = [
    {
      icon: Monitor,
      title: "Custom Web Design",
      desc: `A clean, mobile-friendly website built for your ${loc.name} business — with clear messaging that turns visitors into customers.`,
    },
    {
      icon: Search,
      title: "Local SEO",
      desc: `On-page optimization so your business ranks when ${loc.name} customers search for what you do on Google.`,
    },
    {
      icon: Map,
      title: "Google Business Profile",
      desc: `Full GBP setup and optimization so you show up in the map pack for ${loc.county} searches.`,
    },
  ];

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
            src={loc.heroImage.src}
            alt={loc.heroImage.alt}
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
            {loc.name}, Alabama
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 !text-white animate-on-scroll">
            {loc.heroHeadline}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto animate-on-scroll">
            {loc.heroSub}
          </p>
        </div>
      </section>

      {/* ═══ Local Intro ═══ */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-14 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg animate-on-scroll">
            <Image
              src={loc.heroImage.src}
              alt={loc.heroImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              quality={80}
              className="object-cover"
            />
            {loc.heroImage.credit && (
              <p className="absolute bottom-0 right-0 text-[10px] text-white/70 bg-black/40 px-2 py-0.5 rounded-tl">
                {loc.heroImage.credit}
              </p>
            )}
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 animate-on-scroll">
              Why {loc.name} Businesses Need a{" "}
              <span className="text-hw-primary hand-accent">Real Website</span>
            </h2>
            <p className="text-lg text-hw-text leading-relaxed animate-on-scroll">
              {loc.localIntro}
            </p>
          </div>
        </div>
      </section>

      {/* ═══ Why Here ═══ */}
      <section className="py-24 md:py-32 px-6 bg-hw-light grain">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-hw-primary font-semibold text-sm tracking-widest uppercase mb-3 animate-on-scroll">
              Local Advantage
            </p>
            <h2 className="text-3xl md:text-4xl font-bold animate-on-scroll">
              What Makes {loc.name} <span className="text-hw-primary hand-accent">Different</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {loc.whyHere.map((item) => (
              <div key={item.title} className="card-glow flex gap-4 animate-on-scroll">
                <div className="shrink-0">
                  <Check className="w-6 h-6 text-hw-secondary mt-1" />
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

      {/* ═══ Services ═══ */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-hw-secondary font-semibold text-sm tracking-widest uppercase mb-3 animate-on-scroll">
              What I Do
            </p>
            <h2 className="text-3xl md:text-4xl font-bold animate-on-scroll">
              Services for {loc.name} Businesses
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((svc) => (
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

      {/* ═══ Nearby Locations ═══ */}
      {nearbyLocations.length > 0 && (
        <section className="py-16 px-6 bg-hw-light grain">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-hw-text-light text-sm mb-4 animate-on-scroll">Also serving nearby cities:</p>
            <div className="flex flex-wrap justify-center gap-3 animate-on-scroll">
              {nearbyLocations.map((nearby) => (
                <Link
                  key={nearby!.slug}
                  href={`/locations/${nearby!.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full text-sm font-medium text-hw-dark border border-hw-secondary/20 hover:border-hw-secondary/50 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-hw-secondary" />
                  {nearby!.name}, AL
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CTA ═══ */}
      <section className="py-24 md:py-32 px-6 bg-hw-dark text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold !text-white mb-4 animate-on-scroll">
            Ready to <span className="text-hw-primary hand-accent">Get Found</span> in {loc.name}?
          </h2>
          <p className="text-gray-300 text-lg mb-3 animate-on-scroll">
            Stop losing customers to competitors with better websites. Let&apos;s get your {loc.name} business online the right way.
          </p>
          <p className="text-gray-300 text-sm mb-8 animate-on-scroll">
            Flat-rate pricing from $495. No contracts. You own everything.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll">
            <Link href="/audit" className="btn-primary text-lg px-8">
              Get Your Free Site Checkup <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/quiz"
              className="btn-secondary !text-white !border-white/30 hover:!bg-white/10 text-lg px-8"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Take the Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Answer-First AEO Block ═══ */}
      <section className="sr-only">
        <h2>Web Design in {loc.name}, Alabama</h2>
        <p>
          Headley Web &amp; SEO provides custom web design, local SEO, and Google Business Profile management
          for businesses in {loc.name}, {loc.county}, Alabama. Services include mobile-friendly website design
          starting at $495, on-page SEO optimization, and Google Maps listing setup. Based in Jacksonville, AL,
          Headley Web &amp; SEO serves {loc.name} and surrounding {loc.county} communities with flat-rate pricing,
          no contracts, and full site ownership from day one.
        </p>
      </section>
    </main>
  );
}
