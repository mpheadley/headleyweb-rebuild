import { MapPin, Mail, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-hw-dark text-gray-300 py-12 px-6">
      <div className="max-w-5xl mx-auto text-center space-y-5">
        <div className="flex items-center justify-center gap-3">
          <Image
            src="/images/logo-headley-web.webp"
            alt="Headley Web & SEO"
            width={144}
            height={144}
            loading="lazy"
            className="rounded-full"
          />
          <p className="text-white font-heading text-lg font-semibold">
            Headley <span className="text-hw-primary">Web <span className="amp">&amp;</span> SEO</span>
          </p>
        </div>
        <p className="text-sm text-gray-400">
          Get found. Get calls. Get booked.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <a href="mailto:matt@headleyweb.com" className="hover:text-white transition-colors">
            <Mail className="inline w-4 h-4 mr-1 -mt-0.5" />
            matt@headleyweb.com
          </a>
          <span className="text-gray-500">&middot;</span>
          <a href="tel:+12566447334" className="hover:text-white transition-colors">
            <Phone className="inline w-4 h-4 mr-1 -mt-0.5" />
            (256) 644-7334
          </a>
          <span className="text-gray-500">&middot;</span>
          <a
            href="https://share.google/Dqh6aBASaey4yQXzm"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Google Business Profile
          </a>
        </div>

        <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
          <MapPin className="w-3 h-3" />
          Jacksonville, Alabama &middot; Serving Northeast Alabama
        </p>

        <p className="text-xs text-gray-400 max-w-lg mx-auto">
          Your website will be live, mobile-friendly, and optimized for local search.
          Outcomes depend on your business and customer behavior.
        </p>

        <div className="flex items-center justify-center gap-4 text-xs text-gray-400 pt-2">
          <span>&copy; {new Date().getFullYear()} Headley Web <span className="amp">&amp;</span> SEO. All rights reserved.</span>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </div>

        <p className="text-xs text-gray-400">
          Built by{" "}
          <a href="https://headleyweb.com" className="text-hw-primary hover:text-hw-primary-dark transition-colors">
            Headley Web <span className="amp">&amp;</span> SEO
          </a>
        </p>
      </div>
    </footer>
  );
}
