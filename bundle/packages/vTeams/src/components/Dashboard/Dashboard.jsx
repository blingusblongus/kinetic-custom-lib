import React, { useEffect } from 'react';
import TicketTable from '../TicketTable/TicketTable';
import { parseSubsToTablegrid } from '../../../../customUtils/utils';
import { PageTitle } from '@kineticdata/bundle-common';
import BurndownChart from '../BurndownChart/BurndownChart';
import { useSelector } from 'react-redux';
import PlaceholderTable from '../Placeholders/PlaceholderTable/PlaceholderTable';
import { isMemberOf } from '@kineticdata/bundle-common/lib/utils';
import './Dashboard.scss';
import CustomTable from '../CustomTable/CustomTable';
import { SLUGS } from '../../../globals/globals';

const Dashboard = () => {
  // When fetching tickets
  // 'FETCH_TICKETS' returns one page of results => {submissions, messages, nextPageToken, count, countPageToken}
  // 'FETCH_TICKETS_ALL' returns all results in same format (collected in submissions);
  const rowData = useSelector(store => store.tickets.submissions);
  const worklogs = useSelector(store => store.workLogs);
  const clientData = useSelector(store => store.organization);

  let [columns, rows] = parseSubsToTablegrid(rowData);

  const userProfile = useSelector(store => store.app.profile);
  const fulfiller = isMemberOf(userProfile, 'vTeams');

  console.log(userProfile);

  return (
    <div>
      <PageTitle parts={['Home']} />
      <div className="dashboard page-panel">
        {fulfiller ? (
          <div className="table-wrapper">
            <CustomTable
              label="Active Tickets"
              kapp={SLUGS.KAPPSLUG}
              form={SLUGS.TICKET_FORM_SLUG}
              // searchOptions={{ include: 'values' }}
              searchOptions={{ include: 'values' }}
            />
            {/* <TicketTable columns={columns} rows={rows} createBtn /> */}
          </div>
        ) : (
          <div className="table-wrapper">
            <CustomTable
              label="My Tickets"
              kapp={SLUGS.KAPPSLUG}
              form={SLUGS.TICKET_FORM_SLUG}
              searchOptions={{ include: 'values' }}
              submitter="me"
            />

            <CustomTable
              label="My Org Tickets (Others)"
              kapp={SLUGS.KAPPSLUG}
              form={SLUGS.TICKET_FORM_SLUG}
              searchOptions={{ include: 'values' }}
              submitter="others"
            />
          </div>
        )}

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
