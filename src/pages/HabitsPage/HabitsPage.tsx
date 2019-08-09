import React, { useState } from "react";
import { connect } from "react-redux";

import { AppState } from "../../redux/store/store";
import { HabitsState } from "../../redux/habits/types";

import Header from "../../components/Header/Header";
import HabitsTable from "../../components/HabitsTable/HabitsTable";
import IconButton from "../../components/IconButton/IconButton";
import AddHabit from "../../components/AddHabit/AddHabit";
import Modal from "../../components/Modal/Modal";
import WithAddHabitMessage from "../../components/WithAddHabitMessage/WithAddHabitMessage";

interface HabitsPageProps {
  habits: HabitsState;
}

const HabitsPage: React.FunctionComponent<HabitsPageProps> = ({ habits }) => {
  const [modalOpen, setModalOpen] = useState(false);

  function handleOpenModal(): void {
    setModalOpen(true);
  }
  function handleCloseModal(): void {
    setModalOpen(false);
  }

  return (
    <div>
      <Header>
        <Header.Heading>
          <h1>Habits</h1>
        </Header.Heading>
        <Header.Actions>
          <WithAddHabitMessage isActive={habits.length === 0}>
            <IconButton onClick={handleOpenModal} iconName="add" />
          </WithAddHabitMessage>
        </Header.Actions>
      </Header>
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Manage habit"
      >
        <AddHabit closeModal={handleCloseModal} isModalOpen={modalOpen} />
      </Modal>
      {habits.length > 0 && <HabitsTable />}
    </div>
  );
};

function mapStateToProps(state: AppState) {
  return {
    habits: state.habits
  };
}

export default connect(
  mapStateToProps,
  null
)(HabitsPage);
