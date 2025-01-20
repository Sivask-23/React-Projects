import React from "react";
import "../../ComponentsCss/Common Pages/Modal.css"; // Import custom CSS for styling

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // 

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
