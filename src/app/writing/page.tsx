import Link from "next/link";
import { writingCollections } from "@/app/data/writing";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Writing Archive — Matt Headley" };

export default function WritingPage() {
  const total = writingCollections.reduce((n, c) => n + c.pieces.length, 0);
  return (
    <main style={{ background: "#07110D", minHeight: "100dvh", color: "#E8DCC8", fontFamily: "'DM Sans', sans-serif", padding: "0 0 4rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 2rem 0" }}>
        <p style={{ fontFamily: "monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#4A7C6F", marginBottom: "0.5rem" }}>Private Archive · PIN Required</p>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem,6vw,3.5rem)", fontWeight: 400, color: "#C8A97E", marginBottom: "0.4rem", lineHeight: 1.1 }}>Writing</h1>
        <p style={{ color: "rgba(232,220,200,0.5)", fontSize: "0.9rem", marginBottom: "3rem" }}>{total} pieces across {writingCollections.length} collections</p>

        {writingCollections.map(col => (
          <section key={col.id} style={{ marginBottom: "3rem" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", borderBottom: `2px solid ${col.color}`, paddingBottom: "0.5rem", marginBottom: "1.2rem" }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.3rem", fontWeight: 400, color: col.color }}>{col.title}</h2>
              <span style={{ fontSize: "0.65rem", fontFamily: "monospace", color: "rgba(232,220,200,0.35)", letterSpacing: "0.1em" }}>{col.pieces.length} pieces</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "rgba(232,220,200,0.5)", marginBottom: "1.2rem" }}>{col.description}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              {col.pieces.map(piece => (
                <Link key={piece.slug} href={`/writing/${col.id}/${piece.slug}`}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.65rem 0.8rem", background: "rgba(255,255,255,0.03)", borderRadius: "4px", textDecoration: "none", borderLeft: `3px solid ${statusColor(piece.status)}` }}>
                  <span style={{ color: "#E8DCC8", fontSize: "0.92rem" }}>{piece.title}</span>
                  <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: statusColor(piece.status), letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0, marginLeft: "1rem" }}>{piece.status}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <div style={{ marginTop: "2rem", padding: "1.2rem", background: "rgba(255,255,255,0.03)", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#4A7C6F", marginBottom: "0.5rem" }}>Quick Links</p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {[["Profile", "/profile"], ["Bio", "/bio"], ["North Star", "/north-star.html"]].map(([label, href]) => (
              <Link key={href} href={href} style={{ color: "#C8A97E", fontSize: "0.85rem", textDecoration: "none" }}>→ {label}</Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function statusColor(s: string) {
  return s === "complete" ? "#4A7C6F" : s === "draft" ? "#C8A97E" : s === "gap" ? "#8B4513" : "#4A6058";
}
