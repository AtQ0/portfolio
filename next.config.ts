import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "a.storyblok.com" },
      { protocol: "https", hostname: "a2.storyblok.com" },
    ],
  },
};

export default nextConfig;
