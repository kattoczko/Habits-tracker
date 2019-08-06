import React, { useState } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import uniqid from "uniqid";
import { Habit } from "../../redux/habits/types";
import * as habitsActions from "../../redux/habits/habitsActions";
import HabitForm from "../HabitForm/HabitForm";
import Modal from "../Modal/Modal";

interface AddHabitProps {
  addNewHabit: typeof habitsActions.addNewHabit;
  closeModal: () => void;
  isModalOpen: boolean;
}

const AddHabit: React.FunctionComponent<AddHabitProps> = ({
  addNewHabit,
  closeModal,
  isModalOpen
}) => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSave(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (name.trim().length === 0) {
      setErrorMessage("name can't be empty");
      return;
    } else {
      const newHabit: Habit = { id: uniqid(), name: name, done: [] };
      addNewHabit(newHabit);
      setName("");
      closeModal();
    }
  }

  function handleNameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage("");
    setName(e.target.value);
  }

  function handleCloseModal() {
    if (name.trim().length !== 0) {
      //TODO add close handling when name is not empty
      alert("Are you sure you want to close?");
      return;
    } else {
      setName("");
      closeModal();
    }
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Habit"
    >
      <HabitForm
        habitNameInputValue={name}
        errorMessage={errorMessage}
        handleNameInputChange={handleNameInputChange}
        handleClose={handleCloseModal}
        handleSave={handleSave}
      />
    </Modal>
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
