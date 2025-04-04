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

export default nextConfig;
