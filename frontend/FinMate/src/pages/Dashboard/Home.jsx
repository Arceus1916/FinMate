import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

const Home = () => {
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <h2 className="text-xl font-semibold text-center">Welcome to the Dashboard</h2>
      </div>
    </DashboardLayout>
  );
};

export default Home;
