import React from "react";
import Modal from "react-modal";

interface DialogBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
}

const DialogBox: React.FC<DialogBoxProps> = ({ isOpen, onClose, onRemove }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirmation"
      className="alert-modal"
      overlayClassName="alert-overlay"
    >
      <h2>Confirmation</h2>
      <p>Are you sure you want to remove this quiz?</p>
      <div className="alert-content">
        <button onClick={onClose}>Cancel</button>
        <button className="remove-button" onClick={onRemove}>
          Remove
        </button>
      </div>
    </Modal>
  );
};

export default DialogBox;
