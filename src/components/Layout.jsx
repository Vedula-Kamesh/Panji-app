import React, { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

const Layout = () => {
  const [globalSearch, setGlobalSearch] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="app-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">PANJI APP</div>
        <ul className="nav-links">
          <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>📊 Dashboard</NavLink>
          <NavLink to="/users" className="nav-item">👥 Users</NavLink>
          <NavLink to="/orders" className="nav-item">📦 Orders</NavLink>
          <NavLink to="/loans" className="nav-item">💳 Loans</NavLink>
          <NavLink to="/finance" className="nav-item">💰 Finance</NavLink>
          <NavLink to="/risk" className="nav-item">🛡️ Risk & Fraud</NavLink>
          <NavLink to="/support" className="nav-item">🎧 Support</NavLink>
        </ul>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="main-area">
        <header className="topbar">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search orders, users, transactions…" 
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
          />
          
          <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontSize: '20px', cursor: 'pointer' }}>🔔</span>
            
            {/* ADMIN PROFILE DROPDOWN */}
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500', padding: '5px 10px', borderRadius: '8px', transition: 'background 0.2s', background: isProfileOpen ? '#F1F5F9' : 'transparent' }}
              >
                <span style={{ fontSize: '18px' }}>👤</span> Admin user <span style={{ fontSize: '10px', marginLeft: '2px' }}>▼</span>
              </div>

              {isProfileOpen && (
                <div style={{
                  position: 'absolute', top: '50px', right: '0', background: 'white', 
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderRadius: '12px', 
                  width: '220px', overflow: 'hidden', zIndex: 100, border: '1px solid #E2E8F0'
                }}>
                  <div style={{ padding: '16px', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                    <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px', color: '#1E293B' }}>Super Admin</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748B', marginTop: '2px' }}>admin@panji.in</p>
                  </div>
                  
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    <li 
                      style={{ padding: '12px 16px', cursor: 'pointer', fontSize: '14px', display: 'flex', gap: '10px', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }} 
                      onClick={() => { setIsProfileOpen(false); navigate('/settings'); }}
                    >
                      <span>⚙️</span> Account Settings
                    </li>
                    <li 
                      style={{ padding: '12px 16px', cursor: 'pointer', fontSize: '14px', display: 'flex', gap: '10px', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }} 
                      onClick={() => { setIsProfileOpen(false); navigate('/activity-log'); }}
                    >
                      <span>📋</span> Activity Log
                    </li>
                    <li 
                      style={{ padding: '12px 16px', cursor: 'pointer', fontSize: '14px', display: 'flex', gap: '10px', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }} 
                      onClick={() => { setIsProfileOpen(false); navigate('/security'); }}
                    >
                      <span>🔒</span> Security
                    </li>
                    <li 
                      style={{ padding: '12px 16px', cursor: 'pointer', fontSize: '14px', display: 'flex', gap: '10px', alignItems: 'center', color: '#DC2626' }} 
                      onClick={handleLogout}
                    >
                      <span>🚪</span> Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="page-content">
          <Outlet context={{ globalSearch }} /> 
        </main>
      </div>
    </div>
  );
};

export default Layout;