import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  /* config options here */
  reactCompiler: true,
  experimental: {
    typedEnv: true,
  },
};
module.exports = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
};
export default nextConfig;
