import React from "react";

import Modal from "../../components/Modal/Modal";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Button from "../Button/Button";
import styles from "./ConfirmationDialog.module.css";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  contentLabel: string;
  message: string;
}

const ConfirmationDialog: React.FunctionComponent<ConfirmationDialogProps> = ({
  isOpen,
  onCancel,
  contentLabel,
  message,
  onConfirm
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel={contentLabel}
    >
      <h2 className={styles.heading}>{message}</h2>
      <ButtonGroup>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" onClick={onConfirm} isPrimary={true}>
          Yes
        </Button>
      </ButtonGroup>
    </Modal>
  );
};

export default ConfirmationDialog;
