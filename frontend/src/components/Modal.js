import React from 'react';
import '../styles/Modal.css';
import '../styles/global.css';

const Modal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose} className="modal-button">Aceptar</button>
      </div>
    </div>
  );
};

export default Modal;
