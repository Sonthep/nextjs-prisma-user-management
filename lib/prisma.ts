import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString = process.env.DATABASE_URL;

console.log("DEBUG: DATABASE_URL =", connectionString ? "SET (first 50 chars: " + connectionString.substring(0, 50) + "...)" : "NOT SET");

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaNeon({ connectionString }),
  });

console.log("DEBUG: Prisma client created");

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
