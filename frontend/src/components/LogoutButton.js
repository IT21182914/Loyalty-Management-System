import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-2 px-4 rounded-full hover:bg-gradient-to-r hover:from-red-600 hover:to-red-800 focus:outline-none focus:shadow-outline-red active:bg-red-800 transition duration-300 ease-in-out transform hover:scale-105"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
