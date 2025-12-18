import {
  Clock,
  Edit,
  Eye,
  Trash2,
  TrendingUp,
  UserCheck,
  Users,
  MessageSquare,
  Download,
  UserPlus,
  Phone,
  Mail,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export const managementConfig = {
  student: {
    header: {
      title: "Students",
      subtitle: "Manage all student records, enrollments, and information",
    },
    cards: [
      {
        value: "Total Students",
        key: "total",
        icon: Users,
        color: "text-blue-600",
        bg: "bg-blue-100",
      },
      {
        value: "Active",
        key: "active",
        icon: UserCheck,
        color: "text-teal-600",
        bg: "bg-teal-100",
      },
      {
        value: "New This Week",
        key: "thisWeek",
        icon: TrendingUp,
        color: "text-green-600",
        bg: "bg-green-100",
      },
      {
        value: "Inactive",
        key: "inactive",
        icon: Clock,
        color: "text-gray-600",
        bg: "bg-gray-100",
      },
    ],
    filters: {
      searchPlaceholder: "Search by name, ID, class, or contact...",
      enableViewToggle: true,
      filters: [
        {
          key: "status",
          options: [
            { value: "All Status", id: "all" },
            { value: "Active", id: "active" },
            { value: "Inactive", id: "inactive" },
          ],
        },
        {
          key: "class",
          options: [
            { value: "All Classes", id: "all" },
            { value: "9-A", id: "9-A" },
            { value: "9-B", id: "9-B" },
            { value: "10-A", id: "10-A" },
            { value: "10-B", id: "10-B" },
          ],
        },
        {
          key: "sortBy",
          options: [
            { value: "Name", id: "name" },
            { value: "ID", id: "id" },
          ],
        },
      ],
    },
    table: {
      headers: [
        { key: "id", header: "ID / Code" },
        { key: "name", header: "Name" },
        { key: "class", header: "Class" },
        { key: "contact", header: "Contact" },
        { key: "status", header: "Status" },
      ],
      rowActions: [
        {
          action: "modal",
          actionUse: "view",
          actionValue: "",
          label: "View",
          icon: Eye,
          allowedRole: ["admin", "teacher"],
        },
        {
          action: "modal",
          actionUse: "edit",
          actionValue: "student",
          label: "Edit",
          icon: Edit,
          allowedRole: ["admin"],
        },
        {
          action: "navigate",
          actionUse: "",
          actionValue: "student",
          label: "Chat",
          icon: FaWhatsapp,
          allowedRole: ["admin"],
        },
        {
          action: "sep",
          type: "separator",
        },
        {
          action: "modal",
          actionUse: "delete",
          actionValue: "student",
          label: "Delete",
          icon: Trash2,
          className: "text-red-600",
          allowedRole: ["admin"],
        },
      ],
    },

    sidebar: {
      quickActions: [
        {
          label: "Edit",
          icon: Edit,
          variant: "default",
          action: "modal",
          actionUse: "edit",
          actionValue: "",
          allowedRole: ["admin", "teacher"],
        },
        {
          label: "Message",
          icon: MessageSquare,
          variant: "outline",
          action: "navigate",
          actionUse: "",
          actionValue: "",
          allowedRole: ["admin", "teacher"],
        },
        { label: "", icon: Download, variant: "outline" },
      ],
      tabs: [
        {
          value: "overview",
          label: "Overview",
          type: "fields",
          fields: [
            { key: "class", label: "Class", icon: null },
            { key: "rollNo", label: "Roll No", icon: null },
            { key: "contact", label: "Contact", icon: Phone },
          ],
          stats: [
            { key: "attendance", label: "Attendance", value: "95%" },
            { key: "grade", label: "Grade", value: "A+" },
            { key: "rank", label: "Rank", value: "3rd" },
            { key: "projects", label: "Projects", value: "12" },
          ],
        },
        {
          value: "details",
          label: "Details",
          type: "details",
          fields: [
            { key: "class", label: "Class" },
            { key: "rollNo", label: "Roll No" },
            { key: "contact", label: "Contact" },
          ],
        },
        {
          value: "activity",
          label: "Activity",
          type: "activity",
          activities: [
            { action: "Profile updated", date: "2 hours ago", icon: Edit },
            { action: "Attendance marked", date: "1 day ago", icon: UserPlus },
            { action: "Message sent", date: "3 days ago", icon: MessageSquare },
            { action: "Document uploaded", date: "1 week ago", icon: Download },
          ],
        },
        {
          value: "documents",
          label: "Documents",
          type: "documents",
          documents: [
            {
              name: "Application Form.pdf",
              size: "2.4 MB",
              date: "Jan 15, 2024",
            },
            { name: "ID Proof.pdf", size: "1.8 MB", date: "Jan 10, 2024" },
            { name: "Report Card.pdf", size: "856 KB", date: "Dec 20, 2023" },
          ],
        },
      ],
      footerActions: [
        {
          label: "Delete",
          icon: Trash2,
          variant: "outline",
          className: "text-red-600",
          action: "modal",
          actionUse: "delete",
          actionValue: "",
          allowedRole: ["admin", "teacher"],
        },
        {
          label: "Edit Details",
          icon: Edit,
          variant: "default",
          className: "",
          action: "modal",
          actionUse: "edit",
          actionValue: "",
          allowedRole: ["admin", "teacher"],
        },
      ],
    },
  },
};
