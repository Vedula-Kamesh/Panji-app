import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import { fetchLoans } from '../data/mockData';
import { downloadCSV } from '../utils/exportUtils';

const Loans = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const context = useOutletContext();
  
  const [loans, setLoans] = useState([]);
  const [localSearch, setLocalSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(location.state?.status || 'All Status');
  const [riskFilter, setRiskFilter] = useState('All Risk Levels');
  
  const globalSearch = context?.globalSearch || "";

  useEffect(() => {
    if (location.state?.status) {
      const incomingStatus = location.state.status === "Defaulted" ? "Rejected" : location.state.status;
      setStatusFilter(incomingStatus);
    }
  }, [location.state]);

  useEffect(() => { fetchLoans().then(setLoans); }, []);

  const handleApprove = (id) => { if (window.confirm(`Approve loan ${id}?`)) alert(`Approved!`); };
  const handleReject = (id) => { if (window.confirm(`Reject loan ${id}?`)) alert(`Rejected.`); };

  const filteredData = loans.filter(loan => {
    const globalMatch = loan.retailer.toLowerCase().includes(globalSearch.toLowerCase()) || 
                        loan.id.toLowerCase().includes(globalSearch.toLowerCase()) ||
                        (loan.orderId && loan.orderId.toLowerCase().includes(globalSearch.toLowerCase()));
    
    const localMatch = loan.retailer.toLowerCase().includes(localSearch.toLowerCase()) || 
                       loan.id.toLowerCase().includes(localSearch.toLowerCase()) ||
                       (loan.orderId && loan.orderId.toLowerCase().includes(localSearch.toLowerCase()));
                       
    const statusMatch = statusFilter === 'All Status' || loan.status.toLowerCase() === statusFilter.toLowerCase();
    const riskMatch = riskFilter === 'All Risk Levels' || loan.riskLabel.includes(riskFilter.replace(' Risk', ''));
    
    return globalMatch && localMatch && statusMatch && riskMatch;
  });

  return (
    <>
      <div className="page-header">
        <h1>Loan Management</h1>
        <p>Credit control and risk assessment dashboard</p>
      </div>
      
      <div className="table-controls">
        <input 
          type="text" 
          placeholder="Search loans or orders..." 
          className="search-input" 
          value={localSearch} 
          onChange={e => setLocalSearch(e.target.value)} 
        />
        <div className="filters">
          <select className="filter-dropdown" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option>All Status</option><option>Active</option><option>Pending</option><option>Completed</option><option>Rejected</option>
          </select>
          <select className="filter-dropdown" value={riskFilter} onChange={e => setRiskFilter(e.target.value)}>
            <option>All Risk Levels</option><option>Low Risk</option><option>Medium Risk</option><option>High Risk</option>
          </select>
          <button className="btn-outline" onClick={() => downloadCSV(filteredData, 'Panji_Loans_Export')}>Export Loans</button>
        </div>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Linked Order</th>
              <th>Retailer</th>
              <th>Requested</th>
              <th>Approved</th>
              <th>Duration</th>
              <th>Risk Score</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? filteredData.map(l => (
              <tr key={l.id}>
                <td className="fw-500">{l.id}</td>
                <td className="fw-500 color-blue">{l.orderId || '-'}</td>
                <td><div className="user-name">{l.retailer}</div></td>
                <td className="fw-500 color-blue">{l.requested}</td>
                <td className="fw-500 color-green">{l.approved}</td>
                <td>{l.duration}</td>
                <td><span className={`risk-badge ${l.riskLabel.includes('High') ? 'risk-high' : l.riskLabel.includes('Medium') ? 'risk-medium' : 'risk-low'}`}>{l.risk} {l.riskLabel}</span></td>
                <td><span className={`status-badge ${l.status}`}>{l.status}</span></td>
                
                <td className="table-actions" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button title="View Loan Details" onClick={() => navigate(`/loans/${l.id}`)} style={{ fontSize: '16px' }}>👁️</button>
                  
                  {/* NEW: View Order Button */}
                  {l.orderId && (
                    <button 
                      title="View Linked Order" 
                      onClick={() => navigate(`/orders/${l.orderId}`)} 
                      style={{ fontSize: '16px' }}
                    >
                      📦
                    </button>
                  )}

                  {l.status === 'pending' && (
                    <>
                      <button onClick={() => handleApprove(l.id)} style={{ background: '#DCFCE7', color: '#166534', border: '1px solid #22C55E', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>✓ Accept</button>
                      <button onClick={() => handleReject(l.id)} style={{ background: '#FEE2E2', color: '#991B1B', border: '1px solid #EF4444', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>✕ Reject</button>
                    </>
                  )}
                </td>
              </tr>
            )) : <tr><td colSpan="9" style={{textAlign: 'center', padding: '20px'}}>No loans match your filters.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Loans;