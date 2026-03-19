"use client";

import { useState, type FormEvent } from "react";
import { Send, Users } from "lucide-react";

export default function ReferPage() {
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
    <main id="main-content" className="py-24 md:py-32 px-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-hw-secondary/10 flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-hw-secondary" />
          </div>
          <h1 className="text-3xl font-bold text-hw-dark mb-3">
            Know Someone Who Needs a Website?
          </h1>
          <p className="text-hw-text-light leading-relaxed">
            Send me their info and I&apos;ll reach out with a free site
            checkup. No pressure, no hard sell.
          </p>
        </div>

        {status === "sent" ? (
          <div className="card-glow text-center py-12">
            <div className="w-16 h-16 rounded-full bg-hw-secondary/10 flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-hw-secondary" />
            </div>
            <h2 className="text-xl font-bold mb-2">Thanks for the referral!</h2>
            <p className="text-hw-text-light">
              I&apos;ll reach out to them with a free checkup. I appreciate you
              thinking of me.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="hidden"
              name="_subject"
              value="New Referral from headleyweb.com/refer"
            />
            <input
              type="text"
              name="_gotcha"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label htmlFor="referrer-name" className="block text-sm font-semibold mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="referrer-name"
                name="referrer_name"
                required
                className="form-input w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-hw-text"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="business-name" className="block text-sm font-semibold mb-1">
                Their Business Name
              </label>
              <input
                type="text"
                id="business-name"
                name="business_name"
                required
                className="form-input w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-hw-text"
                placeholder="e.g. Smith's Plumbing"
              />
            </div>

            <div>
              <label htmlFor="contact-name" className="block text-sm font-semibold mb-1">
                Contact Name
              </label>
              <input
                type="text"
                id="contact-name"
                name="contact_name"
                required
                className="form-input w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-hw-text"
                placeholder="Their name"
              />
            </div>

            <div>
              <label htmlFor="contact-phone" className="block text-sm font-semibold mb-1">
                Their Phone or Email
              </label>
              <input
                type="text"
                id="contact-phone"
                name="contact_info"
                required
                className="form-input w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-hw-text"
                placeholder="(256) 555-1234 or email"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-semibold mb-1">
                Anything I Should Know? <span className="text-hw-text-light font-normal">(optional)</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="form-input w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-hw-text resize-none"
                placeholder="e.g. They just opened, need a website ASAP"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary w-full text-center"
            >
              {status === "sending" ? "Sending..." : "Send Referral"}
            </button>

            {status === "error" && (
              <p className="text-red-600 text-sm text-center">
                Something went wrong. Please try again or text me at (256) 644-7334.
              </p>
            )}
          </form>
        )}
      </div>
    </main>
  );
}
