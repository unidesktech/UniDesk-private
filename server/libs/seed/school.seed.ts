import {
  PLAN_ID,
  SCHOOL_CODE,
  SCHOOL_ID,
  SETTINGS_ID,
  STATUS_ID,
} from './constants';
import { prisma } from './prisma.client';
import { randomUUID } from 'crypto';

export async function seedSchools() {
  console.log('🌱 Seeding schools...');

  await prisma.$transaction(async (tx) => {
    const school = await tx.schools.upsert({
      where: { school_id: SCHOOL_ID },
      update: {},
      create: {
        school_id: SCHOOL_ID,
        school_code: SCHOOL_CODE,
        name: 'UniDesk Demo School',
        address: 'India',
        email: 'admin@unidesk.com',
        phone: '9999999999',
        website: 'https://unidesk.app',
        established: new Date('2020-01-01'),
        config: {},
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'system',
        updated_by: 'system',
        is_active: true,
        is_deleted: false,
      },
    });

    await tx.school_branding.upsert({
      where: { school_id: school.school_id },
      update: {},
      create: {
        branding_id: randomUUID(),
        school_id: school.school_id,
        logo_url: null,
        banner_url: null,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'system',
        updated_by: 'system',
        is_active: true,
        is_deleted: false,
      },
    });

    await tx.school_subscription_status.upsert({
      where: { status_id: STATUS_ID },
      update: {},
      create: {
        status_id: STATUS_ID,
        school_id: school.school_id,
        status: 'inactive',
        valid_from: new Date(),
        valid_to: null,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'system',
        updated_by: 'system',
        is_active: true,
        is_deleted: false,
      },
    });

    await tx.school_pricing_plans.upsert({
      where: { plan_id: PLAN_ID },
      update: {},
      create: {
        plan_id: PLAN_ID,
        school_id: school.school_id,
        plan_type: 'free',
        price_per_month: 0,
        billing_cycle: 'monthly',
        valid_from: new Date(),
        valid_to: null,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'system',
        updated_by: 'system',
        is_active: true,
        is_deleted: false,
      },
    });

    await tx.school_initial_setup.upsert({
      where: { school_id: school.school_id },
      update: {},
      create: {
        setup_id: randomUUID(),
        school_id: school.school_id,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'system',
        updated_by: 'system',
        is_active: true,
        is_deleted: false,
      },
    });

    await tx.school_settings.upsert({
      where: { setting_id: SETTINGS_ID },
      update: {},
      create: {
        setting_id: SETTINGS_ID,
        school_id: school.school_id,
        category: 'general',
        key: 'timezone',
        value: { timezone: 'Asia/Kolkata' },
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'system',
        updated_by: 'system',
        is_active: true,
        is_deleted: false,
      },
    });
  });

  console.log('✅ School seed completed.');
}
