import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const audienceId = process.env.HW_NEWSLETTER_AUDIENCE_ID?.trim();

  if (!apiKey || !audienceId) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  let body: { email: string; firstName?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = body.email?.trim();
  const firstName = body.firstName?.trim() ?? "";
  const source = body.source?.trim() ?? "unknown";

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.contacts.create({
      email,
      firstName,
      unsubscribed: false,
      audienceId,
    });

    if (error) {
      console.error("Resend contacts error:", error);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    // Welcome email — best-effort, doesn't block subscribe success
    const greeting = firstName ? `${firstName},` : "Hey,";
    const welcomeHtml = `
      <p>${greeting}</p>
      <p>Thanks for getting on the list.</p>
      <p>I'm Matt Headley. I build websites for local service businesses in Northeast Alabama — the kind of sites that actually come up when someone searches for your trade in your town.</p>
      <p>If you want to see what that looks like in practice, Southern Legends is my own project — an editorial site I designed and built from scratch. Same Next.js stack, same SEO approach, same performance standards I bring to client work:</p>
      <p><a href="https://southernlegends.blog">southernlegends.blog</a></p>
      <p>I'll be in touch when I have something worth saying.</p>
      <p>Matt<br>
      Headley Web &amp; SEO<br>
      (256) 644-7334 | <a href="https://headleyweb.com">headleyweb.com</a></p>
    `;
    const welcomeText = `${greeting}

Thanks for getting on the list.

I'm Matt Headley. I build websites for local service businesses in Northeast Alabama — the kind of sites that actually come up when someone searches for your trade in your town.

If you want to see what that looks like in practice, Southern Legends is my own project — an editorial site I designed and built from scratch. Same Next.js stack, same SEO approach, same performance standards I bring to client work:
https://southernlegends.blog

I'll be in touch when I have something worth saying.

Matt
Headley Web & SEO
(256) 644-7334 | headleyweb.com`;

    await resend.emails.send({
      from: "Matt Headley <matt@headleyweb.com>",
      to: email,
      subject: "Thanks for signing up",
      html: welcomeHtml,
      text: welcomeText,
    }).catch((err) => console.error("Welcome email error:", err));

    // Notify Matt of new subscriber + source
    await resend.emails.send({
      from: "Headley Web <matt@headleyweb.com>",
      to: "matt@headleyweb.com",
      subject: `New HW subscriber — ${source}`,
      text: `New newsletter subscriber on Headley Web.\n\nEmail: ${email}\nName: ${firstName || "not provided"}\nSource: ${source}`,
    }).catch((err) => console.error("Subscriber notify error:", err));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
