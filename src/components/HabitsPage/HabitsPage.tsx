import React, { useState } from "react";
import Modal from "react-modal";

import HabitsTable from "../HabitsTable/HabitsTable";
import IconButton from "../IconButton/IconButton";
import AddHabit from "../AddHabit/AddHabit";

Modal.setAppElement("#root");

function HabitsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  function handleOnClick() {
    setModalOpen(true);
  }

  function handleCloseModel() {
    setModalOpen(false);
  }

  return (
    <div>
      <IconButton onClick={handleOnClick}>
        <i className="material-icons">add</i>
      </IconButton>
      <HabitsTable />
      <Modal
        isOpen={modalOpen}
        // onAfterOpen={this.afterOpenModal}
        onRequestClose={handleCloseModel}
        contentLabel="Example Modal"
      >
        <AddHabit closeModal={handleCloseModel} />
      </Modal>
    </div>
  );
}

export default HabitsPage;
