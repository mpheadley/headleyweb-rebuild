// Writing archive index — all book drafts, memoir pieces, and essays
// Updated: 2026-06-06
// All content behind PIN gate at /writing

export type WritingPiece = {
  slug: string;
  title: string;
  status: "draft" | "complete" | "gap" | "seed";
  wordCount?: number;
  lastUpdated?: string;
  crossRefs?: string[]; // source material that feeds this piece
  notes?: string;
};

export type WritingCollection = {
  id: string;
  title: string;
  description: string;
  color: string;
  pieces: WritingPiece[];
};

export const writingCollections: WritingCollection[] = [
  {
    id: "pb-book",
    title: "Plainspoken Blueprint",
    description: "Eight movements. Messaging clarity for small business owners. Personal arc runs alongside the methodology.",
    color: "#4A7C6F",
    pieces: [
      { slug: "00-prelude", title: "Prelude — The Day I Stopped Being Clever", status: "draft", lastUpdated: "2026-05-21", notes: "Gap: May 8 keyboard scene. Matt writes opening.", crossRefs: ["journal/called-coffee.md", "sources/the-whole-of-it.mdx"] },
      { slug: "00-prelude-v2", title: "Prelude v2", status: "draft" },
      { slug: "01-actor", title: "Chapter 1 — Actor", status: "draft", lastUpdated: "2026-05-21", notes: "Farmers market, pulpit. The performed identity.", crossRefs: ["journal/bloom-bar-story.md"] },
      { slug: "02-wound", title: "Chapter 2 — Wound", status: "draft", crossRefs: ["journal/depression-mania-recovery-contrast.md", "sources/barnhart-trip-notes-july2024.md", "journal/psilocybin.md"] },
      { slug: "03-guide", title: "Chapter 3 — Guide", status: "draft", crossRefs: ["sources/journal-meeting-heather-jsu-audition.md", "sources/journal-ua-depression-guitar-era.md"] },
      { slug: "03-mask", title: "Chapter 3 — Mask", status: "draft", crossRefs: ["sources/admin-board-report-feb19-2025.md"] },
      { slug: "04-scar", title: "Chapter 4 — Scar", status: "draft", crossRefs: ["sources/matthew-wilson-psychologist-2024.md"] },
      { slug: "05-light", title: "Chapter 5 — Light", status: "draft", crossRefs: ["sources/psilocybin-integration-sept11-2024.md", "sources/barnhart-trip-notes-july2024.md"] },
      { slug: "06-path", title: "Chapter 6 — Path", status: "draft" },
      { slug: "07-shift", title: "Chapter 7 — Shift", status: "draft", crossRefs: ["sources/sermons/may31-2026-jfumc-notes.md"] },
      { slug: "08-home", title: "Chapter 8 — Home", status: "draft" },
    ],
  },
  {
    id: "pulpit-truth",
    title: "The Pulpit Truth",
    description: "Satirical dispatches from inside the church. The absurdities no one says out loud.",
    color: "#8B4513",
    pieces: [
      { slug: "biblical-womanhood-clean", title: "Biblical Womanhood (clean)", status: "draft" },
      { slug: "biblical-womanhood", title: "Biblical Womanhood (raw)", status: "draft" },
      { slug: "church-plant-chick-fil-a", title: "Church Plant at Chick-fil-A", status: "draft" },
      { slug: "fog-machine-rapture", title: "Fog Machine Rapture", status: "draft" },
      { slug: "shepherd-app", title: "The Shepherd App", status: "draft" },
      { slug: "worship-leader-48th-song", title: "Worship Leader — 48th Song", status: "draft" },
      { slug: "youth-pastor-skateboard", title: "Youth Pastor Skateboard", status: "draft" },
    ],
  },
  {
    id: "journal",
    title: "Journal & Memoir",
    description: "75 essay seeds, voice memos, and memoir drafts. The raw material of the book.",
    color: "#C8A97E",
    pieces: [
      { slug: "ai-psychosis", title: "AI Psychosis", status: "draft", crossRefs: ["sources/context/ai-psychosis-article-discovery-oct2025.md"] },
      { slug: "ai-psychosis-strategy-notes-2026-04-20", title: "AI Psychosis — Strategy Notes", status: "seed" },
      { slug: "ai-psychosis-voice-notes-2026-04-20", title: "AI Psychosis — Voice Notes", status: "seed" },
      { slug: "before-i-had-words", title: "Before I Had Words", status: "draft" },
      { slug: "bloom-bar-story", title: "The Bloom Bar Story", status: "draft" },
      { slug: "called-coffee", title: "Called Coffee", status: "draft" },
      { slug: "chatgpt-and-mania", title: "ChatGPT and Mania", status: "draft", crossRefs: ["sources/context/ai-psychosis-article-discovery-oct2025.md"] },
      { slug: "combing-the-record", title: "Combing the Record", status: "draft" },
      { slug: "community-rootedness", title: "Community Rootedness", status: "seed" },
      { slug: "cropwell", title: "Cropwell", status: "draft", notes: "The recording sessions at his parents' house. Takamine guitar." },
      { slug: "defying-gravity", title: "Defying Gravity", status: "draft" },
      { slug: "depression-mania-recovery-contrast", title: "Depression / Mania / Recovery — The Contrast", status: "draft" },
      { slug: "disability", title: "Disability", status: "draft" },
      { slug: "jason-and-kyle", title: "Jason and Kyle", status: "draft", notes: "20-year friendship. The call during the silence. Kyle's grippy socks sermon." },
      { slug: "kyles-grippy-socks", title: "Kyle's Grippy Socks", status: "draft" },
      { slug: "mania-resignation-farm-skeleton", title: "Mania, Resignation, Farm — Skeleton", status: "draft" },
      { slug: "psilocybin", title: "Psilocybin", status: "seed", notes: "DO NOT PUBLISH ON SL. Private memoir only." },
      { slug: "praying-with-the-machine", title: "Praying with the Machine", status: "draft" },
      { slug: "heathers-surgery", title: "Heather's Surgery", status: "draft" },
      { slug: "after-the-acute-phase", title: "After the Acute Phase", status: "draft" },
      { slug: "becoming-a-web-designer", title: "Becoming a Web Designer", status: "draft" },
      { slug: "enneagram", title: "Enneagram", status: "seed" },
    ],
  },
  {
    id: "sl-drafts",
    title: "Southern Legends — In Progress",
    description: "Profile drafts and research in progress. Not yet published.",
    color: "#7a5c3a",
    pieces: [
      { slug: "called-coffee-profile-draft", title: "Called Coffee — Profile Draft", status: "draft" },
      { slug: "ciara-smith-roston-draft", title: "Ciara Smith Roston — Draft", status: "draft" },
      { slug: "lewis-downing-draft", title: "Lewis Downing — Draft", status: "draft" },
      { slug: "silver-creek-the-next-farm", title: "Silver Creek — The Next Farm", status: "seed" },
      { slug: "support-page-draft", title: "Support Page — Draft", status: "draft" },
    ],
  },
  {
    id: "aisle",
    title: "The Aisle — Essays",
    description: "Published and draft essays for The Aisle brand.",
    color: "#2C5F52",
    pieces: [
      { slug: "the-whole-of-it", title: "The Whole of It", status: "complete", notes: "Published. The disclosure piece. Foundation for PB Prelude." },
      { slug: "the-celebration-you-earned", title: "The Celebration You Earned", status: "complete" },
    ],
  },
];

