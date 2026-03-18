import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLoans, fetchUsers } from '../data/mockData';

const LoanDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loan, setLoan] = useState(null);
  const [borrower, setBorrower] = useState(null);

  useEffect(() => {
    fetchLoans().then(allLoans => {
      const foundLoan = allLoans.find(l => l.id === id) || allLoans[0];
      setLoan(foundLoan);
      
      fetchUsers().then(allUsers => {
        const foundUser = allUsers.find(u => u.name === foundLoan.retailer) || allUsers[0];
        setBorrower(foundUser);
      });
    });
  }, [id]);

  const handleApprove = () => {
    alert(`Loan ${loan.id} has been Approved.`);
    navigate('/loans');
  };

  const handleReject = () => {
    alert(`Loan ${loan.id} has been Rejected.`);
    navigate('/loans');
  };

  const handleDownloadDocument = (fileName) => {
    alert(`Initiating secure download for: ${fileName}`);
  };

  if (!loan || !borrower) return <div className="page-content">Loading...</div>;

  return (
    <>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button onClick={() => navigate(-1)} className="btn-outline">← Back</button>
          <div>
            <h1>Loan Application: {loan.id}</h1>
            <p>Submitted on: {loan.date} | Status: <span className={`status-badge ${loan.status}`}>{loan.status}</span></p>
          </div>
        </div>

        {loan.status === 'pending' && (
          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={handleReject} className="btn-outline" style={{ color: '#DC2626', borderColor: '#FCA5A5' }}>
              Reject Application
            </button>
            <button onClick={handleApprove} style={{ background: '#0A3D91', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              Approve Loan
            </button>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginTop: '20px' }}>
        
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="chart-card" style={{ background: '#1E293B', color: 'white', padding: '25px', borderRadius: '12px', border: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3 style={{ margin: 0, color: 'white' }}>Risk Analysis</h3>
              <span style={{ background: '#3B82F6', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px' }}>PREDICTED BY ML</span>
            </div>
            <hr style={{ margin: '15px 0', borderColor: '#334155' }} />
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: loan.riskLabel.includes('High') ? '#F87171' : loan.riskLabel.includes('Medium') ? '#FBBF24' : '#4ADE80' }}>
                {loan.risk}
              </div>
              <p style={{ margin: 0, color: '#94A3B8', fontSize: '14px' }}>{loan.riskLabel}</p>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: '#CBD5E1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>✓ Credit history checked</li>
              <li>✓ Platform order volume steady</li>
              <li>{loan.history.length > 0 ? '✓ Past repayment history found' : '⚠️ No past repayment history'}</li>
            </ul>
          </div>

          <div className="chart-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ marginBottom: '15px' }}>Borrower Profile</h3>
            <p style={{ marginBottom: '8px' }}><strong>Name:</strong> {borrower.name}</p>
            <p style={{ marginBottom: '8px' }}><strong>Business:</strong> {borrower.businessName}</p>
            <p style={{ marginBottom: '8px' }}><strong>KYC:</strong> <span className="color-green fw-500">{borrower.kycStatus}</span></p>
            <button onClick={() => navigate(`/users/${borrower.id}`)} className="btn-outline" style={{ width: '100%', marginTop: '10px', fontSize: '13px' }}>
              View Full User Profile
            </button>
          </div>

          <div className="chart-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ marginBottom: '15px' }}>Attached Proofs</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {loan.documents && loan.documents.length > 0 ? (
                loan.documents.map((doc, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #E2E8F0', borderRadius: '8px', background: '#F8FAFC' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '20px' }}>📄</span>
                      <div>
                        <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: '#1E293B' }}>{doc.title}</p>
                        <p style={{ margin: 0, fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{doc.file}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDownloadDocument(doc.file)} 
                      style={{ background: 'white', border: '1px solid #CBD5E1', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', color: '#0A3D91', fontWeight: 'bold', fontSize: '12px' }}
                    >
                      ⬇️ Save
                    </button>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '13px', color: '#64748B', margin: 0, padding: '10px', textAlign: 'center', background: '#F8FAFC', borderRadius: '8px', border: '1px dashed #CBD5E1' }}>
                  No documents attached.
                </p>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="chart-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div><p style={{ color: '#64748B', fontSize: '13px', margin: '0 0 5px 0' }}>Requested Amount</p><p className="fw-500 color-blue" style={{ fontSize: '18px', margin: 0 }}>{loan.requested}</p></div>
            <div><p style={{ color: '#64748B', fontSize: '13px', margin: '0 0 5px 0' }}>Approved Amount</p><p className="fw-500 color-green" style={{ fontSize: '18px', margin: 0 }}>{loan.approved === '-' ? 'Pending Approval' : loan.approved}</p></div>
            <div><p style={{ color: '#64748B', fontSize: '13px', margin: '0 0 5px 0' }}>Duration</p><p className="fw-500" style={{ margin: 0 }}>{loan.duration}</p></div>
          </div>

          <div className="table-container">
            <h3 style={{ padding: '20px', borderBottom: '1px solid #E2E8F0', background: 'white', margin: 0 }}>Previous Loan History</h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead><tr><th>Past Loan ID</th><th>Linked Order</th><th>Amount</th><th>Repaid On</th><th>Late Delays</th><th>Status</th></tr></thead>
                <tbody>
                  {loan.history && loan.history.length > 0 ? (
                    loan.history.map((hist, idx) => (
                      <tr key={idx}>
                        <td className="fw-500">{hist.pastId}</td>
                        {/* New clickable Linked Order column */}
                        <td>
                          <button 
                            onClick={() => navigate(`/orders/${hist.orderId}`)} 
                            style={{ background: '#E0F2FE', color: '#0369A1', border: '1px solid #BAE6FD', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                          >
                            {hist.orderId}
                          </button>
                        </td>
                        <td className="fw-500 color-blue">{hist.amount}</td>
                        <td>{hist.repaidOn}</td>
                        <td style={{ color: hist.delays > 0 ? '#E11D48' : '#166534', fontWeight: 'bold' }}>{hist.delays} times</td>
                        <td><span className={`status-badge ${hist.status}`}>{hist.status}</span></td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No previous loan history found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {loan.emis && loan.emis.length > 0 && (
            <div className="table-container">
              <h3 style={{ padding: '20px', borderBottom: '1px solid #E2E8F0', background: 'white', margin: 0 }}>Current EMI Schedule</h3>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Installment</th>
                      <th>Due Date</th>
                      <th>EMI Amount</th>
                      <th>Outstanding</th>
                      <th>Overdue</th>
                      <th>Payment Details</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loan.emis.map((emi, idx) => (
                      <tr key={idx}>
                        <td className="fw-500">{emi.inst}</td>
                        <td>{emi.dueDate}</td>
                        <td className="fw-500">{emi.amount}</td>
                        <td className="fw-500 color-orange">{emi.outstanding}</td>
                        <td style={{ color: emi.overdue > 0 ? '#DC2626' : '#64748B', fontWeight: emi.overdue > 0 ? 'bold' : 'normal' }}>
                          {emi.overdue} payments
                        </td>
                        <td style={{ fontSize: '13px', color: '#475569' }}>{emi.paymentDetails}</td>
                        <td><span className={`badge-outline`} style={{ borderColor: emi.status === 'pending' ? '#F59E0B' : '#E2E8F0', color: emi.status === 'pending' ? '#D97706' : '#64748B' }}>{emi.status.toUpperCase()}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default LoanDetail;