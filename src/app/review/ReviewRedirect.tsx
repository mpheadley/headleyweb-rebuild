"use client";

import { useEffect } from "react";

/**
 * Fires a review_click GA4 event and redirects to the Google Business Profile review page.
 * Update GBP_REVIEW_URL when you have your Place ID.
 */

const GBP_REVIEW_URL =
  "https://g.page/r/CZcynt10WKMIEBM/review";

export default function ReviewRedirect() {
  useEffect(() => {
    // Fire GA4 event if consent was granted
    if (window.gtag) {
      window.gtag("event", "review_click", {
        event_category: "engagement",
        event_label: "gbp_review_redirect",
      });
    }

    // Short delay so the event has time to send before navigating away
    const timer = setTimeout(() => {
      window.location.href = GBP_REVIEW_URL;
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <p className="text-hw-text-light text-sm animate-pulse">
      Taking you to Google Reviews...
    </p>
  );
}
