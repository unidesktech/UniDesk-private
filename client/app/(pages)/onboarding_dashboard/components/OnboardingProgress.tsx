'use client';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingProgress({
  currentStep,
  totalSteps
}: OnboardingProgressProps) {
  return (
    <div className="flex justify-center items-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`transition-all duration-300 rounded-full ${
            index === currentStep
              ? 'w-8 h-3 bg-linear-to-r from-blue-600 to-teal-600'
              : index < currentStep
              ? 'w-3 h-3 bg-blue-600'
              : 'w-3 h-3 bg-slate-300'
          }`}
        />
      ))}
    </div>
  );
}
