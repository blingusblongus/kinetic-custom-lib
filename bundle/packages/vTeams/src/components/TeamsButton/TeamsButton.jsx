import React from 'react';
import Button from '@mui/material/Button';
import { bgColorPrimary, bgColorLight, colorWhite } from '../../App.scss';

/**
 * Props are passed down to the Button component.
 * Mode='light' provides a quick override.
 * @param {*} props
 * @returns
 */
const TeamsButton = props => {
  const sx = {
    height: '1.5rem',
    margin: 'auto 4px',
    fontSize: '0.7rem',
    backgroundColor: bgColorPrimary,
    '&:hover': {
      color: colorWhite,
      backgroundColor: bgColorLight,
    },
  };

  if (props.mode === 'light') {
    sx.backgroundColor = colorWhite;
    sx.color = 'black';
    sx['&:hover'] = {
      color: colorWhite,
      border: '1px solid white',
      backgroundColor: bgColorLight,
      boxSizing: 'border-box',
    };
  }

  return (
    <Button
      sx={sx}
      variant="contained"
      size="small"
      children="Submit"
      {...props}
    />
  );
};

export default TeamsButton;
