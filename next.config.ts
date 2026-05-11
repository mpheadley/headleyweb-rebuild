import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    qualities: [75, 80],
  },
  async redirects() {
    return [
      // Business card QR → Plainspoken Blueprint link-in-bio
      { source: "/card", destination: "https://plainspokenblueprint.com/matt", permanent: false },
      // Old HTML site URLs → new Next.js routes
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/portfolio.html", destination: "/portfolio", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
