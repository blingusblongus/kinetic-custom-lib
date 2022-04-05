import React, { useState } from 'react';
import './TicketUserView.scss';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LabelWithIcon from '../LabelWithIcon/LabelWithIcon';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import CustomTabs from '../CustomTabs/CustomTabs';
import Priority from '../Priority/Priority';
import { TextField } from '@mui/material';

const TicketUserView = ({ ticket }) => {
  const [comment, setComment] = useState('');
  const [date, setDate] = useState('');

  //example ticket
  if (!ticket) {
    ticket = {
      number: '003492',
      dueDate: new Date(),
      priority: 3,
      owner: 'Eric N.',
      status: 'In Progress',
    };
  }

  const { priority, number, dueDate, status, owner } = ticket;
  const parsedDate = dueDate.toLocaleString().split(',')[0];

  const tabs = ['Customer Details', 'Response Details', 'History & Comments'];

  const textareaChange = e => {
    setComment(e.target.value);
  };

  const dateChange = e => {
    setDate(e.target.value);
  };

  return (
    <div className="page-panel">
      <div className="card-wrapper no-padding">
        <div className="grid" id="user-ticket-grid">
          <div className="card-pane left-pane no-padding">
            <div className="pane-header grid" id="left-pane-header">
              <div className="section-title">Ticket #{number}</div>

              <LabelWithIcon
                icon={<AccessTimeIcon fontSize="inherit" />}
                label={'1 Month'}
              />

              <LabelWithIcon
                icon={<CalendarMonthIcon fontSize="inherit" />}
                label={parsedDate}
              />
            </div>

            <div className="pane-subheader line-dividers">
              <CustomTabs
                options={tabs}
                // onChange={(e, newValue, val) => console.log('Tabs', e, newValue, val)}
              />
            </div>

            <div className="left-pane--content line-dividers" />
            <div className="left-pane--content line-dividers" />
            <div className="left-pane--content line-dividers" />
          </div>

          <div className="card-pane right-pane">
            <div className="pane-header font-bold">Action & Status</div>

            <table>
              <tbody>
                <tr>
                  <th>Priority</th>
                  <td>
                    <Priority level={priority} />
                  </td>
                </tr>
                <tr>
                  <th>Owner</th>
                  <td>{owner}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>{status}</td>
                </tr>
                <tr>
                  <th>Due Date</th>
                  <td>
                    <input type="date" onChange={dateChange} />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="section-title ticket-comments">
              Post Comment
              <div className="textarea-wrapper">
                <textarea rows={5} onChange={textareaChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketUserView;
