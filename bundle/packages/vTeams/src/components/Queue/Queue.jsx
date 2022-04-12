import { Ticket } from 'iconsax-react';
import React from 'react';
import TicketTable from '../TicketTable/TicketTable';

const Queue = () => {
  return (
    <div className="queue page-panel">
      <div className="item-container card-wrapper no-padding">
        <div>Queue</div>
        <TicketTable />
      </div>
    </div>
  );
};

export default Queue;
