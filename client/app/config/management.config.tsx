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
  Phone,
  Upload,
  Plus,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export const managementConfig = () => {
  return {
  students: {
    header: {
      title: "Students",
      subtitle: "Manage all student records, enrollments, and information",
    },
    buttons: [
      {
        name: "export",
        icon: Download,
        variant: "outline",
        action: "api",
        actionUse: "export",
        actionValue: "students/export",
        label: "Export",
        permissions: ["management.students.view"]
      },
      {
        name: "import",
        icon: Upload,
        variant: "outline",
        action: "api",
        actionUse: "import",
        actionValue: "students/import",
        label: "Import",
        permissions: ["management.students.edit"]
      },
      {
        name: "addStudent",
        icon: Plus,
        variant: "",
        action: "navigate",
        actionUse: "add",
        actionValue: "management/form/student/add",
        label: "Add Student",
        permissions: ["management.students.edit"]
      },
    ],
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
        key: "newThisWeek",
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
          label: "Status",
          options: [
            { value: "All Status", id: "all" },
            { value: "Active", id: "active" },
            { value: "Inactive", id: "inactive" },
          ],
        },
        {
          key: "class_id",
          label: "Classes",
          isDistinct: true,
          tableName: "classes",
          columnName: "name",
        },
        {
          key: "section_id",
          label: "Sections",
          isDistinct: true,
          tableName: "sections",
          columnName: "name",
          dependancy: ["class_id"],
        },
        {
          key: "sortBy",
          label: "Sort By",
          options: [
            { value: "Name", id: "name" },
            { value: "ID", id: "id" },
          ],
        },
      ],
    },
    table: {
      headers: [
        { key: "user_code", header: "ID / Code" },
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
          permissions: ["management.students.view"],
        },
        {
          action: "modal",
          actionUse: "edit",
          actionValue: "student",
          label: "Edit",
          icon: Edit,
          permissions: ["management.students.edit"],
        },
        {
          action: "navigate",
          actionUse: "",
          actionValue: "student",
          label: "Chat",
          icon: FaWhatsapp,
          permissions: ["communication.students.view"],
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
          permissions: ["management.students.delete"],
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
          className: "flex-1",
        },
        {
          label: "Message",
          icon: MessageSquare,
          variant: "outline",
          action: "navigate",
          actionUse: "",
          actionValue: "",
          // allowedRole: ["admin", "teacher"],
          className: "flex-1",
        },
        { label: "", icon: Download, variant: "outline", className: "" },
      ],
      tabs: [
        {
          value: "overview",
          label: "Overview",
          type: "fields",
          fields: [
            { key: "class", label: "Class", icon: null },
            // { key: "rollNo", label: "Roll No", icon: null },
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
            // { key: "rollNo", label: "Roll No" },
            { key: "contact", label: "Contact" },
          ],
        },
        {
          value: "activity",
          label: "Activity",
          type: "activity",
          activities: [
            { action: "Profile created", key: "", icon: Edit },
            { action: "Profile updated", key: "", icon: Edit },
            // { action: "Attendance marked", key: "1 day ago", icon: UserPlus },
            // { action: "Message sent", date: "3 days ago", icon: MessageSquare },
            // { action: "Document uploaded", date: "1 week ago", icon: Download },
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
          className: "text-red-600 flex-1",
          action: "modal",
          actionUse: "delete",
          actionValue: "",
          allowedRole: ["admin", "teacher"],
        },
        {
          label: "Edit Details",
          icon: Edit,
          variant: "default",
          className: "flex-1",
          action: "modal",
          actionUse: "edit",
          actionValue: "",
          allowedRole: ["admin", "teacher"],
        },
      ],
    },
  }
}
};
