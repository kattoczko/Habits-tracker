import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { AppState } from "../../redux/store/store";
import { HabitsState, Habit } from "../../redux/habits/types";
import Table from "../Table/Table";
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
  const data = habits.map(habit => {
    const today = new Date();
    const lastWeek = getDatesBefore(today, 7);

    const habitLink = (
      <Link className={styles.habitLink} to={"/habits/" + habit.id}>
        {habit.name}
      </Link>
    );

    const cells = lastWeek.map(date => {
      const dayOfTheWeek = getDayOfTheWeekName(date.getDay());
      const cellContent = createCellContent(habit, date);
      return {
        [dayOfTheWeek]: cellContent
      };
    });

    const mergeObjects = (accumulator, currentValue) => {
      return { ...accumulator, ...currentValue };
    };

    const cellsData = cells.reduce(mergeObjects, {});

    return { Name: habitLink, ...cellsData };
  });

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

  return <Table data={data} />;
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
