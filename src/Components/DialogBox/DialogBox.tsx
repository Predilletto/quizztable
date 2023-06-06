import React from "react";
import Modal from "react-modal";

import "./DialogBox.css";

interface DialogBoxProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const DialogBox: React.FC<DialogBoxProps> = ({ isOpen, onClose, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Mensagem"
      className="alert-modal"
      overlayClassName="alert-overlay"
    >
      <h2>Quizzing</h2>
      <p>{message} </p>
      <div className="alert-content">
        <button onClick={onClose}>Ok</button>
      </div>
    </Modal>
  );
};

export default DialogBox;
