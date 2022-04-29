import React, { useEffect, useState } from 'react';
import {
  SubmissionSearch,
  searchSubmissions,
  createSubmission,
  fetchSubmission,
} from '@kineticdata/react';
import Activity from './Activity/Activity.jsx';
import './_Activities.scss';
import TeamsButton from '../TeamsButton/TeamsButton.jsx';
import { useSelector } from 'react-redux';

const Activities = ({ id }) => {
  const [activities, setActivities] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [reFetch, setReFetch] = useState(false);
  const [internalMode, setInternalMode] = useState(false);
  const [ticketOrg, setTicketOrg] = useState('');

  const userProfile = useSelector(store => store.app.profile);
  const isFulfiller = userProfile.memberships
    .map(mem => {
      return mem.team.name;
    })
    .includes('vTeams');
  const textareaClasses = internalMode ? 'internal' : '';

  const handleSubmit = e => {
    const formSlug = internalMode ? 'internal-notes' : 'activity';
    const kappSlug = 'vteams';

    e.preventDefault();

    let values = {
      'Ticket ID': id,
      Comment: commentText,
      Commenter: userProfile.displayName,
      isFulfiller: isFulfiller,
      'Org Visibility': ticketOrg,
    };

    createSubmission({ kappSlug, formSlug, values })
      .then(submission => {
        console.log('submitted:', submission);
        setCommentText('');
        setReFetch(!reFetch);
      })
      .catch(err => console.log(err));
  };

  useEffect(
    () => {
      fetchSubmission({ id, include: 'values' })
        .then(result => setTicketOrg(result.submission.values['Organization']))
        .catch(err => console.log(err));

      const fetchActivities = async () => {
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
          console.log('activity search', result);

          // let result2;
          // if(isFulfiller){
          //     result2 = await searchSubmissions({
          //         kapp: 'vteams',
          //         form: 'internal-notes',
          //         search,
          //     });
          // }

          const results = result.submissions //?.concat(result2.submissions)
            .sort((a, b) => {
              return new Date(b.submittedAt) - new Date(a.submittedAt);
            });
          setActivities(results);
          setInternalMode(false);
        } catch (e) {
          console.log(e);
        }
      };
      fetchActivities();
    },
    [id, reFetch],
  );

  const toggleInternal = () => {
    setInternalMode(!internalMode);
  };

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
            className={textareaClasses}
          />
          {isFulfiller && (
            <TeamsButton mode="light" onClick={toggleInternal}>
              Toggle Internal
            </TeamsButton>
          )}
          <TeamsButton mode="dark" sx={{ margin: '10px' }} type="submit" />
        </form>
      </div>
      {// Activity log
      activities.length > 0 &&
        activities.map(submission => {
          return <Activity key={submission.handle} submission={submission} />;
        })}
    </div>
  );
};

export default Activities;
