import React from 'react'
import { useGetStatsQuery } from '../../redux/statsApi';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const StoreStatsPage = () => {
    
  const { data, isLoading, error } = useGetStatsQuery();

  if (isLoading) return <p>Loading stats...</p>;
  if (error) return <p className="text-red-500">Error loading stats</p>;

  const {
    totalOrders,
    totalRevenue,
    totalUsers,
    totalBooks,
    statusBreakdown = [],
  } = data;

  const chartData = {
    labels: statusBreakdown.map((s) => s._id),
    datasets: [
      {
        data: statusBreakdown.map((s) => s.count),
        backgroundColor: ['#facc15', '#22c55e', '#3b82f6', '#ef4444'],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">📊 Store Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox label="Orders" value={totalOrders} />
        <StatBox label="Revenue" value={`$${totalRevenue}`} />
        <StatBox label="Users" value={totalUsers} />
        <StatBox label="Books" value={totalBooks} />
      </div>

      <div className="bg-white rounded p-4 shadow w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2">Order Status</h3>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

const StatBox = ({ label, value }) => (
  <div className="bg-white p-4 rounded shadow text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

  
export default StoreStatsPage