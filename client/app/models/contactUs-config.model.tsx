import { CSSProperties } from "react";
import { IconType } from "./types/icon.type";

export interface ContactFormField {
  name: string;
  label: string;
  placeholder: string;
  type: "text" | "email" | "phone" | "select" | "textarea" | "file";
  icon?: IconType;
  required?: boolean;
  options?: string[]; 
}

export interface ContactFormButtons {
  submitLabel: string;
  clearLabel: string;
}

export interface ContactFormAttachment {
  label: string;
  description: string;
  maxSizeMB: number;
  note?: string;
}

export interface ContactCardSection {
  type: "card";
  cardType: string;
  title: string;
  title2?: string;
  desc: string;  
  items: Array<{
    icon: IconType;
    title: string;  
    description: string;
    buttonText: string;
    color: string;
    onClick?: () => void;
    }>;
  styles?: {
    inlineStyles?: CSSProperties;
    className?: string; 
    };
}

export interface ContactFormSection {
  type: "contact-form";
  title?: string;
  title2?: string;
  description: string;
  desc?: string;
  styles: {
    inlineStyles?: CSSProperties;
    className: string;
  };
  fields: ContactFormField[];
  attachment: ContactFormAttachment;
  buttons: ContactFormButtons;

  officeInfo: {
    title : string;
    items: Array<{
      icon: IconType;
      label: string;
      value: string;  
    }>;
    mapLabel: string;
  };

  socialLinks: {
    title: string;
    platforms:Array<{
    icon: IconType;
    url: string;
  }>;
}

  newsletter: {
    title: string;
    placeholder: string;
    buttonLabel: string;
  };
}

export type ContactSection = ContactCardSection | ContactFormSection ;

export interface ContactSectionType {
  type: string;
  badge: {
    icon: IconType;
    label: string;
    color: string;
  };
  title: string;
  description: string;

  stats: Array<{
    value: string;
    label: string;
  }>;

  styles: {
    inlineStyles?: CSSProperties;
    classNames: string;
  };

  sections: ContactSection[];
}
