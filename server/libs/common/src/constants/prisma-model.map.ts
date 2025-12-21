export const PRISMA_MODEL_MAP = {
  users: {
    table: 'unidesk.users',
    idColumn: 'user_id',
  },
} as const;

export type PrismaModelKey = keyof typeof PRISMA_MODEL_MAP;
