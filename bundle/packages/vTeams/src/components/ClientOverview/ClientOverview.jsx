import React, { useEffect, useState } from 'react';
import { SubmissionSearch } from '@kineticdata/react';
import { getPaginated } from '../../lib/utils';
import { SLUGS, FORM_FIELDS } from '../../../globals/globals';
import './ClientOverview.scss';
// import WorkLogList from './WorkLogList/WorkLogList';
import TeamsButton from '../TeamsButton/TeamsButton';
import ClientPanel from './ClientPanel/ClientPanel';

const ClientOverview = () => {
  const [data, setData] = useState({});
  //   const [modal, setModal] = useState({ show: true, submissions: [] });

  useEffect(() => {
    const fetchBurndownInfo = async () => {
      let search = new SubmissionSearch().include('values').build();

      const clientInfo = await getPaginated({
        kapp: SLUGS.KAPPSLUG,
        form: SLUGS.CLIENTS_FORM_SLUG,
        search,
      });

      // Init hashmap to track burndown data
      const hash = {};
      for (let submission of clientInfo) {
        const org = submission.values[FORM_FIELDS.ORGANIZATION];
        if (!org) continue;

        if (!hash[org]) {
          hash[org] = {
            submissions: [],
            [FORM_FIELDS.HOURS_WORKED]: 0,
            [FORM_FIELDS.MONTHLY_HOURS]: Number(
              submission.values[FORM_FIELDS.MONTHLY_HOURS],
            ),
            logo: submission.values['Logo Url'],
            name: org,
            id: submission.id,
          };
        }
      }

      search = new SubmissionSearch()
        .eq('values[isWorkLog]', 'true')
        .include('values')
        .build();

      const workLogs = await getPaginated({
        kapp: SLUGS.KAPPSLUG,
        form: SLUGS.ACTIVITIES_FORM_SLUG,
        search,
      });

      for (let log of workLogs) {
        if (!log) continue;
        const org = log.values['Organization'];
        hash[org].submissions.push(log);
        hash[org][FORM_FIELDS.HOURS_WORKED] += Number(
          log.values[FORM_FIELDS.HOURS_WORKED],
        );
      }

      setData(hash);
    };

    fetchBurndownInfo();
  }, []);

  return (
    <>
      <div className="burndown-dashboard page-panel">
        <div className="burndown-dashboard__header">
          <div>Clients Dashboard</div>
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

      {/* {modal.show && <WorkLogList 
        submissions={modal.submissions}
        setModal={setModal}
        />} */}
    </>
  );
};

export default ClientOverview;