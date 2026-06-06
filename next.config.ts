import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'www.mihrabturizm.com.tr',
      },
      {
        protocol: 'https',
        hostname: 'amadeturizm.com.tr',
      },
      {
        protocol: 'https',
        hostname: '*.amadeturizm.com.tr',
      },
      {
        protocol: 'https',
        hostname: 'www.mavitur.com.tr',
      },
      {
        protocol: 'https',
        hostname: '**.com.tr',
      },
      {
        protocol: 'https',
        hostname: '**.com',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
