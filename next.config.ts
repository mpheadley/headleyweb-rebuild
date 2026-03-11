import type { NextConfig } from "next";

const isGitHubPages = process.env.NEXT_PUBLIC_BASE_PATH === "/headleyweb-rebuild";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/headleyweb-rebuild" : "",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
