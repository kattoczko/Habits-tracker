import React from "react";
import cx from "classnames";
import styles from "./Icon.module.css";

export type iconNames =
  | "done"
  | "close"
  | "add"
  | "delete"
  | "edit"
  | "arrow_back"
  | "arrow_back_ios"
  | "arrow_forward_ios"
  | "drag_indicator";
export type iconSize = "small" | "medium" | "big" | "huge";

interface IconProps {
  filled?: boolean;
  disabled?: boolean;
  notActive?: boolean;
  iconSize?: iconSize;
  className?: string;
  hoverable?: boolean;
  iconName: iconNames;
}

const Icon: React.FunctionComponent<IconProps> = ({
  filled = false,
  disabled = false,
  notActive = false,
  iconSize = "medium",
  className = "",
  hoverable = false,
  iconName
}) => {
  const iconClassNames = cx(styles.iconBase, className, {
    [styles.hoverable]: hoverable,
    [styles.iconDisabled]: disabled,
    [styles.iconLight]: notActive,
    [styles.iconFilled]: filled,
    [styles.small]: iconSize === "small",
    [styles.medium]: iconSize === "medium",
    [styles.big]: iconSize === "big",
    [styles.huge]: iconSize === "huge",
    "md-18": iconSize === "small",
    "md-24": iconSize === "medium",
    "md-36": iconSize === "big",
    "md-48": iconSize === "huge"
  });
  return <i className={iconClassNames}>{iconName}</i>;
};

export default Icon;
