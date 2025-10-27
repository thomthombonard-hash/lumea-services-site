import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // ✅ Active le mode "static export"
  images: { unoptimized: true }, // ✅ Évite l'erreur d'optimisation d'images
};

export default nextConfig;
