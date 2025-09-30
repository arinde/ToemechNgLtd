import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com", "firebasestorage.googleapis.com"], // ✅ add this line
  },
};

export default nextConfig;
