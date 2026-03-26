import type { MetadataRoute } from "next";
import { getAllLocationSlugs } from "@/app/data/locations";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://headleyweb.com";

  const locationPages = getAllLocationSlugs().map((slug) => ({
    url: `${baseUrl}/locations/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPosts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.frontmatter.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/labs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/quiz`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/audit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/locations/calhoun-county`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/locations/etowah-county`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...locationPages,
    ...blogPosts,
  ];
}
