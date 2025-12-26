"use client";
import { Edit2, Trash2 } from "lucide-react";
import { getEventStyle, getEventDotColor } from "../../../../config/calender.config";
import type { CalendarEvent } from "../../../../models/calendar-config.model";

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  filterState: Record<string, any>;
  searchQuery: string;
  onEventClick: (event: CalendarEvent) => void;
  onDeleteEvent: (id: string) => void;
  onCellClick: (date: Date) => void;
  getEventsForDate: (date: Date) => CalendarEvent[];
  formatDate: (date: Date) => string;
  formatTime: (timeString: string) => string;
}

export default function MonthView({
  currentDate,
  onEventClick,
  onDeleteEvent,
  onCellClick,
  getEventsForDate,
 
}: MonthViewProps) {
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = Array.from({ length: startingDay }, () => null);
    return [
      ...days,
      ...Array.from(
        { length: daysInMonth },
        (_, i) => new Date(year, month, i + 1)
      )
    ];
  };

  const days = getCalendarDays();

  return (
    <div className="grid grid-cols-7">
      {days.map((date, index) => {
        if (!date)
          return (
            <div
              key={index}
              className="min-h-[120px] border-t border-r p-3"
            ></div>
          );

        const isToday =
          date.getDate() === new Date().getDate() &&
          date.getMonth() === new Date().getMonth() &&
          date.getFullYear() === new Date().getFullYear();

        return (
          <div
            key={index}
            className="min-h-[120px] border-t border-r p-3 text-sm relative last:border-r-0 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onCellClick(date)}
          >
            <div className="flex justify-between items-start mb-2">
              <span
                className={`inline-flex items-center justify-center w-7 h-7 text-gray-600 ${
                  isToday ? "bg-blue-600 text-white rounded-full" : ""
                }`}
              >
                {date.getDate()}
              </span>
              {isToday && (
                <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                  Today
                </span>
              )}
            </div>

            {getEventsForDate(date).map((event) => (
              <div
                key={event.id}
                className={`mt-1 ${getEventStyle(
                  event.eventTypeId
                )} text-xs px-2 py-1.5 rounded flex justify-between items-center group`}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${getEventDotColor(
                      event.eventTypeId
                    )}`}
                  ></span>
                  <span className="truncate">{event.title}</span>
                </div>
                <div className="hidden group-hover:flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                    className="p-0.5 hover:bg-white/30 rounded"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteEvent(event.id);
                    }}
                    className="p-0.5 hover:bg-white/30 rounded"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}