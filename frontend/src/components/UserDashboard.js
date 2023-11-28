import React from 'react';
import LogoutButton from './LogoutButton';

function UserDashboard() {
  return (
    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f4f4f4', borderRadius: '10px' }}>
      <div className="absolute top-4 right-4">
        <LogoutButton />
      </div>
      <h1 style={{ color: '#3498db', marginBottom: '30px', fontSize: '2.5em', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
        User Dashboard
      </h1>
    </div>
  );
}

export default UserDashboard;
