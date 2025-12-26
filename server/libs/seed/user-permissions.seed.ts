import { USER_ID, USER_PERMISSION_ID } from './constants';
import { prisma } from './prisma.client';

export async function seedUserOverrides() {
  console.log('🌱 Seeding user permission override...');

  const transportDelete = await prisma.permissions.findFirst({
    where: { permission_key: 'management.transport.delete' },
  });

  if (!transportDelete) return;

  await prisma.user_permissions.upsert({
    where: {
      user_id_permission_id: {
        user_id: USER_ID,
        permission_id: transportDelete.permission_id,
      },
    },
    update: { is_allowed: false },
    create: {
      user_permission_id: USER_PERMISSION_ID,
      user_id: USER_ID,
      permission_id: transportDelete.permission_id,
      is_allowed: false,
    },
  });

  console.log('✅ User override seeded');
}
