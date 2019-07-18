import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";
import { Habit } from "../../types";

export default function reducer(state = initialState.habits, action) {
  switch (action.type) {
    case types.ADD_DONE_DATE:
      return state.map(habit => {
        if (habit.id === action.habitId) {
          habit.done.push(action.date);
        }
        return habit;
      });
    case types.REMOVE_DONE_DATE:
      return state.map(habit => {
        if (habit.id === action.habitId) {
          habit.done = habit.done.filter(date => date !== action.date);
        }
        return habit;
      });
    case types.ADD_NEW_HABIT:
      const newHabit: Habit = action.newHabit;
      return [...state, newHabit];
    default:
      return state;
  }
}
