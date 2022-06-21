import React, { useEffect, useState } from 'react';
import { SubmissionSearch } from '@kineticdata/react';
import { getPaginated } from '../../lib/utils';
import { SLUGS, FORM_FIELDS } from '../../../globals/globals';
import './ClientOverview.scss';
import TeamsButton from '../TeamsButton/TeamsButton';
import ClientPanel from './ClientPanel/ClientPanel';
import { getAttachmentDownload } from '../../../../customUtils/utils';

const ClientOverview = () => {
  const [data, setData] = useState({});
  const {
    ORGANIZATION,
    HOURS_WORKED,
    BILLING_PERIOD,
    MONTHLY_HOURS,
    ANNUAL_HOURS,
    BILLING_START,
  } = FORM_FIELDS;

  useEffect(() => {
    const fetchBurndownInfo = async () => {
      let search = new SubmissionSearch()
        .include('values')
        .limit(1000)
        .build();

      const clientInfo = await getPaginated({
        kapp: SLUGS.KAPPSLUG,
        form: SLUGS.CLIENTS_FORM_SLUG,
        search,
      });

      // Init hashmap to track burndown data
      const hash = {};
      for (let submission of clientInfo) {
        const org = submission.values[ORGANIZATION];

        if (!org) continue;

        //Transform data
        if (!hash[org]) {
          hash[org] = {
            submissions: [],
            [HOURS_WORKED]: 0,
            logo: getAttachmentDownload(submission, 'Logo'),
            name: org,
            id: submission.id,
            [BILLING_PERIOD]: submission.values[BILLING_PERIOD] || 'Monthly',
            [BILLING_START]: submission.values[BILLING_START],
          };

          submission.values[BILLING_PERIOD] === 'Annually'
            ? (hash[org][ANNUAL_HOURS] = Number(
                submission.values[ANNUAL_HOURS],
              ))
            : (hash[org][MONTHLY_HOURS] = Number(
                submission.values[MONTHLY_HOURS],
              ));
        }
      }

      // Get Worklogs
      search = new SubmissionSearch()
        .eq('values[isWorkLog]', 'true')
        .limit(1000)
        .include('values')
        .build();

      const worklogs = await getPaginated({
        kapp: SLUGS.KAPPSLUG,
        form: SLUGS.ACTIVITIES_FORM_SLUG,
        search,
      });

      for (let log of worklogs) {
        if (!log) continue;
        const org = log.values['Organization'];

        if (log.submittedAt > hash[org][BILLING_START]) {
          hash[org].submissions.push(log);
          hash[org][HOURS_WORKED] += Number(log.values[HOURS_WORKED]);
        }
      }

      setData(hash);
    };

    fetchBurndownInfo();
  }, []);

  return (
    <>
      <div className="burndown-dashboard page-panel">
        <div className="burndown-dashboard__header">
          <h1>Clients Dashboard</h1>
          <div>
            <TeamsButton
              linkpath={`/kapps/${SLUGS.KAPPSLUG}/forms/${
                SLUGS.CLIENTS_FORM_SLUG
              }`}
            >
              Add New Client
            </TeamsButton>
          </div>
        </div>

        <div className="client-container">
          {Object.keys(data).map((org, i) => {
            const orgInfo = data[org];
            return <ClientPanel orgInfo={orgInfo} key={orgInfo.id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default ClientOverview;
