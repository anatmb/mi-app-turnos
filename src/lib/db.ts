import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const databaseUrl = process.env.DATABASE_URL;

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl || "postgresql://mock:mock@localhost:5432/mock",
      },
    },
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  } as any); // 👈 Esto silencia el chequeo estricto de TypeScript solo durante el build

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;