// Satire Ops dashboard config — drafts, calendar, news, publish schedule
// Maintained manually for v1. v2 will pull from GitHub API.

export type DraftStatus = "draft" | "reviewing" | "scheduled" | "shipped" | "killed";

export type SatireDraft = {
  publication: "tpt" | "gt";
  slug: string;
  title: string;
  dek: string;
  status: DraftStatus;
  category?: string;
  publishDate?: string; // ISO date for scheduled
  publishedUrl?: string;
  nameConflictChecked: boolean;
  hasImage: boolean;
  imagePrompt?: string;
  editGithubUrl: string;
  notes?: string;
  priority?: "high" | "medium" | "low";
  newsAnchor?: string; // ISO date of the news event this is anchored to
};

export const SATIRE_DRAFTS: SatireDraft[] = [
  // ─── TPT ─────────────────────────────────────────────────────
  {
    publication: "tpt",
    slug: "babylon-bee-pride-month-response",
    title: "Christian Satire Publication Releases List Of 7 Ways To Celebrate Hating Your Neighbor With Your Family This Year",
    dek: "The seventh item — 'transition one of your children' — is described by the publication's editors as 'a bit edgier than what we usually do, but our audience really responded.'",
    status: "reviewing",
    category: "media-and-commentary",
    publishDate: "2026-06-08T12:30:00Z",
    nameConflictChecked: true,
    hasImage: false,
    imagePrompt: "documentary photo · evangelical bookstore display · stack of pastoral leadership books · soft window light · Kodak Portra · no people · no text overlay",
    editGithubUrl: "https://github.com/mpheadley/the-pulpit-truth/edit/main/content/articles/_drafts/babylon-bee-pride-month-response.mdx",
    priority: "high",
    notes: "THE Sunday publish. 7:30am CT June 8. Followup sequence in SATIRE-OPS.md Section II-4.",
    newsAnchor: "2026-06-05",
  },
  {
    publication: "tpt",
    slug: "local-megachurch-women-pastor-position",
    title: "Local Megachurch Adopts Same Position On Women That Made Their Most Famous Bible Teacher Leave The Denomination",
    dek: "The elder board confirmed the new position is identical to the existing position, with revised language to clarify that the existing position was always the position.",
    status: "draft",
    category: "denominational",
    publishDate: "2026-06-15T12:30:00Z",
    nameConflictChecked: true,
    hasImage: false,
    imagePrompt: "documentary photo · empty elder board meeting room · folding chairs · half-empty coffee cups · legal pads · fluorescent overhead · Kodak Portra 400 · no people · no readable text",
    editGithubUrl: "https://github.com/mpheadley/the-pulpit-truth/edit/main/content/articles/_drafts/local-megachurch-women-pastor-position.mdx",
    priority: "high",
    notes: "Anchored to SBC June 9-10 Orlando annual meeting + Beth Moore criticism. Publish Sunday after meeting concludes for peak news cycle.",
    newsAnchor: "2026-06-10",
  },
  {
    publication: "tpt",
    slug: "ashcroft-spirit-of-justice-commendation",
    title: "Pastor Formally Commends Justice Department For Recovering The Spirit Of Justice",
    dek: "",
    status: "draft",
    category: "denominational",
    nameConflictChecked: false,
    hasImage: false,
    editGithubUrl: "https://github.com/mpheadley/the-pulpit-truth/edit/main/content/articles/_drafts/ashcroft-spirit-of-justice-commendation.mdx",
    priority: "medium",
    notes: "Part of Dorsey arc series. Verify name-conflict check before publish.",
  },
  {
    publication: "tpt",
    slug: "calvary-ridge-no-fear-sunday-anniversary",
    title: "Calvary Ridge Marks Anniversary Of No Fear Sunday With No Fear Sunday",
    dek: "",
    status: "draft",
    category: "evergreen",
    nameConflictChecked: true,
    hasImage: false,
    editGithubUrl: "https://github.com/mpheadley/the-pulpit-truth/edit/main/content/articles/_drafts/calvary-ridge-no-fear-sunday-anniversary.mdx",
    priority: "low",
  },
  // ─── GT ──────────────────────────────────────────────────────
  {
    publication: "gt",
    slug: "buc-ees-rumor-cycle-continues",
    title: "Buc-ee's Confirms No Plans For Calhoun County, Locals Confirm Plans To Continue Discussing",
    dek: "The corporation's statement, the third this year, follows the rumor's recent appearance on three group texts and a Facebook post that has been shared seventeen times.",
    status: "draft",
    category: "calhoun-county",
    nameConflictChecked: true,
    hasImage: false,
    imagePrompt: "documentary photo · empty I-20 parcel cleared of pine, kudzu at the edges · Calhoun County Alabama · golden hour · Kodak Gold 200 grain · single Dollar General sign barely visible · no people · no readable text",
    editGithubUrl: "https://github.com/mpheadley/green-tomato/edit/main/content/articles/_drafts/buc-ees-rumor-cycle-continues.mdx",
    priority: "high",
    notes: "Buford Tatum voice. Tuesday morning publish slot.",
  },
];

