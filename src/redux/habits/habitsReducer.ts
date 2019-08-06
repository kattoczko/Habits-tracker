import {
  HabitActionTypes,
  HabitsState,
  REMOVE_DONE_DATE,
  ADD_DONE_DATE,
  ADD_NEW_HABIT,
  DELETE_HABIT,
  UPDATE_HABIT
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
          habit.done = habit.done.filter(
            date => date !== action.date.toDateString()
          );
        }
        return habit;
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
    default:
      return state;
  }
}
