import React from 'react';
import './_Activity.scss';

const Activity = ({ submission }) => {
  const { values, submittedAt, submittedBy } = submission;
  const [date, time] = submittedAt.split('T');

  console.log(values);
  //assign conditional classes to activity items
  const classes = [`${values.isFulfiller === 'true' && 'isFulfiller'}`].join(
    ' ',
  );

  return (
    <div className={`activity-container ${classes}`}>
      <div className="comment-header">
        {values['Commenter']}: {date} {time.split('.')[0]}
      </div>
      <div className="comment-content">{values['Comment']}</div>
    </div>
  );
};

export default Activity;
