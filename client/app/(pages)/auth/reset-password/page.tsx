"use client";

import { resetPasswordConfig } from "@/app/config/reset-password.config";
import { resetPassword } from "@/app/services/auth.service";
import { showToast } from "@/app/utils/toast";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function ResetPasswordPage() {
  const config = resetPasswordConfig();
  const LogoIcon = config.logo.icon;
  const CardIcon = config.card.icon;

  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token") || "";

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  // Password strength logic
  const getPasswordStrength = (password: string) => {
    if (formData.newPassword === "") {
      return { label: "None", color: "bg-gray-200", level: 0 };
    }

    let strength = 0;

    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&#^]/.test(password)) strength++;

    if (strength <= 1) return { label: "Weak", color: "bg-red-400", level: 1 };
    if (strength === 2)
      return { label: "Medium", color: "bg-yellow-400", level: 2 };
    return { label: "Strong", color: "bg-green-500", level: 4 };
  };

  const strength = getPasswordStrength(formData.newPassword);

  const passwordsMatch =
    formData.confirmPassword.length > 0 &&
    formData.newPassword === formData.confirmPassword;

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleVisibility = (name: "newPassword" | "confirmPassword") => {
    setShowPassword((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isFormValid =
    formData.newPassword.length > 0 &&
    formData.confirmPassword.length > 0 &&
    passwordsMatch;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    showToast("Resetting password...", { isLoading: true, id: "reset-password" });

    const response = await resetPassword(
      token,
      formData.newPassword
    );

    if (response.success) {
      showToast("Password reset successfully!", "success", { id: "reset-password" });
      router.push("/auth/login");
    } else {
      showToast(response.message || "Failed to reset password.", "error", { id: "reset-password" });
    }
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center text-center p-6 ${config.styles.className}`}
      style={config.styles.inlineStyles}
    >
      {/* Logo */}
      <div className="mb-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <LogoIcon className="w-10 h-10 text-white bg-blue-600 p-2 rounded-xl shadow-md" />
          <h1 className="text-3xl font-semibold text-gray-900">
            {config.logo.title}
          </h1>
        </div>
        <p className="text-gray-600">{config.logo.subtitle}</p>
      </div>

      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl p-10 border max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-teal-400 rounded-full flex items-center justify-center shadow-md">
            <CardIcon className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-2">{config.card.title}</h2>
        <p className="text-gray-600 mb-6">{config.card.description}</p>

        {/* Fields */}
        {config.card.fields.map((field, i) => {
          const FieldIcon = field.icon;
          const fieldName = field.name as "newPassword" | "confirmPassword";

          return (
            <div key={i} className="mb-6 text-left">
              <label className="font-medium text-gray-900">{field.label}</label>

              <div className="relative mt-1">
                <input
                  type={showPassword[fieldName] ? "text" : "password"}
                  placeholder={field.placeholder}
                  value={formData[fieldName]}
                  onChange={(e) => handleChange(fieldName, e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 pr-12 text-gray-700 focus:ring-2 focus:ring-blue-400 transition"
                />

                <button
                  type="button"
                  onClick={() => toggleVisibility(fieldName)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <FieldIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Password strength bar */}
              {fieldName === "newPassword" && (
                <div className="mt-4">
                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded-full transition-all ${
                          level <= strength.level
                            ? strength.color
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm mt-1 text-gray-600">
                    Strength:{" "}
                    <span className="font-semibold">
                      {strength.label}
                    </span>
                  </p>
                </div>
              )}

              {/* Confirm password match validator */}
              {fieldName === "confirmPassword" &&
                formData.confirmPassword.length > 0 && (
                  <p
                    className={`text-sm mt-2 font-medium ${
                      passwordsMatch ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {passwordsMatch
                      ? "✔ Passwords match"
                      : "✖ Passwords do not match"}
                  </p>
                )}
            </div>
          );
        })}

        {/* Reset Button */}
        <button
          disabled={!isFormValid}
          className={`w-full py-3 cursor-pointer rounded-xl text-lg font-medium shadow-md transition
            ${
              isFormValid
                ? "bg-primary text-white hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
          onClick={() => handleSubmit()}
        >
          {config.card.buttons.resetLabel}
        </button>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <button onClick={() => router.push('/auth/login')} className="inline-flex cursor-pointer items-center gap-2 text-gray-600 hover:text-gray-900">
            ← {config.card.buttons.backToLoginLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
