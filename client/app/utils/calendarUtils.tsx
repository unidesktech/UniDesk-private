import { calendarConfig } from "../config/calender.config";

export const getCalendarDays = (currentDate: Date) => {
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

export const getWeekDays = (currentDate: Date) => {
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

export const getDayHours = () => {
  return calendarConfig.dateConfig.hours;
};

export const formatDate = (date: Date) => {
  return `${date.getDate()} ${
    calendarConfig.dateConfig.months[date.getMonth()]
  } ${date.getFullYear()}`;
};

export const formatTime = (timeString: string = "") => {
  if (!timeString) return "";
  const [hours, minutes] = timeString.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};