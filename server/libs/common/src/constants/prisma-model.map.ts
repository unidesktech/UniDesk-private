export const PRISMA_MODEL_MAP = {
  users: {
    table: 'unidesk.users',
    idColumn: 'user_id',
    scope: 'school',
  },
  classes: {
    table: 'unidesk.classes',
    idColumn: 'class_id',
    scope: 'school',
  },
  sections: {
    table: 'unidesk.sections',
    idColumn: 'section_id',
    scope: 'class',
  },
} as const;

export type PrismaModelKey = keyof typeof PRISMA_MODEL_MAP;
