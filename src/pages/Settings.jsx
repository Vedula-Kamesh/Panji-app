import React from 'react';

const Settings = () => {
  return (
    <>
      <div className="page-header">
        <h1>Account Settings</h1>
        <p>Manage your admin profile and system preferences</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        {/* Profile Card */}
        <div className="chart-card" style={{ background: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #E2E8F0', height: 'fit-content' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', marginBottom: '15px' }}>
              👤
            </div>
            <h3 style={{ margin: '0 0 5px 0' }}>Super Admin</h3>
            <span className="status-badge active" style={{ fontSize: '11px' }}>System Administrator</span>
          </div>
        </div>

        {/* Edit Form */}
        <div className="chart-card" style={{ background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ marginBottom: '20px' }}>Personal Information</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748B', marginBottom: '8px' }}>Full Name</label>
              <input type="text" defaultValue="Super Admin" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#F8FAFC', outline: 'none' }} />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748B', marginBottom: '8px' }}>Email Address</label>
              <input type="email" defaultValue="admin@panji.in" readOnly style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#F1F5F9', outline: 'none', color: '#94A3B8' }} />
              <p style={{ fontSize: '11px', color: '#94A3B8', marginTop: '5px' }}>Email cannot be changed directly. Contact IT support.</p>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748B', marginBottom: '8px' }}>New Password</label>
              <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#F8FAFC', outline: 'none' }} />
            </div>

            <button style={{ background: '#0A3D91', color: 'white', padding: '14px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;