import React, { useRef, useEffect, useState } from "react";
import {
  monthsAbbr,
  weekDays,
  getDatesBefore,
  getDayBefore
} from "../../utils/dateUtils";
import IconButton from "../IconButton/IconButton";

import styles from "./Calendar.module.css";
import cx from "classnames";

// TODO regex for the date string?
interface CalendarProps {
  markedDates: string[];
  onCellClick: (date: Date) => void;
}

const Calendar: React.FunctionComponent<CalendarProps> = ({
  markedDates,
  onCellClick
}) => {
  const [cellSize, setCellSize] = useState(0);
  const [numberOfColumnsPage, setNumberOfColumnsPage] = useState(0);
  const [columnsData, setColumnsData] = useState([]);
  const totalNumberOfColumns = numberOfColumnsPage + 1;
  const wrapperElement = useRef(null);
  const cellDimensions = {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    lineHeight: `${cellSize}px`
  };

  console.log(columnsData);

  useEffect(() => {
    calculateCellSize();
    setNumberOfColumns();
    setColumnsData(createColumnsData(numberOfColumnsPage, new Date()));
  }, [cellSize]);

  useEffect(() => {
    window.addEventListener("resize", calculateCellSize);
    return () => window.removeEventListener("resize", calculateCellSize);
  });

  useEffect(() => {
    window.addEventListener("resize", setNumberOfColumns);
    return () => window.removeEventListener("resize", setNumberOfColumns);
  });

  function addNewCalendarPage() {
    if (columnsData.length > 0) {
      const lastDate = getDayBefore(columnsData[0][0]);
      const newColumnsData = createColumnsData(numberOfColumnsPage, lastDate);
      setColumnsData([...newColumnsData, ...columnsData]);
    }
  }

  function setNumberOfColumns() {
    const windowWidth = window.innerWidth;
    if (windowWidth > 1000) {
      setNumberOfColumnsPage(23);
    } else if (windowWidth <= 1000 && windowWidth > 700) {
      setNumberOfColumnsPage(20);
    } else {
      setNumberOfColumnsPage(8);
    }
  }

  function calculateCellSize() {
    const wrapperWidth = wrapperElement.current.offsetWidth;
    setCellSize(wrapperWidth / totalNumberOfColumns);
  }

  function renderWeekDaysColumn() {
    const column = weekDays.map(day => {
      return (
        <li key={day} className={styles.cellHeading} style={cellDimensions}>
          {day}
        </li>
      );
    });

    const emptyPlaceHolderColumn = (
      <li className={styles.cellHeading} style={cellDimensions} />
    );

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

    return (
      <li className={styles.cellHeading} style={cellDimensions}>
        {month}
      </li>
    );
  }

  function renderColumns(columnsData: Date[][]): JSX.Element[] {
    const columns = columnsData.map((column, index) => {
      return (
        <ul key={column.toString()} className={styles.column}>
          {renderMonth(column)}
          {column.map(date => {
            const isDone = markedDates.includes(date.toDateString());
            const cellClasses = cx({
              [styles.cellActive]: isDone,
              [styles.cell]: !isDone
            });
            return (
              <li
                key={date.toString()}
                className={cellClasses}
                onClick={() => onCellClick(date)}
                style={cellDimensions}
              >
                {date.getDate()}
              </li>
            );
          })}
        </ul>
      );
    });

    return columns;
  }

  function createColumnsData(
    numberOfColumns: number,
    fromDate: Date
  ): Date[][] {
    const numberOfCells = 7;
    const columns: Date[][] = [];
    let currentDate: Date = fromDate;
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
    <>
      <div ref={wrapperElement} className={styles.calendarWrapper}>
        <div className={styles.calendar}>{renderColumns(columnsData)}</div>
        {renderWeekDaysColumn()}
      </div>
      <IconButton onClick={addNewCalendarPage} iconName="delete" />
    </>
  );
};

export default Calendar;
