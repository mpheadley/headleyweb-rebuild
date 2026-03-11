import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for headleyweb.com — how Headley Web & SEO collects, uses, and protects your information.",
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://headleyweb.com" },
    { "@type": "ListItem", position: 2, name: "Privacy Policy", item: "https://headleyweb.com/privacy" },
  ],
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="pt-28 pb-16 px-6 bg-hw-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="max-w-3xl mx-auto prose prose-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-hw-text-light text-sm mb-8">Last updated: March 11, 2026</p>

        <p>
          Headley Web &amp; SEO (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates headleyweb.com. This page explains what information we collect, how we use it, and your rights regarding that information.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Information We Collect</h2>
        <p>We collect information you voluntarily provide when you:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Fill out a contact form (name, email, phone, website URL, message)</li>
          <li>Take our website quiz (quiz answers and email)</li>
          <li>Email or call us directly</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3">Analytics</h2>
        <p>
          We use Google Analytics 4 (GA4) to understand how visitors use our site. GA4 collects anonymized usage data including pages visited, time on site, and general geographic region. <strong>No analytics data is collected until you accept cookies via our consent banner.</strong>
        </p>
        <p>
          We track the following custom events after consent: phone link clicks, form submissions, and CTA button clicks. These help us improve the site experience and measure results for our clients.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Cookies</h2>
        <p>
          We use cookies only for analytics purposes (Google Analytics). No tracking cookies are set until you provide consent through our cookie banner. You can withdraw consent at any time by clearing your browser cookies.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>To respond to your inquiries and provide our services</li>
          <li>To send you your free video audit or quiz results</li>
          <li>To improve our website and services</li>
          <li>We will never sell, rent, or share your personal information with third parties for marketing purposes</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3">Third-Party Services</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Formspree</strong> — processes form submissions (<a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-hw-primary hover:text-hw-primary-dark">their privacy policy</a>)</li>
          <li><strong>Google Analytics</strong> — website analytics, consent-gated (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-hw-primary hover:text-hw-primary-dark">their privacy policy</a>)</li>
          <li><strong>Vercel</strong> — website hosting (<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-hw-primary hover:text-hw-primary-dark">their privacy policy</a>)</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3">Data Retention</h2>
        <p>
          Form submissions are retained as long as necessary to provide our services and respond to your inquiry. You may request deletion of your data at any time by contacting us.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Request access to the personal data we hold about you</li>
          <li>Request correction or deletion of your personal data</li>
          <li>Withdraw cookie consent at any time</li>
          <li>Opt out of analytics tracking</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3">Contact</h2>
        <p>
          If you have questions about this privacy policy, contact us at:
        </p>
        <ul className="list-none pl-0 space-y-1">
          <li><strong>Email:</strong> <a href="mailto:matt@headleyweb.com" className="text-hw-primary hover:text-hw-primary-dark">matt@headleyweb.com</a></li>
          <li><strong>Phone:</strong> <a href="tel:+12566447334" className="text-hw-primary hover:text-hw-primary-dark">(256) 644-7334</a></li>
          <li><strong>Location:</strong> Jacksonville, Alabama</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3">Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date.
        </p>
      </article>
    </main>
  );
}
