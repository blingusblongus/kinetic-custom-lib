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

import { bgOffWhiteDarker } from '../../assets/styles/_variables.scss';

const Queue = () => {
  const clients = [
    {
      name: 'USAA',
      tickets: [{ open: true, priority: 2 }],
      budget: 17,
    },
    {
      name: 'Slalom/OSL',
      tickets: [
        { open: true, priority: 2 },
        { open: true, priority: 1 },
        { open: true, priority: 3 },
      ],
      budget: 17,
    },
    {
      name: 'Hennepin Healthcare',
      tickets: [{ open: true, priority: 3 }, { open: true, priority: 3 }],
      budget: 17,
    },
  ];

  const countPriorityTickets = (client, level) => {
    return client.tickets.filter(
      ({ open, priority }) => open && priority === level,
    ).length;
  };

  return (
    <div className="queue page-panel">
      <div className="grid queue-grid">
        <div className="queue-grid-item">
          <TicketTable viewAllBtn />
        </div>
        <div className="queue-grid-item">
          <div className="item-container card-wrapper no-padding">
            <div className="card-header header-dark flex flex-between">
              <div className="font-bold">Client Management</div>
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
                    <span>{client.name}</span>
                  </AccordionSummary>
                  <AccordionDetails sx={{ backgroundColor: bgOffWhiteDarker }}>
                    <div className="open-tickets-container accordion-details">
                      <span className="font-bold">Open Tickets:</span>
                      <div className="flex flex-align-vert">
                        <div className="priority-dot dot-red" />
                        <span>{countPriorityTickets(client, 3)} High</span>
                      </div>
                      <div className="flex flex-align-vert">
                        <div className="priority-dot dot-orange" />
                        <span>{countPriorityTickets(client, 2)} Medium</span>
                      </div>
                      <div className="flex flex-align-vert">
                        <div className="priority-dot dot-green" />
                        <span>{countPriorityTickets(client, 1)} Low</span>
                      </div>
                    </div>
                    <div className="budget-container accordion-details">
                      <span className="font-bold">Time Budget:</span>{' '}
                      {client.budget}hrs
                    </div>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queue;
