"use client";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { otpConfig } from "../../../config/otp-verification.config";
import { useRouter, useSearchParams } from "next/navigation";
import { sendResetLink, verifyOtp } from "@/app/services/auth.service";
import { showToast } from "@/app/utils/toast";

export default function OtpPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") || "";
  const schoolCode = searchParams.get("schoolCode") || "";

  const config = otpConfig();
  const LogoIcon = config.logo.icon;
  const CardIcon = config.card.icon;

  const [otp, setOtp] = useState<string[]>(
    Array(config.card.otpLength).fill("")
  );

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(()=>{
    if(!email || !schoolCode) {
      router.push('/auth/forget-password');
    }
  },[email, schoolCode, router]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, config.card.otpLength);
  }, [config.card.otpLength]);

  const handleOtpChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < config.card.otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < config.card.otpLength - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const resendOtp = async() => {
    showToast("Resending OTP...", { isLoading: true, id: "resend-otp" });
    const result = await sendResetLink(email, schoolCode);

    if(result.success) {
      showToast("A new OTP has been sent to your email.", "success", { id: "resend-otp" });
    }
  }

  const verifyValidOtp = async() => {
    if(otp.length < config.card.otpLength || otp.includes("")) {
      showToast("Please enter the complete OTP.", "error");
      return;
    }

    const result = await verifyOtp(email, schoolCode, otp.join(""));

    if(result.success) {
      showToast("OTP verified successfully!", "success");
      router.push(`/auth/reset-password?email=${encodeURIComponent(email)}&schoolCode=${schoolCode}&token=${result.data.token}`);
    } else {
      showToast(result.message || "Invalid OTP. Please try again.", "error");
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
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-md">
            <CardIcon className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-2">
          {config.card.title}
        </h2>

        <p className="text-gray-600 mb-4">
          {config.card.description}
          <br />
          <span className="text-blue-600 font-medium">{email}</span>
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 my-8">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {inputRefs.current[i] = el}}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              autoFocus={i === 0}
              className="w-14 h-14 border rounded-xl text-center text-xl font-semibold
                         focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
          ))}
        </div>

        {/* Resend */}
        <button onClick={()=> resendOtp()} className="text-blue-600 text-sm font-medium mb-6 cursor-pointer hover:underline">
          {config.card.resend.label}
        </button>

        {/* Verify */}
        <button onClick={() => verifyValidOtp()} className="w-full bg-primary cursor-pointer text-white py-3 rounded-xl text-lg font-medium shadow-md hover:shadow-lg transition">
          {config.card.buttons.verifyLabel}
        </button>

        {/* Back */}
        <div className="mt-6 text-center">
          <button className="inline-flex cursor-pointer items-center gap-2 text-gray-600 hover:text-gray-900" onClick={() => {router.replace('/auth/forget-password')}}>
            ← {config.card.buttons.backToLoginLabel}
          </button>
        </div>
      </div>
    </div>
  );
}