import { Mail, GraduationCap } from "lucide-react";
import { ForgotPasswordConfigType } from "../models/forget-password.model";

export const forgotPasswordConfig = (): ForgotPasswordConfigType => {
  return {
    logo: {
      icon: GraduationCap,
      title: "UniDesk",
      subtitle: "Smart School Management Made Simple",
    },

    card: {
      title: "Forgot your password?",
      description:
        "Enter your registered email to receive password reset instructions.",

      field: {
        name: "email",
        label: "Email Address",
        placeholder: "name@school.com",
        type: "email",
        icon: Mail,
      },

      buttons: {
        submitLabel: "Send Reset Link",
        backToLoginLabel: "Back to Login",
      },

      helper: {
        label: "Remember your password?",
        actionLabel: "Login here",
        path: "/auth/login",
      },
    },

    styles: {
      className: "min-h-screen bg-gradient-to-b from-blue-50 to-white",
      inlineStyles: {},
    },
  };
};