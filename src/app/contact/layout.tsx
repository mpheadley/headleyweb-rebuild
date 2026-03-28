import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Headley Web & SEO. Request a free site checkup, send a message, or call (256) 644-7334. Web design and SEO for local businesses in Jacksonville, Anniston, and Northeast Alabama.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Headley Web & SEO",
    url: "/contact",
    images: [
      {
        url: "/images/headley-web-og-v2.webp",
        width: 1200,
        height: 630,
        alt: "Headley Web & SEO: Contact",
      },
    ],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
