import { DropDownOption } from "./dropdown.modal";

export interface FormProps {
  type: string;
  mode: "add" | "edit";
  id?: number;
}

interface InfoItem {
  type: "title" | "desc";
  value?: string;
  mode?: {
    add?: { value: string };
    edit?: { value: string };
  };
}

export interface FieldProps {
  name: string;
  type: "text" | "email" | "number" | "dropdown";
  label?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  min?: number;
  max?: number;
  options?: DropDownOption[];
}

export interface SectionProps {
  title?: string;
  fields?: FieldProps[];
}

export interface ConfigType {
  sections?: SectionProps[];
  info?: InfoItem[];
}