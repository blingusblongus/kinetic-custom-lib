import React from 'react';
import Button from '@mui/material/Button';
import { bgColorPrimary, bgColorLight, colorWhite } from '../../App.scss';
import { history } from '@kineticdata/react';

/**
 * Props are passed down to the Button component.
 * Mode='light' provides a quick override.
 * @param {*} props
 * @returns
 */
const TeamsButton = props => {
  //default styling
  let mySx = {
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
    mySx.backgroundColor = colorWhite;
    mySx.color = 'black';
    mySx['&:hover'] = {
      color: colorWhite,
      // border: '1px solid white',
      boxShadow: 'inset 0px 0px 2px white, inset 0px 0px 2px white',
      backgroundColor: bgColorLight,
    };
  }

  // merge custom mySx with predefined mySx
  if (props.sx) mySx = { ...mySx, ...props.sx };

  return (
    <Button
      variant="contained"
      size="small"
      children="Submit"
      {...props}
      sx={mySx}
      onClick={
        props.onClick || (() => props.linkpath && history.push(props.linkpath))
      }
    />
  );
};

export default TeamsButton;
