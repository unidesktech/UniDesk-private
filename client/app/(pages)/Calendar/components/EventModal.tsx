"use client";
import { X, Calendar, Clock, ChevronDown, Paperclip } from "lucide-react";
import {
  calendarConfig,
  generateEventStyles
} from "../../../config/calender.config";

interface EventModalProps {
  newEvent: any;
  setNewEvent: (event: any) => void;
  editingEvent: any;
  onSubmit: () => void;
  onClose: () => void;
}

export default function EventModal({
  newEvent,
  setNewEvent,
  editingEvent,
  onSubmit,
  onClose
}: EventModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-2xl my-8">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {editingEvent ? "Edit Event" : "Create New Event"}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Add an event to the school calendar
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent((prev: any) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter event title"
            />
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {calendarConfig.eventTypes.map((eventType) => {
                const styles = generateEventStyles(eventType.color);
                return (
                  <button
                    key={eventType.id}
                    type="button"
                    onClick={() =>
                      setNewEvent((prev: any) => ({
                        ...prev,
                        eventType: eventType.id
                      }))
                    }
                    className={`px-4 py-3 rounded-lg border text-left transition-all flex items-center gap-3 ${
                      newEvent.eventType === eventType.id
                        ? `${styles.bgColor} ${styles.textColor} border-blue-500 ring-2 ring-blue-200`
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span
                      className={`w-3 h-3 rounded-full ${styles.dotColor}`}
                    ></span>
                    {eventType.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={newEvent.startDate}
                  onChange={(e) =>
                    setNewEvent((prev: any) => ({
                      ...prev,
                      startDate: e.target.value
                    }))
                  }
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={newEvent.endDate}
                  onChange={(e) =>
                    setNewEvent((prev: any) => ({
                      ...prev,
                      endDate: e.target.value
                    }))
                  }
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Times */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="time"
                  value={newEvent.startTime}
                  onChange={(e) =>
                    setNewEvent((prev: any) => ({
                      ...prev,
                      startTime: e.target.value
                    }))
                  }
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="time"
                  value={newEvent.endTime}
                  onChange={(e) =>
                    setNewEvent((prev: any) => ({
                      ...prev,
                      endTime: e.target.value
                    }))
                  }
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Recurrence */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recurrence
            </label>
            <div className="relative">
              <select
                value={newEvent.recurrence}
                onChange={(e) =>
                  setNewEvent((prev: any) => ({
                    ...prev,
                    recurrence: e.target.value
                  }))
                }
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                {calendarConfig.recurrenceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Class/Teacher */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class/Section
              </label>
              <div className="relative">
                <select
                  value={newEvent.classSection}
                  onChange={(e) =>
                    setNewEvent((prev: any) => ({
                      ...prev,
                      classSection: e.target.value
                    }))
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  {calendarConfig.classOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teacher
              </label>
              <div className="relative">
                <select
                  value={newEvent.teacher}
                  onChange={(e) =>
                    setNewEvent((prev: string) => ({
                      ...prev,
                      teacher: e.target.value
                    }))
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  {calendarConfig.teacherOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent((prev: string) => ({
                  ...prev,
                  description: e.target.value
                }))
              }
              rows={4}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Add event description..."
            />
          </div>

          {/* Color Label */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-3">
              Color Label
            </label>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {calendarConfig.colorOptions.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() =>
                    setNewEvent((prev: any) => ({
                      ...prev,
                      color: color.value
                    }))
                  }
                  className={`aspect-square p-0 rounded-lg overflow-hidden transition-all ${
                    newEvent.color === color.value
                      ? "border-4 border-gray-500 shadow-lg scale-110"
                      : "border-2 border-gray-200 hover:border-gray-400 hover:shadow-md"
                  }`}
                >
                  <div className={`w-full h-full ${color.color}`}></div>
                </button>
              ))}
            </div>
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
              <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Click to upload files or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Maximum file size: 10MB
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={!newEvent.title.trim() || !newEvent.startDate}
              className="flex-1 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {editingEvent ? "Update Event" : "Create Event"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
