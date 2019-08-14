import React from "react";
import styles from "./Table.module.css";

type Column = {
  [x: string]: string | JSX.Element;
};

interface TableProps {
  data: Column[];
}

const Table: React.FunctionComponent<TableProps> = ({ data }) => {
  const keys = Object.keys(data[0]);
  const tableHead = keys.map((key, index) => (
    <th className={styles.cell} key={`${key}${index}`}>
      {key}
    </th>
  ));
  const tableBody = data.map((item, i) => {
    const cells = keys.map((key, index) => {
      return (
        <td className={styles.cell} key={`${item}${index}`}>
          {item[key]}
        </td>
      );
    });

    return (
      <tr className={styles.row} key={`${i}`}>
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
