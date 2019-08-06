import React from "react";
import ReactModal from "react-modal";
import styles from "./Modal.module.css";

ReactModal.setAppElement("#root");

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
}

const Modal: React.FunctionComponent<ModalProps> = ({
  children,
  isOpen,
  onRequestClose,
  contentLabel
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      className={styles.content}
      overlayClassName={styles.overlay}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
