// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//  allowedDevOrigins: ["192.168.1.43"],
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.43"],
  
  /* 
     Si necesitas agregar opciones de configuración aquí más adelante, 
     TypeScript las aceptará siempre que sean propiedades válidas.
  */
};

export default nextConfig;