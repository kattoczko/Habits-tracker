import {
  HabitActionTypes,
  Habit,
  REMOVE_DONE_DATE,
  ADD_DONE_DATE,
  ADD_NEW_HABIT,
  DELETE_HABIT,
  UPDATE_HABIT
} from "./types";

export function addNewDoneDate(habitId: string, date: Date): HabitActionTypes {
  return {
    type: ADD_DONE_DATE,
    habitId,
    date
  };
}

export function removeDoneDate(habitId: string, date: Date): HabitActionTypes {
  return {
    type: REMOVE_DONE_DATE,
    habitId,
    date
  };
}

export function addNewHabit(newHabit: Habit): HabitActionTypes {
  return {
    type: ADD_NEW_HABIT,
    newHabit
  };
}

export function deleteHabit(habitId: string): HabitActionTypes {
  return {
    type: DELETE_HABIT,
    habitId
  };
}

export function updateHabit(habitId: string, name: string): HabitActionTypes {
  return {
    type: UPDATE_HABIT,
    habitId,
    name
  };
}
