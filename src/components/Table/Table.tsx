import React from "react";
import styles from "./Table.module.css";

export interface Row {
  id: string;
  name: JSX.Element | string;
  cells: (JSX.Element | string)[];
}

interface TableProps {
  data: Row[];
  headCells: string[];
}

const Table: React.FunctionComponent<TableProps> = ({ data, headCells }) => {
  const tableHead = headCells.map((cellContent, i) => (
    <th className={styles.cell} key={`${cellContent}${i}`}>
      {cellContent}
    </th>
  ));
  const tableBody = data.map(item => {
    const cells = item.cells.map((cell, i) => (
      <td className={styles.cell} key={`${item.name}${i}`}>
        {cell}
      </td>
    ));
    return (
      <tr className={styles.row} key={item.id}>
        <td className={styles.cell}>{item.name}</td>
        {cells}
      </tr>
    );
  });

  return (
    <table className={styles.table}>
      <thead>
        <tr>{tableHead}</tr>
      </thead>
      <tbody>{tableBody}</tbody>
    </table>
  );
};

export default Table;
