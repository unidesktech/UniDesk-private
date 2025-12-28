import { SCHOOL_ID, SCHOOL_MODULE_ID } from './constants';
import { prisma } from './prisma.client';

export async function seedSchoolModules() {
  console.log('🌱 Seeding school modules...');

  const modules = await prisma.modules.findMany();

  let i = 301;

  for (const module of modules) {
    const isTransport = module.module_key === 'management.transport';

    await prisma.school_modules.upsert({
      where: {
        school_id_module_id: {
          school_id: SCHOOL_ID,
          module_id: module.module_id,
        },
      },
      update: {},
      create: {
        school_module_id: SCHOOL_MODULE_ID.replace('XXX', i.toString()),
        school_id: SCHOOL_ID,
        module_id: module.module_id,
        is_enabled: !isTransport, // transport disabled
      },
    });
    i++;
  }

  console.log('✅ School modules seeded');
}
