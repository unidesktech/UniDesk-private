import { LucideIcon } from "lucide-react";

export type DialogueVariant = "info" | "success" | "warning" | "error";

export interface PolicyDialogue {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  variant?: DialogueVariant;
}

export interface PolicyBulletItem {
  title?: string;
  description?: string;
}

export interface PolicyBullets {
  sequence?: "ul" | "ol";
  type?: "1" | "a" | "A" | "i";
  items: PolicyBulletItem[];
}

export interface PolicySection {
  id?: string;            
  icon?: LucideIcon;
  title?: string;
  descriptions?: string[];

  dialogues?: PolicyDialogue[];
  bullets?: PolicyBullets;

  subsections?: PolicySection[];
}
