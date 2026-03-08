import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUsers } from '../data/mockdata';

const UserDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUsers().then(allUsers => {
      const foundUser = allUsers.find(u => u.id === id);
      setUser(foundUser);
    });
  }, [id]);

  if (!user) return <div className="page-content">Loading user details...</div>;

  return (
    <>
      <div className="page-header" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <button onClick={() => navigate(-1)} className="btn-outline">← Back</button>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {user.name} 
            {user.verified && <span className="badge-verified" style={{ fontSize: '12px' }}>Verified</span>}
          </h1>
          <p>User ID: {user.id} | Mobile: {user.mobile}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginTop: '20px' }}>
        <div className="chart-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3>Account Overview</h3>
          <hr style={{ margin: '15px 0', borderColor: '#E2E8F0' }} />
          <p><strong>Status:</strong> <span className={`status-badge ${user.status}`}>{user.status}</span></p>
          <p style={{ marginTop: '10px' }}><strong>Total Orders:</strong> {user.orders}</p>
          <p style={{ marginTop: '10px' }}><strong>Loan Limit:</strong> {user.loanLimit}</p>
          <p style={{ marginTop: '10px' }}><strong>Rating:</strong> {user.rating ? `${user.rating} ⭐` : 'N/A'}</p>
        </div>

        <div className="table-container">
          <h3 style={{ padding: '20px', borderBottom: '1px solid #E2E8F0', background: 'white' }}>Recent Order & Payment History</h3>
          <table className="data-table">
            <thead>
              <tr><th>Order ID</th><th>Date</th><th>Amount</th><th>Type</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr><td className="fw-500">ORD-9991</td><td>20 Feb 2026</td><td className="fw-500 color-blue">₹12,500</td><td><span className="badge-outline">Loan + UPI</span></td><td><span className="status-badge completed">completed</span></td></tr>
              <tr><td className="fw-500">ORD-9992</td><td>18 Feb 2026</td><td className="fw-500 color-blue">₹8,000</td><td><span className="badge-outline">UPI</span></td><td><span className="status-badge completed">completed</span></td></tr>
              <tr><td className="fw-500">ORD-9993</td><td>10 Feb 2026</td><td className="fw-500 color-blue">₹45,000</td><td><span className="badge-outline">Loan</span></td><td><span className="status-badge completed">completed</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserDetail;