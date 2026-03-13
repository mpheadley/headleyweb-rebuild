import { getAllPosts } from "@/lib/blog";

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return c;
    }
  });
}

function formatRfc2822(dateString: string): string {
  return new Date(dateString).toUTCString();
}

export function GET() {
  const posts = getAllPosts();
  const siteUrl = "https://headleyweb.com";
  const feedUrl = `${siteUrl}/blog/feed.xml`;

  const itemsXml = posts
    .map((post) => {
      const { title, description, date, slug, tags } = post.frontmatter;
      const postUrl = `${siteUrl}/blog/${slug}`;

      const categories = tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("\n      ");

      return `
    <item>
      <title>${escapeXml(title)}</title>
      <link>${postUrl}</link>
      <description>${escapeXml(description)}</description>
      <pubDate>${formatRfc2822(date)}</pubDate>
      <guid isPermaLink="true">${postUrl}</guid>
      ${categories}
    </item>`;
    })
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2003/Atom">
  <channel>
    <title>Headley Web &amp; SEO Blog</title>
    <link>${siteUrl}</link>
    <description>Web design tips, local SEO strategies, and StoryBrand insights for small business owners in Northeast Alabama.</description>
    <language>en-us</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
