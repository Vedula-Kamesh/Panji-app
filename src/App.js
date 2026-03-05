import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Layout & Auth
import Layout from './components/Layout';
import Login from './pages/Login';

// Pages
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import UserDetail from './pages/UserDetail';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Loans from './pages/Loans';
import Finance from './pages/Finance';
import Risk from './pages/Risk';
import Support from './pages/Support';

// Admin Pages
import Settings from './pages/Settings';
import ActivityLog from './pages/ActivityLog'; // NEW
import Security from './pages/Security'; // NEW

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Admin Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserDetail />} />
          
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          
          <Route path="loans" element={<Loans />} />
          <Route path="finance" element={<Finance />} />
          <Route path="risk" element={<Risk />} />
          <Route path="support" element={<Support />} />
          
          {/* Admin Profile Routes */}
          <Route path="settings" element={<Settings />} />
          <Route path="activity-log" element={<ActivityLog />} />
          <Route path="security" element={<Security />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;