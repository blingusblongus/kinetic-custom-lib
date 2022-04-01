import React from 'react';
import {
  Paper,
  Box,
  Select,
  FormGroup,
  FormLabel,
  InputLabel,
} from '@mui/material';

import './TicketSubmission.css';

const TicketSubmission = ({ ticket }) => {
  return (
    <div className="form-wrapper">
      <div>TicketSubmission</div>
      <FormGroup row>
        <InputLabel id="estimate-label">Estimate</InputLabel>
        <Select variant="standard" labelId="estimate-label" />
      </FormGroup>

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
