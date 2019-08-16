import { NameOfDay, MonthAbbr, YearMontAndDate } from "../types";

export const weekDays: NameOfDay[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];
export const monthsAbbr: MonthAbbr[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export function getYearMonthAndDay(date: Date): YearMontAndDate {
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  return {
    year,
    month,
    day
  };
}

export function getDatesBefore(date: Date, numberOfDaysBefore: number): Date[] {
  const { year, month, day } = getYearMonthAndDay(date);
  let datesBefore: Date[] = [];
  for (let i = 0; i < numberOfDaysBefore; i++) {
    datesBefore.push(new Date(year, month, day - i));
  }

  return datesBefore;
}

export function getDayBefore(date: Date): Date {
  const { year, month, day } = getYearMonthAndDay(date);
  return new Date(year, month, day - 1);
}

export function getDayOfTheWeekName(day: number): NameOfDay {
  return weekDays[day];
}

export function getDaysInMonth(month: number, year: number): number {
  return 32 - new Date(year, month, 32).getDate();
}
