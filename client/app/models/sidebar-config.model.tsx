
export interface SidebarItem {
  key: string;
  label: string;
  icon?: string;
  path?: string;
  children?: SidebarItem[];
}
