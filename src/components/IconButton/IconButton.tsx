import React from "react";
import cx from "classnames";
import styles from "./IconButton.module.css";

type iconNames = "done" | "close" | "add" | "delete" | "edit";

interface IconButtonProps {
  // iconName is Material Design icon name https://material.io/resources/icons/?style=baseline
  iconName: iconNames;
  value?: string;
  name?: string;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const IconButton: React.FunctionComponent<IconButtonProps> = ({
  disabled = false,
  onClick = e => console.log(e),
  value = "",
  name = "",
  iconName = "",
  active = true
}) => {
  const iconClassNames = cx(styles.iconBase, {
    [styles.iconActive]: active
  });
  return (
    <button
      className={styles.button}
      type="button"
      disabled={disabled}
      onClick={onClick}
      value={value}
      name={name}
    >
      <span>
        <i className={iconClassNames}>{iconName}</i>
      </span>
    </button>
  );
};

export default IconButton;
