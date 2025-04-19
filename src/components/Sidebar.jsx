import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiHome, FiPlusCircle, FiList } from 'react-icons/fi';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <aside className="bg-indigo-700 text-white w-64 h-screen fixed top-0 left-0 shadow-md flex flex-col justify-between">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-10">FinMate</h2>
        <nav className="flex flex-col gap-4 text-lg">
          <Link to="/dashboard" className="flex items-center gap-2 hover:text-gray-300">
            <FiHome /> Dashboard
          </Link>
          <Link to="/add" className="flex items-center gap-2 hover:text-gray-300">
            <FiPlusCircle /> Add Transaction
          </Link>
          <Link to="/transactions" className="flex items-center gap-2 hover:text-gray-300">
            <FiList /> History
          </Link>
        </nav>
      </div>
      <div className="p-6 border-t border-indigo-500">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-300 hover:text-red-500"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
