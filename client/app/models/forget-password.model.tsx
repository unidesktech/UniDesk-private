import { IconType } from "./types/icon.type";

export interface ForgotPasswordConfigType {
  logo: {
    icon: IconType;
    title: string;
    subtitle: string;
  };

  card: {
    title: string;
    description: string;

    field: {
      name: string;
      label: string;
      placeholder: string;
      type: string;
      icon: IconType;
    };

    buttons: {
      submitLabel: string;
      backToLoginLabel: string;
    };

    helper: {
      label: string;
      actionLabel: string;
      path: string;
    };
  };

  styles: {
    className: string;
    inlineStyles?: React.CSSProperties;
  };
}