import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import throttle from "lodash/throttle";

import { loadState, saveState } from "../localStorage";
import reducers from "../habits";
import initialState from "./initialState";

const middleware = [thunk];
const enhancers = [];
const composeEnhancers =
  (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;

const persistedState = loadState();

const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(...middleware), ...enhancers)
);

store.subscribe(
  throttle(() => {
    saveState({ habits: store.getState().habits });
  }, 1000)
);

export type AppState = ReturnType<typeof reducers>;
export default store;
