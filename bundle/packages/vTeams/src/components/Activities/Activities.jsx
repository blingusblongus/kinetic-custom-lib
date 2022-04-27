import React, { useEffect, useState } from 'react';
import {
  SubmissionSearch,
  searchSubmissions,
  createSubmission,
} from '@kineticdata/react';
import Activity from './Activity/Activity.jsx';
import './_Activities.scss';
import TeamsButton from '../TeamsButton/TeamsButton.jsx';
import { useSelector } from 'react-redux';

const Activities = ({ id }) => {
  const [activities, setActivities] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [reFetch, setReFetch] = useState(false);

  const userProfile = useSelector(store => store.app.profile);
  console.log(userProfile);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('submitted');

    const values = {
      'Ticket ID': id,
      Comment: commentText,
      Commenter: userProfile.displayName,
    };

    createSubmission({
      kappSlug: 'vteams',
      formSlug: 'activity',
      values,
    }).then(submission => {
      console.log('submission sent', submission);
      setCommentText('');
      setReFetch(!reFetch);
    });
  };

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
    [id, reFetch],
  );

  console.log(activities);
  return (
    <div className="card-wrapper activity-feed">
      <h2>Notes and Comments</h2>
      <div>
        <div>Add new Comment:</div>
        <form onSubmit={handleSubmit}>
          <textarea
            rows={3}
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
          />
          <TeamsButton mode="dark" sx={{ margin: '10px' }} type="submit" />
        </form>
      </div>

      {// Activity log
      activities.map(submission => {
        return <Activity key={submission.handle} submission={submission} />;
      })}
    </div>
  );
};

export default Activities;
