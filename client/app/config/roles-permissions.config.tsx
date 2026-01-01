// config/roles-permissions.config.ts
import { RolesPermissionsConfig } from "../models/roles-permissions.model";
import { 
  Shield, 
  UserCog, 
  School, 
  BookOpen, 
  DollarSign, 
  Bus, 
  Users, 
  GraduationCap,
  Settings,
  BarChart3,
  Eye,
  Download,
  UserCheck,
  Briefcase
} from "lucide-react";

export const rolesPermissionsConfig: RolesPermissionsConfig = {
  header: {
    title: "Roles & Permissions",
    subtitle: "Manage access levels for your school users",
    actionLabel: "Create New Role",
    searchPlaceholder: "Search roles..."
  },
  
  superAdmin: {
    title: "Super Admin",
    description: "Full system access",
    usersCount: 2,
    icon: Shield
  },
  
  roles: [
    {
      id: "admin",
      title: "Admin",
      description: "Administrator access",
      usersCount: 3,
      type: "system",
      scope: "System",
      icon: UserCog
    },
    {
      id: "principal",
      title: "Principal",
      description: "School principal access",
      usersCount: 1,
      type: "system",
      scope: "System",
      icon: School
    },
    {
      id: "teacher",
      title: "Teacher",
      description: "Teaching staff access",
      usersCount: 4,
      type: "system",
      scope: "System",
      icon: BookOpen
    },
    {
      id: "accountant",
      title: "Accountant",
      description: "Finance & fees access",
      usersCount: 3,
      type: "system",
      scope: "System",
      icon: DollarSign
    },
    {
      id: "librarian",
      title: "Librarian",
      description: "Library management",
      usersCount: 2,
      type: "system",
      scope: "System",
      icon: BookOpen
    },
    {
      id: "transport-manager",
      title: "Transport Manager",
      description: "Transport management",
      usersCount: 2,
      type: "system",
      scope: "System",
      icon: Bus
    },
    {
      id: "parent",
      title: "Parent",
      description: "Parent portal access",
      usersCount: 100,
      type: "system",
      scope: "System",
      icon: Users
    },
    {
      id: "student",
      title: "Student",
      description: "Student portal access",
      usersCount: 300,
      type: "system",
      scope: "System",
      icon: GraduationCap
    },
    {
      id: "custom-role",
      title: "Custom Role",
      description: "Coordination management",
      usersCount: 4,
      type: "custom",
      scope: "Custom",
      icon: Settings
    }
  ],
  
  selectedRole: {
    title: "Super Admin",
    description: "Full system access",
    usersCount: 2,
    type: "system"
  },
  
  bulkActions: [
    { id: "select-all", label: "Select All" },
    { id: "deselect-all", label: "Deselect All" },
    { id: "expand-all", label: "Expand All" },
    { id: "collapse-all", label: "Collapse All" },
    { id: "reset-default", label: "Reset to Default" }
  ],
  
  permissionSections: [
    {
      id: "dashboard",
      title: "Dashboard Access",
      enabledCount: 2,
      totalCount: 3,
      moduleStatus: "partial",
      permissions: [
        { 
          id: "view-dashboard", 
          label: "View Dashboard", 
          enabled: false, 
          level: "none",
          icon: BarChart3
        },
        { 
          id: "view-analytics", 
          label: "View Analytics", 
          enabled: true, 
          level: "view",
          icon: Eye
        },
        { 
          id: "export-reports", 
          label: "Export Reports", 
          enabled: true, 
          level: "edit",
          icon: Download
        }
      ]
    },
    {
      id: "student-management",
      title: "Student Management",
      enabledCount: 45,
      totalCount: 45,
      moduleStatus: "all",
      permissions: [
        { id: "view-students", label: "View Students", enabled: true, level: "full", icon: Users },
        { id: "add-students", label: "Add Students", enabled: true, level: "full", icon: UserCheck },
        { id: "edit-students", label: "Edit Students", enabled: true, level: "full", icon: Settings },
        { id: "delete-students", label: "Delete Students", enabled: true, level: "full", icon: Briefcase }
      ]
    },
    {
      id: "teacher-management",
      title: "Teacher Management",
      enabledCount: 14,
      totalCount: 14,
      moduleStatus: "all",
      permissions: [
        { id: "attendance", label: "Attendance", enabled: true, level: "full", icon: UserCheck },
        { id: "exams-marks", label: "Exam & Marks", enabled: true, level: "full", icon: BookOpen }
      ]
    },
    {
      id: "fees-finance",
      title: "Fees & Finance",
      enabledCount: 1,
      totalCount: 5,
      moduleStatus: "partial",
      permissions: [
        { id: "view-fees", label: "View Fees", enabled: true, level: "view", icon: Eye },
        { id: "collect-fees", label: "Collect Fees", enabled: false, level: "none", icon: DollarSign },
        { id: "generate-invoices", label: "Generate Invoices", enabled: false, level: "none", icon: DollarSign }
      ]
    }
  ],

  // Add users data
  availableUsers: [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@school.com",
      department: "Mathematics",
    },
    {
      id: "2",
      name: "Michael Brown",
      email: "michael.b@school.com",
      department: "Science",
    },
    {
      id: "3",
      name: "Emily Davis",
      email: "emily.d@school.com",
      department: "English",
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david.w@school.com",
      department: "History",
    },
    {
      id: "5",
      name: "Lisa Martinez",
      email: "lisa.m@school.com",
      department: "Physical Education",
    },
    {
      id: "6",
      name: "Robert Taylor",
      email: "robert.t@school.com",
      department: "Computer Science",
    },
    {
      id: "7",
      name: "Jennifer Lee",
      email: "jennifer.l@school.com",
      department: "Art",
    },
    {
      id: "8",
      name: "Thomas Clark",
      email: "thomas.c@school.com",
      department: "Music",
    },
    {
      id: "9",
      name: "Maria Garcia",
      email: "maria.g@school.com",
      department: "Spanish",
    },
    {
      id: "10",
      name: "James Anderson",
      email: "james.a@school.com",
      department: "Physics",
    },
    {
      id: "11",
      name: "Patricia Thomas",
      email: "patricia.t@school.com",
      department: "Chemistry",
    },
    {
      id: "12",
      name: "Richard Moore",
      email: "richard.m@school.com",
      department: "Biology",
    },
    {
      id: "13",
      name: "Jennifer White",
      email: "jennifer.w@school.com",
      department: "Geography",
    },
    {
      id: "14",
      name: "Joseph Harris",
      email: "joseph.h@school.com",
      department: "Economics",
    },
    {
      id: "15",
      name: "Susan Martin",
      email: "susan.m@school.com",
      department: "Business Studies",
    },
  ],

  departments: [
    "All Departments",
    "Mathematics",
    "Science",
    "English",
    "History",
    "Physical Education",
    "Computer Science",
    "Art",
    "Music",
    "Spanish",
    "Physics",
    "Chemistry",
    "Biology",
    "Geography",
    "Economics",
    "Business Studies",
  ],
};