import React, { useState } from 'react';
import { Select, InputLabel, MenuItem, Input } from '@mui/material';

import Priority from '../Priority/Priority';
import TeamsButton from '../TeamsButton/TeamsButton';
import { TextField } from '@mui/material';
import { bgColorPrimary } from '../../assets/styles/_variables.scss';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import './_TicketSubmission.scss';
import KnowledgeWidget from '../KnowledgeWidget/KnowledgeWidget';

const TicketSubmission = ({ ticket }) => {
  const [shortDescription, setShortDescription] = useState('');
  // const [estimate, setEstimate] = useState(' hours');

  const prioritySelections = [1, 2, 3].map(num => {
    return (
      <MenuItem value={num} key={num}>
        <Priority level={num} />
      </MenuItem>
    );
  });

  const handleSubmit = e => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <>
      {/* Knowledge Widget */}
      <KnowledgeWidget />

      {/* Main Page Content */}
      <div className="page-panel">
        <div className="card-wrapper ticket-submission">
          <form onSubmit={handleSubmit} onSubmitCapture={handleSubmit}>
            <div className="label-description">Ticket #{ticket?.number}</div>
            <div className="submission-grid">
              {/* <InputLabel id="estimate-label">Estimate</InputLabel>

            <TextField
              name="Estimated Duration"
              variant="standard"
              type="number"
              placeholder="Estimated Hours"
              sx={{
                "input[type='number']:not(.form-control)": {
                  padding: 0,
                  border: 'none',
                  height: '2.1rem',
                },
              }}
            />
            <div /> */}

              <div className="submission-subgrid">
                <InputLabel htmlFor="date" id="date-label">
                  Due Date
                </InputLabel>
                <input type="date" name="date" />
              </div>

              <div className="submission-subgrid" />

              <div className="submission-subgrid">
                <InputLabel
                  htmlFor="ticket-submission-priority"
                  id="priority-label"
                >
                  Priority
                </InputLabel>

                <Select
                  variant="standard"
                  labelId="priority-label"
                  defaultValue={1}
                  name="priority"
                >
                  {prioritySelections}
                </Select>
              </div>

              <div className="submission-subgrid">
                <a className="icon-link">
                  <AttachFileIcon />Attach File
                </a>
              </div>
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
              <TeamsButton type="submit">Submit</TeamsButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TicketSubmission;
