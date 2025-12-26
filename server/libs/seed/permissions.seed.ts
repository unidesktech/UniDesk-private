import { SCHOOL_PERMISSION_ID } from './constants';
import { prisma } from './prisma.client';

export async function seedPermissions() {
  console.log('🌱 Seeding permissions...');

  const modules = await prisma.modules.findMany();
  const actions = ['view', 'edit', 'delete'];

  let i = 10;

  for (const module of modules) {
    for (const action of actions) {
      await prisma.permissions.upsert({
        where: {
          permission_key_module_id: {
            permission_key: `${module.module_key}.${action}`,
            module_id: module.module_id,
          },
        },
        update: {},
        create: {
          permission_id: SCHOOL_PERMISSION_ID.replace(
            'XX',
            i.toString().padStart(2, '0'),
          ),
          permission_key: `${module.module_key}.${action}`,
          module_id: module.module_id,
          description: `${action} permission for ${module.module_name}`,
        },
      });
      i++;
    }
  }

  console.log('✅ Permissions seeded');
}
