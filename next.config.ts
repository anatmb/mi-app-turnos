import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.43"],
  
  // 🛡️ Agregamos esto para apagar Turbopack en producción y usar Webpack
  transpilePackages: ["@prisma/client"],
  experimental: {
    turbo: {
      // Forzamos a que no intente procesar los archivos del servidor de forma agresiva
      rules: {}
    }
  } as any
};

export default nextConfig;