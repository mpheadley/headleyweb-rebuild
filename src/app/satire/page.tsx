import { SATIRE_DRAFTS, PUBLISH_SCHEDULE, HOT_NEWS, type SatireDraft } from "@/app/data/satire-ops";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Satire Ops · TPT + GT" };

const PUB = {
  tpt: { name: "The Pulpit Truth", url: "https://thepulpittruth.com", color: "#1f2937", slug: "tpt" },
  gt: { name: "Green Tomato", url: "https://thegreentomato.news", color: "#4d7c0f", slug: "gt" },
};

const STATUS_COLOR: Record<string, string> = {
  draft: "#94a3b8",
  reviewing: "#fbbf24",
  scheduled: "#3b82f6",
  shipped: "#22c55e",
  killed: "#ef4444",
};

export default function SatirePage() {
  const tptDrafts = SATIRE_DRAFTS.filter(d => d.publication === "tpt");
  const gtDrafts = SATIRE_DRAFTS.filter(d => d.publication === "gt");
  const upcoming = PUBLISH_SCHEDULE.filter(s => new Date(s.date) > new Date("2026-06-07")).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <main style={{ background: "#0f172a", minHeight: "100dvh", color: "#e2e8f0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "2rem", fontWeight: 400, color: "#fbbf24", marginBottom: "0.5rem" }}>
          Satire Ops
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "2rem" }}>
          TPT + GT publishing console · drafts · schedule · hot news · podcast queue
        </p>

        {/* ─── This week's schedule ─── */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#fbbf24", marginBottom: "1rem" }}>This Week's Publish Schedule</h2>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            {upcoming.length === 0 && <p style={{ color: "#475569", fontSize: "0.85rem" }}>Nothing scheduled.</p>}
            {upcoming.map((slot, i) => {
              const pub = PUB[slot.publication];
              const draft = slot.slug ? SATIRE_DRAFTS.find(d => d.slug === slot.slug && d.publication === slot.publication) : null;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.65rem 0.9rem", background: "#1e293b", borderRadius: 6, borderLeft: `3px solid ${pub.color}` }}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#94a3b8", flexShrink: 0, minWidth: 130 }}>
                    {new Date(slot.date).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/Chicago" })} CT
                  </span>
                  <span style={{ fontSize: "0.65rem", color: pub.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", flexShrink: 0 }}>{pub.slug.toUpperCase()}</span>
                  <span style={{ fontSize: "0.65rem", padding: "0.1rem 0.4rem", background: "#0f172a", color: "#94a3b8", borderRadius: 3, textTransform: "uppercase", letterSpacing: "0.08em", flexShrink: 0 }}>{slot.channel}</span>
                  <span style={{ fontSize: "0.85rem", color: "#e2e8f0", flex: 1 }}>{draft?.title.slice(0, 70) ?? slot.slug}{draft && draft.title.length > 70 ? "…" : ""}</span>
                  {!slot.scheduled && <span style={{ fontSize: "0.6rem", color: "#f59e0b", padding: "0.15rem 0.4rem", background: "rgba(245,158,11,0.1)", borderRadius: 3 }}>queue</span>}
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── Hot news ─── */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#fbbf24", marginBottom: "1rem" }}>Hot Church News — Satire Pipeline</h2>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            {HOT_NEWS.sort((a, b) => b.score - a.score).map((item, i) => (
              <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "0.85rem 1rem", background: "#1e293b", borderRadius: 6, textDecoration: "none", borderLeft: `3px solid ${item.score >= 9 ? "#ef4444" : item.score >= 7 ? "#f59e0b" : "#475569"}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#fbbf24", fontWeight: 700 }}>{item.score}/10</span>
                  <span style={{ fontSize: "0.65rem", color: "#94a3b8" }}>{item.source}</span>
                  <span style={{ fontSize: "0.65rem", color: "#475569" }}>· {item.publishedAt}</span>
                </div>
                <p style={{ fontSize: "0.9rem", color: "#e2e8f0", margin: "0 0 0.3rem", lineHeight: 1.3 }}>{item.headline}</p>
                {item.bestAngle && <p style={{ fontSize: "0.7rem", color: "#94a3b8", margin: 0, fontStyle: "italic" }}>↳ {item.bestAngle}</p>}
              </a>
            ))}
          </div>
        </section>

        {/* ─── TPT drafts ─── */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "1rem", borderBottom: "1px solid #1f2937", paddingBottom: "0.5rem" }}>The Pulpit Truth · Drafts</h2>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            {tptDrafts.map(d => <DraftCard key={d.slug} draft={d} />)}
          </div>
        </section>

        {/* ─── GT drafts ─── */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#4d7c0f", marginBottom: "1rem", borderBottom: "1px solid #1f2937", paddingBottom: "0.5rem" }}>Green Tomato · Drafts (Buford Tatum)</h2>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            {gtDrafts.map(d => <DraftCard key={d.slug} draft={d} />)}
          </div>
        </section>

        {/* ─── Podcast queue ─── */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#fbbf24", marginBottom: "1rem" }}>Podcast Queue — TPT + GT</h2>
          <div style={{ background: "#1e293b", borderRadius: 8, padding: "1rem 1.2rem" }}>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.75rem" }}>
              Both publications run weekly 20-minute audio reads. TPT: "The Pulpit Truth Hour" — deadpan read of the week's articles + a single fictional church bulletin announcement. GT: "Buford's Notebook Audio" — Buford reads four short observations.
            </p>
            <ul style={{ paddingLeft: "1.2rem", fontSize: "0.85rem", lineHeight: 1.7, color: "#cbd5e1" }}>
              <li><strong style={{ color: "#fbbf24" }}>Production stack:</strong> Riverside or Descript for record, single-mic, no music bed. Auto-transcript → YouTube + Spotify.</li>
              <li><strong style={{ color: "#fbbf24" }}>Cadence:</strong> Friday morning drop. Sunday morning re-share with that week's franchise article.</li>
              <li><strong style={{ color: "#fbbf24" }}>YouTube shorts:</strong> Cut 30-sec single-headline clips from each episode — vertical, captioned, no music. Two per week per publication.</li>
              <li><strong style={{ color: "#fbbf24" }}>Hosting:</strong> Buzzsprout free tier until 1,000 monthly downloads. Then Transistor.</li>
              <li><strong style={{ color: "#fbbf24" }}>First episode TPT:</strong> Read the Bee response + 30-sec bulletin announcement about an elder board reviewing its own bylaws on bylaw review.</li>
              <li><strong style={{ color: "#fbbf24" }}>First episode GT:</strong> Buc-ee's rumor + three Buford notebook entries about Calhoun County.</li>
            </ul>
          </div>
        </section>

        {/* ─── Babylon Bee Sunday sequence ─── */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#fbbf24", marginBottom: "1rem" }}>Sunday Bee Response — Publish Checklist</h2>
          <div style={{ background: "#1e293b", borderRadius: 8, padding: "1rem 1.2rem" }}>
            <ol style={{ paddingLeft: "1.2rem", fontSize: "0.85rem", lineHeight: 1.8, color: "#cbd5e1" }}>
              <li>Sat 9pm — TPT FB warm-up: <em style={{ color: "#94a3b8" }}>"Sunday morning publish. One we needed to write."</em> No link.</li>
              <li>Sun 7:30am — TPT FB + X + Bluesky · publish + single-sentence intro + link</li>
              <li>Sun 7:35am — Email subscribers · subject: <em style={{ color: "#94a3b8" }}>"Sunday Edition — on a list of seven things"</em></li>
              <li>Sun 8:00am — Matt's personal FB · <em style={{ color: "#94a3b8" }}>"This one was hard to write. Sharing in case you needed it."</em></li>
              <li>Sun 12pm — TPT FB re-share with buried-detail paragraph quote</li>
              <li>Sun 6pm — TPT FB · <em style={{ color: "#94a3b8" }}>"Thanks to the new subscribers today. We'll be here Tuesday."</em></li>
              <li>Mon 9am — Tuesday morning piece teaser. Resume normal cadence.</li>
            </ol>
            <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.85rem", padding: "0.5rem 0.7rem", background: "rgba(239,68,68,0.08)", borderRadius: 4, border: "1px solid rgba(239,68,68,0.2)" }}>
              <strong>Never:</strong> tag the Bee · use #BabylonBee · reply to fights · defend the piece if criticized.
            </p>
          </div>
        </section>

        {/* ─── Quick links ─── */}
        <section>
          <h2 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "1rem" }}>Resources</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.5rem" }}>
            <ResourceLink href="https://github.com/mpheadley/the-pulpit-truth" label="TPT GitHub" sub="full source" />
            <ResourceLink href="https://github.com/mpheadley/green-tomato" label="GT GitHub" sub="full source" />
            <ResourceLink href="https://thepulpittruth.com" label="TPT live" sub="thepulpittruth.com" />
            <ResourceLink href="https://thegreentomato.news" label="GT live" sub="thegreentomato.news" />
            <ResourceLink href="/sl-projects" label="Southern Legends" sub="writing · merch · podcast" />
            <ResourceLink href="/profile" label="Profile" sub="bio + writing archive" />
          </div>
        </section>
      </div>
    </main>
  );
}

function DraftCard({ draft }: { draft: SatireDraft }) {
  const pub = PUB[draft.publication];
  return (
    <div style={{ background: "#1e293b", borderRadius: 6, padding: "0.85rem 1rem", borderLeft: `3px solid ${pub.color}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
        <span style={{ fontSize: "0.6rem", padding: "0.1rem 0.45rem", borderRadius: 3, background: STATUS_COLOR[draft.status] + "22", color: STATUS_COLOR[draft.status], textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>{draft.status}</span>
        {draft.priority && <span style={{ fontSize: "0.58rem", padding: "0.1rem 0.4rem", background: "#0f172a", color: draft.priority === "high" ? "#ef4444" : draft.priority === "medium" ? "#f59e0b" : "#475569", borderRadius: 3, textTransform: "uppercase", letterSpacing: "0.1em" }}>{draft.priority}</span>}
        <span style={{ fontSize: "0.65rem", color: draft.nameConflictChecked ? "#22c55e" : "#ef4444" }}>
          {draft.nameConflictChecked ? "✓ names checked" : "✗ name check pending"}
        </span>
        <span style={{ fontSize: "0.65rem", color: draft.hasImage ? "#22c55e" : "#94a3b8" }}>
          {draft.hasImage ? "✓ image" : "○ image pending"}
        </span>
      </div>
      <p style={{ fontSize: "0.95rem", color: "#e2e8f0", margin: "0 0 0.3rem", lineHeight: 1.3 }}>{draft.title}</p>
      {draft.dek && <p style={{ fontSize: "0.78rem", color: "#94a3b8", margin: "0 0 0.5rem", fontStyle: "italic", lineHeight: 1.4 }}>{draft.dek}</p>}
      {draft.notes && <p style={{ fontSize: "0.72rem", color: "#fbbf24", margin: "0 0 0.5rem", padding: "0.3rem 0.5rem", background: "rgba(251,191,36,0.06)", borderRadius: 3, lineHeight: 1.4 }}>📌 {draft.notes}</p>}
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
        <a href={draft.editGithubUrl} target="_blank" rel="noopener noreferrer" style={btnStyle("#22c55e")}>✎ Edit on GitHub</a>
        {draft.imagePrompt && !draft.hasImage && <span style={btnStyle("#f59e0b", true)} title={draft.imagePrompt}>🖼 Queue image</span>}
        {draft.publishedUrl && <a href={draft.publishedUrl} target="_blank" rel="noopener noreferrer" style={btnStyle("#3b82f6")}>↗ Live</a>}
        <a href={`https://github.com/mpheadley/${pub.slug === "tpt" ? "the-pulpit-truth" : "green-tomato"}/blob/main/content/articles/_drafts/${draft.slug}.mdx`} target="_blank" rel="noopener noreferrer" style={btnStyle("#475569")}>📄 View raw</a>
      </div>
    </div>
  );
}

function ResourceLink({ href, label, sub }: { href: string; label: string; sub: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "0.6rem 0.9rem", background: "#1e293b", borderRadius: 6, textDecoration: "none", border: "1px solid #334155" }}>
      <p style={{ fontSize: "0.8rem", color: "#fbbf24", margin: 0, fontWeight: 600 }}>{label}</p>
      <p style={{ fontSize: "0.65rem", color: "#94a3b8", margin: "0.15rem 0 0", fontStyle: "italic" }}>{sub}</p>
    </a>
  );
}

function btnStyle(color: string, ghost = false): React.CSSProperties {
  return {
    display: "inline-block",
    fontSize: "0.7rem",
    padding: "0.3rem 0.6rem",
    background: ghost ? "transparent" : color + "22",
    color,
    border: ghost ? `1px dashed ${color}66` : `1px solid ${color}55`,
    borderRadius: 4,
    textDecoration: "none",
    cursor: ghost ? "default" : "pointer",
  };
}
