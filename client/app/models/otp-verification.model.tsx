import { IconType } from "./types/icon.type";

export interface OtpPageConfig {
  logo: {
    icon: IconType;
    title: string;
    subtitle: string;
  };

  card: {
    icon: IconType;
    title: string;
    description: string;
    otpLength: number;

    resend: {
      label: string;
      timerLabel: string; 
    };

    buttons: {
      verifyLabel: string;
      backToLoginLabel: string;
    };
  };

  styles: {
    className?: string;
    inlineStyles?: React.CSSProperties;
  };
}