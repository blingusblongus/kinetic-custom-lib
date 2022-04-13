import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './_ClientManagement.scss';
import TeamsButton from '../TeamsButton/TeamsButton';
import { countPriorityTickets } from '../../lib/utils';
import TicketTable from '../TicketTable/TicketTable';

import { projects } from './modules.js';

const ClientManagement = () => {
  const columns = [
    { field: 'date', headerName: 'Date', width: 100 },
    { field: 'priority', headerName: 'Priority', width: 100 },
    { field: 'shortDescription', headerName: 'Short Description', width: 300 },
    { field: 'ticketOwner', headerName: 'Ticket Owner', width: 100 },
    { field: 'assignedTo', headerName: 'Assigned To', width: 100 },
  ];

  return (
    <div className="client-management flex-between">
      <header>
        <div className="header-labels">
          <div>Project</div>
          <div>Client</div>
          <div>Overall Time</div>
          <div>Time Left</div>
          <div>Open Tickets</div>
        </div>
        <TeamsButton mode="light">Add Project</TeamsButton>
      </header>
      <div>
        {projects.map(project => {
          return (
            <Accordion key={project.name}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${project.name}-content`}
                id={`panel${project.name}-header`}
              >
                <div className="acc-summary-grid">
                  <div className="accordion-summary-item font-bold">
                    {project.name}
                  </div>
                  <div className="accordion-summary-item font-bold">
                    {project.client}
                  </div>
                  <div className="accordion-summary-item summary-item-box">
                    {project.overallTime} Hours
                  </div>
                  <div className="accordion-summary-item summary-item-box">
                    {project.timeLeft} Hours
                  </div>
                  <div className="accordion-summary-item summary-item-box">
                    {project.countOpen()} Total
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="acc-details-container">
                  <div className="open-tickets-vertical container-inline-block">
                    <div className="font-bold">Open Tickets</div>
                    <div>
                      <div className="priority-dot dot-red" />
                      {countPriorityTickets(project.tickets, 3)} High
                    </div>
                    <div>
                      <div className="priority-dot dot-orange" />
                      {countPriorityTickets(project.tickets, 2)} Medium
                    </div>
                    <div>
                      <div className="priority-dot dot-green" />
                      {countPriorityTickets(project.tickets, 1)} Low
                    </div>
                  </div>
                  <div className="container-inline-block acc-details-grow">
                    <TicketTable columns={columns} rows={project.tickets} />
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default ClientManagement;
