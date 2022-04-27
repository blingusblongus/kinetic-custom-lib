import React from 'react';
import './_Activity.scss';

const Activity = ({ submission }) => {
  const { values, submittedAt, submittedBy } = submission;
  const [date, time] = submittedAt.split('T');

  return (
    <div className="activity-container">
      <div className="comment-header">
        {values['Commenter']}: {date} {time.split('.')[0]}
      </div>
      <div>{values['Comment']}</div>
    </div>
  );
};

export default Activity;
