import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { fetchLoans } from '../data/mockData';

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [localSearch, setLocalSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [riskFilter, setRiskFilter] = useState('All Risk Levels');
  const context = useOutletContext();
  const globalSearch = context?.globalSearch || "";

  useEffect(() => { fetchLoans().then(setLoans); }, []);

  const filteredData = loans.filter(loan => {
    const globalMatch = loan.retailer.toLowerCase().includes(globalSearch.toLowerCase()) || loan.id.toLowerCase().includes(globalSearch.toLowerCase());
    const localMatch = loan.retailer.toLowerCase().includes(localSearch.toLowerCase());
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
        <input type="text" placeholder="Search loans..." className="search-input" value={localSearch} onChange={e => setLocalSearch(e.target.value)} />
        <div className="filters">
          <select className="filter-dropdown" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option>All Status</option><option>Active</option><option>Pending</option><option>Completed</option>
          </select>
          <select className="filter-dropdown" value={riskFilter} onChange={e => setRiskFilter(e.target.value)}>
            <option>All Risk Levels</option><option>Low Risk</option><option>Medium Risk</option><option>High Risk</option>
          </select>
        </div>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead><tr><th>Loan ID</th><th>Retailer</th><th>Requested</th><th>Approved</th><th>Duration</th><th>Risk Score</th><th>Status</th></tr></thead>
          <tbody>
            {filteredData.map(l => (
              <tr key={l.id}>
                <td className="fw-500">{l.id}</td><td><div className="user-name">{l.retailer}</div></td>
                <td className="fw-500 color-blue">{l.requested}</td><td className="fw-500 color-green">{l.approved}</td>
                <td>{l.duration}</td>
                <td><span className={`risk-badge ${l.riskLabel.includes('High') ? 'risk-high' : 'risk-low'}`}>{l.risk} {l.riskLabel}</span></td>
                <td><span className={`status-badge ${l.status}`}>{l.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Loans;