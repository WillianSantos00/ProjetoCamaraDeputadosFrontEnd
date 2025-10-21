import React from 'react';
import './ModalIA.css';
import { FaTimes, FaRobot } from 'react-icons/fa';

function ModalIA({ visible, title, text, onClose }) {
  if (!visible) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <FaRobot className="modal-icon" />
            <h3>{title}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">
          <p>{text || "Aguarde, a IA está a processar a sua resposta..."}</p>
        </div>
      </div>
    </div>
  );
}

export default ModalIA;
