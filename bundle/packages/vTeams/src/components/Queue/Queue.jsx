import { Ticket } from 'iconsax-react';
import React from 'react';
import TeamsButton from '../TeamsButton/TeamsButton';
import TicketTable from '../TicketTable/TicketTable';
import './_Queue.scss';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Queue = () => {
  const clients = [
    {
      name: 'USAA',
      tickets: [{ open: true, priority: 2 }],
      budget: 17,
    },
  ];
  return (
    <div className="queue page-panel">
      <div className="grid queue-grid">
        <TicketTable viewAllBtn />

        <div className="item-container card-wrapper no-padding">
          <div className="card-header header-dark flex flex-between">
            <div>Client Management</div>
            <TeamsButton>View All</TeamsButton>
          </div>
          {clients.map(client => {
            return (
              <Accordion key={client.name}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${client.name}-content`}
                  id={`panel${client.name}-header`}
                >
                  {client.name}
                </AccordionSummary>
                <AccordionDetails>
                  <div className="open-tickets-container">
                    <span>Open Tickets</span>
                    <div>
                      <div className="" />
                    </div>
                  </div>
                  <div className="budget-container">
                    Time Budget: {client.budget}hrs;
                  </div>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Queue;
