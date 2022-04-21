import React, { useState } from 'react';
import { Select, InputLabel, MenuItem, Input } from '@mui/material';

import Priority from '../Priority/Priority';
import TeamsButton from '../TeamsButton/TeamsButton';
import { TextField } from '@mui/material';
import { bgColorPrimary } from '../../assets/styles/_variables.scss';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import './_TicketSubmission.scss';
import KnowledgeWidget from '../KnowledgeWidget/KnowledgeWidget';
import { PageTitle } from '@kineticdata/bundle-common';

import { CoreForm } from '@kineticdata/react';
import { VTEAMS } from '../../../../globals/globals';

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

  const completed = () => <div>Form Submitted!</div>;

  return (
    <>
      {/* Knowledge Widget */}
      <PageTitle parts={['New Ticket']} />
      <KnowledgeWidget />
      {/* Main Page Content */}
      <div className="page-panel">
        <div className="card-wrapper ticket-submission">
          <CoreForm
            kapp={VTEAMS.KAPPSLUG}
            form={VTEAMS.TICKET_FORM_SLUG}
            onError={err => alert(err)}
            onCreated={() => alert('form created')}
            onCompleted={() => alert('form completed')}
            components={{}}
          />
        </div>
      </div>
    </>
  );
};

export default TicketSubmission;