// Cross-reference: new biographical material from 2026-06-06 session mapped to chapters
export const bioSourceMap: Record<string, string[]> = {
  "pb-book/02-wound": [
    "AIM logs Nov 2003 — 'I'm sick of being lonely.' The UA depression at 19.",
    "barnhart-trip-notes-july2024.md — 'It doesn't turn out well. Life.'",
    "psilocybin-integration-sept11-2024.md — 'I'm cured!' The euphoria before the fall.",
  ],
  "pb-book/03-guide": [
    "journal-ua-depression-guitar-era.md — Michael Mauter, the black Sigma guitar, the traveling minister.",
    "journal-meeting-heather-jsu-audition.md — Dr. Corbin, Teresa Stricklin, Dr. D'Ambrosio.",
    "Jay Robinson (JSU Wesley) and Wade Allen (First Baptist Muncie) — both mentors.",
  ],
  "pb-book/03-mask": [
    "admin-board-report-feb19-2025.md — The public document. One week before the AI Council backup.",
    "ChatGPT Trinity Avatars, Feb 26, 2025 — the private document.",
    "The gap between these two is the chapter.",
  ],
  "pb-book/04-scar": [
    "matthew-wilson-psychologist-2024.md — ADHD diagnosis, malpractice-adjacent advice, golden teachers.",
    "Bipolar I confirmed 2025. ADHD diagnosis 2024.",
  ],
  "pb-book/05-light": [
    "barnhart-trip-notes-july2024.md — 'Heaven's just about right here.' 'I'm going to come out of here a butterfly.'",
    "psilocybin-integration-sept11-2024.md — The closet door detail. The emoji.",
  ],
  "pb-book/07-shift": [
    "sermons/may31-2026-jfumc-notes.md — Return sermon, John 12:24. Jacksonville First UMC.",
    "Unless a grain of wheat falls into the earth and dies.",
  ],
  "journal/cropwell": [
    "journal-ua-depression-guitar-era.md — Takamine guitar, recording in Cropwell at parents' house.",
  ],
  "journal/chatgpt-and-mania": [
    "context/ai-psychosis-article-discovery-oct2025.md — Origin of the AI psychosis essay. Oct 20, 2025.",
    "Heather's surgeon waiting room. The Fortune article.",
  ],
};
