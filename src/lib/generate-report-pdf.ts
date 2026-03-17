/* ── Shared PDF generation for Site Readiness Report ──
 * Used by both the server-side email sender (generateReportPdf)
 * and the client-side download button (buildReportDoc).
 *
 * StoryBrand-aligned structure:
 *   1. Header (branding)
 *   2. Overall grade + executive summary (the bottom line)
 *   3. Scores (the visual hook)
 *   4. What your customers experience (speed + checks, customer-eye framing)
 *   5. The stakes / ROI (what this is costing you — failure)
 *   6. Messaging analysis (StoryBrand grade + details)
 *   7. What I'd fix first (the plan)
 *   8. What success looks like (the transformation — success)
 *   9. Archetype (quiz only — context, not the main event)
 *  10. Footer CTA (call to action)
 */

import { jsPDF } from "jspdf";
import type { AuditResult } from "./audit-types";

export type ReportArchetype = {
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  strength: string;
  risk: string;
  recommendation: string;
  tier: string;
};

export type ReportTradeEstimate = {
  label: string;
  avgJobValue: number;
  estimatedMissedLeads: [number, number];
  estimatedMonthlyLoss: [number, number];
  paybackJobs: Record<string, number>;
};

export type ReportInput = {
  archetype: ReportArchetype;
  auditResult: AuditResult | null;
  tradeData: ReportTradeEstimate | null;
  recommendedTier: string;
  tierPrice: number;
  recommendations: string[];
};

