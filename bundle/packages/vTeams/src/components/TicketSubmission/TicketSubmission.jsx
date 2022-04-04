import React, { useState } from 'react';
import { Select, InputLabel, MenuItem } from '@mui/material';

import './TicketSubmission.css';
import Priority from '../Priority/Priority';
import TeamsButton from '../TeamsButton/TeamsButton';

const TicketSubmission = ({ ticket }) => {
  const [shortDescription, setShortDescription] = useState('');
  const [estimate, setEstimate] = useState(' hours');

  const prioritySelections = [1, 2, 3].map(num => {
    return (
      <MenuItem value={num} key={num}>
        <Priority level={num} />
      </MenuItem>
    );
  });

  return (
    <div className="page-panel">
      <div className="form-wrapper">
        <div className="label-description">Ticket #{ticket?.number}</div>
        <div className="submission-grid">
          <InputLabel id="estimate-label">Estimate</InputLabel>

          <input
            type="number"
            value={estimate}
            onChange={e => setEstimate(e.target.value)}
          />
          <div />

          <InputLabel id="priority-label">Priority</InputLabel>

          <Select variant="standard" labelId="priority-label" defaultValue={1}>
            {prioritySelections}
          </Select>

          <InputLabel id="date-label">Due Date</InputLabel>
          <input type="date" />
        </div>

        <div className="flex flex-column form-section">
          <label className="label-description" htmlFor="short-description">
            Short Description
          </label>
          <textarea
            name="short-description"
            rows={4}
            placeholder="Add a more detailed description..."
          />
        </div>

        <div className="flex flex-column form-section">
          <label className="label-description" htmlFor="full-description">
            Full Description
          </label>
          <textarea
            name="full-description"
            rows={8}
            placeholder="Add a more detailed description..."
          />
        </div>

        <div className="flex flex-right">
          <TeamsButton>Submit</TeamsButton>
        </div>
      </div>
    </div>
  );
};

export default TicketSubmission;
