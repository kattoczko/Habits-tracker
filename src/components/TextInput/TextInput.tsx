import React from "react";

interface InputProps {
  label: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  id?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

export default function TextInput({
  label,
  name,
  id,
  onChange,
  value = "",
  required = false,
  minLength = 0,
  maxLength = 100
}: InputProps) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>

      <input
        value={value}
        type="text"
        id={id}
        name={name}
        required={required}
        onChange={onChange}
        maxLength={maxLength}
        minLength={minLength}
      />
    </div>
  );
}
