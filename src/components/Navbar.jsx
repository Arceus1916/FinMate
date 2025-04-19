import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth token
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">FinMate</h1>
      <ul className="flex gap-6 items-center">
        <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
        <li><Link to="/add" className="hover:underline">Add Transaction</Link></li>
        <li><Link to="/transactions" className="hover:underline">History</Link></li>
        <li>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
