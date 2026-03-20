/* ── Shared PDF generation for Site Readiness Report ──
 * Used by both the server-side email sender (generateReportPdf)
 * and the client-side download button (buildReportDoc).
 *
 * Section order:
 *   1. Header (branding)
 *   2. Overall grade + executive summary
 *   3. Mobile screenshot
 *   4. Messaging analysis (clarity, CTA, empathy, authority)
 *   5. Scores (speed, SEO, accessibility)
 *   6. What your customers experience (speed callout + checks)
 *   7. The stakes / ROI (trade-specific, when available)
 *   7b. Who's outranking you (optional — pass competitors[] to ReportInput)
 *   8. What I'd fix first (recommendations)
 *   9. What success looks like (transformation)
 *  10. Archetype (quiz only)
 *  11. Footer CTA
 *
 * Copy guidelines:
 * - Never use "StoryBrand" in customer-facing text. Use plain language
 *   ("Your Website's Message", "messaging", "clarity").
 * - The PDF is auto-generated — don't imply Matt personally reviewed it.
 *   Use "the checkup found" not "I found." First-person is OK for
 *   forward-looking statements ("What I'd Fix First", "I'll follow up")
 *   since those describe what Matt will do, not what he already did.
 * - Keep labels honest about what the tool can actually verify.
 *   If the code checks HTML (not the visual screenshot), don't claim
 *   something is "visible" or "above the fold."
 */

import { jsPDF } from "jspdf";
import type { AuditResult } from "./audit-types";
import { LOGO_ICON_BASE64 } from "./logo-icon-data";

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

export type ReportCompetitor = {
  name: string;
  url?: string;
  ranking: string;   // e.g. "Ranks #1 for 'Alabama workers comp interpreter'"
  advantage: string; // e.g. "Has /alabama-interpreter-translator/ page, speaks directly to adjusters"
};

export type ReportInput = {
  archetype: ReportArchetype;
  auditResult: AuditResult | null;
  tradeData: ReportTradeEstimate | null;
  recommendedTier: string;
  tierPrice: number;
  recommendations: string[];
  competitors?: ReportCompetitor[]; // optional — omit to hide section
};

