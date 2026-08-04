import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

function hasValidDatabaseUrl() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) return false;

  try {
    const parsed = new URL(connectionString);
    return parsed.protocol === "postgres:" || parsed.protocol === "postgresql:";
  } catch {
    return false;
  }
}

function createFallbackClient() {
  const createRecord = (data?: Record<string, unknown>) => ({
    id: `local-${Date.now()}`,
    createdAt: new Date(),
    ...data,
  });

  return {
    post: {
      findMany: async () => [],
      findUnique: async () => null,
      count: async () => 0,
      create: async ({ data }: { data?: Record<string, unknown> } = {}) => createRecord(data),
      delete: async () => createRecord(),
      update: async ({ data }: { data?: Record<string, unknown> } = {}) => createRecord(data),
    },
    menu: {
      findMany: async () => [],
      findUnique: async () => null,
      count: async () => 0,
      create: async ({ data }: { data?: Record<string, unknown> } = {}) => createRecord(data),
      delete: async () => createRecord(),
      update: async ({ data }: { data?: Record<string, unknown> } = {}) => createRecord(data),
    },
    reservation: {
      findMany: async () => [],
      findUnique: async () => null,
      count: async () => 0,
      create: async ({ data }: { data?: Record<string, unknown> } = {}) => createRecord(data),
      delete: async () => createRecord(),
      update: async ({ data }: { data?: Record<string, unknown> } = {}) => createRecord(data),
    },
    // TAMBAHKAN BAGIAN GALLERY INI:
    gallery: {
      findMany: async () => [],
      findUnique: async () => null,
      count: async () => 0,
      create: async ({ data }: { data?: Record<string, unknown> } = {}) => createRecord(data),
      delete: async () => createRecord(),
      update: async ({ data }: { data?: Record<string, unknown> } = {}) => createRecord(data),
    },
  } as unknown as PrismaClient;
}

export const prisma = globalForPrisma.prisma ?? (hasValidDatabaseUrl()
  ? new PrismaClient({
      adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
    })
  : createFallbackClient());

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}