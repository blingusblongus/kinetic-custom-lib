import React, { useState, useEffect } from 'react';
import TicketTable from '../TicketTable/TicketTable';
import { parseSubsToTablegrid } from '../../../../customUtils/utils';
import { PageTitle } from '@kineticdata/bundle-common';
import { SubmissionSearch } from '@kineticdata/react';
import { getPaginated, isFulfiller } from '../../lib/utils';
import BurndownChart from '../BurndownChart/BurndownChart';
import './Dashboard.scss';

import { useSelector } from 'react-redux';
import { FORM_FIELDS, SLUGS, ATTRIBUTES } from '../../../globals/globals';
import { format, addMonths, addDays } from 'date-fns';

const Dashboard = () => {
  const [rowData, setRowData] = useState([]);
  const [clientData, setClientData] = useState({});
  const [worklogs, setWorkLogs] = useState([]);
  const [chartData, setChartData] = useState([]);

  let [columns, rows] = parseSubsToTablegrid(rowData);

  const userProfile = useSelector(store => store.app.profile);
  const fulfiller = isFulfiller(userProfile);
  const organization = userProfile.attributes.find(
    attr => attr.name === ATTRIBUTES.ORGANIZATION,
  ).values[0];

  // fetch submissions
  useEffect(() => {
    // Get all tickets for current client
    const getTickets = async () => {
      const search = new SubmissionSearch().include('values').build();
      let submissions = await getPaginated({
        kapp: SLUGS.KAPPSLUG,
        form: SLUGS.TICKET_FORM_SLUG,
        search,
      });
      setRowData(submissions);
    };
    getTickets();

    const getClientData = async () => {
      const search = new SubmissionSearch()
        .eq('values[Organization]', organization)
        .include('values')
        .build();

      let submissions = await getPaginated({
        kapp: SLUGS.KAPPSLUG,
        form: SLUGS.CLIENTS_FORM_SLUG,
        search,
      });
      setClientData(submissions[0]);
    };

    const getWorkLogs = async () => {
      const search = new SubmissionSearch()
        .eq('values[Organization]', organization)
        .eq('values[isWorkLog]', 'true')
        .include('values')
        .build();

      let submissions = await getPaginated({
        kapp: SLUGS.KAPPSLUG,
        form: SLUGS.ACTIVITIES_FORM_SLUG,
        search,
      });

      setWorkLogs(submissions);
    };

    // Get client info if logged in user isn't vTeams
    if (organization !== ATTRIBUTES.FULFILLER_ORG_NAME) {
      getClientData();
      getWorkLogs();
    }
  }, []);

  useEffect(
    () => {
      if (Object.keys(clientData).length < 1) return;
      const startDate = Date.parse(
        clientData.values[FORM_FIELDS.BILLING_START],
      );
      const endDate = addMonths(startDate, 1);
      const data = [];
      let d = startDate;
      let monthlyHours = clientData.values[FORM_FIELDS.MONTHLY_HOURS];

      while (d < endDate) {
        let dailyHours = worklogs
          .filter(
            log =>
              format(d, 'MM/DD/YYYY') === format(log.submittedAt, 'MM/DD/YYYY'),
          )
          .reduce(
            (sum, log) => (sum += Number(log.values[FORM_FIELDS.HOURS_WORKED])),
            0,
          );

        monthlyHours -= dailyHours;
        data.push({ name: format(d, 'MM/DD'), hours: monthlyHours });

        d = addDays(d, 1);
      }

      setChartData(data);
    },
    [worklogs],
  );

  return (
    <div>
      <PageTitle parts={['Home']} />
      <div className="dashboard page-panel">
        <h1>Your Tickets</h1>
        <div className="table-wrapper">
          <TicketTable columns={columns} rows={rows} createBtn />
        </div>

        <div className="page-panel">
          <BurndownChart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
