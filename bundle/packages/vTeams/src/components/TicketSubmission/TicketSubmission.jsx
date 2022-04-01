import React, { useState } from 'react';
import {
  Paper,
  Box,
  Select,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  TextField,
  Input,
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
        {/* <TextField 
        variant="standard" 
        labelId="estimate-label" type="number" 
        size='small'
        sx={{
            height: 10
        }}/> */}
        <input type="number" />
        {/* </div> */}
        {/* <div className="grid-item"> */}
        <div />
        <InputLabel id="priority-label">Priority</InputLabel>
        <Select variant="standard" labelId="priority-label" defaultValue={1}>
          {prioritySelections}
        </Select>
        {/* </div> */}

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
    </div>
  );
};

export default TicketSubmission;
