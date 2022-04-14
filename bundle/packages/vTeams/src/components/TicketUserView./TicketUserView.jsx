import React, { useState } from 'react';
import './TicketUserView.scss';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LabelWithIcon from '../LabelWithIcon/LabelWithIcon';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import CustomTabs from '../CustomTabs/CustomTabs';
import Priority from '../Priority/Priority';
import TeamsButton from '../TeamsButton/TeamsButton';
import { CoreForm } from '@kineticdata/react';

const TicketUserView = ({ ticket }) => {
  const tabs = ['Response Details', 'History & Comments', 'Customer Details'];

  const [comment, setComment] = useState('');
  const [date, setDate] = useState('');
  const [activeTab, setActiveTab] = useState(0);

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

  const textareaChange = e => {
    setComment(e.target.value);
  };

  const dateChange = e => {
    setDate(e.target.value);
  };

  const TabPanel = ({ activeTab, index, children, ...other }) => {
    return (
      <div hidden={activeTab !== index} {...other}>
        {children}
      </div>
    );
  };

  return (
    <div className="page-panel">
      <CoreForm kapp="nick-sandbox" form="crud" />
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
                onChange={(e, newValue, val) => setActiveTab(newValue)}
              />
            </div>

            <TabPanel index={0} activeTab={activeTab}>
              First Tab
            </TabPanel>
            <TabPanel index={1} activeTab={activeTab}>
              Second Tab
            </TabPanel>
            <TabPanel index={2} activeTab={activeTab}>
              Third Tab
            </TabPanel>
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
              <div className="flex flex-right padding-normal">
                <TeamsButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketUserView;
