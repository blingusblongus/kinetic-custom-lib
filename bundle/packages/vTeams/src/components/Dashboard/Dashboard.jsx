import React, { useState, useEffect } from 'react';
import TicketTable from '../TicketTable/TicketTable';
import { parseSubsToTablegrid } from '../../../../customUtils/utils';
import { PageTitle } from '@kineticdata/bundle-common';
import { SubmissionSearch } from '@kineticdata/react';
import { getPaginated } from '../../lib/utils';
import BurndownChart from '../BurndownChart/BurndownChart';
import './Dashboard.scss';

import { useDispatch, useSelector } from 'react-redux';
import { FORM_FIELDS, SLUGS, NAMES } from '../../../globals/globals';
import { format, addMonths, addDays } from 'date-fns';
import PlaceholderTable from '../Placeholders/PlaceholderTable/PlaceholderTable';
import { isMemberOf } from '@kineticdata/bundle-common/lib/utils';

const Dashboard = () => {
  const rowData = useSelector(store => store.tickets);
  // const [rowData, setRowData] = useState(tickets);
  const [clientData, setClientData] = useState({});
  const [worklogs, setWorkLogs] = useState([]);
  const [chartData, setChartData] = useState([]);

  let [columns, rows] = parseSubsToTablegrid(rowData);

  const userProfile = useSelector(store => store.app.profile);
  const fulfiller = isMemberOf(userProfile, 'vTeams');

  const organization = userProfile.attributes.find(
    attr => attr.name === NAMES.ATTRIBUTE_ORGANIZATION,
  ).values[0];

  const dispatch = useDispatch();
  const store = useSelector(store => store);

  // fetch submissions on load
  useEffect(() => {
    const search = new SubmissionSearch().include('values').build();
    console.log(search);
    dispatch({
      type: 'FETCH_TICKETS',
      payload: {
        kapp: SLUGS.KAPPSLUG,
        form: SLUGS.TICKET_FORM_SLUG,
        search,
      },
    });

    // // Get all tickets for current client
    // const getTickets = async () => {
    //   const search = new SubmissionSearch().include('values').build();
    //   let submissions = await getPaginated({
    //     kapp: SLUGS.KAPPSLUG,
    //     form: SLUGS.TICKET_FORM_SLUG,
    //     search,
    //   });
    //   setRowData(submissions);
    // };
    // getTickets();

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
    if (organization !== NAMES.FULFILLER_ORG_NAME) {
      getClientData();
      getWorkLogs();
    }
  }, []);

  // fetch burndown info on worklogs set/update
  useEffect(
    () => {
      if (fulfiller) return;
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

  console.log('store', store);

  return (
    <div>
      <PageTitle parts={['Home']} />
      <div className="dashboard page-panel">
        <div className="table-wrapper">
          <TicketTable columns={columns} rows={rows} createBtn />
        </div>
        <PlaceholderTable />

        {!fulfiller && (
          <div className="dashboard-row">
            <BurndownChart data={chartData} />
            <BurndownChart data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
