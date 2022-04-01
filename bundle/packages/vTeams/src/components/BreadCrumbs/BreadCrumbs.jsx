import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import './BreadCrumbs.css';

const BreadCrumbContainer = () => {
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      MUI
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/getting-started/installation/"
      onClick={handleClick}
    >
      Core
    </Link>,
    <Typography key="3" color="text.primary">
      Breadcrumb
    </Typography>,
  ];

  const handleClick = () => {
    return;
  };
  return (
    <div className="breadcrumbs-container">
      <Breadcrumbs separator=">" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbContainer;
