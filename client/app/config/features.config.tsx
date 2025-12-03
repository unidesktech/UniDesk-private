import { featureConfigType } from "../models/feature-config.model";
import {
  Bell,
  Brain,
  Bus,
  Calendar,
  ClipboardCheck,
  Clock,
  DollarSign,
  FileText,
  School,
  Smartphone,
  Sparkle,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";

export const featureConfig = (): featureConfigType => {
  return {
    title: "Powerful Features Built for Modern Schools",
    description:
      "Everything you need to manage students, teachers, attendance, fees, communication, and more — all in one place.",
    image:
      "https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    styles: {
      inlineStyles: "",
      classNames:
        "relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50 py-20 text-gray-900 text-gray-600 bg-white",
    },
    badges: [
      { label: "All-in-One Platform", color: "bg-blue-600" },
      { label: "Easy to Use", color: "bg-teal-600" },
      { label: "AI-Powered", color: "bg-blue-600" },
    ],

    sections: [
      {
        type: "iconcard",
        title: "Everything you need to run",
        title2: "modern school",
        description: "Powerful features designed to streamline every aspect of school administration",
        items: [
          {
            icon: Users,
            title: "Student Management",
            description: "Complete student records, enrollment, and profile management in one place",
            styles: {
                classNames: "bg-red-600 text-red-600 color-red hover:bg-red-100"
            },
          },
          {
            icon: UserCheck,
            title: "Teacher Management",
            description: "Manage teacher profiles, assignments, and workload distribution efficiently",
          },
          {
            icon: ClipboardCheck,
            title: "Smart Attendance",
            description: "Automated attendance tracking with biometric integration and real-time updates",
          },
          {
            icon: FileText,
            title: "Exam & Marks Entry",
            description: "Streamlined exam scheduling, marks entry, and report card generation",
          },
          {
            icon: Calendar,
            title: "Timetable Automation",
            description: "Auto-generate conflict-free timetables for classes, teachers, and rooms",
          },
          {
            icon: DollarSign,
            title: "Fees Management",
            description: "Online fee collection, automated reminders, and comprehensive reports",
          },
          {
            icon: Smartphone,
            title: "Parent App",
            description: "Keep parents connected with real-time updates and communication tools",
          },
          {
            icon: Bus,
            title: "Transport Tracking",
            description: "GPS-enabled bus tracking and route management for student safety",
          },
          {
            icon: Bell,
            title: "Real-time Notifications",
            description: "Instant alerts and announcements to students, teachers, and parents",
          },
          {
            icon: Bell,
            title: "Real-time Notifications",
            description: "Instant alerts and announcements to students, teachers, and parents",
          },
          {
            icon: Bell,
            title: "Real-time Notifications",
            description: "Instant alerts and announcements to students, teachers, and parents",
          },
          {
            icon: Bell,
            title: "Real-time Notifications",
            description: "Instant alerts and announcements to students, teachers, and parents",
          },
        ],
        styles: {
          classNames: "grid md:grid-cols-2 lg:grid-cols-4 gap-6",
        //   containerStyles: {
        //     inlineStyles: "",
        //     classNames: "py-24 bg-gradient-to-b from-white to-gray-50   ",
        //   },
        },
      },
      {
        type: "imgModule",
        items: [
          {
            title: "Student Management",
            subtitle: "Complete Management System",
            image:
              "https://images.unsplash.com/photo-1758270704534-fd9715bffc0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGNsYXNzcm9vbSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYzMjA1MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
            points: [
              "Complete student profiles with photos and documents",
              "Academic records and attendance tracking",
              "Parent/guardian information and emergency contacts",
              "Enrollment and promotion management",
              "Student document repository",
            ],
            reversed: false,
          },
          {
            title: "Teacher Management",
            subtitle: "Smart Scheduling & Tracking",
            image:
              "https://images.unsplash.com/photo-1610888662651-05dbdec7cfae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjB0aW1ldGFibGUlMjBzY2hlZHVsZXxlbnwxfHx8fDE3NjMyODc0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
            points: [
              "Teacher profiles with qualifications and experience",
              "Class and subject assignments",
              "Automated schedule generation",
              "Attendance and leave management",
              "Performance tracking and evaluations",
            ],
            reversed: true,
          },
          {
            title: "Smart Attendance",
            subtitle: "Seamless Payment Management",
            image:
              "https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            points: [
              "Daily attendance with multiple marking options",
              "Biometric and RFID device integration",
              "Real-time attendance reports and analytics",
              "Automatic notifications to parents",
              "Leave management and approval workflow",
            ],
            reversed: false,
          },
          {
            title: "Smart Attendance",
            subtitle: "Seamless Payment Management",
            image:
              "https://images.unsplash.com/photo-1607609972034-e8c1c6eb3e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXltZW50JTIwZmluYW5jZSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjMyODc0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
            points: [
              "Daily attendance with multiple marking options",
              "Biometric and RFID device integration",
              "Real-time attendance reports and analytics",
              "Automatic notifications to parents",
              "Leave management and approval workflow",
            ],
            reversed: true,
          },
          {
            title: "Smart Attendance",
            subtitle: "Seamless Payment Management",
            image:
              "https://images.unsplash.com/photo-1607609972034-e8c1c6eb3e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXltZW50JTIwZmluYW5jZSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjMyODc0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
            points: [
              "Daily attendance with multiple marking options",
              "Biometric and RFID device integration",
              "Real-time attendance reports and analytics",
              "Automatic notifications to parents",
              "Leave management and approval workflow",
            ],
            reversed: false,
          },
          {
            title: "Smart Attendance",
            subtitle: "Seamless Payment Management",
            image:
              "https://images.unsplash.com/photo-1607609972034-e8c1c6eb3e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXltZW50JTIwZmluYW5jZSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjMyODc0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
            points: [
              "Daily attendance with multiple marking options",
              "Biometric and RFID device integration",
              "Real-time attendance reports and analytics",
              "Automatic notifications to parents",
              "Leave management and approval workflow",
            ],
            reversed: true,
          },
          {
            title: "Smart Attendance",
            subtitle: "Seamless Payment Management",
            image:
              "https://images.unsplash.com/photo-1607609972034-e8c1c6eb3e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXltZW50JTIwZmluYW5jZSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjMyODc0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
            points: [
              "Daily attendance with multiple marking options",
              "Biometric and RFID device integration",
              "Real-time attendance reports and analytics",
              "Automatic notifications to parents",
              "Leave management and approval workflow",
            ],
            reversed: false,
          },
          {
            title: "Smart Attendance",
            subtitle: "Seamless Payment Management",
            image:
              "https://images.unsplash.com/photo-1607609972034-e8c1c6eb3e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXltZW50JTIwZmluYW5jZSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjMyODc0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
            points: [
              "Daily attendance with multiple marking options",
              "Biometric and RFID device integration",
              "Real-time attendance reports and analytics",
              "Automatic notifications to parents",
              "Leave management and approval workflow",
            ],
            reversed: true,
          },
          {
            title: "Smart Attendance",
            subtitle: "Seamless Payment Management",
            image:
              "https://images.unsplash.com/photo-1607609972034-e8c1c6eb3e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXltZW50JTIwZmluYW5jZSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjMyODc0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
            points: [
              "Daily attendance with multiple marking options",
              "Biometric and RFID device integration",
              "Real-time attendance reports and analytics",
              "Automatic notifications to parents",
              "Leave management and approval workflow",
            ],
            reversed: false,
          },
        ],
        styles: {
          containerStyles: {
            inlineStyles: "",
            classNames: "py-24 bg-gradient-to-b from-white to-gray-50",
          },
        },
      },
      {
        type: "premium-feature",
        badges: [{ label: "Premium Feature", color: "bg-purple-200" }],
        title: "AI-Powered Automation",
        description:
          "Harness the power of artificial intelligence to automate routine tasks and gain intelligent insights.",

        styles: {
          classNames: "bg-gradient-to-b from-[#f6f7ff] to-[#e8f3ff]",
          inlineStyles: "",
          itemStyles: { classNames: "", inlineStyles: "" },
        },

        items: [
          {
            icon: Brain,
            title: "Smart Timetable Generator",
            description:
              "AI creates optimized schedules considering teacher availability, room capacity, and subject requirements.",
            bgColor: "#9333EA",
          },
          {
            icon: TrendingUp,
            title: "Fee Prediction & Analytics",
            description:
              "Predictive analytics for fee patterns and automated reminders to improve cash flow.",
            bgColor: "#2563EB",
          },
          {
            icon: Sparkle,
            title: "Automatic Attendance Insights",
            description:
              "AI detects attendance issues and flags at-risk students automatically.",
            bgColor: "#059669",
          },
          {
            icon: Zap,
            title: "Intelligent Notifications",
            description:
              "Smart notifications send contextual alerts to the right people at the right time.",
            bgColor: "#6366F1",
          },
        ],
      },
      {
        type: "stats",
        title: "Trusted by Schools Worldwide",
        description:
          "Join thousands of educators using our platform to streamline operations",

        styles: {
          inlineStyles: "",
          classNames: "py-24 bg-white",
        },

        items: [
          {
            icon: School,
            value: "50+",
            label: "Schools Using",
            color: "bg-blue-600",
          },
          {
            icon: Users,
            value: "10,000+",
            label: "Students",
            color: "bg-teal-600",
          },
          {
            icon: Sparkle,
            value: "30+",
            label: "Features",
            color: "bg-purple-600",
          },
          {
            icon: Clock,
            value: "99.9%",
            label: "Uptime",
            color: "bg-green-600",
          },
        ],
      },
      {
        type: "comparison-table",
        title: "Why We're Different",
        description:
          "See how we stack up against traditional school management systems",
        styles: {
          inlineStyles: "",
          classNames: "bg-gradient-to-b from-white to-sky-50",
          itemStyles: {
            inlineStyles: "",
            classNames: "",
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
            description: "No training required - anyone can use it",
            values: { ours: "check", traditional: "cross" },
          },
          {
            feature: "Fully Integrated System",
            description: "All modules work seamlessly together",
            values: { ours: "check", traditional: "cross" },
          },
          {
            feature: "Enterprise-Grade Security",
            description: "Bank-level encryption and data protection",
            values: { ours: "check", traditional: "cross" },
          },
          {
            feature: "Modern, Beautiful UI",
            description: "Clean, professional design users love",
            values: { ours: "check", traditional: "cross" },
          },
          {
            feature: "AI-Powered Automation",
            description: "Smart features that save hours of work",
            values: { ours: "check", traditional: "cross" },
          },
          {
            feature: "24/7 Customer Support",
            description: "Always here when you need us",
            values: { ours: "check", traditional: "cross" },
          },
          {
            feature: "Mobile Apps Included",
            description: "Native apps for parents, teachers and admins",
            values: { ours: "check", traditional: "cross" },
          },
        ],
        items: [],
      },
      {
        type: "accordian",
        title: "Frequently Asked Questions",
        description: "Everything you need to know about our platform",
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
        //   containerStyles: {
        //     inlineStyles: "",
        //     classNames: "py-24 bg-gradient-to-b from-white to-gray-50",
        //   },
        },
      },

      {
        type: "cta-section",
        title: "Experience the Future of School Management",
        subtitle:
          "Join 50+ schools already using SchoolSphere to transform their operations. Start your free trial today and see the difference.",
        primaryButton: {
          label: "Get Started Free",
          link: "",
        },
        secondaryButton: {
          label: "Request a Demo",
          link: "",
        },
        highlights: [
          { label: "14-day free trial" },
          { label: "No credit card required" },
          { label: "Full feature access" },
        ],
        styles: {
          className: "bg-primary text-white p-12 pb-16 text-center",
          inlineStyle: "",
        },
      },
    ],
  };
};
