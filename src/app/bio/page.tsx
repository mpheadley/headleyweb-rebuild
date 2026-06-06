import type { Metadata } from "next";
import { publicBio } from "@/app/data/bio";

export const metadata: Metadata = {
  title: "Bio — Matt Headley",
  description: publicBio.shortBio,
  alternates: { canonical: "/bio" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Matt Headley",
    url: "/bio",
  },
};

export default function BioPage() {
  return (
    <main id="main-content" className="max-w-3xl mx-auto px-6 py-24 md:py-32">
      {/* Header */}
      <div className="mb-16">
        <p className="text-xs font-mono tracking-widest uppercase text-hw-primary mb-3">
          Biography
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{publicBio.name}</h1>
        <p className="text-lg text-hw-text-light italic">{publicBio.tagline}</p>
        <p className="text-sm text-hw-text-light mt-2">{publicBio.location}</p>
      </div>

      {/* Long bio */}
      <div className="prose prose-lg max-w-none mb-16">
        {publicBio.longBio.split("\n\n").map((p, i) => (
          <p key={i} className="text-hw-text mb-5 leading-relaxed text-lg">
            {p}
          </p>
        ))}
      </div>

      {/* Career */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 border-b border-black/10 pb-4">Career</h2>
        <div className="space-y-6">
          {publicBio.career.map((entry) => (
            <div key={entry.years} className="grid grid-cols-[120px_1fr] gap-6">
              <span className="text-sm font-mono text-hw-primary pt-0.5">{entry.years}</span>
              <div>
                <div className="font-semibold text-hw-dark">{entry.role}</div>
                <div className="text-hw-text-light text-sm mt-1">{entry.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Credentials */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 border-b border-black/10 pb-4">What I Bring</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {publicBio.credentials.map((c) => (
            <div key={c.title} className="bg-hw-light rounded-xl p-5">
              <div className="font-semibold mb-1">{c.title}</div>
              <div className="text-sm text-hw-text-light">{c.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quotes */}
      <section>
        <h2 className="text-2xl font-bold mb-8 border-b border-black/10 pb-4">In His Own Words</h2>
        <div className="space-y-8">
          {publicBio.quotes.map((q) => (
            <blockquote key={q.source} className="border-l-4 border-hw-primary pl-6">
              <p className="text-lg italic text-hw-dark leading-relaxed">
                &ldquo;{q.text}&rdquo;
              </p>
              <cite className="text-xs font-mono tracking-wider uppercase text-hw-text-light mt-2 block">
                {q.source}
              </cite>
            </blockquote>
          ))}
        </div>
      </section>
    </main>
  );
}
