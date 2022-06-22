import { searchSubmissions, SubmissionSearch } from '@kineticdata/react';
import { SLUGS } from '../../../globals/globals';
import axios from 'axios';

export const getReportInfoByDateRange = async (startDate, endDate) => {
  let report = { startDate, endDate, data: {} };
  let reportData = report.data;

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

    const origin = window.location.origin;
    const query = encodeURI(
      `submittedAt>"${startDate}"ANDsubmittedAt<"${endDate}"`,
    );
    const requestUrl = `${origin}/app/api/v1/kapps/${KAPPSLUG}/forms/${ACTIVITIES_FORM_SLUG}/submissions?direction=DESC&limit=1000&orderBy=submittedAt&q=${query}&include=values`;
    response = await axios.get(requestUrl);
    const worklogSubmissions = response.data?.submissions;

    //insert worklogs into reportData obj
    worklogSubmissions &&
      worklogSubmissions.forEach(sub => {
        let org = sub.values['Organization'];

        if (!org || sub.values['isWorkLog'] !== 'true') return;
        if (!reportData[org])
          reportData = { ...reportData, [org]: { worklogs: [] } };

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
  } catch (err) {
    console.error(err);
    return;
  }

  return report;
};
