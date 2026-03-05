import React from 'react';

const ActivityLog = () => {
  return (
    <>
      <div className="page-header">
        <h1>Activity Log</h1>
        <p>Track your recent admin actions and system events</p>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Action Taken</th>
              <th>Target</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>20 Feb 2026, 14:30</td>
              <td><span className="badge-outline">Exported Orders</span></td>
              <td>Orders Module</td>
              <td>192.168.1.45</td>
            </tr>
            <tr>
              <td>20 Feb 2026, 10:15</td>
              <td><span className="badge-outline">Approved Loan</span></td>
              <td>LN-2001 (Rajesh Kumar)</td>
              <td>192.168.1.45</td>
            </tr>
            <tr>
              <td>19 Feb 2026, 09:00</td>
              <td><span className="badge-outline">Admin Login</span></td>
              <td>System Auth</td>
              <td>192.168.1.45</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ActivityLog;