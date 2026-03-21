import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { generateReportPdf } from "@/lib/generate-report-pdf";
import type { AuditResult } from "@/lib/audit-types";

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  let body: {
    email: string;
    auditResult: AuditResult;
    archetype?: { name: string; emoji: string; tagline: string; description: string; strength: string; risk: string; recommendation: string; tier: string };
    tradeData?: { label: string; avgJobValue: number; estimatedMissedLeads: [number, number]; estimatedMonthlyLoss: [number, number]; paybackJobs: Record<string, number> } | null;
    recommendedTier?: string;
    tierPrice?: number;
    recommendations?: string[];
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body.email || !body.auditResult) {
    return NextResponse.json({ error: "Email and audit result are required" }, { status: 400 });
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  try {
    // Generate PDF
    const pdfBytes = generateReportPdf({
      archetype: body.archetype ?? {
        name: "Site Audit",
        emoji: "🔍",
        tagline: "Instant website analysis",
        description: `Automated audit of ${body.auditResult.url} covering speed, SEO, accessibility, and messaging.`,
        strength: "",
        risk: "",
        recommendation: "Review the results below and take action on the top recommendations.",
        tier: "",
      },
      auditResult: body.auditResult,
      tradeData: body.tradeData ?? null,
      recommendedTier: body.recommendedTier ?? "",
      tierPrice: body.tierPrice ?? 0,
      recommendations: body.recommendations ?? [],
    });

    const hostname = new URL(body.auditResult.url).hostname;
    const filename = `site-readiness-report-${hostname}.pdf`;

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: "Headley Web & SEO <reports@send.headleyweb.com>",
      to: [body.email],
      subject: `Your Site Readiness Report — ${hostname}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1C2826; padding: 24px 30px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #FFFFFF; font-size: 20px; margin: 0 0 4px;">Your Site Readiness Report</h1>
            <p style="color: #E07B3C; font-size: 14px; margin: 0;">Headley Web &amp; SEO</p>
          </div>
          <div style="background: #F5F0EB; padding: 24px 30px; border-radius: 0 0 8px 8px;">
            <p style="color: #2D2D2D; font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
              Thanks for running an audit on <strong>${hostname}</strong>. Your personalized report is attached as a PDF.
            </p>
            ${body.auditResult.storyBrand ? `
            <p style="color: #2D2D2D; font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
              <strong>Messaging Grade: ${body.auditResult.storyBrand.grade}</strong> — ${
                body.auditResult.storyBrand.grade === "A" ? "your site is StoryBrand-aligned." :
                body.auditResult.storyBrand.grade === "B" ? "good foundation, needs tightening." :
                body.auditResult.storyBrand.grade === "C" ? "has pieces, but the message is muddled." :
                "your site is talking about you, not your customer."
              }
            </p>` : ""}
            <p style="color: #2D2D2D; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">
              Want me to walk you through the results? I&apos;m happy to do a quick call — no pitch, no pressure.
            </p>
            <a href="tel:+12566447334" style="display: inline-block; background: #E07B3C; color: #1C2826; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px;">
              Call Me — (256) 644-7334
            </a>
            <p style="color: #6B7280; font-size: 12px; margin-top: 20px;">
              Headley Web &amp; SEO &middot; headleyweb.com &middot; Jacksonville, AL
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename,
          content: Buffer.from(pdfBytes).toString("base64"),
        },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Send report error:", err);
    return NextResponse.json({ error: "Failed to generate and send report" }, { status: 500 });
  }
}
