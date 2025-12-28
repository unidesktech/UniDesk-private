import { seedInitialSchoolUser } from './initial-user.seed';
import { seedModules } from './modules.seed';
import { seedPermissions } from './permissions.seed';
import { prisma } from './prisma.client';
import { seedRolePermissions } from './role-permissions.seed';
import { seedSchoolModules } from './school-modules.seed';
import { seedSchools } from './school.seed';
import { seedUserOverrides } from './user-permissions.seed';

async function main() {
  console.log('🚀 Starting database seeding...');

  await seedSchools();
  await seedInitialSchoolUser();
  await seedModules();
  await seedSchoolModules();
  await seedPermissions();
  await seedRolePermissions();
  await seedUserOverrides();

  console.log('✅ Database seeding completed.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