// ─── This week's publish schedule ────────────────────────────────
export type PublishSlot = {
  date: string;
  publication: "tpt" | "gt";
  slug: string | null;
  channel: "site" | "fb" | "email" | "twitter";
  scheduled: boolean;
};

export const PUBLISH_SCHEDULE: PublishSlot[] = [
  { date: "2026-06-08T12:30:00Z", publication: "tpt", slug: "babylon-bee-pride-month-response", channel: "site", scheduled: true },
  { date: "2026-06-08T12:35:00Z", publication: "tpt", slug: "babylon-bee-pride-month-response", channel: "email", scheduled: false },
  { date: "2026-06-08T13:00:00Z", publication: "tpt", slug: "babylon-bee-pride-month-response", channel: "fb", scheduled: false },
  { date: "2026-06-09T13:00:00Z", publication: "gt", slug: "buc-ees-rumor-cycle-continues", channel: "site", scheduled: false },
  { date: "2026-06-09T13:30:00Z", publication: "gt", slug: "buc-ees-rumor-cycle-continues", channel: "fb", scheduled: false },
  { date: "2026-06-15T12:30:00Z", publication: "tpt", slug: "local-megachurch-women-pastor-position", channel: "site", scheduled: false },
];

// ─── Hot church news (manually curated; scraper coming) ──────────
export type NewsItem = {
  source: string;
  url: string;
  headline: string;
  publishedAt: string;
  score: number;
  satirePotential: "high" | "medium" | "low";
  bestAngle?: string;
};

export const HOT_NEWS: NewsItem[] = [
  {
    source: "Church Leaders",
    url: "https://churchleaders.com/news/2218101-beth-moore-accuses-sbc-of-prioritizing-protecting-the-pulpit-from-women-over-protecting-women-from-abuse.html",
    headline: "Beth Moore Accuses SBC Of Prioritizing 'Protecting The Pulpit From Women' Over Protecting Women From Abuse",
    publishedAt: "2026-06-01",
    score: 9,
    satirePotential: "high",
    bestAngle: "Angle A — institutional self-parody at the local church level. See local-megachurch-women-pastor-position draft.",
  },
  {
    source: "Baptist Report",
    url: "https://baptistreport.substack.com/p/anglican-beth-moore-joins-others",
    headline: "Beth Moore Joins Others To Push Back Against Mohler's Truth & Unity Amendment",
    publishedAt: "2026-06-03",
    score: 8,
    satirePotential: "high",
    bestAngle: "Angle B — Mohler stated on The Briefing that women discussing sermons on podcasts are 'functioning as pastors.' Apply his definition to his own institution's communications staff.",
  },
  {
    source: "Washington Times",
    url: "https://www.washingtontimes.com/news/2026/jun/5/four-years-running-southern-baptists-weigh-tightening-ban-churches/",
    headline: "Four Years Running, Southern Baptists Weigh Tightening Ban On Churches With Women Pastors",
    publishedAt: "2026-06-05",
    score: 8,
    satirePotential: "high",
    bestAngle: "Angle C — annual meeting agenda adds discussion item on why annual meeting keeps discussing the same item.",
  },
  {
    source: "Babylon Bee",
    url: "https://babylonbee.com/news/7-ways-to-celebrate-pride-month-with-your-family-this-year",
    headline: "7 Ways To Celebrate Pride Month With Your Family This Year",
    publishedAt: "2026-06-05",
    score: 10,
    satirePotential: "high",
    bestAngle: "Already drafted as babylon-bee-pride-month-response. Ship Sunday.",
  },
];
