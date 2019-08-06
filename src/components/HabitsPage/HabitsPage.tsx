import React, { useState } from "react";
import Header from "../Header/Header";
import HabitsTable from "../HabitsTable/HabitsTable";
import IconButton from "../IconButton/IconButton";
import AddHabit from "../AddHabit/AddHabit";

const HabitsPage: React.FunctionComponent<{}> = () => {
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
          <IconButton onClick={handleOpenModal} iconName="add" />
        </Header.Actions>
      </Header>
      <AddHabit closeModal={handleCloseModal} isModalOpen={modalOpen} />
      <HabitsTable />
    </div>
  );
};

export default HabitsPage;
