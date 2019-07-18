import { NameOfDay, YearMontAndDate } from "../types";

const weekDays: NameOfDay[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

export function getDayOfTheWeekName(day: number): NameOfDay {
  return weekDays[day];
}

export function getDaysInMonth(month: number, year: number): number {
  return 32 - new Date(year, month, 32).getDate();
}
