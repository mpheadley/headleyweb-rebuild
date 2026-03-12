"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import type { Metadata } from "next";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://headleyweb.com" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://headleyweb.com/contact" },
  ],
};

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xyknwdgp", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ═══ Hero ═══ */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 px-6 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center ken-burns-subtle"
          style={{ backgroundImage: "url('/images/plumber-handshake2.webp')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(28,40,38,0.92)] via-[rgba(28,40,38,0.85)] to-[rgba(28,40,38,0.95)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 !text-white animate-on-scroll">
            Let&apos;s <span className="text-hw-primary hand-accent">Talk</span>
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto animate-on-scroll">
            Ready to get your business found online? Start with a quick conversation — no pressure, no sales pitch.
          </p>
        </div>
      </section>

      {/* ═══ Contact Grid ═══ */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Form */}
            <div className="animate-on-scroll">
              <h2 className="text-2xl font-bold mb-3">Send Me a Message</h2>
              <p className="text-hw-text-light mb-6">
                I&apos;ll personally review your online presence and send you a short video showing exactly what&apos;s keeping customers from finding you — no sales pitch, no strings attached.
              </p>

              {status === "sent" ? (
                <div className="card-glow text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-hw-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-hw-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Got it!</h3>
                  <p className="text-hw-text-light">
                    I&apos;ll be in touch faster than your last web designer returned a phone call.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="_subject" value="New Site Checkup Request from headleyweb.com" />
                  <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="form-input w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-hw-text"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="form-input w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-hw-text"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-sm font-semibold mb-1">
                      Your Website URL <span className="text-hw-text-light font-normal">(or &quot;I don&apos;t have one yet&quot;)</span>
                    </label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      className="form-input w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-hw-text"
                      placeholder="www.yourbusiness.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-1">
                      Phone Number <span className="text-hw-text-light font-normal">(optional — so I can text you the link)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-hw-text"
                      placeholder="(256) 555-1234"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary w-full text-center"
                  >
                    {status === "sending" ? "Sending..." : "Get My Free Checkup"}
                  </button>
                  <p className="text-xs text-hw-text-light text-center">No sales pitch. I&apos;ll send you a short video within 48 hours.</p>
                  {status === "error" && (
                    <p className="text-red-600 text-sm text-center">
                      Something went wrong. Please try again or call me directly.
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8 animate-on-scroll">
              <h2 className="text-2xl font-bold mb-6">Other Ways to Reach Me</h2>

              <div className="space-y-6">
                <a href="tel:+12566447334" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-hw-primary/10 flex items-center justify-center shrink-0 group-hover:bg-hw-primary/20 transition-colors">
                    <Phone className="w-6 h-6 text-hw-primary" />
                  </div>
                  <div>
                    <p className="font-semibold group-hover:text-hw-primary transition-colors">(256) 644-7334</p>
                    <p className="text-sm text-hw-text-light">Call or text anytime</p>
                  </div>
                </a>

                <a href="mailto:matt@headleyweb.com" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-hw-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-hw-secondary/20 transition-colors">
                    <Mail className="w-6 h-6 text-hw-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold group-hover:text-hw-secondary transition-colors">matt@headleyweb.com</p>
                    <p className="text-sm text-hw-text-light">I reply within 24 hours</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-hw-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-hw-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Jacksonville, Alabama</p>
                    <p className="text-sm text-hw-text-light">Serving Calhoun, Etowah, Cherokee &amp; Talladega counties</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-hw-secondary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-hw-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold">Response Time</p>
                    <p className="text-sm text-hw-text-light">Usually within a few hours. I&apos;m a real person — not a chatbot.</p>
                  </div>
                </div>
              </div>

              {/* Google Business Profile link */}
              <div className="card-glow mt-8">
                <p className="font-semibold mb-1">Find Me on Google</p>
                <p className="text-sm text-hw-text-light mb-3">
                  Check out reviews and business info on my Google Business Profile.
                </p>
                <a
                  href="https://share.google/Dqh6aBASaey4yQXzm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-hw-primary hover:text-hw-primary-dark transition-colors"
                >
                  View Google Business Profile →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
