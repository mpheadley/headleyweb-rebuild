"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "hwseo:brandscript:v1";

const FIELDS = [
  { id: "character_who", label: "Who, exactly, is your customer?", type: "textarea", rows: 3, placeholder: "e.g., Owners of family-run restaurants in downtown Anniston…" },
  { id: "character_want", label: "What do they want from your business?", type: "textarea", rows: 3, placeholder: "e.g., A website that brings in new customers without hours of upkeep." },
  { id: "problem_villain", label: "External problem (the surface-level issue)", type: "textarea", rows: 2, placeholder: "e.g., Their current website is outdated and hard to find on Google." },
  { id: "problem_internal", label: "Internal problem (how it makes them feel)", type: "textarea", rows: 2, placeholder: "e.g., Embarrassed to share the link. Worried they're losing customers to competitors." },
  { id: "problem_philosophical", label: "Philosophical problem (why it's just plain wrong)", type: "textarea", rows: 2, placeholder: "e.g., Hardworking local businesses shouldn't lose to a slick website built by an out-of-state agency." },
  { id: "guide_empathy", label: "Empathy statement", type: "textarea", rows: 2, placeholder: "e.g., We know you didn't start your business to spend nights wrestling with a website builder." },
  { id: "guide_authority", label: "Authority statement (proof you can help)", type: "textarea", rows: 2, placeholder: "e.g., Built and shipped 20+ local sites across Northeast Alabama, with measurable lift in calls and form fills." },
  { id: "plan_1", label: "Step 1", type: "input", placeholder: "e.g., Schedule a free 30-minute audit." },
  { id: "plan_2", label: "Step 2", type: "input", placeholder: "e.g., Get a flat-rate quote and timeline — no surprises." },
  { id: "plan_3", label: "Step 3", type: "input", placeholder: "e.g., Launch a clean, fast site in 3–4 weeks." },
  { id: "cta_direct", label: "Direct CTA", type: "input", placeholder: "e.g., Schedule My Free Audit" },
  { id: "cta_transitional", label: "Transitional CTA", type: "input", placeholder: "e.g., Download the Local SEO Checklist" },
  { id: "failure", label: "What do they lose by doing nothing?", type: "textarea", rows: 3, placeholder: "e.g., Keep losing leads to competitors with better Google rankings. Keep being embarrassed to hand out their website." },
  { id: "success", label: "What does success look like for your customer?", type: "textarea", rows: 3, placeholder: "e.g., A website they're proud to share. The phone ringing with the right kind of customers." },
  { id: "oneliner", label: 'Your one-liner', type: "textarea", rows: 3, placeholder: 'e.g., We help local business owners in Northeast Alabama who are losing customers to outdated websites, so they can finally have an online presence they\'re proud of.' },
];

const SECTIONS = [
  { num: "1", title: "A Character Who Wants Something", help: "Who is your customer, and what is the one thing they want from your business? Be specific — \"homeowners in Calhoun County who want a leak-free roof before storm season\" beats \"people who need roofs.\"", fields: ["character_who", "character_want"] },
  { num: "2", title: "Has a Problem", help: "Customers buy solutions to problems. Name three layers of the problem they're facing:", fields: ["problem_villain", "problem_internal", "problem_philosophical"] },
  { num: "3", title: "And Meets a Guide", help: "You are the guide — not the hero. Guides show empathy (we get it) and authority (we can fix it). Write one of each.", fields: ["guide_empathy", "guide_authority"] },
  { num: "4", title: "Who Gives Them a Plan", help: "A 3-step plan removes confusion. List the three steps a customer takes to work with you, in plain language.", fields: ["plan_1", "plan_2", "plan_3"] },
  { num: "5", title: "And Calls Them to Action", help: "Two CTAs: a direct ask (buy / book / schedule) and a transitional one (download / read / watch) for people not ready yet.", fields: ["cta_direct", "cta_transitional"] },
  { num: "6", title: "That Helps Them Avoid Failure", help: "What's at stake if they don't act? Name 2–3 concrete consequences — these are the stakes that motivate action.", fields: ["failure"] },
  { num: "7", title: "And Ends in Success", help: "Paint the picture. What does life look like after they work with you? Specific is better than aspirational.", fields: ["success"] },
];

