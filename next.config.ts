import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.43"],
  
  // Esto obliga al compilador a tratar a Prisma de manera segura en el entorno aislado de Vercel
  transpilePackages: ["@prisma/client"],
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