import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import { fetchOrders } from '../data/mockData';
import { downloadCSV } from '../utils/exportUtils';

const Orders = () => {
  const location = useLocation(); // Reads the state passed from the Dashboard
  const navigate = useNavigate();
  const context = useOutletContext();
  
  const [orders, setOrders] = useState([]);
  const [localSearch, setLocalSearch] = useState('');
  // Initializes the filter using the passed state, defaulting to 'All Status'
  const [statusFilter, setStatusFilter] = useState(location.state?.status || 'All Status');
  const [typeFilter, setTypeFilter] = useState('All Payment Types');
  
  const globalSearch = context?.globalSearch || "";

  // Updates the filter if the user clicks a different dashboard card while already on this page
  useEffect(() => {
    if (location.state?.status) setStatusFilter(location.state.status);
  }, [location.state]);

  useEffect(() => { fetchOrders().then(setOrders); }, []);

  const filteredOrders = orders.filter(order => {
    const matchesLocal = order.id.toLowerCase().includes(localSearch.toLowerCase()) || 
                         order.retailer.toLowerCase().includes(localSearch.toLowerCase());
    const matchesGlobal = globalSearch === '' || 
                          order.id.toLowerCase().includes(globalSearch.toLowerCase()) || 
                          order.retailer.toLowerCase().includes(globalSearch.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || order.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesType = typeFilter === 'All Payment Types' || 
                        (typeFilter === 'Loan' && order.paymentType.includes('Loan')) ||
                        (typeFilter === 'UPI' && order.paymentType.includes('UPI')) ||
                        (typeFilter === 'Bank Transfer' && order.paymentType === 'Bank Transfer');

    return matchesLocal && matchesGlobal && matchesStatus && matchesType;
  });

  return (
    <>
      <div className="page-header">
        <h1>Order Control Center</h1>
        <p>Monitor and manage all B2B transactions</p>
      </div>
      <div className="table-controls">
        <input 
          type="text" 
          placeholder="Search specific orders..." 
          className="search-input" 
          value={localSearch} 
          onChange={(e) => setLocalSearch(e.target.value)} 
        />
        <div className="filters">
          <select className="filter-dropdown" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All Status</option><option>Completed</option><option>Pending</option><option>Processing</option><option>Failed</option>
          </select>
          <select className="filter-dropdown" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option>All Payment Types</option><option>Loan</option><option>UPI</option><option>Bank Transfer</option>
          </select>
          <button className="btn-outline" onClick={() => downloadCSV(filteredOrders, 'Panji_Orders_Export')}>
            Export Orders
          </button>
        </div>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr><th>Order ID</th><th>Retailer</th><th>Wholesaler</th><th>Amount</th><th>Payment Type</th><th>Loan Used</th><th>Status</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? filteredOrders.map(order => (
              <tr key={order.id}>
                <td className="fw-500">{order.id}</td><td><div className="user-name">{order.retailer}</div></td>
                <td>{order.wholesaler}</td><td className="fw-500 color-blue">{order.amount}</td>
                <td><span className="badge-outline">{order.paymentType}</span></td><td className="color-orange">{order.loanUsed}</td>
                <td><span className={`status-badge ${order.status}`}>{order.status}</span></td><td>{order.date}</td>
                <td className="table-actions">
                  <button title="View" onClick={() => navigate(`/orders/${order.id}`)}>👁️</button>
                  {order.status === 'pending' && <button title="Approve" style={{color: 'green'}}>✅</button>}
                </td>
              </tr>
            )) : <tr><td colSpan="9" style={{textAlign: 'center', padding: '20px'}}>No orders match your filters.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Orders;