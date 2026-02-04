"use client";

import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { onboardingConfig } from "../../../config/onboarding.config";
import { FeatureScreenProps } from "../../../models/onboarding-config.model";
import { OnboardingProgress } from "./OnboardingProgress";

export function FeatureScreen({ onNext, onBack, currentStep, totalSteps }: FeatureScreenProps) {
  const { featureScreen } = onboardingConfig;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 lg:p-12 w-full max-w-6xl">
      {/* Badge */}
      <div className="flex justify-center mb-4">
        <span className="px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
          {featureScreen.badgeText}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-slate-900 mb-3">
        {featureScreen.title}
      </h2>
      <p className="text-center text-slate-600 max-w-2xl mx-auto mb-10">
        {featureScreen.description}
      </p>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {featureScreen.features.map((feature) => (
          <div
            key={feature.id}
            className="border border-slate-200 rounded-2xl p-6 hover:shadow-md transition"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.iconBgColor}`}
            >
               <feature.icon className="w-6 h-6 text-blue-600" />
            </div>

            <h3 className="font-semibold text-slate-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-slate-600">{feature.description}</p>
          </div>
        ))}
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
          Next Step
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
