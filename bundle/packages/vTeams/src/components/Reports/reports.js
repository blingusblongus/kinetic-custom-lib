import { searchSubmissions, SubmissionSearch } from '@kineticdata/react';
import { getPaginated } from '../../lib/utils';
import { SLUGS } from '../../../globals/globals';

export const weeklyReportsSearch = async () => {
  let reportData = {};

  console.log('report called');

  const { KAPPSLUG, CLIENTS_FORM_SLUG, ACTIVITIES_FORM_SLUG } = SLUGS;
  let defaultSearch = new SubmissionSearch()
    .include('values')
    .limit(1000)
    .build();

  try {
    // fetch client info
    let response = await searchSubmissions({
      kapp: KAPPSLUG,
      form: CLIENTS_FORM_SLUG,
      search: defaultSearch,
    });

    // map clients to object
    response.submissions.forEach(sub => {
      const name = sub.values['Organization'];
      reportData[name] = sub.values;
      //init worklogs holder
      reportData[name].worklogs = [];
    });

    //fetch worklog info as single list
    response = await searchSubmissions({
      kapp: KAPPSLUG,
      form: ACTIVITIES_FORM_SLUG,
      search: defaultSearch,
    });

    //insert worklogs into reportData obj
    response.submissions.forEach(sub => {
      let org = sub.values['Organization'];

      if (!org) return;

      if (!reportData[org].worklogs) {
        reportData[org].worklogs = [sub];
      } else {
        reportData[org].worklogs.push(sub);
      }
    });

    // calculate hour totals
    for (let org in reportData) {
      reportData[org].hoursWorked = reportData[org].worklogs.reduce(
        (sum, log) => {
          let logHours = log.values['Hours Worked'];
          return logHours ? (sum += parseFloat(logHours)) : 0;
        },
        0,
      );
    }
    console.log(reportData);
  } catch (err) {
    console.error(err);
    return;
  }

  return reportData;
};
