import React from "react";

interface IconButtonProps {
  value?: string;
  name?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export default function IconButton({
  disabled = false,
  onClick = e => console.log(e),
  value = "",
  name = "",
  children
}: IconButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      value={value}
      name={name}
    >
      <span>{children}</span>
    </button>
  );
}
