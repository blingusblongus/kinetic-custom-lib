import React, { useEffect } from 'react';
import TicketTable from '../TicketTable/TicketTable';
import { parseSubsToTablegrid } from '../../../../customUtils/utils';
import { PageTitle } from '@kineticdata/bundle-common';
import { SubmissionSearch } from '@kineticdata/react';
import BurndownChart from '../BurndownChart/BurndownChart';
import './Dashboard.scss';

import { useDispatch, useSelector } from 'react-redux';
import { SLUGS, NAMES } from '../../../globals/globals';

import PlaceholderTable from '../Placeholders/PlaceholderTable/PlaceholderTable';
import { isMemberOf } from '@kineticdata/bundle-common/lib/utils';

const Dashboard = () => {
  const dispatch = useDispatch();

  const rowData = useSelector(store => store.tickets);
  const worklogs = useSelector(store => store.workLogs);
  const clientData = useSelector(store => store.organization);

  let [columns, rows] = parseSubsToTablegrid(rowData);

  const userProfile = useSelector(store => store.app.profile);
  const fulfiller = isMemberOf(userProfile, 'vTeams');

  const organization = userProfile.attributes.find(
    attr => attr.name === NAMES.ATTRIBUTE_ORGANIZATION,
  ).values[0];

  // fetch submissions on load
  useEffect(() => {
    // configure search for specific tickets if !fulfiller, else fetch all
    //'FETCH_TICKETS' returns paginated results
    //'FETCH_TICKETS_ALL' returns non-paginated (collected) results
    const ticketSearch = fulfiller
      ? new SubmissionSearch().include('values').build()
      : new SubmissionSearch()
          .eq('values[Organization]', organization)
          .include('values')
          .build();

    dispatch({
      type: 'FETCH_TICKETS',
      payload: {
        kapp: SLUGS.KAPPSLUG,
        form: SLUGS.TICKET_FORM_SLUG,
        search: ticketSearch,
      },
    });

    // Client-specific fetches
    if (!fulfiller) {
      const workLogSearch = new SubmissionSearch()
        .eq('values[Organization]', organization)
        .eq('values[isWorkLog]', 'true')
        .include('values')
        .build();

      dispatch({
        type: 'FETCH_WORKLOGS',
        payload: {
          kapp: SLUGS.KAPPSLUG,
          form: SLUGS.ACTIVITIES_FORM_SLUG,
          search: workLogSearch,
        },
      });

      const clientSearch = new SubmissionSearch()
        .eq('values[Organization]', organization)
        .include('values')
        .build();

      dispatch({
        type: 'FETCH_ORGANIZATION',
        payload: {
          kapp: SLUGS.KAPPSLUG,
          form: SLUGS.CLIENTS_FORM_SLUG,
          search: clientSearch,
        },
      });
    }
  }, []);

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
            <BurndownChart clientData={clientData} worklogs={worklogs} />
            <BurndownChart clientData={clientData} worklogs={worklogs} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
