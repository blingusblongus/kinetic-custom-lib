import React, { useState } from 'react';
import { CoreForm } from '@kineticdata/react';
import './_CoreTicketView.scss';

const CoreTicketView = ({ id }) => {
  if (!id) id = '0bfdda56-c013-11ec-b72e-299adb97fb02';
  return (
    <div className="page-panel">
      <div className="card-wrapper no-padding">
        <CoreForm submission={id} />
      </div>
    </div>
  );
};

export default TicketUserView;
