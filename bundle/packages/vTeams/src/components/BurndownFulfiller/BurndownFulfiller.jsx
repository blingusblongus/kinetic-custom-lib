import React, { useEffect, useState } from 'react';
import { SubmissionSearch, searchSubmissions } from '@kineticdata/react';
import { getPaginated } from '../../lib/utils';
import { VTEAMS } from '../../../globals/globals';
import './BurndownFulfiller.scss';
import WorkLogList from './WorkLogList/WorkLogList';
import { history } from '@kineticdata/react';

const BurndownFulfiller = () => {
  const [data, setData] = useState({});
  const [modal, setModal] = useState({ show: true, submissions: [] });
  console.log('burndownfulfiller mounted');

  useEffect(() => {
    const fetchBurndownInfo = async () => {
      let search = new SubmissionSearch().include('values').build();

      const clientInfo = await getPaginated({
        kapp: VTEAMS.KAPPSLUG,
        form: VTEAMS.CLIENTS_FORM_SLUG,
        search,
      });
      console.log(clientInfo);

      // Init hashmap to track burndown data
      const hash = {};
      for (let submission of clientInfo) {
        console.log('submission', submission);
        const org = submission.values['Organization'];
        if (!org) continue;

        if (!hash[org]) {
          hash[org] = {
            submissions: [],
            ['Hours Worked']: 0,
            ['Monthly Hours']: Number(submission.values['Monthly Hours']),
            logo: submission.values['Logo Url'],
            name: org,
            id: submission.id,
          };
        }
      }

      console.log('hash', hash);

      search = new SubmissionSearch()
        .eq('values[isWorkLog]', 'true')
        .include('values')
        .build();

      const workLogs = await getPaginated({
        kapp: VTEAMS.KAPPSLUG,
        form: VTEAMS.ACTIVITIES_FORM_SLUG,
        search,
      });

      console.log('workLogs', workLogs);
      for (let log of workLogs) {
        if (!log) continue;
        const org = log.values['Organization'];
        hash[org].submissions.push(log);
        hash[org]['Hours Worked'] += Number(log.values['Hours Worked']);
      }

      console.log(hash);
      setData(hash);
    };

    fetchBurndownInfo();
  }, []);

  return (
    <>
      <div className="burndown-dashboard page-panel">
        <div className="burndown-dashboard__header">Clients Dashboard</div>
        <div className="client-container">
          {Object.keys(data).map((org, i) => {
            const { logo, submissions, name, id } = data[org];
            return (
              <div key={i} className="burndown-panel">
                <div className="burndown-header">
                  <img src={logo} />
                  <div className="burndown-organization">{name}</div>
                </div>
                <div className="burndown-body">
                  <div className="burndown-item">
                    <span className="burndown-item--header">Total Hours: </span>
                    <span>{data[org]['Monthly Hours']}</span>
                  </div>
                  <div className="burndown-item">
                    <span className="burndown-item--header">Hours Used: </span>
                    <span>{data[org]['Hours Worked']}</span>
                  </div>
                  <div className="burndown-item">
                    <span className="burndown-item--header">
                      Hours Remaining:{' '}
                    </span>
                    <span>
                      {data[org]['Monthly Hours'] - data[org]['Hours Worked']}
                    </span>
                  </div>
                </div>
                <div
                  className="burndown-footer"
                  // onClick={()=>setModal({show: true, submissions})}
                  onClick={() =>
                    history.push(
                      `/kapps/${VTEAMS.KAPPSLUG}/forms/${
                        VTEAMS.CLIENTS_FORM_SLUG
                      }/${id}`,
                    )
                  }
                >
                  View Details
                </div>
                {/* {JSON.stringify(data[org])} */}
              </div>
            );
          })}
        </div>
        {/* {Object.keys(data).map((org, i) => {
        console.log(data[org]);
        const total = data[org]['Monthly Hours'];
        const utilized = data[org]['Hours Worked'];
        const remaining = total - utilized;
        return (
          <div key={i}>
            {org}: {remaining} hours remaining of {total} hours.
          </div>
        );
      })} */}
      </div>

      {/* {modal.show && <WorkLogList 
        submissions={modal.submissions}
        setModal={setModal}
        />} */}
    </>
  );
};

export default BurndownFulfiller;
