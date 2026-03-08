import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';

// Layout & Auth
import Layout from './components/Layout';
import Login from './pages/Login';

// Main Pages
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import UserDetail from './pages/UserDetail';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Loans from './pages/Loans';
import LoanDetail from './pages/LoanDetail'; // NEW
import Finance from './pages/Finance';
import Risk from './pages/Risk';
import Support from './pages/Support';

// Admin Profile Pages
import Settings from './pages/Settings';
import ActivityLog from './pages/ActivityLog';
import Security from './pages/Security';

// --- ROUTE GUARD COMPONENT ---
// Blocks access to internal pages if the user hasn't logged in
const ProtectedRoute = () => {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            {/* Auto-redirect root to dashboard */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* Dynamic Modules */}
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserDetail />} />
            
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            
            <Route path="loans" element={<Loans />} />
            <Route path="loans/:id" element={<LoanDetail />} />
            
            <Route path="finance" element={<Finance />} />
            <Route path="risk" element={<Risk />} />
            <Route path="support" element={<Support />} />
            
            {/* Admin Profile Routes */}
            <Route path="settings" element={<Settings />} />
            <Route path="activity-log" element={<ActivityLog />} />
            <Route path="security" element={<Security />} />
          </Route>
        </Route>
        
        {/* Catch-all: If user types a random URL, send them to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;