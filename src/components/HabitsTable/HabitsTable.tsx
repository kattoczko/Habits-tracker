import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Table from "../Table/Table";
import IconButton from "../IconButton/IconButton";
import {
  getYearMonthAndDay,
  getDatesBefore,
  getDayOfTheWeekName
} from "../../utils/dateUtils";
import * as habitsActions from "../../redux/actions/habitsActions";

function HabitsTable({ habits, actions }) {
  const today: Date = new Date();
  const lastWeek: Date[] = getDatesBefore(getYearMonthAndDay(today), 7);
  const headCells = lastWeek.map(date => getDayOfTheWeekName(date.getDay()));
  const data = habits.map(habit => {
    const done = lastWeek.map(date => {
      const { year, month, day } = getYearMonthAndDay(date);

      if (habit.done.includes(`${year}, ${month}, ${day}`)) {
        return (
          <IconButton
            onClick={() =>
              actions.removeDoneDate(habit.id, `${year}, ${month}, ${day}`)
            }
          >
            <i className="material-icons">done</i>
            {"done"}
          </IconButton>
        );
      } else {
        return (
          <IconButton
            onClick={() =>
              actions.addNewDoneDate(habit.id, `${year}, ${month}, ${day}`)
            }
          >
            <i className="material-icons">done</i>
            {"x"}
          </IconButton>
        );
      }
    });

    return { id: habit.id, name: habit.name, cells: done };
  });

  return <Table headCells={["", ...headCells]} data={data} />;
}

function mapStateToProps(state) {
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
