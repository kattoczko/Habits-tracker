import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { AppState } from "../../redux/store/store";
import { HabitsState, Habit } from "../../redux/habits/types";
import Table, { Row } from "../Table/Table";
import IconButton from "../IconButton/IconButton";
import { getDatesBefore, getDayOfTheWeekName } from "../../utils/dateUtils";
import {
  addNewDoneDate,
  removeDoneDate
} from "../../redux/habits/habitsActions";
import styles from "./HabitsTable.module.css";

interface HabitsTableProps {
  habits: HabitsState;
  addNewDoneDate: typeof addNewDoneDate;
  removeDoneDate: typeof removeDoneDate;
}

const HabitsTable: React.FunctionComponent<HabitsTableProps> = ({
  habits,
  addNewDoneDate,
  removeDoneDate
}) => {
  const today = new Date();
  const lastWeek = getDatesBefore(today, 7);
  const headCells = lastWeek.map(date => getDayOfTheWeekName(date.getDay()));
  const tableData: Row[] = habits.map(habit => {
    const cellsContent = lastWeek.map(date => createCellContent(habit, date));
    const habitLink = (
      <Link className={styles.habitLink} to={"/habits/" + habit.id}>
        {habit.name}
      </Link>
    );
    return { id: habit.id, name: habitLink, cells: cellsContent };
  });

  return <Table headCells={["", ...headCells]} data={tableData} />;

  function createCellContent(habit: Habit, date: Date): JSX.Element {
    const dateExistsInDone = habit.done.includes(date.toDateString());

    function handleUpdateDoneDates(): void {
      if (dateExistsInDone) {
        removeDoneDate(habit.id, date);
      } else {
        addNewDoneDate(habit.id, date);
      }
    }
    return (
      <IconButton
        onClick={handleUpdateDoneDates}
        iconName={"done"}
        notActive={!dateExistsInDone}
        filled={dateExistsInDone}
      />
    );
  }
};

function mapStateToProps(state: AppState) {
  return {
    habits: state.habits
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    addNewDoneDate: bindActionCreators(addNewDoneDate, dispatch),
    removeDoneDate: bindActionCreators(removeDoneDate, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HabitsTable);
