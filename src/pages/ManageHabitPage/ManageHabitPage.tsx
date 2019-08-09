import React, { useState } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Redirect } from "react-router-dom";
import { History } from "history";

import { Habit } from "../../redux/habits/types";
import { AppState } from "../../redux/store/store";
import { deleteHabit } from "../../redux/habits/habitsActions";
import Modal from "../../components/Modal/Modal";
import Header from "../../components/Header/Header";
import IconButton from "../../components/IconButton/IconButton";
import EditHabit from "../../components/EditHabit/EditHabit";

interface ManageHabitPageProps {
  habit: Habit;
  deleteHabit: typeof deleteHabit;
  history: History;
}

const ManageHabitPage: React.FunctionComponent<ManageHabitPageProps> = ({
  habit,
  deleteHabit,
  history
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

  function handleGoBack() {
    history.goBack();
  }

  if (!habit || redirect) {
    return <Redirect to="/" />;
  } else if (habit) {
    return (
      <div>
        <Header>
          <Header.Heading>
            <IconButton onClick={handleGoBack} iconName="arrow_back" />
            <h1>{habit.name}</h1>
          </Header.Heading>
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
  const history = ownProps.history;
  console.log(history);

  return {
    habit,
    history
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