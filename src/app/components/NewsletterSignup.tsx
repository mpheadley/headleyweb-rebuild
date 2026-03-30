"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function NewsletterSignup() {
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
      <p className="text-sm text-green-400 flex items-center justify-center gap-1" role="status" aria-live="polite">
        <CheckCircle2 className="w-4 h-4" /> You&apos;re subscribed!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center gap-2 max-w-sm mx-auto">
      <input type="hidden" name="newsletter" value="true" />
      <input type="hidden" name="_subject" value="New Newsletter Signup from headleyweb.com" />
      <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
      <input
        type="email"
        name="email"
        required
        placeholder="you@email.com"
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
  );
}
