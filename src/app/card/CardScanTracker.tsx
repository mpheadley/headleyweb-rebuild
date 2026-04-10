"use client";

import { useEffect } from "react";

/**
 * Fires a GA4 card_scan event on mount — but only if consent was already
 * granted (i.e. window.gtag exists). No consent = no event, matching the
 * site-wide consent-gated pattern.
 */
export default function CardScanTracker() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "card_scan", {
        event_category: "engagement",
        event_label: "business_card_qr",
      });
    }
  }, []);

  return null;
}
