import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUsers } from '../data/mockData';

const UserDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  // NEW: State to manage the active tab
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'loans', or 'payments'

  useEffect(() => {
    fetchUsers().then(allUsers => setUser(allUsers.find(u => u.id === id) || allUsers[0]));
  }, [id]);

  // Mock Action Handlers
  const handleEditProfile = () => alert(`Opening edit modal for ${user.name}`);
  const handleSuspendUser = () => {
    const confirm = window.confirm(`Are you sure you want to suspend ${user.name}? They will not be able to place new orders.`);
    if (confirm) alert('User suspended successfully.');
  };

  if (!user) return <div className="page-content">Loading...</div>;

  return (
    <>
      {/* HEADER & ACTION BUTTONS */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button onClick={() => navigate(-1)} className="btn-outline">← Back</button>
          <div>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {user.businessName} 
              {user.verified && <span className="badge-verified" style={{ fontSize: '12px' }}>✓ Verified</span>}
            </h1>
            <p>Owner: {user.name} | User ID: {user.id}</p>
          </div>
        </div>

        {/* NEW: Admin Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleEditProfile} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            ✏️ Edit Profile
          </button>
          <button onClick={handleSuspendUser} style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
            🚫 Suspend User
          </button>
        </div>
      </div>

      {/* TOP INFO GRID: User Details & KYC */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
        <div className="chart-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ color: '#1E293B', marginBottom: '15px' }}>Contact Details</h3>
          <p style={{ marginBottom: '8px' }}><strong>Mobile:</strong> {user.mobile}</p>
          <p style={{ marginBottom: '8px' }}><strong>Address:</strong> {user.address}</p>
          <p><strong>Status:</strong> <span className={`status-badge ${user.status}`}>{user.status}</span></p>
        </div>

        <div className="chart-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ color: '#1E293B', marginBottom: '15px' }}>KYC & Business Info</h3>
          <p style={{ marginBottom: '8px' }}><strong>Business Type:</strong> Retail FMCG</p>
          <p style={{ marginBottom: '8px' }}><strong>GSTIN:</strong> 06BZPJXXXXX1Z5</p>
          <p>
            <strong>KYC Status:</strong> 
            <span className={`badge-outline`} style={{ marginLeft: '10px', borderColor: user.kycStatus === 'Approved' ? '#22C55E' : '#F59E0B', color: user.kycStatus === 'Approved' ? '#166534' : '#D97706', background: user.kycStatus === 'Approved' ? '#DCFCE7' : '#FEF3C7' }}>
              {user.kycStatus}
            </span>
          </p>
        </div>

        <div className="chart-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ color: '#1E293B', marginBottom: '15px' }}>Panji Account Metrics</h3>
          <p style={{ marginBottom: '8px' }}><strong>Total Orders:</strong> <span className="fw-500">{user.orders}</span></p>
          <p style={{ marginBottom: '8px' }}><strong>Approved Loan Limit:</strong> <span className="fw-500 color-green">{user.loanLimit}</span></p>
          <p><strong>Platform Rating:</strong> {user.rating} ⭐</p>
        </div>
      </div>

      {/* TABBED INTERFACE FOR HISTORY */}
      <div style={{ marginTop: '30px', background: 'white', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        
        {/* Tab Controls */}
        <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
          <button 
            onClick={() => setActiveTab('orders')}
            style={{ flex: 1, padding: '15px', background: activeTab === 'orders' ? 'white' : 'transparent', border: 'none', borderBottom: activeTab === 'orders' ? '3px solid #1D4ED8' : '3px solid transparent', color: activeTab === 'orders' ? '#1D4ED8' : '#64748B', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s' }}
          >
            📦 Order History
          </button>
          <button 
            onClick={() => setActiveTab('loans')}
            style={{ flex: 1, padding: '15px', background: activeTab === 'loans' ? 'white' : 'transparent', border: 'none', borderBottom: activeTab === 'loans' ? '3px solid #1D4ED8' : '3px solid transparent', color: activeTab === 'loans' ? '#1D4ED8' : '#64748B', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s' }}
          >
            💳 Loan History
          </button>
          <button 
            onClick={() => setActiveTab('payments')}
            style={{ flex: 1, padding: '15px', background: activeTab === 'payments' ? 'white' : 'transparent', border: 'none', borderBottom: activeTab === 'payments' ? '3px solid #1D4ED8' : '3px solid transparent', color: activeTab === 'payments' ? '#1D4ED8' : '#64748B', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s' }}
          >
            💰 Payment Ledger
          </button>
        </div>

        {/* Tab Content Areas */}
        <div style={{ padding: '0' }}>
          
          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <table className="data-table">
              <thead><tr><th>Order ID</th><th>Date</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td className="fw-500">ORD-12456</td><td>20 Feb 2026</td><td className="fw-500 color-blue">₹45,000</td><td><span className="status-badge completed">completed</span></td><td><button className="btn-outline" onClick={() => navigate('/orders/ORD-12456')}>View</button></td></tr>
                <tr><td className="fw-500">ORD-12455</td><td>20 Feb 2026</td><td className="fw-500 color-blue">₹32,000</td><td><span className="status-badge pending">pending</span></td><td><button className="btn-outline" onClick={() => navigate('/orders/ORD-12455')}>View</button></td></tr>
              </tbody>
            </table>
          )}

          {/* LOANS TAB */}
          {activeTab === 'loans' && (
            <table className="data-table">
              <thead><tr><th>Loan ID</th><th>Requested</th><th>Approved</th><th>Duration</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td className="fw-500">LN-2001</td><td className="fw-500 color-blue">₹2.5L</td><td className="fw-500 color-green">₹2.5L</td><td>12 months</td><td><span className="status-badge active">active</span></td><td><button className="btn-outline" onClick={() => navigate('/loans/LN-2001')}>View</button></td></tr>
                <tr><td className="fw-500">LN-1050</td><td className="fw-500 color-blue">₹1.0L</td><td className="fw-500 color-green">₹1.0L</td><td>6 months</td><td><span className="status-badge completed">completed</span></td><td><button className="btn-outline">View</button></td></tr>
              </tbody>
            </table>
          )}

          {/* PAYMENTS TAB */}
          {activeTab === 'payments' && (
            <table className="data-table">
              <thead><tr><th>Txn ID</th><th>Date</th><th>Reference</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td className="fw-500">TXN-5001</td><td>20 Feb 2026</td><td>ORD-12456</td><td><span className="badge-outline">Order</span></td><td className="fw-500 color-green">₹45,000</td><td><span className="status-badge completed">completed</span></td></tr>
                <tr><td className="fw-500">TXN-5003</td><td>19 Feb 2026</td><td>LN-2001</td><td><span className="badge-outline">Loan Disbursement</span></td><td className="fw-500 color-orange">₹2,50,000</td><td><span className="status-badge completed">completed</span></td></tr>
              </tbody>
            </table>
          )}

        </div>
      </div>
    </>
  );
};

export default UserDetail;