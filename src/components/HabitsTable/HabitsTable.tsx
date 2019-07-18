import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Table from "../Table/Table";
import IconButton from "../IconButton/IconButton";

import * as habitsActions from "../../actions/habitsActions";

function HabitsTable({ habits, actions }) {
  console.log("props habits", habits);

  // function handleIconClick(e, habitId, date) {
  //   e.preventDefault();
  //   actions.addNewDoneDate(habitId, date);
  // }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date: Date = new Date();
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  let lastWeek: Date[] = [];
  for (let i = 0; i < 7; i++) {
    lastWeek.push(new Date(year, month, day - i));
  }
  const headCells = lastWeek.map(date => weekDays[date.getDay()]);
  const data = habits.map(habit => {
    const done = lastWeek.map(date => {
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

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
