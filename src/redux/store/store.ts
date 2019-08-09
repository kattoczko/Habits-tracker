import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { loadState, saveState } from "../localStorage";
import reducers from "../habits";
import initialState from "./initialState";

const middleware = [thunk];
const enhancers = [];
const composeEnhancers =
  (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;

const store = createStore(
  reducers,
  loadState(),
  composeEnhancers(applyMiddleware(...middleware), ...enhancers)
);

store.subscribe(() => {
  saveState(store.getState());
});

export type AppState = ReturnType<typeof reducers>;
export default store;
