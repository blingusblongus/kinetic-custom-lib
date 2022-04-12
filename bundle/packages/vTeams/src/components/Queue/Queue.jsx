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
import { countPriorityTickets } from '../../lib/utils';

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
            {clients.map(({ name, tickets, budget }) => {
              return (
                <Accordion key={name}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${name}-content`}
                    id={`panel${name}-header`}
                  >
                    <span>{name}</span>
                  </AccordionSummary>
                  <AccordionDetails sx={{ backgroundColor: bgOffWhiteDarker }}>
                    <div className="open-tickets-container accordion-details">
                      <span className="font-bold">Open Tickets:</span>
                      <div className="flex flex-align-vert">
                        <div className="priority-dot dot-red" />
                        <span>{countPriorityTickets(tickets, 3)} High</span>
                      </div>
                      <div className="flex flex-align-vert">
                        <div className="priority-dot dot-orange" />
                        <span>{countPriorityTickets(tickets, 2)} Medium</span>
                      </div>
                      <div className="flex flex-align-vert">
                        <div className="priority-dot dot-green" />
                        <span>{countPriorityTickets(tickets, 1)} Low</span>
                      </div>
                    </div>
                    <div className="budget-container accordion-details">
                      <span className="font-bold">Time Budget:</span> {budget}hrs
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
