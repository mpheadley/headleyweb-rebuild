import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Prompts for Your StoryBrand BrandScript | Headley Web & SEO",
  description:
    "Copy-paste prompts for ChatGPT or Claude that help local business owners refine each section of their StoryBrand BrandScript without losing their voice.",
  alternates: { canonical: "/resources/ai-prompts" },
  openGraph: {
    title: "AI Prompts for Your StoryBrand BrandScript",
    description: "Copy-paste prompts that help you refine each section of your BrandScript without losing your voice.",
    url: "https://headleyweb.com/resources/ai-prompts",
    images: [{ url: "https://headleyweb.com/images/headley_web_seo_clean-1200-630.webp" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
