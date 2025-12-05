import {
  Award,
  Boxes,
  Clock,
  Eye,
  Headphones,
  Heart,
  Lightbulb,
  Lock,
  Rocket,
  School,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLinkedinLine } from "react-icons/ri";
import { aboutConfigProps } from "../models/about-config.model";

export const aboutConfig : aboutConfigProps = {
  title: "",
  description: "",
  image: "",
  styles: {
    className: "min-h-screen bg-white",
  },
  sections: [
    {
      type: "hero",
      title: "Empowering Schools Through",
      title2: "Smart Technology",
      desc: "We're on a mission to revolutionize education management by providing schools with intuitive, powerful tools that simplify administration and enhance learning experiences for everyone.",
      img: "https://images.unsplash.com/photo-1643216755260-cb0bc30473c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBzdHVkZW50cyUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NjMzNjM2MzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      styles: {
        imgContainerStyles: {
          className:
            "bg-white rounded-2xl shadow-2xl border border-gray-200 p-2 overflow-hidden",
        },
        imgStyles: {
          className: "w-full h-auto rounded-xl",
        },
        containerStyles: {
          className:
            "relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50 py-16 md:py-20",
        },
        titleStyles: {
          className: "!text-2xl md:!text-5xl text-gray-900 md:mb-6",
        },
        descStyles: {
          className: "!text-sm md:!text-xl text-gray-600 leading-relaxed",
        },
      },
    },
    {
      type: "journy",
      title: "Our",
      title2: "Journey",
      desc: "From a simple idea to transforming education management across schools",
      items: [
        {
          year: "2022",
          title: "The Idea Sparked",
          description:
            "Identified the gap in modern school management solutions and started our journey.",
          icon: Lightbulb,
          color: "from-blue-500 to-blue-600",
        },
        {
          year: "2023",
          title: "First Prototype",
          description:
            "Built and launched our MVP with core features like attendance and grade management.",
          icon: Rocket,
          color: "from-teal-500 to-teal-600",
        },
        {
          year: "2024",
          title: "First 50 Schools Onboarded",
          description:
            "Reached a major milestone with 50+ educational institutions trusting our platform.",
          icon: Users,
          color: "from-blue-600 to-teal-500",
        },
        {
          year: "2025",
          title: "AI Automation Features",
          description:
            "Introduced cutting-edge AI-powered automation for smarter school operations.",
          icon: Sparkles,
          color: "from-purple-500 to-blue-500",
        },
      ],
      styles: {
        containerStyles: {
          className: "py-20 bg-white",
        },
      },
    },
    {
      type: "card",
      cardType: "iconcard",
      title: "What",
      title2: "Drives Us",
      desc: "Our commitment to excellence in education technology",
      items: [
        {
          title: "Mission",
          Icon: Target,
          desc: "To empower educational institutions with innovative technology that simplifies administration, enhances learning outcomes, and creates meaningful connections between teachers, students, and parents.",
          styles: {
            CardStyle: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
            },
            IconContainerStyle: {
              className:
                "w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 group-hover:!bg-gradient-to-br group-hover:!from-blue-500 group-hover:!to-blue-600",
            },
            IconStyle: {
              className: "text-white",
            },
          },
        },
        {
          title: "Vision",
          Icon: Eye,
          desc: "To become the world's most trusted and comprehensive school management platform, setting new standards for educational technology and transforming how schools operate globally.",
          styles: {
            CardStyle: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
            },
            IconContainerStyle: {
              className:
                "w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 group-hover:!bg-gradient-to-br group-hover:!from-teal-500 group-hover:!to-teal-600 mb-6",
            },
            IconStyle: {
              className: "text-white",
            },
          },
        },
        {
          title: "Our Motto",
          Icon: Zap,
          desc: "Simple. Smart. Scalable.",
          styles: {
            CardStyle: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
            },
            IconContainerStyle: {
              className:
                "w-14 h-14 bg-gradient-to-br from-blue-600 to-teal-500 group-hover:!bg-gradient-to-br group-hover:!from-blue-600 group-hover:!to-teal-500 mb-6",
            },
            IconStyle: {
              className: "text-white",
            },
          },
        },
      ],
      styles: {
        containerStyles: {
          className: "py-20 bg-gradient-to-br from-gray-50 to-blue-50/30",
        },
      },
    },
    {
      type: "card",
      cardType: "iconcard",
      title: "What We Stand For",
      title2: "Stand For",
      desc: "Core values that guide everything we do",
      items: [
        {
          Icon: Lightbulb,
          title: "Innovation",
          desc: "Constantly pushing boundaries to deliver cutting-edge solutions that transform education.",
          styles: {
            CardStyle: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
            },
            IconContainerStyle: {
              className: "w-12 h-12 bg-blue-100 group-hover:!bg-blue-100",
            },
            IconStyle: {
              className: "w-6 h-6 text-blue-600 group-hover:!text-blue-600",
            },
            TitleStyle: {
              className: "!font-normal !mb-0",
            },
          },
        },
        {
          Icon: Shield,
          title: "Reliability",
          desc: "Building rock-solid systems that schools can depend on every single day.",
          styles: {
            CardStyle: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
            },
            IconContainerStyle: {
              className: "w-12 h-12 bg-teal-100 group-hover:bg-teal-100",
            },
            IconStyle: {
              className: "w-6 h-6 text-teal-600 group-hover:!text-teal-600",
            },
            TitleStyle: {
              className: "!font-normal !mb-0",
            },
          },
        },
        {
          Icon: TrendingUp,
          title: "Student Success",
          desc: "Every feature we build is designed with student achievement and growth in mind.",
          styles: {
            CardStyle: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
            },
            IconContainerStyle: {
              className: "w-12 h-12 bg-green-100 group-hover:!bg-green-100",
            },
            IconStyle: {
              className: "w-6 h-6 text-green-600 group-hover:!text-green-600",
            },
            TitleStyle: {
              className: "!font-normal !mb-0",
            },
          },
        },
        {
          Icon: Lock,
          title: "Security",
          desc: "Protecting sensitive educational data with enterprise-grade security measures.",
          styles: {
            CardStyle: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
            },
            IconContainerStyle: {
              className: "w-12 h-12 bg-purple-100 group-hover:!bg-purple-100",
            },
            IconStyle: {
              className: "w-6 h-6 text-purple-600 group-hover:!text-purple-600",
            },
            TitleStyle: {
              className: "!font-normal !mb-0",
            },
          },
        },
        {
          Icon: Zap,
          title: "Simplicity",
          desc: "Making complex school management tasks simple and intuitive for everyone.",
          styles: {
            CardStyle: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
            },
            IconContainerStyle: {
              className: "w-12 h-12 bg-yellow-100 group-hover:!bg-yellow-100",
            },
            IconStyle: {
              className: "w-6 h-6 text-yellow-600 group-hover:!text-yellow-600",
            },
            TitleStyle: {
              className: "!font-normal !mb-0",
            },
          },
        },
        {
          Icon: Rocket,
          title: "Future-Ready",
          desc: "Preparing schools for tomorrow's challenges with scalable, adaptable technology.",
          styles: {
            CardStyle: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200 ",
            },
            IconContainerStyle: {
              className: "w-12 h-12 bg-indigo-100 group-hover:!bg-indigo-100",
            },
            IconStyle: {
              className: "w-6 h-6 text-indigo-600 group-hover:!text-indigo-600",
            },
            TitleStyle: {
              className: "!font-normal !mb-0",
            },
          },
        },
      ],
      styles: {
        containerStyles: {
          className: "py-20 bg-white",
        },
      },
    },
    {
      type: "card",
      cardType: "teamcard",
      title: "Leadership",
      desc: "Meet the visionaries behind SchoolSphere",
      items: [
        {
          name: "Sarah Johnson",
          role: "CEO & Co-Founder",
          bio: "Sarah brings 15+ years of experience in education technology. Previously served as Director of Technology at a leading educational institution. Passionate about leveraging technology to create equitable learning opportunities.",
          icons: [
            { icon: RiLinkedinLine, href: "#" },
            { icon: FaXTwitter, href: "#" },
            { icon: MdEmail, href: "#" },
          ],
          styles: {
            avatarStyles: {
              className: "bg-linear-to-br from-blue-500 to-blue-600",
            },
          },
        },
        {
          name: "Michael Chen",
          role: "CTO & Co-Founder",
          bio: "Michael is a seasoned software architect with expertise in building scalable SaaS platforms. Former tech lead at major cloud companies. Committed to building secure, reliable systems that schools can trust.",
          icons: [
            { icon: RiLinkedinLine, href: "#" },
            { icon: FaXTwitter, href: "#" },
            { icon: MdEmail, href: "#" },
          ],
          styles: {
            avatarStyles: {
              className: "bg-linear-to-br from-teal-500 to-teal-600",
            },
          },
        },
      ],
      styles: {
        containerStyles: {
          className: "py-20 bg-white",
        },
        className: "grid md:!grid-cols-2 lg:!grid-cols-2 gap-6",
      },
    },
    {
      type: "card",
      cardType: "teamcard",
      title: "Meet",
      title2: "Our Team",
      desc: "Passionate individuals working together to revolutionize education management",
      items: [
        {
          name: "Sarah Johnson",
          role: "CEO & Co-Founder",
          bio: "Former educator with 15+ years of experience in educational technology.",
          icons: [
            { icon: RiLinkedinLine, href: "#" },
            { icon: FaXTwitter, href: "#" },
            { icon: MdEmail, href: "#" },
          ],
          styles: {
            avatarStyles: {
              className: "bg-linear-to-br from-blue-500 to-blue-600",
            },
            cardContentStyles: {
              className: "flex flex-col items-center text-center gap-2 mb-1",
            },
            titleStyles: {
              className: "text-lg font-semibold text-gray-900 -mt-3",
            },
            roleStyles: {
              className: "text-blue-600",
            },
            bioStyles: {
              className: "text-gray-600 text-sm !text-center -mt-2",
            },
            iconContainerStyles: {
              className: "justify-center",
            },
            card: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
            },
          },
        },
        {
          name: "Michael Chen",
          role: "CTO & Co-Founder",
          bio: "Software architect specializing in scalable SaaS platforms.",
          icons: [
            { icon: RiLinkedinLine, href: "#" },
            { icon: FaXTwitter, href: "#" },
            { icon: MdEmail, href: "#" },
          ],
          styles: {
            avatarStyles: {
              className: "bg-linear-to-br from-teal-500 to-teal-600",
            },
            cardContentStyles: {
              className: "flex flex-col items-center text-center gap-2 mb-1",
            },
            iconContainerStyles: {
              className: "justify-center",
            },
            titleStyles: {
              className: "text-lg font-semibold text-gray-900 -mt-3",
            },
            roleStyles: {
              className: "text-blue-600",
            },
            bioStyles: {
              className: "text-gray-600 text-sm text-center -mt-2",
            },
            card: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
            },
          },
        },
        {
          name: "Emily Rodriguez",
          role: "Head of Product",
          bio: "Product leader focused on user-centric design and innovation.",
          icons: [
            { icon: RiLinkedinLine, href: "#" },
            { icon: FaXTwitter, href: "#" },
            { icon: MdEmail, href: "#" },
          ],
          styles: {
            avatarStyles: {
              className: "bg-linear-to-br from-purple-500 to-purple-600",
            },
            cardContentStyles: {
              className: "flex flex-col items-center text-center gap-2 mb-1",
            },
            iconContainerStyles: {
              className: "justify-center",
            },
            titleStyles: {
              className: "text-lg font-semibold text-gray-900 -mt-3",
            },
            roleStyles: {
              className: "text-blue-600",
            },
            bioStyles: {
              className: "text-gray-600 text-sm text-center -mt-2",
            },
            card: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
            },
          },
        },
        {
          name: "David Park",
          role: "Head of Engineering",
          bio: "Full-stack expert with a passion for clean, maintainable code.",
          icons: [
            { icon: RiLinkedinLine, href: "#" },
            { icon: FaXTwitter, href: "#" },
            { icon: MdEmail, href: "#" },
          ],
          styles: {
            avatarStyles: {
              className: "bg-linear-to-br from-green-500 to-green-600",
            },
            iconContainerStyles: {
              className: "justify-center",
            },
            cardContentStyles: {
              className: "flex flex-col items-center text-center gap-2 mb-1",
            },
            titleStyles: {
              className: "text-lg font-semibold text-gray-900 -mt-3",
            },
            roleStyles: {
              className: "text-blue-600",
            },
            bioStyles: {
              className: "text-gray-600 text-sm text-center -mt-2",
            },
            card: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
            },
          },
        },
        {
          name: "Priya Sharma",
          role: "Head of Customer Success",
          bio: "Dedicated to ensuring schools get maximum value from our platform.",
          icons: [
            { icon: RiLinkedinLine, href: "#" },
            { icon: FaXTwitter, href: "#" },
            { icon: MdEmail, href: "#" },
          ],
          styles: {
            avatarStyles: {
              className: "bg-linear-to-br from-orange-500 to-orange-600",
            },
            cardContentStyles: {
              className: "flex flex-col items-center text-center gap-2 mb-1",
            },
            iconContainerStyles: {
              className: "justify-center",
            },
            titleStyles: {
              className: "text-lg font-semibold text-gray-900 -mt-3",
            },
            roleStyles: {
              className: "text-blue-600",
            },
            bioStyles: {
              className: "text-gray-600 text-sm text-center -mt-2",
            },
            card: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
            },
          },
        },
        {
          name: "James Wilson",
          role: "Lead Designer",
          bio: "Creating beautiful, intuitive interfaces that users love.",
          icons: [
            { icon: RiLinkedinLine, href: "#" },
            { icon: FaXTwitter, href: "#" },
            { icon: MdEmail, href: "#" },
          ],
          styles: {
            avatarStyles: {
              className: "bg-linear-to-br from-indigo-500 to-indigo-600",
            },
            iconContainerStyles: {
              className: "justify-center",
            },
            cardContentStyles: {
              className: "flex flex-col items-center text-center gap-2 mb-1",
            },
            titleStyles: {
              className: "text-lg font-semibold text-gray-900 -mt-3",
            },
            roleStyles: {
              className: "text-blue-600",
            },
            bioStyles: {
              className: "text-gray-600 text-sm text-center -mt-2",
            },
            card: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
            },
          },
        },
      ],
      styles: {
        containerStyles: {
          className: "py-20 bg-gradient-to-br from-gray-50 to-blue-50/30",
        },
      },
    },
    {
      type: "card",
      cardType: "teamcard",
      title: "Our",
      title2: "Impact",
      desc: "Making a real difference in education management",
      items: [
        {
          AvatarIcon: School,
          name: "50+",
          bio: "Schools Digitalized",
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
          bio: "Students Supported",
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
          AvatarIcon: Boxes,
          name: "30+",
          bio: "Features Built",
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
          AvatarIcon: Clock,
          name: "99.9%",
          bio: "Uptime Guaranteed",
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
      styles: {
        containerStyles: {
          className: "py-20 bg-white",
        },
        className: "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
      },
    },
    {
      type: "culture",
      title: "",
      desc: "",
      img: "https://images.unsplash.com/photo-1752650735943-d0fbf1edce21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjMyOTI3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      heading: "Our Culture",
      subtitle:
        "We believe in creating an environment where innovation thrives, ideas are valued, and every team member is empowered to make a difference. Our culture is built on collaboration, transparency, and a shared passion for transforming education.",
      items: [
        { icon: Users, label: "Collaboration" },
        { icon: Lightbulb, label: "Innovation" },
        { icon: Heart, label: "Passion for Education" },
        { icon: Award, label: "Transparency" },
      ],
      styles: {
        containerStyles: {
          className:
            "py-20 bg-gradient-to-br from-blue-50 via-white to-teal-50",
        },
      },
    },
    {
      type: "card",
      cardType: "iconcard",
      title: "Why",
      title2: "Choose Us",
      desc: "What makes SchoolSphere different from other school management systems",
      items: [
        {
          Icon: Shield,
          title: "Stability",
          desc: "Built on enterprise-grade infrastructure with 99.9% uptime guarantee.",
          styles: {
            CardStyle: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
            },
            IconContainerStyle: {
              className: "w-12 h-12 bg-blue-100 group-hover:!bg-blue-100",
            },
            IconStyle: {
              className: "w-6 h-6 text-blue-600 group-hover:!text-blue-600",
            },
          },
        },
        {
          icon: Sparkles,
          title: "Incredible UI/UX",
          desc: "Beautifully designed interface that's intuitive and delightful to use.",
          styles: {
            CardStyle: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
            },
            IconContainerStyle: {
              className: "w-12 h-12 bg-purple-100 group-hover:!bg-purple-100",
            },
            IconStyle: {
              className: "w-6 h-6 text-purple-600 group-hover:!text-purple-600",
            },
          },
        },
        {
          icon: Users,
          title: "AI-Powered",
          desc: "Smart automation and insights powered by cutting-edge artificial intelligence.",
          styles: {
            CardStyle: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
            },
            IconContainerStyle: {
              className: "w-12 h-12 bg-teal-100 group-hover:!bg-teal-100",
            },
            IconStyle: {
              className: "w-6 h-6 text-teal-600 group-hover:!text-teal-600",
            },
          },
        },
        {
          icon: Headphones,
          title: "Reliable Support",
          desc: "Dedicated customer success team available whenever you need assistance.",
          styles: {
            CardStyle: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
            },
            IconContainerStyle: {
              className: "w-12 h-12 bg-teal-100 group-hover:!bg-green-100",
            },
            IconStyle: {
              className: "w-6 h-6 text-green-600 group-hover:!text-green-600",
            },
          },
        },
        {
          icon: Zap,
          title: "Simple to Use",
          desc: "Designed for everyone - no technical expertise required to get started.",
          styles: {
            CardStyle: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
            },
            IconContainerStyle: {
              className: "w-12 h-12 bg-yellow-100 group-hover:!bg-yellow-100",
            },
            IconStyle: {
              className: "w-6 h-6 text-yellow-600 group-hover:!text-yellow-600",
            },
          },
        },
        {
          icon: Lock,
          title: "Secure & Scalable",
          desc: "Bank-level security with the ability to grow alongside your institution.",
          styles: {
            CardStyle: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
            },
            IconContainerStyle: {
              className: "w-12 h-12 bg-red-100 group-hover:!bg-red-100",
            },
            IconStyle: {
              className: "w-6 h-6 text-red-600 group-hover:!text-red-600",
            },
          },
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
