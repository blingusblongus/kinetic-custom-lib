import React, { useState } from 'react';
import './TicketUserView.scss';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LabelWithIcon from '../LabelWithIcon/LabelWithIcon';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import CustomTabs from '../CustomTabs/CustomTabs';

const TicketUserView = () => {
  const ticketNo = '0003492';
  const timeDisplay = '1 Month';
  const tabs = ['Customer Details', 'Response Details', 'History & Comments'];

  return (
    <div className="page-panel">
      <div className="card-wrapper no-padding">
        <div className="grid" id="user-ticket-grid">
          <div className="card-pane left-pane no-padding">
            <div className="pane-header grid" id="left-pane-header">
              <div className="section-title">Ticket #{ticketNo}</div>

              <LabelWithIcon
                icon={<AccessTimeIcon fontSize="inherit" />}
                label={timeDisplay}
              />

              <LabelWithIcon
                icon={<CalendarMonthIcon fontSize="inherit" />}
                label={timeDisplay}
              />
            </div>

            <div className="pane-subheader">
              <CustomTabs
                options={tabs}
                // onChange={(e, newValue, val) => console.log('Tabs', e, newValue, val)}
              />
            </div>
          </div>
          <div className="card-pane right-pane">right pane</div>
        </div>
      </div>
    </div>
  );
};

export default TicketUserView;
