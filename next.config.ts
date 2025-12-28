import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    qualities: [100, 90, 75, 50, 25], // Allow quality 90 and 100 as requested
  },
  async rewrites() {
    return [
      {
        source: "/studio/:path*",
        destination: "/studio",
      },
    ];
  },
};

export default nextConfig;
