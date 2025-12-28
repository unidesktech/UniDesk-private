import { Bell, LogOut, User } from "lucide-react";

export const sidebarUserMenuItems = () => {
  return [
    {
      key: "profile",
      label: "Profile",
      icon: User,
      action: "navigate",
      actionValue: "/profile",
    },
    {
      key: "notification",
      label: "Notification",
      icon: Bell,
      action: "navigate",
      actionValue: "/notification",
    },
    {
      key: "separator",
      label: "",
      icon: "",
      action: "",
      actionValue: "",
    },
    {
      key: "logout",
      label: "Loguot",
      icon: LogOut,
      action: "api",
      actionValue: "logout",
    },
  ];
};
