import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLoans } from '../data/mockdata';

const LoanDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loan, setLoan] = useState(null);

  useEffect(() => {
    fetchLoans().then(allLoans => {
      const foundLoan = allLoans.find(l => l.id === id);
      setLoan(foundLoan);
    });
  }, [id]);

  if (!loan) return <div className="page-content">Loading loan details...</div>;

  return (
    <>
      <div className="page-header" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <button onClick={() => navigate(-1)} className="btn-outline">← Back</button>
        <div>
          <h1>Loan {loan.id}</h1>
          <p>Borrower: <span className="fw-500">{loan.retailer}</span> | Status: <span className={`status-badge ${loan.status}`}>{loan.status}</span></p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginTop: '20px' }}>
        
        {/* Loan Specs Card */}
        <div className="chart-card" style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', height: 'fit-content' }}>
          <h3>Current Loan Specs</h3>
          <hr style={{ margin: '15px 0', borderColor: '#E2E8F0' }} />
          <p><strong>Approved Amount:</strong> <span className="fw-500 color-green">{loan.approved}</span></p>
          <p style={{ marginTop: '10px' }}><strong>Duration:</strong> {loan.duration}</p>
          <p style={{ marginTop: '10px' }}>
            <strong>Risk Assessment:</strong> <br/>
            <span className={`risk-badge ${loan.riskLabel.includes('High') ? 'risk-high' : 'risk-low'}`} style={{ display: 'inline-block', marginTop: '5px' }}>
              Score: {loan.risk} - {loan.riskLabel}
            </span>
          </p>
        </div>

        {/* Previous Loan History Table */}
        <div className="table-container">
          <h3 style={{ padding: '20px', borderBottom: '1px solid #E2E8F0', background: 'white', margin: 0 }}>Previous Loan History</h3>
          <table className="data-table">
            <thead>
              <tr><th>Past Loan ID</th><th>Amount</th><th>Repaid On</th><th>Late Delays</th><th>Status</th></tr>
            </thead>
            <tbody>
              {loan.history && loan.history.length > 0 ? (
                loan.history.map((hist, idx) => (
                  <tr key={idx}>
                    <td className="fw-500">{hist.pastId}</td>
                    <td className="fw-500 color-blue">{hist.amount}</td>
                    <td>{hist.repaidOn}</td>
                    <td style={{ color: hist.delays > 0 ? '#E11D48' : '#166534', fontWeight: 'bold' }}>
                      {hist.delays} times
                    </td>
                    <td><span className={`status-badge ${hist.status}`}>{hist.status}</span></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No previous loan history found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        
      </div>
    </>
  );
};

export default LoanDetail;