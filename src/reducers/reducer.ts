import * as types from "../constantat/actionTypes";
import initialState from "../store/initialState";

export default function reducer(state = initialState.something, action) {
  switch (action.type) {
    case types.SOME_TYPE:
      return [...state, { ...action.course }];
    default:
      return state;
  }
}
