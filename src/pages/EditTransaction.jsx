import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const EditTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    category: '',
    date: '',
    notes: ''
  });

  const categories = ['Food', 'Travel', 'Rent', 'Entertainment', 'Salary', 'Other'];

  useEffect(() => {
    fetchTransaction();
  }, []);

  const fetchTransaction = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = res.data;
      setFormData({
        amount: data.amount,
        type: data.type,
        category: data.category,
        date: data.date.substring(0, 10), // format YYYY-MM-DD
        notes: data.notes
      });
    } catch (error) {
      console.error('Error fetching transaction', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/transactions/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Transaction updated!');
      navigate('/transactions');
    } catch (error) {
      console.error('Error updating transaction', error);
      alert('Failed to update');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Edit Transaction</h1>
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
            Update Transaction
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditTransaction;
