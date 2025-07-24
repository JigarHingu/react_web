// FILE: src/components/shared/Modal.jsx

import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    // Backdrop
    <div 
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
    >
      {/* Modal Content */}
      <div 
        onClick={(e) => e.stopPropagation()} // Prevents closing modal when clicking inside
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 relative m-4"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        {/* Body */}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
