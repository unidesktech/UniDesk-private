import { featureConfigProps } from "../models/feature-config.model";
import {
  BarChart3,
  BookOpen,
  Brain,
  Bus,
  Calendar,
  CalendarCheck,
  Clock,
  DollarSign,
  FileText,
  GraduationCap,
  MessageSquare,
  School,
  Smartphone,
  Sparkle,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export const featureConfig = (): featureConfigProps => {
  return {
    title: "Powerful Features Built for Modern Schools",
    desc: "Everything you need to manage students, teachers, attendance, fees, communication, and more — all in one place.",
    image:
      "https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    styles: {
      className:
        "relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50 py-20 text-gray-900 text-gray-600 bg-white",
    },
    badges: [
      { label: "All-in-One Platform", color: "bg-blue-600" },
      { label: "Easy to Use", color: "bg-teal-600" },
      { label: "AI-Powered", color: "bg-blue-600" },
    ],

    sections: [
      {
        type: "card",
        cardType: "iconcard",
        title: "Complete School",
        title2: "Management Suite",
        desc: "All the tools you need to run your school efficiently",
        items: [
          {
            Icon: Users,
            title: "Student Information System",
            desc: "Complete student profiles and academic records",
            styles: {
              CardStyle: {
                className:
                  "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
              },
              IconContainerStyle: {
                className: "w-14 h-14 bg-blue-100 group-hover:!bg-blue-100",
              },
              IconStyle: {
                className: "text-blue-600 group-hover:!text-blue-600",
              },
              TitleStyle: {
                className: "!font-normal !mb-0 ",
              },
            },
          },
          {
            Icon: GraduationCap,
            title: "Teacher Management",
            desc: "Teacher profiles, schedules, and performance",
            styles: {
              CardStyle: {
                className:
                  "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
              },
              IconContainerStyle: {
                className: "w-14 h-14 bg-teal-100 group-hover:!bg-teal-100",
              },
              IconStyle: {
                className: "text-teal-600 group-hover:!text-teal-600",
              },
              TitleStyle: {
                className: "!font-normal !mb-0",
              },
            },
          },
          {
            Icon: CalendarCheck,
            title: "Smart Attendance",
            desc: "Automated tracking with real-time updates",
            styles: {
              CardStyle: {
                className:
                  "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
              },
              IconContainerStyle: {
                className: "w-14 h-14 bg-green-100 group-hover:!bg-green-100",
              },
              IconStyle: {
                className: "text-green-600 group-hover:!text-green-600",
              },
              TitleStyle: {
                className: "!font-normal !mb-0",
              },
            },
          },
          {
            Icon: Calendar,
            title: "Timetable Automation",
            desc: "AI-powered scheduling with conflict detection",
            styles: {
              CardStyle: {
                className:
                  "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
              },
              IconContainerStyle: {
                className: "w-14 h-14 bg-purple-100 group-hover:!bg-purple-100",
              },
              IconStyle: {
                className: "text-purple-600 group-hover:!text-purple-600",
              },
              TitleStyle: {
                className: "!font-normal !mb-0",
              },
            },
          },
          {
            Icon: FileText,
            title: "Exams & Gradebook",
            desc: "Mark entry, grade calculation, and reports",
            styles: {
              CardStyle: {
                className:
                  "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
              },
              IconContainerStyle: {
                className: "w-14 h-14 bg-indigo-100 group-hover:!bg-indigo-100",
              },
              IconStyle: {
                className: "text-indigo-600 group-hover:!text-indigo-600",
              },
              TitleStyle: {
                className: "!font-normal !mb-0",
              },
            },
          },
          {
            Icon: DollarSign,
            title: "Fees & Finance",
            desc: "Online payments and financial reporting",
            styles: {
              CardStyle: {
                className:
                  "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
              },
              IconContainerStyle: {
                className: "w-14 h-14 bg-green-100 group-hover:!bg-green-100",
              },
              IconStyle: {
                className: "text-green-600 group-hover:!text-green-600",
              },
              TitleStyle: {
                className: "!font-normal !mb-0",
              },
            },
          },
          {
            Icon: MessageSquare,
            title: "Communication Center",
            desc: "Messages, announcements, and notifications",
            styles: {
              CardStyle: {
                className:
                  "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
              },
              IconContainerStyle: {
                className: "w-14 h-14 bg-blue-100 group-hover:!bg-blue-100",
              },
              IconStyle: {
                className: "text-blue-600 group-hover:!text-blue-600",
              },
              TitleStyle: {
                className: "!font-normal !mb-0",
              },
            },
          },
          {
            Icon: Bus,
            title: "Transport Tracking",
            desc: "Route management and real-time GPS tracking",
            styles: {
              CardStyle: {
                className:
                  "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
              },
              IconContainerStyle: {
                className: "w-14 h-14 bg-orange-100 group-hover:!bg-orange-100",
              },
              IconStyle: {
                className: "text-orange-600 group-hover:!text-orange-600",
              },
              TitleStyle: {
                className: "!font-normal !mb-0",
              },
            },
          },
          {
            Icon: Sparkles,
            title: "AI Automation",
            desc: "Smart insights and automated workflows",
            styles: {
              CardStyle: {
                className:
                  "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
              },
              IconContainerStyle: {
                className: "w-14 h-14 bg-purple-100 group-hover:!bg-purple-100",
              },
              IconStyle: {
                className: "text-purple-600 group-hover:!text-purple-600",
              },
              TitleStyle: {
                className: "!font-normal !mb-0",
              },
            },
          },
          {
            Icon: BookOpen,
            title: "Library Management",
            desc: "Book catalog, issue tracking, and fines",
            styles: {
              CardStyle: {
                className:
                  "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
              },
              IconContainerStyle: {
                className: "w-14 h-14 bg-teal-100 group-hover:!bg-teal-100",
              },
              IconStyle: {
                className: "text-teal-600 group-hover:!text-teal-600",
              },
              TitleStyle: {
                className: "!font-normal !mb-0",
              },
            },
          },
          {
            Icon: BarChart3,
            title: "Analytics & Reports",
            desc: "Data-driven insights and custom reports",
            styles: {
              CardStyle: {
                className:
                  "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
              },
              IconContainerStyle: {
                className: "w-14 h-14 bg-indigo-100 group-hover:!bg-indigo-100",
              },
              IconStyle: {
                className: "text-indigo-600 group-hover:!text-indigo-600",
              },
              TitleStyle: {
                className: "!font-normal !mb-0",
              },
            },
          },
          {
            Icon: Smartphone,
            title: "Mobile App",
            desc: "iOS & Android apps for parents and students",
            styles: {
              CardStyle: {
                className:
                  "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
              },
              IconContainerStyle: {
                className: "w-14 h-14 bg-blue-100 group-hover:!bg-blue-100",
              },
              IconStyle: {
                className: "text-blue-600 group-hover:!text-blue-600",
              },
              TitleStyle: {
                className: "!font-normal !mb-0",
              },
            },
          },
        ],
        styles: {
          className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6",
          containerStyles: {
            className: "py-20 bg-white",
          },
        },
      },
      {
        type: "imgModule",
        items: [
          {
            title: "Student Management",
            desc: "Complete student information system with comprehensive profiles, academic records, and parent information all in one place.",
            Icon: Users,
            image:
              "https://images.unsplash.com/photo-1654366698665-e6d611a9aaa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwY2xhc3Nyb29tJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzYzNDA4MDcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
            reversed: false,
            points: [
              "Complete student profiles with photos and documents",
              "Academic records and attendance tracking",
              "Parent/guardian information and emergency contacts",
              "Enrollment and promotion management",
              "Student document repository",
            ],
            styles: {
              IconContainerStyle: {
                className:
                  "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
              },
            },
          },
          {
            title: "Teacher Management",
            desc: "Efficiently manage your teaching staff with comprehensive profiles, schedule management, and performance tracking.",
            Icon: GraduationCap,
            image:
              "https://images.unsplash.com/photo-1758685734511-4f49ce9a382b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwY2xhc3Nyb29tJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MzMxNzg2OHww&ixlib=rb-4.1.0&q=80&w=1080",
            reversed: true,
            points: [
              "Teacher profiles with qualifications and experience",
              "Class and subject assignments",
              "Automated schedule generation",
              "Attendance and leave management",
              "Performance tracking and evaluations",
            ],
            styles: {
              IconContainerStyle: {
                className:
                  "bg-gradient-to-br from-teal-500 to-teal-600 text-white",
              },
            },
          },
          {
            title: "Smart Attendance",
            desc: "Automated attendance tracking with multiple input methods and real-time parent notifications.",
            Icon: CalendarCheck,
            image:
              "https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwY2hhcnR8ZW58MXx8fHwxNzYzMzkxMTU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
            reversed: false,
            points: [
              "Daily attendance with multiple marking options",
              "Biometric and RFID device integration",
              "Real-time attendance reports and analytics",
              "Automatic notifications to parents",
              "Leave management and approval workflow",
            ],
            styles: {
              IconContainerStyle: {
                className:
                  "bg-gradient-to-br from-green-500 to-green-600 text-white",
              },
            },
          },
          {
            title: "Timetable Automation",
            desc: "AI-powered timetable generation with drag-and-drop interface and automatic conflict detection.",
            Icon: Calendar,
            image:
              "https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBpbnRlcmZhY2UlMjBtb2Rlcm58ZW58MXx8fHwxNzYzMzcyNzQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
            reversed: true,
            points: [
              "Automated timetable generation with AI",
              "Drag-and-drop schedule builder",
              "Conflict detection and resolution",
              "Teacher availability management",
              "Room and resource allocation",
            ],
            styles: {
              IconContainerStyle: {
                className:
                  "bg-gradient-to-br from-purple-500 to-purple-600 text-white",
              },
            },
          },
          {
            title: "Exams & Gradebook",
            desc: "Comprehensive examination management from mark entry to report card generation with detailed analytics.",
            Icon: FileText,
            image:
              "https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwY2hhcnR8ZW58MXx8fHwxNzYzMzkxMTU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
            reversed: false,
            points: [
              "Easy marks entry and grade calculation",
              "Multiple grading systems support",
              "Automated report card generation",
              "Student performance analytics",
              "Exam schedule management",
            ],
            styles: {
              IconContainerStyle: {
                className:
                  "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white",
              },
            },
          },
          {
            title: "Fees & Finance",
            desc: "Complete fee management system with online payments, automated reminders, and detailed financial reporting.",
            Icon: DollarSign,
            image:
              "https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBpbnRlcmZhY2UlMjBtb2Rlcm58ZW58MXx8fHwxNzYzMzcyNzQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
            reversed: true,
            points: [
              "Fee structure setup and management",
              "Online payment integration (multiple gateways)",
              "Automated payment reminders",
              "Financial reports and analytics",
              "Receipt generation and management",
            ],
            styles: {
              IconContainerStyle: {
                className:
                  "bg-gradient-to-br from-green-500 to-green-600 text-white",
              },
            },
          },
          {
            title: "Communication Center",
            desc: "Centralized communication hub for announcements, messaging, and notifications to keep everyone connected.",
            Icon: MessageSquare,
            image:
              "https://images.unsplash.com/photo-1654366698665-e6d611a9aaa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwY2xhc3Nyb29tJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzYzNDA4MDcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
            reversed: false,
            points: [
              "School-wide announcements and notices",
              "Direct messaging between teachers and parents",
              "SMS and email notifications",
              "Push notifications via mobile app",
              "Communication history and archives",
            ],
            styles: {
              IconContainerStyle: {
                className:
                  "bg-gradient-to-br from-blue-500 to-teal-500 text-white",
              },
            },
          },
          {
            title: "Transport Management",
            desc: "Manage school transportation with route planning, driver management, and real-time GPS tracking.",
            Icon: Bus,
            image:
              "https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBpbnRlcmZhY2UlMjBtb2Rlcm58ZW58MXx8fHwxNzYzMzcyNzQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
            reversed: true,
            points: [
              "Bus route planning and management",
              "Driver and vehicle information",
              "Real-time GPS tracking integration",
              "Pickup and drop-off schedules",
              "Parent notifications for bus status",
            ],
            styles: {
              IconContainerStyle: {
                className:
                  "bg-gradient-to-br from-orange-500 to-orange-600 text-white",
              },
            },
          },
          {
            title: "Parent & Student Portal",
            desc: "Dedicated portals for parents and students to access all information and stay connected with the school.",
            Icon: Smartphone,
            image:
              "https://images.unsplash.com/photo-1654366698665-e6d611a9aaa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwY2xhc3Nyb29tJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzYzNDA4MDcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
            reversed: false,
            points: [
              "View homework and assignments",
              "Check attendance and leave status",
              "Access fee details and payment history",
              "Read announcements and notices",
              "Track academic performance and grades",
            ],
            styles: {
              IconContainerStyle: {
                className:
                  "bg-gradient-to-br from-blue-600 to-teal-500 text-white",
              },
            },
          },
        ],
        styles: {
          containerStyles: {
            className: "py-24 bg-gradient-to-b from-white to-gray-50",
          },
        },
      },
      {
        type: "card",
        cardType: "iconcard",
        badges: [{ label: "Premium Feature", color: "bg-purple-200" }],
        title: "AI-Powered",
        title2: "Automation",
        desc: "Harness the power of artificial intelligence to automate routine tasks and gain intelligent insights.",
        items: [
          {
            Icon: Brain,
            title: "Smart Timetable Generator",
            desc: "AI creates optimized schedules considering teacher availability, room capacity, and subject requirements.",
            styles: {
              CardStyle: {
                className:
                  "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
              },
              IconContainerStyle: {
                className: "w-14 h-14 !bg-[#9333EA] group-hover:!bg-[#9333EA]",
              },
              IconStyle: {
                className: "w-7 h-7 text-white group-hover:!text-white",
              },
              TitleStyle: {
                className:
                  "!font-normal md:text-2xl text-lg text-gray-900 mb-3",
              },
              DescStyle: {
                className: "text-gray-600 leading-relaxed md:text-base text-sm",
              },
            },
          },
          {
            Icon: TrendingUp,
            title: "Fee Prediction & Analytics",
            desc: "Predictive analytics for fee patterns and automated reminders to improve cash flow.",
            styles: {
              CardStyle: {
                className:
                  "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
              },
              IconContainerStyle: {
                className: "w-14 h-14 !bg-[#2563EB] group-hover:!bg-[#2563EB]",
              },
              IconStyle: {
                className: "w-7 h-7 text-white group-hover:!text-white",
              },
              TitleStyle: {
                className:
                  "!font-normal md:text-2xl text-lg text-gray-900 mb-3",
              },
              DescStyle: {
                className: "text-gray-600 leading-relaxed md:text-base text-sm",
              },
            },
          },
          {
            Icon: Sparkle,
            title: "Automatic Attendance Insights",
            desc: "AI detects attendance issues and flags at-risk students automatically.",
            styles: {
              CardStyle: {
                className:
                  "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
              },
              IconContainerStyle: {
                className: "w-14 h-14 !bg-[#059669] group-hover:!bg-[#059669]",
              },
              IconStyle: {
                className: "w-7 h-7 text-white group-hover:!text-white",
              },
              TitleStyle: {
                className:
                  "!font-normal md:text-2xl text-lg text-gray-900 mb-3",
              },
              DescStyle: {
                className: "text-gray-600 leading-relaxed md:text-base text-sm",
              },
            },
          },
          {
            Icon: Zap,
            title: "Intelligent Notifications",
            desc: "Smart notifications send contextual alerts to the right people at the right time.",
            styles: {
              CardStyle: {
                className:
                  "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
              },
              IconContainerStyle: {
                className: "w-14 h-14 !bg-[#6366F1] group-hover:!bg-[#6366F1]",
              },
              IconStyle: {
                className: "w-7 h-7 text-white group-hover:!text-white",
              },
              TitleStyle: {
                className:
                  "!font-normal md:text-2xl text-lg text-gray-900 mb-3",
              },
              DescStyle: {
                className: "text-gray-600 leading-relaxed md:text-base text-sm",
              },
            },
          },
        ],
        styles: {
          className: "md:!grid-cols-2",
          containerStyles: {
            className:
              "py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 relative overflow-hidden",
          },
        },
      },
      {
        type: "card",
        cardType: "teamcard",
        title: "Trusted by",
        title2: "Schools Worldwide",
        desc: "Join thousands of educators using our platform to streamline operations",
        styles: {
          className: "lg:!grid-cols-4",
          containerStyles: {
            className: "py-20 bg-white",
          },
        },
        items: [
          {
            AvatarIcon: School,
            name: "50+",
            bio: "Schools Using",
            styles: {
              avatarStyles: {
                className:
                  "bg-linear-to-br from-blue-500 to-blue-600 !w-16 !h-16",
              },
              cardContentStyles: {
                className: "flex flex-col items-center text-center gap-2 mb-1",
              },
              avatarIconStyles: {
                className: "!w-8 !h-8",
              },
              titleStyles: {
                className:
                  "text-2xl md:text-4xl font-semibold text-gray-900 -mt-3",
              },
              bioStyles: {
                className: "text-gray-600 text-center -mt-4",
              },
              card: {
                className:
                  "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
              },
            },
          },
          {
            AvatarIcon: Users,
            name: "10,000+",
            bio: "Students",
            styles: {
              avatarStyles: {
                className:
                  "bg-linear-to-br from-teal-500 to-teal-600 !w-16 !h-16",
              },
              cardContentStyles: {
                className: "flex flex-col items-center text-center gap-2 mb-1",
              },
              avatarIconStyles: {
                className: "!w-8 !h-8",
              },
              titleStyles: {
                className:
                  "text-2xl md:text-4xl font-semibold text-gray-900 -mt-3",
              },
              bioStyles: {
                className: "text-gray-600 text-center -mt-4",
              },
              card: {
                className:
                  "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
              },
            },
          },
          {
            AvatarIcon: Sparkle,
            name: "30+",
            bio: "Features",
            styles: {
              avatarStyles: {
                className:
                  "bg-linear-to-br from-purple-500 to-purple-600 !w-16 !h-16",
              },
              cardContentStyles: {
                className: "flex flex-col items-center text-center gap-2 mb-1",
              },
              avatarIconStyles: {
                className: "!w-8 !h-8",
              },
              titleStyles: {
                className:
                  "text-2xl md:text-4xl font-semibold text-gray-900 -mt-3",
              },
              bioStyles: {
                className: "text-gray-600 text-center -mt-4",
              },
              card: {
                className:
                  "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
              },
            },
          },
          {
            AvatarIcon: Clock,
            name: "99.9%",
            bio: "Uptime",
            styles: {
              avatarStyles: {
                className:
                  "bg-linear-to-br from-green-500 to-green-600 !w-16 !h-16",
              },
              cardContentStyles: {
                className: "flex flex-col items-center text-center gap-2 mb-1",
              },
              avatarIconStyles: {
                className: "!w-8 !h-8",
              },
              titleStyles: {
                className:
                  "text-2xl md:text-4xl font-semibold text-gray-900 -mt-3",
              },
              bioStyles: {
                className: "text-gray-600 text-center -mt-4",
              },
              card: {
                className:
                  "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
              },
            },
          },
        ],
      },
      {
        type: "comparison-table",
        title: "Why",
        title2: "We're Different",
        desc: "See how we stack up against traditional school management systems",
        styles: {
          containerStyles: {
            className: "py-20 bg-gradient-to-br from-gray-50 to-blue-50/30",
          },
        },
        headers: {
          feature: "Feature",
          ours: "School Sphere",
          traditional: "Traditional Systems",
        },
        columns: [
          {
            key: "ours",
            label: "SchoolSphere",
            highlight: true,
            color: "bg-primary text-slate-600 py-1 text-center",
          },
          {
            key: "traditional",
            label: "Traditional Systems",
          },
        ],
        rows: [
          {
            feature: "Simple & Intuitive Interface",
            desc: "No training required - anyone can use it",
            values: { ours: "check", traditional: "cross" },
          },
          {
            feature: "Fully Integrated System",
            desc: "All modules work seamlessly together",
            values: { ours: "check", traditional: "cross" },
          },
          {
            feature: "Enterprise-Grade Security",
            desc: "Bank-level encryption and data protection",
            values: { ours: "check", traditional: "cross" },
          },
          {
            feature: "Modern, Beautiful UI",
            desc: "Clean, professional design users love",
            values: { ours: "check", traditional: "cross" },
          },
          {
            feature: "AI-Powered Automation",
            desc: "Smart features that save hours of work",
            values: { ours: "check", traditional: "cross" },
          },
          {
            feature: "24/7 Customer Support",
            desc: "Always here when you need us",
            values: { ours: "check", traditional: "cross" },
          },
          {
            feature: "Mobile Apps Included",
            desc: "Native apps for parents, teachers and admins",
            values: { ours: "check", traditional: "cross" },
          },
        ],
      },
      {
        type: "accordian",
        title: "Frequently Asked",
        title2: "Questions",
        desc: "Everything you need to know about our platform",
        items: [
          {
            question: "How quickly can we get started?",
            answer:
              "You can get started immediately after signing up. Our onboarding process is simple and takes about 15-20 minutes. We'll help you import your existing data and train your staff within the first week.",
          },
          {
            question: "Is my school data secure?",
            answer:
              "Absolutely. We use bank-level encryption (256-bit SSL) to protect all data. Our servers are hosted on secure, redundant infrastructure with daily backups. We're also GDPR and COPPA compliant.",
          },
          {
            question: "Can I import data from my current system?",
            answer:
              "Yes! We support data import from Excel, CSV, and most popular school management systems. Our team will assist you with the migration process to ensure a smooth transition.",
          },
          {
            question: "Do you offer training for our staff?",
            answer:
              "Yes, we provide comprehensive training sessions for administrators, teachers, and staff. This includes video tutorials, documentation, and live training sessions. Training is included in all plans.",
          },
          {
            question: "What kind of support do you provide?",
            answer:
              "We offer email support for all plans, with priority support for Professional plans and 24/7 phone support for Enterprise. Our average response time is under 2 hours during business hours.",
          },
          {
            question: "Can parents access the system?",
            answer:
              "Yes! We provide a dedicated parent mobile app (iOS and Android) where parents can view their child's attendance, grades, assignments, fee status, and communicate with teachers.",
          },
          {
            question: "Is there a contract or can I cancel anytime?",
            answer:
              "We offer both monthly and annual plans. Monthly plans can be cancelled anytime with no penalties. Annual plans offer a 20% discount and can be cancelled at the end of the term.",
          },
          {
            question: "Do you offer custom features or integrations?",
            answer:
              "Yes! Enterprise plans include custom feature development and integrations with third-party systems like biometric devices, payment gateways, and educational platforms. Contact our sales team to discuss your specific needs.",
          },
        ],
        styles: {
          containerStyles: {
            className: "py-20 bg-white",
          },
        },
      },
    ],
  };
};
