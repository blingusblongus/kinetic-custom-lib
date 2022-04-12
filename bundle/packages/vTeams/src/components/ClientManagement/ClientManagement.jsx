import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './_ClientManagement.scss';
import TeamsButton from '../TeamsButton/TeamsButton';

const ClientManagement = () => {
  const projects = [
    {
      name: 'Portal Project',
      client: 'Hazelden',
      overallTime: 400,
      timeLeft: 234,
      openTickets() {
        return this.tickets.filter(({ status }) => status === 'open').length;
      },
      tickets: [
        {
          status: 'open',
          date: new Date(),
          priority: 3,
          shortDescription: 'Lorem Ipsum',
          ticketOwner: null,
          assignedTo: 'Eric N.',
        },
        {
          status: 'open',
          date: new Date(),
          priority: 3,
          shortDescription: 'Lorem Ipsum',
          ticketOwner: null,
          assignedTo: 'Noah B.',
        },
        {
          status: 'open',
          date: new Date(),
          priority: 2,
          shortDescription: 'Lorem Ipsum',
          ticketOwner: null,
          assignedTo: 'Daniel H.',
        },
        {
          status: 'open',
          date: new Date(),
          priority: 3,
          shortDescription: 'Lorem Ipsum',
          ticketOwner: null,
          assignedTo: 'Matthew H.',
        },
      ],
    },
  ];
  return (
    <div className="client-management flex-between">
      <header>
        <div className="header-labels">
          <div>Project</div>
          <div>Project</div>
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
                  <div className="accordion-summary-item">{project.name}</div>
                  <div className="accordion-summary-item">{project.client}</div>
                  <div className="accordion-summary-item">
                    {project.overallTime}
                  </div>
                  <div className="accordion-summary-item">
                    {project.timeLeft}
                  </div>
                  <div className="accordion-summary-item">
                    {project.openTickets()}
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails />
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default ClientManagement;
