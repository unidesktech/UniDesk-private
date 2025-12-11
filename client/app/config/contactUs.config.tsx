import { Sparkles, Mail, Phone, MapPin, Instagram, Facebook, Twitter , Clock ,MessageSquare , CircleQuestionMark , WrenchIcon ,GraduationCap, CreditCard} from "lucide-react";
import { ContactSectionType } from "../models/contactus-config.model";


export const contactConfig = (): ContactSectionType => {
  return {
    type: "contact-hero",

    badge: {
      icon: Sparkles,
      label: "24/7 Support Available",
      color: "text-blue-600"
    },

    title: "Get in Touch",

    description:
      "We're here to help you with anything related to your school management system. Our dedicated support team is ready to assist you.",

    stats: [
      { value: "<2h", label: "Response Time" },
      { value: "98%", label: "Satisfaction" },
      { value: "24/7", label: "Available" }
    ],

    styles: {
      classNames: "bg-white"
    },

    sections: [
      {
        type:"card",
        cardType: "contactuscard",
        title: "Choose Your Preferred Contact Method",
        title2: "modern school",
        desc: "We're available through multiple channels to support you",
        items: [
          {
            icon: Mail,
            title: "Student Management",
            description: "Complete student records, enrollment, and profile management in one place",
            buttonText: "Mail Us",
            color: "text-blue-600"
          },
          {
            icon: Phone,
            title: "Teacher Management",
            description: "Manage teacher profiles, assignments, and workload distribution efficiently",
            buttonText: "Call Us",
            color: "text-green-600"
          },
          {
            icon: MessageSquare,
            title: "Smart Attendance",
            description: "Automated attendance tracking with biometric integration and real-time updates",
            buttonText: "Chat with Us",
            color: "text-purple-600"
          }, 
        ],
        styles: {
            className: "py-2 bg-gradient-to-b from-white to-gray-50  grid md:grid-cols-2 lg:grid-cols-3 gap-6",
        },
      },
      {
        type: "contact-form",
        title2: "Send Us a Message",
        description:
          "Fill out the form below and our support team will get back to you as soon as possible.",

        styles: {
          className: "bg-white"
        },

        fields: [
          {
            name: "fullName",
            label: "Full Name",
            placeholder: "Enter your full name",
            type: "text",
            icon: Mail,
            required: true
          },
          {
            name: "email",
            label: "Email Address",
            placeholder: "you@example.com",
            type: "email",
            icon: Mail,
            required: true
          },
          {
            name: "phone",
            label: "Phone Number (Optional)",
            placeholder: "+1 (555) 000-0000",
            type: "phone",
            icon: Phone
          },
          {
            name: "subject",
            label: "Subject",
            placeholder: "Select a subject",
            type: "select",
            options: [
              "General Inquiry",
              "Technical Support",
              "Pricing",
              "Partnership",
              "Other"
            ],
            required: true
          },
          {
            name: "message",
            label: "Message",
            placeholder: "Tell us how we can help you…",
            type: "textarea",
            required: true
          }
        ],

        attachment: {
          label: "Attachment (Optional)",
          description: "Click to upload or drag and drop — PDF, DOC, or Image (max. 10MB)",
          maxSizeMB: 10
        },

        buttons: {
          submitLabel: "Submit Message",
          clearLabel: "Clear Form"
        },

        officeInfo: {
          title: "Our Office Information",
          items: [
          {
              icon: MapPin,
              label: "Location",
              value: "123 Education Street, Suite 400, San Francisco, CA 94105"
            },
            {
              icon: Mail,
              label: "Email",
              value: "support@schoolms.com, info@schoolms.com"
            },
            {
              icon: Phone,
              label: "Phone",
              value: "+1 (555) 123-4567, +1 (555) 123-4568 (Sales)"
            },
            {
              icon: Clock,
              label: "Hours",
              value: "Monday – Friday, 9:00 AM – 6:00 PM EST"
            }

          ],
          mapLabel: "Open in Google Maps →"
        },

        socialLinks: {
          title: "Connect with Us",
          platforms: [
            { icon: Facebook, url: "#" },
            { icon: Twitter, url: "#" },
            { icon: Instagram, url: "#" }
          ]
        },

        newsletter: {
          title: "Subscribe to our Newsletter",
          placeholder: "Your email",
          buttonLabel: "Subscribe"
        }
      },
      {
        type:"card",
        cardType: "contactuscard",
        title: "How Can We Help?",
        title2: "modern school",
        desc: "Browse our support categories or search for specific topics",
        items: [
          {
            icon: CircleQuestionMark,
            title: "Student Management",
            description: "Complete student records, enrollment, and profile management in one place",
            buttonText: "Learn More",
            color: "text-blue-600"
          },
          {
            icon: WrenchIcon,
            title: "Teacher Management",
            description: "Manage teacher profiles, assignments, and workload distribution efficiently",
            buttonText: "Learn More",
            color: "text-yellow-600"
          },
          {
            icon: CreditCard,
            title: "Smart Attendance",
            description: "Automated attendance tracking with biometric integration and real-time updates",
            buttonText: "Learn More",
            color: "text-red-600"
          }, 
          {
            icon: GraduationCap,
            title: "Smart Attendance",
            description: "Automated attendance tracking with biometric integration and real-time updates",
            buttonText: "Learn More",
            color: "text-black-600"
          }, 
        ],
        styles: {
            className: "py-2 bg-gradient-to-b from-white to-gray-50 grid md:grid-cols-2 lg:grid-cols-4 gap-6",
        },
      },
    ]
  };
};
