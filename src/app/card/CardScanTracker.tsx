"use client";

import { useEffect } from "react";

/**
 * Fires a card_scan GA4 event on page load.
 * Only fires if cookie consent has been granted and GA4 is loaded.
 */
export default function CardScanTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Wait briefly for GA4 to load (consent may have been granted on a previous visit)
    const timer = setTimeout(() => {
      if (window.gtag) {
        window.gtag("event", "card_scan", {
          event_category: "engagement",
          event_label: "business_card_qr",
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
