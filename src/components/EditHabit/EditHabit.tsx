import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Habit } from "../../redux/habits/types";
import * as habitsActions from "../../redux/habits/habitsActions";
import HabitForm from "../HabitForm/HabitForm";

interface EditHabitProps {
  habit: Habit;
  closeModal: () => void;
  updateHabit: typeof habitsActions.updateHabit;
}

const EditHabit: React.FunctionComponent<EditHabitProps> = ({
  closeModal,
  habit,
  updateHabit
}) => {
  const [name, setName] = useState(habit.name);
  const [errorMessage, setErrorMessage] = useState("");

  function handleSave(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (name.trim().length === 0) {
      setErrorMessage("name can't be empty");
      return;
    } else {
      updateHabit(habit.id, name);
      closeModal();
    }
  }

  function handleNameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage("");
    setName(e.target.value);
  }

  return (
    <HabitForm
      habitNameInputValue={name}
      errorMessage={errorMessage}
      handleNameInputChange={handleNameInputChange}
      handleClose={closeModal}
      handleSave={handleSave}
    />
  );
};

function mapDispatchToProps(dispatch) {
  return {
    updateHabit: bindActionCreators(habitsActions.updateHabit, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(EditHabit);
