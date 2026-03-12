import type { Metadata } from "next";
import { Inter, Fraunces, Rock_Salt, Playfair_Display } from "next/font/google";
import "./globals.css";
import ScrollReveal from "./components/ScrollReveal";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const rockSalt = Rock_Salt({
  variable: "--font-rock-salt",
  weight: "400",
  subsets: ["latin"],
  display: "optional",
  preload: false,
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  weight: "700",
  subsets: ["latin"],
  display: "optional",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Headley Web & SEO | Web Design for Northeast Alabama Businesses",
    template: "%s | Headley Web & SEO",
  },
  description:
    "I help Jacksonville, Anniston, and Gadsden businesses get found on Google with clear, mobile-friendly websites that make the phone ring.",
  metadataBase: new URL("https://headleyweb.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    type: "website",
    locale: "en_US",
    siteName: "Headley Web & SEO",
    images: [
      {
        url: "/images/headley_web_seo_clean-1200-630.webp",
        width: 1200,
        height: 630,
        alt: "Headley Web & SEO — Get Found. Get Calls. Get Booked.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/headley_web_seo_clean-1200-630.webp"],
  },
  authors: [{ name: "Headley Web & SEO", url: "https://headleyweb.com" }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Hero bg uses CSS background-image for instant LCP — manual preload since not using next/image */}
        <link rel="preload" href="/images/google-review-hvac.webp" as="image" type="image/webp" fetchPriority="high" />
      </head>
      <body className={`${inter.variable} ${fraunces.variable} ${rockSalt.variable} ${playfairDisplay.variable} antialiased`}>
        <script dangerouslySetInnerHTML={{ __html: "" }} />
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: "<!-- Built by Headley Web & SEO | headleyweb.com -->" }} />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-hw-primary focus:text-white focus:px-4 focus:py-2 focus:rounded">
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer />
        <CookieBanner />
        <ScrollReveal />
      </body>
    </html>
  );
}
