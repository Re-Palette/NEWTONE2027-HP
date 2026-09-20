import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    /**
     * 既定の再エンコード品質は 75 で、暗い背景に光がのるビジュアルでは
     * バンディングと輪郭のにじみが目に見えて出る。各 <Image> で 92 を指定し、
     * その値をここで許可している。
     */
    qualities: [75, 92],
  },
};

export default nextConfig;
