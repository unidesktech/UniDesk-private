// components/WelcomeScreen.tsx
'use client';

import React from 'react';
import { ArrowRight, BookOpen, Users, BarChart } from 'lucide-react';
import { Button } from "../../../components/ui/button";
import { WelcomeScreenProps } from '../../../models/onboarding-config.model';
import { onboardingConfig } from '../../../config/onboarding.config';
import { OnboardingProgress } from './OnboardingProgress';


export function WelcomeScreen({ onNext, onSkip, currentStep, totalSteps }: WelcomeScreenProps) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 lg:p-12 animate-in fade-in duration-500 w-full max-w-5xl">
      {/* Illustration Section */}
      <div className="mb-8 relative">
        <div className="flex justify-center items-center gap-6 mb-8">
          {/* First Card - Academic Overview */}
          <div className="relative">
            <div className="w-32 h-32 bg-linear-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center transform rotate-12 shadow-lg">
              <BookOpen className="w-16 h-16 text-blue-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center shadow-md">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
          </div>

          {/* Second Card - Student Management */}
          <div className="relative">
            <div className="w-40 h-40 bg-linear-to-br from-teal-100 to-teal-200 rounded-3xl flex items-center justify-center shadow-xl">
              <Users className="w-20 h-20 text-teal-600" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
              <BarChart className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Third Card - Analytics Dashboard */}
          <div className="relative">
            <div className="w-32 h-32 bg-linear-to-br from-blue-100 to-teal-100 rounded-3xl flex items-center justify-center transform -rotate-12 shadow-lg">
              <BarChart className="w-16 h-16 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Decorative dots */}
        <div className="absolute top-0 left-10 w-2 h-2 bg-blue-300 rounded-full opacity-60" />
        <div className="absolute top-10 right-20 w-3 h-3 bg-teal-300 rounded-full opacity-60" />
        <div className="absolute bottom-5 left-20 w-2 h-2 bg-blue-400 rounded-full opacity-60" />
      </div>

      {/* Content */}
      <div className="text-center mb-10">
        <h1 className="text-xl font-bold text-slate-900 mb-4">
          {onboardingConfig.welcomeTitle}
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          {onboardingConfig.welcomeDescription}
        </p>
      </div>

      {/* 🔹 GLOBAL PROGRESS INDICATOR */}
        <div className="mb-8">
          <OnboardingProgress
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          onClick={onNext}
          size="lg"
          className="bg-linear-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-xl h-14 px-8 min-w-[200px] shadow-lg"
        >
          {onboardingConfig.ctaButton}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        
        <button
          onClick={onSkip}
          className="text-slate-600 hover:text-slate-900 text-sm underline underline-offset-4"
        >
          {onboardingConfig.skipButton}
        </button>
      </div>

      {/* Trust indicators */}
      <div className="mt-10 pt-8 border-t border-slate-200">
        <div className="flex flex-wrap justify-center gap-8 text-slate-500 text-sm">
          {onboardingConfig.trustIndicators.map((indicator, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: indicator.dotColor }}
              />
              <span>{indicator.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}