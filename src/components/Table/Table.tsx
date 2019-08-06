import React from "react";

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
    <th key={`${cellContent}${i}`}>{cellContent}</th>
  ));
  const tableBody = data.map(item => {
    const cells = item.cells.map((cell, i) => (
      <td key={`${item.name}${i}`}>{cell}</td>
    ));
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        {cells}
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>{tableHead}</tr>
      </thead>
      <tbody>{tableBody}</tbody>
    </table>
  );
};

export default Table;
