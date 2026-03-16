/**
 * Trade-specific ROI estimates for Northeast Alabama service businesses.
 * Used on quiz results page to show estimated cost of a weak online presence.
 *
 * Numbers based on typical small-town service business economics:
 * - avgJobValue: average revenue per completed job
 * - estimatedMissedLeads: monthly leads lost to poor online presence (range)
 * - estimatedMonthlyLoss: avgJobValue × low-end missed leads (conservative)
 * - paybackJobs: how many jobs to recoup each pricing tier
 */

export type TradeEstimate = {
  label: string;
  avgJobValue: number;
  estimatedMissedLeads: [number, number];
  estimatedMonthlyLoss: [number, number];
  paybackJobs: { "Get Found": number; "Get Calls": number; "Get Booked": number };
};

export const roiEstimates: Record<string, TradeEstimate> = {
  plumbing: {
    label: "Plumbing",
    avgJobValue: 250,
    estimatedMissedLeads: [15, 30],
    estimatedMonthlyLoss: [1500, 3000],
    paybackJobs: { "Get Found": 2, "Get Calls": 4, "Get Booked": 5 },
  },
  hvac: {
    label: "HVAC",
    avgJobValue: 400,
    estimatedMissedLeads: [10, 25],
    estimatedMonthlyLoss: [2000, 5000],
    paybackJobs: { "Get Found": 2, "Get Calls": 2, "Get Booked": 3 },
  },
  electrical: {
    label: "Electrical",
    avgJobValue: 300,
    estimatedMissedLeads: [10, 25],
    estimatedMonthlyLoss: [1500, 3750],
    paybackJobs: { "Get Found": 2, "Get Calls": 3, "Get Booked": 4 },
  },
  salon: {
    label: "Salon / Barbershop",
    avgJobValue: 60,
    estimatedMissedLeads: [20, 50],
    estimatedMonthlyLoss: [600, 1500],
    paybackJobs: { "Get Found": 9, "Get Calls": 14, "Get Booked": 20 },
  },
  "small-engine": {
    label: "Small Engine / Lawn Care",
    avgJobValue: 150,
    estimatedMissedLeads: [10, 25],
    estimatedMonthlyLoss: [750, 1875],
    paybackJobs: { "Get Found": 4, "Get Calls": 6, "Get Booked": 8 },
  },
  roofing: {
    label: "Roofing",
    avgJobValue: 5000,
    estimatedMissedLeads: [3, 10],
    estimatedMonthlyLoss: [7500, 25000],
    paybackJobs: { "Get Found": 1, "Get Calls": 1, "Get Booked": 1 },
  },
  painting: {
    label: "Painting",
    avgJobValue: 1500,
    estimatedMissedLeads: [5, 15],
    estimatedMonthlyLoss: [3750, 11250],
    paybackJobs: { "Get Found": 1, "Get Calls": 1, "Get Booked": 1 },
  },
  landscaping: {
    label: "Landscaping / Lawn Care",
    avgJobValue: 150,
    estimatedMissedLeads: [15, 30],
    estimatedMonthlyLoss: [1125, 2250],
    paybackJobs: { "Get Found": 4, "Get Calls": 6, "Get Booked": 8 },
  },
  cleaning: {
    label: "Cleaning Service",
    avgJobValue: 175,
    estimatedMissedLeads: [15, 35],
    estimatedMonthlyLoss: [1313, 3063],
    paybackJobs: { "Get Found": 3, "Get Calls": 5, "Get Booked": 7 },
  },
  "pest-control": {
    label: "Pest Control",
    avgJobValue: 200,
    estimatedMissedLeads: [10, 25],
    estimatedMonthlyLoss: [1000, 2500],
    paybackJobs: { "Get Found": 3, "Get Calls": 4, "Get Booked": 6 },
  },
  "auto-repair": {
    label: "Auto Repair / Mechanic",
    avgJobValue: 350,
    estimatedMissedLeads: [10, 25],
    estimatedMonthlyLoss: [1750, 4375],
    paybackJobs: { "Get Found": 2, "Get Calls": 3, "Get Booked": 4 },
  },
  contractor: {
    label: "General Contractor",
    avgJobValue: 2500,
    estimatedMissedLeads: [5, 15],
    estimatedMonthlyLoss: [6250, 18750],
    paybackJobs: { "Get Found": 1, "Get Calls": 1, "Get Booked": 1 },
  },
  other: {
    label: "Other Local Service",
    avgJobValue: 200,
    estimatedMissedLeads: [10, 25],
    estimatedMonthlyLoss: [1000, 2500],
    paybackJobs: { "Get Found": 3, "Get Calls": 4, "Get Booked": 6 },
  },
};

/** Map a tier string from archetypes to a pricing tier key */
export function normalizeTier(tier: string): "Get Found" | "Get Calls" | "Get Booked" {
  if (tier.includes("Found")) return "Get Found";
  if (tier.includes("Booked")) return "Get Booked";
  return "Get Calls";
}

/** Tier prices for payback calculation */
export const tierPrices: Record<string, number> = {
  "Get Found": 495,
  "Get Calls": 795,
  "Get Booked": 1195,
};
