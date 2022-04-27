import React, { useEffect, useState } from 'react';
import { SubmissionSearch, searchSubmissions } from '@kineticdata/react';
import Activity from './Activity/Activity.jsx';
import './_Activities.scss';

const Activities = ({ id }) => {
  const [activities, setActivities] = useState([]);
  useEffect(
    () => {
      const fetchActivities = async () => {
        console.log(id);
        const search = new SubmissionSearch()
          .eq('values[Ticket ID]', id)
          .include('values')
          .build();

        try {
          const result = await searchSubmissions({
            kapp: 'vteams',
            form: 'activity',
            search,
          });
          setActivities(result.submissions);
        } catch (e) {
          console.log(e);
        }
      };
      fetchActivities();
    },
    [id],
  );

  console.log(activities);
  return (
    <div className="card-wrapper activity-feed">
      <h2>Activity Feed</h2>
      {activities.map(submission => {
        console.log(submission);
        return <Activity key={submission.handle} submission={submission} />;
      })}
    </div>
  );
};

export default Activities;
