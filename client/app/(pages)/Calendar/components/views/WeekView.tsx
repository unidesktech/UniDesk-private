"use client";
import { calendarConfig } from "../../../../config/calender.config";
import { getEventStyle, getEventDotColor } from "../../../../config/calender.config";
import type { CalendarEvent } from "../../../../models/calendar-config.model";

interface WeekViewProps {
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

export default function WeekView({
  currentDate,
  events,
  filterState,
  searchQuery,
  onEventClick,
  onDeleteEvent,
  onCellClick,
  getEventsForDate,
  formatDate,
  formatTime,
}: WeekViewProps) {
  const getWeekDays = () => {
    const result = [];
    const current = new Date(currentDate);
    const day = current.getDay();
    current.setDate(current.getDate() - day);

    for (let i = 0; i < 7; i++) {
      const date = new Date(current);
      date.setDate(date.getDate() + i);
      result.push(date);
    }

    return result;
  };

  const getDayHours = () => {
    return calendarConfig.dateConfig.hours;
  };

  const weekDays = getWeekDays();
  const hours = getDayHours();

  return (
    <div className="grid grid-cols-8">
      <div className="border-r border-t"></div>

      {weekDays.map((date, index) => {
        const isToday =
          date.getDate() === new Date().getDate() &&
          date.getMonth() === new Date().getMonth() &&
          date.getFullYear() === new Date().getFullYear();
        return (
          <div key={index} className="border-r border-t p-3 text-center">
            <div className="font-medium text-gray-500">
              {calendarConfig.dateConfig.days[date.getDay()]}
            </div>
            <div
              className={`mt-1 inline-flex items-center justify-center w-8 h-8 rounded-full ${
                isToday ? "bg-blue-600 text-white" : "text-gray-700"
              }`}
            >
              {date.getDate()}
            </div>
          </div>
        );
      })}

      {hours.map((hour, hourIndex) => (
        <div key={`hour-${hourIndex}`} className="contents">
          <div className="border-t p-2 text-xs text-gray-500 border-r">
            {hour <= 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`}
          </div>
          {weekDays.map((date, dayIndex) => {
            const eventsForDay = getEventsForDate(date);
            const eventsForHour = eventsForDay.filter((event) => {
              if (!event.startTime) return false;
              const eventHour = parseInt(event.startTime.split(":")[0]);
              return eventHour === hour;
            });

            return (
              <div
                key={`cell-${hourIndex}-${dayIndex}`}
                className="border-t border-r p-1 min-h-[60px] hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  const newDate = new Date(date);
                  newDate.setHours(hour, 0, 0, 0);
                  onCellClick(newDate);
                }}
              >
                {eventsForHour.map((event) => (
                  <div
                    key={event.id}
                    className={`${getEventStyle(
                      event.eventTypeId
                    )} text-xs p-1 rounded mb-1 truncate`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-1">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${getEventDotColor(
                          event.eventTypeId
                        )}`}
                      ></span>
                      <span>{event.title}</span>
                    </div>
                    <div className="text-xs opacity-75 mt-0.5">
                      {formatTime(event.startTime)} - {formatTime(event.endTime)}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}