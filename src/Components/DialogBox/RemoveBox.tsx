import React from "react";
import Modal from "react-modal";

import "./RemoveBox.css";

interface DialogBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
}

const RemoveBox: React.FC<DialogBoxProps> = ({ isOpen, onClose, onRemove }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirmation"
      className="remove-modal"
      overlayClassName="remove-overlay"
    >
      <h2>Confirmação</h2>
      <p>Tem certeza que deseja remover esse quiz? </p>
      <div className="remove-content">
        <button onClick={onClose}>Cancelar</button>
        <button className="remove-button" onClick={onRemove}>
          Remover
        </button>
      </div>
    </Modal>
  );
};

export default RemoveBox;
