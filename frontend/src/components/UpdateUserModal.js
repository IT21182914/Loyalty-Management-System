import React, { useState } from 'react';

const UpdateUserModal = ({ user, onUpdate, onClose }) => {
  const [newName, setNewName] = useState(user.name);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      await onUpdate(user._id, newName);
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 w-96 rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Update User</h2>
        <div className="mb-4">
          <label htmlFor="newName" className="block text-sm font-medium text-gray-900">
            New Name
          </label>
          <input
            type="text"
            id="newName"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={newName}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
