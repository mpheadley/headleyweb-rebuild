import type { Metadata } from "next";
import { Outfit, Fraunces, Rock_Salt } from "next/font/google";
import "./globals.css";
import ScrollReveal from "./components/ScrollReveal";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import LenisProvider from "./components/LenisProvider";

const outfit = Outfit({
  variable: "--font-outfit",
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
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Headley Web & SEO | Web Design for Local Businesses in Jacksonville & Anniston, AL",
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
        alt: "Headley Web & SEO: Get Found. Get Calls. Get Booked.",
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
        <link rel="author" href="https://headleyweb.com" />
      </head>
      <body className={`${outfit.variable} ${fraunces.variable} ${rockSalt.variable} antialiased`}>
        {/* Built by Headley Web & SEO | headleyweb.com */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-hw-primary focus:text-white focus:px-4 focus:py-2 focus:rounded">
          Skip to content
        </a>
        <LenisProvider>
          <Nav />
          {children}
          <Footer />
          <CookieBanner />
          <ScrollReveal />
        </LenisProvider>
      </body>
    </html>
  );
}
