import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Mail, Search, ArrowRight } from "lucide-react";
import CardScanTracker from "./CardScanTracker";

export const metadata: Metadata = {
  title: "Matt Headley | Headley Web & SEO",
  description:
    "Web design and local SEO for Northeast Alabama businesses. Get found, get calls, get booked.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CardPage() {
  return (
    <main
      id="main-content"
      className="min-h-[80vh] flex items-center justify-center px-4 py-12"
    >
      <CardScanTracker />

      <div className="w-full max-w-sm text-center">
        {/* Headshot */}
        <div className="mx-auto mb-6 w-32 h-32 rounded-full overflow-hidden border-4 border-hw-secondary shadow-lg">
          <Image
            src="/images/headshot-matt-headley.webp"
            alt="Matt Headley, web designer and SEO specialist"
            width={128}
            height={128}
            quality={80}
            priority
            className="object-cover w-full h-full"
          />
        </div>

        {/* Name & tagline */}
        <h1 className="text-2xl font-bold text-hw-dark mb-1">
          Thanks for connecting
        </h1>
        <p className="text-hw-text-light text-sm mb-1">Matt Headley</p>
        <p className="text-hw-text text-base mb-8 leading-relaxed">
          I build clear, mobile-friendly websites that help local businesses get
          found, get calls, and get booked.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col gap-3 mb-8">
          <a
            href="/portfolio"
            className="btn-primary flex items-center justify-center gap-2 w-full"
          >
            See My Work
            <ArrowRight size={18} />
          </a>

          <a
            href="/audit"
            className="btn-secondary flex items-center justify-center gap-2 w-full"
          >
            <Search size={18} />
            Free Site Checkup
          </a>
        </div>

        {/* Contact info */}
        <div className="flex items-center justify-center gap-4 text-sm text-hw-text-light mb-4">
          <a
            href="tel:+12566447334"
            className="flex items-center gap-1.5 hover:text-hw-secondary transition-colors"
          >
            <Phone size={14} />
            (256) 644-7334
          </a>
          <span>&middot;</span>
          <a
            href="mailto:matt@headleyweb.com"
            className="flex items-center gap-1.5 hover:text-hw-secondary transition-colors"
          >
            <Mail size={14} />
            Email
          </a>
        </div>

        {/* Location */}
        <p className="text-hw-text-light text-xs">
          Jacksonville, Alabama
        </p>
      </div>
    </main>
  );
}
