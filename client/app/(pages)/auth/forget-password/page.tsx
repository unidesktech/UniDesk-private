"use client";
import { forgotPasswordConfig } from "@/app/config/forget-password.config";
import { sendResetLink } from "@/app/services/auth.service";
import { setResetPasswordEmail } from "@/app/store/app.slice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { showToast } from "@/app/utils/toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ForgotPasswordPage() {

  const dispatch = useAppDispatch();

  const router = useRouter();
  const school = useAppSelector((state) => state.app.school);

  const config = forgotPasswordConfig();
  const LogoIcon = config.logo.icon;
  const FieldIcon = config.card.field.icon;

  const [email, setEmail] = useState("");

  useEffect(() => {
    if(!school) {
      router.push('/auth/login');
    }
  }, [school, router]);

  const handleSubmit = async() => {
    if(email.trim() === "") {
      alert("Please enter your email address.");
      return;
    }

    showToast("Sending reset link...", "loading", { id: "send-reset-link", isLoading: true });
    const result = await sendResetLink(email, school!.code);
    
    
    if(result.success) {
      showToast("Reset link sent successfully!", "success", { id: "send-reset-link" });
      dispatch(setResetPasswordEmail(email));
      router.push(`/auth/verify-otp?id=${result.data?.otpId}&email=${encodeURIComponent(email)}&schoolCode=${school!.code}`);
    }
    else {
      showToast(result.message || "Failed to send reset link.", "error", { id: "send-reset-link" });
    }
  }

  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-6 ${config.styles.className}`}
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
        <h2 className="text-2xl font-semibold mb-2">
          {config.card.title}
        </h2>

        <p className="text-gray-600 mb-6">
          {config.card.description}
        </p>

        {/* Email Field */}
        <div className="text-left mb-6">
          <label className="block text-sm font-medium mb-1">
            {config.card.field.label}
          </label>

          <div className="relative">
            <FieldIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={config.card.field.type}
              placeholder={config.card.field.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-xl
                         bg-gray-50 focus:bg-white
                         focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          className="w-full cursor-pointer bg-primary text-white py-3 rounded-xl
                     text-lg font-medium shadow-md hover:shadow-lg transition"
                     onClick={() => handleSubmit()}
        >
          {config.card.buttons.submitLabel}
        </button>

        {/* Back */}
        <div className="mt-6 text-center">
          <button className="inline-flex cursor-pointer items-center gap-2 text-gray-600 hover:text-gray-900" onClick={() => router.push('/auth/login')}>
            ← {config.card.buttons.backToLoginLabel}
          </button>
        </div>

        {/* Helper */}
        <div className="mt-8 bg-blue-50 rounded-xl p-4 text-sm text-gray-700">
          💡 {config.card.helper.label}{" "}
          <button className="text-blue-600 cursor-pointer font-medium hover:underline" onClick={() => router.push(config.card.helper.path)}>
            {config.card.helper.actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}