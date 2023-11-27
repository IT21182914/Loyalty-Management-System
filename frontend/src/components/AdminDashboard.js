import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateUserModal from './UpdateUserModal';
import AddPointsModal from './AddPointsModal';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isAddPointsModalOpen, setAddPointsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/admin/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedUser(null);
    setUpdateModalOpen(false);
  };

  const openAddPointsModal = (user) => {
    setSelectedUser(user);
    setAddPointsModalOpen(true);
  };

  const closeAddPointsModal = () => {
    setSelectedUser(null);
    setAddPointsModalOpen(false);
  };

  const updateUserData = async (userId, newName) => {
    try {
      const response = await axios.put(`http://localhost:8000/admin/users/${userId}`, { name: newName });

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? { ...user, name: response.data.user.name } : user))
      );

      closeUpdateModal();

      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const addPointsToUser = async (userId, pointsToAdd) => {
    try {
      const response = await axios.put(`http://localhost:8000/admin/users/${userId}/loyaltyPoints`, { pointsToAdd });

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? response.data.user : user))
      );

      closeAddPointsModal();

      return response.data;
    } catch (error) {
      console.error('Error adding loyalty points:', error);
      throw error;
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">
          Admin Dashboard
        </h1>

        <form className="max-w-md mx-auto mb-4">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Users by Name...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex justify-end px-4 pt-4">
                <button
                  onClick={() => openUpdateModal(user)}
                  className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                  type="button"
                >
                  <span className="sr-only">Open dropdown</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </button>
                <div
                  className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul className="py-2" aria-labelledby="dropdownButton">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Edit User
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Add Loyalty Points
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col items-center pb-10">
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src={`https://st3.depositphotos.com/15648834/17930/v/1600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg=${user._id}`}
                  alt={`${user.name} image`}
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {user.name}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {user.role}
                </span>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Loyalty Points: {user.loyaltyPoints}
                </p>
                <div className="flex mt-4 md:mt-6">
                  <button
                    onClick={() => openUpdateModal(user)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update User
                  </button>
                  <button
                    onClick={() => openAddPointsModal(user)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ms-3"
                  >
                    Add Loyalty Points
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Render the UpdateUserModal component */}
        {isUpdateModalOpen && selectedUser && (
          <UpdateUserModal
            user={selectedUser}
            onUpdate={updateUserData}
            onNameUpdate={(newName) => {
              setSelectedUser((prevUser) => ({ ...prevUser, name: newName }));
            }}
            onClose={closeUpdateModal}
          />
        )}

        {/* Render the AddPointsModal component */}
        {isAddPointsModalOpen && selectedUser && (
  <AddPointsModal
    user={selectedUser}
    onAddPoints={(userId, pointsToAdd) => {
      // Add the logic to handle adding/deducting loyalty points here
      console.log(`Adding/Deducting ${pointsToAdd} points to user ${userId}`);
      closeAddPointsModal();
    }}
    onClose={closeAddPointsModal}
  />
)}
      </div>
    </section>
  );
};

export default AdminDashboard;
