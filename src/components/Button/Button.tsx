import React from "react";
import styles from "./Button.module.css";
import cx from "classnames";

type ButtonTypes = "button" | "submit" | "reset";

interface ButtonProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: ButtonTypes;
  disabled?: boolean;
  isPrimary?: boolean;
  className?: string;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  isPrimary = false,
  className: classNameProps
}) => {
  const buttonClassnames = cx(classNameProps, styles.button, {
    [styles.buttonPrimary]: isPrimary
  });

  return (
    <button
      className={buttonClassnames}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
