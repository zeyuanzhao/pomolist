import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000", // localhost
        "literate-space-adventure-jjqg9xp44vxfp9px-3000.app.github.dev", // Codespaces
      ],
    },
  },
};

const withVercelToolbar = require("@vercel/toolbar/plugins/next")();

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// Instead of module.exports = nextConfig, do this:
module.exports = withBundleAnalyzer(withVercelToolbar(nextConfig));
