import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

/**
 * Takes in an array of strings to show as tabs.
 * defaultIndex sets default tab.
 * onChange has access to event, selected tabIndex, and the tab display value
 *
 * @param {*} param0
 * @returns {JSX}
 */
const CustomTabs = ({ options, defaultIndex, onChange = () => {} }) => {
  const [tabValue, setTabValue] = useState(defaultIndex || 0);

  return (
    <Tabs
      value={tabValue}
      onChange={(e, val) => {
        setTabValue(val);
        onChange(e, val, options[val]);
      }}
    >
      {options?.map((option, key) => {
        return <Tab label={option} key={key} />;
      })}
    </Tabs>
  );
};

export default CustomTabs;
