// Drift management — tracks when writing pieces fall out of sync with source material
// A piece "drifts" when new biographical material is added that the piece doesn't reflect yet.
// Updated: 2026-06-06

export type DriftFlag = {
  piece: string;              // collection/slug
  severity: "high" | "medium" | "low";
  newMaterial: string;        // what was added
  addedDate: string;          // when it was added
  action: string;             // what needs to happen
  resolved: boolean;
};

// All drift flags added 2026-06-06 from the biographical archive session
export const driftFlags: DriftFlag[] = [
  // PB Book — Wound chapter needs psilocybin arc
  {
    piece: "pb-book/02-wound",
    severity: "high",
    newMaterial: "Barnhart trip notes (July 5, 2024) — 'I'm going to come out of here a butterfly.' Full timestamped account.",
    addedDate: "2026-06-06",
    action: "Add the July 2024 psilocybin experience to the Wound chapter — the attempt to heal that preceded the mania.",
    resolved: false,
  },
  {
    piece: "pb-book/02-wound",
    severity: "high",
    newMaterial: "psilocybin-integration-sept11-2024.md — 'I'm cured! :-)' The integration euphoria. Closet door detail.",
    addedDate: "2026-06-06",
    action: "Use the Sept 11 integration note as the transition from 'healed' to 'what it was integrating into.'",
    resolved: false,
  },
  // PB Book — Guide chapter needs JSU mentor material
  {
    piece: "pb-book/03-guide",
    severity: "medium",
    newMaterial: "Michael Mauter — gave Matt the black Sigma guitar at UA Catholic student ministry. First guitar.",
    addedDate: "2026-06-06",
    action: "Mauter is the first Guide figure — before Jay Robinson, before Wade Allen. Add the guitar origin story.",
    resolved: false,
  },
  {
    piece: "pb-book/03-guide",
    severity: "medium",
    newMaterial: "The traveling minister at Northside Park, Tuscaloosa — 'You will do great things for the kingdom of God.'",
    addedDate: "2026-06-06",
    action: "The traveling minister is a Guide figure. The prophecy over the guitar connects to Mauter. One sequence.",
    resolved: false,
  },
  // PB Book — Mask chapter needs the Admin Board / AI Council contrast
  {
    piece: "pb-book/03-mask",
    severity: "high",
    newMaterial: "admin-board-report-feb19-2025.md — Last official church document, one week before the AI Council ChatGPT backup.",
    addedDate: "2026-06-06",
    action: "The gap between these two documents IS the Mask chapter. Feb 19 public face / Feb 26 private face.",
    resolved: false,
  },
  // PB Book — Scar chapter needs Matthew Wilson
  {
    piece: "pb-book/04-scar",
    severity: "medium",
    newMaterial: "matthew-wilson-psychologist-2024.md — ADHD diagnosis, malpractice-adjacent advice, golden teachers sourced.",
    addedDate: "2026-06-06",
    action: "Matthew Wilson is the first broken mirror. Add him to Scar as the credential-behavior gap that Matt recognized and walked away from.",
    resolved: false,
  },
  // PB Book — Shift chapter needs return sermon
  {
    piece: "pb-book/07-shift",
    severity: "high",
    newMaterial: "sermons/may31-2026-jfumc-notes.md — Return sermon, John 12:24, Jacksonville First UMC. Written while fresh.",
    addedDate: "2026-06-06",
    action: "The return sermon IS the Shift. 'Unless a grain of wheat falls into the earth and dies.' Write it now.",
    resolved: false,
  },
  // Journal — Cropwell needs guitar recording detail
  {
    piece: "journal/cropwell",
    severity: "low",
    newMaterial: "journal-ua-depression-guitar-era.md — Recording the Takamine guitar at parents' house in Cropwell, AL.",
    addedDate: "2026-06-06",
    action: "Add the Takamine recording sessions to the Cropwell piece. Dad scoffed at the $850. That's the tension.",
    resolved: false,
  },
  // Journal — AI psychosis needs the surgeon waiting room origin
  {
    piece: "journal/chatgpt-and-mania",
    severity: "high",
    newMaterial: "context/ai-psychosis-article-discovery-oct2025.md — The Fortune article, Oct 20, 2025. Heather's surgeon waiting room. Matt recognizes himself.",
    addedDate: "2026-06-06",
    action: "The essay origin is Oct 20, 2025, not April 2026. Lead with the surgeon's waiting room. That's the opening.",
    resolved: false,
  },
  // SL Profile — needs JSU / Pirate King section
  {
    piece: "sl-profile/matt-headley",
    severity: "high",
    newMaterial: "pirates-of-penzance-jsu-2007.md — Pirate King confirmed. Cast list. Teresa Stricklin as assistant director.",
    addedDate: "2026-06-06",
    action: "Add JSU era to the SL profile — the auditions, the Pirate King, Teresa Stricklin thread.",
    resolved: false,
  },
  // SL Profile — needs formative events timeline
  {
    piece: "sl-profile/matt-headley",
    severity: "medium",
    newMaterial: "Autobiographical Statement 2015 — father's Marine Corps scandal at 10, ordination date Feb 23 2014, Red Hill in Attala AL, Heather's MA Piano at Ball State.",
    addedDate: "2026-06-06",
    action: "Update SL profile facts section with confirmed biographical data.",
    resolved: false,
  },
];

export function getUnresolvedDrift(piece?: string): DriftFlag[] {
  const flags = driftFlags.filter(f => !f.resolved);
  return piece ? flags.filter(f => f.piece === piece) : flags;
}

export function getDriftSummary(): { high: number; medium: number; low: number; total: number } {
  const unresolved = getUnresolvedDrift();
  return {
    high: unresolved.filter(f => f.severity === "high").length,
    medium: unresolved.filter(f => f.severity === "medium").length,
    low: unresolved.filter(f => f.severity === "low").length,
    total: unresolved.length,
  };
}
