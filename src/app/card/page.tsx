import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mail, Globe, Facebook, Linkedin, UserPlus } from "lucide-react";
import CardScanTracker from "./CardScanTracker";

export const metadata: Metadata = {
  title: "Connect with Matt Headley",
  description:
    "Web designer & SEO specialist in Jacksonville, Alabama. Get in touch or explore my work.",
  alternates: { canonical: "/card" },
  robots: { index: false, follow: true },
};

const links = [
  {
    href: "/portfolio",
    icon: null,
    label: "See my work",
    subtitle: "Recent client sites",
  },
  {
    href: "mailto:matt@headleyweb.com",
    icon: Mail,
    label: "matt@headleyweb.com",
    subtitle: "Email me",
  },
  {
    href: "https://www.linkedin.com/in/mpheadley/",
    icon: Linkedin,
    label: "Matt Headley",
    subtitle: "Connect on LinkedIn",
  },
  {
    href: "https://www.facebook.com/HeadleyWebSEO/?utm_source=business_card&utm_medium=qr&utm_campaign=networking",
    icon: Facebook,
    label: "Headley Web & SEO",
    subtitle: "Facebook page",
  },
];

export default function CardPage() {
  return (
    <main id="main-content" className="min-h-[100dvh] flex flex-col">
      <CardScanTracker />

      {/* ── Dark editorial header ── */}
      <div style={{ background: "var(--color-dark)" }}>

        {/* Text content */}
        <div className="px-6 pb-0 pt-16">
          <p
            className="text-xs tracking-widest uppercase font-semibold mb-4"
            style={{ color: "var(--color-secondary)" }}
          >
            Thanks for connecting.
          </p>

          <div className="flex items-center justify-between gap-4">
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(3.5rem, 14vw, 5rem)",
                fontWeight: 700,
                lineHeight: 0.88,
                letterSpacing: "-3px",
                color: "#ffffff",
              }}
            >
              Matt
              <br />
              <span style={{ color: "var(--color-primary)" }}>Headley</span>
            </h1>
            <Image
              src="/images/headshot-matt-headley.webp"
              alt="Matt Headley"
              width={80}
              height={80}
              className="rounded-full object-cover shrink-0"
              style={{ border: "2px solid var(--color-primary)" }}
              priority
            />
          </div>

          <p
            className="text-xs tracking-widest uppercase mt-4 mb-2"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Web Design &amp; SEO &nbsp;·&nbsp; Jacksonville, AL
          </p>
          <p
            className="text-sm font-medium mb-6"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Get found. Get calls. Get booked.
          </p>
        </div>

        {/* Sage → terracotta gradient bar — full bleed */}
        <div
          className="w-full"
          style={{
            height: "12px",
            background: "linear-gradient(to right, var(--color-secondary), var(--color-primary))",
          }}
        />
      </div>

      {/* ── Gradient cards section ── */}
      <div
        className="flex-1 px-6 py-8"
        style={{
          background: "linear-gradient(160deg, var(--color-secondary), var(--color-primary))",
        }}
      >
        <div className="max-w-xs mx-auto flex flex-col gap-3">

          {/* Primary CTAs */}
          <a
            href="sms:+12566447334"
            className="btn-primary text-center mb-1"
          >
            Text me — (256) 644-7334
          </a>
          <Link
            href="/audit"
            className="text-center text-sm font-semibold py-3 px-6 rounded-xl border-2 transition-colors duration-200"
            style={{
              borderColor: "rgba(255,255,255,0.5)",
              color: "#ffffff",
              background: "rgba(255,255,255,0.1)",
            }}
          >
            Get a Free Site Checkup
          </Link>

          {/* Save to Contacts — utility, lower visual weight */}
          <a
            href="/matt-headley.vcf"
            download="Matt Headley.vcf"
            className="flex items-center justify-center gap-2 py-2 px-6 rounded-xl text-xs font-medium transition-opacity duration-200 hover:opacity-100"
            style={{
              color: "rgba(255,255,255,0.5)",
            }}
          >
            <UserPlus size={13} />
            Save to Contacts
          </a>

          {/* Intro video — upload to public/videos/what-im-against.mp4 when filmed */}
          {/* Remove this comment block and uncomment the video element below */}
          {/*
          <div className="mt-2 rounded-xl overflow-hidden" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.2)" }}>
            <video
              controls
              playsInline
              preload="metadata"
              poster="/images/headshot-matt-headley.webp"
              className="w-full block"
              style={{ aspectRatio: "9/16", objectFit: "cover", background: "var(--color-dark)" }}
            >
              <source src="/videos/what-im-against.mp4" type="video/mp4" />
            </video>
          </div>
          */}

          {/* Divider */}
          <div
            className="h-px w-full my-1"
            style={{ background: "rgba(255,255,255,0.2)" }}
          />

          {/* Link cards */}
          {links.map(({ href, icon: Icon, label, subtitle }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.92)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
              }}
            >
              {Icon ? (
                <span
                  className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                  style={{ background: "var(--color-dark)", color: "var(--color-white)" }}
                >
                  <Icon size={18} />
                </span>
              ) : (
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src="/images/portfolio/project-salon-800w.webp"
                    alt="Client site preview"
                    width={40}
                    height={40}
                    className="object-cover object-top w-full h-full"
                  />
                </div>
              )}
              <span className="min-w-0">
                <span
                  className="block text-sm font-semibold truncate"
                  style={{ color: "var(--color-dark)" }}
                >
                  {label}
                </span>
                <span
                  className="block text-xs truncate"
                  style={{ color: "var(--color-text-light)" }}
                >
                  {subtitle}
                </span>
              </span>
            </a>
          ))}

          {/* Southern Legends — SL brand treatment */}
          <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}>
            <a
              href="https://southernlegends.blog/nominate?utm_source=business_card&utm_medium=qr&utm_campaign=networking"
              className="relative flex items-center gap-4 px-5 py-4 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}
            >
              {/* Pine → gold gradient background */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to right, #3D6B4F, #CA8A04)" }}
              />
              {/* Topo overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: "url('/images/sl-topo.png')",
                  backgroundRepeat: "repeat",
                  backgroundSize: "400px 400px",
                  opacity: 0.35,
                  mixBlendMode: "multiply",
                }}
              />
              {/* Content */}
              <div className="relative z-10 flex items-center gap-4 w-full">
                <Image
                  src="/images/sl-logo.webp"
                  alt="Southern Legends"
                  width={40}
                  height={40}
                  className="rounded-full shrink-0"
                  style={{ border: "1.5px solid rgba(255,255,255,0.3)" }}
                />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-white">
                    Southern Legends
                  </span>
                  <span className="block text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>
                    Nominate a local story →
                  </span>
                </span>
              </div>
            </a>
          </div>

          {/* Footer — branded link to homepage */}
          <a
            href="https://headleyweb.com?utm_source=business_card&utm_medium=qr&utm_campaign=networking"
            className="flex flex-col items-center mt-4 gap-2 opacity-80 hover:opacity-100 transition-opacity duration-200"
          >
            <Image
              src="/images/logo-icon-transparent.png"
              alt="Headley Web & SEO"
              width={224}
              height={224}
            />
            <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: "#ffffff" }}>
              <Globe size={14} />
              headleyweb.com
            </span>
          </a>

        </div>
      </div>
    </main>
  );
}
