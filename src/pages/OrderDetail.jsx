import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOrders } from '../data/mockData';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrders().then(allOrders => {
      const foundOrder = allOrders.find(o => o.id === id);
      setOrder(foundOrder);
    });
  }, [id]);

  if (!order) return <div className="page-content">Loading order details...</div>;

  return (
    <>
      <div className="page-header" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <button onClick={() => navigate(-1)} className="btn-outline">← Back</button>
        <div>
          <h1>Order {order.id}</h1>
          <p>Placed on: {order.date} | Status: <span className={`status-badge ${order.status}`}>{order.status}</span></p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div className="chart-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3>Transaction Details</h3>
          <hr style={{ margin: '15px 0', borderColor: '#E2E8F0' }} />
          <p><strong>Total Amount:</strong> <span className="color-blue fw-500">{order.amount}</span></p>
          <p style={{ marginTop: '10px' }}><strong>Payment Type:</strong> {order.paymentType}</p>
          <p style={{ marginTop: '10px' }}><strong>Loan Used:</strong> <span className="color-orange">{order.loanUsed}</span></p>
        </div>

        <div className="chart-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3>Parties Involved</h3>
          <hr style={{ margin: '15px 0', borderColor: '#E2E8F0' }} />
          <p><strong>Retailer:</strong> {order.retailer}</p>
          <p style={{ marginTop: '10px' }}><strong>Wholesaler:</strong> {order.wholesaler}</p>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;