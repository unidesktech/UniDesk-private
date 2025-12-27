import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Settings,
  GraduationCap,
  Bell,
  BookOpen,
  Circle,
} from "lucide-react";

export const ICON_REGISTRY: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  Settings,
  GraduationCap,
  Bell,
  BookOpen,
};

export function resolveIcon(name?: string): LucideIcon {
  return (name && ICON_REGISTRY[name]) || Circle;
}
