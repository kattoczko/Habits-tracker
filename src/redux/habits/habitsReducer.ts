import {
  HabitActionTypes,
  HabitsState,
  REMOVE_DONE_DATE,
  ADD_DONE_DATE,
  ADD_NEW_HABIT,
  DELETE_HABIT,
  UPDATE_HABIT,
  REORDER_HABITS
} from "./types";

const initialState: HabitsState = [];

export default function reducer(
  state = initialState,
  action: HabitActionTypes
): HabitsState {
  switch (action.type) {
    case ADD_DONE_DATE:
      return state.map(habit => {
        if (habit.id === action.habitId) {
          return {
            ...habit,
            done: [...habit.done, action.date.toDateString()]
          };
        } else {
          return habit;
        }
      });
    case REMOVE_DONE_DATE:
      return state.map(habit => {
        if (habit.id === action.habitId) {
          const newDone = habit.done.filter(
            date => date !== action.date.toDateString()
          );
          return {
            ...habit,
            done: [...newDone]
          };
        } else {
          return habit;
        }
      });
    case ADD_NEW_HABIT:
      return [...state, { ...action.newHabit }];
    case DELETE_HABIT:
      return state.filter(habit => habit.id !== action.habitId);
    case UPDATE_HABIT:
      return state.map(habit => {
        if (habit.id === action.habitId) {
          return { ...habit, name: action.name };
        } else {
          return habit;
        }
      });
    case REORDER_HABITS:
      return [...action.habits];
    default:
      return state;
  }
}
