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
  //default styling
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

  //light mode styling
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

  // merge custom sx with predefined sx
  if (props.sx) sx = { ...sx, ...props.sx };

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
