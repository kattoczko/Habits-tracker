import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import uniqid from "uniqid";
import * as habitsActions from "../../redux/actions/habitsActions";
import { Habit } from "../../types";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";

function AddHabit({ addNewHabit, closeModal }) {
  // const newHabit: Habit = { id: 3, name: "Dancea", done: [] };
  // return <button onClick={() => addNewHabit(newHabit)}>"button"</button>;

  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const newHabit = { id: uniqid(), name: name, done: [] };
    addNewHabit(newHabit);
    closeModal();
  }

  function handleInputValueChange(e) {
    setName(e.target.value);
  }

  return (
    <form>
      <TextInput
        value={name}
        onChange={handleInputValueChange}
        label="name"
        name="name"
      />
      <Button type="submit" value="submit" onClick={handleSubmit} />
    </form>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addNewHabit: bindActionCreators(habitsActions.addNewHabit, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(AddHabit);
