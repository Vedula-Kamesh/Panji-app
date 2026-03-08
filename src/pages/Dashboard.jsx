import React, { useState, useEffect } from 'react';
import { fetchDashboardMetrics } from '../data/mockdata';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';

const Dashboard = () => {
  const [metrics, setMetrics] = useState([]);
  useEffect(() => { fetchDashboardMetrics().then(setMetrics); }, []);

  // Chart Data based on PPT
  const areaData = [
    { month: 'Jan', revenue: 45000 }, { month: 'Feb', revenue: 52000 }, { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 }, { month: 'May', revenue: 55000 }, { month: 'Jun', revenue: 67000 },
    { month: 'Jul', revenue: 72000 }, { month: 'Aug', revenue: 68000 }, { month: 'Sep', revenue: 78000 },
    { month: 'Oct', revenue: 84000 }, { month: 'Nov', revenue: 91000 }, { month: 'Dec', revenue: 95200 }
  ];

  const barData = [
    { day: 'Mon', vol: 45 }, { day: 'Tue', vol: 52 }, { day: 'Wed', vol: 48 },
    { day: 'Thu', vol: 61 }, { day: 'Fri', vol: 55 }, { day: 'Sat', vol: 38 }, { day: 'Sun', vol: 42 }
  ];

  const pieData = [
    { name: 'Completed', value: 54, color: '#3B82F6' },
    { name: 'Active', value: 36, color: '#10B981' },
    { name: 'Pending', value: 8, color: '#F59E0B' },
    { name: 'Defaulted', value: 2, color: '#EF4444' }
  ];

  // Custom function to format Pie Chart labels as Percentages
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    // Position the label slightly outside the center of the slice
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="12px" fontWeight="bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p>Financial command center for Panji Operations</p>
      </div>

      <div className="metrics-grid">
        {metrics.map((m, index) => (
          <div className="metric-card" key={index}>
            <div className="metric-header">
              <span className="metric-title">{m.title}</span>
              <div className="metric-icon" style={{ backgroundColor: m.iconBg, color: m.iconColor }}>{m.icon}</div>
            </div>
            <div className="metric-value">{m.value}</div>
            <div>
              <span className={`trend ${m.isUp ? 'up' : 'down'}`}>{m.isUp ? '↗ ' : '↘ '}{m.trend}</span>
              <span className="trend-context">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Revenue Chart */}
      <div className="chart-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '20px' }}>Revenue & Order Trends</h3>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" tickLine={false} axisLine={false} />
              <YAxis stroke="#64748B" tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Grid: Bar Chart & Pie Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div className="chart-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ marginBottom: '20px' }}>Weekly Order Volume</h3>
          {/* Increased height slightly so charts match properly */}
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" stroke="#64748B" tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: '#F1F5F9'}} />
                <Bar dataKey="vol" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ marginBottom: '20px' }}>Loan Distribution</h3>
          {/* Increased height so the legend fits perfectly */}
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={pieData} 
                  cx="50%" 
                  cy="45%" // Shifted slightly up to make room for the Legend
                  innerRadius={65} 
                  outerRadius={100} 
                  paddingAngle={3} 
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomizedLabel} // Added the custom percentage labels
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;