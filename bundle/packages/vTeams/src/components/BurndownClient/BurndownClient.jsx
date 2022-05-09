import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isFulfiller } from '../../lib/utils';
import { SubmissionSearch, searchSubmissions } from '@kineticdata/react';
import './_BurndownClient.scss';
import moment from 'moment';

const BurndownClient = () => {
  const [hours, setHours] = useState(0);
  const [burndown, setBurndown] = useState({});

  const userProfile = useSelector(store => store.app.profile);
  const organization = userProfile.attributes.find(
    attr => attr.name == 'Organization',
  ).values[0];

  useEffect(() => {
    // fetch info from client form
    const clientInfoSearch = new SubmissionSearch()
      .eq('values[Organization]', organization)
      .include('values')
      .build();

    searchSubmissions({
      kapp: 'vteams',
      form: 'clients',
      search: clientInfoSearch,
    }).then(result => {
      const billingPeriod = result.submissions[0]?.values['Billing Start Date'];
      const totalHours = Number(result.submissions[0]?.values['Monthly Hours']);
      // get all activities for current client
      const activitiesSearch = new SubmissionSearch()
        .eq('values[Organization]', organization)
        .include('values')
        .build();

      searchSubmissions({
        kapp: 'vteams',
        form: 'activity',
        search: activitiesSearch,
      }).then(result => {
        const subs = result.submissions;
        const burndownHours = subs.reduce((sum, sub) => {
          const hours = sub.values['Hours Worked'];
          // if tagged with hours and after the client's billing period start, sum
          return hours && moment(sub.createdAt) > moment(billingPeriod)
            ? sum + Number(hours)
            : sum;
        }, 0);

        setBurndown({
          clientName: organization,
          hoursThisPeriod: burndownHours,
          periodStartDate: moment(billingPeriod),
          hoursRemaining: totalHours - burndownHours,
          totalHours: totalHours,
        });
      });
    });
  }, []);

  return (
    <div>
      <h1>Burndown for {burndown.clientName}</h1>
      <div className="page-panel">
        <p>Total Hours this Month: {burndown.totalHours} hours</p>
        <p>Work Done this Billing Period: {burndown.hoursThisPeriod} hours</p>
        <p>Hours Remaining: {burndown.hoursRemaining} hours</p>
      </div>
    </div>
  );
};

export default BurndownClient;
