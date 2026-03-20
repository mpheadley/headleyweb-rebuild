import { MapPin, Mail, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { locations } from "@/app/data/locations";

export default function Footer() {
  return (
    <footer className="bg-hw-dark text-gray-300 py-12 px-6">
      <div className="max-w-5xl mx-auto text-center space-y-5">
        <div className="flex items-center justify-center">
          <div className="w-80 h-52 rounded-2xl bg-[#F2E8D4] overflow-hidden relative">
            <Image
              src="/images/logo-seal-footer.webp"
              alt="Headley Web & SEO"
              fill
              sizes="320px"
              loading="lazy"
              className="object-cover scale-110"
            />
          </div>
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
          <span className="text-gray-500">&middot;</span>
          <a
            href="https://g.page/r/CZcynt10WKMIEAE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            ⭐ Leave a Review
          </a>
        </div>

        <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
          <MapPin className="w-3 h-3" />
          Jacksonville, Alabama &middot; Serving Northeast Alabama
        </p>

        {/* Service Areas */}
        <div className="pt-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Service Areas</p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs">
            {locations.map((loc, i) => (
              <span key={loc.slug} className="flex items-center gap-x-3">
                <Link
                  href={`/locations/${loc.slug}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {loc.name}, AL
                </Link>
                {i < locations.length - 1 && <span className="text-gray-600">&middot;</span>}
              </span>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400 max-w-lg mx-auto">
          Your website will be live, mobile-friendly, and optimized for local search.
          Outcomes depend on your business and customer behavior.
        </p>

        <div className="flex items-center justify-center gap-4 text-xs text-gray-400 pt-2">
          <span>&copy; {new Date().getFullYear()} <span className="font-heading">Headley Web <span className="amp">&amp;</span> SEO</span>. All rights reserved.</span>
          <Link href="/audit" className="hover:text-white transition-colors">
            Free Site Audit
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </div>

        <p className="text-xs text-gray-400">
          Built by{" "}
          <a href="https://headleyweb.com" className="font-heading text-hw-primary hover:text-hw-primary-dark transition-colors">
            Headley Web <span className="amp">&amp;</span> SEO
          </a>
        </p>
      </div>
    </footer>
  );
}
