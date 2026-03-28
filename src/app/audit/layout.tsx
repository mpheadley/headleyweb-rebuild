import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Site Audit | Headley Web & SEO",
  description:
    "Paste your URL and get an instant website audit covering speed, SEO, mobile-friendliness, and messaging analysis. Free, no signup required.",
  alternates: {
    canonical: "/audit",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Headley Web & SEO",
    url: "/audit",
    images: [
      {
        url: "/images/headley-web-og-v2.webp",
        width: 1200,
        height: 630,
        alt: "Headley Web & SEO: Free Site Audit",
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://headleyweb.com" },
    { "@type": "ListItem", position: 2, name: "Free Site Audit", item: "https://headleyweb.com/audit" },
  ],
};

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <noscript>
        <div style={{ maxWidth: 600, margin: "120px auto", padding: 24, textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
          <h1>Free Site Audit</h1>
          <p>This tool requires JavaScript to run. Please enable JavaScript in your browser, or call <a href="tel:+12566447334">(256) 644-7334</a> for a free manual audit.</p>
        </div>
      </noscript>
      <Suspense fallback={null}>{children}</Suspense>
    </>
  );
}
