import { prisma } from './prisma.client';
import bcrypt from 'bcryptjs';

export async function seedInitialSchoolUser() {
  console.log('🌱 Seeding initial school user (Super Admin)...');

  const SCHOOL_ID = '00000000-0000-0000-0000-000000000001';
  const USER_ID = '00000000-0000-0000-0000-000000000010';
  const ROLE_ID = '00000000-0000-0000-0000-000000000020';
  const USER_ROLE_ID = '00000000-0000-0000-0000-000000000030';
  const ONBOARDING_ID = '00000000-0000-0000-0000-000000000040';
  const PREF_ID = '00000000-0000-0000-0000-000000000050';

  const PASSWORD = 'Admin@123';
  const SALT_ROUNDS = 10;
  const passwordHash = await bcrypt.hash(PASSWORD, SALT_ROUNDS);

  await prisma.$transaction(async (tx) => {
    const user = await tx.users.upsert({
      where: { user_id: USER_ID },
      update: {},
      create: {
        user_id: USER_ID,
        school_id: SCHOOL_ID,
        user_code: 'UDSA0001',
        name: 'Super Admin',
        email: 'superadmin@unidesk.com',
        phone: '9999999999',
        password_hash: passwordHash,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'system',
        updated_by: 'system',
        is_active: true,
        is_deleted: false,
      },
    });

    await tx.user_onboarding_status.upsert({
      where: { user_id: user.user_id },
      update: {},
      create: {
        onboarding_id: ONBOARDING_ID,
        user_id: user.user_id,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'system',
        updated_by: 'system',
        is_active: true,
        is_deleted: false,
      },
    });

    await tx.user_preferences.upsert({
      where: { user_id: user.user_id },
      update: {},
      create: {
        pref_id: PREF_ID,
        user_id: user.user_id,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'system',
        updated_by: 'system',
        is_active: true,
        is_deleted: false,
      },
    });

    const role = await tx.roles.upsert({
      where: { role_id: ROLE_ID },
      update: {},
      create: {
        role_id: ROLE_ID,
        school_id: SCHOOL_ID,
        name: 'Super-Admin',
        description: 'Super administrator of the school',
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'system',
        updated_by: 'system',
        is_active: true,
        is_deleted: false,
      },
    });

    await tx.user_roles.upsert({
      where: { user_role_id: USER_ROLE_ID },
      update: {},
      create: {
        user_role_id: USER_ROLE_ID,
        user_id: user.user_id,
        role_id: role.role_id,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'system',
        updated_by: 'system',
        is_active: true,
        is_deleted: false,
      },
    });
  });

  console.log('✅ Initial school user seeded.');
}
