import React, { useState } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Redirect } from "react-router-dom";

import { Habit } from "../../redux/habits/types";
import { AppState } from "../../redux/store/store";
import { deleteHabit } from "../../redux/habits/habitsActions";
import Modal from "../Modal/Modal";
import Header from "../Header/Header";
import IconButton from "../IconButton/IconButton";
import EditHabit from "../EditHabit/EditHabit";

interface ManageHabitPageProps {
  habit: Habit;
  deleteHabit: typeof deleteHabit;
}

const ManageHabitPage: React.FunctionComponent<ManageHabitPageProps> = ({
  habit,
  deleteHabit
}) => {
  const [redirect, setRedirect] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  function handleDelete() {
    //TODO add propt when somebody wants to delete a habit
    setRedirect(true);
    deleteHabit(habit.id);
  }

  function handleToggleModal() {
    setModalOpen(!modalOpen);
  }

  if (!habit || redirect) {
    return <Redirect to="/" />;
  } else if (habit) {
    return (
      <div>
        <Header>
          <Header.Heading>{habit.name}</Header.Heading>
          <Header.Actions>
            <IconButton onClick={handleDelete} iconName="delete" />
            <IconButton onClick={handleToggleModal} iconName="edit" />
          </Header.Actions>
        </Header>
        <Modal
          isOpen={modalOpen}
          onRequestClose={handleToggleModal}
          contentLabel="Manage habit"
        >
          <EditHabit habit={habit} closeModal={handleToggleModal} />
        </Modal>
      </div>
    );
  }
  return;
};

type TParams = { id: string };

function mapStateToProps(
  state: AppState,
  ownProps: RouteComponentProps<TParams>
) {
  const habitId = ownProps.match.params.id;
  const habit = state.habits.find(habit => habit.id === habitId);

  return {
    habit
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    deleteHabit: bindActionCreators(deleteHabit, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageHabitPage);
