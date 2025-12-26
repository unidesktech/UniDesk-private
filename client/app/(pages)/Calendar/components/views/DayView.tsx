"use client";
import { Edit2, Trash2 } from "lucide-react";
import { calendarConfig , getEventStyle, getEventDotColor  } from "../../../../config/calender.config";
import type { CalendarEvent } from "../../../../models/calendar-config.model";

interface DayViewProps {
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

export default function DayView({
  currentDate,
  onEventClick,
  onDeleteEvent,
  onCellClick,
  getEventsForDate,
  formatDate,
  formatTime,
}: DayViewProps) {
  const getDayHours = () => {
    return calendarConfig.dateConfig.hours;
  };

  const eventsForDay = getEventsForDate(currentDate);
  const isToday =
    currentDate.getDate() === new Date().getDate() &&
    currentDate.getMonth() === new Date().getMonth() &&
    currentDate.getFullYear() === new Date().getFullYear();
  const hours = getDayHours();

  return (
    <div className="grid grid-cols-2">
      <div className="border-r p-6">
        <h3 className="font-semibold text-lg mb-4">
          {formatDate(currentDate)}{" "}
          {isToday && (
            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full ml-2">
              Today
            </span>
          )}
        </h3>
        {eventsForDay.length > 0 ? (
          <div className="space-y-3">
            {eventsForDay.map((event) => (
              <div
                key={event.id}
                className={`${getEventStyle(
                  event.eventTypeId
                )} p-4 rounded-lg flex justify-between items-center`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2 h-2 rounded-full ${getEventDotColor(
                      event.eventTypeId
                    )}`}
                  ></span>
                  <div>
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm mt-1">
                      {formatTime(event.startTime)} - {formatTime(event.endTime)}
                    </div>
                    {event.classSection && (
                      <div className="text-xs text-gray-500 mt-1">
                        {event.classSection}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onEventClick(event)}>
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDeleteEvent(event.id)}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No events scheduled for today</p>
        )}
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {hours.map((hour) => (
            <div key={hour} className="flex items-center">
              <div className="w-16 text-sm text-gray-500">
                {hour <= 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`}
              </div>
              <div
                className="flex-1 border-t h-16 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setHours(hour, 0, 0, 0);
                  onCellClick(newDate);
                }}
              >
                {eventsForDay
                  .filter((event) => {
                    if (!event.startTime) return false;
                    const eventHour = parseInt(event.startTime.split(":")[0]);
                    return eventHour === hour;
                  })
                  .map((event) => (
                    <div
                      key={event.id}
                      className={`${getEventStyle(
                        event.eventTypeId
                      )} text-xs p-2 rounded m-1`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs opacity-75">
                        {formatTime(event.startTime)} - {formatTime(event.endTime)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}