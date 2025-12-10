import {
  ArrowRight,
  Award,
  Bell,
  BookOpen,
  Building2,
  Bus,
  Calendar,
  CheckCircle,
  ClipboardCheck,
  DollarSign,
  FileText,
  GraduationCap,
  Library,
  School,
  Smartphone,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { homeConfigProps } from "../models/home-config.model";

export const homeConfig = (): homeConfigProps => {
  return {
    title: "",
    description: "",
    image: "",
    styles: {},
    sections: [
      {
        type: "hero",
        position: "left",
        icon: Sparkles,
        text: "School Management Reimagined",
        title: "Smart School Management,",
        title2: "Simplified",
        desc: "A complete digital platform for schools to manage students, teachers, attendance, exams, fees, communication, and more.",
        items: [
          {
            type: "button",
            title: "Get Started",
            Icon: ArrowRight,
            onClick: () => {},
            styles: {
              className:
                "bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-xl shadow-lg shadow-blue-600/30 cursor-pointer",
            },
          },
          {
            type: "button",
            title: "Book Demo",
            variant: "outline",
            onClick: () => {},
            styles: {
              className: "border-gray-300 rounded-xl cursor-pointer px-6 py-5",
            },
          },
        ],
      },
      {
        type: "hero",
        position: "right",
        title: "Dashboard Overview",
        styles: {
          className:
            "flex items-center justify-between pb-4 border-b border-gray-100",
        },
        items: [
          {
            type: "Stats",
            stat: [
              { label: "Students", value: "1,245", color: "bg-blue-500" },
              { label: "Teachers", value: "87", color: "bg-teal-500" },
              { label: "Attendance", value: "94%", color: "bg-indigo-500" },
              { label: "Revenue", value: "₹45K", color: "bg-purple-500" },
            ],
            styles: {
              className: "bg-gray-50 rounded-xl p-4 border border-gray-100",
            },
          },
          {
            type: "chart",
            title: "Weekly Activity",
            charts: [40, 70, 45, 80, 60, 90, 75],
            styles: {
              containerStyles: {
                className:
                  "bg-linear-to-br from-blue-50 to-teal-50 rounded-xl p-4 border border-blue-100",
              },
              chartStyles: {
                className: "flex items-end gap-2 h-20",
              },
              barsStyles: {
                className:
                  "flex-1 bg-gradient-to-t from-blue-500 to-teal-400 rounded-t",
              },
            },
          },
          {
            type: "timeTable",
            title: "Today's Schedule",
            timeTables: [
              {
                time: "09:00",
                subject: "Mathematics",
                color: "bg-blue-100 text-blue-700",
              },
              {
                time: "11:00",
                subject: "Science",
                color: "bg-green-100 text-green-700",
              },
            ],
            styles: {
              className: "flex items-center gap-3 p-3 bg-gray-50 rounded-lg",
            },
          },
        ],
      },
      {
        type: "trustLogos",
        desc: "Trusted by 200+ schools worldwide",
        items: [
          { icon: School, name: "International Schools" },
          { icon: GraduationCap, name: "CBSE Board" },
          { icon: BookOpen, name: "Cambridge Schools" },
          { icon: Award, name: "IB Schools" },
          { icon: Building2, name: "Public Schools" },
          { icon: Library, name: "Private Institutions" },
        ],
        styles: {
          descStyles: {
            className: "text-center text-gray-500 mb-10",
          },
          containerStyles: {
            className: "py-16 bg-white border-y border-gray-100",
          },
          logoContainerStyles: {
            className:
              "flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity",
          },
        },
      },
      {
        type:"card",
        cardType: "iconCard",
        title: "Everything you need to run",
        title2: "modern school",
        desc: "Powerful features designed to streamline every aspect of school administration",
        items: [
          {
            icon: Users,
            title: "Student Management",
            desc: "Complete student records, enrollment, and profile management in one place",
          },
          {
            icon: UserCheck,
            title: "Teacher Management",
            desc: "Manage teacher profiles, assignments, and workload distribution efficiently",
          },
          {
            icon: ClipboardCheck,
            title: "Smart Attendance",
            desc: "Automated attendance tracking with biometric integration and real-time updates",
          },
          {
            icon: FileText,
            title: "Exam & Marks Entry",
            desc: "Streamlined exam scheduling, marks entry, and report card generation",
          },
          {
            icon: Calendar,
            title: "Timetable Automation",
            desc: "Auto-generate conflict-free timetables for classes, teachers, and rooms",
          },
          {
            icon: DollarSign,
            title: "Fees Management",
            desc: "Online fee collection, automated reminders, and comprehensive reports",
          },
          {
            icon: Smartphone,
            title: "Parent App",
            desc: "Keep parents connected with real-time updates and communication tools",
          },
          {
            icon: Bus,
            title: "Transport Tracking",
            desc: "GPS-enabled bus tracking and route management for student safety",
          },
          {
            icon: Bell,
            title: "Real-time Notifications",
            desc: "Instant alerts and announcements to students, teachers, and parents",
          },
        ],
        styles: {
          containerStyles: {
            className: "py-24 bg-gradient-to-b from-white to-gray-50",
          },
        },
      },
      {
        type: "dashboardmockup",
        title: "Powerful Dashboard for",
        title2: "Every Role",
        desc: "Get complete visibility into your school's operations with real-time insights",
        items: [
          {
            label: "Total Students",
            value: "1,245",
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-100",
          },
          {
            label: "Attendance Rate",
            value: "94.2%",
            icon: CheckCircle,
            color: "text-green-600",
            bg: "bg-green-100",
          },
          {
            label: "Active Teachers",
            value: "87",
            icon: Award,
            color: "text-purple-600",
            bg: "bg-purple-100",
          },
          {
            label: "Growth",
            value: "+12.5%",
            icon: TrendingUp,
            color: "text-teal-600",
            bg: "bg-teal-100",
          },
        ],
        lineData: [
          { name: "Jan", value: 65 },
          { name: "Feb", value: 72 },
          { name: "Mar", value: 68 },
          { name: "Apr", value: 80 },
          { name: "May", value: 85 },
          { name: "Jun", value: 92 },
        ],

        barData: [
          { name: "Mon", attendance: 94 },
          { name: "Tue", attendance: 92 },
          { name: "Wed", attendance: 96 },
          { name: "Thu", attendance: 89 },
          { name: "Fri", attendance: 91 },
        ],

        features: [
          "Real-time insights",
          "Role-based access",
          "Customizable widgets",
          "Fast, clean UI",
        ],
        styles: {
          containerStyles: {
            className: "py-24 bg-gradient-to-b from-white to-gray-50",
          },
        },
      },
      {
        type: "imgModule",
        items: [
          {
            title: "Students & Teachers Module",
            subtitle: "Complete Management System",
            image:
              "https://images.unsplash.com/photo-1758270704534-fd9715bffc0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGNsYXNzcm9vbSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYzMjA1MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
            points: [
              "Complete student records with photos and documents",
              "Teacher load management and assignment tracking",
              "Automated attendance and performance monitoring",
            ],
            reversed: false,
          },
          {
            title: "Attendance & Timetable",
            subtitle: "Smart Scheduling & Tracking",
            image:
              "https://images.unsplash.com/photo-1610888662651-05dbdec7cfae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjB0aW1ldGFibGUlMjBzY2hlZHVsZXxlbnwxfHx8fDE3NjMyODc0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
            points: [
              "Auto-generate conflict-free timetables instantly",
              "Biometric attendance syncing in real-time",
              "Daily, weekly, and monthly attendance reports",
            ],
            reversed: true,
          },
          {
            title: "Fees & Finance",
            subtitle: "Seamless Payment Management",
            image:
              "https://images.unsplash.com/photo-1607609972034-e8c1c6eb3e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXltZW50JTIwZmluYW5jZSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjMyODc0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
            points: [
              "Online fee payments via multiple gateways",
              "Automated due reminders via SMS and email",
              "Comprehensive collection and pending reports",
            ],
            reversed: false,
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
        cardType: "testimonial",
        title: "Loved by",
        title2: "educators worldwide",
        desc: "Hear what school administrators have to say about our platform",
        items: [
          {
            name: "Dr. Sarah Mitchell",
            role: "Principal, Greenwood International School",
            image:
              "https://images.unsplash.com/photo-1595436222774-4b1cd819aada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwZXJzb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMyNTQxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
            quote:
              "This system has revolutionized how we manage our school. The automation features alone have saved us countless hours every week.",
            rating: 5,
          },
          {
            name: "Michael Thompson",
            role: "IT Director, Cambridge Academy",
            image:
              "https://images.unsplash.com/photo-1595436222774-4b1cd819aada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwZXJzb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMyNTQxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
            quote:
              "The best school management software we've used. Intuitive, powerful, and the support team is fantastic. Highly recommended!",
            rating: 5,
          },
          {
            name: "Jennifer Lee",
            role: "Administrator, St. Mary's High School",
            image:
              "https://images.unsplash.com/photo-1595436222774-4b1cd819aada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwZXJzb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMyNTQxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
            quote:
              "Parents love the app and real-time updates. Our communication has improved dramatically and fee collection is now seamless.",
            rating: 5,
          },
        ],
        styles: {
          containerStyles: {
            className: "py-24 bg-gradient-to-b from-gray-50 to-white",
          },
        },
      },
      {
        type: "pricing",
        title: "Simple,",
        title2: "transparent pricing",
        desc: "Choose the plan that fits your school's needs. All plans include a 14-day free trial.",
        items: [
          {
            name: "Basic",
            price: "$49",
            period: "/month",
            description: "Perfect for small schools getting started",
            features: [
              "Up to 200 students",
              "Basic student management",
              "Attendance tracking",
              "Fee management",
              "Email support",
              "Mobile app access",
            ],
            highlighted: false,
          },
          {
            name: "Professional",
            price: "$149",
            period: "/month",
            description: "For growing schools with advanced needs",
            features: [
              "Up to 1,000 students",
              "All Basic features",
              "Timetable automation",
              "Exam management",
              "Transport tracking",
              "Parent app",
              "SMS notifications",
              "Priority support",
              "Custom reports",
            ],
            highlighted: true,
          },
          {
            name: "Enterprise",
            price: "Custom",
            period: "",
            description: "For large institutions with custom requirements",
            features: [
              "Unlimited students",
              "All Professional features",
              "Multiple campuses",
              "API access",
              "Advanced analytics",
              "Dedicated account manager",
              "Custom integrations",
              "24/7 phone support",
              "On-premise deployment option",
            ],
            highlighted: false,
          },
        ],
        styles: {
          containerStyles: {
            className: "py-24 bg-white",
          },
        },
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
            className: "py-24 bg-gradient-to-b from-white to-gray-50",
          },
        },
      },
    ],
  };
};
