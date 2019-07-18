import React from "react";

interface Row {
  id: number;
  name: string;
  cells: (JSX.Element | string)[];
}

interface TableProps {
  data: Row[];
  headCells: string[];
}

export default function Table({ data, headCells }: TableProps) {
  const tableHead = headCells.map(cell => <th key={cell}>{cell}</th>);
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
}
