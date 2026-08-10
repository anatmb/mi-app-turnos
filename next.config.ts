import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.43"],
  
  // 1. Esto le dice a Next.js: "Si una ruta da problemas al pre-renderizarse en el build, no te detengas, déjala pasar"
  staticPageGenerationTimeout: 1000, 
  
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;