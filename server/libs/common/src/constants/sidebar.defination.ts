export interface SidebarDefinitionItem {
  key: string;
  label: string;
  icon?: string;
  path?: string;

  permissions?: string[];

  children?: SidebarDefinitionItem[];
}

export const SIDEBAR_DEFINITION: SidebarDefinitionItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/dashboard',
    permissions: ['dashboard.view', 'dashboard.edit', 'dashboard.delete'],
  },

  {
    key: 'management',
    label: 'Management',
    icon: 'Settings',
    children: [
      {
        key: 'students',
        label: 'Students',
        icon: 'Users',
        path: '/management/students',
        permissions: [
          'management.students.view',
          'management.students.edit',
          'management.students.delete',
        ],
      },
      {
        key: 'teachers',
        label: 'Teachers',
        icon: 'Users',
        path: '/management/teachers',
        permissions: [
          'management.teachers.view',
          'management.teachers.edit',
          'management.teachers.delete',
        ],
      },
      {
        key: 'subjects',
        label: 'Subjects',
        icon: 'BookOpen',
        path: '/management/subjects',
        permissions: [
          'management.subjects.view',
          'management.subjects.edit',
          'management.subjects.delete',
        ],
      },
      {
        key: 'classes',
        label: 'Classes',
        icon: 'Layers',
        path: '/management/classes',
        permissions: [
          'management.classes.view',
          'management.classes.edit',
          'management.classes.delete',
        ],
      },
    ],
  },
];
