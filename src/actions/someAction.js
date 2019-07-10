import * as types from "../constants/actionTypes";

export function someAction(sth) {
  return {
    type: types.SOME_TYPE,
    sth
  };
}
