import React from 'react';

const Support = () => {
  return (
    <>
      <div className="page-header">
        <h1>Customer Support</h1>
        <p>Manage tickets and user inquiries</p>
      </div>
      <div className="support-container" style={{ background: 'white', padding: '20px', borderRadius: '12px' }}>
        <div className="ticket-view" style={{ minHeight: '300px', border: '1px solid #E2E8F0', padding: '15px', marginBottom: '20px' }}>
          <p><strong>Retailer Amit:</strong> Payment failed but amount deducted.</p>
        </div>
        <div className="reply-box" style={{ display: 'flex', gap: '10px' }}>
          <input type="text" placeholder="Type reply..." style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <button style={{ padding: '12px 24px', background: '#0A3D91', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Send Reply</button>
        </div>
      </div>
    </>
  );
};
export default Support;