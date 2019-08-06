import React from "react";

type ButtonTypes = "button" | "submit" | "reset";

interface ButtonProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: ButtonTypes;
  disabled?: boolean;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false
}) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
