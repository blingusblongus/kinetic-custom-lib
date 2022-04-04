import React from 'react';
import Button from '@mui/material/Button';
import { bgColorPrimary, bgColorLight } from '../../App.scss';

const TeamsButton = props => {
  return (
    <Button
      sx={{
        height: '1.5rem',
        margin: 'auto 4px',
        fontSize: '0.7rem',
        backgroundColor: bgColorPrimary,
        '&:hover': {
          color: 'white',
          backgroundColor: bgColorLight,
        },
      }}
      variant="contained"
      size="small"
      children="Submit"
      {...props}
    />
  );
};

export default TeamsButton;
