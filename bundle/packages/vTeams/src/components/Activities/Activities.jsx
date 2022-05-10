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
import { getPaginated } from '../../lib/utils.js';

const Activities = ({ id }) => {
  const [activities, setActivities] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [hoursSpent, setHoursSpent] = useState('');
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
      Organization: ticketOrg,
    };

    // Append hoursSpent if necessary
    if (hoursSpent) {
      values['Hours Worked'] = hoursSpent;
    }

    createSubmission({ kappSlug, formSlug, values })
      .then(submission => {
        console.log('submitted:', submission);
        setCommentText('');
        setHoursSpent('');
        setReFetch(!reFetch);
      })
      .catch(err => console.log(err));
  };

  useEffect(
    () => {
      // Retrieve Ticket Data
      fetchSubmission({ id, include: 'values' })
        .then(result => setTicketOrg(result.submission.values['Organization']))
        .catch(err => console.log(err));

      // Retrieve comments
      const fetchActivities = async () => {
        const search = new SubmissionSearch()
          .eq('values[Ticket ID]', id)
          .include('values')
          .build();

        try {
          const comments = await getPaginated({
            kapp: 'vteams',
            form: 'activity',
            search,
          });

          console.log('comments:', comments);

          let internalComments;
          let results;
          if (isFulfiller) {
            internalComments = await getPaginated({
              kapp: 'vteams',
              form: 'internal-notes',
              search,
            });

            //Tag internalComments for conditional display
            internalComments.forEach(submission => {
              submission.values.isInternal = true;
            });

            results = [...comments, ...internalComments];
          } else {
            results = comments;
          }

          //sort comments by date
          results.sort((a, b) => {
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

  return (
    <div className="card-wrapper activities">
      <h2>Notes and Comments</h2>

      <div>
        {/* <div>Add new Comment:</div> */}
        <form onSubmit={handleSubmit}>
          {isFulfiller && (
            <div className="hours-container">
              <label htmlFor="hoursSpent">Hours:</label>
              <input
                type="number"
                value={hoursSpent}
                name="hoursSpent"
                onChange={e => setHoursSpent(e.target.value)}
              />
            </div>
          )}
          <label htmlFor="comment">Comment:</label>
          <textarea
            rows={3}
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            className={textareaClasses}
            placeholder={
              internalMode ? 'Visible to vTeams' : 'Visible To Client'
            }
            name="comment"
          />
          <TeamsButton mode="dark" sx={{ margin: '10px' }} type="submit" />
          {isFulfiller && (
            <TeamsButton mode="light" onClick={toggleInternal}>
              Toggle Internal
            </TeamsButton>
          )}
        </form>
      </div>

      <div className="activity-feed-container">
        <div className="activity-feed">
          {// Activity log
          activities.length > 0 &&
            activities.map(submission => {
              return (
                <Activity key={submission.handle} submission={submission} />
              );
            })}

          {activities.length === 0 && (
            <div className="message-no-comments">No Comments to display</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activities;
