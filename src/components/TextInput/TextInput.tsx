import React, { useState } from "react";
import cx from "classnames";
import styles from "./TextInput.module.css";

interface InputProps {
  label: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  autofocus?: boolean;
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
  autofocus = false,
  minLength = 0,
  maxLength = 100,
  error = ""
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFilled = value.length > 0;

  const labelClasses = cx(styles.label, {
    [styles.labelShrinked]: isFilled || isFocused
  });
  const wrapperClasses = cx(styles.inputWrapper, {
    [styles.focused]: isFocused,
    [styles.filled]: isFilled
  });

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
  }

  return (
    <div className={wrapperClasses}>
      <label className={labelClasses} htmlFor={name}>
        {label}
      </label>
      <input
        autoFocus={autofocus}
        className={styles.input}
        value={value}
        type="text"
        id={id}
        name={name}
        required={required}
        onChange={onChange}
        maxLength={maxLength}
        minLength={minLength}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      {error && <div>{error}</div>}
    </div>
  );
};

export default TextInput;
