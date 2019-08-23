import React from "react";
import styles from "./IconButton.module.css";
import Icon, { iconNames, iconSize } from "../Icon/Icon";

interface IconButtonProps {
  // iconName is Material Design icon name https://material.io/resources/icons/?style=baseline
  iconName: iconNames;
  notActive?: boolean;
  size?: iconSize;
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
  iconName,
  filled = false,
  size = "medium",
  notActive = false
}) => {
  return (
    <button
      className={styles.button}
      type="button"
      disabled={disabled}
      onClick={onClick}
      value={value}
      name={name}
    >
      <Icon
        hoverable={true}
        className={styles.iconFocus}
        filled={filled}
        disabled={disabled}
        notActive={notActive}
        iconSize={size}
        iconName={iconName}
      />
    </button>
  );
};

export default IconButton;
