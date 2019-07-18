import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { State, Habit, NameOfDay } from "../../types";
import Table from "../Table/Table";
import IconButton from "../IconButton/IconButton";
import { getDatesBefore, getDayOfTheWeekName } from "../../utils/dateUtils";
import * as habitsActions from "../../redux/actions/habitsActions";

interface HabitsTableProps {
  habits: Habit[];
  actions: () => {};
}

function HabitsTable({ habits, actions }: HabitsTableProps) {
  const today: Date = new Date();
  const lastWeek: Date[] = getDatesBefore(today, 7);
  const headCells: NameOfDay[] = lastWeek.map(date =>
    getDayOfTheWeekName(date.getDay())
  );

  const tableData = habits.map(habit => {
    const cellsContent = lastWeek.map(date =>
      createCellContent(habit, date, actions)
    );
    return { id: habit.id, name: habit.name, cells: cellsContent };
  });

  return <Table headCells={["", ...headCells]} data={tableData} />;
}

function createCellContent(habit: Habit, date: Date, actions) {
  const dateString = date.toDateString();
  if (habit.done.includes(date.toDateString())) {
    return (
      <IconButton onClick={() => actions.removeDoneDate(habit.id, dateString)}>
        <i className="material-icons">done</i>
      </IconButton>
    );
  } else {
    return (
      <IconButton onClick={() => actions.addNewDoneDate(habit.id, dateString)}>
        <i className="material-icons">close</i>
      </IconButton>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    habits: state.habits
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addNewDoneDate: bindActionCreators(
        habitsActions.addNewDoneDate,
        dispatch
      ),
      removeDoneDate: bindActionCreators(habitsActions.removeDoneDate, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HabitsTable);
