import React from 'react';
import './TicketUserView.scss';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const TicketUserView = () => {
  const ticketNo = '0003492';
  const timeDisplay = '1 month';

  return (
    <div className="page-panel">
      <div className="card-wrapper no-padding">
        <div className="grid" id="user-ticket-grid">
          <div className="card-pane left-pane">
            <div className="pane-header grid" id="left-pane-header">
              <div className="section-title">Ticket #{ticketNo}</div>
              <div className="icon-center-vert" id="time-display">
                <span className="icon-center-vert icon-pad-right">
                  <AccessTimeIcon fontSize="inherit" />
                </span>
                <span>{timeDisplay}</span>
              </div>
            </div>
          </div>
          <div className="card-pane right-pane">right pane</div>
        </div>
      </div>
    </div>
  );
};

export default TicketUserView;
