"use client";

import { useEffect } from "react";

// Set NEXT_PUBLIC_GA4_ID in .env.local (e.g. G-XXXXXXXXXX)
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID?.trim();

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Loads GA4 and attaches event tracking via event delegation.
 * Only call this after cookie consent is granted.
 */
export function loadGA4() {
  if (!GA4_ID || typeof window === "undefined") return;

  // Prevent double-loading
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA4_ID}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  // GA4 requires the native `arguments` object — plain arrays are ignored
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA4_ID);
}

/**
 * Analytics component — attaches GA4 event tracking via event delegation.
 * Renders nothing visible. Only activates when consent is granted.
 *
 * Tracked events (matching HTML starter kit):
 *  - phone_click: tel: link clicks
 *  - form_submit: form submissions
 *  - cta_click: .btn-primary / .cta-button clicks
 */
export default function Analytics({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled || !GA4_ID || typeof window === "undefined") return;

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target || !window.gtag) return;

      // Phone link clicks
      const phoneLink = target.closest('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (phoneLink) {
        window.gtag("event", "phone_click", {
          event_category: "contact",
          event_label: phoneLink.href.replace("tel:", ""),
        });
      }

      // CTA button clicks
      const ctaBtn = target.closest(".btn-primary, .cta-button") as HTMLElement | null;
      if (ctaBtn) {
        window.gtag("event", "cta_click", {
          event_category: "engagement",
          event_label: ctaBtn.textContent?.trim(),
        });
      }
    }

    function handleSubmit(e: Event) {
      if (!window.gtag) return;
      const form = e.target as HTMLFormElement;
      if (form?.tagName === "FORM") {
        window.gtag("event", "form_submit", {
          event_category: "contact",
          event_label: window.location.pathname,
        });
      }
    }

    function handleToggle(e: Event) {
      if (!window.gtag) return;
      const details = e.target as HTMLDetailsElement;
      if (details?.tagName === "DETAILS" && details.open) {
        const question = details.querySelector("summary")?.textContent?.trim();
        if (question) {
          window.gtag("event", "faq_open", {
            event_category: "engagement",
            event_label: question,
          });
        }
      }
    }

    document.addEventListener("click", handleClick, true);
    document.addEventListener("submit", handleSubmit, true);
    document.addEventListener("toggle", handleToggle, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("submit", handleSubmit, true);
      document.removeEventListener("toggle", handleToggle, true);
    };
  }, [enabled]);

  return null;
}