/** Build a jsPDF document with the full report. Caller decides output format. */
export function buildReportDoc(input: ReportInput): jsPDF {
  const { archetype, auditResult, tradeData, recommendedTier, tierPrice, recommendations, competitors } = input;

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

  // Logo icon (left side of header)
  const logoW = 46;
  const logoH = 40;
  const logoX = margin;
  const logoY = 22;
  doc.addImage(LOGO_ICON_BASE64, "PNG", logoX, logoY, logoW, logoH);

  // Text shifted right to accommodate logo
  const textX = margin + logoW + 12;
  doc.setTextColor(...white);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Site Readiness Report", textX, 40);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...terracotta);
  doc.text("Headley Web & SEO", textX, 60);
  doc.setTextColor(180, 180, 180);
  doc.text("headleyweb.com  |  (256) 644-7334", textX, 76);

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
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textColor);
    doc.setFontSize(10);

    // Build a dynamic summary sentence — lead with biggest pain point
    const summaryParts: string[] = [];
    // Messaging problems first — highest impact
    if (auditResult.storyBrand && (auditResult.storyBrand.grade === "D" || auditResult.storyBrand.grade === "F")) {
      summaryParts.push("your messaging isn't clear enough to convert visitors into customers");
    } else if (auditResult.storyBrand && auditResult.storyBrand.grade === "C") {
      summaryParts.push("your messaging has the right pieces but needs tightening");
    }
    // Speed second
    if (auditResult.lcp > 4) {
      summaryParts.push(`your site takes ${auditResult.lcp}s to load — even ready-to-hire customers may bounce at that speed`);
    } else if (auditResult.lcp > 2.5) {
      summaryParts.push(`your site is a bit slow at ${auditResult.lcp}s to load`);
    }
    if (!auditResult.hasLocalBusinessSchema) {
      summaryParts.push("Google can't confirm your business details for local search");
    }
    if (!auditResult.hasMetaDescription) {
      summaryParts.push("your site is missing a search description");
    }

    let summary: string;
    if (summaryParts.length === 0 && recommendations.length > 0) {
      summary = `Your site is in solid shape. The checkup still found ${recommendations.length} thing${recommendations.length > 1 ? "s" : ""} worth tightening — see "What I'd Fix First" below.`;
    } else if (summaryParts.length === 0) {
      summary = "Your site is in solid shape — speed, SEO, and messaging are all working for you.";
    } else {
      summary = `Your website is your hardest-working employee — but right now, ${summaryParts.slice(0, 2).join(" and ")}. Here's what the checkup found.`;
    }

    const summaryLines = doc.splitTextToSize(summary, contentWidth - 95);
    const summaryLineCount = Math.min(summaryLines.length, 5);
    const gradeBoxHeight = Math.max(80, 38 + summaryLineCount * 13 + 8);

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
    doc.text(summaryLines.slice(0, 5), margin + 80, y + 38);
    y += gradeBoxHeight + 12;

    // Disclaimer — sets up the video follow-up
    doc.setTextColor(...mutedText);
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.text("This report is generated automatically. I'll personally review your site and follow up.", margin, y);
    y += 16;
  }

  // ── 3. Mobile Screenshot ──
  if (auditResult?.screenshot) {
    checkPageBreak(280);
    doc.setTextColor(...mutedText);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("How your site looks on mobile", margin + contentWidth / 2, y, { align: "center" });
    y += 10;

    const imgW = 140;
    const imgH = 250;
    const imgX = margin + (contentWidth - imgW) / 2;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(1);
    doc.roundedRect(imgX - 4, y - 4, imgW + 8, imgH + 8, 8, 8, "S");
    try {
      doc.addImage(auditResult.screenshot, "JPEG", imgX, y, imgW, imgH);
    } catch {
      // If image fails to load, skip silently
    }
    y += imgH + 20;
  }

  // ── 4. Messaging Analysis ──
  if (auditResult?.storyBrand) {
    const scoredItems = auditResult.storyBrand.items.filter(i => i.autoScore !== null);
    checkPageBreak(120);
    drawLine();
    doc.setTextColor(...dark);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Your Website's Message", margin, y);
    y += 16;
    doc.setTextColor(...mutedText);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Does your site clearly tell visitors what you do, how you help, and what to do next?", margin, y);
    y += 18;

    const msgGrade = auditResult.storyBrand.grade;
    const msgGradeColor = msgGrade === "A" || msgGrade === "B" ? green : msgGrade === "C" ? yellow : red;

    doc.setFillColor(250, 250, 250);
    doc.roundedRect(margin, y, contentWidth, 50, 6, 6, "F");
    doc.setTextColor(...msgGradeColor);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text(msgGrade, margin + 30, y + 33);

    doc.setTextColor(...textColor);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const msgGradeLabels: Record<string, string> = {
      A: "Your messaging is clear and compelling — this site sells",
      B: "Good foundation, but a few gaps are holding you back",
      C: "The right pieces are there, but the message is muddled",
      D: "Key messaging elements are missing — visitors get confused",
      F: "No clear message — visitors won't know what to do",
    };
    doc.text(msgGradeLabels[msgGrade] ?? msgGradeLabels.F, margin + 60, y + 30);
    y += 65;

    // What's working (up to 3 passes)
    const msgPassItems = scoredItems.filter(i => i.autoScore === 2);
    if (msgPassItems.length > 0) {
      checkPageBreak(20 + Math.min(msgPassItems.length, 3) * 18);
      doc.setTextColor(...sage);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("WHAT'S WORKING", margin, y);
      y += 16;
      for (const item of msgPassItems.slice(0, 3)) {
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

    // What needs work — only hard fails (score === 0)
    const msgHardFails = scoredItems.filter(i => i.autoScore === 0);
    if (msgHardFails.length > 0) {
      checkPageBreak(20 + msgHardFails.length * 18);
      doc.setTextColor(...red);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("WHAT NEEDS WORK", margin, y);
      y += 16;
      for (const item of msgHardFails) {
        checkPageBreak(20);
        doc.setTextColor(...red);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("!", margin, y);
        doc.setTextColor(...textColor);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(item.failLabel, margin + 15, y);
        y += 18;
      }
      y += 5;
    }

    // Worth a look — partial credit items (score === 1)
    const msgSoftWarns = scoredItems.filter(i => i.autoScore === 1);
    if (msgSoftWarns.length > 0) {
      checkPageBreak(20 + msgSoftWarns.length * 18);
      doc.setTextColor(...yellow);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("WORTH A LOOK", margin, y);
      y += 16;
      for (const item of msgSoftWarns) {
        checkPageBreak(20);
        doc.setTextColor(...yellow);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("?", margin, y);
        doc.setTextColor(...textColor);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        const displayLabel = item.partialLabel ?? item.failLabel;
        doc.text(displayLabel, margin + 15, y);
        y += 18;
      }
      y += 5;
    }

    // CTA visibility question — can't verify automatically
    const ctaItem = scoredItems.find(i => i.id === "1.3");
    if (ctaItem && ctaItem.autoScore === 2) {
      checkPageBreak(22);
      doc.setTextColor(...yellow);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("?", margin, y);
      doc.setTextColor(...textColor);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Can a visitor see your call-to-action without scrolling? Check the screenshot above.", margin + 15, y);
      y += 18;
    }
    y += 5;
  }

  // ── 4. Scores ──
  if (auditResult && (auditResult.performance > 0 || auditResult.seo > 0)) {
    checkPageBreak(110);
    drawLine();
    doc.setTextColor(...dark);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("How Your Site Performs", margin, y);
    y += 25;

    const hasDesktop = auditResult.performanceDesktop > 0;
    const gaugeCount = hasDesktop ? 4 : 3;
    const gaugeWidth = (contentWidth - 15 * (gaugeCount - 1)) / gaugeCount;
    const gauges = [
      { label: "Speed (Mobile)", score: auditResult.performance },
      ...(hasDesktop ? [{ label: "Speed (Desktop)", score: auditResult.performanceDesktop }] : []),
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

    // ── What your customers experience ──
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
      ? `Your site takes ${auditResult.lcp}s to load — not terrible, but faster competitors may get the edge.`
      : `When someone Googles you on their phone, they wait ${auditResult.lcp}s for your site to load. Even customers ready to hire may bounce at that speed.`;
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

  // ── 7b. Who's Outranking You ──
  if (competitors && competitors.length > 0) {
    checkPageBreak(competitors.length * 60 + 80);
    drawLine();
    doc.setTextColor(...dark);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Who's Outranking You — and Why", margin, y);
    y += 14;
    doc.setTextColor(...mutedText);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      "These aren't bigger companies — they just built pages that speak directly to your buyers.",
      margin, y
    );
    y += 22;

    for (const comp of competitors) {
      checkPageBreak(55);
      // Competitor name bar
      doc.setFillColor(28, 40, 38); // hw-dark
      doc.roundedRect(margin, y, contentWidth, 22, 4, 4, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(comp.name, margin + 10, y + 14);
      if (comp.url) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(180, 200, 190);
        doc.text(comp.url, margin + contentWidth - 10, y + 14, { align: "right" });
      }
      y += 26;

      // Ranking line
      doc.setTextColor(...mutedText);
      doc.setFontSize(9);
      doc.setFont("helvetica", "italic");
      const rankLines = doc.splitTextToSize(`📍 ${comp.ranking}`, contentWidth - 10);
      doc.text(rankLines, margin + 6, y);
      y += rankLines.length * 13 + 2;

      // Advantage line
      doc.setFillColor(245, 240, 235); // hw-light
      const advLines = doc.splitTextToSize(comp.advantage, contentWidth - 24);
      const advBoxH = advLines.length * 13 + 14;
      doc.roundedRect(margin, y, contentWidth, advBoxH, 4, 4, "F");
      doc.setFillColor(224, 123, 60); // terracotta left bar
      doc.rect(margin, y, 3, advBoxH, "F");
      doc.setTextColor(...textColor);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.text(advLines, margin + 12, y + 10);
      y += advBoxH + 12;
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

    // Pre-calculate all recommendation line wraps for accurate block height
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const recLineHeight = 13;
    const recWrapped = recommendations.map(r => doc.splitTextToSize(r, contentWidth - 45));
    const totalRecLines = recWrapped.reduce((sum, lines) => sum + lines.length, 0);
    const recBlockHeight = 20 + totalRecLines * recLineHeight + (recommendations.length - 1) * 6;
    doc.setFillColor(240, 249, 240);
    doc.roundedRect(margin, y, contentWidth, recBlockHeight, 6, 6, "F");
    y += 16;
    doc.setTextColor(...textColor);
    for (let i = 0; i < recommendations.length; i++) {
      doc.setTextColor(...sage);
      doc.setFont("helvetica", "bold");
      doc.text(`${i + 1}.`, margin + 12, y);
      doc.setTextColor(...textColor);
      doc.setFont("helvetica", "normal");
      for (let j = 0; j < recWrapped[i].length; j++) {
        doc.text(recWrapped[i][j], margin + 28, y);
        y += recLineHeight;
      }
      if (i < recommendations.length - 1) y += 6;
    }
    y += 15;
  }

  // ── 8. What Success Looks Like (the transformation) ──
  // Only show for sites that aren't already scoring well — avoids redundant filler on strong sites
  const _overallScoreForSuccessSection = (() => {
    if (!auditResult) return 0;
    const s: number[] = [];
    if (auditResult.performance > 0) s.push(auditResult.performance);
    if (auditResult.seo > 0) s.push(auditResult.seo);
    if (auditResult.accessibility > 0) s.push(auditResult.accessibility);
    const _m: Record<string, number> = { A: 95, B: 82, C: 68, D: 55, F: 35 };
    if (auditResult.storyBrand) s.push(_m[auditResult.storyBrand.grade] ?? 50);
    return s.length > 0 ? Math.round(s.reduce((a, b) => a + b, 0) / s.length) : 0;
  })();
  if (auditResult && _overallScoreForSuccessSection < 90) {
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

  // ── 10. Footer CTA — always anchored to bottom of last page ──
  const footerHeight = 50;
  const finalFooterY = pageHeight - footerHeight;
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
