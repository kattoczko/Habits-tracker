import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import store from "./redux/store/store";
import { Provider as ReduxProvider } from "react-redux";

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById("root")
);
