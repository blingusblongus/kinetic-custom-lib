import React from 'react';
import './Dashboard.scss';

const Dashboard = () => {
  return (
    <div className="page-panel">
      <div className="grid" id="dashboard-grid">
        <div className="card-wrapper">
          <div>Left Content</div>
        </div>
        <div className="flex flex-column">
          <div className="card-wrapper">
            <div>Right Upper Content</div>
          </div>
          <div className="card-wrapper">
            <div>Right Lower Content</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
