import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";

import styles from "./Table.module.css";

interface TableProps {
  handleDragEnd: (result: DropResult) => void;
}

const Table: React.FunctionComponent<TableProps> = ({
  children,
  handleDragEnd
}) => {
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <table className={styles.table}>{children}</table>
    </DragDropContext>
  );
};

const TableHead: React.FunctionComponent<{}> = ({ children }) => {
  return <thead>{children}</thead>;
};

interface TableBodyProps {
  id: string;
}

const TableBody: React.FunctionComponent<TableBodyProps> = ({
  id,
  children
}) => {
  return (
    <Droppable droppableId={id}>
      {provided => (
        <tbody ref={provided.innerRef} {...provided.droppableProps}>
          {children}
        </tbody>
      )}
    </Droppable>
  );
};

interface TableRowProps {
  draggable?: boolean;
  id?: string;
  index?: number;
}

const TableRow: React.FunctionComponent<TableRowProps> = ({
  children,
  id,
  index,
  draggable = true
}) => {
  if (!draggable) {
    return <tr className={styles.row}>{children}</tr>;
  }
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <tr
          className={styles.row}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </tr>
      )}
    </Draggable>
  );
};

interface TableCellProps {
  isHeader?: boolean;
}
const TableCell: React.FunctionComponent<TableCellProps> = ({
  children,
  isHeader
}) => {
  if (isHeader) {
    return <th className={styles.cell}>{children}</th>;
  } else {
    return <td className={styles.cell}>{children}</td>;
  }
};

export { Table, TableHead, TableBody, TableCell, TableRow };
