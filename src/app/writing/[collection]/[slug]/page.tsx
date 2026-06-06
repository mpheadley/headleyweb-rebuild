import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { marked } from "marked";
import Link from "next/link";
import { writingCollections, bioSourceMap } from "@/app/data/writing";
import type { Metadata } from "next";

type Props = { params: Promise<{ collection: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${slug} — Writing` };
}

export default async function WritingPiecePage({ params }: Props) {
  const { collection, slug } = await params;

  const col = writingCollections.find(c => c.id === collection);
  const piece = col?.pieces.find(p => p.slug === slug);

  const extensions = [".md", ".mdx", ".txt"];
  let raw = "";
  for (const ext of extensions) {
    const filePath = join(process.cwd(), "content/writing", collection, slug + ext);
    if (existsSync(filePath)) {
      raw = readFileSync(filePath, "utf-8");
      break;
    }
  }

  const html = raw ? marked(raw) : "<p style='color:#888'>File not found.</p>";
  const crossRefs = bioSourceMap[`${collection}/${slug}`];

  return (
    <main style={{ background: "#faf8f4", minHeight: "100dvh", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Nav */}
      <nav style={{ background: "#1a1612", padding: "0.8rem 2rem", display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link href="/writing" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", fontFamily: "monospace", textDecoration: "none", letterSpacing: "0.1em" }}>← Writing</Link>
        {col && <span style={{ color: col.color, fontSize: "0.75rem", fontFamily: "monospace" }}>{col.title}</span>}
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", fontFamily: "monospace", marginLeft: "auto" }}>{piece?.status ?? "—"}</span>
      </nav>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "3rem 2rem 6rem" }}>
        {/* Bio source cross-refs */}
        {crossRefs && (
          <div style={{ background: "#f0e8d8", border: "1px solid #ddd5c8", borderLeft: "3px solid #c9a87c", padding: "1rem 1.2rem", marginBottom: "2rem", borderRadius: "0 4px 4px 0" }}>
            <p style={{ fontSize: "0.6rem", fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase", color: "#7a6a58", marginBottom: "0.5rem" }}>Source material from 2026-06-06 session</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {crossRefs.map((ref, i) => (
                <li key={i} style={{ fontSize: "0.82rem", color: "#3d3228", padding: "0.25rem 0", borderBottom: i < crossRefs.length - 1 ? "1px solid #ddd5c8" : "none" }}>
                  {ref}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Piece notes */}
        {piece?.notes && (
          <div style={{ background: "#fff3cd", border: "1px solid #ffc107", padding: "0.8rem 1rem", marginBottom: "2rem", borderRadius: "4px", fontSize: "0.82rem", color: "#856404" }}>
            {piece.notes}
          </div>
        )}

        {/* Content */}
        <div
          className="prose-writing"
          dangerouslySetInnerHTML={{ __html: html as string }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1.05rem",
            lineHeight: 1.8,
            color: "#1a1612",
          }}
        />
      </div>

      <style>{`
        .prose-writing h1, .prose-writing h2, .prose-writing h3 { font-family: 'Georgia', serif; color: #1a1612; margin: 2rem 0 0.75rem; line-height: 1.2; }
        .prose-writing h1 { font-size: 2rem; }
        .prose-writing h2 { font-size: 1.4rem; }
        .prose-writing h3 { font-size: 1.1rem; }
        .prose-writing p { margin-bottom: 1.2rem; }
        .prose-writing blockquote { border-left: 3px solid #c9a87c; margin: 1.5rem 0; padding: 0.3rem 0 0.3rem 1.2rem; font-style: italic; color: #3d3228; }
        .prose-writing hr { border: none; border-top: 1px solid #ddd5c8; margin: 2rem 0; }
        .prose-writing em { font-style: italic; }
        .prose-writing strong { font-weight: 600; }
        .prose-writing code { background: #f0e8d8; padding: 0.1rem 0.3rem; font-size: 0.9em; }
        .prose-writing ul, .prose-writing ol { padding-left: 1.5rem; margin-bottom: 1.2rem; }
        .prose-writing li { margin-bottom: 0.3rem; }
      `}</style>
    </main>
  );
}
