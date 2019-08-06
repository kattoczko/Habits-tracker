import habits from "./habitsReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ habits });

export default rootReducer;
