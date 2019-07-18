export interface Habit {
  id: number;
  name: string;
  done: string[];
}

export interface State {
  habits: Habit[];
}

export type NameOfDay = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export interface YearMontAndDate {
  year: number;
  month: number;
  day: number;
}
