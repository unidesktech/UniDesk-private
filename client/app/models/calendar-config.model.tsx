import { IconType } from "./types/icon.type";

export type CalendarView = "month" | "week" | "day" | "agenda";

export interface EventType {
  id: string;
  name: string;
  color: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  eventTypeId: string;
  calendarForId?: string, 
  description?: string;
  startTime: string;
  endTime: string;
  endDate?: Date;
  recurrence?: string;
  classSection?: string;
  teacher?: string;
  attachments?: string[];
}

export interface FilterOption {
  id: string;
  label: string;
  type: 'select' | 'multiselect' | 'checkbox';
  options: Array<{
    value: string;
    label: string;
    color?: string;
  }>;
  defaultValue: string | string[];
}

export interface HeaderButton {
  id: string;
  label: string;
  icon: string | null;
  variant: 'primary' | 'secondary';
  action: 'export' | 'print' | 'subscribe' | 'create-event';
}

export interface ViewOption {
  id: string;
  name: string;
  type: CalendarView;
  icon: IconType
}

export interface UserView {
  id: string;
  name: string;
  role: string;
  initials: string;
  email: string;
}


export type CalendarViewRole =
  | "student"
  | "parent"
  | "teacher"
  | "admin"
  | "principal";

export interface CalendarViewFor {
  id: string;
  name: string;
  initials: string;
  role: CalendarViewRole;
  grade?: string; // only for students
}


export interface ModalField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'textarea' | 'date' | 'time' | 'color' | 'file';
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

export interface CalendarConfig {
  // Event Types
  eventTypes: EventType[];
  
  // Calendar Views
  calendarViews: ViewOption[];
  
  // User Views (Student, Admin, etc.)
  // userViews: UserView[];
  // defaultUserView: string;


  viewCalendars: CalendarViewFor[];
  defaultViewCalendar: string;
  
  // Filter Options
  filters: FilterOption[];
  
  // Event Modal Fields
  eventModalFields: ModalField[];
  
  // Options
  classOptions: string[];
  teacherOptions: string[];
  recurrenceOptions: string[];
  colorOptions: Array<{ value: string; label: string; color: string }>;
  
  // Sample Events
  sampleEvents: CalendarEvent[];
  
  // UI Config
  ui: {
    headerButtons: HeaderButton[];
    showNotificationBell: boolean;
    showUserDropdown: boolean;
    defaultCalendarView: CalendarView;
    topBarConfig: {
      showGlobalSearch: boolean;
      showNotification: boolean;
      showViewSelector: boolean;
      showUserProfile: boolean;
    };
  };
  
  // Date Config
  dateConfig: {
    days: string[];
    months: string[];
    initialDate: Date;
    timeSlots: string[];
    hours: number[];
  };
}