import React from 'react';
import { PageTitle } from '@kineticdata/bundle-common';
import BurndownChart from '../BurndownChart/BurndownChart';
import { useSelector } from 'react-redux';
import { isMemberOf } from '@kineticdata/bundle-common/lib/utils';
import './Dashboard.scss';
import CustomTable from '../CustomTable/CustomTable';
import { SLUGS } from '../../../globals/globals';
import QuickLook from '../QuickLook/QuickLook';

const Dashboard = () => {
  const worklogs = useSelector(store => store.workLogs);
  const clientData = useSelector(store => store.organization);

  const userProfile = useSelector(store => store.app.profile);
  const fulfiller = isMemberOf(userProfile, 'vTeams');

  return (
    <div>
      <PageTitle parts={['Home']} />
      <div className="dashboard page-panel">
        {fulfiller ? (
          <div className="table-wrapper">
            <CustomTable
              // label="Active Tickets"
              kapp={SLUGS.KAPPSLUG}
              form={SLUGS.TICKET_FORM_SLUG}
              searchOptions={{ include: 'values' }}
            />
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

        {!fulfiller ? (
          <div className="dashboard-row">
            <BurndownChart clientData={clientData} worklogs={worklogs} />
            <QuickLook />
          </div>
        ) : (
          <div className="dashboard-row">
            <QuickLook />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
