import { Lock, Eye, GraduationCap } from "lucide-react";
import { ResetPasswordConfigType } from "../models/reset-password.model";

export const resetPasswordConfig = (): ResetPasswordConfigType => {
  return {
    logo: {
      icon: GraduationCap,
      title: "SchoolSphere",
      subtitle: "Smart School Management Made Simple",
    },

    card: {
      icon: Lock,
      title: "Create New Password",
      description:
        "Your new password must be different from previous passwords.",

      fields: [
        {
          name: "newPassword",
          label: "New Password",
          placeholder: "Enter new password",
          type: "password",
          icon: Eye,
        },
        {
          name: "confirmPassword",
          label: "Confirm Password",
          placeholder: "Re-enter new password",
          type: "password",
          icon: Eye,
        },
      ],

      buttons: {
        resetLabel: "Reset Password",
        backToLoginLabel: "Back to Login",
      },
    },

    styles: {
      className: "min-h-screen bg-gradient-to-b from-blue-50 to-white",
      inlineStyles: {},
    },
  };
};