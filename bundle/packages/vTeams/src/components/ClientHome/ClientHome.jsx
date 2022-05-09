import React, { useState, useEffect } from 'react';
import TicketTable from '../TicketTable/TicketTable';
import { parseSubsToTablegrid } from '../../../../customUtils/utils';
import { PageTitle } from '@kineticdata/bundle-common';
import { searchSubmissions, SubmissionSearch } from '@kineticdata/react';
import './_ClientHome.scss';
import BurndownChart from '../BurndownChart/BurndownChart';
import BurndownDash from '../BurndownDash/BurndownDash';
import { useSelector } from 'react-redux';
import moment from 'moment';

const ClientHome = () => {
  const [rowData, setRowData] = useState('');
  let [columns, rows] = parseSubsToTablegrid(rowData);

  const [totalHours, setTotalHours] = useState(null);
  const [hours, setHours] = useState(0);

  const userProfile = useSelector(store => store.app.profile);
  const organization = userProfile.attributes.find(
    attr => attr.name == 'Organization',
  ).values[0];

  // fetch submissions
  useEffect(() => {
    // fetch info from client form
    const clientInfoSearch = new SubmissionSearch()
      .eq('values[Organization]', organization)
      .include('values')
      .build();

    searchSubmissions({
      kapp: 'vteams',
      form: 'clients',
      search: clientInfoSearch,
    }).then(result => {
      console.log('result', result);
      const monthStart = result.submissions[0]?.values['Billing Start Date'];
      const nextMonth = moment(monthStart)
        .add(1, 'month')
        .format('YYYY-MM-DD');
      console.log('billing start:', monthStart);

      // get all activities for current client
      const activitiesSearch = new SubmissionSearch()
        .eq('values[Organization]', organization)
        .include('values')
        .build();

      searchSubmissions({
        kapp: 'vteams',
        form: 'activity',
        search: activitiesSearch,
      }).then(result => {
        console.log('activitiesSearch', result);
        const subs = result.submissions;
        setHours(
          subs.reduce((count, sub) => {
            const hours = sub.values['Hours Worked'];
            return hours ? count + Number(hours) : count;
          }, 0),
        );
      });
    });

    // Get all tickets for current client
    const search = new SubmissionSearch().include('values').build();
    searchSubmissions({ kapp: 'vteams', form: 'vteams-ticket', search }).then(
      result => setRowData(result.submissions),
    );
  }, []);

  console.log(userProfile);
  console.log('org:', organization);
  console.log('hours', hours);

  return (
    <div>
      <PageTitle parts={['Home']} />
      {/* <div className="page-panel">
        <BurndownDash />
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
