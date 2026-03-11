"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-hw-dark/95 backdrop-blur-sm shadow-lg py-3"
            : "bg-gradient-to-b from-black/70 via-black/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-all duration-300 ${scrolled ? "w-5 h-7" : "w-7 h-9"}`}
              aria-hidden="true"
            >
              <path
                d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20c0-6.6-5.4-12-12-12z"
                fill="#E07B3C"
              />
              <circle cx="12" cy="12" r="5" fill="white" />
            </svg>
            <span className={`font-heading font-bold text-lg tracking-tight transition-colors duration-300 ${
              scrolled ? "text-white" : "text-white"
            }`}>
              Headley <span className={`transition-colors duration-300 ${scrolled ? "text-hw-primary" : "text-white"}`}>Web <span style={{ fontFamily: "'Playfair Display', serif" }}>&amp;</span> SEO</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => {
              const isActive = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? "text-white border-b-2 border-hw-primary pb-0.5" : "text-white/80 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="btn-primary text-sm !py-2 !px-4"
            >
              Get Your Free Site Checkup
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-hw-dark/98 flex flex-col items-center justify-center transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <button
          className="absolute top-5 right-6 text-white p-2"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <nav className="flex flex-col items-center gap-8">
          {links.map((l) => {
            const isActive = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-2xl font-heading font-semibold transition-colors ${
                  isActive ? "text-hw-primary" : "text-white hover:text-hw-primary"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="btn-primary text-lg mt-4"
            onClick={() => setMobileOpen(false)}
          >
            Get Your Free Site Checkup
          </Link>
        </nav>
      </div>
    </>
  );
}
