import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const SEQUENCE = [
  { day: 0, subject: "Here's your free site checkup" },
  { day: 3, subject: "Your competitors are easier to find (here's why)" },
  { day: 7, subject: "What it actually takes to get found" },
  { day: 14, subject: "What the before and after actually looks like" },
  { day: 21, subject: "Every month you wait is another month of lost leads" },
];

function emailBody(step: number, firstName: string): string {
  const name = firstName || "there";

  const bodies: Record<number, string> = {
    0: `
      <p>${name},</p>
      <p>Your report is attached. It scores your site across messaging, mobile performance, and local SEO — and shows what I'd fix first if this were my site.</p>
      <p>A few things worth knowing: the scores are automated. The recommendations are real. I've built enough of these to know the patterns pretty well, and I'll tell you honestly if what you've got is fixable or needs to start over.</p>
      <p>If you want, I'm happy to record a quick walkthrough of your results. Not a sales call — just a 3-5 minute video where I pull up your specific site and tell you what I actually see. Reply here and I'll put it together.</p>
    `,
    1: `
      <p>${name},</p>
      <p>Here's what happens when someone searches for what you do in your city:</p>
      <p>Three businesses show up in the map pack. One of them gets the call.</p>
      <p>Which one shows up has almost nothing to do with who does better work or who's been in business longer. It comes down to which site loads faster on a phone, which Google Business Profile has more recent activity, and which one answers the questions people are actually typing.</p>
      <p>There's a second layer most businesses don't know about yet. When someone types "my AC stopped working" or "pipes leaking" into ChatGPT or Google, AI answers the question before they ever see a local business. The businesses that get recommended in those answers are the ones whose sites are built to be cited. Most aren't.</p>
      <p>If you looked at your checkup results and want to know what it would actually take to fix your numbers — reply and I'll tell you.</p>
    `,
    2: `
      <p>${name},</p>
      <p>People ask me what the process looks like. Here's the honest version:</p>
      <p><strong>Step 1:</strong> Free site checkup. You already did this. I look at where you stand and tell you what's holding you back.</p>
      <p><strong>Step 2:</strong> I build your system. Website, Google Business Profile, local SEO. Flat rate — you know the number before I start. You own the site, the domain, and all the data from day one. No contracts.</p>
      <p><strong>Step 3:</strong> Your phone starts ringing. Not traffic numbers or impressions. Calls and jobs.</p>
      <p>Builds run $495 to $1,995 depending on how aggressively you want to rank. Most local service businesses land at $1,495 — full site, optimized Google profile, and two blog posts that start ranking from launch day.</p>
      <p>If that's in the right range, I'd be glad to take a look at your specific situation and tell you what I'd actually do.</p>
    `,
    3: `
      <p>${name},</p>
      <p>I'll be honest: I don't have a dozen case studies yet. I'm intentionally keeping the client load small so I can do the work right.</p>
      <p>But the pattern is consistent. A site that was built to look good — or built by a nephew, or just hasn't been touched since 2018 — is invisible on Google. Not because Google doesn't know it exists. Because it doesn't load fast on a phone, doesn't answer the right questions, and doesn't tell Google precisely where the business is and what it does.</p>
      <p>After the rebuild: map pack visibility, first-page results for core service terms, and a site the owner can pull up on their phone without cringing.</p>
      <p>Search results don't move overnight. Usually 30-60 days before you see meaningful ranking changes. But the site starts working the day it goes live — anyone who finds you through referrals, Facebook, or a business card has somewhere credible to land.</p>
      <p>That's the honest picture of what to expect.</p>
    `,
    4: `
      <p>${name},</p>
      <p>I'll be direct.</p>
      <p>The businesses in your area that are building their sites now will rank higher, collect more reviews, and show up in more AI answers 12 months from now. The gap between them and the businesses waiting compounds every month.</p>
      <p>Dunn's HVAC in Anniston was just acquired by a Southeast private equity firm. That company has a national SEO team behind them now. That's not happening to every competitor — but it's the direction the market is moving. The businesses that win are the ones that get their digital presence set before that kind of money owns the map pack.</p>
      <p>I have room for one or two more clients this month. If you want 15 minutes, I'll look at your site and tell you what I'd do and what it would cost. No pressure either way.</p>
      <p>Text or call: <strong>(256) 644-7334</strong></p>
    `,
  };

  return bodies[step] ?? "";
}

function buildEmail(step: number, firstName: string): string {
  const seq = SEQUENCE[step];
  const body = emailBody(step, firstName);

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #1C2826; padding: 24px 30px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #FFFFFF; font-size: 18px; margin: 0 0 4px;">${seq.subject}</h1>
        <p style="color: #E07B3C; font-size: 13px; margin: 0;">Headley Web &amp; SEO</p>
      </div>
      <div style="background: #F5F0EB; padding: 24px 30px; border-radius: 0 0 8px 8px; color: #2D2D2D; font-size: 15px; line-height: 1.7;">
        ${body}
        <p style="margin-top: 24px; margin-bottom: 4px;">Matt<br>Headley Web &amp; SEO</p>
        <p style="color: #6B7280; font-size: 12px; margin: 0;">(256) 644-7334 &middot; <a href="https://headleyweb.com" style="color: #E07B3C;">headleyweb.com</a></p>
        <p style="color: #6B7280; font-size: 11px; margin-top: 24px; padding-top: 16px; border-top: 1px solid #E5E0DB;">
          You requested a free site checkup at headleyweb.com.
          <a href="https://headleyweb.com/unsubscribe?email={{email}}" style="color: #6B7280;">Unsubscribe</a>
        </p>
      </div>
    </div>
  `;
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET?.trim();

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const resendKey = process.env.RESEND_API_KEY?.trim();

  if (!supabaseUrl || !supabaseKey || !resendKey) {
    return NextResponse.json({ error: "Missing env vars" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const resend = new Resend(resendKey);

  const now = new Date();
  const sent: string[] = [];
  const errors: string[] = [];

  // Load all active leads
  const { data: leads, error: fetchError } = await supabase
    .from("hw_nurture_leads")
    .select("*")
    .eq("active", true)
    .lt("sequence_step", SEQUENCE.length);

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  for (const lead of leads ?? []) {
    const addedAt = new Date(lead.added_at);
    const daysSince = Math.floor((now.getTime() - addedAt.getTime()) / (1000 * 60 * 60 * 24));
    const currentStep = lead.sequence_step as number;
    const nextStep = currentStep + 1;

    if (nextStep >= SEQUENCE.length) continue;

    const dueDay = SEQUENCE[nextStep].day;
    if (daysSince < dueDay) continue;

    // Send the next email
    const html = buildEmail(nextStep, lead.first_name ?? "");
    const subject = SEQUENCE[nextStep].subject;

    const { error: sendError } = await resend.emails.send({
      from: "Matt Headley <matt@headleyweb.com>",
      to: [lead.email],
      subject,
      html,
    });

    if (sendError) {
      errors.push(`${lead.email}: ${sendError.message}`);
      continue;
    }

    // Advance the step
    await supabase
      .from("hw_nurture_leads")
      .update({ sequence_step: nextStep, last_sent_at: now.toISOString() })
      .eq("id", lead.id);

    sent.push(`${lead.email} → step ${nextStep} (day ${dueDay})`);
  }

  return NextResponse.json({ sent, errors, checked: leads?.length ?? 0 });
}
