import React, { useEffect, useState } from 'react';
import { SubmissionSearch, searchSubmissions } from '@kineticdata/react';
import { getPaginated } from '../../lib/utils';
import { VTEAMS } from '../../../globals/globals';

const BurndownFulfiller = () => {
  const [data, setData] = useState({});
  console.log('burndownfulfiller mounted');

  useEffect(() => {
    const fetchBurndownInfo = async () => {
      let search = new SubmissionSearch().include('values').build();

      const clientInfo = await getPaginated({
        kapp: VTEAMS.KAPPSLUG,
        form: VTEAMS.CLIENT_FORM_SLUG,
        search,
      });
      console.log(clientInfo);

      // Init hashmap to track burndown data
      const hash = {};
      for (let submission of clientInfo) {
        console.log('submission', submission);
        const org = submission.values['Organization'];
        if (!hash[org]) {
          hash[org] = {
            submissions: [],
            ['Hours Worked']: 0,
            ['Monthly Hours']: Number(submission.values['Monthly Hours']),
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
        form: VTEAMS.ACTIVITY_FORM_SLUG,
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
    <div>
      {Object.keys(data).map((org, i) => {
        console.log(data[org]);
        const total = data[org]['Monthly Hours'];
        const utilized = data[org]['Hours Worked'];
        const remaining = total - utilized;
        return (
          <div key={i}>
            {org}: {remaining} hours remaining of {total} hours.
          </div>
        );
      })}
    </div>
  );
};

export default BurndownFulfiller;
