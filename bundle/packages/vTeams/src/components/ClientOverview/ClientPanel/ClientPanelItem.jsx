import React from 'react';

const ClientPanelItem = ({ label, value }) => {
  return (
    <div className="burndown-item">
      <span className="burndown-item--header">{label}</span>
      <span>{value}</span>
    </div>
  );
};

export default ClientPanelItem;
