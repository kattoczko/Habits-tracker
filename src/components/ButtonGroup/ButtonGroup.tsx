import React from "react";
import cx from "classnames";
import styles from "./ButtonGroup.module.css";

interface ButtonGroupProps {
  children: React.ReactNode;
}

const ButtonGroup: React.FunctionComponent<ButtonGroupProps> = ({
  children
}) => {
  return (
    <div className={styles.buttonGroup}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
          return null;
        }

        return React.cloneElement(child, {
          className: cx(styles.button, child.props.className)
        });
      })}
    </div>
  );
};

export default ButtonGroup;
