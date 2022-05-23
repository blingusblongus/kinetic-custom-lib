import React, { useState, useEffect } from 'react';
import TicketTable from '../TicketTable/TicketTable';
import { parseSubsToTablegrid } from '../../../../customUtils/utils';
import { PageTitle } from '@kineticdata/bundle-common';
import { SubmissionSearch } from '@kineticdata/react';
import { getPaginated } from '../../lib/utils';
import BurndownChart from '../BurndownChart/BurndownChart';
import './Dashboard.scss';

const Dashboard = () => {
  const [rowData, setRowData] = useState('');
  let [columns, rows] = parseSubsToTablegrid(rowData);

  // fetch submissions
  useEffect(() => {
    // Get all tickets for current client
    const getSubmissions = async () => {
      const search = new SubmissionSearch().include('values,details').build();
      let submissions = await getPaginated({
        kapp: 'vteams',
        form: 'vteams-ticket',
        search,
      });
      setRowData(submissions);
    };
    getSubmissions();
  }, []);

  return (
    <div>
      <PageTitle parts={['Home']} />
      <div className="dashboard page-panel">
        <h1>Your Tickets</h1>
        <div className="table-wrapper">
          <TicketTable columns={columns} rows={rows} createBtn />
        </div>

        <div className="page-panel">
          <BurndownChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
