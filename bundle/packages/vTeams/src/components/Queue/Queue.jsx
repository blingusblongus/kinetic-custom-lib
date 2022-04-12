import { Ticket } from 'iconsax-react';
import React from 'react';
import TicketTable from '../TicketTable/TicketTable';

const Queue = () => {
  return (
    <div className="queue page-panel">
      <div className="flex flex-between">
        <TicketTable viewAllBtn />

        <div className="item-container card-wrapper no-padding">Hello</div>
      </div>
    </div>
  );
};

export default Queue;
