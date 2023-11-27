// App.js
import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from './components/UserDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/user/*" element={<UserDashboard />} />
       
      </Routes>
    </Router>
  );
}

export default App;
