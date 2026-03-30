import Image from "next/image";

/**
 * Drop-in "Built by Headley Web & SEO" badge for client site footers.
 * Usage: <BuiltByBadge /> — place at the bottom of any footer.
 */
export default function BuiltByBadge() {
  return (
    <a
      href="https://headleyweb.com"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
      aria-label="Built by Headley Web & SEO"
    >
      <Image
        src="/images/logo-headley-web-sm.webp"
        alt="Headley Web & SEO logo"
        width={24}
        height={24}
        loading="lazy"
        className="rounded-full"
      />
      <span className="text-xs text-gray-400">
        Built by Headley Web &amp; SEO
      </span>
    </a>
  );
}
