import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site Readiness Quiz",
  description:
    "Take a 60-second quiz to find out how your business's online presence stacks up — and get a personalized recommendation for what to fix first.",
  alternates: {
    canonical: "/quiz",
  },
  openGraph: {
    url: "/quiz",
    images: [
      {
        url: "/images/headley_web_seo_clean-1200-630.webp",
        width: 1200,
        height: 630,
        alt: "Headley Web & SEO — Site Readiness Quiz",
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://headleyweb.com" },
    { "@type": "ListItem", position: 2, name: "Site Readiness Quiz", item: "https://headleyweb.com/quiz" },
  ],
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Suspense fallback={null}>{children}</Suspense>
    </>
  );
}
