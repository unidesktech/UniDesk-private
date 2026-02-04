"use client";

import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { onboardingConfig } from "../../../config/onboarding.config";
import { QuickSetupScreenProps } from "../../../models/onboarding-config.model";
import { OnboardingProgress } from "./OnboardingProgress";

export function QuickSetupScreen({
  onNext,
  onBack,
  currentStep,
  totalSteps
}: QuickSetupScreenProps) {
  const { quickSetupScreen } = onboardingConfig;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 lg:p-12 w-full max-w-6xl">
      {/* Badge */}
      <div className="flex justify-center mb-4">
        <span className="px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
          {quickSetupScreen.badgeText}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-slate-900 mb-3">
        {quickSetupScreen.title}
      </h2>
      <p className="text-center text-slate-600 max-w-2xl mx-auto mb-10">
        {quickSetupScreen.description}
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {quickSetupScreen.setupItems.map((item) => (
          <div
            key={item.id}
            className="border border-slate-200 rounded-2xl p-6"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.iconBgColor}`}
            >
              <item.icon className="w-6 h-6 text-blue-600" />
            </div>

            <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
            <p className="text-sm text-slate-600 mb-4">{item.description}</p>

            {item.actionText && (
              <Button
                className={`w-full h-11 rounded-xl ${
                  item.actionColor === "teal"
                    ? "bg-teal-600 hover:bg-teal-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                <Plus className="w-4 h-4 mr-2" />
                {item.actionText}
              </Button>
            )}
          </div>
        ))}

        {/* Empty Card */}
        <div className="border border-dashed border-slate-300 rounded-2xl p-6 flex flex-col justify-center text-center text-slate-500">
          <h3 className="font-medium mb-2">
            {quickSetupScreen.emptyCard.title}
          </h3>
          <p className="text-sm">{quickSetupScreen.emptyCard.description}</p>
        </div>
      </div>

      {/* Pro Tip */}
      <div className="border border-blue-200 bg-blue-50 rounded-2xl p-4 flex items-start gap-3 mb-10">
        <div className="mt-1">
          <quickSetupScreen.proTip.icon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p className="font-medium text-slate-900">
            {quickSetupScreen.proTip.title}
          </p>
          <p className="text-sm text-slate-600">
            {quickSetupScreen.proTip.description}
          </p>
        </div>
      </div>

      {/* 🔹 GLOBAL PROGRESS INDICATOR */}
      <div className="mb-8">
        <OnboardingProgress currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={onBack}
          className="rounded-xl h-12 px-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Button
          onClick={onNext}
          className="bg-linear-to-r from-blue-600 to-teal-600 text-white rounded-xl h-12 px-8"
        >
          {quickSetupScreen.nextButtonText}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
