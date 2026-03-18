"use client";

import { useCallback } from "react";
import { Download } from "lucide-react";
import type { AuditResult } from "@/lib/audit-types";
import type { ReportArchetype, ReportTradeEstimate, ReportCompetitor } from "@/lib/generate-report-pdf";

type Props = {
  archetype: ReportArchetype;
  auditResult: AuditResult | null;
  tradeData: ReportTradeEstimate | null;
  recommendedTier: string;
  tierPrice: number;
  recommendations: string[];
  competitors?: ReportCompetitor[];
};

export default function QuizReportPdf({
  archetype,
  auditResult,
  tradeData,
  recommendedTier,
  tierPrice,
  recommendations,
  competitors,
}: Props) {
  const handleDownload = useCallback(async () => {
    // Dynamic import keeps jsPDF out of the initial bundle
    const { buildReportDoc } = await import("@/lib/generate-report-pdf");
    const doc = buildReportDoc({ archetype, auditResult, tradeData, recommendedTier, tierPrice, recommendations, competitors });

    const filename = auditResult?.url
      ? `site-readiness-report-${new URL(auditResult.url).hostname}.pdf`
      : "site-readiness-report.pdf";
    doc.save(filename);
  }, [archetype, auditResult, tradeData, recommendedTier, tierPrice, recommendations]);

  return (
    <button
      onClick={handleDownload}
      className="btn-secondary !text-sm !py-2 !px-4 inline-flex items-center gap-2"
    >
      <Download className="w-4 h-4" />
      Download Report (PDF)
    </button>
  );
}
