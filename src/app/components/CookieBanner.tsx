"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function loadGA4() {
  if (!GA4_ID || typeof window === "undefined") return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA4_ID, { anonymize_ip: true });

  // Phone link clicks
  document.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]').forEach((link) => {
    link.addEventListener("click", () => {
      window.gtag("event", "phone_click", {
        event_category: "contact",
        event_label: link.href.replace("tel:", ""),
      });
    });
  });

  // Form submissions
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", () => {
      window.gtag("event", "form_submit", {
        event_category: "contact",
        event_label: window.location.pathname,
      });
    });
  });

  // CTA button clicks
  document.querySelectorAll(".btn-primary").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.gtag("event", "cta_click", {
        event_category: "engagement",
        event_label: (btn as HTMLElement).textContent?.trim(),
      });
    });
  });
}

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // No GA4 ID configured — nothing to consent to
    if (!GA4_ID) return;

    const consent = localStorage.getItem("cookie_consent");

    if (consent === "accepted") {
      loadGA4();
      return;
    }
    if (consent === "declined") return;

    // Show banner after short delay to avoid CLS
    const timer = setTimeout(() => setShow(true), 800);
    return () => clearTimeout(timer);
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "accepted");
    setShow(false);
    loadGA4();
  }

  function decline() {
    localStorage.setItem("cookie_consent", "declined");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-hw-dark/95 backdrop-blur-sm border-t border-white/10 px-6 py-4 animate-slide-up">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p className="text-gray-300 text-sm flex-grow">
          I use cookies to analyze site traffic and improve your experience.{" "}
          <Link href="/privacy" className="text-hw-primary hover:text-hw-primary-dark underline">
            Privacy Policy
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={accept}
            className="bg-hw-primary text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-hw-primary-dark transition-colors"
          >
            Accept
          </button>
          <button
            onClick={decline}
            className="border border-white/20 text-gray-300 text-sm font-semibold px-5 py-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
