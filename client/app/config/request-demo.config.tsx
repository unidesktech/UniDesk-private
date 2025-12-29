import {
  Sparkles,
  Video,
  Presentation,
  DollarSign,
  Rocket,
  Users,
  Zap,
  BarChart3,
  Headphones,
  Shield,
  TrendingUp,
} from "lucide-react";
import { RequestDemoConfigDto } from "../models/request-demo-config.model";
export const requestDemoConfig: RequestDemoConfigDto = {
  sections: [
    {
      type: "HeroSection",
      title: "Request a Live Demo",
      desc: "See how our platform can transform the way your school operates. Get a personalized walkthrough tailored to your institution's needs.",
      points: [
        "30-minute personalized session",
        "No credit card required",
        "Live Q&A with experts",
      ],
      image: {
        src: "https://images.unsplash.com/photo-1762329386486-f38ef2077a06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlZHVjYXRpb24lMjBkaWdpdGFsJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzYzNDA3NzI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "Education Technology",
      },
    },
    {
      type: "requestForm",
      title: "Schedule Your Demo",
      desc: "Fill in your details and we'll reach out to schedule a personalized demo.",
      form: {
        sections: [
          {
            title: "",
            fields: [
              {
                name: "full_name",
                type: "text",
                label: "Full Name",
                required: true,
                placeholder: "John Doe",
              },
              {
                name: "contact_email",
                type: "email",
                label: "Email",
                required: true,
                placeholder: "john@school.com",
              },
              {
                name: "contact_phone",
                type: "number",
                label: "Phone No.",
                placeholder: "9876543210",
                maxLength: 10,
              },
            ],
          },

          {
            title: "",
            fields: [
              {
                name: "organization",
                type: "text",
                label: "School / Institute Name",
                required: true,
                placeholder: "ABC Public School",
              },
              {
                name: "organization_size",
                type: "dropdown",
                label: "School Size",
                required: true,
                placeholder: "Select school size",
                options: [
                  { id: "1-100", value: "1 – 100 Students" },
                  { id: "100-500", value: "100 – 500 Students" },
                  { id: "500-1000", value: "500 – 1000 Students" },
                  { id: "1000+", value: "1000+ Students" },
                ],
              },
              {
                name: "city",
                type: "text",
                label: "City",
                required: true,
                placeholder: "Delhi",
              },
              {
                name: "country",
                type: "text",
                label: "Country",
                required: true,
                placeholder: "India",
              },
              {
                name: "source",
                type: "dropdown",
                label: "How did you know about us",
                placeholder: "Select how did you know us",
                options: [
                  { id: "instagram", value: "Instagram" },
                  { id: "facebook", value: "Facebook" },
                  { id: "twitter", value: "Twitter" },
                  { id: "other", value: "Other" },
                ],
              },
            ],
          },

          {
            title: "",
            fields: [
              {
                name: "scheduled_date",
                type: "date",
                required: true,
                label: "Preferred Demo Date",
              },
              {
                name: "scheduled_time",
                type: "dropdown",
                label: "Preferred Demo Time",
                required: true,
                placeholder: "Select time slot",
                options: [
                  { id: "9:30", value: "9:00 AM - 10:00 AM" },
                  { id: "10:30", value: "10:00 AM - 11:00 AM" },
                  { id: "11:30", value: "11:00 AM - 12:00 PM" },
                  { id: "14:30", value: "2:00 PM - 3:00 PM" },
                  { id: "15:30", value: "3:00 PM - 4:00 PM" },
                  { id: "16:30", value: "4:00 PM - 5:00 PM" },
                ],
              },
              {
                name: "message",
                type: "textarea",
                label: "Message / Requirements",
                placeholder:
                  "Tell us about your specific needs or questions...",
              },
            ],
          },
        ],
        bottomText:
          "We'll contact you within 24 hours to confirm your demo session.",
      },
      helpSection: {
        title: "Need Help?",
        desc: "Our team is here to answer your questions and help you get started.",
        items: [
          {
            label: "Email",
            href: "mailto:demo@schoolsphere.com",
            value: "demo@schoolsphere.com",
          },
          {
            label: "Phone",
            href: "tel:+1-555-0000",
            value: "+1 (555) 000-0000",
          },
        ],
        button: {
          label: "Start Live Chat",
          action: "/live-chat", // or modal ID, or function name
        },
        officeHours: {
          label: "Office Hours :",
          value: "Monday – Friday\n9:00 AM – 6:00 PM EST",
        },
      },
    },
    {
      type: "card",
      cardType: "iconcard",
      title: "What's Included in",
      title2: "Your Demo",
      desc: "Experience everything our platform has to offer in a comprehensive live session",
      items: [
        {
          icon: Video,
          title: "Personalized Walkthrough",
          desc: "30-minute live session tailored to your school's specific needs and requirements.",
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
          icon: Presentation,
          title: "Hands-on Feature Demo",
          desc: "Interactive demonstration of all modules with real-time examples and use cases.",
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
          icon: DollarSign,
          title: "Tailored Pricing",
          desc: "Custom pricing plan designed for your institution's size and feature requirements.",
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
          icon: Rocket,
          title: "Onboarding Guidance",
          desc: "Complete walkthrough of implementation process and timeline for seamless setup.",
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
          icon: Sparkles,
          title: "AI Features Preview",
          desc: "Exclusive look at our AI-powered automation and intelligent insights capabilities.",
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
          icon: Users,
          title: "Q&A with Experts",
          desc: "Direct access to our product specialists to answer all your questions.",
          styles: {
            CardStyle: {
              className:
                "hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
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
        className: "py-20 bg-gradient-to-br from-gray-50 to-blue-50/30",
      },
    },
    {
      type: "trustIcon",
      text: "Trusted by 50+ schools across the country",
      items: [
        "Springfield High School",
        "Riverside Academy",
        "Oakwood International",
        "Greenfield Public School",
        "Hillside Institute",
        "Lakeside Learning Center",
      ],
      testimonialText:
        "The demo was incredibly insightful. Within 30 minutes, we knew this was the perfect solution for our school. Implementation was seamless!",
      testimonialName: "John Doe",
      testimonialPosition: "Principal, Springfield High School",
    },
    {
      type: "card",
      cardType: "iconcard",
      title: "Why Schools",
      title2: "Choose Us",
      desc: "The platform built specifically for modern educational institutions",
      items: [
        {
          icon: Zap,
          title: "Super Easy to Use",
          desc: "Intuitive interface designed for all skill levels",
          styles: {
            CardStyle: {
              className:
                "group hover:shadow-xl transition-all hover:-translate-y-1 hover:border-gray-200",
            },
            IconContainerStyle: {
              className:
                "w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center",
            },
            IconStyle: {
              className: "w-6 h-6 text-white",
            },
            TitleStyle: {
              className: "!font-normal !mb-0",
            },
          },
        },
        {
          icon: Sparkles,
          title: "Modern UI",
          desc: "Beautiful, clean design that users love",
          styles: {
            CardStyle: {
              className:
                "group hover:shadow-xl transition-all hover:-translate-y-1",
            },
            IconContainerStyle: {
              className:
                "w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center",
            },
            IconStyle: {
              className: "w-6 h-6 text-white",
            },
          },
        },
        {
          icon: BarChart3,
          title: "AI-Powered Automation",
          desc: "Smart features that save time and effort",
          styles: {
            CardStyle: {
              className:
                "group hover:shadow-xl transition-all hover:-translate-y-1",
            },
            IconContainerStyle: {
              className:
                "w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center",
            },
            IconStyle: {
              className: "w-6 h-6 text-white",
            },
          },
        },
        {
          icon: TrendingUp,
          title: "Powerful Insights",
          desc: "Data-driven analytics for better decisions",
          styles: {
            CardStyle: {
              className:
                "group hover:shadow-xl transition-all hover:-translate-y-1",
            },
            IconContainerStyle: {
              className:
                "w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center",
            },
            IconStyle: {
              className: "w-6 h-6 text-white",
            },
          },
        },
        {
          icon: Headphones,
          title: "Amazing Support",
          desc: "Dedicated team ready to help 24/7",
          styles: {
            CardStyle: {
              className:
                "group hover:shadow-xl transition-all hover:-translate-y-1",
            },
            IconContainerStyle: {
              className:
                "w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center",
            },
            IconStyle: {
              className: "w-6 h-6 text-white",
            },
          },
        },
        {
          icon: Shield,
          title: "Secure & Scalable",
          desc: "Enterprise-grade security and performance",
          styles: {
            CardStyle: {
              className:
                "group hover:shadow-xl transition-all hover:-translate-y-1",
            },
            IconContainerStyle: {
              className:
                "w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center",
            },
            IconStyle: {
              className: "w-6 h-6 text-white",
            },
          },
        },
      ],
      styles: { className: "py-20 bg-white" },
    },
  ],
};
