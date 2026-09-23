import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow ImageKit SDK to run in API routes (server-side only)
  serverExternalPackages: ["@imagekit/nodejs"],

  // Increase the body size limit for API routes that handle video metadata
  experimental: {
    serverActions: {
      bodySizeLimit: "200mb",
    },
  },
};

export default nextConfig;
