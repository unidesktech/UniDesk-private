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
  subjects: {
    table: 'unidesk.subjects',
    idColumn: 'subject_id',
    scope: 'school',
  },
  academic_years: {
    table: 'unidesk.academic_years',
    idColumn: 'year_id',
    scope: 'school',
  },
} as const;

export type PrismaModelKey = keyof typeof PRISMA_MODEL_MAP;
