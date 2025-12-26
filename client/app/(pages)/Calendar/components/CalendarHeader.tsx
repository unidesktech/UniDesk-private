"use client";
import { Download, Printer, Plus } from "lucide-react";
import { calendarConfig } from "../../../config/calender.config";

const iconMap: Record<string, any> = {
  Download,
  Printer,
  Plus,
};

interface CalendarHeaderProps {
  onCreateEvent?: () => void;
}

export default function CalendarHeader({ onCreateEvent }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          School Calendar
        </h1>
        <p className="text-gray-500">
          View and manage school-wide events and schedules
        </p>
      </div>

      <div className="flex items-center gap-2">
        {calendarConfig.ui.headerButtons.map((button) => {
          const Icon = button.icon ? iconMap[button.icon] : null;
          return (
            <button
              key={button.id}
              onClick={button.action === "create-event" ? onCreateEvent : undefined}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                button.variant === "primary"
                  ? "text-white bg-blue-600 hover:bg-blue-700"
                  : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {Icon && <Icon className="w-4 h-4" />}
              {button.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}