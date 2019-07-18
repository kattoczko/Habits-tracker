import React from "react";

type ButtonTypes = "button" | "submit" | "reset";

interface ButtonProps {
  type?: ButtonTypes;
  value: string;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  type = "button",
  value,
  disabled = false,
  onClick
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {value}
    </button>
  );
}
