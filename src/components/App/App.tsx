import React from "react";
import { Route, Switch } from "react-router-dom";
import HabitsPage from "../HabitsPage/HabitsPage";

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HabitsPage} />
      </Switch>
    </div>
  );
}
