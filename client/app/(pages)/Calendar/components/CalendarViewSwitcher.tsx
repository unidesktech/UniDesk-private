"use client";
import { calendarConfig } from "../../../config/calender.config";
import { CalendarView } from "../../../config/calender.config";

interface CalendarViewSwitcherProps {
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
}

export default function CalendarViewSwitcher({
  view,
  onViewChange,
}: CalendarViewSwitcherProps) {
  return (
    <div className="inline-flex bg-gray-100 rounded-xl p-1">
      {calendarConfig.calendarViews.map((v) => {
        const Icon = v.icon;
        return (
          <button
            key={v.id}
            onClick={() => onViewChange(v.type)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === v.type
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{v.name}</span>
          </button>
        );
      })}
    </div>
  );
}