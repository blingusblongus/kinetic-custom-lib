import React from 'react';
import './Priority.css';

const Priority = ({ level }) => {
  if (!level) return <div>None</div>;
  level = parseInt(level);
  let text = '';
  let c = 'dot-';
  if (level === 4) {
    text = 'Low';
    c += 'green';
  } else if (level === 3) {
    text = 'Medium';
    c += 'orange';
  } else if (level === 2) {
    text = 'High';
    c += 'red';
  } else if (level === 1) {
    text = 'Critical';
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
