import { ROLE_ID, ROLE_PERMISSION_ID } from './constants';
import { prisma } from './prisma.client';

export async function seedRolePermissions() {
  console.log('🌱 Seeding role permissions (Super Admin)...');

  const permissions = await prisma.permissions.findMany();

  let i = 0;

  for (const permission of permissions) {
    await prisma.role_permissions.upsert({
      where: {
        role_id_permission_id: {
          role_id: ROLE_ID,
          permission_id: permission.permission_id,
        },
      },
      update: { is_allowed: true },
      create: {
        role_permission_id: ROLE_PERMISSION_ID.replace(
          'XX',
          i.toString().padStart(2, '0'),
        ),
        role_id: ROLE_ID,
        permission_id: permission.permission_id,
        is_allowed: true,
      },
    });
    i++;
  }

  console.log('✅ Role permissions seeded');
}
