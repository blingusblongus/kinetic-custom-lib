import React from 'react';
import './_LabelWithIcon.scss';

const LabelWithIcon = ({ icon, label }) => {
  return (
    <div className="icon-center-vert" id="time-display">
      <span className="icon-center-vert icon-pad-right">{icon}</span>
      <span>{label}</span>
    </div>
  );
};

export default LabelWithIcon;
