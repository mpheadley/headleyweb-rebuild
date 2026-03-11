import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  image?: string;
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

    return {
      frontmatter: data as BlogFrontmatter,
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
