"use client";
import { Search, Filter } from "lucide-react";
import { useCalendar } from "../../hooks/useCalendar";
// import TopNavigationBar from "./components/TopNavigationBar";
import CalendarHeader from "./components/CalendarHeader";
import FiltersSidebar from "./components/FiltersSidebar";
import CalendarViewSwitcher from "./components/CalendarViewSwitcher";
import CalendarControls from "./components/CalendarControls";
import MonthView from "./components/views/MonthView";
import WeekView from "./components/views/WeekView";
import DayView from "./components/views/DayView";
import AgendaView from "./components/views/AgendaView";
import EventModal from "./components/EventModal";
import { calendarConfig } from "../../config/calender.config";
import { BreadcrumbComponent } from "@/app/components/Breadcrumb/BreadcrumbComponent";
import CalendarViewForSwitcher from "./components/CalendarViewForSwitcher";


export default function SchoolCalendarPage() {
  const {
    // State
    currentDate,
    view,
    events,
    activeCalendarFor,
    searchQuery,
    showEventModal,
    filterState,
    newEvent,
    editingEvent,
    showFilters,

    // Actions
    setView,
    setSearchQuery,
    setActiveCalendarForId,
    setShowEventModal,
    setNewEvent,
    setEditingEvent,
    setShowFilters,

    // Functions
    handleCreateEvent,
    handleDeleteEvent,
    openEventModal,
    openEditModal,
    handleFilterChange,
    getEventsForDate,
    getAllEvents,
    getViewTitle,
    goToPrevious,
    goToNext,
    goToToday,
    formatDate,
    formatTime,
    selectedEventTypesCount,
    clearAllEventTypes,
    selectAllEventTypes
  } = useCalendar();

  const handleCreateEventClick = () => {
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
    setEditingEvent(null);
    setShowEventModal(true);
  };

  const renderCalendarView = () => {
    switch (view) {
      case "month":
        return (
          <MonthView
            currentDate={currentDate}
            events={events}
            filterState={filterState}
            searchQuery={searchQuery}
            onEventClick={openEditModal}
            onDeleteEvent={handleDeleteEvent}
            onCellClick={openEventModal}
            getEventsForDate={getEventsForDate}
            formatDate={formatDate}
            formatTime={formatTime}
          />
        );
      case "week":
        return (
          <WeekView
            currentDate={currentDate}
            events={events}
            filterState={filterState}
            searchQuery={searchQuery}
            onEventClick={openEditModal}
            onDeleteEvent={handleDeleteEvent}
            onCellClick={openEventModal}
            getEventsForDate={getEventsForDate}
            formatDate={formatDate}
            formatTime={formatTime}
          />
        );
      case "day":
        return (
          <DayView
            currentDate={currentDate}
            events={events}
            filterState={filterState}
            searchQuery={searchQuery}
            onEventClick={openEditModal}
            onDeleteEvent={handleDeleteEvent}
            onCellClick={openEventModal}
            getEventsForDate={getEventsForDate}
            formatDate={formatDate}
            formatTime={formatTime}
          />
        );
      case "agenda":
        return (
          <AgendaView
            events={getAllEvents()}
            onEventClick={openEditModal}
            onDeleteEvent={handleDeleteEvent}
            formatDate={formatDate}
            formatTime={formatTime}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <TopNavigationBar
        currentUserView={currentUserView}
        setCurrentUserView={setCurrentUserView}
        globalSearch={globalSearch}
        setGlobalSearch={setGlobalSearch}
      /> */}
      
      <div className="p-6 space-y-6">
        {/* Use bread crumb */}
        <BreadcrumbComponent />

        {/* Pass the create event handler to CalendarHeader */}
        <CalendarHeader onCreateEvent={handleCreateEventClick} />

        <CalendarViewForSwitcher
          activeId={activeCalendarFor}
          onChange={setActiveCalendarForId}
        />

        {/* Search + Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" /> Filters
                {selectedEventTypesCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {selectedEventTypesCount}
                  </span>
                )}
              </button>
              <button
                onClick={clearAllEventTypes}
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {showFilters && (
          <FiltersSidebar
            filterState={filterState}
            onFilterChange={handleFilterChange}
            onClose={() => setShowFilters(false)}
            onSelectAll={selectAllEventTypes}
          />
        )}

        <CalendarViewSwitcher view={view} onViewChange={setView} />

        <div className="bg-white rounded-xl border shadow-sm">
          <CalendarControls
            viewTitle={getViewTitle()}
            onPrevious={goToPrevious}
            onNext={goToNext}
            onToday={goToToday}
          />

          {renderCalendarView()}
        </div>
      </div>

      {showEventModal && (
        <EventModal
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          editingEvent={editingEvent}
          onSubmit={handleCreateEvent}
          onClose={() => {
            setShowEventModal(false);
            setEditingEvent(null);
          }}
        />
      )}
    </div>
  );
}
