"use client";
import { useState, useEffect, useRef } from "react";
import { calendarConfig, getFilterById } from "../config/calender.config";
import type {
  CalendarView,
  CalendarEvent,
  CalendarViewFor
} from "../models/calendar-config.model";

export const useCalendar = () => {
  // State from config
  const [currentDate, setCurrentDate] = useState<Date>(
    calendarConfig.dateConfig.initialDate
  );
  const [view, setView] = useState<CalendarView>(
    calendarConfig.ui.defaultCalendarView
  );
  const [events, setEvents] = useState<CalendarEvent[]>(
    calendarConfig.sampleEvents
  );

  const [activeCalendarForId, setActiveCalendarForId] = useState<string>(
    calendarConfig.defaultViewCalendar
  );
  // const [currentUserView, setCurrentUserView] = useState<UserView>(
  //   getUserViewById(calendarConfig.defaultUserView) ||
  //     calendarConfig.userViews[0]
  // );

  // UI State
  const [searchQuery, setSearchQuery] = useState("");
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [globalSearch, setGlobalSearch] = useState("");
  const [viewDropdownOpen, setViewDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] =
    useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Event Form State
  const [newEvent, setNewEvent] = useState(() => ({
    title: "",
    eventType: calendarConfig.eventTypes[0].id,
    description: "",
    startDate: "",
    endDate: "",
    startTime: "09:00",
    endTime: "10:00",
    recurrence: calendarConfig.recurrenceOptions[0],
    classSection: calendarConfig.classOptions[0],
    teacher: calendarConfig.teacherOptions[0],
    color: calendarConfig.colorOptions[0].value
  }));

  const activeCalendarFor: CalendarViewFor | undefined =
    calendarConfig.viewCalendars.find((v) => v.id === activeCalendarForId);

  // Filter State
  const [filterState, setFilterState] = useState(() => {
    const initialState: Record<string, any> = {};
    calendarConfig.filters.forEach((filter) => {
      initialState[filter.id] = filter.defaultValue;
    });
    return initialState;
  });

  // Refs
  const viewDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);

  const scopedEvents = events.filter(
  (event) =>
    !event.calendarForId ||
    event.calendarForId === activeCalendarForId
);


  // Helper Functions
  const getEventsForDate = (date: Date) => {
  const eventTypeFilter = filterState["event-type"] as string[];

  return scopedEvents.filter(
    (event) =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear() &&
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      eventTypeFilter.includes(event.eventTypeId)
  );
};


  const getAllEvents = () => {
    const eventTypeFilter = filterState["event-type"] as string[];
    return events
      .filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          eventTypeFilter.includes(event.eventTypeId)
      )
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const formatDate = (date: Date) => {
    return `${date.getDate()} ${
      calendarConfig.dateConfig.months[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  const formatTime = (timeString: string = "") => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const handleCreateEvent = () => {
    if (!newEvent.title.trim() || !newEvent.startDate) return;

    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: new Date(newEvent.startDate),
      eventTypeId: newEvent.eventType,
      calendarForId: activeCalendarForId,
      description: newEvent.description,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      endDate: newEvent.endDate ? new Date(newEvent.endDate) : undefined,
      recurrence: newEvent.recurrence,
      classSection: newEvent.classSection,
      teacher: newEvent.teacher
    };

    setEvents((prev) =>
      editingEvent
        ? prev.map((e) =>
            e.id === editingEvent.id ? { ...event, id: editingEvent.id } : e
          )
        : [...prev, event]
    );

    // Reset form
    setNewEvent({
      title: "",
      eventType: calendarConfig.eventTypes[0].id,
      description: "",
      startDate: "",
      endDate: "",
      startTime: "09:00",
      endTime: "10:00",
      recurrence: calendarConfig.recurrenceOptions[0],
      classSection: calendarConfig.classOptions[0],
      teacher: calendarConfig.teacherOptions[0],
      color: calendarConfig.colorOptions[0].value
    });
    setShowEventModal(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const openEventModal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    console.log("Original date:", date.getDate());
    console.log("Formatted date string:", dateStr);

    setSelectedDate(date);
    setNewEvent((prev) => ({
      ...prev,
      startDate: dateStr,
      endDate: dateStr
    }));
    setShowEventModal(true);
  };

  const openEditModal = (event: CalendarEvent) => {
    setEditingEvent(event);

    // Fix for startDate
    const startYear = event.date.getFullYear();
    const startMonth = String(event.date.getMonth() + 1).padStart(2, "0");
    const startDay = String(event.date.getDate()).padStart(2, "0");
    const startDateStr = `${startYear}-${startMonth}-${startDay}`;

    // Fix for endDate if it exists
    let endDateStr = "";
    if (event.endDate) {
      const endYear = event.endDate.getFullYear();
      const endMonth = String(event.endDate.getMonth() + 1).padStart(2, "0");
      const endDay = String(event.endDate.getDate()).padStart(2, "0");
      endDateStr = `${endYear}-${endMonth}-${endDay}`;
    }

    setNewEvent({
      title: event.title,
      eventType: event.eventTypeId,
      description: event.description || "",
      startDate: startDateStr, // Use corrected format
      endDate: endDateStr,
      startTime: event.startTime || "09:00",
      endTime: event.endTime || "10:00",
      recurrence: event.recurrence || calendarConfig.recurrenceOptions[0],
      classSection: event.classSection || calendarConfig.classOptions[0],
      teacher: event.teacher || calendarConfig.teacherOptions[0],
      color: calendarConfig.colorOptions[0].value
    });
    setSelectedDate(event.date);
    setShowEventModal(true);
  };

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

  const handleFilterChange = (filterId: string, value: any) => {
    setFilterState((prev) => ({ ...prev, [filterId]: value }));
  };

  const clearAllEventTypes = () =>
    setFilterState((prev) => ({ ...prev, "event-type": [] }));

  const selectAllEventTypes = () => {
    const filter = getFilterById("event-type");
    if (filter)
      setFilterState((prev) => ({
        ...prev,
        "event-type": filter.options.map((opt) => opt.value)
      }));
  };

  const selectedEventTypesCount = (filterState["event-type"] as string[])
    .length;

  // Navigation functions
  const goToPrevious = () => {
    if (view === "month") {
      setCurrentDate(
        (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
      );
    } else if (view === "week") {
      setCurrentDate((prev) => {
        const newDate = new Date(prev);
        newDate.setDate(newDate.getDate() - 7);
        return newDate;
      });
    } else if (view === "day") {
      setCurrentDate((prev) => {
        const newDate = new Date(prev);
        newDate.setDate(newDate.getDate() - 1);
        return newDate;
      });
    }
  };

  const goToNext = () => {
    if (view === "month") {
      setCurrentDate(
        (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
      );
    } else if (view === "week") {
      setCurrentDate((prev) => {
        const newDate = new Date(prev);
        newDate.setDate(newDate.getDate() + 7);
        return newDate;
      });
    } else if (view === "day") {
      setCurrentDate((prev) => {
        const newDate = new Date(prev);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
      });
    }
  };

  const goToToday = () => setCurrentDate(new Date());

  const getViewTitle = () => {
    if (view === "month") {
      return `${
        calendarConfig.dateConfig.months[currentDate.getMonth()]
      } ${currentDate.getFullYear()}`;
    } else if (view === "week") {
      const weekDays = getWeekDays();
      return `Week of ${formatDate(weekDays[0])}`;
    } else if (view === "day") {
      return formatDate(currentDate);
    } else {
      return "Agenda";
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      [viewDropdownRef, userDropdownRef, notificationDropdownRef].forEach(
        (ref) => {
          if (ref.current && !ref.current.contains(event.target as Node)) {
            if (ref === viewDropdownRef) setViewDropdownOpen(false);
            if (ref === userDropdownRef) setUserDropdownOpen(false);
            if (ref === notificationDropdownRef)
              setNotificationDropdownOpen(false);
          }
        }
      );
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    // State
    currentDate,
    view,
    events,
    activeCalendarForId,
    activeCalendarFor,
    searchQuery,
    showEventModal,
    filterState,
    newEvent,
    editingEvent,
    globalSearch,
    showFilters,
    viewDropdownOpen,
    userDropdownOpen,
    notificationDropdownOpen,
    hasNotifications,
    selectedDate,

    // Refs
    viewDropdownRef,
    userDropdownRef,
    notificationDropdownRef,

    // Actions
    setCurrentDate,
    setView,
    setEvents,
    setActiveCalendarForId, 
    setSearchQuery,
    setShowEventModal,
    setFilterState,
    setNewEvent,
    setEditingEvent,
    setGlobalSearch,
    setShowFilters,
    setViewDropdownOpen,
    setUserDropdownOpen,
    setNotificationDropdownOpen,
    setHasNotifications,
    setSelectedDate,

    // Functions
    handleCreateEvent,
    handleDeleteEvent,
    openEventModal,
    openEditModal,
    handleFilterChange,
    getEventsForDate,
    getAllEvents,
    formatDate,
    formatTime,
    getCalendarDays,
    getWeekDays,
    getDayHours,
    clearAllEventTypes,
    selectAllEventTypes,
    selectedEventTypesCount,
    goToPrevious,
    goToNext,
    goToToday,
    getViewTitle
  };
};
