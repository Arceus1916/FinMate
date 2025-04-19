import React from 'react';
import Sidebar from '../components/Sidebar';
import { PieChart, Pie, Cell, Tooltip, BarChart, XAxis, YAxis, Bar, Legend } from 'recharts';

const Dashboard = () => {
  // Sample data (to be replaced with API data)
  const totalIncome = 5000;
  const totalExpenses = 3200;
  const budgetGoal = 6000;

  const spendingByCategory = [
    { name: 'Food', value: 1200 },
    { name: 'Rent', value: 1000 },
    { name: 'Travel', value: 400 },
    { name: 'Subscriptions', value: 600 }
  ];

  const monthlyData = [
    { month: 'Jan', income: 2000, expenses: 1500 },
    { month: 'Feb', income: 1800, expenses: 1200 },
    { month: 'Mar', income: 2500, expenses: 2000 }
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl p-4 shadow">
            <h2 className="text-lg font-semibold text-gray-600">Total Income</h2>
            <p className="text-2xl text-green-500 font-bold">₹{totalIncome}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <h2 className="text-lg font-semibold text-gray-600">Total Expenses</h2>
            <p className="text-2xl text-red-500 font-bold">₹{totalExpenses}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <h2 className="text-lg font-semibold text-gray-600">Budget Progress</h2>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className="bg-indigo-500 h-4 rounded-full"
                style={{ width: `${(totalExpenses / budgetGoal) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{((totalExpenses / budgetGoal) * 100).toFixed(1)}% used of ₹{budgetGoal}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-4 shadow">
            <h2 className="text-lg font-semibold text-gray-600 mb-2">Spending by Category</h2>
            <PieChart width={300} height={250}>
              <Pie
                data={spendingByCategory}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {spendingByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          <div className="bg-white rounded-xl p-4 shadow">
            <h2 className="text-lg font-semibold text-gray-600 mb-2">Monthly Overview</h2>
            <BarChart width={300} height={250} data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#4ade80" />
              <Bar dataKey="expenses" fill="#f87171" />
            </BarChart>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
