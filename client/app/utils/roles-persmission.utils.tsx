// utils/roles-permissions.utils.ts
import { PermissionLevel } from "../models/roles-permissions.model";

export const getLevelText = (level: PermissionLevel): string => {
  switch (level) {
    case 'none': return 'None';
    case 'view': return 'View Only';
    case 'edit': return 'Edit';
    case 'full': return 'Full Control';
    default: return 'None';
  }
};

export const getLevelColor = (level: PermissionLevel): string => {
  switch (level) {
    case 'none': return 'bg-gray-100 text-gray-600 border-gray-200';
    case 'view': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'edit': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'full': return 'bg-green-50 text-green-700 border-green-200';
    default: return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};