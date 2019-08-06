import React from "react";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import styles from "./HabitForm.module.css";

interface HabitFormProps {
  habitNameInputValue: string;
  heading: string;
  errorMessage?: string;
  handleNameInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleSave: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const HabitForm: React.FunctionComponent<HabitFormProps> = ({
  habitNameInputValue,
  heading,
  errorMessage,
  handleNameInputChange,
  handleClose,
  handleSave
}) => {
  return (
    <form className={styles.form}>
      <h2 className={styles.heading}>{heading}</h2>
      <TextInput
        id="habitName"
        value={habitNameInputValue}
        onChange={handleNameInputChange}
        name="name"
        label="name"
        error={errorMessage}
      />
      <Button type="button" onClick={handleClose}>
        Close
      </Button>
      <Button type="submit" onClick={handleSave}>
        Save
      </Button>
    </form>
  );
};

export default HabitForm;
