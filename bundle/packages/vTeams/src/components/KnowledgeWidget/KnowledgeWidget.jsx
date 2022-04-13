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
    top: 8,
    left: 5,
    cursor: 'pointer',
    opacity: open ? 0 : 1,
    transition: 'all .8s',
    position: 'absolute',
    fontSize: 20,
  };

  const articles = [
    {
      title: 'First Article',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    },
    {
      title: 'Second Article',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    },
    {
      title: 'Third Article',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    },
  ];

  return (
    <div className={`knowledge-widget ${widgetOpen}`}>
      <div className="widget-tab">
        <div className="widget-icon">
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
        <div className="widget-title">Knowledge Center</div>
      </div>

      <div className="knowledge-widget--content">
        {articles.map((article, i) => {
          return (
            <div className="knowledge-article" key={i}>
              <div className="article-title">{article.title}</div>
              <div className="article-content">{article.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KnowledgeWidget;
