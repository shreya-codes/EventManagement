import React from "react";

const DeleteConfirmationModal: React.FC<{
  onCancel: () => void;
  onConfirm: () => void;
  onClose: () => void;
}> = ({ onCancel, onConfirm, onClose }) => {
  return (
    <main className="w-full h-screen flex flex-col items-center  bg-gray-50 sm:px-4">
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-50 bg-opacity-70 z-50">
        <div className="bg-white w-full max-w-md p-4 sm:p-6 sm:rounded-lg relative">
          <div>
            <button
              className="absolute top-4 right-4 text-gray-500 px-4 py-2"
              onClick={onClose}
            >
              close
            </button>
          </div>
          <p>Are you sure you want to delete this event?</p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              onClick={onConfirm}
            >
              Confirm
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DeleteConfirmationModal;
