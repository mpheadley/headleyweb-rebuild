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
      // Business card QR → personal hub
      { source: "/card", destination: "https://matthewheadley.com/card", permanent: false },
      // Blog migration → matthewheadley.com/websites/blog
      { source: "/blog/:slug", destination: "https://matthewheadley.com/websites/blog/:slug", permanent: true },
      { source: "/blog", destination: "https://matthewheadley.com/websites/blog", permanent: true },
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
