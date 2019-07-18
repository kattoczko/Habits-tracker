import * as types from "./actionTypes";

export function addNewDoneDate(habitId, date) {
  return {
    type: types.ADD_DONE_DATE,
    habitId,
    date
  };
}

export function removeDoneDate(habitId, date) {
  return {
    type: types.REMOVE_DONE_DATE,
    habitId,
    date
  };
}
