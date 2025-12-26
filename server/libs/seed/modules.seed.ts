import { MODULE_ID } from './constants';
import { prisma } from './prisma.client';

export async function seedModules() {
  console.log('🌱 Seeding modules...');

  const modules = [
    {
      key: 'dashboard',
      name: 'Dashboard',
      route: '/dashboard',
      icon: 'LayoutGrid',
      order: 1,
    },

    {
      key: 'management.students',
      name: 'Students',
      route: '/management/students',
      icon: 'User',
      order: 2,
    },
    {
      key: 'management.teachers',
      name: 'Teachers',
      route: '/management/teachers',
      icon: 'Users',
      order: 3,
    },
    {
      key: 'management.subjects',
      name: 'Subjects',
      route: '/management/subjects',
      icon: 'Book',
      order: 4,
    },
    {
      key: 'management.transport',
      name: 'Transport',
      route: '/management/transport',
      icon: 'Bus',
      order: 5,
    },

    {
      key: 'attendance',
      name: 'Attendance',
      route: '/attendance',
      icon: 'Calendar',
      order: 6,
    },
    { key: 'fees', name: 'Fees', route: '/fees', icon: 'Wallet', order: 7 },
  ];
  let i = 201;
  for (const m of modules) {
    await prisma.modules.upsert({
      where: { module_key: m.key },
      update: {},
      create: {
        module_id: MODULE_ID.replace('XXX', i.toString()),
        module_key: m.key,
        module_name: m.name,
        route: m.route,
        icon: m.icon,
        order_no: m.order,
      },
    });
    i++;
  }

  console.log('✅ Modules seeded');
}
