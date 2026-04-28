import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StoryBrand BrandScript Worksheet for Local Business | Headley Web & SEO",
  description:
    "A free, fillable StoryBrand BrandScript worksheet for local business owners. Clarify your message in 7 sections so customers actually listen.",
  alternates: { canonical: "/resources/brandscript" },
  openGraph: {
    title: "StoryBrand BrandScript Worksheet for Local Business",
    description: "A free, fillable BrandScript worksheet for local business owners. Clarify your message in 7 sections.",
    url: "https://headleyweb.com/resources/brandscript",
    images: [{ url: "https://headleyweb.com/images/headley_web_seo_clean-1200-630.webp" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
