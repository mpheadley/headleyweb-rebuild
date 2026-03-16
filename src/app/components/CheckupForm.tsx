"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

export default function CheckupForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card-glow text-center py-12" role="status" aria-live="polite">
        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-hw-dark mb-2">You&apos;re all set!</h3>
        <p className="text-hw-text-light max-w-md mx-auto">
          I&apos;ll review your site and send you a report plus a short video walkthrough within 48 hours.
        </p>
        <p className="text-sm text-hw-text-light mt-4">
          Want instant results now?{" "}
          <Link href="/audit" className="text-hw-primary hover:text-hw-primary-dark underline transition-colors">
            Try the free automated audit
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form className="animate-on-scroll space-y-5 card-glow" onSubmit={handleSubmit}>
      <input type="hidden" name="_subject" value="New Site Checkup Request from headleyweb.com" />
      <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-hw-dark mb-1">Your Name</label>
        <input type="text" id="name" name="name" required className="form-input w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-hw-text" placeholder="John Smith" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-hw-dark mb-1">Email Address</label>
        <input type="email" id="email" name="email" required className="form-input w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-hw-text" placeholder="john@example.com" />
      </div>
      <div>
        <label htmlFor="website" className="block text-sm font-semibold text-hw-dark mb-1">Your Website URL <span className="text-hw-text-light font-normal">(or &quot;I don&apos;t have one yet&quot;)</span></label>
        <input type="text" id="website" name="website" className="form-input w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-hw-text" placeholder="www.yourbusiness.com" />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-hw-dark mb-1">Phone Number <span className="text-hw-text-light font-normal">(optional — so I can text you the link)</span></label>
        <input type="tel" id="phone" name="phone" className="form-input w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-hw-text" placeholder="(256) 555-1234" />
      </div>
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full text-lg inline-flex items-center justify-center gap-2">
        {status === "sending" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          "Get My Free Checkup"
        )}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600 text-center" role="alert">
          Something went wrong. Please try again or call <a href="tel:+12566447334" className="underline">(256) 644-7334</a>.
        </p>
      )}
      <p className="text-xs text-hw-text-light text-center">No sales pitch. I&apos;ll send you a report and video walkthrough within 48 hours.</p>
      <p className="text-xs text-center mt-3">
        <Link href="/audit" className="text-hw-primary hover:text-hw-primary-dark underline transition-colors">
          Want instant results? Try the free automated audit
        </Link>
      </p>
    </form>
  );
}
