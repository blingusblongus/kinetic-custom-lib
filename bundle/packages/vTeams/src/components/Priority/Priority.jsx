import React from 'react';
import './Priority.css';

const Priority = ({ level }) => {
  let text = '';
  let c = 'dot-';
  if (level === 1) {
    text = 'Low';
    c += 'green';
  } else if (level == 2) {
    text = 'Medium';
    c += 'orange';
  } else if (level == 3) {
    text = 'High';
    c += 'red';
  }

  return (
    <div className="flex">
      <span className={`priority-dot ${c}`} />
      <span>{text}</span>
    </div>
  );
};

export default Priority;
