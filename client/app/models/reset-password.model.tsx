import { IconType } from "./types/icon.type";

export interface ResetPasswordCardType {
  icon: IconType;
  title: string;
  description: string;

  fields: Array<{
    name: string;
    label: string;
    placeholder: string;
    type: string;
    icon: IconType;
  }>;

  buttons: {
    resetLabel: string;
    backToLoginLabel: string;
  };
}

export interface ResetPasswordConfigType {
  logo: {
    icon: IconType;
    title: string;
    subtitle: string;
  };

  card: ResetPasswordCardType;

  styles: {
    className?: string;
    inlineStyles?: React.CSSProperties;
  };
}