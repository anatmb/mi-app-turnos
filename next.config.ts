import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Mover serverComponentsExternalPackages a la raíz como serverExternalPackages
  serverExternalPackages: ["@prisma/client", "prisma"],

  // 2. Si necesitas ignorar errores de TypeScript/ESLint durante el build,
  // la forma actual en Next.js es configurar typescript o deshabilitar lint en el comando.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;