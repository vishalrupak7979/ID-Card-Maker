import React from 'react';


const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1b2431] text-white rounded-lg p-6 w-96 relative shadow-lg  ">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4">Delete</h2>
        <p className="mb-6">Are you sure you want to perform the delete operation?</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-600 hover:text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded hover:from-blue-700 hover:to-blue-600"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
