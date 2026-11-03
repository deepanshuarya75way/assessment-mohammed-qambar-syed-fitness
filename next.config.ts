import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  compress: true,
  poweredByHeader: false,
  // Tree-shakes and optimizes import bundles for ultra-fast rendering & hydration
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap", "framer-motion"]
  }
};

export default nextConfig;
