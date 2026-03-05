import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { fetchFinance } from '../data/mockData';

const Finance = () => {
  const [txns, setTxns] = useState([]);
  const [localSearch, setLocalSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const context = useOutletContext();
  const globalSearch = context?.globalSearch || "";

  useEffect(() => { fetchFinance().then(setTxns); }, []);

  const filteredData = txns.filter(t => {
    const globalMatch = t.ref.toLowerCase().includes(globalSearch.toLowerCase()) || t.id.toLowerCase().includes(globalSearch.toLowerCase());
    const localMatch = t.ref.toLowerCase().includes(localSearch.toLowerCase()) || t.id.toLowerCase().includes(localSearch.toLowerCase());
    const statusMatch = statusFilter === 'All Status' || t.status.toLowerCase() === statusFilter.toLowerCase();
    const typeMatch = typeFilter === 'All Types' || t.type.toLowerCase() === typeFilter.toLowerCase().replace('s', ''); // matches 'order' to 'Orders'
    
    return globalMatch && localMatch && statusMatch && typeMatch;
  });

  return (
    <>
      <div className="page-header">
        <h1>Finance & Accounting</h1>
        <p>Financial ledger and transaction management</p>
      </div>
      <div className="table-controls">
        <input type="text" placeholder="Search transactions..." className="search-input" value={localSearch} onChange={e => setLocalSearch(e.target.value)} />
        <div className="filters">
          <select className="filter-dropdown" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option>All Status</option><option>Completed</option><option>Pending</option><option>Failed</option>
          </select>
          <select className="filter-dropdown" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option>All Types</option><option>Orders</option><option>Loans</option>
          </select>
        </div>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead><tr><th>Transaction ID</th><th>Order/Loan ID</th><th>Date</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            {filteredData.map(t => (
              <tr key={t.id}>
                <td className="fw-500">{t.id}</td><td>{t.ref}</td><td>{t.date}</td>
                <td><span className="badge-outline">{t.type}</span></td><td className="fw-500">{t.amount}</td>
                <td><span className={`status-badge ${t.status}`}>{t.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Finance;