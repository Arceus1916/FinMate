import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const AddTransaction = () => {
  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    category: '',
    date: '',
    notes: ''
  });

  const categories = ['Food', 'Travel', 'Rent', 'Entertainment', 'Salary', 'Other'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/transactions', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Transaction added successfully!');
      setFormData({
        amount: '',
        type: 'expense',
        category: '',
        date: '',
        notes: ''
      });

    } catch (error) {
      console.error(error);
      alert('Error adding transaction');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Add Transaction</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl p-6 max-w-xl shadow-md space-y-4"
        >
          <div>
            <label className="block text-gray-600 mb-1">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Notes (optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              rows={3}
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Add Transaction
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddTransaction;