/** Build a jsPDF document with the full report. Caller decides output format. */
export function buildReportDoc(input: ReportInput): jsPDF {
  const { archetype, auditResult, tradeData, recommendedTier, tierPrice, recommendations } = input;

  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
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

  function getLetterGrade(score: number): string {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 65) return "C";
    if (score >= 50) return "D";
    return "F";
  }

  function checkPageBreak(needed: number) {
    if (y + needed > pageHeight - 60) {
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

  // ── 1. Header bar ──
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

  // ── 2. Overall Grade + Executive Summary ──
  if (auditResult) {
    // Calculate overall grade from available scores
    const scores: number[] = [];
    if (auditResult.performance > 0) scores.push(auditResult.performance);
    if (auditResult.seo > 0) scores.push(auditResult.seo);
    if (auditResult.accessibility > 0) scores.push(auditResult.accessibility);
    // Weight StoryBrand grade into overall (convert letter to number)
    const sbGradeMap: Record<string, number> = { A: 95, B: 82, C: 68, D: 55, F: 35 };
    if (auditResult.storyBrand) {
      scores.push(sbGradeMap[auditResult.storyBrand.grade] ?? 50);
    }
    const overallScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    const overallGrade = getLetterGrade(overallScore);
    const overallColor = getScoreColor(overallScore);

    // Grade circle + summary
    const gradeBoxHeight = 80;
    doc.setFillColor(...lightBg);
    doc.roundedRect(margin, y, contentWidth, gradeBoxHeight, 8, 8, "F");

    // Large grade on the left
    doc.setTextColor(...overallColor);
    doc.setFontSize(42);
    doc.setFont("helvetica", "bold");
    doc.text(overallGrade, margin + 40, y + 52, { align: "center" });

    doc.setTextColor(...mutedText);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("OVERALL", margin + 40, y + 66, { align: "center" });

    // Executive summary on the right
    doc.setTextColor(...dark);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("The Bottom Line", margin + 80, y + 22);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textColor);
    doc.setFontSize(10);

    // Build a dynamic summary sentence
    const summaryParts: string[] = [];
    if (auditResult.lcp > 4) {
      summaryParts.push(`your site takes ${auditResult.lcp}s to load — most visitors leave after 3`);
    } else if (auditResult.lcp > 2.5) {
      summaryParts.push(`your site is a bit slow at ${auditResult.lcp}s to load`);
    }
    if (auditResult.storyBrand && (auditResult.storyBrand.grade === "D" || auditResult.storyBrand.grade === "F")) {
      summaryParts.push("your messaging isn't clear enough to convert visitors into customers");
    } else if (auditResult.storyBrand && auditResult.storyBrand.grade === "C") {
      summaryParts.push("your messaging has the right pieces but needs tightening");
    }
    if (!auditResult.hasLocalBusinessSchema) {
      summaryParts.push("Google can't confirm your business details for local search");
    }
    if (!auditResult.hasMetaDescription) {
      summaryParts.push("your site is missing a search description");
    }

    let summary: string;
    if (summaryParts.length === 0) {
      summary = "Your site is in solid shape. A few tweaks could make it even stronger at converting visitors into customers.";
    } else {
      summary = `Your website is your hardest-working employee — but right now, ${summaryParts.slice(0, 2).join(" and ")}. Here's what I found and exactly what I'd fix.`;
    }

    const summaryLines = doc.splitTextToSize(summary, contentWidth - 95);
    doc.text(summaryLines.slice(0, 3), margin + 80, y + 38);
    y += gradeBoxHeight + 20;
  }

  // ── 3. Scores (the visual hook) ──
  if (auditResult && (auditResult.performance > 0 || auditResult.seo > 0)) {
    checkPageBreak(110);
    drawLine();
    doc.setTextColor(...dark);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("How Your Site Performs", margin, y);
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
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(gauges[i].label, gx + gaugeWidth / 2, y + 52, { align: "center" });
    }
    y += 80;

    // ── 4. What your customers experience ──
    checkPageBreak(100);
    doc.setTextColor(...dark);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("What Your Customers Experience", margin, y);
    y += 18;

    // Speed callout — framed through customer's eyes
    const lcpColor: [number, number, number] = auditResult.lcp <= 2.5 ? green : auditResult.lcp <= 4 ? yellow : red;
    const lcpBg: [number, number, number] = auditResult.lcp <= 2.5 ? [240, 249, 240] : auditResult.lcp <= 4 ? [254, 249, 235] : [254, 242, 242];
    const speedLabel = auditResult.lcp <= 2.5
      ? "When someone finds you on Google, your site loads quickly — they'll stick around."
      : auditResult.lcp <= 4
      ? `When someone finds you on Google, they wait ${auditResult.lcp}s for your site to appear. Some will leave.`
      : `When someone Googles you on their phone, they wait ${auditResult.lcp}s for your site to load. Most people leave after 3.`;
    doc.setFillColor(...lcpBg);
    const speedLines = doc.splitTextToSize(speedLabel, contentWidth - 30);
    const speedBoxH = speedLines.length * 14 + 16;
    doc.roundedRect(margin, y, contentWidth, speedBoxH, 6, 6, "F");
    doc.setTextColor(...lcpColor);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(speedLines, margin + 15, y + 14);
    y += speedBoxH + 12;

    // Basic checks — reframed for customer impact
    const checks = [
      { passed: auditResult.isHttps, passText: "Your site is secure — visitors see the lock icon", failText: "No security lock — browsers may warn visitors away" },
      { passed: auditResult.hasMetaDescription, passText: "You have a search description that shows on Google", failText: "No search description — Google shows random text from your page" },
      { passed: auditResult.hasViewport, passText: "Your site is set up for mobile devices", failText: "Not mobile-friendly — over half your visitors are on phones" },
      { passed: auditResult.isLinkCrawlable, passText: "Search engines can follow your links", failText: "Some links aren't crawlable — Google may miss parts of your site" },
      { passed: auditResult.hasLocalBusinessSchema, passText: "Google knows your business name, address, and hours", failText: "Google can't verify your business details for local search results" },
    ];

    for (const check of checks) {
      checkPageBreak(18);
      const color = check.passed ? green : red;
      doc.setTextColor(...color);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(check.passed ? "+" : "-", margin, y);
      doc.setTextColor(...textColor);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(check.passed ? check.passText : check.failText, margin + 15, y);
      y += 18;
    }
    y += 10;
  }

  // ── 5. The Stakes / ROI (failure — what this is costing you) ──
  if (tradeData) {
    checkPageBreak(150);
    drawLine();
    doc.setTextColor(...dark);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("What This Could Be Costing You", margin, y);
    y += 15;
    doc.setTextColor(...mutedText);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Based on industry averages for ${tradeData.label.toLowerCase()} businesses in Northeast Alabama`,
      margin,
      y
    );
    y += 25;

    const roiWidth = (contentWidth - 20) / 3;
    const roiData = [
      { value: `$${tradeData.avgJobValue}`, label: "Average Job Value" },
      { value: `${tradeData.estimatedMissedLeads[0]}-${tradeData.estimatedMissedLeads[1]}`, label: "Leads That May Go Elsewhere" },
      { value: `$${tradeData.estimatedMonthlyLoss[0].toLocaleString()}-$${tradeData.estimatedMonthlyLoss[1].toLocaleString()}`, label: "Potential Missed Revenue/mo" },
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
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(roiData[i].label, rx + roiWidth / 2, y + 40, { align: "center" });
    }
    y += 60;

    doc.setTextColor(...mutedText);
    doc.setFontSize(9);
    doc.text("Estimates reflect typical businesses in our area. Your results may vary.", margin, y);
    y += 15;
  }

  // ── 6. Messaging Analysis (StoryBrand) ──
  if (auditResult?.storyBrand) {
    const scoredItems = auditResult.storyBrand.items.filter(i => i.autoScore !== null);
    checkPageBreak(120);
    drawLine();
    doc.setTextColor(...dark);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Your Website's Message", margin, y);
    y += 8;
    doc.setTextColor(...mutedText);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Does your site clearly tell visitors what you do, how you help, and what to do next?", margin, y);
    y += 22;

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
      A: "Your messaging is clear and compelling — this site sells",
      B: "Good foundation, but a few gaps are holding you back",
      C: "The right pieces are there, but the message is muddled",
      D: "Key messaging elements are missing — visitors get confused",
      F: "No clear message — visitors won't know what to do",
    };
    doc.text(gradeLabels[grade] ?? gradeLabels.F, margin + 60, y + 30);
    y += 65;

    // What's working (up to 3 passes)
    const passItems = scoredItems.filter(i => i.autoScore === 2);
    if (passItems.length > 0) {
      checkPageBreak(20 + Math.min(passItems.length, 3) * 18);
      doc.setTextColor(...sage);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("WHAT'S WORKING", margin, y);
      y += 16;
      for (const item of passItems.slice(0, 3)) {
        checkPageBreak(20);
        doc.setTextColor(...green);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("+", margin, y);
        doc.setTextColor(...textColor);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(item.passLabel, margin + 15, y);
        y += 18;
      }
      y += 8;
    }

    // What needs work (failures + warnings)
    const failItems = scoredItems.filter(i => i.autoScore !== null && i.autoScore < 2);
    if (failItems.length > 0) {
      checkPageBreak(20 + failItems.length * 18);
      doc.setTextColor(...red);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("WHAT NEEDS WORK", margin, y);
      y += 16;
      for (const item of failItems) {
        checkPageBreak(20);
        const color = item.autoScore === 0 ? red : yellow;
        const symbol = item.autoScore === 0 ? "-" : "!";
        doc.setTextColor(...color);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(symbol, margin, y);
        doc.setTextColor(...textColor);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(item.failLabel, margin + 15, y);
        y += 18;
      }
      y += 5;
    }
  }

  // ── 7. What I'd Fix First (the plan) ──
  if (recommendations.length > 0) {
    checkPageBreak(recommendations.length * 25 + 60);
    drawLine();
    doc.setTextColor(...dark);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("What I'd Fix First", margin, y);
    y += 8;
    doc.setTextColor(...mutedText);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("If I were working on this site today, here's where I'd start:", margin, y);
    y += 20;

    const recBlockHeight = 20 + recommendations.length * 22;
    doc.setFillColor(240, 249, 240);
    doc.roundedRect(margin, y, contentWidth, recBlockHeight, 6, 6, "F");
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    for (let i = 0; i < recommendations.length; i++) {
      doc.setTextColor(...sage);
      doc.setFont("helvetica", "bold");
      doc.text(`${i + 1}.`, margin + 12, y);
      doc.setTextColor(...textColor);
      doc.setFont("helvetica", "normal");
      const recLine = doc.splitTextToSize(recommendations[i], contentWidth - 45);
      doc.text(recLine[0], margin + 28, y);
      y += 22;
    }
    y += 15;
  }

  // ── 8. What Success Looks Like (the transformation) ──
  if (auditResult) {
    checkPageBreak(100);
    drawLine();
    doc.setTextColor(...dark);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("What a Site That Works Looks Like", margin, y);
    y += 20;

    doc.setFillColor(240, 249, 240);
    const successItems = [
      "Loads in under 3 seconds — visitors stay and explore",
      "Clear headline that speaks to your customer's problem",
      "Phone number and call-to-action visible without scrolling",
      "Google can verify your business for local search results",
      "Messaging that makes visitors say \"this is exactly what I need\"",
    ];
    const successBlockH = 16 + successItems.length * 18;
    doc.roundedRect(margin, y, contentWidth, successBlockH, 6, 6, "F");
    y += 14;
    doc.setFontSize(10);
    for (const item of successItems) {
      doc.setTextColor(...green);
      doc.setFont("helvetica", "bold");
      doc.text("+", margin + 12, y);
      doc.setTextColor(...textColor);
      doc.setFont("helvetica", "normal");
      doc.text(item, margin + 26, y);
      y += 18;
    }
    y += 10;

    // Payback line (if trade data available)
    if (tradeData) {
      checkPageBreak(40);
      const paybackJobs = tradeData.paybackJobs[recommendedTier] ?? 4;
      doc.setFillColor(254, 247, 241);
      doc.roundedRect(margin, y, contentWidth, 35, 6, 6, "F");
      doc.setTextColor(...textColor);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(
        `A ${recommendedTier} package ($${tierPrice}) typically pays for itself within ${paybackJobs} job${paybackJobs !== 1 ? "s" : ""}.`,
        margin + 15,
        y + 22
      );
      y += 45;
    }
  }

  // ── 9. Archetype (quiz only) ──
  if (archetype.strength || archetype.risk) {
    checkPageBreak(160);
    drawLine();
    doc.setTextColor(...terracotta);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("YOUR ONLINE PERSONALITY", margin, y);
    y += 18;
    doc.setTextColor(...dark);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(archetype.name, margin, y);
    y += 15;
    doc.setTextColor(...mutedText);
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text(archetype.tagline, margin, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    const descLines = doc.splitTextToSize(archetype.description, contentWidth);
    doc.text(descLines.slice(0, 3), margin, y);
    y += Math.min(descLines.length, 3) * 14 + 15;

    // Strength & Risk side by side
    const halfWidth = (contentWidth - 15) / 2;

    doc.setFillColor(240, 249, 240);
    doc.roundedRect(margin, y, halfWidth, 55, 6, 6, "F");
    doc.setTextColor(...sage);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("YOUR STRENGTH", margin + 12, y + 18);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    const strengthLines = doc.splitTextToSize(archetype.strength, halfWidth - 24);
    doc.text(strengthLines.slice(0, 2), margin + 12, y + 32);

    doc.setFillColor(254, 242, 242);
    doc.roundedRect(margin + halfWidth + 15, y, halfWidth, 55, 6, 6, "F");
    doc.setTextColor(...red);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("YOUR RISK", margin + halfWidth + 27, y + 18);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    const riskLines = doc.splitTextToSize(archetype.risk, halfWidth - 24);
    doc.text(riskLines.slice(0, 2), margin + halfWidth + 27, y + 32);

    y += 70;
  }

  // ── 10. Footer CTA ──
  const footerHeight = 50;
  const footerY = Math.max(y + 30, pageHeight - footerHeight);
  if (footerY + footerHeight > pageHeight) {
    doc.addPage();
    y = 50;
  }
  const finalFooterY = Math.max(y + 30, pageHeight - footerHeight);
  doc.setFillColor(...dark);
  doc.rect(0, finalFooterY, pageWidth, footerHeight, "F");
  doc.setTextColor(...terracotta);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Ready to fix this? Let's talk.", margin, finalFooterY + 18);
  doc.setTextColor(200, 200, 200);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("headleyweb.com  |  (256) 644-7334  |  matt@headleyweb.com", margin, finalFooterY + 34);
  doc.setTextColor(...mutedText);
  doc.setFontSize(8);
  doc.text(
    `Generated ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
    pageWidth - margin,
    finalFooterY + 34,
    { align: "right" }
  );

  return doc;
}

/** Server-side convenience: returns PDF as Uint8Array for email attachment. */
export function generateReportPdf(input: ReportInput): Uint8Array {
  const doc = buildReportDoc(input);
  return new Uint8Array(doc.output("arraybuffer"));
}
