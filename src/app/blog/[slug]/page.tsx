import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, Tag, List } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllSlugs, getPostBySlug, extractHeadings, buildFaqSchema, AUTHOR, PUBLISHER } from "@/lib/blog";
import { notFound } from "next/navigation";

/** Generate a URL-safe slug from heading text */
function toId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// MDX components — maps markdown elements to styled HTML
const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => {
    const text = typeof props.children === "string" ? props.children : "";
    const id = toId(text);
    return (
      <h2
        id={id}
        className="text-2xl md:text-3xl font-bold text-hw-dark mt-12 mb-4 scroll-mt-24"
        {...props}
      />
    );
  },
  h3: (props: React.ComponentProps<"h3">) => (
    <h3
      className="text-xl md:text-2xl font-bold text-hw-dark mt-10 mb-3"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="text-hw-text leading-relaxed mb-6" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a
      className="text-hw-primary font-medium underline underline-offset-2 hover:text-hw-primary-dark transition-colors"
      {...props}
    />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="list-disc list-inside space-y-2 mb-6 text-hw-text" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="list-decimal list-inside space-y-2 mb-6 text-hw-text" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="border-l-4 border-hw-primary pl-6 py-2 my-8 bg-hw-primary/5 rounded-r-lg italic text-hw-text"
      {...props}
    />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-bold text-hw-dark" {...props} />
  ),
  em: (props: React.ComponentProps<"em">) => (
    <em className="italic" {...props} />
  ),
  hr: () => (
    <hr className="my-10 border-t border-hw-dark/10" />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code
      className="bg-hw-dark/5 text-hw-primary-dark px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: React.ComponentProps<"pre">) => (
    <pre
      className="bg-hw-dark text-hw-light p-6 rounded-lg overflow-x-auto mb-6 text-sm"
      {...props}
    />
  ),
  table: (props: React.ComponentProps<"table">) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full border-collapse text-sm text-hw-text" {...props} />
    </div>
  ),
  thead: (props: React.ComponentProps<"thead">) => (
    <thead className="bg-hw-dark text-hw-white" {...props} />
  ),
  th: (props: React.ComponentProps<"th">) => (
    <th className="px-4 py-3 text-left font-semibold" {...props} />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td className="px-4 py-3 border-t border-hw-dark/10" {...props} />
  ),
};

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { title, description, image, lastModified, date } = post.frontmatter;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      url: `/blog/${slug}`,
      title,
      description,
      type: "article",
      publishedTime: date,
      ...(lastModified && { modifiedTime: lastModified }),
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: title }]
        : [
            {
              url: "/images/headley_web_seo_clean-1200-630.webp",
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content, readingTime } = post;
  const headings = extractHeadings(content);
  const faqSchema = buildFaqSchema(headings, content);
  const postUrl = `https://headleyweb.com/blog/${slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://headleyweb.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://headleyweb.com/blog" },
      {
        "@type": "ListItem",
        position: 3,
        name: frontmatter.title,
        item: postUrl,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.tldr || frontmatter.description,
    datePublished: frontmatter.date,
    ...(frontmatter.lastModified && { dateModified: frontmatter.lastModified }),
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      url: AUTHOR.url,
      ...(AUTHOR.sameAs.length > 0 && { sameAs: AUTHOR.sameAs }),
    },
    publisher: {
      "@type": "Organization",
      name: PUBLISHER.name,
      url: PUBLISHER.url,
    },
    mainEntityOfPage: postUrl,
    ...(frontmatter.image && {
      image: `https://headleyweb.com${frontmatter.image}`,
    }),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["[data-speakable='true']", "h1"],
    },
  };

  // Combine all schemas
  const schemas: Record<string, unknown>[] = [breadcrumbSchema, articleSchema];
  if (faqSchema) schemas.push(faqSchema);

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas),
        }}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-36 md:pb-20 px-6 bg-hw-light">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-hw-secondary hover:text-hw-secondary-dark transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to Blog
          </Link>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight animate-on-scroll">
            {frontmatter.title}
          </h1>

          {/* TLDR — speakable summary for AI engines + voice assistants */}
          {frontmatter.tldr && (
            <p
              data-speakable="true"
              className="text-hw-text leading-relaxed mb-6 text-lg italic border-l-4 border-hw-secondary pl-4 animate-on-scroll"
            >
              <strong className="not-italic text-hw-dark">TL;DR:</strong> {frontmatter.tldr}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-hw-text-light mb-6 animate-on-scroll">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(frontmatter.date)}
            </span>
            {frontmatter.lastModified && frontmatter.lastModified !== frontmatter.date && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                Updated {formatDate(frontmatter.lastModified)}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {readingTime}
            </span>
          </div>

          {frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 animate-on-scroll">
              {frontmatter.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-hw-secondary/10 text-hw-secondary hover:bg-hw-secondary/20 transition-colors"
                >
                  <Tag size={10} />
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Image */}
      {frontmatter.image && (
        <section className="px-6 pb-8 bg-hw-light">
          <div className="max-w-3xl mx-auto">
            <Image
              src={frontmatter.image}
              alt={frontmatter.title}
              width={1200}
              height={630}
              sizes="(min-width: 768px) 768px, 100vw"
              className="w-full rounded-lg shadow-md"
              priority
            />
          </div>
        </section>
      )}

      {/* Table of Contents */}
      {headings.length >= 3 && (
        <nav className="px-6 pb-8 bg-hw-light" aria-label="Table of contents">
          <div className="max-w-3xl mx-auto">
            <details className="card-glow" open>
              <summary className="flex items-center gap-2 cursor-pointer text-hw-dark font-semibold text-lg select-none">
                <List size={18} className="text-hw-secondary" />
                In This Article
              </summary>
              <ol className="mt-4 space-y-2 list-decimal list-inside text-sm">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="text-hw-secondary hover:text-hw-primary transition-colors"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          </div>
        </nav>
      )}

      {/* Article Content */}
      <article className="px-6 pb-20 md:pb-28 bg-hw-light">
        <div className="max-w-3xl mx-auto prose-custom">
          <MDXRemote source={content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>
      </article>

      {/* Author */}
      <section className="px-6 pb-12 bg-hw-light">
        <div className="max-w-3xl mx-auto flex items-center gap-3 border-t border-gray-200 pt-8">
          <Image
            src="/images/logo-icon-sm.webp"
            alt="Headley Web & SEO"
            width={40}
            height={35}
            sizes="40px"
            className="w-10 h-auto rounded-full bg-[#F2E8D4] p-0.5"
          />
          <div>
            <p className="text-sm font-semibold text-hw-text">Matt Headley</p>
            <p className="text-xs text-hw-text-light">
              Headley Web <span className="amp">&amp;</span> SEO · Jacksonville, AL
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 md:pb-28 bg-hw-light">
        <div className="max-w-3xl mx-auto text-center card-glow">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Want a Website That{" "}
            <span className="text-hw-primary hand-accent">Actually Works?</span>
          </h2>
          <p className="text-hw-text-light mb-6 max-w-xl mx-auto">
            Let&apos;s talk about your business, your goals, and how a clear
            website can start generating leads.
          </p>
          <Link href="/contact" className="btn-primary">
            Get a Free Strategy Call
          </Link>
        </div>
      </section>
    </main>
  );
}
