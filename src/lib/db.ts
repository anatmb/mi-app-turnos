// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// // Validamos si estamos en el proceso de compilación de Next.js
// const isBuilding = process.env.NEXT_PHASE === "phase-production-build";

// export const db = globalForPrisma.prisma ?? new PrismaClient({
//   log: isBuilding ? [] : ["error"],
// });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// // Exportamos explícitamente la función getDB
// export function getDB(): PrismaClient {
//   const isBuilding =
//     process.env.NEXT_PHASE === "phase-production-build" ||
//     process.env.CI === "true";

//   if (isBuilding) {
//     return new Proxy({} as PrismaClient, {
//       get: () => () => Promise.resolve(null),
//     });
//   }

//   if (!globalForPrisma.prisma) {
//     globalForPrisma.prisma = new PrismaClient({
//       log: ["error"],
//     });
//   }

//   return globalForPrisma.prisma;
// }

// export const db = getDB();

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export function getDB(): PrismaClient {
  const isBuilding =
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.CI === "true";

  if (isBuilding) {
    return new Proxy({} as PrismaClient, {
      get: () => () => Promise.resolve(null),
    });
  }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: ["error"],
    });
  }

  return globalForPrisma.prisma;
}