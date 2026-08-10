import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.43"],
  
  // Dejamos SOLAMENTE esta opción, que es la correcta para Prisma 7
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