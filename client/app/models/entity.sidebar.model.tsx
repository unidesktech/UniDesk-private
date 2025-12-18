import { IconType } from "react-icons";
import { ActionType, ActionUse } from "./action.model";

export interface SidebarAction {
  label: string;
  icon?: IconType;
  variant?: "default" | "outline" | "ghost" | "destructive";
  className?: string;
  action?: ActionType;
  actionValue?: string;
  actionUse?: ActionUse;
}

export interface SidebarField {
  key: string;
  label: string;
  icon?: IconType;
}

export interface SidebarStat {
  key: string;
  label: string;
}

export interface SidebarActivity {
  icon: IconType;
  action: string;
  date: string;
}

export interface SidebarDocument {
  name: string;
  size: string;
  date: string;
}

export type SidebarTabType =
  | "fields"
  | "details"
  | "activity"
  | "documents";

export interface SidebarTab {
  value: string;
  label: string;
  type: SidebarTabType;

  fields?: SidebarField[];
  stats?: SidebarStat[];
  activities?: SidebarActivity[];
  documents?: SidebarDocument[];
}

export interface EntitySidebarConfig {
  quickActions: SidebarAction[];
  footerActions: SidebarAction[];
  tabs: SidebarTab[];
}
