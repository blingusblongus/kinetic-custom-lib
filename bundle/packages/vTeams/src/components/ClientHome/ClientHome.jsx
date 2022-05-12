import React, { useState, useEffect } from 'react';
import TicketTable from '../TicketTable/TicketTable';
import { parseSubsToTablegrid } from '../../../../customUtils/utils';
import { PageTitle } from '@kineticdata/bundle-common';
import { searchSubmissions, SubmissionSearch } from '@kineticdata/react';
import './_ClientHome.scss';
import BurndownChart from '../BurndownChart/BurndownChart';
import BurndownClient from '../BurndownClient/BurndownClient';
import BurndownFulfiller from '../BurndownFulfiller/BurndownFulfiller';
import { getPaginated, isFulfiller } from '../../lib/utils';
import { useSelector } from 'react-redux';

const ClientHome = () => {
  const [rowData, setRowData] = useState('');
  let [columns, rows] = parseSubsToTablegrid(rowData);
  const userProfile = useSelector(store => store.app.profile);
  const fulfiller = isFulfiller(userProfile);
  console.log('profile', userProfile);
  console.log('isFulfiller', fulfiller);

  // fetch submissions
  useEffect(() => {
    // Get all tickets for current client
    const getSubmissions = async () => {
      const search = new SubmissionSearch().include('values').build();
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
      {/* <div className="page-panel">
        {!fulfiller ? <BurndownClient /> : <BurndownFulfiller />}
      </div> */}
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
