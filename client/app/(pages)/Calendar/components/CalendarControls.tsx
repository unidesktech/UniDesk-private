"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarControlsProps {
  viewTitle: string;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
}

export default function CalendarControls({
  viewTitle,
  onPrevious,
  onNext,
  onToday,
}: CalendarControlsProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">{viewTitle}</h2>
        <button
          onClick={onToday}
          className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
        >
          Today
        </button>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onPrevious}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}