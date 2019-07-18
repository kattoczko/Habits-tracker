import * as types from "./actionTypes";
import { Habit } from "../../types";

export function addNewDoneDate(habitId: number, date: string) {
  return {
    type: types.ADD_DONE_DATE,
    habitId,
    date
  };
}

export function removeDoneDate(habitId: number, date: string) {
  return {
    type: types.REMOVE_DONE_DATE,
    habitId,
    date
  };
}

export function addNewHabit(newHabit: Habit) {
  return {
    type: types.ADD_NEW_HABIT,
    newHabit
  };
}
