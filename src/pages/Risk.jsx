import React, { useState, useEffect } from 'react';
import { fetchRisk } from '../data/mockData';

const Risk = () => {
  const [risks, setRisks] = useState([]);
  useEffect(() => { fetchRisk().then(setRisks); }, []);

  return (
    <>
      <div className="page-header">
        <h1>Fraud & Risk Management</h1>
        <p>Monitor suspicious activities and protect platform integrity</p>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr><th>Risk ID</th><th>User</th><th>Risk Type</th><th>Risk Level</th><th>Amount</th></tr>
          </thead>
          <tbody>
            {risks.map(r => (
              <tr key={r.id}>
                <td className="fw-500">{r.id}</td>
                <td><div className="user-name">{r.user}</div></td>
                <td>⚠️ {r.type}</td>
                <td><span className={`risk-badge risk-${r.level.toLowerCase()}`}>{r.level}</span></td>
                <td className="fw-500">{r.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Risk;