"use client";

import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { onboardingConfig } from "../../../config/onboarding.config";
import { CompletionScreenProps } from "../../../models/onboarding-config.model";
import { OnboardingProgress } from "./OnboardingProgress";

export function CompletionScreen({ onFinish, onBack, currentStep, totalSteps }: CompletionScreenProps) {
  const { completionScreen } = onboardingConfig;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-10 lg:p-14 w-full max-w-6xl text-center">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-slate-900 mb-3">
        {completionScreen.title}
      </h2>

      <p className="text-slate-600 max-w-2xl mx-auto mb-12">
        {completionScreen.description}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {completionScreen.stats.map((stat) => (
          <div key={stat.id} className={`rounded-2xl p-6 ${stat.bgColor}`}>
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow">
                <stat.icon className="w-5 h-5 text-blue-600" />
              </div>
            </div>

            <h3 className="font-semibold text-slate-900 mb-1">{stat.title}</h3>
            <p className="text-sm text-slate-600">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* 🔹 GLOBAL PROGRESS INDICATOR */}
      <div className="mb-8">
        <OnboardingProgress currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      {/* CTA */}
      <Button
        onClick={onFinish}
        className="bg-linear-to-r from-blue-600 to-teal-600 text-white rounded-xl h-14 px-10 shadow-lg"
      >
        {completionScreen.primaryButtonText}
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>

      {/* Footer */}
      <div className="mt-8 text-sm text-slate-500">
        {completionScreen.footerText}
      </div>

      <button
        onClick={onBack}
        className="mt-4 text-sm text-slate-400 hover:text-slate-600 flex items-center justify-center gap-2 mx-auto"
      >
        <ArrowLeft className="w-4 h-4" />
        {completionScreen.backText}
      </button>
    </div>
  );
}
