import React, { useState } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import * as habitsActions from "../../redux/habits/habitsActions";
import HabitForm from "../HabitForm/HabitForm";

//TODO after closing modal focus on the last habit added

interface AddHabitProps {
  addNewHabit: typeof habitsActions.addNewHabit;
  closeModal: () => void;
}

const AddHabit: React.FunctionComponent<AddHabitProps> = ({
  addNewHabit,
  closeModal
}) => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSave(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (name.trim().length === 0) {
      setErrorMessage("name can't be empty");
      return;
    } else {
      addNewHabit(name);
      setName("");
      closeModal();
    }
  }

  function handleNameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage("");
    setName(e.target.value);
  }

  return (
    <HabitForm
      heading="Add habit"
      habitNameInputValue={name}
      errorMessage={errorMessage}
      handleNameInputChange={handleNameInputChange}
      handleClose={closeModal}
      handleSave={handleSave}
    />
  );
};

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    addNewHabit: bindActionCreators(habitsActions.addNewHabit, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(AddHabit);
