import {
  Users,
  UserCheck,
  CalendarCheck,
  Clock,
  IndianRupee,
  GraduationCap,
  MessageSquare,
  Bus,
  School,
  Lightbulb,
  CheckCircle,
  ShieldCheck,
} from 'lucide-react';

export const onboardingConfig = {
  welcomeTitle: 'Welcome to Your School Dashboard!',
  welcomeDescription:
    'Here\'s a quick tour to help you get started. We\'ll walk you through the key features and help you set up your dashboard in just a few simple steps.',
  ctaButton: 'Let\'s Get Started',
  skipButton: 'Skip tour for now',
  totalSteps: 4,
  initialStep: 0,

  trustIndicators: [
    { text: 'Takes only 2 minutes', dotColor: '#22c55e' },
    { text: 'Easy to follow', dotColor: '#22c55e' },
    { text: 'Can skip anytime', dotColor: '#22c55e' }
  ],

  featureScreen: {
    badgeText: 'Core Features',
    title: 'Everything You Need in One Place',
    description:
      'Our comprehensive platform covers all aspects of school management, making administration easier and more efficient.',

    features: [
      {
        id: 'students',
        title: 'Students',
        description:
          'Manage student profiles, enrollment, and academic records seamlessly.',
        icon: Users,
        iconBgColor: 'bg-blue-100'
      },
      {
        id: 'teachers',
        title: 'Teachers',
        description:
          'Track teacher information, assignments, and performance metrics.',
        icon: UserCheck,
        iconBgColor: 'bg-teal-100'
      },
      {
        id: 'attendance',
        title: 'Attendance',
        description:
          'Monitor daily attendance with automated tracking and reports.',
        icon: CalendarCheck,
        iconBgColor: 'bg-blue-100'
      },
      {
        id: 'timetable',
        title: 'Timetable',
        description:
          'Create and manage class schedules with conflict detection.',
        icon: Clock,
        iconBgColor: 'bg-teal-100'
      },
      {
        id: 'fees',
        title: 'Fees',
        description:
          'Handle fee collection, invoicing, and payment tracking efficiently.',
        icon: IndianRupee,
        iconBgColor: 'bg-blue-100'
      },
      {
        id: 'exams',
        title: 'Exams',
        description:
          'Schedule exams, record marks, and generate report cards.',
        icon: GraduationCap,
        iconBgColor: 'bg-teal-100'
      },
      {
        id: 'communication',
        title: 'Communication',
        description:
          'Send announcements, messages, and notifications to stakeholders.',
        icon: MessageSquare,
        iconBgColor: 'bg-blue-100'
      },
      {
        id: 'transport',
        title: 'Transport',
        description:
          'Manage school buses, routes, and transportation schedules.',
        icon: Bus,
        iconBgColor: 'bg-teal-100'
      }
    ]
  },
  quickSetupScreen: {
    badgeText: 'Quick Setup',
    title: 'Add Your First Data',
    description:
      "Let's populate your dashboard with essential information. You can add more data later, but these are the core building blocks.",

    setupItems: [
      {
        id: 'add-students',
        title: 'Add Students',
        description:
          'Import or add student information to get started',
        icon: Users,
        iconBgColor: 'bg-blue-100',
        actionText: 'Add Students',
        actionColor: 'blue'
      },
      {
        id: 'add-teachers',
        title: 'Add Teachers',
        description:
          'Set up your teaching staff and their profiles',
        icon: UserCheck,
        iconBgColor: 'bg-teal-100',
        actionText: 'Add Teachers',
        actionColor: 'teal'
      },
      {
        id: 'create-classes',
        title: 'Create Classes',
        description:
          'Define grades, sections, and class structures',
        icon: School,
        iconBgColor: 'bg-blue-100',
        actionText: 'Create Classes',
        actionColor: 'blue'
      },
      {
        id: 'create-timetable',
        title: 'Create Timetable',
        description:
          'Set up class schedules and timetables',
        icon: Clock,
        iconBgColor: 'bg-teal-100',
        actionText: 'Create Timetable',
        actionColor: 'teal'
      },
      {
        id: 'add-fee-structure',
        title: 'Add Fee Structure',
        description:
          'Configure fee categories and payment plans',
        icon: IndianRupee,
        iconBgColor: 'bg-blue-100',
        actionText: 'Add Fee Structure',
        actionColor: 'blue'
      },
      
    ],

    emptyCard: {
      title: "Don't have data ready?",
      description:
        'You can add all of this later from the dashboard'
    },

    proTip: {
      icon: Lightbulb,
      title: 'Pro Tip',
      description:
        'You can import data from CSV files to save time. We support bulk imports for students, teachers, and fee structures.'
    },

    nextButtonText: 'Almost Done'
  },
  completionScreen: {
    title: "You're All Set!",
    description:
      "Your dashboard is fully configured and ready to use. Let's start managing your school more efficiently than ever before.",

    stats: [
      {
        id: 'dashboard-ready',
        title: 'Dashboard Ready',
        description: 'Your personalized dashboard is configured',
        icon: CheckCircle,
        bgColor: 'bg-blue-50'
      },
      {
        id: 'features-unlocked',
        title: 'Features Unlocked',
        description: 'All modules are ready to use',
        icon: CheckCircle,
        bgColor: 'bg-teal-50'
      },
      {
        id: 'support-available',
        title: 'Support Available',
        description: 'Our team is here to help anytime',
        icon: ShieldCheck,
        bgColor: 'bg-blue-50'
      }
    ],

    primaryButtonText: 'Go to Dashboard',
    footerText:
      'You can revisit this onboarding anytime from Settings → Help & Onboarding',
    backText: 'Go back'
  }
};
