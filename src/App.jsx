import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import TransactionHistory from './pages/TransactionHistory';
import EditTransaction from './pages/EditTransaction';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <RegisterPage />} />

        {/* Protected Routes */}
        {isLoggedIn ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<AddTransaction />} />
            <Route path="/transactions" element={<TransactionHistory />} />
            <Route path="/edit/:id" element={<EditTransaction />} />
          </>
        ) : (
          // Redirect any protected route to login
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
