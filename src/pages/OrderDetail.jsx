import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOrders } from '../data/mockData';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrders().then(allOrders => setOrder(allOrders.find(o => o.id === id) || allOrders[0]));
  }, [id]);

  if (!order) return <div className="page-content">Loading...</div>;

  return (
    <>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button onClick={() => navigate(-1)} className="btn-outline">← Back</button>
          <div>
            <h1>Order {order.id}</h1>
            <p>Placed on: {order.date} | Status: <span className={`status-badge ${order.status}`}>{order.status}</span></p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginTop: '20px' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="chart-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '30px' }}>
              <div><p style={{ color: '#64748B', fontSize: '13px', margin: '0 0 5px 0' }}>Total Amount</p><p className="fw-500 color-blue" style={{ fontSize: '18px', margin: 0 }}>{order.amount}</p></div>
              <div><p style={{ color: '#64748B', fontSize: '13px', margin: '0 0 5px 0' }}>Payment Mode</p><span className="badge-outline">{order.paymentType}</span></div>
              <div><p style={{ color: '#64748B', fontSize: '13px', margin: '0 0 5px 0' }}>Loan Used</p><p className="fw-500 color-orange" style={{ margin: 0 }}>{order.loanUsed}</p></div>
            </div>
            
            {/* NEW: Payment Proof Button */}
            {order.paymentProof && (
              <button onClick={() => alert(`Opening ${order.paymentProof} in image viewer...`)} style={{ background: '#E0F2FE', color: '#0369A1', padding: '10px 15px', border: '1px solid #BAE6FD', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                🖼️ View Payment Proof
              </button>
            )}
          </div>

          <div className="table-container">
            <h3 style={{ padding: '20px', borderBottom: '1px solid #E2E8F0', background: 'white', margin: 0 }}>Items in Order</h3>
            <table className="data-table">
              <thead><tr><th>Product Name</th><th>Quantity</th><th>Total Price</th></tr></thead>
              <tbody>
                {order.items?.map((item, idx) => (
                  <tr key={idx}><td className="fw-500">{item.name}</td><td>{item.qty} units</td><td className="fw-500 color-blue">{item.price}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Tracking */}
        <div className="chart-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '20px' }}>Order Tracking</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
            {order.tracking?.map((track, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '15px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: track.done ? '#10B981' : '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                  {track.done && <span style={{ color: 'white', fontSize: '10px' }}>✓</span>}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold', color: track.done ? '#1E293B' : '#94A3B8' }}>{track.step}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#64748B', marginTop: '4px' }}>{track.time}</p>
                </div>
              </div>
            ))}
            <div style={{ position: 'absolute', left: '9px', top: '10px', bottom: '20px', width: '2px', background: '#E2E8F0', zIndex: 1 }}></div>
          </div>
        </div>

      </div>
    </>
  );
};
export default OrderDetail;