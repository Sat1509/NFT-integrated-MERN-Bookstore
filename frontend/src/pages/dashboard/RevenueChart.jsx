import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
 // Import the CSS file for styling

import './css/RevenueChart.css'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = () => {
  const revenueData = [500, 700, 800, 600, 750, 900, 650, 870, 960, 1020, 1100, 1150];

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue (USD)',
        data: revenueData,
        backgroundColor: 'rgba(113, 85, 122, 0.7)', // Muted purple (from your color scheme)
        borderColor: '#71557a', // Muted purple
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Revenue',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="revenue-chart-container">
      <h2 className="revenue-chart-title">Monthly Revenue</h2>
      <div className="chart-wrapper">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default RevenueChart;
