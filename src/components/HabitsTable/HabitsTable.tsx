import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { DropResult } from "react-beautiful-dnd";

import { AppState } from "../../redux/store/store";
import { HabitsState } from "../../redux/habits/types";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow
} from "../Table/Table";
import Icon from "../Icon/Icon";
import IconButton from "../IconButton/IconButton";
import { getDatesBefore, getDayOfTheWeekName } from "../../utils/dateUtils";
import {
  addNewDoneDate,
  removeDoneDate,
  reorderHabits
} from "../../redux/habits/habitsActions";
import styles from "./HabitsTable.module.css";

interface HabitsTableProps {
  habits: HabitsState;
  addNewDoneDate: typeof addNewDoneDate;
  removeDoneDate: typeof removeDoneDate;
  reorderHabits: typeof reorderHabits;
}

const HabitsTable: React.FunctionComponent<HabitsTableProps> = ({
  habits,
  addNewDoneDate,
  removeDoneDate,
  reorderHabits
}) => {
  const handleDragEnd = (result: DropResult): void => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const newHabitsOrder = Array.from(habits);
    const deletedHabit = newHabitsOrder.splice(source.index, 1);
    newHabitsOrder.splice(destination.index, 0, ...deletedHabit);
    reorderHabits(newHabitsOrder);
  };
  const renderTableHead = () => {
    const lastWeek = getDatesBefore(new Date(), 7);
    const cells = lastWeek.map(date => {
      const dayName = getDayOfTheWeekName(date.getDay());
      return (
        <TableCell key={date.toString()} isHeader={true}>
          {dayName}
        </TableCell>
      );
    });

    return (
      <TableHead>
        <TableRow draggable={false}>
          <TableCell isHeader={true} />
          {cells}
        </TableRow>
      </TableHead>
    );
  };

  const renderTableBody = () => {
    const rows = habits.map((habit, index) => {
      const habitName = (
        <TableCell>
          <Icon iconName="drag_indicator" />
          <Link className={styles.habitLink} to={"/habits/" + habit.id}>
            {habit.name}
          </Link>
        </TableCell>
      );
      const lastWeek = getDatesBefore(new Date(), 7);
      const lastWeekCells = lastWeek.map((date, index) => {
        const dateExistsInDone = habit.done.includes(date.toDateString());
        function handleUpdateDoneDates(): void {
          dateExistsInDone
            ? removeDoneDate(habit.id, date)
            : addNewDoneDate(habit.id, date);
        }

        return (
          <TableCell key={`${date.toString()}${index}`}>
            <IconButton
              onClick={handleUpdateDoneDates}
              iconName={"done"}
              notActive={!dateExistsInDone}
              filled={dateExistsInDone}
            />
          </TableCell>
        );
      });
      return (
        <TableRow key={habit.id} id={habit.id} index={index}>
          {habitName}
          {lastWeekCells}
        </TableRow>
      );
    });

    return <TableBody id="habits-table">{rows}</TableBody>;
  };

  return (
    <Table handleDragEnd={handleDragEnd}>
      {renderTableHead()}
      {renderTableBody()}
    </Table>
  );
};

function mapStateToProps(state: AppState) {
  return {
    habits: state.habits
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    addNewDoneDate: bindActionCreators(addNewDoneDate, dispatch),
    removeDoneDate: bindActionCreators(removeDoneDate, dispatch),
    reorderHabits: bindActionCreators(reorderHabits, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HabitsTable);
