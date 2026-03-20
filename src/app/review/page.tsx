import type { Metadata } from "next";
import ReviewRedirect from "./ReviewRedirect";

export const metadata: Metadata = {
  title: "Leave a Review | Headley Web & SEO",
  description: "Leave a Google review for Headley Web & SEO.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReviewPage() {
  return (
    <main
      id="main-content"
      className="min-h-[60vh] flex items-center justify-center px-4 py-12"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold text-hw-dark mb-4">
          Thanks for your support!
        </h1>
        <ReviewRedirect />
        <noscript>
          <p className="text-hw-text mt-4">
            <a
              href="https://g.page/r/CZcynt10WKMIEBM/review"
              className="underline text-hw-secondary"
            >
              Click here to leave a Google review
            </a>
          </p>
        </noscript>
      </div>
    </main>
  );
}
