import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Import new fetch functions
import { fetchDashboardMetrics, fetchUsers, fetchRecentActivity } from '../data/mockData';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';

const Dashboard = () => {
  const [metrics, setMetrics] = useState([]);
  // States for active user breakdown and recent activity summary
  const [activeUserBreakdown, setActiveUserBreakdown] = useState({ retailers: 0, wholesalers: 0 });
  const [recentActivities, setRecentActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch metrics as before
    fetchDashboardMetrics().then(setMetrics);
    
    // NEW: Fetch users and calculate active breakdown on mount
    fetchUsers().then(users => {
      const active = users.filter(u => u.status === 'active');
      const retailers = active.filter(u => u.type === 'retailer').length;
      const wholesalers = active.filter(u => u.type === 'wholesaler').length;
      setActiveUserBreakdown({ retailers, wholesalers });
    });

    // NEW: Fetch recent activity for the dashboard summary table
    fetchRecentActivity().then(setRecentActivities);
  }, []);

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
    { name: 'Rejected', value: 2, color: '#EF4444' }
  ];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="12px" fontWeight="bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const handleCardClick = (title) => {
    if (title.includes("Revenue") || title.includes("Commission") || title.includes("GST") || title.includes("Products")) {
      navigate('/finance');
    } else if (title === "Orders Today") {
      navigate('/orders');
    } else if (title === "Pending Orders") {
      navigate('/orders', { state: { status: 'Pending' } }); 
    } else if (title === "Active Loans") {
      navigate('/loans', { state: { status: 'Active' } });
    } else if (title === "Default Rate") {
      navigate('/risk');
    } else if (title === "Active Users") {
      navigate('/users', { state: { status: 'Active' } });
    }
  };

  return (
    <>
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p>Financial command center for Panji Operations</p>
      </div>

      <div className="metrics-grid">
        {metrics.map((m, index) => (
          <div 
            // Apply conditional CSS class for solid green card (second pic)
            className={`metric-card ${m.isGreenCard ? 'is-green' : ''}`}
            key={index} 
            onClick={() => handleCardClick(m.title)}
            style={{ 
              cursor: 'pointer', transition: 'transform 0.2s, boxShadow 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div className="metric-header">
              <span className="metric-title">{m.title}</span>
              <div 
                className="metric-icon" 
              >
                {m.icon}
              </div>
            </div>
            <div className="metric-value">{m.value}</div>
            
            {/* NEW: Display active user breakdown inside the card (first pic reference) */}
            {m.title === "Active Users" && (
                <div style={{ margin: '10px 0', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '10px 0' }}>
                    <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#64748B' }}>
                        <span style={{ fontWeight: 'bold', color: '#166534' }}>{activeUserBreakdown.retailers}</span> Retailers (Vendors)
                    </p>
                    <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
                        <span style={{ fontWeight: 'bold', color: '#1D4ED8' }}>{activeUserBreakdown.wholesalers}</span> Wholesalers
                    </p>
                </div>
            )}
            
            <div>
              <span className={`trend ${m.isUp ? 'up' : 'down'}`}>
                {m.isUp ? '↗ ' : '↘ '}{m.trend}
              </span>
              <span className="trend-context">
                vs last month
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '20px' }}>Revenue & Order Trends</h3>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
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

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div className="chart-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ marginBottom: '20px' }}>Weekly Order Volume (Click bar to view)</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" stroke="#64748B" tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: '#F1F5F9'}} />
                <Bar 
                  dataKey="vol" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]} 
                  onClick={() => navigate('/orders')} 
                  style={{ cursor: 'pointer' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ marginBottom: '20px' }}>Loan Distribution (Click slice to filter)</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={pieData} 
                  cx="50%" cy="45%" 
                  innerRadius={65} outerRadius={100} 
                  paddingAngle={3} dataKey="value"
                  labelLine={false} label={renderCustomizedLabel}
                  onClick={(entry) => navigate('/loans', { state: { status: entry.name } })}
                  style={{ cursor: 'pointer' }}
                >
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* NEW: Recent Activity Table summary at the bottom (first pic style reference) */}
      <div className="table-container data-table" style={{ marginTop: '20px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
        <h3 style={{ padding: '20px', borderBottom: '1px solid #E2E8F0', background: 'white', margin: 0 }}>Recent Activity</h3>
        <table className="data-table">
            <thead>
                <tr>
                    <th>Date & Time</th>
                    <th>Action Taken</th>
                    <th>Target</th>
                    <th>IP Address</th>
                </tr>
            </thead>
            <tbody>
                {recentActivities.map((act, index) => (
                    <tr key={index}>
                        <td className="fw-500">{`${act.date}, ${act.time}`}</td>
                        <td>
                            {/* Use action-badge class with type-specific color */}
                            <span className={`action-badge action-${act.type.toLowerCase()}`}>
                                {act.action}
                            </span>
                        </td>
                        <td>
                            {/* Use activity-target structure combining name and type */}
                            <div className="activity-target">
                                <span className="target-name">{act.user}</span>
                                <span className="target-type">{act.type}</span>
                            </div>
                        </td>
                        <td>{act.ip}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </>
  );
};
export default Dashboard;