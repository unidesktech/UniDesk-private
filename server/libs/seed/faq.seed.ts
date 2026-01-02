import { prisma } from './prisma.client';

export async function seedFaqData() {
  console.log('🌱 Seeding FAQ Categories, Topics & Articles...');

  await prisma.$transaction(async (tx) => {
    await Promise.all([
      tx.faq_categories.upsert({
        where: { faq_id: 'faq-cat-1' },
        update: {},
        create: {
          faq_id: 'faq-cat-1',
          name: 'Getting Started',
          desc: 'Basic information to help you get started with UniDesk',
          icon: 'Rocket',
          color: '#6366F1',
        },
      }),
      tx.faq_categories.upsert({
        where: { faq_id: 'faq-cat-2' },
        update: {},
        create: {
          faq_id: 'faq-cat-2',
          name: 'Account & Roles',
          desc: 'User accounts, permissions, and access management',
          icon: 'Users',
          color: '#22C55E',
        },
      }),
      tx.faq_categories.upsert({
        where: { faq_id: 'faq-cat-3' },
        update: {},
        create: {
          faq_id: 'faq-cat-3',
          name: 'Academics',
          desc: 'Classes, subjects, timetable, and exams',
          icon: 'BookOpen',
          color: '#F59E0B',
        },
      }),
      tx.faq_categories.upsert({
        where: { faq_id: 'faq-cat-4' },
        update: {},
        create: {
          faq_id: 'faq-cat-4',
          name: 'Fees & Payments',
          desc: 'Fee setup, invoices, and payment tracking',
          icon: 'CreditCard',
          color: '#EF4444',
        },
      }),
      tx.faq_categories.upsert({
        where: { faq_id: 'faq-cat-5' },
        update: {},
        create: {
          faq_id: 'faq-cat-5',
          name: 'Technical & Support',
          desc: 'Technical issues and support related questions',
          icon: 'Settings',
          color: '#0EA5E9',
        },
      }),
    ]);

    await Promise.all([
      tx.faq_topics.upsert({
        where: { topic_id: 'faq-topic-1' },
        update: {},
        create: {
          topic_id: 'faq-topic-1',
          name: 'Onboarding',
          icon: 'ClipboardCheck',
        },
      }),
      tx.faq_topics.upsert({
        where: { topic_id: 'faq-topic-2' },
        update: {},
        create: {
          topic_id: 'faq-topic-2',
          name: 'User Management',
          icon: 'UserCog',
        },
      }),
      tx.faq_topics.upsert({
        where: { topic_id: 'faq-topic-3' },
        update: {},
        create: {
          topic_id: 'faq-topic-3',
          name: 'Timetable & Exams',
          icon: 'Calendar',
        },
      }),
      tx.faq_topics.upsert({
        where: { topic_id: 'faq-topic-4' },
        update: {},
        create: {
          topic_id: 'faq-topic-4',
          name: 'Billing',
          icon: 'Wallet',
        },
      }),
      tx.faq_topics.upsert({
        where: { topic_id: 'faq-topic-5' },
        update: {},
        create: {
          topic_id: 'faq-topic-5',
          name: 'System Issues',
          icon: 'AlertTriangle',
        },
      }),
    ]);

    const articles = [
      {
        article_id: 'faq-art-1',
        question: 'What is UniDesk?',
        answer:
          'UniDesk is an all-in-one school management system designed to simplify academic and administrative workflows.',
        points: [
          'Centralized school management',
          'Role-based access',
          'Academic and administrative modules',
        ],
        category_id: 'faq-cat-1',
        topic_id: 'faq-topic-1',
      },
      {
        article_id: 'faq-art-2',
        question: 'How do I onboard my school?',
        answer:
          'Schools can onboard by submitting basic school details and verifying the admin email.',
        points: [
          'Enter school information',
          'Verify admin email',
          'Complete initial setup',
        ],
        category_id: 'faq-cat-1',
        topic_id: 'faq-topic-1',
      },
      {
        article_id: 'faq-art-3',
        question: 'What roles are available in UniDesk?',
        answer:
          'UniDesk supports roles such as Super Admin, Admin, Teacher, Student, and Parent.',
        points: [
          'Custom role permissions',
          'Multiple users per role',
          'Secure access control',
        ],
        category_id: 'faq-cat-2',
        topic_id: 'faq-topic-2',
      },
      {
        article_id: 'faq-art-4',
        question: 'Can I create custom roles?',
        answer:
          'Yes, admins can create and manage custom roles with granular permissions.',
        points: [
          'Permission-based roles',
          'Editable access levels',
          'Role assignment to users',
        ],
        category_id: 'faq-cat-2',
        topic_id: 'faq-topic-2',
      },
      {
        article_id: 'faq-art-5',
        question: 'How is the timetable managed?',
        answer:
          'Timetables can be created using templates and assigned to classes and sections.',
        points: [
          'Period templates',
          'Class-wise timetable',
          'Teacher allocation',
        ],
        category_id: 'faq-cat-3',
        topic_id: 'faq-topic-3',
      },
      {
        article_id: 'faq-art-6',
        question: 'Does UniDesk support exams and grading?',
        answer:
          'Yes, you can configure exams, grading systems, and result publishing.',
        points: ['Exam schedules', 'Grade configuration', 'Report cards'],
        category_id: 'faq-cat-3',
        topic_id: 'faq-topic-3',
      },
      {
        article_id: 'faq-art-7',
        question: 'How are fees configured?',
        answer:
          'Fees can be configured class-wise with flexible payment schedules.',
        points: ['Installments', 'Due dates', 'Late fee rules'],
        category_id: 'faq-cat-4',
        topic_id: 'faq-topic-4',
      },
      {
        article_id: 'faq-art-8',
        question: 'Which payment methods are supported?',
        answer:
          'UniDesk supports UPI, cards, net banking, and offline payment tracking.',
        points: [
          'Online payments',
          'Offline reconciliation',
          'Payment history',
        ],
        category_id: 'faq-cat-4',
        topic_id: 'faq-topic-4',
      },
      {
        article_id: 'faq-art-9',
        question: 'What should I do if the app is slow?',
        answer:
          'Check your internet connection and try refreshing. If the issue persists, contact support.',
        points: [
          'Stable internet required',
          'Clear browser cache',
          'Report issue to support',
        ],
        category_id: 'faq-cat-5',
        topic_id: 'faq-topic-5',
      },
      {
        article_id: 'faq-art-10',
        question: 'Is my data secure?',
        answer: 'Yes, UniDesk follows industry-standard security practices.',
        points: ['Encrypted data', 'Role-based access', 'Regular backups'],
        category_id: 'faq-cat-5',
        topic_id: 'faq-topic-5',
      },
      {
        article_id: 'faq-art-11',
        question: 'Can parents access student information?',
        answer:
          'Parents can view attendance, results, fees, and announcements.',
        points: ['Read-only access', 'Student-specific data', 'Secure login'],
        category_id: 'faq-cat-2',
        topic_id: 'faq-topic-2',
      },
      {
        article_id: 'faq-art-12',
        question: 'How are announcements shared?',
        answer:
          'Announcements can be shared via dashboard, email, and app notifications.',
        points: [
          'Instant delivery',
          'Role-based visibility',
          'Scheduled announcements',
        ],
        category_id: 'faq-cat-1',
        topic_id: 'faq-topic-1',
      },
      {
        article_id: 'faq-art-13',
        question: 'Can I export reports?',
        answer: 'Yes, reports can be exported in PDF and Excel formats.',
        points: ['Academic reports', 'Finance reports', 'Custom filters'],
        category_id: 'faq-cat-3',
        topic_id: 'faq-topic-3',
      },
      {
        article_id: 'faq-art-14',
        question: 'How do I contact UniDesk support?',
        answer: 'Support is available via ticket system, email, and WhatsApp.',
        points: ['Dedicated support team', 'Quick response', 'Issue tracking'],
        category_id: 'faq-cat-5',
        topic_id: 'faq-topic-5',
      },
      {
        article_id: 'faq-art-15',
        question: 'Can UniDesk scale for large schools?',
        answer: 'Yes, UniDesk is built to scale for schools of all sizes.',
        points: [
          'Optimized performance',
          'Modular architecture',
          'Cloud-ready',
        ],
        category_id: 'faq-cat-1',
        topic_id: 'faq-topic-1',
      },
    ];

    for (const article of articles) {
      await tx.articles.upsert({
        where: { article_id: article.article_id },
        update: {},
        create: article,
      });
    }
  });

  console.log('✅ FAQ data seeded successfully.');
}
