import { DropDownOption } from "./dropdown.modal";
import { IconType } from "./types/icon.type";

export interface FormProps {
  type: string;
  mode: "add" | "edit";
  id?: number;
}

export interface InfoItem {
  type: "title" | "desc";
  value?: string;
  mode?: {
    add?: { value: string };
    edit?: { value: string };
  };
}

export type FormValue = string | number | null | undefined | File[] | Date;

export type FormData = Record<string, FormValue>;

export interface FieldProps {
  name: string;
  type:
    | "text"
    | "email"
    | "number"
    | "dropdown"
    | "textarea"
    | "date"
    | "uploadbox";
  label?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  min?: number | string;
  max?: number | string;
  options?: DropDownOption[];
  fieldName?: string;
  collectionName?: string;
  isDistinct?: boolean;
  dependancy?: string[];
}

export interface SectionProps {
  title?: string;
  fields?: FieldProps[];
}

export type FormPreview =
  | {
      type: string;
      key: string;
      displayName: string;
      avatarKey: string;
      icon: IconType;
    }
  | {
      sectionName: string;
      fields: Array<{
        type: string;
        key: string;
        displayName: string;
      }>;
    };

export interface ConfigType {
  sections?: SectionProps[];
  info?: InfoItem[];
  preview?: FormPreview[];
}

export interface FormRendererProps {
  sections: SectionProps[];
  formData: Record<string, unknown>;
  errors: Record<string, string>;
  resetFlag?: boolean;
  handleChange: (key: string, value: unknown) => void;
  handleBlur: (field: FieldProps) => void;
}
