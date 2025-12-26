"use client";
import { Edit2, Trash2 } from "lucide-react";
import { getEventStyle, getEventDotColor, getEventTypeById } from "../../../../config/calender.config";
import type { CalendarEvent } from "../../../../models/calendar-config.model";

interface AgendaViewProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onDeleteEvent: (id: string) => void;
  formatDate: (date: Date) => string;
  formatTime: (timeString: string) => string;
}

export default function AgendaView({
  events,
  onEventClick,
  onDeleteEvent,
  formatDate,
  formatTime,
}: AgendaViewProps) {
  return (
    <div className="p-6">
      <h3 className="font-semibold text-lg mb-4">Upcoming Events</h3>
      {events.length > 0 ? (
        <div className="space-y-3">
          {events.map((event) => {
            const eventType = getEventTypeById(event.eventTypeId);
            return (
              <div
                key={event.id}
                className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${getEventDotColor(
                        event.eventTypeId
                      )}`}
                    ></div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {event.title}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {formatDate(event.date)} • {formatTime(event.startTime)} -{" "}
                        {formatTime(event.endTime)}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getEventStyle(
                            event.eventTypeId
                          )}`}
                        >
                          {eventType?.name}
                        </span>
                        {event.classSection && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                            {event.classSection}
                          </span>
                        )}
                        {event.teacher && event.teacher !== "Select Teacher" && (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                            {event.teacher}
                          </span>
                        )}
                      </div>
                      {event.description && (
                        <p className="text-sm text-gray-500 mt-2">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEventClick(event)}
                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => onDeleteEvent(event.id)}
                      className="p-2 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">No upcoming events</p>
      )}
    </div>
  );
}