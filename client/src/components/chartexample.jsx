// src/components/ChartExample.jsx
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from 'recharts';

// Mock Data for Projects Completed (2016 - Present)
const projectData = [
  { year: '2016', projects: 5 },
  { year: '2017', projects: 10 },
  { year: '2018', projects: 8 },
  { year: '2019', projects: 15 },
  { year: '2020', projects: 20 },
  { year: '2021', projects: 25 },
  { year: '2022', projects: 18 },
  { year: '2023', projects: 30 },
  { year: '2024', projects: 22 },
];

// Mock Data for Total Revenue Earned
const revenueData = [
  { month: 'Jan', revenue: 5000 },
  { month: 'Feb', revenue: 7000 },
  { month: 'Mar', revenue: 4000 },
  { month: 'Apr', revenue: 8000 },
  { month: 'May', revenue: 6000 },
];

// Mock Data for Revenue by Source
const revenueBySourceData = [
  { name: 'Physical', value: 40000 },
  { name: 'Online', value: 60000 },
];

// Colors for the Pie Chart
const COLORS = ['#0088FE', '#00C49F'];

function ChartExample() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', padding: '20px' }}>
      {/* Line Chart for Projects Completed */}
      <div>
        <h3>Projects Completed (2016 - Present)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={projectData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="projects" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart for Total Revenue Earned */}
      <div>
        <h3>Total Revenue Earned (by Month)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart for Revenue by Source */}
      <div>
        <h3>Revenue by Source</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={revenueBySourceData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
            >
              {revenueBySourceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartExample;
