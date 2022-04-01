import React from 'react';
import {
  Paper,
  Box,
  Select,
  FormGroup,
  FormLabel,
  InputLabel,
} from '@mui/material';

const TicketSubmission = ({ ticket }) => {
  return (
    <Box>
      <Paper elevation={8}>
        <div>TicketSubmission</div>
        <FormGroup row>
          <InputLabel id="estimate-label">Estimate</InputLabel>
          <Select variant="standard" labelId="estimate-label" />
        </FormGroup>
      </Paper>
    </Box>
  );
};

export default TicketSubmission;
