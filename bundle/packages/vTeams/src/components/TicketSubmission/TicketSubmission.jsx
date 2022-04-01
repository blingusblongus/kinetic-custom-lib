import React, { useState } from 'react';
import {
  Paper,
  Box,
  Select,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
} from '@mui/material';

import './TicketSubmission.css';
import Priority from '../Priority/Priority';

const TicketSubmission = ({ ticket }) => {
  const [shortDescription, setShortDescription] = useState('');

  const prioritySelections = [1, 2, 3].map(num => {
    return (
      <MenuItem value={num} key={num}>
        <Priority level={num} />
      </MenuItem>
    );
  });

  console.log(shortDescription);
  return (
    <div className="form-wrapper">
      <div className="label-description">Ticket #{ticket.number}</div>
      <div className="submission-grid">
        {/* <div className="grid-item"> */}
        <InputLabel id="estimate-label">Estimate</InputLabel>
        <Select variant="standard" labelId="estimate-label" />
        {/* </div> */}
        {/* <div className="grid-item"> */}
        <div />
        <InputLabel id="priority-label">Priority</InputLabel>
        <Select variant="standard" labelId="priority-label" defaultValue={1}>
          {prioritySelections}
        </Select>
        {/* </div> */}
      </div>

      <div className="flex flex-column form-section">
        <label className="label-description" for="short-description">
          Short Description
        </label>
        <textarea
          name="short-description"
          rows={4}
          placeholder="Add a more detailed description..."
        />
      </div>

      <div className="flex flex-column form-section">
        <label className="label-description" for="full-description">
          Full Description
        </label>
        <textarea
          name="full-description"
          rows={8}
          placeholder="Add a more detailed description..."
        />
      </div>
    </div>
  );
};

export default TicketSubmission;
