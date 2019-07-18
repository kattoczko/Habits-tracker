import React from "react";

interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({
  id,
  name,
  label,
  value = label,
  checked,
  onChange,
  disabled
}: CheckboxProps) {
  return (
    <div>
      <input
        onChange={onChange}
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        disabled={disabled}
        value={value}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
