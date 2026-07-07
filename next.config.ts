import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  // Enable static export for Netlify/Hostinger deployment
  // Uncomment the line below when deploying to Netlify
  // output: 'export',
};

export default nextConfig;
