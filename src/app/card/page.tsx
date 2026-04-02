import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Mail, Globe, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Connect with Matt Headley",
  description:
    "Web designer & SEO specialist in Jacksonville, Alabama. Get in touch or explore my work.",
  alternates: { canonical: "/card" },
  robots: { index: false, follow: true },
};

const links = [
  {
    href: "tel:+12566447334",
    icon: Phone,
    label: "(256) 644-7334",
    subtitle: "Call or text",
  },
  {
    href: "mailto:matt@headleyweb.com",
    icon: Mail,
    label: "matt@headleyweb.com",
    subtitle: "Email me",
  },
  {
    href: "https://headleyweb.com?utm_source=business_card&utm_medium=qr&utm_campaign=networking",
    icon: Globe,
    label: "headleyweb.com",
    subtitle: "Web design & SEO for local businesses",
  },
  {
    href: "https://southernlegends.blog?utm_source=business_card&utm_medium=qr&utm_campaign=networking",
    icon: MapPin,
    label: "southernlegends.blog",
    subtitle: "Stories from Northeast Alabama",
  },
];

export default function CardPage() {
  return (
    <main
      id="main-content"
      className="min-h-[100dvh] flex items-center justify-center px-4 py-12"
      style={{ background: "var(--color-light)" }}
    >
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <Image
            src="/images/logo-icon.webp"
            alt="Headley Web & SEO"
            width={80}
            height={80}
            className="mx-auto mb-4 rounded-full"
            priority
          />
          <h1
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
          >
            Matt Headley
          </h1>
          <p
            className="text-sm tracking-wide uppercase font-medium"
            style={{ color: "var(--color-secondary)" }}
          >
            Web Design &amp; SEO
          </p>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--color-text-light)" }}
          >
            Jacksonville, Alabama
          </p>
        </div>

        {/* Gradient divider */}
        <div
          className="h-1 w-16 mx-auto rounded-full mb-8"
          style={{
            background: "linear-gradient(to right, var(--color-secondary), var(--color-primary))",
          }}
        />

        {/* Link cards */}
        <div className="flex flex-col gap-3">
          {links.map(({ href, icon: Icon, label, subtitle }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-4 px-5 py-4 rounded-xl transition-shadow duration-200 hover:shadow-lg"
              style={{
                background: "var(--color-white)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <span
                className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                style={{
                  background: "var(--color-secondary)",
                  color: "var(--color-white)",
                }}
              >
                <Icon size={20} />
              </span>
              <span className="min-w-0">
                <span
                  className="block text-base font-medium truncate"
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
        </div>

        {/* Footer */}
        <p
          className="text-center text-xs mt-10"
          style={{ color: "var(--color-text-light)" }}
        >
          Headley{" "}
          <span style={{ color: "var(--color-primary)" }}>
            Web <span className="amp">&amp;</span> SEO
          </span>
        </p>
      </div>
    </main>
  );
}
