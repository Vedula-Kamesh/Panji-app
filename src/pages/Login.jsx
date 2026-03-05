import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault(); 
    
    // Simple frontend mockup check
    if (credentials.username && credentials.password) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } else {
      alert("Please enter both ID and Password.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div style={{ fontSize: '50px', color: 'var(--panji-blue)', marginBottom: '10px'}}>𝗣</div> 
        <h2 className="login-title">Welcome</h2>
        <p className="login-subtitle">PLEASE LOGIN TO ADMIN DASHBOARD</p>
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>ADMIN ID / USER NAME</label>
            <input 
              type="text" 
              placeholder="Enter ID" 
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              required 
            />
          </div>
          <div className="input-group">
            <label>PASSWORD</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required 
            />
          </div>
          
          <button type="submit" className="login-btn">LOGIN</button>
          <a href="#" className="forgot-link">FORGOTTEN YOUR PASSWORD?</a>
        </form>
      </div>
    </div>
  );
};

export default Login;