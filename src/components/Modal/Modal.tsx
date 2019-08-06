import React from "react";
import ReactModal from "react-modal";

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
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
