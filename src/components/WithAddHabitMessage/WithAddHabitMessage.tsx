import React from "react";
import { ReactComponent as Arrow } from "../../images/pointing-arrow.svg";
import styles from "./WithAddHabitMessage.module.css";

interface WithAddHabitMessageProps {
  children: React.ReactNode;
  isActive: boolean;
}

const AddHabitMessage: React.FunctionComponent<WithAddHabitMessageProps> = ({
  children,
  isActive
}) => {
  return (
    <div className={styles.container}>
      {children}
      {isActive && (
        <div className={styles.messageContainer}>
          <p className={styles.text}>
            It's lonely here. Start with a new habit!
          </p>
          <Arrow className={styles.svg} />
        </div>
      )}
    </div>
  );
};

export default AddHabitMessage;
