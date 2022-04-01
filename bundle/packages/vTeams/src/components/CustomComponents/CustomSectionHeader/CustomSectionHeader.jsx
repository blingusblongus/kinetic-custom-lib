import React from 'react';

const CustomSectionHeader = ({ element }) => {
  let level = element.depth > 6 ? 6 : element.depth;
  let Tag = `h${level}`;
  return <Tag>{element.title}</Tag>;
};

export default CustomSectionHeader;
