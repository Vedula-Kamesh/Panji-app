import React from 'react';

const Security = () => {
  return (
    <>
      <div className="page-header">
        <h1>Security Settings</h1>
        <p>Manage authentication and access controls</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', maxWidth: '800px' }}>
        <div className="chart-card" style={{ background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ marginBottom: '15px' }}>Two-Factor Authentication (2FA)</h3>
          <p style={{ color: '#64748B', marginBottom: '20px', fontSize: '14px' }}>
            Add an extra layer of security to your admin account by requiring a code from an authenticator app.
          </p>
          <button style={{ background: '#10B981', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            Enable 2FA
          </button>
        </div>

        <div className="chart-card" style={{ background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ marginBottom: '15px' }}>Active Sessions</h3>
          <p style={{ color: '#64748B', marginBottom: '20px', fontSize: '14px' }}>
            You are currently logged in on the following devices.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #E2E8F0', borderRadius: '8px', background: '#F8FAFC' }}>
            <div>
              <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>Mac OS • Chrome Browser</p>
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>Gurugram, India • Active Now</p>
            </div>
            <span className="status-badge active" style={{ background: '#DCFCE7', color: '#166534' }}>Current Session</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Security;