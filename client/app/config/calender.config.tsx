// calendar-config.tsx
import { CalendarConfig } from '../models/calendar-config.model';
import { Calendar, Columns, Clock, List } from "lucide-react";


export const calendarConfig: CalendarConfig = {
  // Event Types
  eventTypes: [
    {
      id: "general-event",
      name: "General Event",
      color: "bg-blue-500",
    },
    {
      id: "holiday",
      name: "Holiday",
      color: "bg-orange-500",
    },
    {
      id: "exam",
      name: "Exam",
      color: "bg-purple-500",
    },
    {
      id: "meeting-ptm",
      name: "Meeting/PTM",
      color: "bg-green-500",
    },
    {
      id: "homework-deadline",
      name: "Homework Deadline",
      color: "bg-yellow-500",
    },
    {
      id: "school-activity",
      name: "School Activity",
      color: "bg-red-500",
    },
  ],


  // Calendar Views
  calendarViews: [
    { id: "month", name: "Month", type: "month", icon: Calendar },
    { id: "week", name: "Week", type: "week", icon: Columns },
    { id: "day", name: "Day", type: "day", icon: Clock },
    { id: "agenda", name: "Agenda", type: "agenda", icon: List },
  ],

  viewCalendars: [
  {
    id: "emma-johnson",
    name: "Emma Johnson",
    grade: "Grade 10A",
    initials: "EJ",
    role: "student",
  },
  {
    id: "liam-johnson",
    name: "Liam Johnson",
    grade: "Grade 7B",
    initials: "LJ",
    role: "student",
  },
  {
    id: "olivia-johnson",
    name: "Olivia Johnson",
    grade: "Grade 5A",
    initials: "OJ",
    role: "student",
  },
],

defaultViewCalendar: "emma-johnson",


  // User Views (Student, Admin, etc.)
  // userViews: [
  //   {
  //     id: "student-view",
  //     name: "Student View",
  //     role: "Student",
  //     initials: "SD",
  //     email: "student@school.edu"
  //   },
  //   {
  //     id: "teacher-view",
  //     name: "Teacher View",
  //     role: "Teacher",
  //     initials: "TR",
  //     email: "teacher@school.edu"
  //   },
  //   {
  //     id: "parent-view",
  //     name: "Parent View",
  //     role: "Parent",
  //     initials: "PR",
  //     email: "parent@school.edu"
  //   },
  //   {
  //     id: "admin-view",
  //     name: "Admin View",
  //     role: "Administrator",
  //     initials: "AD",
  //     email: "admin@school.edu"
  //   },
  //   {
  //     id: "principal-view",
  //     name: "Principal View",
  //     role: "Principal",
  //     initials: "PL",
  //     email: "principal@school.edu"
  //   },
  //   {
  //     id: "super-admin-view",
  //     name: "Super Admin View",
  //     role: "Super Admin",
  //     initials: "SA",
  //     email: "superadmin@school.edu"
  //   }
  // ],
  // defaultUserView: "admin-view",

  // Filter Options
  filters: [
    {
      id: "event-type",
      label: "Event Types",
      type: "multiselect",
      options: [
        { value: "general-event", label: "General Event", color: "bg-blue-500" },
        { value: "holiday", label: "Holiday", color: "bg-orange-500" },
        { value: "exam", label: "Exam", color: "bg-purple-500" },
        { value: "meeting-ptm", label: "Meeting/PTM", color: "bg-green-500" },
        { value: "homework-deadline", label: "Homework Deadline", color: "bg-yellow-500" },
        { value: "school-activity", label: "School Activity", color: "bg-red-500" }
      ],
      defaultValue: [
        "general-event", 
        "holiday", 
        "exam", 
        "meeting-ptm", 
        "homework-deadline", 
        "school-activity"
      ]
    },
    {
      id: "class-section",
      label: "Class/Section",
      type: "select",
      options: [
        { value: "all-classes", label: "All Classes" },
        { value: "grade-10-a", label: "Grade 10 - A" },
        { value: "grade-10-b", label: "Grade 10 - B" },
        { value: "grade-11-a", label: "Grade 11 - A" },
        { value: "grade-11-b", label: "Grade 11 - B" },
        { value: "grade-12-a", label: "Grade 12 - A" },
        { value: "grade-12-b", label: "Grade 12 - B" }
      ],
      defaultValue: "all-classes"
    },
    {
      id: "teacher",
      label: "Teacher",
      type: "select",
      options: [
        { value: "all-teachers", label: "All Teachers" },
        { value: "mr-johnson", label: "Mr. Johnson" },
        { value: "ms-smith", label: "Ms. Smith" },
        { value: "dr-williams", label: "Dr. Williams" },
        { value: "mrs-brown", label: "Mrs. Brown" },
        { value: "mr-davis", label: "Mr. Davis" },
        { value: "ms-wilson", label: "Ms. Wilson" }
      ],
      defaultValue: "all-teachers"
    }
  ],

  // Event Modal Fields
  eventModalFields: [
    {
      id: "title",
      label: "Event Title",
      type: "text",
      required: true,
      placeholder: "Enter event title"
    },
    {
      id: "eventType",
      label: "Event Type",
      type: "select",
      required: true
    },
    {
      id: "startDate",
      label: "Start Date",
      type: "date",
      required: true
    },
    {
      id: "endDate",
      label: "End Date",
      type: "date",
      required: false
    },
    {
      id: "startTime",
      label: "Start Time",
      type: "time",
      required: false
    },
    {
      id: "endTime",
      label: "End Time",
      type: "time",
      required: false
    },
    {
      id: "recurrence",
      label: "Recurrence",
      type: "select",
      required: false
    },
    {
      id: "classSection",
      label: "Class/Section",
      type: "select",
      required: false
    },
    {
      id: "teacher",
      label: "Teacher",
      type: "select",
      required: false
    },
    {
      id: "description",
      label: "Description",
      type: "textarea",
      required: false,
      placeholder: "Add event description..."
    },
    {
      id: "color",
      label: "Color Label",
      type: "color",
      required: false
    },
    {
      id: "attachments",
      label: "Attachments",
      type: "file",
      required: false
    }
  ],

  // Options
  classOptions: [
    "All Classes",
    "Grade 10 - A",
    "Grade 10 - B",
    "Grade 11 - A",
    "Grade 11 - B",
    "Grade 12 - A",
    "Grade 12 - B"
  ],

  teacherOptions: [
    "Select Teacher",
    "Mr. Johnson",
    "Ms. Smith",
    "Dr. Williams",
    "Mrs. Brown",
    "Mr. Davis",
    "Ms. Wilson"
  ],

  recurrenceOptions: [
    "Does not repeat",
    "Daily",
    "Weekly",
    "Monthly",
    "Yearly",
    "Custom..."
  ],

  colorOptions: [
    { value: "bg-blue-100 text-blue-700 border-blue-300", label: "Blue", color: "bg-blue-500" },
    { value: "bg-red-100 text-red-700 border-red-300", label: "Red", color: "bg-red-500" },
    { value: "bg-green-100 text-green-700 border-green-300", label: "Green", color: "bg-green-500" },
    { value: "bg-purple-100 text-purple-700 border-purple-300", label: "Purple", color: "bg-purple-500" },
    { value: "bg-orange-100 text-orange-700 border-orange-300", label: "Orange", color: "bg-orange-500" },
    { value: "bg-indigo-100 text-indigo-700 border-indigo-300", label: "Indigo", color: "bg-indigo-500" },
    { value: "bg-yellow-100 text-yellow-700 border-yellow-300", label: "Yellow", color: "bg-yellow-500" },
    { value: "bg-pink-100 text-pink-700 border-pink-300", label: "Pink", color: "bg-pink-500" },
  ],

  // Sample Events
  sampleEvents: [
    { 
      id: "1", 
      title: "Winter Holiday", 
      date: new Date(2025, 11, 23), 
      eventTypeId: "holiday",
      calendarForId:"emma-johnson",
      startTime: "09:00",
      endTime: "15:00",
      classSection: "All Classes"
    },
    { 
      id: "2", 
      title: "Semester Exam", 
      date: new Date(2025, 11, 14), 
      eventTypeId: "exam",
      calendarForId:"emma-johnson",
      startTime: "10:00",
      endTime: "12:00",
      classSection: "Grade 12 - A"
    },
    { 
      id: "3", 
      title: "Parent Meeting", 
      date: new Date(2025, 11, 15), 
      eventTypeId: "meeting-ptm",
      calendarForId:"emma-johnson",
      startTime: "14:00",
      endTime: "16:00",
      classSection: "Grade 11 - B",
      teacher: "Mr. Johnson"
    },
    { 
      id: "4", 
      title: "Sports Day", 
      date: new Date(2025, 11, 19), 
      eventTypeId: "school-activity",
      calendarForId:"emma-johnson",
      startTime: "08:00",
      endTime: "17:00"
    },
    { 
      id: "5", 
      title: "Christmas Break", 
      date: new Date(2025, 11, 25), 
      eventTypeId: "holiday",
      calendarForId:"emma-johnson",
      startTime: "00:00",
      endTime: "23:59"
    },
    { 
      id: "6", 
      title: "New Year's Eve", 
      date: new Date(2025, 11, 31), 
      eventTypeId: "school-activity",
      calendarForId:"emma-johnson",
      startTime: "18:00",
      endTime: "23:59"
    },
    { 
      id: "7", 
      title: "Math Homework", 
      date: new Date(2025, 11, 18), 
      eventTypeId: "homework-deadline",
      calendarForId:"emma-johnson",
      startTime: "16:00",
      endTime: "17:00",
      teacher: "Ms. Smith"
    },
  ],

  // UI Config
  ui: {
    headerButtons: [
      { id: "export", label: "Export PDF", icon: "Download", variant: "secondary", action: "export" },
      { id: "print", label: "Print", icon: "Printer", variant: "secondary", action: "print" },
      { id: "subscribe", label: "Subscribe (ICS)", icon: null, variant: "secondary", action: "subscribe" },
      { id: "create-event", label: "Create Event", icon: "Plus", variant: "primary", action: "create-event" }
    ],
    showNotificationBell: true,
    showUserDropdown: true,
    defaultCalendarView: "month",
    topBarConfig: {
      showGlobalSearch: true,
      showNotification: true,
      showViewSelector: true,
      showUserProfile: true
    }
  },

  // Date Config
  dateConfig: {
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    initialDate: new Date(2025, 11, 1),
    timeSlots: Array.from({ length: 12 }, (_, i) => `${i + 8}:00`),
    hours: Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 7 PM
  }
};

