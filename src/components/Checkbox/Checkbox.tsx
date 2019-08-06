import React from "react";

interface CheckboxProps {
  id: string;
  name: string;
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  disabled?: boolean;
}

const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  id,
  name,
  value,
  label,
  onChange,
  checked,
  disabled
}) => {
  return (
    <div>
      <input
        onChange={onChange}
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        value={value}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
