import React from 'react';
import './WorkLogList.scss';

const WorkLogList = ({ submissions, setModal }) => {
  return (
    <div
      className="worklog-modal-container"
      onClick={() => setModal({ show: false })}
    >
      <div className="worklog">
        {submissions.length > 0 ? (
          <div>{JSON.stringify(submissions)}</div>
        ) : (
          <div>No Work Logged</div>
        )}
      </div>
    </div>
  );
};

export default WorkLogList;
