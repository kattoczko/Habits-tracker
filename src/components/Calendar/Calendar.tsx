import React from "react";
import {
  monthsAbbr,
  weekDays,
  getDatesBefore,
  getDayBefore
} from "../../utils/dateUtils";
import styles from "./Calendar.module.css";
import cx from "classnames";

// TODO regex for the date string?
interface CalendarProps {
  markedDates: string[];
}

const Calendar: React.FunctionComponent<CalendarProps> = ({ markedDates }) => {
  const columns = createColumnsData(100);

  function renderWeekDaysColumn() {
    const column = weekDays.map(day => {
      return (
        <li key={day} className={styles.cellHeading}>
          {day}
        </li>
      );
    });

    const emptyPlaceHolderColumn = <li className={styles.cellHeading} />;

    return (
      <ul className={styles.column}>
        {emptyPlaceHolderColumn}
        {column}
      </ul>
    );
  }

  function renderMonth(columnData: Date[]): JSX.Element {
    const monthBeginningDate = columnData.find(date => date.getDate() === 1);
    const month: string = monthBeginningDate
      ? monthsAbbr[monthBeginningDate.getMonth()]
      : "";

    return <li className={styles.cellHeading}>{month}</li>;
  }

  function renderColumns(columnsData: Date[][]): JSX.Element[] {
    const columns = columnsData.map((column, index) => {
      return (
        <ul key={index} className={styles.column}>
          {renderMonth(column)}
          {column.map(date => {
            const isDone = markedDates.includes(date.toDateString());
            const cellClasses = cx({
              [styles.cellActive]: isDone,
              [styles.cell]: !isDone
            });
            return (
              <li key={date.toString()} className={cellClasses}>
                {date.getDate()}
              </li>
            );
          })}
        </ul>
      );
    });

    return columns;
  }

  function createColumnsData(numberOfColumns: number): Date[][] {
    const numberOfCells = 7;
    const columns: Date[][] = [];
    let currentDate: Date = new Date();
    let daysBefore: number;

    for (let i = 0; i < numberOfColumns; i++) {
      if (i === 0) {
        daysBefore = currentDate.getDay() + 1;
      } else {
        daysBefore = numberOfCells;
      }
      const column = getDatesBefore(currentDate, daysBefore).reverse();
      columns.push(column);
      currentDate = getDayBefore(column[0]);
    }
    return columns.reverse();
  }
  return (
    <div className={styles.calendar}>
      {renderColumns(columns)}
      {renderWeekDaysColumn()}
    </div>
  );
};

export default Calendar;
