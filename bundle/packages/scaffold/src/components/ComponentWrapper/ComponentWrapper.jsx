import React from 'react';
import { Paper, Box } from '@mui/material';

const ComponentWrapper = ({ component, sx, elevation }) => {
  return (
    <Box sx={{ mt: '1rem' }}>
      <Paper
        sx={{
          padding: '2rem',
          ...sx,
        }}
        elevation={elevation || 4}
      >
        {component}
      </Paper>
    </Box>
  );
};

export default ComponentWrapper;
