import React, { useRef, useEffect, useState } from "react";
import throttle from "lodash/throttle";
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

function getNumberOfColumns() {
  const windowWidth = window.innerWidth;
  if (windowWidth < 500) {
    return 6;
  } else if (windowWidth >= 500 && windowWidth < 800) {
    return 12;
  } else if (windowWidth >= 800) {
    return 20;
  }
}

function createColumnsData(numberOfColumns: number, fromDate: Date): Date[][] {
  const numberOfCells = 7;
  const columns: Date[][] = [];
  let currentDate: Date = fromDate;
  let daysBefore: number;

  for (let i = 0; i < numberOfColumns; i++) {
    if (currentDate.getDay() !== 6) {
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

const Calendar: React.FunctionComponent<CalendarProps> = ({
  markedDates,
  onCellClick
}) => {
  const [numberOfColumnsPage, setNumberOfColumnsPage] = useState(
    getNumberOfColumns()
  );
  const [columnsData, setColumnsData] = useState(
    createColumnsData(numberOfColumnsPage, new Date())
  );
  const [cellSize, setCellSize] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const wrapperElement = useRef(null);
  const cellDimensions = {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    lineHeight: `${cellSize}px`
  };

  useEffect(() => {
    resetColumnsNumber();
    calculateCellSize();
  }, [numberOfColumnsPage]);

  useEffect(() => {
    window.addEventListener("resize", calculateCellSize);
    return () => window.removeEventListener("resize", calculateCellSize);
  });

  useEffect(() => {
    function updateNumberOfColumns() {
      setNumberOfColumnsPage(getNumberOfColumns());
    }
    window.addEventListener("resize", updateNumberOfColumns);
    return () => window.removeEventListener("resize", updateNumberOfColumns);
  });

  function handlePrevButtonClick() {
    if (columnsData.length / numberOfColumnsPage === pageNumber) {
      addNewCalendarPage();
    }
    setPageNumber(pageNumber + 1);
  }

  function handleNextButtonClick() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  function addNewCalendarPage() {
    if (columnsData.length > 0) {
      const lastDate = getDayBefore(columnsData[0][0]);
      const newColumnsData = createColumnsData(numberOfColumnsPage, lastDate);
      setColumnsData([...newColumnsData, ...columnsData]);
    }
  }

  function resetColumnsNumber() {
    // const newNumberOfPages = Math.ceil(
    //   columnsData.length / numberOfColumnsPage
    // );
    // const newCurrentPageNumber = Math.floor(
    //   ((pageNumber + 1) * prevNumberOfColumnsPage) / numberOfColumnsPage
    // );
    // console.log(newCurrentPageNumber);
    // const newColumnsNumber = newNumberOfPages * numberOfColumnsPage;
    setPageNumber(1);
    setColumnsData(createColumnsData(numberOfColumnsPage, new Date()));
  }

  function calculateCellSize() {
    const totalNumberOfColumns = numberOfColumnsPage + 1;
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
    let element: JSX.Element;

    if (monthBeginningDate) {
      const month: number = monthBeginningDate.getMonth();
      const monthName: string = monthsAbbr[month];
      if (month === 0) {
        element = renderMonthWithYear(monthBeginningDate);
      } else {
        element = (
          <li className={styles.cellHeading} style={cellDimensions}>
            {monthName}
          </li>
        );
      }
    } else {
      element = <li className={styles.cellHeading} style={cellDimensions} />;
    }

    return element;
  }

  function renderMonthWithYear(date: Date): JSX.Element {
    const year = date
      .getFullYear()
      .toString()
      .slice(-2);
    const month = monthsAbbr[date.getMonth()];
    return (
      <li className={styles.cellHeading} style={cellDimensions}>
        {month}
        <span className={styles.year}> '{year}</span>
      </li>
    );
  }

  function renderColumns(columnsData: Date[][]): JSX.Element[] {
    const columns = columnsData.map((column, index) => {
      let month: JSX.Element;
      if (index % numberOfColumnsPage === 0) {
        month = renderMonthWithYear(column[column.length - 1]);
      } else {
        month = renderMonth(column);
      }

      return (
        <ul key={column.toString()} className={styles.column}>
          {month}
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

  return (
    <div className={styles.container}>
      <IconButton onClick={handlePrevButtonClick} iconName="arrow_back_ios" />
      <div ref={wrapperElement} className={styles.calendarWrapper}>
        <div className={styles.calendar}>
          <div
            style={
              pageNumber > 1
                ? {
                    transform: `translateX(${pageNumber - 1}00%)`
                  }
                : {}
            }
            className={styles.slider}
          >
            {renderColumns(columnsData)}
          </div>
        </div>
        {renderWeekDaysColumn()}
      </div>
      <IconButton
        disabled={pageNumber <= 1}
        onClick={handleNextButtonClick}
        iconName="arrow_forward_ios"
      />
    </div>
  );
};

export default Calendar;
