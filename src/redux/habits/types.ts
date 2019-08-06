export const REMOVE_DONE_DATE = "REMOVE_DONE_DATE";
export const ADD_DONE_DATE = "ADD_DONE_DATE";
export const ADD_NEW_HABIT = "ADD_NEW_HABIT";
export const DELETE_HABIT = "DELETE_HABIT";
export const UPDATE_HABIT = "UPDATE_HABIT";

export interface Habit {
  id: string;
  name: string;
  done: string[];
}

export type HabitsState = Habit[];

interface AddNewDoneDate {
  type: typeof ADD_DONE_DATE;
  habitId: string;
  date: Date;
}

interface RemoveDoneDate {
  type: typeof REMOVE_DONE_DATE;
  habitId: string;
  date: Date;
}

interface AddNewHabit {
  type: typeof ADD_NEW_HABIT;
  newHabit: Habit;
}

interface DeleteHabit {
  type: typeof DELETE_HABIT;
  habitId: string;
}

interface UpdateHabit {
  type: typeof UPDATE_HABIT;
  habitId: string;
  name: string;
}

export type HabitActionTypes =
  | AddNewDoneDate
  | RemoveDoneDate
  | AddNewHabit
  | DeleteHabit
  | UpdateHabit;
