import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";

// MDX components — maps markdown elements to styled HTML
const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      className="text-2xl md:text-3xl font-bold text-hw-dark mt-12 mb-4"
      {...props}
    />
  ),
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

  const { title, description, image } = post.frontmatter;

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
      publishedTime: post.frontmatter.date,
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
        item: `https://headleyweb.com/blog/${slug}`,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    author: {
      "@type": "Person",
      name: "Matt Headley",
      url: "https://headleyweb.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Headley Web & SEO",
      url: "https://headleyweb.com",
    },
    mainEntityOfPage: `https://headleyweb.com/blog/${slug}`,
    ...(frontmatter.image && {
      image: `https://headleyweb.com${frontmatter.image}`,
    }),
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, articleSchema]),
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

          <div className="flex flex-wrap items-center gap-4 text-sm text-hw-text-light mb-6 animate-on-scroll">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(frontmatter.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {readingTime}
            </span>
          </div>

          {frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 animate-on-scroll">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-hw-secondary/10 text-hw-secondary"
                >
                  <Tag size={10} />
                  {tag}
                </span>
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
              className="w-full rounded-lg shadow-md"
              priority
            />
          </div>
        </section>
      )}

      {/* Article Content */}
      <article className="px-6 pb-20 md:pb-28 bg-hw-light">
        <div className="max-w-3xl mx-auto prose-custom">
          <MDXRemote source={content} components={mdxComponents} />
        </div>
      </article>

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
