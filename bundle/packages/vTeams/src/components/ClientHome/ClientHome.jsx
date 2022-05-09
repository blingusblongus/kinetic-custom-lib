import React, { useState, useEffect } from 'react';
import TicketTable from '../TicketTable/TicketTable';
import { parseSubsToTablegrid } from '../../../../customUtils/utils';
import { PageTitle } from '@kineticdata/bundle-common';
import { searchSubmissions, SubmissionSearch } from '@kineticdata/react';
import './_ClientHome.scss';
import BurndownChart from '../BurndownChart/BurndownChart';
import BurndownClient from '../BurndownClient/BurndownClient';

const ClientHome = () => {
  const [rowData, setRowData] = useState('');
  let [columns, rows] = parseSubsToTablegrid(rowData);

  // fetch submissions
  useEffect(() => {
    // Get all tickets for current client
    const search = new SubmissionSearch().include('values').build();
    searchSubmissions({ kapp: 'vteams', form: 'vteams-ticket', search }).then(
      result => setRowData(result.submissions),
    );
  }, []);

  return (
    <div>
      <PageTitle parts={['Home']} />
      <div className="page-panel">
        <BurndownClient />
      </div>
      <div className="dashboard page-panel">
        <h1>Your Tickets</h1>
        <div className="table-wrapper">
          <TicketTable columns={columns} rows={rows} createBtn />
        </div>
      </div>
      {/* <div className="dashboard page-panel">
        <h1>Burndown Chart</h1>
        <BurndownChart />
      </div> */}
    </div>
  );
};

export default ClientHome;
