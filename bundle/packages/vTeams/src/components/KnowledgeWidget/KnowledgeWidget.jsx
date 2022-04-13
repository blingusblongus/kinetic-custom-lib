import React from 'react';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import './_KnowledgeWidget.scss';

const KnowledgeWidget = () => {
  return (
    <div className="knowledge-widget knowledge-widget--tab">
      <div className="knowledge-widget knowledge-widget--content">
        Some Extra info goes here
      </div>
      <LightbulbOutlinedIcon
        sx={{
          color: 'white',
          position: 'absolute',
          top: '4px',
          left: '4px',
        }}
      />
    </div>
  );
};

export default KnowledgeWidget;
