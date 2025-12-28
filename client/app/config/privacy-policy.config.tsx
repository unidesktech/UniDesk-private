import {
  Shield,
  Database,
  Settings,
  CheckCircle,
  Info,
  Users,
  Clock,
  Edit,
  Mail,
  Share2,
  Cookie,
} from "lucide-react";
import { PolicySection } from "../models/privacy-policy-config.model";

export const privacyPolicyConfig = (): PolicySection[] => [
  {
    id: "introduction",
    icon: Shield,
    title: "Introduction",
    descriptions: [
      `Welcome to School Management System ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our school management platform.`,
      "This policy applies to all users of our platform, including school administrators, teachers, students, parents, and guardians. By using our services, you agree to the collection and use of information in accordance with this policy.",
    ],
    dialogues: [
      {
        icon: Info,
        title: "Important",
        description:
          "Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access or use our platform.",
        variant: "info",
      },
    ],
  },

  {
    id: "data-collection",
    icon: Database,
    title: "Information We Collect",
    descriptions: [
      "We collect information that you provide directly to us, information we obtain automatically when you use our services, and information from third parties.",
    ],
    subsections: [
      {
        title: "Personal Information",
        descriptions: [
          "We may collect the following types of personal information:",
        ],
        bullets: {
          sequence: "ul",
          items: [
            {
              title: "Student Data",
              description:
                "Name, student ID, date of birth, grade level, class assignments, academic records, attendance records, homework submissions, grades, report cards, disciplinary records, and special education information.",
            },
            {
              title: "Parent / Guardian Data",
              description:
                "Name, email address, phone number, mailing address, relationship to student, emergency contact information.",
            },
            {
              title: "Teacher/Administrator Data",
              description:
                "Name, email address, phone number, employee ID, department, teaching assignments, credentials, and professional qualifications.",
            },
            {
              title: "Account Information",
              description:
                "Username, password (encrypted), profile photo, preferences, and notification settings.",
            },
          ],
        },
      },
      {
        title: "Automatically Collected Information",
        bullets: {
          sequence: "ul",
          items: [
            {
              title: "Device Information",
              description:
                "IP address, browser type, operating system, device identifiers, and mobile network information.",
            },
            {
              title: "Usage Information",
              description:
                "Pages viewed, features used, time spent on the platform, login times, and interaction patterns.",
            },
            {
              title: "Location Data",
              description:
                "General location information based on IP address (not precise GPS location unless explicitly authorized for features like bus tracking).",
            },
            {
              title: "Cookies and Tracking Technologies",
              description:
                "Session cookies, preference cookies, and analytics cookies.",
            },
          ],
        },
      },
      {
        title: "Information from Third Parties",
        descriptions: ["We may receive information from:"],
        bullets: {
          sequence: "ul",
          items: [
            {
              description:
                "Educational institutions that subscribe to our platform.",
            },
            {
              description:
                "Third-party authentication services (if used for single sign-on).",
            },
            {
              description: "Payment processors (for billing information).",
            },
          ],
        },
      },
    ],
  },

  {
    id: "data-usage",
    icon: Settings,
    title: "How We Use Your Information",
    descriptions: [
      "We use the information we collect for various purposes, including:",
    ],
    bullets: {
      sequence: "ol",
      items: [
        {
          title: "Provide and Maintain Services",
          description:
            "To operate and maintain the school management platform, including user account management, access control, and feature functionality.",
        },
        {
          title: "Educational Services",
          description:
            "To facilitate teaching and learning, including assignment submission, grading, attendance tracking, and progress reporting.",
        },
        {
          title: "Communication",
          description:
            "To send notifications, announcements, grade updates, attendance alerts, and other important information to students, parents, and staff.",
        },
        {
          title: "Analytics and Improvement",
          description:
            "To analyze usage patterns, improve our platform, develop new features, and enhance user experience.",
        },
        {
          title: "Security and Fraud Prevention",
          description:
            "To detect, prevent, and respond to security incidents, fraudulent activities, and violations of our terms of service.",
        },
        {
          title: "Compliance",
          description:
            "To comply with legal obligations, respond to lawful requests from public authorities, and protect our legal rights.",
        },
        {
          title: "Reporting and Analytics",
          description:
            "To generate reports on student performance, attendance trends, and institutional analytics for authorized school personnel.",
        },
      ],
    },
    dialogues: [
      {
        icon: CheckCircle,
        title: "We never sell your data",
        description:
          "Your personal information will never be sold to third parties for marketing or advertising purposes.",
        variant: "success",
      },
    ],
  },

  {
    id: "user-rights",
    icon: CheckCircle,
    title: "Your Rights",
    descriptions: [
      `To exercise any of these rights, please contact us using the information provided in the "Contact Information" section below.`,
      "You have certain rights regarding your personal information:",
    ],
    dialogues: [
      {
        icon: Shield,
        title: "Access",
        description:
          "You have the right to request access to the personal information we hold about you.",
        variant: "info",
      },
      {
        icon: Shield,
        title: "Correction",
        description:
          "You can request that we correct any inaccurate or incomplete personal information.",
        variant: "info",
      },
      {
        icon: Shield,
        title: "Deletion",
        description:
          "You can request deletion of your personal information, subject to legal retention requirements.",
        variant: "info",
      },
      {
        icon: Shield,
        title: "Opt-Out",
        description:
          "You can opt out of certain communications and data collection practices.",
        variant: "info",
      },
      {
        icon: Shield,
        title: "Data Portability",
        description:
          "You can request a copy of your data in a structured, machine-readable format.",
        variant: "info",
      },
      {
        icon: Shield,
        title: "Restrict Processing",
        description:
          "You can request that we restrict the processing of your personal information in certain circumstances.",
        variant: "info",
      },
    ],
  },

  {
    id: "security",
    icon: Shield,
    title: "Data Storage & Security",
    descriptions: [
      "We take the security of your personal information seriously and implement appropriate technical and organizational measures to protect it.",
    ],

    subsections: [
      {
        title: "Security Measures",
        bullets: {
          sequence: "ol",
          items: [
            {
              title: "Encryption",
              description:
                "All data transmissions are encrypted using industry-standard SSL/TLS protocols. Sensitive data at rest is encrypted using AES-256 encryption.",
            },
            {
              title: "Authentication",
              description:
                "Multi-factor authentication (MFA) is available and recommended for all accounts.",
            },
            {
              title: "Audit Logs",
              description:
                "We maintain comprehensive audit logs of system access and data modifications.",
            },
            {
              title: "Regular Security Audits",
              description:
                "Our systems undergo regular security assessments and penetration testing.",
            },
            {
              title: "Data Backups",
              description:
                "Regular automated backups are performed to prevent data loss.",
            },
          ],
        },
      },
      {
        title: "Data Storage Location",
        descriptions: [
          "Your data is stored on secure servers located in [Specify Region/Country]. We use reputable cloud service providers that comply with industry-standard security certifications including SOC 2, ISO 27001, and GDPR requirements.",
        ],
        dialogues: [
          {
            icon: Info,
            title: "No System is 100% Secure",
            description:
              "While we implement robust security measures, no method of transmission over the internet or electronic storage is completely secure. We cannot guarantee absolute security.",
            variant: "success",
          },
        ],
      },
    ],
  },

  {
    id: "third-party",
    icon: Share2,
    title: "Third-Party Disclosure",
    descriptions: [
      "We do not sell, trade, or rent your personal information to third parties. We may share your information in the following limited circumstances:",
    ],
    bullets: {
      sequence: "ol",
      items: [
        {
          title: "Educational Institution",
          description:
            "Information is shared with authorized personnel at your school or educational institution as necessary to provide educational services.",
        },
        {
          title: "Service Providers",
          description:
            "We may share information with trusted third-party service providers who assist us in operating our platform, such as cloud hosting providers, email services, and analytics providers. These parties are contractually obligated to protect your information.",
        },
        {
          title: "Legal Requirements",
          description:
            "We may disclose information when required by law, court order, or legal process, or to protect the rights, property, or safety of our company, users, or others.",
        },
        {
          title: "Parental Access",
          description:
            "Parents and guardians have access to their child's information as appropriate.",
        },
        {
          title: "With Your Consent",
          description:
            "We may share information with third parties when you have given explicit consent.",
        },
      ],
    },
    dialogues: [
      {
        icon: Info,
        title: "Educational Institution Ownership",
        description:
          "Educational institutions that subscribe to our platform retain ownership and control of student and institutional data. We act as a data processor on their behalf.",
        variant: "info",
      },
    ],
  },

  {
    id: "cookies",
    icon: Cookie,
    title: "Cookies & Tracking",
    descriptions: [
      "We use cookies and similar tracking technologies to enhance your experience on our platform.",
    ],
    subsections: [
      {
        title: "Types of Cookies We Use",
        dialogues: [
          {
            title: "Essential Cookies",
            description:
              "Required for the platform to function properly. These include session cookies, authentication cookies, and security cookies.",
            variant: "info",
          },
          {
            title: "Preference Cookies",
            description:
              "Remember your settings and preferences, such as language selection, theme choice, and notification settings.",
            variant: "info",
          },
          {
            title: "Analytics Cookies",
            description:
              "Help us understand how users interact with our platform to improve functionality and user experience. These cookies collect aggregated, anonymous information.",
            variant: "info",
          },
        ],
      },
      {
        title: "Managing Cookies",
        descriptions: [
          "You can control and manage cookies through your browser settings. However, disabling essential cookies may affect the functionality of our platform.",
        ],
      },
    ],
  },

  {
    id: "student-data",
    icon: Users,
    title: "Student Data Protection",
    descriptions: [
      "We recognize that student privacy requires special protection. We comply with applicable student privacy laws, including FERPA (Family Educational Rights and Privacy Act) and COPPA (Children's Online Privacy Protection Act) where applicable.",
    ],
    subsections: [
      {
        title: "Parental Consent",
        descriptions: [
          "For students under the age of 13, we require verifiable parental consent before collecting, using, or disclosing personal information. Schools act as agents for parents in providing this consent.",
        ],
      },
      {
        title: "Student Data Usage",
        bullets: {
          sequence: "ol",
          items: [
            {
              description:
                "Student data is used solely for educational purposes",
            },
            {
              description:
                "We do not use student data for targeted advertising",
            },
            {
              description:
                "We do not create profiles of students for non-educational purposes",
            },
            {
              description:
                "Parents have the right to review and request deletion of their child's information",
            },
          ],
        },
      },
      {
        descriptions: [
          "Educational records, including grades, attendance, and disciplinary information, are protected under FERPA and can only be accessed by authorized school personnel, the student (if of appropriate age), and parents/guardians.",
        ],
        dialogues: [
          {
            icon: CheckCircle,
            title: "COPPA & FERPA Compliant",
            description:
              "Our platform is designed to comply with federal student privacy laws, including COPPA and FERPA regulations.",
            variant: "warning",
          },
        ],
      },
    ],
  },

  {
    id: "retention",
    icon: Clock,
    title: "Data Retention",
    descriptions: [
      "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.",
    ],
    subsections: [
      {
        title: "Retention Periods",
        bullets: {
          sequence: "ul",
          items: [
            {
              title: "Active Accounts",
              description:
                "Information is retained while your account is active and you are using our services.",
            },
            {
              title: "Inactive Accounts",
              description:
                "After an account becomes inactive, we may retain data for up to [X] years as required by educational regulations and institutional policies.",
            },
            {
              title: "Legal Requirements",
              description:
                "Some information may be retained longer to comply with legal, regulatory, or contractual obligations.",
            },
            {
              title: "Backup Systems",
              description:
                "Data in backup systems may persist for additional time according to our backup retention policies.",
            },
          ],
        },
      },
      {
        title: "Deletion Requests",
        descriptions: [
          "You may request deletion of your personal information by contacting us. We will process your request in accordance with applicable laws, subject to any legal retention requirements. Educational institutions may have their own data retention policies that supersede individual deletion requests.",
        ],
      },
    ],
  },

  {
    id: "consent",
    icon: CheckCircle,
    title: "Your Consent",
    descriptions: [
      "By using our platform, you consent to our Privacy Policy and agree to its terms. If you are a parent or guardian, you consent on behalf of any minors under your care.",
    ],
    subsections: [
      {
        title: "Withdrawal of Consent",
        descriptions: [
          "You have the right to withdraw your consent at any time by contacting us or your educational institution. However, withdrawal of consent may limit your ability to use certain features of our platform.",
        ],
      },
      {
        title: "Age Requirements",
        descriptions: [
          "Our platform is designed for use in educational settings. Students under 13 may use the platform only with appropriate parental consent, typically provided through their educational institution.",
        ],
      },
    ],
  },

  {
    id: "changes",
    icon: Edit,
    title: "Changes to This Privacy Policy",
    descriptions: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.",
    ],
    subsections: [
        {
            title: "Notification of Changes",
            descriptions: [
                "When we make material changes to this Privacy Policy, we will:"
            ],
            bullets: {
                sequence: "ul",
                items: [
                    {
                        description: `Update the "Last Updated" date at the top of this policy`
                    },
                    {
                        description: `Notify you via email (if you have provided an email address)`
                    },
                    {
                        description: `Display a prominent notice on our platform`
                    },
                    {
                        description: `In some cases, request your renewed consent`
                    },
                ]
            }
        },
        {
            title: "Review of Changes",
            descriptions: [
                "We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Your continued use of the platform after changes are made constitutes acceptance of those changes."
            ],
            dialogues: [
                {
                    icon: Info,
                    title: "Stay Informed",
                    description: "We recommend bookmarking this page and checking back regularly for updates to our Privacy Policy.",
                    variant: "info"
                }
            ]
        }
    ]
  },

  {
    id: "contact",
    icon: Mail,
    title: "Contact Information",
    dialogues: [
        {
            title: "Email",
            description: "unidesk@gmail.com",
            variant: "success"
        },
        {
            title: "Phone",
            description: "+91 9876543210",
            variant: "info"
        },
    ]
  },
];
