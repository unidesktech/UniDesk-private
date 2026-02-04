// models/onboarding.model.ts

import { IconType } from "./types/icon.type";

export interface TrustIndicator {
  text: string;
  dotColor: string;
}

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: IconType;
  bgColor: string;
  gradientFrom: string;
  gradientTo: string;
  floatingIcon: IconType;
  floatingColor: string;
  floatingPosition: 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right';
}

export interface WelcomeScreenProps {
  onNext: () => void;
  onSkip: () => void;
  currentStep: number;
  totalSteps: number;
}


export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  iconBgColor: string;
}

export interface FeatureScreenProps {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export interface QuickSetupItem {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  iconBgColor: string;
  actionText?: string;
  actionColor?: 'blue' | 'teal';
}

export interface QuickSetupScreenProps {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export interface CompletionStat {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  bgColor: string;
}

export interface CompletionScreenProps {
  onFinish: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}
