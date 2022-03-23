import React from 'react';

const ComponentWrapper = ({ component, sx }) => {
  return <div style={sx}>{component}</div>;
};

export default ComponentWrapper;
