import { seedInitialSchoolUser } from './initial-user.seed';
import { prisma } from './prisma.client';
import { seedSchools } from './school.seed';

async function main() {
  console.log('🚀 Starting database seeding...');

  await seedSchools();
  await seedInitialSchoolUser();

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
