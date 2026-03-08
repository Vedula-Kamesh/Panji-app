import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { fetchUsers } from '../data/mockdata';
import { downloadCSV } from '../utils/exportUtils';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [localSearch, setLocalSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  
  const context = useOutletContext();
  const globalSearch = context?.globalSearch || "";
  const navigate = useNavigate();

  useEffect(() => { fetchUsers().then(setUsers); }, []);

  const filteredData = users.filter(user => {
    const globalMatch = user.name.toLowerCase().includes(globalSearch.toLowerCase()) || 
                        user.id.toLowerCase().includes(globalSearch.toLowerCase());
    const localMatch = user.name.toLowerCase().includes(localSearch.toLowerCase()) || 
                       user.mobile.includes(localSearch);
    const statusMatch = statusFilter === 'All Status' || user.status.toLowerCase() === statusFilter.toLowerCase();
    
    return globalMatch && localMatch && statusMatch;
  });

  return (
    <>
      <div className="page-header">
        <h1>User Management</h1>
        <p>Manage and monitor all registered users</p>
      </div>
      <div className="table-controls">
        <input 
          type="text" 
          placeholder="Search by name, mobile no…" 
          className="search-input" 
          value={localSearch} 
          onChange={e => setLocalSearch(e.target.value)} 
        />
        <div className="filters">
          <select className="filter-dropdown" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Suspended</option>
          </select>
          <button 
            className="btn-outline" 
            onClick={() => downloadCSV(filteredData, 'Panji_Users_Export')}
          >
            Export
          </button>
        </div>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>User ID</th><th>Name</th><th>Mobile</th><th>Orders</th>
              <th>Loan Limit</th><th>Rating</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(u => (
              <tr key={u.id}>
                <td className="fw-500">{u.id}</td>
                <td>
                  <div className="user-name">{u.name}</div>
                  {u.verified && <span className="badge-verified">Verified</span>}
                </td>
                <td>{u.mobile}</td><td>{u.orders}</td><td>{u.loanLimit}</td>
                <td>{u.rating ? `${u.rating} ⭐` : 'N/A'}</td>
                <td><span className={`status-badge ${u.status}`}>{u.status}</span></td>
                <td className="table-actions">
                  <button title="View" onClick={() => navigate(`/users/${u.id}`)}>👁️</button>
                  <button title="Edit">✏️</button>
                  <button title="Block" className="action-danger">🚫</button>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr><td colSpan="8" style={{textAlign: 'center', padding: '20px'}}>No users match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;