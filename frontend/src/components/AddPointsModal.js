import React, { useState } from 'react';
import axios from 'axios';

const AddPointsModal = ({ user, onAddPoints, onClose }) => {
  const [pointsToAdd, setPointsToAdd] = useState(0);

  const handleAddPoints = async () => {
    try {
      // Make an API request to update loyalty points
      const response = await axios.put(`http://localhost:8000/admin/users/${user._id}/loyaltyPoints`, {
        pointsToAdd: parseInt(pointsToAdd, 10),
      });

      // Check if the request was successful
      if (response.data.success) {
        // Call the parent component's callback to update the UI
        onAddPoints(user._id, pointsToAdd);
        // Close the modal
        onClose();
      } else {
        // Handle errors from the server
        console.error('Error adding loyalty points:', response.data.message);
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error('Error adding loyalty points:', error.message);
    }

    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay, show/hide based on modal state */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        {/* Modal panel, show/hide based on modal state */}
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Add Loyalty Points for {user.name}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Enter the number of loyalty points to add or deduct for {user.name}.
                  </p>
                  <input
                    type="number"
                    placeholder="Enter points"
                    value={pointsToAdd}
                    onChange={(e) => setPointsToAdd(e.target.value)}
                    className="mt-2 w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleAddPoints}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Add Points
            </button>
            <button
              onClick={onClose}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPointsModal;
