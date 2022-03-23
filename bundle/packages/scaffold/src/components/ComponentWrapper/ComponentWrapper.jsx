import React from 'react';
import { Paper, Box } from '@mui/material';

const ComponentWrapper = ({ component, sx, elevation }) => {
  return <Box sx={{ mt: '1rem' }}>{component}</Box>;
};

export default ComponentWrapper;
