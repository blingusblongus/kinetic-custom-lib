import React from 'react';
import './_Activity.scss';

const Activity = ({ submission }) => {
  const { values, submittedAt, submittedBy } = submission;
  const [date, time] = submittedAt.split('T');

  console.log(values);

  const classes = [`${values.isFulfiller && 'isFulfiller'}`].join(' ');
  console.log(classes);

  return (
    <div className={`activity-container ${classes}`}>
      <div className="comment-header">
        {values['Commenter']}: {date} {time.split('.')[0]}
      </div>
      <div>{values['Comment']}</div>
    </div>
  );
};

export default Activity;
