import React, { useEffect, useState } from 'react';
import { subDays } from 'date-fns';
import { SubmissionSearch, searchSubmissions } from '@kineticdata/react';
import { SLUGS } from '../../../globals/globals';
import axios from 'axios';
import './QuickLook.scss';

const { KAPPSLUG, TICKET_FORM_SLUG } = SLUGS;

const QuickLook = () => {
  const [recentTix, setRecentTix] = useState([]);
  const today = new Date();
  const sevenDaysAgo = subDays(today, 7);

  const createdThisWeek = recentTix.filter(ticket => {
    return ticket.createdAt > sevenDaysAgo.toISOString();
  });

  const resolvedThisWeek = recentTix.filter(ticket => {
    return ticket.values['Marked Resolved'] > sevenDaysAgo.toISOString();
  });

  const updatedThisWeek = recentTix.filter(ticket => {
    return ticket.updatedAt > sevenDaysAgo.toISOString();
  });

  console.log('createdThisWeek', createdThisWeek);
  console.log('updatedThisWeek', updatedThisWeek);
  console.log('resolveTHiswkeeke', resolvedThisWeek);

  useEffect(() => {
    // const search = new SubmissionSearch()
    //     .eq('updatedAt')
    //     .limit(1000)
    //     .include('values')
    //     .build()

    // searchSubmissions({kapp: KAPPSLUG, form: TICKET_FORM_SLUG, search})

    const origin = window.location.origin;
    const dateQuery = encodeURI(`"${sevenDaysAgo.toISOString()}"`);
    console.log(dateQuery);
    axios
      .get(
        `${origin}/app/api/v1/kapps/${KAPPSLUG}/forms/${TICKET_FORM_SLUG}/submissions?direction=DESC&limit=1000&orderBy=values%5BTitle%5D%2CupdatedAt&q=values%5BTitle%5D%3D%2A%22%22ANDupdatedAt%3E${dateQuery}&include=values,details`,
      )
      .then(response => setRecentTix(response.data.submissions))
      .catch(console.error);
  }, []);

  console.log('recentTix', recentTix);
  return (
    <div className="quick-look">
      <div className="quick-look-section">
        <div className="quick-look__icon--container">
          <i className="fa fa-plus" />
        </div>
        <div>
          <div className="quick-look__label">Tickets Raised This Week:</div>
          <div className="quick-look-number">{createdThisWeek.length}</div>
        </div>
      </div>
      <div className="quick-look-section">
        <div className="quick-look__icon--container">
          <i className="fa fa-check" />
        </div>
        <div>
          <div className="quick-look__label">Tickets Resolved This Week:</div>
          <div className="quick-look-number">{resolvedThisWeek.length}</div>
        </div>
      </div>
    </div>
  );
};

export default QuickLook;
