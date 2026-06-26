"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

interface SubscribeCTAProps {
  variant?: "section" | "inline";
  className?: string;
  source?: string;
}

export default function SubscribeCTA({ variant = "section", className = "", source }: SubscribeCTAProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, firstName: data.firstName, source: source ?? (variant === "inline" ? "footer" : "homepage") }),
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

  if (variant === "inline") {
    return (
      <div className={`${className}`}>
        {status === "success" ? (
          <p className="text-sm text-hw-secondary flex items-center gap-1.5" role="status" aria-live="polite">
            <CheckCircle2 className="w-4 h-4" /> You&apos;re on the list.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-sm">
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="form-input flex-grow px-3 py-2 border border-gray-600 rounded-lg bg-hw-dark text-gray-300 text-sm placeholder:text-gray-500 focus:border-hw-primary focus:ring-1 focus:ring-hw-primary"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="shrink-0 px-4 py-2 bg-hw-primary text-hw-dark font-semibold text-sm rounded-lg hover:bg-hw-primary-dark transition-colors disabled:opacity-50"
            >
              {status === "sending" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Subscribe"}
            </button>
            {status === "error" && (
              <p className="text-xs text-red-400 mt-1">Something went wrong. Try again.</p>
            )}
          </form>
        )}
      </div>
    );
  }

  // section variant
  return (
    <section className={`py-20 px-6 bg-hw-light ${className}`}>
      <div className="max-w-2xl mx-auto text-center">
        {status === "success" ? (
          <div className="animate-on-scroll">
            <CheckCircle2 className="w-10 h-10 text-hw-secondary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">You&apos;re on the list.</h2>
            <p className="text-hw-text-light">I&apos;ll be in touch when I have something worth saying.</p>
          </div>
        ) : (
          <div className="animate-on-scroll">
            <p className="text-sm font-semibold uppercase tracking-widest text-hw-primary mb-3">Stay in the loop</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tips, case studies, and honest takes on local SEO</h2>
            <p className="text-hw-text-light mb-8 max-w-lg mx-auto">
              No pitch cadence. I send when I have something worth reading — new case studies, local search changes, and the occasional honest look at what actually works.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="form-input px-4 py-3 rounded-lg border border-gray-300 bg-white text-hw-text text-sm w-full sm:w-32 shrink-0"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="form-input flex-grow px-4 py-3 rounded-lg border border-gray-300 bg-white text-hw-text text-sm"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary shrink-0 disabled:opacity-50"
              >
                {status === "sending" ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Subscribe"}
              </button>
            </form>
            {status === "error" && (
              <p className="text-sm text-red-600 mt-3">Something went wrong. Try again.</p>
            )}
            <p className="text-xs text-hw-text-light mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        )}
      </div>
    </section>
  );
}
