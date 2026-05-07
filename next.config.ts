import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/**",
      },
      {
        pathname: "/sponsor1.png",
        search: "?v=20260507-1809",
      },
    ],
  },
};

export default nextConfig;
