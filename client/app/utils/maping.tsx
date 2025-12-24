import * as LucideIcons from "lucide-react";
import { IconType } from "react-icons";

export const getColorClasses = (color: string) => {
  const colors: Record<string, { icon: string; text: string }> = {
    blue: {
      icon: "bg-blue-600 dark:bg-blue-500",
      text: "text-blue-700 dark:text-blue-300",
    },
    teal: {
      icon: "bg-teal-600 dark:bg-teal-500",
      text: "text-teal-700 dark:text-teal-300",
    },
    purple: {
      icon: "bg-purple-600 dark:bg-purple-500",
      text: "text-purple-700 dark:text-purple-300",
    },
    orange: {
      icon: "bg-orange-600 dark:bg-orange-500",
      text: "text-orange-700 dark:text-orange-300",
    },
    emerald: {
      icon: "bg-emerald-600 dark:bg-emerald-500",
      text: "text-emerald-700 dark:text-emerald-300",
    },
    pink: {
      icon: "bg-pink-600 dark:bg-pink-500",
      text: "text-pink-700 dark:text-pink-300",
    },
    indigo: {
      icon: "bg-indigo-600 dark:bg-indigo-500",
      text: "text-indigo-700 dark:text-indigo-300",
    },
    red: {
      icon: "bg-red-600 dark:bg-red-500",
      text: "text-red-700 dark:text-red-300",
    },
  };
  return colors[color] || colors.blue;
};

const IconsRecord = LucideIcons as unknown as Record<string, IconType>;

export const IconMap = (iconName: string): IconType => {
  return IconsRecord[iconName] || LucideIcons.BookOpen;
};