"use client";
import { User } from "lucide-react";
import clsx from "clsx";
import { calendarConfig } from "@/app/config/calender.config";

export default function CalendarViewForSwitcher({
  activeId ,
  onChange,
}: {
  activeId: string | undefined;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-primary from-blue-50 to-cyan-50 border">
      <div className="flex items-center gap-2 text-sm text-gray-600 ">
        <User className="w-4 h-4" />
        <span>View calendar for:</span>
      </div>

      <div className="flex gap-3">
        {calendarConfig.viewCalendars.map((user) => (
          <button
            key={user.id}
            onClick={() => onChange(user.id)}
            className={clsx(
              "flex items-center gap-3 px-4 py-2 rounded-lg border transition-all",
              activeId === user.id
                ? "bg-white border-blue-300 shadow-sm"
                : "bg-white/60 border-gray-200 hover:bg-white"
            )}
          >
            <div
              className={clsx(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
                activeId === user.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              )}
            >
              {user.initials}
            </div>

            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">
                {user.name}
              </div>
              <div className="text-xs text-gray-500">
                {user.grade}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
