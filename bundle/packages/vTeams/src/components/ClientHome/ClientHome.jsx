import React, { useState, useEffect } from 'react';
import TicketTable from '../TicketTable/TicketTable';
import { parseSubsToTablegrid } from '../../../../customUtils/utils';
import { PageTitle } from '@kineticdata/bundle-common';
import { searchSubmissions, SubmissionSearch } from '@kineticdata/react';
import './_ClientHome.scss';

const ClientHome = () => {
  const [rowData, setRowData] = useState('');
  let [columns, rows] = parseSubsToTablegrid(rowData);

  // fetch submissions
  useEffect(() => {
    const search = new SubmissionSearch().include('values').build();

    searchSubmissions({ kapp: 'vteams', form: 'vteams-ticket', search }).then(
      result => setRowData(result.submissions),
    );
  }, []);

  console.log(rowData);
  console.log(columns);
  console.log(rows);

  return (
    <div>
      <PageTitle parts={['Home']} />
      <div className="dashboard page-panel">
        <h1>Your Tickets</h1>
        <div className="table-wrapper">
          <TicketTable columns={columns} rows={rows} createBtn />
        </div>
      </div>
    </div>
  );
};

export default ClientHome;