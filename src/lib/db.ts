import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Validamos si estamos en el proceso de compilación de Next.js
const isBuilding = process.env.NEXT_PHASE === "phase-production-build";

export const db = globalForPrisma.prisma ?? new PrismaClient({
  log: isBuilding ? [] : ["error"],
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;