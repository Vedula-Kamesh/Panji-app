import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { fetchFinance } from '../data/mockData';
import { downloadCSV } from '../utils/exportUtils';

const Finance = () => {
  const [transactions, setTransactions] = useState([]);
  const [localSearch, setLocalSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [typeFilter, setTypeFilter] = useState('All Types');
  
  const context = useOutletContext();
  const globalSearch = context?.globalSearch || "";
  const navigate = useNavigate();

  useEffect(() => {
    fetchFinance().then(setTransactions);
  }, []);

  // --- DYNAMIC NAVIGATION LOGIC ---
  const handleViewTransaction = (txn) => {
    if (txn.type.toLowerCase() === 'order') {
      navigate(`/orders/${txn.ref}`);
    } else if (txn.type.toLowerCase() === 'loan') {
      navigate(`/loans/${txn.ref}`);
    }
  };

  const filteredData = transactions.filter(txn => {
    const globalMatch = txn.id.toLowerCase().includes(globalSearch.toLowerCase()) || 
                        txn.ref.toLowerCase().includes(globalSearch.toLowerCase());
    const localMatch = txn.id.toLowerCase().includes(localSearch.toLowerCase()) || 
                       txn.ref.toLowerCase().includes(localSearch.toLowerCase());
    const statusMatch = statusFilter === 'All Status' || txn.status.toLowerCase() === statusFilter.toLowerCase();
    const typeMatch = typeFilter === 'All Types' || txn.type.toLowerCase() === typeFilter.toLowerCase();
    
    return globalMatch && localMatch && statusMatch && typeMatch;
  });

  return (
    <>
      <div className="page-header">
        <h1>Finance & Accounting</h1>
        <p>Master ledger for all platform transactions, commissions, and GST</p>
      </div>
      
      <div className="table-controls">
        <input 
          type="text" 
          placeholder="Search by Txn ID or Reference..." 
          className="search-input" 
          value={localSearch} 
          onChange={e => setLocalSearch(e.target.value)} 
        />
        <div className="filters">
          <select className="filter-dropdown" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
          <select className="filter-dropdown" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option>All Types</option>
            <option>Order</option>
            <option>Loan</option>
          </select>
          <button 
            className="btn-outline" 
            onClick={() => downloadCSV(filteredData, 'Panji_Finance_Ledger')}
          >
            Export Ledger
          </button>
        </div>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Txn ID</th>
              <th>Date</th>
              <th>Source Ref</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Commission</th>
              <th>GST</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? filteredData.map(txn => (
              <tr key={txn.id}>
                <td className="fw-500">{txn.id}</td>
                <td>{txn.date}</td>
                <td className="fw-500">{txn.ref}</td>
                <td>
                  <span className="badge-outline" style={{ textTransform: 'capitalize' }}>
                    {txn.type}
                  </span>
                </td>
                <td className="fw-500 color-blue">{txn.amount}</td>
                <td className="fw-500 color-green">{txn.commission}</td>
                <td className="color-orange">{txn.gst}</td>
                <td><span className={`status-badge ${txn.status}`}>{txn.status}</span></td>
                <td className="table-actions">
                  <button 
                    title="View Source Document" 
                    onClick={() => handleViewTransaction(txn)}
                  >
                    👁️
                  </button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="9" style={{textAlign: 'center', padding: '20px'}}>No transactions match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Finance;