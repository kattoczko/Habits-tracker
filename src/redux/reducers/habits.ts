import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

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
    default:
      return state;
  }
}
