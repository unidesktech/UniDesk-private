import { ShieldCheck, GraduationCap } from "lucide-react";
import { OtpPageConfig } from "../models/otp-verification.model";

export const otpConfig = (): OtpPageConfig => {
  return {
    logo: {
      icon: GraduationCap,
      title: "SchoolSphere",
      subtitle: "Smart School Management Made Simple"
    },

    card: {
      icon: ShieldCheck,
      title: "Enter OTP Code",
      description: "A 6-digit verification code was sent to",
      otpLength: 6,

      resend: {
        label: "Resend OTP",
        timerLabel: "43s"
      },

      buttons: {
        verifyLabel: "Verify Code",
        backToLoginLabel: "Back to Login"
      }
    },

    styles: {
      className: "min-h-screen bg-gradient-to-b from-white to-teal-50",
      inlineStyles: {}
    }
  };
};