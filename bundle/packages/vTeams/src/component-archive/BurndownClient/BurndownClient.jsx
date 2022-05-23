import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isFulfiller } from '../../lib/utils';
import { SubmissionSearch, searchSubmissions } from '@kineticdata/react';
import './_BurndownClient.scss';
import moment from 'moment';
import { SLUGS, FORM_FIELDS, ATTRIBUTES } from '../../../globals/globals';

const BurndownClient = () => {
  const [hours, setHours] = useState(0);
  const [burndown, setBurndown] = useState({});

  const userProfile = useSelector(store => store.app.profile);
  const organization = userProfile.attributes.find(
    attr => attr.name == ATTRIBUTES.ORGANIZATION,
  )?.values[0];

  useEffect(() => {
    // fetch info from client form
    const clientInfoSearch = new SubmissionSearch()
      .eq('values[Organization]', organization)
      .include('values')
      .build();

    searchSubmissions({
      kapp: SLUGS.KAPPSLUG,
      form: SLUGS.CLIENTS_FORM_SLUG,
      search: clientInfoSearch,
    }).then(result => {
      const billingPeriod =
        result.submissions[0]?.values[FORM_FIELDS.BILLING_START];
      const totalHours = Number(
        result.submissions[0]?.values[FORM_FIELDS.MONTHLY_HOURS],
      );
      // get all activities for current client
      const activitiesSearch = new SubmissionSearch()
        .eq('values[Organization]', organization)
        .include('values')
        .build();

      searchSubmissions({
        kapp: SLUGS.KAPPSLUG,
        form: SLUGS.ACTIVITIES_FORM_SLUG,
        search: activitiesSearch,
      }).then(result => {
        const subs = result.submissions;
        const burndownHours = subs.reduce((sum, sub) => {
          const hours = sub.values[FORM_FIELDS.HOURS_WORKED];
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
    <>
      {' '}
      {organization && (
        <div>
          <h1>Burndown for {burndown.clientName}</h1>
          <div className="page-panel">
            <p>Total Hours this Month: {burndown.totalHours} hours</p>
            <p>
              Work Done this Billing Period: {burndown.hoursThisPeriod} hours
            </p>
            <p>Hours Remaining: {burndown.hoursRemaining} hours</p>
          </div>
        </div>
      )}
    </>
  );
};

export default BurndownClient;
