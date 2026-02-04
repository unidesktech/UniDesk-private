'use client';

import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { FeatureScreen } from './components/FeatureScreen';
import { QuickSetupScreen } from './components/QuickSetupScreen';
import { CompletionScreen } from './components/CompletionScreen';
import { onboardingConfig } from '../../config/onboarding.config';

export default function OnboardingPage() {
    const [step, setStep] = useState(onboardingConfig.initialStep);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">

        {/* 🔹 SCREENS */}
        {step === 0 && (
          <WelcomeScreen
            onNext={() => setStep(1)}
            onSkip={() => setStep(onboardingConfig.totalSteps - 1)}
            currentStep={step}
            totalSteps={onboardingConfig.totalSteps}
          />
        )}

        {step === 1 && (
          <FeatureScreen
            onNext={() => setStep(2)}
            onBack={() => setStep(0)}
            currentStep={step}
            totalSteps={onboardingConfig.totalSteps}
          />
        )}

        {step === 2 && (
          <QuickSetupScreen
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
            currentStep={step}
            totalSteps={onboardingConfig.totalSteps}
          />
        )}

        {step === 3 && (
          <CompletionScreen
            onFinish={() => console.log('Go to dashboard')}
            onBack={() => setStep(2)}
            currentStep={step}
            totalSteps={onboardingConfig.totalSteps}
          />
        )}
      </div>
    </div>
  );
}
