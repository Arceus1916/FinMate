import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { FiTrash2, FiEdit3 } from 'react-icons/fi';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Food', 'Travel', 'Rent', 'Entertainment', 'Salary', 'Other'];

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/transactions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(res.data);
    } catch (error) {
      console.error('Error fetching transactions', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this transaction?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(transactions.filter((t) => t._id !== id));
      } catch (error) {
        console.error('Error deleting transaction', error);
      }
    }
  };

  const filteredTransactions = filter === 'All'
    ? transactions
    : transactions.filter((t) => t.category === filter);

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Transaction History</h1>

        <div className="mb-4">
          <label className="mr-2 text-gray-600">Filter by Category:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {filteredTransactions.length === 0 ? (
          <p className="text-gray-500">No transactions found.</p>
        ) : (
          <div className="space-y-4">
            {filteredTransactions.map((tx) => (
              <div key={tx._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    ₹{tx.amount} <span className={`text-sm ml-2 ${tx.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                      [{tx.type}]
                    </span>
                  </h3>
                  <p className="text-gray-500">{tx.category} | {new Date(tx.date).toLocaleDateString()}</p>
                  {tx.notes && <p className="text-gray-400 italic text-sm mt-1">{tx.notes}</p>}
                </div>
                <div className="flex gap-4">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FiEdit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(tx._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TransactionHistory;
