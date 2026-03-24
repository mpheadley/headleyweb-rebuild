import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/** Get the last git commit date for a file (ISO date only). Falls back to null. */
function getGitLastModified(filePath: string): string | null {
  try {
    const result = execSync(`git log -1 --format=%aI -- "${filePath}"`, {
      encoding: "utf-8",
      cwd: process.cwd(),
      stdio: "pipe",
    }).trim();
    if (!result) return null;
    return result.slice(0, 10);
  } catch {
    return null;
  }
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  lastModified?: string;
  slug: string;
  tags: string[];
  image?: string;
  question?: string;
  tldr?: string;
}

/** Author + publisher constants — update sameAs URLs when available */
export const AUTHOR = {
  name: "Matt Headley",
  url: "https://headleyweb.com/about",
  sameAs: [
    "https://www.linkedin.com/in/mpheadley/",
    "https://share.google/dgOVQ1xvLGRCnunm9",
    // TODO: Add Facebook business page URL
  ],
};

export const PUBLISHER = {
  name: "Headley Web & SEO",
  url: "https://headleyweb.com",
};

/** Extract H2 headings from MDX content for ToC + FAQ schema */
export function extractHeadings(content: string): { text: string; id: string }[] {
  const h2Regex = /^## (.+)$/gm;
  const headings: { text: string; id: string }[] = [];
  let match;
  while ((match = h2Regex.exec(content)) !== null) {
    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ text, id });
  }
  return headings;
}

/** Build FAQPage schema from H2s that look like questions */
export function buildFaqSchema(headings: { text: string; id: string }[], content: string) {
  const questionHeadings = headings.filter(
    (h) => h.text.includes("?") || h.text.toLowerCase().startsWith("why") || h.text.toLowerCase().startsWith("how") || h.text.toLowerCase().startsWith("what")
  );
  if (questionHeadings.length === 0) return null;

  const faqItems = questionHeadings.map((h) => {
    // Extract content between this heading and the next heading
    const headingPattern = `## ${h.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`;
    const idx = content.search(new RegExp(headingPattern));
    if (idx === -1) return null;
    const afterHeading = content.slice(idx + headingPattern.length);
    const nextH2 = afterHeading.search(/^## /m);
    const sectionContent = (nextH2 === -1 ? afterHeading : afterHeading.slice(0, nextH2))
      .replace(/^---$/m, "")
      .replace(/\*\*/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/^>\s*/gm, "")
      .replace(/^###?\s.+$/gm, "")
      .trim()
      .slice(0, 500);
    if (!sectionContent) return null;
    return {
      "@type": "Question",
      name: h.text,
      acceptedAnswer: {
        "@type": "Answer",
        text: sectionContent,
      },
    };
  }).filter(Boolean);

  if (faqItems.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems,
  };
}

export interface BlogPost {
  frontmatter: BlogFrontmatter;
  content: string;
  readingTime: string;
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const stats = readingTime(content);
    const fm = data as BlogFrontmatter;

    // Auto-set lastModified from git if not in frontmatter
    if (!fm.lastModified) {
      const gitDate = getGitLastModified(filePath);
      if (gitDate && gitDate !== fm.date) {
        fm.lastModified = gitDate;
      }
    }

    return {
      frontmatter: fm,
      content,
      readingTime: stats.text,
    };
  });

  // Sort by date, newest first
  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((p) => p.frontmatter.slug === slug) ?? null;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.frontmatter.slug);
}