// Helper functions
export const getEventTypeById = (id: string) => {
  return calendarConfig.eventTypes.find(eventType => eventType.id === id);
};

export const generateEventStyles = (colorClass: string) => {
  const colorMatch = colorClass.match(/bg-(\w+)/);
  if (!colorMatch) return { bgColor: "bg-blue-50", textColor: "text-blue-700", borderColor: "border-blue-200", dotColor: "bg-blue-500" };
  
  const colorName = colorMatch[1];
  return {
    bgColor: `bg-${colorName}-100`,
    textColor: `text-${colorName}-700`,
    borderColor: `border-${colorName}-200`,
    dotColor: `bg-${colorName}-500`
  };
};

export const getFilterById = (id: string) => {
  return calendarConfig.filters.find(filter => filter.id === id);
};

export const getEventStyle = (eventTypeId: string) => {
  const eventType = getEventTypeById(eventTypeId);
  if (!eventType) return "bg-blue-50 text-blue-700";
  
  const styles = generateEventStyles(eventType.color);
  return `${styles.bgColor} ${styles.textColor}`;
};

export const getEventDotColor = (eventTypeId: string) => {
  const eventType = getEventTypeById(eventTypeId);
  if (!eventType) return "bg-blue-500";
  
  const styles = generateEventStyles(eventType.color);
  return styles.dotColor;
};

export const getEventBorderColor = (eventTypeId: string) => {
  const eventType = getEventTypeById(eventTypeId);
  if (!eventType) return "border-blue-200";
  
  const styles = generateEventStyles(eventType.color);
  return styles.borderColor;
};