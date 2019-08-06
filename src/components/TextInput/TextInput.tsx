import React from "react";

interface InputProps {
  label: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  value?: string;
  id?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

const TextInput: React.FunctionComponent<InputProps> = ({
  label,
  name,
  id,
  onChange,
  value = "",
  required = false,
  minLength = 0,
  maxLength = 100,
  error = ""
}: InputProps) => {
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
      {error && <div>{error}</div>}
    </div>
  );
};

export default TextInput;
