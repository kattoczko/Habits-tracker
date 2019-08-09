import React from "react";
import cx from "classnames";
import styles from "./IconButton.module.css";

type iconNames = "done" | "close" | "add" | "delete" | "edit" | "arrow_back";
type size = "small" | "medium" | "big" | "huge";

interface IconButtonProps {
  // iconName is Material Design icon name https://material.io/resources/icons/?style=baseline
  iconName: iconNames;
  notActive?: boolean;
  size?: size;
  value?: string;
  name?: string;
  filled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const IconButton: React.FunctionComponent<IconButtonProps> = ({
  disabled = false,
  onClick,
  value = "",
  name = "",
  iconName = "",
  filled = false,
  size = "medium",
  notActive = false
}) => {
  const iconClassNames = cx(styles.iconBase, {
    [styles.iconLight]: notActive,
    [styles.iconFilled]: filled,
    "md-18": size === "small",
    "md-24": size === "medium",
    "md-36": size === "big",
    "md-48": size === "huge"
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
      <i className={iconClassNames}>{iconName}</i>
    </button>
  );
};

export default IconButton;
