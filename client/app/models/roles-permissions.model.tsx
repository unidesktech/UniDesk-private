// models/roles-permissions.model.ts
import { IconType } from "react-icons";

export type PermissionLevel = "none" | "view" | "edit" | "full";
export type RoleType = "system" | "custom";
export type ModuleStatus = "all" | "partial" | "none";

export interface PermissionItem {
  id: string;
  label: string;
  enabled: boolean;
  level: PermissionLevel;
  icon?: IconType;
}

export interface PermissionSection {
  id: string;
  title: string;
  enabledCount: number;
  totalCount: number;
  moduleStatus: ModuleStatus;
  permissions: PermissionItem[];
}

export interface RoleItem {
  id: string;
  title: string;
  description: string;
  usersCount: number;
  type: RoleType;
  scope: string;
  icon?: IconType;
}

export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  avatar?: string;
}

export interface BulkAction {
  id: string;
  label: string;
  icon?: IconType;
}

export interface HeaderConfig {
  title: string;
  subtitle: string;
  actionLabel: string;
  searchPlaceholder: string;
}

export interface SuperAdminInfo {
  title: string;
  description: string;
  usersCount: number;
  icon?: IconType;
}

export interface RoleDetails {
  title: string;
  description: string;
  usersCount: number;
  type: RoleType;
}

export interface RolesPermissionsConfig {
  header: HeaderConfig;
  superAdmin: SuperAdminInfo;
  roles: RoleItem[];
  selectedRole: RoleDetails;
  bulkActions: BulkAction[];
  permissionSections: PermissionSection[];
  // Add users data to config
  availableUsers: User[];
  departments: string[];
}