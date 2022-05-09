import React from 'react';
import './_Activity.scss';

const Activity = ({ submission }) => {
  const { values, submittedAt, submittedBy } = submission;
  const [date, time] = submittedAt.split('T');
  const hours = submission.values['Hours Worked'];

  //assign conditional classes to activity items
  const classes = [
    `${values.isFulfiller === 'true' && 'isFulfiller'}`,
    `${values.isInternal && 'isInternal'}`,
  ].join(' ');

  return (
    <div className={`activity-container ${classes}`}>
      <div className="comment-header">
        <div>
          {values['Commenter']}: {date} {time.split('.')[0]}
        </div>
        {hours && <div>Hours Worked: {submission.values['Hours Worked']}</div>}
      </div>
      <div className="comment-content">{values['Comment']}</div>
    </div>
  );
};

export default Activity;
