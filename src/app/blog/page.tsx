import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, Tag, MapPin, Sparkles } from "lucide-react";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Web design tips, local SEO strategies, and StoryBrand insights for small business owners in Northeast Alabama. Practical advice to help your website generate more leads.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: "/blog",
    images: [
      {
        url: "/images/headley_web_seo_clean-1200-630.webp",
        width: 1200,
        height: 630,
        alt: "Headley Web & SEO Blog",
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://headleyweb.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://headleyweb.com/blog" },
  ],
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 px-6 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center ken-burns-subtle"
          style={{ backgroundImage: "url('/images/background-charred-stacked-timber.webp')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(28,40,38,0.92)] via-[rgba(28,40,38,0.85)] to-[rgba(28,40,38,0.95)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 !text-white animate-on-scroll">
            The{" "}
            <span className="text-hw-primary">Headley Web</span>{" "}
            Blog
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto animate-on-scroll">
            Practical web design and SEO advice for local business owners who want their website to actually generate leads.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-24 md:py-32 px-6 bg-hw-light">
        <div className="max-w-5xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-center text-hw-text-light text-lg">
              Posts coming soon. Check back shortly.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post, i) => (
                <article
                  key={post.frontmatter.slug}
                  className="card-glow flex flex-col animate-on-scroll"
                  style={{ transitionDelay: `${i * 100}ms` } as React.CSSProperties}
                >
                  {post.frontmatter.image && (
                    <Link href={`/blog/${post.frontmatter.slug}`} className="block overflow-hidden rounded-t-[12px] -mx-8 -mt-8 mb-6">
                      <Image
                        src={post.frontmatter.image}
                        alt={post.frontmatter.title}
                        width={1200}
                        height={630}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    </Link>
                  )}

                  <div className="flex items-center gap-4 text-sm text-hw-text-light mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {formatDate(post.frontmatter.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {post.readingTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold mb-2 text-hw-dark leading-snug">
                    <Link
                      href={`/blog/${post.frontmatter.slug}`}
                      className="hover:text-hw-primary transition-colors"
                    >
                      {post.frontmatter.title}
                    </Link>
                  </h2>

                  <p className="text-hw-text-light mb-4 flex-1">
                    {post.frontmatter.description}
                  </p>

                  {post.frontmatter.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.frontmatter.tags.map((tag) => (
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

                  <Link
                    href={`/blog/${post.frontmatter.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-hw-primary hover:text-hw-primary-dark transition-colors mt-auto"
                  >
                    Read more <ArrowRight size={14} />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 md:py-32 px-6 bg-hw-dark text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold !text-white mb-4 animate-on-scroll">
            Ready to Get Your Business Found?
          </h2>
          <p className="text-gray-300 text-lg mb-3 animate-on-scroll">
            Stop losing customers to competitors with better websites. Let&apos;s get your business online the right way.
          </p>
          <p className="text-gray-300 text-sm mb-8 animate-on-scroll">
            <MapPin className="inline w-4 h-4 mr-1 -mt-0.5" />
            Serving Jacksonville, Anniston, and Northeast Alabama
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll">
            <Link href="/contact" className="btn-primary text-lg px-8">
              Get Your Free Site Checkup <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/quiz" className="btn-secondary !text-white !border-white/30 hover:!bg-white/10 text-lg px-8">
              <Sparkles className="w-5 h-5 mr-2" />
              Take the Quiz
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
