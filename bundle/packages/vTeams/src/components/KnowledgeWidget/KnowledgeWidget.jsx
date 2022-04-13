import React, { useState } from 'react';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ChevronRight from '@mui/icons-material/ChevronRight';
import './_KnowledgeWidget.scss';

const KnowledgeWidget = () => {
  const [open, setOpen] = useState(false);
  const widgetOpen = open ? 'knowledge-widget--open' : '';

  const toggleOpen = () => setOpen(!open);

  const iconConfig = {
    color: 'white',
    position: 'absolute',
    top: '4px',
    left: '4px',
    cursor: 'pointer',
    opacity: open ? 0 : 1,
    transition: 'all .8s',
  };

  return (
    <div className={`knowledge-widget knowledge-widget--tab ${widgetOpen}`}>
      <div className="knowledge-widget knowledge-widget--content" />
      <LightbulbOutlinedIcon
        sx={{ ...iconConfig, opacity: open ? 0 : 1 }}
        onClick={toggleOpen}
      />
      <ChevronRight
        sx={{
          ...iconConfig,
          opacity: open ? 1 : 0,
          transform: !open && 'rotate(270deg)',
        }}
        onClick={toggleOpen}
      />
    </div>
  );
};

export default KnowledgeWidget;