export default function BrandScriptPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [emailOpen, setEmailOpen] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setValues(JSON.parse(raw));
    } catch {}
  }, []);

  function handleChange(id: string, val: string) {
    const next = { ...values, [id]: val };
    setValues(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  }

  function handleClear() {
    if (!window.confirm("Clear all your answers? This cannot be undone.")) return;
    setValues({});
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }

  function buildPayload() {
    return FIELDS
      .filter((f) => values[f.id]?.trim())
      .map((f) => `${f.label}:\n${values[f.id].trim()}`)
      .join("\n\n") || "(No answers filled in)";
  }

  const fieldDef = Object.fromEntries(FIELDS.map((f) => [f.id, f]));

  return (
    <main id="main-content">

      {/* Hero — no-print */}
      <section className="bg-hw-dark pt-32 pb-12 px-6 text-center no-print">
        <div className="max-w-2xl mx-auto">
          <span className="text-hw-secondary text-sm font-medium uppercase tracking-widest block mb-4">
            Worksheet · Foundational
          </span>
          <h1 className="text-hw-light font-heading" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15 }}>
            StoryBrand BrandScript for Local Business
          </h1>
          <p className="text-hw-light/70 text-lg mt-4 leading-relaxed">
            Fill in 7 sections. Walk away with a one-liner, a homepage outline, and a message customers actually understand.
          </p>
        </div>
      </section>

      {/* Toolbar — no-print */}
      <section className="bg-hw-white border-b border-hw-text-light/15 px-6 py-4 no-print">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <p className="text-hw-text text-sm flex-1 leading-relaxed">
            <strong>How to use this worksheet:</strong> Type directly into each box. Your answers save in this browser only — nothing is sent anywhere unless you choose to email yourself a copy.
          </p>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="btn-secondary text-sm px-3 py-1.5"
            >
              Print
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="btn-secondary text-sm px-3 py-1.5"
            >
              Clear
            </button>
          </div>
        </div>
      </section>

      {/* Worksheet */}
      <section className="bg-hw-light px-6 py-10">
        <div className="max-w-2xl mx-auto">

          <header className="mb-10 print:mb-6">
            <p className="text-hw-text-light text-xs uppercase tracking-widest mb-2 print:block hidden">
              Headley Web &amp; SEO · Free Resource
            </p>
            <h2 className="font-heading text-hw-dark text-2xl mb-3">StoryBrand BrandScript</h2>
            <p className="text-hw-text leading-relaxed">
              Every great story has the same structure: a <strong>character</strong> wants something, encounters a <strong>problem</strong>, meets a <strong>guide</strong> who gives them a <strong>plan</strong> and <strong>calls them to action</strong>, helping them avoid <strong>failure</strong> and reach <strong>success</strong>. Your customer is the character. You are the guide. This worksheet helps you write the script.
            </p>
          </header>

          <div className="space-y-8">
            {SECTIONS.map((section) => (
              <fieldset key={section.num} className="bg-hw-white rounded-xl p-6 border border-hw-text-light/15 print:border print:rounded-none print:p-4">
                <div className="flex items-start gap-4 mb-4">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-hw-secondary/15 text-hw-secondary font-bold text-sm flex items-center justify-center">
                    {section.num}
                  </span>
                  <div>
                    <legend className="font-heading text-hw-dark text-lg leading-snug">{section.title}</legend>
                    <p className="text-hw-text-light text-sm mt-1 leading-relaxed">{section.help}</p>
                  </div>
                </div>
                <div className="space-y-4 pl-13" style={{ paddingLeft: "3.25rem" }}>
                  {section.fields.map((fid) => {
                    const f = fieldDef[fid];
                    return (
                      <div key={fid}>
                        <label htmlFor={fid} className="block text-hw-text text-sm font-medium mb-1">
                          {f.label}
                        </label>
                        {f.type === "textarea" ? (
                          <textarea
                            id={fid}
                            rows={f.rows}
                            placeholder={f.placeholder}
                            value={values[fid] ?? ""}
                            onChange={(e) => handleChange(fid, e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-hw-text-light/30 text-hw-text text-sm resize-y focus:outline-none focus:border-hw-secondary bg-hw-light"
                          />
                        ) : (
                          <input
                            type="text"
                            id={fid}
                            placeholder={f.placeholder}
                            value={values[fid] ?? ""}
                            onChange={(e) => handleChange(fid, e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-hw-text-light/30 text-hw-text text-sm focus:outline-none focus:border-hw-secondary bg-hw-light"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            ))}

            {/* One-liner synthesis */}
            <fieldset className="bg-hw-white rounded-xl p-6 border-2 border-hw-secondary/30 print:border print:rounded-none print:p-4">
              <div className="flex items-start gap-4 mb-4">
                <span className="shrink-0 w-9 h-9 rounded-full bg-hw-secondary text-hw-white font-bold text-sm flex items-center justify-center">★</span>
                <div>
                  <legend className="font-heading text-hw-dark text-lg leading-snug">Your One-Liner</legend>
                  <p className="text-hw-text-light text-sm mt-1 leading-relaxed">
                    Combine your answers into a single sentence using this template:{" "}
                    <em>&ldquo;We help [character] who [problem] so they can [success].&rdquo;</em>
                  </p>
                </div>
              </div>
              <div style={{ paddingLeft: "3.25rem" }}>
                <label htmlFor="oneliner" className="block text-hw-text text-sm font-medium mb-1">Your one-liner</label>
                <textarea
                  id="oneliner"
                  rows={3}
                  placeholder={fieldDef["oneliner"].placeholder}
                  value={values["oneliner"] ?? ""}
                  onChange={(e) => handleChange("oneliner", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-hw-secondary/40 text-hw-text text-sm resize-y focus:outline-none focus:border-hw-secondary bg-hw-light"
                />
              </div>
            </fieldset>

            {/* Inline audit nudge — no-print */}
            <div className="rounded-xl bg-hw-primary/10 border border-hw-primary/20 p-5 flex flex-col sm:flex-row sm:items-center gap-4 no-print">
              <p className="text-hw-text text-sm flex-1 leading-relaxed">
                <strong>Got a website already?</strong> Now&apos;s a good moment to check if it actually says what you just wrote. A free plain-English audit — what&apos;s working, what&apos;s not, what to fix first.
              </p>
              <Link href="/audit" className="btn-primary shrink-0 text-sm">Get My Free Audit</Link>
            </div>

            {/* Email-yourself — no-print */}
            <fieldset className="bg-hw-white rounded-xl p-6 border border-hw-text-light/15 no-print">
              <div className="flex items-start gap-4 mb-4">
                <span className="shrink-0 w-9 h-9 rounded-full bg-hw-secondary/15 text-hw-secondary font-bold text-sm flex items-center justify-center">✉</span>
                <div>
                  <legend className="font-heading text-hw-dark text-lg">Email Yourself a Copy</legend>
                  <p className="text-hw-text-light text-sm mt-1 leading-relaxed">
                    Optional. Your answers stay in your browser — submitting just sends a copy to you and adds you to the list for new resources.
                  </p>
                </div>
              </div>
              <div style={{ paddingLeft: "3.25rem" }}>
                <button
                  type="button"
                  onClick={() => setEmailOpen((v) => !v)}
                  className="btn-secondary text-sm"
                >
                  {emailOpen ? "Hide email form" : "Show email form"}
                </button>
                {emailOpen && (
                  <form
                    action="https://formspree.io/f/mwvnwqjo"
                    method="POST"
                    className="mt-4 space-y-3"
                    onSubmit={(e) => {
                      const form = e.currentTarget;
                      const payload = form.querySelector<HTMLInputElement>("#brandscript-payload");
                      if (payload) payload.value = buildPayload();
                    }}
                  >
                    <input type="hidden" name="_subject" value="BrandScript worksheet — copy requested" />
                    <input type="hidden" name="source" value="brandscript-worksheet" />
                    <input type="hidden" id="brandscript-payload" name="brandscript_payload" />
                    <div>
                      <label htmlFor="bs-email-name" className="block text-hw-text text-sm font-medium mb-1">Your name</label>
                      <input type="text" id="bs-email-name" name="name" placeholder="Your name" required className="w-full px-3 py-2 rounded-lg border border-hw-text-light/30 text-hw-text text-sm focus:outline-none focus:border-hw-secondary" />
                    </div>
                    <div>
                      <label htmlFor="bs-email-address" className="block text-hw-text text-sm font-medium mb-1">Email address</label>
                      <input type="email" id="bs-email-address" name="email" placeholder="you@yourbusiness.com" required className="w-full px-3 py-2 rounded-lg border border-hw-text-light/30 text-hw-text text-sm focus:outline-none focus:border-hw-secondary" />
                    </div>
                    <button type="submit" className="btn-primary">Email me my BrandScript</button>
                    <p className="text-hw-text-light text-xs">By submitting, you&apos;ll get a copy of this worksheet and occasional emails when new resources are published. Unsubscribe anytime.</p>
                  </form>
                )}
              </div>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Next step — no-print */}
      <section className="bg-hw-white px-6 py-16 text-center no-print">
        <div className="max-w-xl mx-auto">
          <span className="text-hw-secondary text-sm font-medium uppercase tracking-widest block mb-3">Next Step</span>
          <h2 className="font-heading text-hw-dark mb-3" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
            Now Let AI Help You Refine It
          </h2>
          <p className="text-hw-text-light mb-6 leading-relaxed">
            The companion AI prompt sheet gives you copy-paste prompts for ChatGPT or Claude that sharpen each section of your BrandScript without losing your voice.
          </p>
          <Link href="/resources/ai-prompts" className="btn-primary">Open the AI Prompt Sheet</Link>
        </div>
      </section>

      {/* CTA — no-print */}
      <section
        className="px-6 py-20 text-center no-print"
        style={{
          background: "linear-gradient(rgba(18,10,4,0.88), rgba(18,10,4,0.88)), url('/images/background-charred-stacked-timber.webp') center/cover",
        }}
      >
        <div className="max-w-xl mx-auto">
          <span className="text-hw-secondary text-sm font-medium uppercase tracking-widest block mb-4">Want a Second Set of Eyes?</span>
          <h2 className="font-heading text-hw-light mb-4" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
            Get a Free Audit of Your Current Website
          </h2>
          <p className="text-hw-light/70 mb-8 leading-relaxed">
            Once your BrandScript is dialed in, the next question is: does your current site actually say it? Send me your URL and I&apos;ll send back a free, plain-English audit — what&apos;s working, what&apos;s not, and what to fix first.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/audit" className="btn-primary">Get My Free Audit</Link>
            <a href="https://calendly.com/mpheadley/30min" target="_blank" rel="noopener noreferrer" className="btn-secondary">Schedule a Quick Call</a>
          </div>
        </div>
      </section>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          fieldset { break-inside: avoid; }
        }
      `}</style>

    </main>
  );
}
