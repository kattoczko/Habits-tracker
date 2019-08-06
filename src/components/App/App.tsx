import React from "react";
import { Route, Switch } from "react-router-dom";
import HabitsPage from "../HabitsPage/HabitsPage";
import ManageHabitPage from "../ManageHabitPage/ManageHabitPage";
import styles from "./App.module.css";

const App: React.FunctionComponent<{}> = () => {
  return (
    <div className={styles.container}>
      <Switch>
        <Route exact path="/" component={HabitsPage} />
        <Route path="/habits/:id" component={ManageHabitPage} />
      </Switch>
    </div>
  );
};

export default App;
