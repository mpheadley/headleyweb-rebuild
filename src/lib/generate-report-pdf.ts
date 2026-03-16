/* ── Server-safe PDF generation for Site Readiness Report ── */

import { jsPDF } from "jspdf";
import type { AuditResult } from "./audit-types";

type Archetype = {
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  strength: string;
  risk: string;
  recommendation: string;
  tier: string;
};

type TradeEstimate = {
  label: string;
  avgJobValue: number;
  estimatedMissedLeads: [number, number];
  estimatedMonthlyLoss: [number, number];
  paybackJobs: Record<string, number>;
};

type ReportInput = {
  archetype: Archetype;
  auditResult: AuditResult | null;
  tradeData: TradeEstimate | null;
  recommendedTier: string;
  tierPrice: number;
  recommendations: string[];
};

export function generateReportPdf(input: ReportInput): Uint8Array {
  const { archetype, auditResult, tradeData, recommendedTier, tierPrice, recommendations } = input;

  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 50;
  const contentWidth = pageWidth - margin * 2;
  let y = 0;

  // Colors
  const terracotta: [number, number, number] = [224, 123, 60];
  const dark: [number, number, number] = [28, 40, 38];
  const sage: [number, number, number] = [107, 143, 113];
  const textColor: [number, number, number] = [45, 45, 45];
  const mutedText: [number, number, number] = [107, 114, 128];
  const white: [number, number, number] = [255, 255, 255];
  const lightBg: [number, number, number] = [245, 240, 235];
  const red: [number, number, number] = [220, 38, 38];
  const green: [number, number, number] = [22, 163, 74];
  const yellow: [number, number, number] = [234, 140, 0];

  function getScoreColor(score: number): [number, number, number] {
    if (score >= 90) return green;
    if (score >= 50) return yellow;
    return red;
  }

  function checkPageBreak(needed: number) {
    if (y + needed > doc.internal.pageSize.getHeight() - 60) {
      doc.addPage();
      y = 50;
    }
  }

  function drawLine() {
    doc.setDrawColor(...mutedText);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 15;
  }

  // ── Header bar ──
  doc.setFillColor(...dark);
  doc.rect(0, 0, pageWidth, 90, "F");
  doc.setTextColor(...white);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Site Readiness Report", margin, 40);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...terracotta);
  doc.text("Headley Web & SEO", margin, 60);
  doc.setTextColor(180, 180, 180);
  doc.text("headleyweb.com  |  (256) 644-7334", margin, 76);

  if (auditResult) {
    doc.setTextColor(...white);
    doc.setFontSize(10);
    doc.text(auditResult.url, pageWidth - margin, 60, { align: "right" });
  }

  y = 115;

  // ── Archetype section ──
  if (archetype.strength || archetype.risk) {
    doc.setFillColor(...lightBg);
    doc.roundedRect(margin, y, contentWidth, 110, 8, 8, "F");
    y += 25;
    doc.setTextColor(...terracotta);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("YOUR ONLINE PERSONALITY", margin + 20, y);
    y += 20;
    doc.setTextColor(...dark);
    doc.setFontSize(18);
    doc.text(`${archetype.emoji}  ${archetype.name}`, margin + 20, y);
    y += 18;
    doc.setTextColor(...mutedText);
    doc.setFontSize(11);
    doc.setFont("helvetica", "italic");
    doc.text(archetype.tagline, margin + 20, y);
    y += 18;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    const descLines = doc.splitTextToSize(archetype.description, contentWidth - 40);
    doc.text(descLines.slice(0, 3), margin + 20, y);
    y += Math.min(descLines.length, 3) * 14 + 20;

    // Strength & Risk
    checkPageBreak(70);
    const halfWidth = (contentWidth - 15) / 2;

    doc.setFillColor(240, 249, 240);
    doc.roundedRect(margin, y, halfWidth, 55, 6, 6, "F");
    doc.setTextColor(...sage);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("YOUR STRENGTH", margin + 12, y + 18);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textColor);
    doc.setFontSize(9);
    const strengthLines = doc.splitTextToSize(archetype.strength, halfWidth - 24);
    doc.text(strengthLines.slice(0, 2), margin + 12, y + 32);

    doc.setFillColor(254, 242, 242);
    doc.roundedRect(margin + halfWidth + 15, y, halfWidth, 55, 6, 6, "F");
    doc.setTextColor(...red);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("YOUR RISK", margin + halfWidth + 27, y + 18);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textColor);
    doc.setFontSize(9);
    const riskLines = doc.splitTextToSize(archetype.risk, halfWidth - 24);
    doc.text(riskLines.slice(0, 2), margin + halfWidth + 27, y + 32);

    y += 70;

    // Recommendation
    checkPageBreak(60);
    doc.setFillColor(254, 247, 241);
    doc.roundedRect(margin, y, contentWidth, 50, 6, 6, "F");
    doc.setTextColor(...terracotta);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("WHAT I'D RECOMMEND", margin + 15, y + 18);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textColor);
    doc.setFontSize(9);
    const recLines = doc.splitTextToSize(`${archetype.recommendation} Best fit: ${archetype.tier} tier.`, contentWidth - 30);
    doc.text(recLines.slice(0, 2), margin + 15, y + 32);
    y += 65;
  } else {
    // Standalone audit (no archetype details)
    doc.setFillColor(...lightBg);
    doc.roundedRect(margin, y, contentWidth, 40, 8, 8, "F");
    doc.setTextColor(...dark);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(archetype.description, margin + 20, y + 25);
    y += 60;
  }

  // ── Site Audit Scores ──
  if (auditResult && (auditResult.performance > 0 || auditResult.seo > 0)) {
    checkPageBreak(130);
    drawLine();
    doc.setTextColor(...dark);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Your Site's Quick Checkup", margin, y);
    y += 25;

    const gaugeWidth = (contentWidth - 30) / 3;
    const gauges = [
      { label: "Speed", score: auditResult.performance },
      { label: "SEO", score: auditResult.seo },
      { label: "Accessibility", score: auditResult.accessibility },
    ];

    for (let i = 0; i < gauges.length; i++) {
      const gx = margin + i * (gaugeWidth + 15);
      const color = getScoreColor(gauges[i].score);
      doc.setFillColor(250, 250, 250);
      doc.roundedRect(gx, y, gaugeWidth, 65, 6, 6, "F");
      doc.setTextColor(...color);
      doc.setFontSize(28);
      doc.setFont("helvetica", "bold");
      doc.text(`${gauges[i].score}`, gx + gaugeWidth / 2, y + 35, { align: "center" });
      doc.setTextColor(...mutedText);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(gauges[i].label, gx + gaugeWidth / 2, y + 52, { align: "center" });
    }
    y += 80;

    // Basic checks
    checkPageBreak(80);
    const checks = [
      { passed: auditResult.isHttps, label: "Secure connection (HTTPS)" },
      { passed: auditResult.hasMetaDescription, label: "Search description" },
      { passed: auditResult.hasViewport, label: "Mobile-friendly setup" },
      { passed: auditResult.isLinkCrawlable, label: "Links are crawlable" },
      { passed: auditResult.hasLocalBusinessSchema, label: "Google local business info" },
    ];

    for (let i = 0; i < checks.length; i++) {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const cx = margin + col * (contentWidth / 2);
      const cy = y + row * 20;

      doc.setTextColor(checks[i].passed ? green[0] : red[0], checks[i].passed ? green[1] : red[1], checks[i].passed ? green[2] : red[2]);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(checks[i].passed ? "+" : "-", cx, cy);
      doc.setTextColor(...textColor);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(checks[i].label, cx + 15, cy);
    }
    y += Math.ceil(checks.length / 2) * 20 + 15;
  }

  // ── StoryBrand Messaging ──
  if (auditResult?.storyBrand) {
    checkPageBreak(100);
    drawLine();
    doc.setTextColor(...dark);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Your Website Messaging", margin, y);
    y += 25;

    const grade = auditResult.storyBrand.grade;
    const gradeColor = grade === "A" || grade === "B" ? green : grade === "C" ? yellow : red;

    doc.setFillColor(250, 250, 250);
    doc.roundedRect(margin, y, contentWidth, 50, 6, 6, "F");
    doc.setTextColor(...gradeColor);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text(grade, margin + 30, y + 33);

    doc.setTextColor(...textColor);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const gradeLabels: Record<string, string> = {
      A: "StoryBrand-aligned — this site sells",
      B: "Good foundation, needs tightening",
      C: "Has pieces, but the message is muddled",
      D: "Talking about themselves, not the customer",
      F: "Digital brochure — not a sales tool",
    };
    doc.text(gradeLabels[grade] ?? gradeLabels.F, margin + 60, y + 30);
    y += 65;

    const weakItems = auditResult.storyBrand.items
      .filter(i => i.autoScore !== null && i.autoScore < 2)
      .slice(0, 4);

    if (weakItems.length > 0) {
      checkPageBreak(weakItems.length * 20 + 10);
      for (const item of weakItems) {
        const color = item.autoScore === 0 ? red : yellow;
        doc.setTextColor(...color);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(item.autoScore === 0 ? "-" : "!", margin, y);
        doc.setTextColor(...textColor);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text(item.label, margin + 15, y);
        y += 18;
      }
      y += 5;
    }

    if (recommendations.length > 0) {
      checkPageBreak(recommendations.length * 25 + 40);
      const recBlockHeight = 30 + recommendations.length * 20;
      doc.setFillColor(240, 249, 240);
      doc.roundedRect(margin, y, contentWidth, recBlockHeight, 6, 6, "F");
      y += 20;
      doc.setTextColor(...sage);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("WHAT I'D FIX FIRST", margin + 15, y);
      y += 16;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...textColor);
      doc.setFontSize(9);
      for (const rec of recommendations) {
        doc.setTextColor(...sage);
        doc.text("->", margin + 15, y);
        doc.setTextColor(...textColor);
        const recLine = doc.splitTextToSize(rec, contentWidth - 50);
        doc.text(recLine[0], margin + 30, y);
        y += 18;
      }
      y += 15;
    }
  }

  // ── ROI Estimate ──
  if (tradeData) {
    checkPageBreak(120);
    drawLine();
    doc.setTextColor(...dark);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("What a Weak Online Presence Could Mean", margin, y);
    y += 15;
    doc.setTextColor(...mutedText);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Estimates based on industry averages for ${tradeData.label.toLowerCase()} businesses in Northeast Alabama`,
      margin,
      y
    );
    y += 25;

    const roiWidth = (contentWidth - 20) / 3;
    const roiData = [
      { value: `$${tradeData.avgJobValue}`, label: "Average Job Value" },
      { value: `${tradeData.estimatedMissedLeads[0]}-${tradeData.estimatedMissedLeads[1]}`, label: "Leads That May Go Elsewhere" },
      { value: `$${tradeData.estimatedMonthlyLoss[0].toLocaleString()}-$${tradeData.estimatedMonthlyLoss[1].toLocaleString()}`, label: "Potential Missed Revenue" },
    ];

    for (let i = 0; i < roiData.length; i++) {
      const rx = margin + i * (roiWidth + 10);
      doc.setFillColor(i === 2 ? 254 : 250, i === 2 ? 242 : 250, i === 2 ? 242 : 250);
      doc.roundedRect(rx, y, roiWidth, 50, 6, 6, "F");
      doc.setTextColor(i === 2 ? red[0] : dark[0], i === 2 ? red[1] : dark[1], i === 2 ? red[2] : dark[2]);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(roiData[i].value, rx + roiWidth / 2, y + 25, { align: "center" });
      doc.setTextColor(...mutedText);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(roiData[i].label, rx + roiWidth / 2, y + 40, { align: "center" });
    }
    y += 65;

    checkPageBreak(50);
    doc.setFillColor(240, 249, 240);
    doc.roundedRect(margin, y, contentWidth, 35, 6, 6, "F");
    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const paybackJobs = tradeData.paybackJobs[recommendedTier] ?? 4;
    doc.text(
      `A ${recommendedTier} package ($${tierPrice}) typically pays for itself within ${paybackJobs} job${paybackJobs !== 1 ? "s" : ""}.`,
      margin + 15,
      y + 22
    );
    y += 45;

    doc.setTextColor(...mutedText);
    doc.setFontSize(8);
    doc.text("Your results may vary — these numbers reflect typical businesses in our area.", margin, y);
    y += 20;
  }

  // ── Footer ──
  const footerY = doc.internal.pageSize.getHeight() - 40;
  doc.setFillColor(...dark);
  doc.rect(0, footerY - 10, pageWidth, 50, "F");
  doc.setTextColor(...terracotta);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Ready to fix this?", margin, footerY + 8);
  doc.setTextColor(200, 200, 200);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("headleyweb.com  |  (256) 644-7334  |  matt@headleyweb.com", margin, footerY + 22);
  doc.setTextColor(...mutedText);
  doc.setFontSize(7);
  doc.text(
    `Generated ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
    pageWidth - margin,
    footerY + 22,
    { align: "right" }
  );

  return new Uint8Array(doc.output("arraybuffer"));
}
